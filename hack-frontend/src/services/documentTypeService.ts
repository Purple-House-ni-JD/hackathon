/**
 * Document Type Service
 * 
 * Handles document type management:
 * - Listing document types with optional search
 * - Fetching individual document type details
 * - Creating new document types (admin-only)
 * - Updating document type information (admin-only)
 * - Deleting/deactivating document types (admin-only)
 * 
 * Document types categorize submissions and define approval requirements.
 * Non-admin users only see active types. When deleting, the backend will
 * deactivate types with associated documents instead of hard deleting them.
 */

import apiClient from '../config/api';
import {
  type DocumentType,
  type DocumentTypeQueryParams,
  type CreateDocumentTypeData,
  type UpdateDocumentTypeData,
} from '../types';

export const documentTypeService = {
  getDocumentTypes: async (params?: DocumentTypeQueryParams): Promise<DocumentType[]> => {
    const { data } = await apiClient.get<DocumentType[]>('/document-types', { params });
    return data;
  },

  getDocumentTypeById: async (id: number): Promise<DocumentType> => {
    const { data } = await apiClient.get<DocumentType>(`/document-types/${id}`);
    return data;
  },

  createDocumentType: async (typeData: CreateDocumentTypeData): Promise<{ message: string; document_type: DocumentType }> => {
    const { data } = await apiClient.post('/document-types', typeData);
    return data;
  },

  updateDocumentType: async (id: number, typeData: UpdateDocumentTypeData): Promise<{ message: string; document_type: DocumentType }> => {
    const { data } = await apiClient.put(`/document-types/${id}`, typeData);
    return data;
  },

  deleteDocumentType: async (id: number): Promise<{ message: string; document_type?: DocumentType }> => {
    const { data } = await apiClient.delete(`/document-types/${id}`);
    return data;
  },
};