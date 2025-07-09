# Use official Node.js LTS image
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
RUN npm install

# Copy all files
COPY . .

# Build Next.js app
RUN npm run build

# Production image
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Install only production dependencies
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
RUN npm install --omit=dev

# Copy built app from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.* ./
COPY --from=builder /app/next-env.d.ts ./

EXPOSE 8080
ENV PORT 8080

CMD ["npx", "next", "start", "-p", "8080"]
