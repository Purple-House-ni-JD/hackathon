/**
 * Type Definitions for VISTA Application
 *
 * Defines all TypeScript interfaces and types that match the Laravel backend models
 * and API response structures. These types ensure type safety across the application
 * and provide IDE autocompletion for better developer experience.
 */

// ==================== USER & AUTH ====================

export interface User {
  id: number;
  email: string;
  full_name: string;
  user_type: "admin" | "student_org";
  organization_id: number | null;
  organization?: Organization; // <--- Fixes .organization error
  is_active: boolean;
  last_login: string | null;
  created_at: string;
  updated_at: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: User;
}

export interface RegisterUserData {
  email: string;
  password: string;
  full_name: string;
  user_type: "admin" | "student_org";
  organization_id?: number;
  is_active?: boolean;
}

// ==================== ORGANIZATION ====================

export interface Organization {
  id: number;
  name: string;
  abbreviation: string | null;
  contact_email: string;
  contact_person: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string | null;
}

export interface CreateOrganizationData {
  name: string;
  abbreviation?: string;
  contact_email: string;
  contact_person?: string;
  is_active: boolean;
}

export interface UpdateOrganizationData extends CreateOrganizationData {}

// ==================== OFFICE ====================

export interface Office {
  id: number;
  name: string;
  abbreviation: string | null;
  email: string | null;
  is_active: boolean;
  organization_id: number;
  created_at: string | null;
  updated_at: string | null;
  organization?: Organization;
}

export interface CreateOfficeData {
  name: string;
  abbreviation?: string;
  email?: string;
  is_active: boolean;
  organization_id: number;
}

export interface UpdateOfficeData extends CreateOfficeData {}

// ==================== DOCUMENT TYPE ====================

export interface DocumentType {
  id: number;
  name: string;
  description: string | null;
  requires_approval: boolean;
  is_active: boolean;
}

export interface CreateDocumentTypeData {
  name: string;
  description?: string;
  requires_approval?: boolean;
  is_active?: boolean;
}

export interface UpdateDocumentTypeData extends CreateDocumentTypeData {}

// ==================== DOCUMENT ====================

export type DocumentStatus =
  | "Received"
  | "Under Review"
  | "Forwarded"
  | "Approved"
  | "Rejected";

export interface Document {
  id: number;
  organization_id: number;
  document_type_id: number;
  event_name: string;
  status: DocumentStatus;
  current_office_id: number | null;
  date_received: string;
  submitted_by: number | null;
  created_at: string;
  updated_at: string;
  // Relationships
  organization?: Organization;
  documentType?: DocumentType;
  currentOffice?: Office;
  submittedBy?: User;
  statusHistory?: DocumentStatusHistory[];
}

export interface CreateDocumentData {
  organization_id: number;
  document_type_id: number;
  event_name: string;
  status: DocumentStatus;
  current_office_id?: number;
  date_received: string;
  submitted_by?: number;
}

export interface UpdateDocumentStatusData {
  status: DocumentStatus;
  current_office_id?: number;
  remarks?: string;
}

// ==================== DOCUMENT STATUS HISTORY ====================

export interface DocumentStatusHistory {
  id: number;
  document_id: number;
  previous_status: DocumentStatus | null;
  new_status: DocumentStatus;
  previous_office_id: number | null;
  new_office_id: number | null;
  remarks: string | null;
  updated_by: number;
  created_at: string;
  // Relationships
  document?: Document;
  previousOffice?: Office;
  newOffice?: Office;
  updatedBy?: User;
}

// ==================== NOTIFICATION ====================

export interface Notification {
  id: number;
  document_id: number;
  status_history_id: number;
  recipient_user_id: number | null;
  subject: string;
  message: string;
  notification_type: string;
  sent_at: string | null;
  status: string;
  error_message: string | null;
  created_at: string;
  // Relationships
  document?: Document;
  statusHistory?: DocumentStatusHistory;
  recipient?: User;
}

// ==================== PAGINATION ====================

export interface PaginatedResponse<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

// ==================== API QUERY PARAMETERS ====================

export interface DocumentQueryParams {
  // These are the keys your hook uses:
  status?: string | DocumentStatus;
  search?: string;

  organization_id?: number;
  document_type_id?: number;
  sort_by?: string;
  sort_order?: "asc" | "desc";
  per_page?: number;
  page?: number;
  limit?: number; // Added for 'Recent Docs' slice
}

export interface OrganizationQueryParams {
  search?: string;
}

export interface OfficeQueryParams {
  organization_id?: number;
  search?: string;
}

export interface DocumentTypeQueryParams {
  search?: string;
}

// ==================== API ERROR ====================

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

// ==================== DASHBOARD STATS ====================

export interface DashboardStats {
  total_documents: number;
  pending_approvals: number;
  rejected_documents: number;
  approved_documents: number;
  active_organizations: number;
  offices_involved: number;
}
