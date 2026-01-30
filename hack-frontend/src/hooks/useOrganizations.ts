/**
 * Organization React Query Hooks
 * 
 * Provides hooks for organization management with React Query:
 * - useOrganizations: Query hook for fetching all organizations with search
 * - useOrganization: Query hook for fetching single organization details
 * - useCreateOrganization: Mutation hook for creating organizations
 * - useUpdateOrganization: Mutation hook for updating organizations
 * - useDeleteOrganization: Mutation hook for deleting organizations
 * 
 * All mutations invalidate the organizations query to ensure fresh data.
 * Organizations are cached for 2 minutes and support search filtering.
 */

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { organizationService } from '../services/organizationService';
import {
  type OrganizationQueryParams,
  type CreateOrganizationData,
  type UpdateOrganizationData,
} from '../types';

export const useOrganizations = (params?: OrganizationQueryParams) => {
  return useQuery({
    queryKey: ['organizations', params],
    queryFn: () => organizationService.getOrganizations(params),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useOrganization = (id: number) => {
  return useQuery({
    queryKey: ['organizations', id],
    queryFn: () => organizationService.getOrganizationById(id),
    enabled: !!id,
  });
};

export const useCreateOrganization = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateOrganizationData) => organizationService.createOrganization(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organizations'] });
    },
  });
};

export const useUpdateOrganization = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateOrganizationData }) =>
      organizationService.updateOrganization(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['organizations'] });
      queryClient.invalidateQueries({ queryKey: ['organizations', variables.id] });
    },
  });
};

export const useDeleteOrganization = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => organizationService.deleteOrganization(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organizations'] });
    },
  });
};