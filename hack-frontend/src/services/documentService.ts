/**
 * Document Service
 * 
 * Manages all document-related API operations:
 * - Fetching documents with pagination, filtering, and sorting
 * - Creating new document submissions
 * - Retrieving individual document details with full relationship data
 * - Updating document status with office routing and remarks
 * 
 * All query parameters are properly typed and transformed into URL params.
 * Responses include related data (organization, document type, office, etc.)
 * as defined in the backend's eager loading.
 */

import apiClient from '../config/api';
import {
  type Document,
  type PaginatedResponse,
  type DocumentQueryParams,
  type CreateDocumentData,
  type UpdateDocumentStatusData,
} from '../types';

export const documentService = {
  getDocuments: async (params?: DocumentQueryParams): Promise<PaginatedResponse<Document>> => {
    const { data } = await apiClient.get<PaginatedResponse<Document>>('/documents', { params });
    return data;
  },

  getDocumentById: async (id: number): Promise<Document> => {
    const { data } = await apiClient.get<Document>(`/documents/${id}`);
    return data;
  },

  createDocument: async (documentData: CreateDocumentData): Promise<{ message: string; document: Document }> => {
    const { data } = await apiClient.post('/documents', documentData);
    return data;
  },

  updateDocumentStatus: async (
    id: number,
    statusData: UpdateDocumentStatusData
  ): Promise<{ message: string; document: Document }> => {
    const { data } = await apiClient.patch(`/documents/${id}/status`, statusData);
    return data;
  },
};