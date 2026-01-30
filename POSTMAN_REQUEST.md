# Postman API Request Examples

**Base URL:** `http://localhost:8000/api`

**Authentication:** Session-based (Login via POST `/auth/login`)

---

## 1. AUTH - Login

```http
POST /auth/login
Host: localhost:8000
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "admin123"
}
```

**Expected Response (201):**

```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "email": "admin@example.com",
    "full_name": "John Admin",
    "user_type": "admin",
    "organization_id": null
  }
}
```

---

## 2. AUTH - Register

```http
POST /auth/register
Host: localhost:8000
Content-Type: application/json

{
  "email": "jane.student@university.edu",
  "password": "SecurePassword456!",
  "password_confirmation": "SecurePassword456!",
  "full_name": "Jane Student",
  "user_type": "student_org",
  "organization_id": 2
}
```

**Field Descriptions:**

- `email` (required): User's email address (must be unique)
- `password` (required): Password (minimum 8 characters)
- `password_confirmation` (required): Must match password
- `full_name` (required): User's full name
- `user_type` (required): Either `admin` or `student_org`
- `organization_id` (required for student_org): ID of the student organization (omit for admin users)

**Expected Response (201):**

```json
{
  "message": "Registration successful",
  "user": {
    "id": 5,
    "email": "jane.student@university.edu",
    "full_name": "Jane Student",
    "user_type": "student_org",
    "organization_id": 2
  }
}
```

---

## 3. AUTH - Get Current User

```http
GET /auth/me
Host: localhost:8000
Content-Type: application/json
Cookie: XSRF-TOKEN=<token>; laravel_session=<session_id>
```

**Expected Response (200):**

```json
{
  "user": {
    "id": 1,
    "email": "admin@example.com",
    "full_name": "John Admin",
    "user_type": "admin",
    "organization_id": null
  }
}
```

---

## 4. AUTH - Logout

```http
POST /auth/logout
Host: localhost:8000
Content-Type: application/json
Cookie: XSRF-TOKEN=<token>; laravel_session=<session_id>
```

**Expected Response (200):**

```json
{
  "message": "Logout successful"
}
```

---

## 5. DOCUMENTS - List All Documents

```http
GET /documents?per_page=15&sort_by=updated_at&sort_order=desc
Host: localhost:8000
Content-Type: application/json
Cookie: XSRF-TOKEN=<token>; laravel_session=<session_id>
```

**Optional Query Parameters:**

- `status=Approved` - Filter by status (Received, Under Review, Forwarded, Approved, Rejected)
- `organization_id=2` - Filter by organization
- `document_type_id=1` - Filter by document type
- `search=spring%20gala` - Search event name or organization name

**Expected Response (200):**

```json
{
  "data": [
    {
      "id": 1,
      "organization_id": 2,
      "document_type_id": 1,
      "event_name": "Spring Gala 2026",
      "status": "Approved",
      "current_office_id": 3,
      "date_received": "2026-01-25",
      "submitted_by": 2,
      "created_at": "2026-01-25T10:30:00Z",
      "updated_at": "2026-01-28T14:15:00Z",
      "organization": {
        "id": 2,
        "name": "Student Art Society",
        "abbreviation": "SAS"
      },
      "document_type": {
        "id": 1,
        "name": "Event Proposal"
      },
      "current_office": {
        "id": 3,
        "name": "Dean of Students Office"
      },
      "submitted_by_user": {
        "id": 2,
        "full_name": "Jane Smith"
      }
    }
  ],
  "links": {
    "first": "http://localhost:8000/api/documents?page=1",
    "last": "http://localhost:8000/api/documents?page=1",
    "prev": null,
    "next": null
  },
  "meta": {
    "current_page": 1,
    "from": 1,
    "last_page": 1,
    "per_page": 15,
    "to": 1,
    "total": 1
  }
}
```

---

## 6. DOCUMENTS - Get Single Document

```http
GET /documents/1
Host: localhost:8000
Content-Type: application/json
Cookie: XSRF-TOKEN=<token>; laravel_session=<session_id>
```

**Expected Response (200):**

```json
{
  "id": 1,
  "organization_id": 2,
  "document_type_id": 1,
  "event_name": "Spring Gala 2026",
  "status": "Approved",
  "current_office_id": 3,
  "date_received": "2026-01-25",
  "submitted_by": 2,
  "created_at": "2026-01-25T10:30:00Z",
  "updated_at": "2026-01-28T14:15:00Z",
  "organization": {
    "id": 2,
    "name": "Student Art Society",
    "abbreviation": "SAS"
  },
  "document_type": {
    "id": 1,
    "name": "Event Proposal"
  },
  "current_office": {
    "id": 3,
    "name": "Dean of Students Office"
  },
  "submitted_by_user": {
    "id": 2,
    "full_name": "Jane Smith"
  },
  "status_history": [
    {
      "id": 1,
      "document_id": 1,
      "previous_status": "Received",
      "new_status": "Under Review",
      "previous_office_id": 1,
      "new_office_id": 2,
      "remarks": null,
      "updated_by": 1,
      "created_at": "2026-01-26T09:00:00Z",
      "updated_by_user": {
        "id": 1,
        "full_name": "John Admin"
      }
    }
  ]
}
```

---

## 7. DOCUMENTS - Create Document

```http
POST /documents
Host: localhost:8000
Content-Type: application/json
Cookie: XSRF-TOKEN=<token>; laravel_session=<session_id>

{
  "organization_id": 2,
  "document_type_id": 1,
  "event_name": "Winter Formal 2026",
  "status": "Received",
  "current_office_id": 1,
  "date_received": "2026-01-29",
  "submitted_by": 2
}
```

**Field Descriptions:**

- `organization_id` (required): ID of the student organization
- `document_type_id` (required): ID of document type (Event Proposal, Budget Request, etc.)
- `event_name` (required): Name of the event
- `status` (required): One of: Received, Under Review, Forwarded, Approved, Rejected
- `current_office_id` (optional): Current office handling the document
- `date_received` (required): Date document was received (YYYY-MM-DD format)
- `submitted_by` (optional): User ID who submitted; defaults to current user if omitted

**Expected Response (201):**

```json
{
  "message": "Document created successfully",
  "document": {
    "id": 5,
    "organization_id": 2,
    "document_type_id": 1,
    "event_name": "Winter Formal 2026",
    "status": "Received",
    "current_office_id": 1,
    "date_received": "2026-01-29",
    "submitted_by": 2,
    "created_at": "2026-01-30T08:45:00Z",
    "updated_at": "2026-01-30T08:45:00Z"
  }
}
```

---

## 8. DOCUMENTS - Update Document Status

```http
PATCH /documents/1/status
Host: localhost:8000
Content-Type: application/json
Cookie: XSRF-TOKEN=<token>; laravel_session=<session_id>

{
  "status": "Approved",
  "current_office_id": 4,
  "remarks": "Document approved by Dean of Students"
}
```

**Field Descriptions:**

- `status` (required): New status (Received, Under Review, Forwarded, Approved, Rejected)
- `current_office_id` (optional): Office ID to forward to
- `remarks` (optional): Comments; **required if status is Rejected**

**Expected Response (200):**

```json
{
  "message": "Document status updated successfully",
  "document": {
    "id": 1,
    "organization_id": 2,
    "document_type_id": 1,
    "event_name": "Spring Gala 2026",
    "status": "Approved",
    "current_office_id": 4,
    "date_received": "2026-01-25",
    "submitted_by": 2,
    "created_at": "2026-01-25T10:30:00Z",
    "updated_at": "2026-01-30T09:15:00Z"
  }
}
```

---

## 9. DOCUMENTS - Reject Document

```http
PATCH /documents/1/status
Host: localhost:8000
Content-Type: application/json
Cookie: XSRF-TOKEN=<token>; laravel_session=<session_id>

{
  "status": "Rejected",
  "remarks": "Insufficient documentation provided. Please resubmit with proper budget breakdown."
}
```

**Expected Response (200):**

```json
{
  "message": "Document status updated successfully",
  "document": {
    "id": 1,
    "organization_id": 2,
    "document_type_id": 1,
    "event_name": "Spring Gala 2026",
    "status": "Rejected",
    "current_office_id": 3,
    "date_received": "2026-01-25",
    "submitted_by": 2,
    "created_at": "2026-01-25T10:30:00Z",
    "updated_at": "2026-01-30T09:20:00Z"
  }
}
```

---

## 10. ORGANIZATIONS - List All Organizations

```http
GET /organizations?search=art
Host: localhost:8000
Content-Type: application/json
Cookie: XSRF-TOKEN=<token>; laravel_session=<session_id>
```

**Optional Query Parameters:**

- `search=student%20government` - Search by name or abbreviation

**Expected Response (200):**

```json
[
  {
    "id": 1,
    "name": "Student Government Association",
    "abbreviation": "SGA",
    "contact_email": "sga@university.edu",
    "contact_phone": "+1-555-0101",
    "advisor_name": "Dr. Michael Johnson",
    "advisor_email": "mjohnson@university.edu",
    "is_active": true,
    "created_at": "2026-01-15T00:00:00Z",
    "updated_at": "2026-01-15T00:00:00Z"
  },
  {
    "id": 2,
    "name": "Student Art Society",
    "abbreviation": "SAS",
    "contact_email": "sas@university.edu",
    "contact_phone": "+1-555-0102",
    "advisor_name": "Prof. Sarah Williams",
    "advisor_email": "swilliams@university.edu",
    "is_active": true,
    "created_at": "2026-01-15T00:00:00Z",
    "updated_at": "2026-01-15T00:00:00Z"
  }
]
```

---

## 11. ORGANIZATIONS - Get Single Organization

```http
GET /organizations/2
Host: localhost:8000
Content-Type: application/json
Cookie: XSRF-TOKEN=<token>; laravel_session=<session_id>
```

**Expected Response (200):**

```json
{
  "id": 2,
  "name": "Student Art Society",
  "abbreviation": "SAS",
  "contact_email": "sas@university.edu",
  "contact_phone": "+1-555-0102",
  "advisor_name": "Prof. Sarah Williams",
  "advisor_email": "swilliams@university.edu",
  "is_active": true,
  "created_at": "2026-01-15T00:00:00Z",
  "updated_at": "2026-01-15T00:00:00Z"
}
```

---

## 12. ORGANIZATIONS - Create Organization

```http
POST /organizations
Host: localhost:8000
Content-Type: application/json
Cookie: XSRF-TOKEN=<token>; laravel_session=<session_id>

{
  "name": "Photography Club",
  "abbreviation": "PC",
  "contact_email": "photoclub@university.edu",
  "contact_person": "Alex Martinez",
  "is_active": true
}
```

**Field Descriptions:**

- `name` (required): Organization name (must be unique)
- `abbreviation` (optional): Short abbreviation (e.g., SAS, SGA)
- `contact_email` (required): Organization contact email
- `contact_person` (optional): Name of organization contact
- `is_active` (required): Boolean indicating if organization is active

**Expected Response (201):**

```json
{
  "id": 6,
  "name": "Photography Club",
  "abbreviation": "PC",
  "contact_email": "photoclub@university.edu",
  "contact_person": "Alex Martinez",
  "is_active": true,
  "created_at": "2026-01-30T10:00:00Z",
  "updated_at": "2026-01-30T10:00:00Z"
}
```

---

## 13. ORGANIZATIONS - Update Organization

```http
PUT /organizations/6
Host: localhost:8000
Content-Type: application/json
Cookie: XSRF-TOKEN=<token>; laravel_session=<session_id>

{
  "name": "Photography Club",
  "abbreviation": "PC",
  "contact_email": "photoclub-updated@university.edu",
  "contact_person": "Alex Martinez",
  "is_active": true
}
```

**Expected Response (200):**

```json
{
  "id": 6,
  "name": "Photography Club",
  "abbreviation": "PC",
  "contact_email": "photoclub-updated@university.edu",
  "contact_person": "Alex Martinez",
  "is_active": true,
  "created_at": "2026-01-30T10:00:00Z",
  "updated_at": "2026-01-30T10:15:00Z"
}
```

---

## 14. ORGANIZATIONS - Delete Organization

```http
DELETE /organizations/6
Host: localhost:8000
Content-Type: application/json
Cookie: XSRF-TOKEN=<token>; laravel_session=<session_id>
```

**Expected Response (200):**

```json
{
  "message": "Organization deleted successfully"
}
```

---

## 15. DOCUMENT TYPES - List All Document Types

```http
GET /document-types
Host: localhost:8000
Content-Type: application/json
Cookie: XSRF-TOKEN=<token>; laravel_session=<session_id>
```

**Expected Response (200):**

```json
[
  {
    "id": 1,
    "name": "Event Proposal",
    "description": "Proposal for organizing an event",
    "created_at": "2026-01-15T00:00:00Z",
    "updated_at": "2026-01-15T00:00:00Z"
  },
  {
    "id": 2,
    "name": "Budget Request",
    "description": "Request for event budget allocation",
    "created_at": "2026-01-15T00:00:00Z",
    "updated_at": "2026-01-15T00:00:00Z"
  },
  {
    "id": 3,
    "name": "Room Reservation",
    "description": "Request to reserve university facilities",
    "created_at": "2026-01-15T00:00:00Z",
    "updated_at": "2026-01-15T00:00:00Z"
  }
]
```

---

## 16. DOCUMENT TYPES - Get Single Document Type

```http
GET /document-types/1
Host: localhost:8000
Content-Type: application/json
Cookie: XSRF-TOKEN=<token>; laravel_session=<session_id>
```

**Expected Response (200):**

```json
{
  "id": 1,
  "name": "Event Proposal",
  "description": "Proposal for organizing an event",
  "created_at": "2026-01-15T00:00:00Z",
  "updated_at": "2026-01-15T00:00:00Z"
}
```

---

## 17. DOCUMENT TYPES - Create Document Type

```http
POST /document-types
Host: localhost:8000
Content-Type: application/json
Cookie: XSRF-TOKEN=<token>; laravel_session=<session_id>

{
  "name": "Permission Slip",
  "description": "Permission form for field trips and off-campus events",
  "requires_approval": true,
  "is_active": true
}
```

**Field Descriptions:**

- `name` (required): Document type name (must be unique, max 100 characters)
- `description` (optional): Description of the document type (max 500 characters)
- `requires_approval` (optional): Boolean indicating if documents of this type require approval workflow (defaults to false)
- `is_active` (optional): Boolean indicating if this document type is active (defaults to true)

**Expected Response (201):**

```json
{
  "message": "Document type created successfully",
  "document_type": {
    "id": 4,
    "name": "Permission Slip",
    "description": "Permission form for field trips and off-campus events",
    "requires_approval": true,
    "is_active": true,
    "created_at": "2026-01-30T12:00:00Z",
    "updated_at": "2026-01-30T12:00:00Z"
  }
}
```

---

## 18. DOCUMENT TYPES - Update Document Type

```http
PUT /document-types/4
Host: localhost:8000
Content-Type: application/json
Cookie: XSRF-TOKEN=<token>; laravel_session=<session_id>

{
  "name": "Permission Slip",
  "description": "Permission form for field trips and off-campus events (updated)",
  "requires_approval": true,
  "is_active": true
}
```

**Expected Response (200):**

```json
{
  "message": "Document type updated successfully",
  "document_type": {
    "id": 4,
    "name": "Permission Slip",
    "description": "Permission form for field trips and off-campus events (updated)",
    "requires_approval": true,
    "is_active": true,
    "created_at": "2026-01-30T12:00:00Z",
    "updated_at": "2026-01-30T12:15:00Z"
  }
}
```

---

## 19. DOCUMENT TYPES - Delete Document Type

```http
DELETE /document-types/4
Host: localhost:8000
Content-Type: application/json
Cookie: XSRF-TOKEN=<token>; laravel_session=<session_id>
```

**Expected Response (200):**

```json
{
  "message": "Document type deleted successfully"
}
```

---

## 20. OFFICES - List All Offices

```http
GET /offices
Host: localhost:8000
Content-Type: application/json
Cookie: XSRF-TOKEN=<token>; laravel_session=<session_id>
```

**Expected Response (200):**

```json
[
  {
    "id": 1,
    "name": "Office of Student Life",
    "email": "studentlife@university.edu",
    "phone": "+1-555-2001",
    "location": "Student Center, Room 101",
    "is_active": true,
    "created_at": "2026-01-15T00:00:00Z",
    "updated_at": "2026-01-15T00:00:00Z"
  },
  {
    "id": 2,
    "name": "Finance Office",
    "email": "finance@university.edu",
    "phone": "+1-555-2002",
    "location": "Administration Building, Room 205",
    "is_active": true,
    "created_at": "2026-01-15T00:00:00Z",
    "updated_at": "2026-01-15T00:00:00Z"
  },
  {
    "id": 3,
    "name": "Dean of Students Office",
    "email": "dean@university.edu",
    "phone": "+1-555-2003",
    "location": "Student Center, Room 200",
    "is_active": true,
    "created_at": "2026-01-15T00:00:00Z",
    "updated_at": "2026-01-15T00:00:00Z"
  }
]
```

---

## 21. OFFICES - Get Single Office

```http
GET /offices/3
Host: localhost:8000
Content-Type: application/json
Cookie: XSRF-TOKEN=<token>; laravel_session=<session_id>
```

**Expected Response (200):**

```json
{
  "id": 3,
  "name": "Dean of Students Office",
  "email": "dean@university.edu",
  "phone": "+1-555-2003",
  "location": "Student Center, Room 200",
  "is_active": true,
  "created_at": "2026-01-15T00:00:00Z",
  "updated_at": "2026-01-15T00:00:00Z"
}
```

---

## 22. OFFICES - Create Office

```http
POST /offices
Host: localhost:8000
Content-Type: application/json
Cookie: XSRF-TOKEN=<token>; laravel_session=<session_id>

{
  "name": "Registrar Office",
  "abbreviation": "REG",
  "email": "registrar@university.edu",
  "is_active": true,
  "organization_id": 1
}
```

**Field Descriptions:**

- `name` (required): Office name
- `abbreviation` (optional): Short abbreviation for the office
- `email` (optional): Office contact email
- `is_active` (required): Boolean indicating if office is active
- `organization_id` (required): ID of the organization this office belongs to

**Expected Response (201):**

```json
{
  "id": 4,
  "name": "Registrar Office",
  "abbreviation": "REG",
  "email": "registrar@university.edu",
  "is_active": true,
  "organization_id": 1,
  "created_at": "2026-01-30T11:00:00Z",
  "updated_at": "2026-01-30T11:00:00Z"
}
```

---

## 23. OFFICES - Update Office

```http
PUT /offices/4
Host: localhost:8000
Content-Type: application/json
Cookie: XSRF-TOKEN=<token>; laravel_session=<session_id>

{
  "name": "Registrar Office",
  "abbreviation": "REG",
  "email": "registrar-updated@university.edu",
  "is_active": true,
  "organization_id": 1
}
```

**Expected Response (200):**

```json
{
  "id": 4,
  "name": "Registrar Office",
  "abbreviation": "REG",
  "email": "registrar-updated@university.edu",
  "is_active": true,
  "organization_id": 1,
  "created_at": "2026-01-30T11:00:00Z",
  "updated_at": "2026-01-30T11:15:00Z"
}
```

---

## 24. OFFICES - Delete Office

```http
DELETE /offices/4
Host: localhost:8000
Content-Type: application/json
Cookie: XSRF-TOKEN=<token>; laravel_session=<session_id>
```

**Expected Response (200):**

```json
{
  "message": "Office deleted successfully"
}
```

---

## Error Response Examples

**401 Unauthorized (Not Logged In):**

```json
{
  "message": "Unauthenticated"
}
```

**403 Forbidden (Insufficient Permissions):**

```json
{
  "message": "Unauthorized"
}
```

**404 Not Found:**

```json
{
  "message": "Document not found"
}
```

**422 Unprocessable Entity (Validation Error):**

```json
{
  "message": "The given data was invalid.",
  "errors": {
    "email": ["The email field is required."],
    "status": ["The selected status is invalid."]
  }
}
```

**500 Server Error:**

```json
{
  "message": "Failed to create document",
  "error": "Database connection failed"
}
```

---

## Quick Test Workflow

1. **Login** → Receive session cookie
2. **List Organizations** → Get organization IDs
3. **List Document Types** → Get document type IDs
4. **List Offices** → Get office IDs
5. **Create Document** → Submit new document
6. **Get Document** → Verify creation
7. **Update Status** → Change document status
8. **List Documents** → See updated list
9. **Logout** → End session
