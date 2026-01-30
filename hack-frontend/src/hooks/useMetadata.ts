/**
 * Office and Document Type React Query Hooks
 * 
 * Provides hooks for office and document type management:
 * 
 * OFFICE HOOKS:
 * - useOffices: Query hook for fetching offices with filters
 * - useOffice: Query hook for single office details
 * - useCreateOffice, useUpdateOffice, useDeleteOffice: Mutation hooks
 * 
 * DOCUMENT TYPE HOOKS:
 * - useDocumentTypes: Query hook for fetching document types
 * - useDocumentType: Query hook for single type details
 * - useCreateDocumentType, useUpdateDocumentType, useDeleteDocumentType: Mutation hooks
 * 
 * All mutations automatically invalidate related queries for fresh data.
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { officeService } from '../services/officeService';
import { documentTypeService } from '../services/documentTypeService';
import {
  type OfficeQueryParams,
  type CreateOfficeData,
  type UpdateOfficeData,
  type DocumentTypeQueryParams,
  type CreateDocumentTypeData,
  type UpdateDocumentTypeData,
} from '../types';

// ==================== OFFICE HOOKS ====================

export const useOffices = (params?: OfficeQueryParams) => {
  return useQuery({
    queryKey: ['offices', params],
    queryFn: () => officeService.getOffices(params),
    staleTime: 2 * 60 * 1000,
  });
};

export const useOffice = (id: number) => {
  return useQuery({
    queryKey: ['offices', id],
    queryFn: () => officeService.getOfficeById(id),
    enabled: !!id,
  });
};

export const useCreateOffice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateOfficeData) => officeService.createOffice(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['offices'] });
    },
  });
};

export const useUpdateOffice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateOfficeData }) =>
      officeService.updateOffice(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['offices'] });
      queryClient.invalidateQueries({ queryKey: ['offices', variables.id] });
    },
  });
};

export const useDeleteOffice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => officeService.deleteOffice(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['offices'] });
    },
  });
};

// ==================== DOCUMENT TYPE HOOKS ====================

export const useDocumentTypes = (params?: DocumentTypeQueryParams) => {
  return useQuery({
    queryKey: ['documentTypes', params],
    queryFn: () => documentTypeService.getDocumentTypes(params),
    staleTime: 5 * 60 * 1000, // 5 minutes - changes less frequently
  });
};

export const useDocumentType = (id: number) => {
  return useQuery({
    queryKey: ['documentTypes', id],
    queryFn: () => documentTypeService.getDocumentTypeById(id),
    enabled: !!id,
  });
};

export const useCreateDocumentType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateDocumentTypeData) => documentTypeService.createDocumentType(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documentTypes'] });
    },
  });
};

export const useUpdateDocumentType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateDocumentTypeData }) =>
      documentTypeService.updateDocumentType(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['documentTypes'] });
      queryClient.invalidateQueries({ queryKey: ['documentTypes', variables.id] });
    },
  });
};

export const useDeleteDocumentType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => documentTypeService.deleteDocumentType(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documentTypes'] });
    },
  });
};