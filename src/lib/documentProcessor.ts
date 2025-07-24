// // Document Processing System for Real Company Documents
// // This handles PDF, DOCX, and other document formats

// export interface ProcessedDocument {
//   id: string;
//   title: string;
//   content: string;
//   chunks: DocumentChunk[];
//   metadata: DocumentMetadata;
//   source: string;
//   processedAt: Date;
// }

// export interface DocumentChunk {
//   id: string;
//   content: string;
//   pageNumber?: number;
//   section?: string;
//   metadata: ChunkMetadata;
// }

// export interface DocumentMetadata {
//   filename: string;
//   fileType: string;
//   fileSize: number;
//   lastModified: Date;
//   author?: string;
//   title?: string;
//   category: string;
//   tags: string[];
// }

// export interface ChunkMetadata {
//   documentId: string;
//   chunkIndex: number;
//   wordCount: number;
//   pageNumber?: number;
//   section?: string;
// }

// export class DocumentProcessor {
//   private maxChunkSize = 1000; // words per chunk
//   private chunkOverlap = 100; // word overlap between chunks

//   /**
//    * Process a PDF document (requires pdf-parse library)
//    * npm install pdf-parse
//    */
//   async processPDF(buffer: Buffer, filename: string): Promise<ProcessedDocument> {
//     try {
//       const pdf = require('pdf-parse');
//       const data = await pdf(buffer);
      
//       const metadata: DocumentMetadata = {
//         filename,
//         fileType: 'pdf',
//         fileSize: buffer.length,
//         lastModified: new Date(),
//         title: data.info?.Title || filename,
//         author: data.info?.Author,
//         category: this.inferCategory(filename),
//         tags: this.extractTags(data.text)
//       };

//       const chunks = this.chunkText(data.text, filename);
      
//       return {
//         id: this.generateDocumentId(filename),
//         title: metadata.title,
//         content: data.text,
//         chunks,
//         metadata,
//         source: filename,
//         processedAt: new Date()
//       };
//     } catch (error) {
//       throw new Error(`Failed to process PDF: ${error}`);
//     }
//   }

//   /**
//    * Process a DOCX document (requires mammoth library)
//    * npm install mammoth
//    */
//   async processDOCX(buffer: Buffer, filename: string): Promise<ProcessedDocument> {
//     try {
//       const mammoth = require('mammoth');
//       const result = await mammoth.extractRawText({ buffer });
      
//       const metadata: DocumentMetadata = {
//         filename,
//         fileType: 'docx',
//         fileSize: buffer.length,
//         lastModified: new Date(),
//         title: this.extractTitleFromContent(result.value) || filename,
//         category: this.inferCategory(filename),
//         tags: this.extractTags(result.value)
//       };

//       const chunks = this.chunkText(result.value, filename);
      
//       return {
//         id: this.generateDocumentId(filename),
//         title: metadata.title,
//         content: result.value,
//         chunks,
//         metadata,
//         source: filename,
//         processedAt: new Date()
//       };
//     } catch (error) {
//       throw new Error(`Failed to process DOCX: ${error}`);
//     }
//   }

//   /**
//    * Process plain text documents
//    */
//   async processText(content: string, filename: string): Promise<ProcessedDocument> {
//     const metadata: DocumentMetadata = {
//       filename,
//       fileType: 'txt',
//       fileSize: content.length,
//       lastModified: new Date(),
//       title: this.extractTitleFromContent(content) || filename,
//       category: this.inferCategory(filename),
//       tags: this.extractTags(content)
//     };

//     const chunks = this.chunkText(content, filename);
    
//     return {
//       id: this.generateDocumentId(filename),
//       title: metadata.title,
//       content,
//       chunks,
//       metadata,
//       source: filename,
//       processedAt: new Date()
//     };
//   }

//   /**
//    * Smart text chunking that preserves context
//    */
//   private chunkText(text: string, documentId: string): DocumentChunk[] {
//     const words = text.split(/\s+/);
//     const chunks: DocumentChunk[] = [];
    
//     for (let i = 0; i < words.length; i += this.maxChunkSize - this.chunkOverlap) {
//       const chunkWords = words.slice(i, i + this.maxChunkSize);
//       const chunkContent = chunkWords.join(' ');
      
//       // Try to end chunks at sentence boundaries
//       const adjustedContent = this.adjustChunkBoundary(chunkContent);
      
//       chunks.push({
//         id: `${documentId}-chunk-${chunks.length}`,
//         content: adjustedContent,
//         metadata: {
//           documentId,
//           chunkIndex: chunks.length,
//           wordCount: adjustedContent.split(/\s+/).length
//         }
//       });
//     }
    
//     return chunks;
//   }

//   /**
//    * Adjust chunk boundaries to end at sentence completion
//    */
//   private adjustChunkBoundary(text: string): string {
//     const sentences = text.split(/[.!?]+/);
//     if (sentences.length > 1) {
//       // Remove the last incomplete sentence
//       sentences.pop();
//       return sentences.join('.') + '.';
//     }
//     return text;
//   }

//   /**
//    * Infer document category from filename
//    */
//   private inferCategory(filename: string): string {
//     const lower = filename.toLowerCase();
    
//     if (lower.includes('handbook') || lower.includes('manual')) return 'Handbook';
//     if (lower.includes('policy') || lower.includes('policies')) return 'Policies';
//     if (lower.includes('benefit') || lower.includes('insurance')) return 'Benefits';
//     if (lower.includes('procedure') || lower.includes('process')) return 'Procedures';
//     if (lower.includes('guide') || lower.includes('training')) return 'Guides';
//     if (lower.includes('code') && lower.includes('conduct')) return 'Code of Conduct';
    
//     return 'General';
//   }

//   /**
//    * Extract relevant tags from document content
//    */
//   private extractTags(content: string): string[] {
//     const keywords = [
//       'vacation', 'sick leave', 'benefits', 'insurance', 'retirement',
//       '401k', 'policy', 'procedure', 'remote work', 'overtime',
//       'harassment', 'conduct', 'training', 'onboarding', 'termination'
//     ];
    
//     const foundTags: string[] = [];
//     const lowerContent = content.toLowerCase();
    
//     keywords.forEach(keyword => {
//       if (lowerContent.includes(keyword)) {
//         foundTags.push(keyword);
//       }
//     });
    
//     return foundTags;
//   }

//   /**
//    * Extract title from document content
//    */
//   private extractTitleFromContent(content: string): string | null {
//     const lines = content.split('\n');
    
//     // Look for title patterns in first few lines
//     for (let i = 0; i < Math.min(5, lines.length); i++) {
//       const line = lines[i].trim();
      
//       // Skip empty lines
//       if (!line) continue;
      
//       // Check if line looks like a title (short, capitalized, etc.)
//       if (line.length < 100 && line.length > 5) {
//         // Check if it contains title-like words
//         const titleWords = ['policy', 'handbook', 'guide', 'manual', 'procedure'];
//         if (titleWords.some(word => line.toLowerCase().includes(word))) {
//           return line;
//         }
        
//         // Or if it's in all caps or title case
//         if (line === line.toUpperCase() || this.isTitleCase(line)) {
//           return line;
//         }
//       }
//     }
    
//     return null;
//   }

//   /**
//    * Check if text is in title case
//    */
//   private isTitleCase(text: string): boolean {
//     const words = text.split(' ');
//     return words.every(word => 
//       word.length === 0 || 
//       word[0] === word[0].toUpperCase()
//     );
//   }

//   /**
//    * Generate unique document ID
//    */
//   private generateDocumentId(filename: string): string {
//     const timestamp = Date.now();
//     const hash = this.simpleHash(filename);
//     return `doc_${hash}_${timestamp}`;
//   }

//   /**
//    * Simple hash function for filename
//    */
//   private simpleHash(str: string): string {
//     let hash = 0;
//     for (let i = 0; i < str.length; i++) {
//       const char = str.charCodeAt(i);
//       hash = ((hash << 5) - hash) + char;
//       hash = hash & hash; // Convert to 32-bit integer
//     }
//     return Math.abs(hash).toString(36);
//   }
// }

// // Export singleton instance
// export const documentProcessor = new DocumentProcessor();
