/**
 * Office Service
 * 
 * Manages office-related API operations:
 * - Listing offices with optional organization and search filters
 * - Fetching individual office details
 * - Creating new offices (admin-only)
 * - Updating office information (admin-only)
 * - Deleting offices (admin-only)
 * 
 * Offices are used for document routing and workflow management.
 * Only active offices are returned by default. Filtering by organization_id
 * is useful for showing offices within a specific organization context.
 */

import apiClient from '../config/api';
import {
  type Office,
  type OfficeQueryParams,
  type CreateOfficeData,
  type UpdateOfficeData,
} from '../types';

export const officeService = {
  getOffices: async (params?: OfficeQueryParams): Promise<Office[]> => {
    const { data } = await apiClient.get<Office[]>('/offices', { params });
    return data;
  },

  getOfficeById: async (id: number): Promise<Office> => {
    const { data } = await apiClient.get<Office>(`/offices/${id}`);
    return data;
  },

  createOffice: async (officeData: CreateOfficeData): Promise<Office> => {
    const { data } = await apiClient.post<Office>('/offices', officeData);
    return data;
  },

  updateOffice: async (id: number, officeData: UpdateOfficeData): Promise<Office> => {
    const { data } = await apiClient.put<Office>(`/offices/${id}`, officeData);
    return data;
  },

  deleteOffice: async (id: number): Promise<{ message: string }> => {
    const { data } = await apiClient.delete<{ message: string }>(`/offices/${id}`);
    return data;
  },
};