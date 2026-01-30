/**
 * Document React Query Hooks
 * 
 * Provides hooks for document management with React Query:
 * - useDocuments: Query hook for fetching paginated documents with filters
 * - useDocument: Query hook for fetching single document with full details
 * - useCreateDocument: Mutation hook for creating new documents
 * - useUpdateDocumentStatus: Mutation hook for status updates with notifications
 * 
 * All mutations automatically invalidate relevant queries to trigger refetches.
 * The useDocuments hook supports filtering by status, organization, and search terms
 * with automatic pagination and sorting.
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { documentService } from '../services/documentService';
import {
  type DocumentQueryParams,
  type CreateDocumentData,
  type UpdateDocumentStatusData,
} from '../types';

export const useDocuments = (params?: DocumentQueryParams) => {
  return useQuery({
    queryKey: ['documents', params],
    queryFn: () => documentService.getDocuments(params),
    staleTime: 30 * 1000, // 30 seconds
  });
};

export const useDocument = (id: number) => {
  return useQuery({
    queryKey: ['documents', id],
    queryFn: () => documentService.getDocumentById(id),
    enabled: !!id,
  });
};

export const useCreateDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateDocumentData) => documentService.createDocument(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
    },
  });
};

export const useUpdateDocumentStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateDocumentStatusData }) =>
      documentService.updateDocumentStatus(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['documents'] });
      queryClient.invalidateQueries({ queryKey: ['documents', variables.id] });
    },
  });
};