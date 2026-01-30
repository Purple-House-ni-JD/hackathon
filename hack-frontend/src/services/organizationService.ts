/**
 * Organization Service
 * 
 * Handles all organization-related API calls:
 * - Listing organizations with optional search filtering
 * - Fetching individual organization details
 * - Creating new organizations (admin-only)
 * - Updating organization information (admin-only)
 * - Deleting organizations (admin-only, cascades to related entities)
 * 
 * The service automatically filters to active organizations for non-admin users
 * based on backend logic. Search functionality allows finding orgs by name or abbreviation.
 */

import apiClient from '../config/api';
import {
  type Organization,
  type OrganizationQueryParams,
  type CreateOrganizationData,
  type UpdateOrganizationData,
} from '../types';

export const organizationService = {
  getOrganizations: async (params?: OrganizationQueryParams): Promise<Organization[]> => {
    const { data } = await apiClient.get<Organization[]>('/organizations', { params });
    return data;
  },

  getOrganizationById: async (id: number): Promise<Organization> => {
    const { data } = await apiClient.get<Organization>(`/organizations/${id}`);
    return data;
  },

  createOrganization: async (orgData: CreateOrganizationData): Promise<Organization> => {
    const { data } = await apiClient.post<Organization>('/organizations', orgData);
    return data;
  },

  updateOrganization: async (id: number, orgData: UpdateOrganizationData): Promise<Organization> => {
    const { data } = await apiClient.put<Organization>(`/organizations/${id}`, orgData);
    return data;
  },

  deleteOrganization: async (id: number): Promise<{ message: string }> => {
    const { data } = await apiClient.delete<{ message: string }>(`/organizations/${id}`);
    return data;
  },
};