import type { Metadata } from "next";
import { Nunito_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const nunitoSans = Nunito_Sans({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-nunito-sans'
});
const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-jetbrains-mono'
});

export const metadata: Metadata = {
  title: "AI Chatbot Assistant",
  description: "An AI chatbot assistant created to be intergated into a company's employee portal/website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
className={`${nunitoSans.className} ${jetbrainsMono.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
