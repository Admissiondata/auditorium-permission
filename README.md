# SVIT Campus Management System

## Sardar Vallabhbhai Patel Institute of Technology (SVIT), Vasad Campus

A production-ready, dynamic web-based Campus Management System for:

- Auditorium Requests & Approvals
- Maintenance Requests & Escalation
- Purchase Management
- Stationery Management
- Local Purchase
- Cleaning Items & Stock
- Car Requisition
- Inventory Management
- Dynamic Approval Workflows
- Email, WhatsApp, SMS & In-App Notifications
- PDF and Excel Reports

---

## 1. Technology Stack

- **Frontend:** Next.js / React
- **Backend:** Node.js
- **Database:** Supabase PostgreSQL
- **Authentication:** Supabase Auth
- **Storage:** Supabase Storage
- **UI:** Tailwind CSS
- **Excel:** ExcelJS
- **PDF:** PDF generation library
- **Email:** SMTP / institutional email
- **WhatsApp:** Official WhatsApp Business API / approved provider
- **SMS:** SMS gateway/provider
- **Version Control:** GitHub
- **Language:** TypeScript

The system must be responsive for desktop, laptop, tablet and mobile.

---

# 2. Core Requirement

The entire application must be **fully dynamic**.

Do NOT hard-code:

- Department names
- Employee names
- User names
- Heads
- Principals
- Maintenance Officers
- Admin Officers
- Purchase Officers
- Chairman
- Auditorium authorities
- Approval sequence
- Purchase amount limits
- Maintenance escalation days
- Notification settings
- Inventory locations
- Stock items

All configuration must be stored in Supabase and managed from the Admin Panel.

---

# 3. Main Login Page

Display:

**SVIT Logo**

**Sardar Vallabhbhai Patel Institute of Technology, Vasad Campus**

Login fields:

- User ID / Email
- Password
- Forgot Password
- Login

Main portal cards:

1. Auditorium Portal
2. Maintenance Portal
3. Purchase Portal
4. Car Requisition Portal
5. Inventory Portal

After login, the dashboard and permissions must be based on the user's role.

Every page must provide:

- Back to Dashboard
- Back to Main Page
- Notifications
- User Profile
- Logout

---

# 4. User Roles

Initial roles:

- ADMIN
- PRINCIPAL
- CHAIRMAN
- HEAD
- ADMIN_OFFICER
- MAINTENANCE_OFFICER
- PURCHASE_OFFICER
- CLERK
- DEPARTMENT_CLERK
- LAB_TECHNICIAN
- FACULTY
- USER

Admin must be able to:

- Add roles
- Edit roles
- Deactivate roles
- Assign roles
- Assign permissions
- Assign users to departments
- Assign approval authority

One user may have multiple roles if required.

---

# 5. Permission System

Permissions are module based.

Modules:

- DASHBOARD
- AUDITORIUM
- MAINTENANCE
- PURCHASE
- STATIONERY
- LOCAL_PURCHASE
- CLEANING
- CAR_REQUISITION
- INVENTORY
- REPORTS
- USERS
- DEPARTMENTS
- APPROVAL_WORKFLOW
- NOTIFICATIONS
- SETTINGS
- AUDIT_LOG

Permission types:

- VIEW
- CREATE
- EDIT
- DELETE
- APPROVE
- REJECT
- RETURN
- EXPORT
- IMPORT
- STOCK_VIEW
- STOCK_ISSUE
- MANAGE

Use Supabase RLS to enforce permissions.

---

# 6. Institute Settings

Default:

```text
Institute Name:
Sardar Vallabhbhai Patel Institute of Technology

Short Name:
SVIT

Campus:
Vasad Campus

Trust:
The New English School Trust, Vasad

Address:
Vasad, Gujarat, India
```

Admin can edit:

- Institute Name
- Short Name
- Campus Name
- Trust Name
- Address
- Phone
- Email
- Website
- Logo
- Favicon

Uploaded logo must appear on:

- Login page
- Dashboard
- Admin panel
- Forms
- Approval pages
- Generated PDFs

---

# 7. Department Master

Initial seed departments:

- Administration
- Accounts
- Computer Engineering
- Information Technology
- Civil Engineering
- Mechanical Engineering
- Electrical Engineering
- Electronics & Communication
- Architecture
- MBA
- MCA
- Library
- Workshop
- Training & Placement
- Examination
- Student Section
- Estate
- Security
- Store
- Other

These are seed values only.

Admin can:

- Add
- Edit
- Deactivate
- Delete

departments.

---

# 8. User Master

Fields:

- Employee ID
- User ID
- Full Name
- Email
- Mobile
- Department
- Designation
- Role
- Signature
- Profile Photo
- Active/Inactive

Supabase Auth must be used for authentication.

---

# 9. Auditorium Module

There are initially **5 Auditoriums**.

## Initial Auditorium Seed Data

### Auditorium 1

```text
Name: Auditorium 1
Code: AUD-01
Capacity: 500
Minimum Participants: 50
Location: Main Campus
Status: Active
```

### Auditorium 2

```text
Name: Auditorium 2
Code: AUD-02
Capacity: 300
Minimum Participants: 30
Location: Main Campus
Status: Active
```

### Auditorium 3

```text
Name: Auditorium 3
Code: AUD-03
Capacity: 250
Minimum Participants: 25
Location: Main Campus
Status: Active
```

### Auditorium 4

```text
Name: Auditorium 4
Code: AUD-04
Capacity: 200
Minimum Participants: 20
Location: Main Campus
Status: Active
```

### Auditorium 5

```text
Name: Auditorium 5
Code: AUD-05
Capacity: 150
Minimum Participants: 15
Location: Main Campus
Status: Active
```

These are default seed values. Admin can change all values.

Admin can also add Auditorium 6, 7, 8 etc. later without changing source code.

---

# 10. Auditorium Authorities

Each Auditorium must have its own dynamic authority configuration.

Fields:

```text
auditorium_id
department_id
head_user_id
principal_user_id
maintenance_officer_user_id
admin_officer_user_id
```

Example:

```text
Auditorium 1
Department: dynamically selected
Head: dynamically selected
Principal: dynamically selected
Maintenance Officer: dynamically selected
Admin Officer: dynamically selected
```

Auditorium 2 may have completely different authorities.

Never assume that all Auditoriums have the same Head, Principal, Maintenance Officer or Admin Officer.

---

# 11. Auditorium Facilities

Initial facilities:

- Air Conditioning
- Projector
- LED Screen
- Sound System
- Microphone
- Podium
- Stage
- Chairs
- Tables
- Lighting
- Wi-Fi
- Generator
- Recording Facility
- Other

Admin can add/edit/deactivate facilities.

---

# 12. Auditorium Settings

Each Auditorium must have dynamic settings:

- Minimum Participants
- Maximum Capacity
- Minimum Booking Duration
- Maximum Booking Duration
- Advance Booking Days
- Same-Day Booking Allowed
- Overlapping Booking Allowed
- Buffer Before Minutes
- Buffer After Minutes

Default:

```text
Overlapping Booking Allowed = No
```

---

# 13. Auditorium Request Form

Fields:

- Applicant Name
- Employee ID
- Department
- Email
- Mobile
- Auditorium
- Event Name
- Purpose
- Event Date
- Start Time
- End Time
- Expected Participants
- Required Facilities
- Special Requirements
- Attachment
- Remarks

After Auditorium selection, system automatically determines:

- Department
- Department Head
- Principal
- Maintenance Officer
- Admin Officer
- Approval Workflow

The user must NOT manually type approval authorities.

---

# 14. Auditorium Validation

Before Submit:

### Minimum Participants

Expected Participants must be >= configured minimum.

Otherwise:

> Minimum participants required for this Auditorium.

### Maximum Capacity

Expected Participants must be <= configured capacity.

Otherwise:

> Participant count exceeds Auditorium capacity.

### Auditorium Time Conflict

If another active request overlaps:

> Selected Auditorium is already booked/requested for this time.

### Applicant Time Conflict

A user cannot create another overlapping request for the same time.

### Active Check

Inactive Auditorium cannot be requested.

### Date/Time Check

Invalid or past booking time must be rejected according to configuration.

Only after all validations pass can the request be submitted.

---

# 15. One Request Per Time Slot

Default rule:

**No overlapping requests for the same Auditorium.**

Example:

Existing:

```text
AUD-01
10:00 AM - 01:00 PM
```

New request:

```text
10:30 AM - 12:00 PM
```

Reject.

New request:

```text
02:00 PM - 05:00 PM
```

Allow.

Admin can configure whether overlapping bookings are allowed.

Use database-level protection where possible to prevent race conditions.

---

# 16. Auditorium Approval Workflow

Approval must be dynamic.

Example Auditorium 1:

```text
Applicant
   ↓
Department Head
   ↓
Admin Officer
   ↓
Maintenance Officer
   ↓
Principal
   ↓
Final Approved
```

Example Auditorium 2:

```text
Applicant
   ↓
Department Head
   ↓
Maintenance Officer
   ↓
Principal
   ↓
Final Approved
```

Admin can:

- Add approval step
- Remove approval step
- Reorder steps
- Select role
- Select specific user
- Set Required/Optional

---

# 17. Requests In Your Lane

Every approver gets:

**Requests In Your Lane**

Show only requests currently assigned to that user.

Columns:

- Request No.
- Applicant
- Department
- Auditorium
- Date
- Time
- Current Approval
- Status
- View
- Approve
- Reject
- Query/Return

Admin can see all requests.

---

# 18. Approval Actions

Every approval authority can:

- Approve
- Reject
- Return / Query

Remarks are mandatory for:

- Reject
- Query
- Return

Approval remarks are optional.

---

# 19. Query / Return Flow

If authority selects Query:

```text
PENDING
   ↓
QUERY
```

Applicant receives notification.

Applicant can:

- View query
- Edit required information
- Upload document
- Reply
- Resubmit

After resubmit:

```text
QUERY
   ↓
RESUBMITTED
   ↓
Approval workflow resumes
```

---

# 20. Final Approval

When the last configured approval authority approves:

```text
Request Status = APPROVED
```

Automatically:

- Send Email to applicant
- Send WhatsApp to applicant
- Send SMS to applicant
- Create in-app notification
- Notify Department Head if configured
- Generate final PDF

Final message:

> Your request AUD-2026-00001 has been approved.

---

# 21. Rejection

If any required authority rejects:

```text
Request Status = REJECTED
```

Remaining approval workflow stops.

Applicant receives:

- Email
- WhatsApp
- SMS
- In-app notification

Include:

- Request No.
- Rejected By
- Date/Time
- Reason
- Remarks

---

# 22. Notification Engine

Create a common notification engine for all modules.

Events:

- REQUEST_CREATED
- APPROVAL_REQUIRED
- APPROVAL_APPROVED
- APPROVAL_REJECTED
- REQUEST_QUERY
- REQUEST_RESUBMITTED
- FINAL_APPROVED
- REQUEST_CANCELLED
- MAINTENANCE_ASSIGNED
- MAINTENANCE_STARTED
- MAINTENANCE_COMPLETED
- MAINTENANCE_DUE_SOON
- MAINTENANCE_OVERDUE
- MAINTENANCE_ESCALATED
- PURCHASE_APPROVED
- STOCK_ISSUED
- CAR_REQUEST_APPROVED

Channels:

- EMAIL
- WHATSAPP
- SMS
- IN_APP

Admin can enable/disable each channel.

---

# 23. Automatic Email

When request is submitted:

```text
Request
  ↓
Find First Approver
  ↓
Send Email
```

When approval is completed:

```text
Current Approver
  ↓
Find Next Approver
  ↓
Send Email
```

When final approval is completed:

```text
Applicant
  ↓
Final Approval Email
```

When rejected:

```text
Applicant
  ↓
Rejection Email
```

---

# 24. Email Template Variables

Support:

```text
{{request_no}}
{{applicant_name}}
{{department}}
{{auditorium}}
{{event_name}}
{{event_date}}
{{start_time}}
{{end_time}}
{{approver_name}}
{{approval_status}}
{{remarks}}
{{approval_link}}
```

Admin can edit email templates.

---

# 25. WhatsApp

Use official WhatsApp Business API or an approved provider.

Admin settings:

- Enable/Disable
- Provider
- API URL
- API Key
- Phone Number ID
- Business Account ID
- Template Name

Never expose API keys in frontend.

Messages should contain request information and secure application link.

---

# 26. SMS

Admin settings:

- Enable/Disable
- Provider
- API URL
- API Key
- Sender ID
- Template ID

Never expose API keys in frontend.

---

# 27. Notification Queue

Create a notification queue.

Fields:

```text
event
recipient
channel
payload
status
attempts
sent_at
error
created_at
```

Statuses:

- PENDING
- PROCESSING
- SENT
- FAILED

Retry failed notifications.

Prevent duplicate notifications using unique event/reference keys.

---

# 28. Maintenance Module

Categories:

- Electrical
- Civil
- Plumbing
- Air Conditioning
- Furniture
- Computer
- Network
- Lift
- Water Supply
- Cleaning
- Other

Admin can add categories.

---

# 29. Maintenance Request Form

Fields:

- Department
- Requester
- Location
- Category
- Priority
- Problem Title
- Problem Description
- Photo
- Attachment
- Requested Date
- Target Date
- Assigned Officer
- Remarks

Priority:

- LOW
- NORMAL
- HIGH
- URGENT
- CRITICAL

Status:

- SUBMITTED
- PENDING_APPROVAL
- APPROVED
- ASSIGNED
- IN_PROGRESS
- ON_HOLD
- COMPLETED
- UNABLE_TO_COMPLETE
- OVERDUE
- ESCALATED
- CLOSED
- REJECTED

---

# 30. Maintenance Dynamic Time Rule

Admin Panel:

**Maintenance Escalation Settings**

Default example:

```text
Warning After: 2 Days
Escalation After: 3 Days
Chairman Escalation: 4 Days
Reminder Frequency: Daily
```

These values are dynamic and must be editable by Admin.

---

# 31. Maintenance Countdown

Show:

```text
Created Date
Assigned Date
Target Date
Days Remaining
Days Overdue
```

Examples:

```text
2 Days Remaining
Due Today
1 Day Overdue
3 Days Overdue
```

---

# 32. Maintenance Automatic Escalation

Use a scheduled background job/cron.

Run at least hourly.

Flow:

```text
Find active maintenance requests
        ↓
Check completion
        ↓
Check target/due date
        ↓
Warning threshold reached?
        ↓
Send reminder
        ↓
Escalation threshold reached?
        ↓
Set OVERDUE / ESCALATED
        ↓
Show in Chairman Dashboard
        ↓
Send Email + WhatsApp + SMS + In-App
```

Do not send duplicate escalation notifications.

---

# 33. Chairman Maintenance Dashboard

Chairman must see:

**Overdue Maintenance**

Columns:

- Request No.
- Department
- Location
- Problem
- Assigned Officer
- Created Date
- Due Date
- Days Overdue
- Status

Chairman actions:

- View
- Remark
- Reassign
- Forward
- Escalate
- Close

Chairman receives:

- Email
- WhatsApp
- SMS
- In-App notification

---

# 34. Purchase Module

Sections:

1. Stationery
2. Local Purchase
3. Cleaning Items

---

# 35. Stationery

Fields:

- Department
- Requester
- Item
- Quantity
- Required Date
- Purpose
- Remarks

Stock:

- Previous Stock
- New Purchase
- Requested Quantity
- Approved Quantity
- Issued Quantity
- Remaining Stock

Formula:

```text
Current Stock =
Previous Stock + New Purchase - Issued Quantity
```

---

# 36. Stationery Item Master

Fields:

- Item Code
- Item Name
- Category
- Unit
- Opening Stock
- Current Stock
- Minimum Stock
- Reorder Level
- Status

Initial sample items:

```text
PEN-BLU | Blue Pen | Writing | Nos
PEN-BLK | Black Pen | Writing | Nos
PENCIL | Pencil | Writing | Nos
A4-PAPER | A4 Paper | Paper | Ream
FILE | Office File | File | Nos
REGISTER | Register | Stationery | Nos
MARKER | White Board Marker | Writing | Nos
STAPLER | Stapler | Office | Nos
```

These are seed examples only.

---

# 37. Stock Transactions

Transaction types:

- OPENING
- PURCHASE
- ISSUE
- RETURN
- ADJUSTMENT
- TRANSFER_IN
- TRANSFER_OUT

Every stock change must create a ledger record.

Authorized roles:

- Admin
- Purchase Officer
- Authorized Clerk

---

# 38. Stationery Excel

Provide:

- Download Excel Template
- Upload Excel
- Preview
- Validate
- Import
- Export

Validate:

- Duplicate Item Code
- Empty Item Name
- Invalid Quantity
- Invalid Category
- Invalid Unit

---

# 39. Local Purchase

Fields:

- Department
- Requester
- Supplier
- Item
- Quantity
- Estimated Amount
- Quotation
- Purpose
- Remarks
- Attachment

---

# 40. Dynamic Purchase Approval Limits

Do not hard-code amount rules.

Default seed:

### Rule 1: Up to ₹10,000

```text
Head: Required
Purchase Officer: Required
Principal: No
Chairman: No
```

### Rule 2: ₹10,001 to ₹50,000

```text
Head: Required
Purchase Officer: Required
Principal: Required
Chairman: No
```

### Rule 3: Above ₹50,000

```text
Head: Required
Purchase Officer: Required
Principal: Required
Chairman: Required
```

Admin can change all limits and authorities.

---

# 41. Cleaning Items

Use the same stock architecture as Stationery.

Features:

- Item Master
- Stock
- Previous Stock
- Purchase
- Request
- Approval
- Issue
- Stock Ledger
- Excel Import/Export
- PDF

Do not hard-code item names.

---

# 42. Purchase PDF

Generate A4 PDF after approval.

Include:

- SVIT Logo
- Institute Name
- Request Number
- Department
- Requester
- Date
- Items
- Quantity
- Amount
- Approval Workflow
- Approval Status
- Approval Dates
- Remarks
- Signature boxes

---

# 43. Car Requisition

Fields:

- Department
- Applicant
- Purpose
- Travel Date
- From
- To
- Reporting Time
- Return Time
- Number of Persons
- Vehicle Type
- Driver Required
- Remarks

Dynamic approval workflow.

Default seed workflow may include:

```text
Head
Admin Officer
Principal
```

Admin can change the workflow.

---

# 44. Inventory Module

Roles:

- Clerk
- Lab Technician
- Head
- Principal
- Admin
- Chairman

Inventory must be department-wise and year-wise.

Initial years:

- 2024-25
- 2025-26
- 2026-27

Admin can create future years.

---

# 45. Inventory Categories

Initial:

- Furniture
- Electrical
- Computer
- Laboratory Equipment
- Office Equipment
- Sports
- Library
- Other

Admin can add categories.

---

# 46. Inventory Floors

Initial:

- Ground Floor
- First Floor
- Second Floor
- Third Floor

Admin can add additional floors.

---

# 47. Inventory Locations

Admin can create:

- Building
- Floor
- Room
- Office
- Lab
- Workshop
- Store
- Other

Example:

```text
Ground Floor → Principal Office
Ground Floor → Computer Lab 1
Ground Floor → Store Room
First Floor → Civil Lab
First Floor → Architecture Studio
Second Floor → MBA Classroom
Third Floor → MCA Lab
```

These are examples only.

---

# 48. Inventory Item

Fields:

- Item Code
- Item Name
- Category
- Department
- Purchase Year
- Purchase Date
- Purchase Value
- Floor
- Location
- Quantity
- Condition
- Use Status
- Remarks

Use Status:

- IN_USE
- NOT_IN_USE
- DAMAGED
- REPAIR
- SCRAP

---

# 49. Inventory Table

Display:

| Sr No | Item | Category | Ground Floor | First Floor | Second Floor | Third Floor | Total | Remarks | Transfer | Status |
|---|---|---|---:|---:|---:|---:|---:|---|---|---|

Total quantity must be calculated automatically.

---

# 50. Inventory Transfer

Fields:

- Item
- From Department
- From Floor
- From Location
- To Department
- To Floor
- To Location
- Quantity
- Transfer Date
- Reason
- Authorized By
- Remarks

On transfer:

```text
Source Quantity -= Transfer Quantity
Destination Quantity += Transfer Quantity
```

Create permanent transfer history.

---

# 51. Inventory Reports

Reports:

- Department-wise Total
- Category-wise Total
- Floor-wise Total
- Location-wise Total
- Year-wise Total
- Use Items
- Non-use Items
- Damaged Items
- Repair Items
- Scrap Items
- Transferred Items
- Inventory Value

Export:

- Excel
- PDF

---

# 52. Request Number

Generate unique numbers:

```text
AUD-2026-00001
MNT-2026-00001
PUR-2026-00001
LPR-2026-00001
CAR-2026-00001
INV-2026-00001
```

Numbers must never duplicate.

Use database-safe sequence/transaction logic.

---

# 53. Common Approval Engine

Create reusable:

```text
ApprovalEngine
```

Functions:

```text
createWorkflow()
getCurrentApprover()
approve()
reject()
returnForQuery()
resubmit()
moveToNextStep()
completeWorkflow()
```

All modules must use this common engine.

Do not write separate hard-coded approval logic for every module.

---

# 54. Notification Engine

Create:

```text
NotificationEngine
```

Functions:

```text
sendEmail()
sendWhatsApp()
sendSMS()
createInAppNotification()
notifyApprover()
notifyApplicant()
notifyNextApprover()
notifyFinalApproval()
notifyRejection()
notifyEscalation()
```

---

# 55. Dashboard

## Admin Dashboard

Cards:

- Total Users
- Departments
- Auditoriums
- Pending Auditorium Requests
- Pending Maintenance
- Overdue Maintenance
- Chairman Escalations
- Pending Purchase
- Pending Local Purchase
- Pending Car Requests
- Total Inventory
- Low Stock Items

## Head Dashboard

- My Department Requests
- Pending Approval
- Approved
- Rejected
- Query

## Maintenance Officer Dashboard

- New Requests
- Assigned
- In Progress
- Due Soon
- Overdue
- Escalated
- Completed

## Purchase Officer Dashboard

- Pending Purchase
- Stationery
- Local Purchase
- Cleaning
- Stock
- Low Stock
- Issue Material

## Chairman Dashboard

- Pending Approval
- Overdue Maintenance
- Escalated Maintenance
- Critical Requests

## Faculty/User Dashboard

- My Requests
- Pending
- Approved
- Rejected
- Query
- Completed

---

# 56. Audit Log

Record:

- User
- Action
- Module
- Record ID
- Old Data
- New Data
- IP Address if available
- User Agent
- Date/Time

Actions:

- LOGIN
- LOGOUT
- CREATE
- UPDATE
- DELETE
- APPROVE
- REJECT
- QUERY
- RESUBMIT
- STOCK_ISSUE
- STOCK_ADJUST
- TRANSFER
- ESCALATE

Normal users cannot edit audit logs.

---

# 57. Supabase Database

Recommended tables:

```text
roles
permissions
role_permissions
users
user_roles

departments
department_heads
principals
maintenance_officers
admin_officers

auditoriums
auditorium_facilities
auditorium_authorities
auditorium_settings
auditorium_workflows
auditorium_requests
auditorium_request_attachments

maintenance_categories
maintenance_requests
maintenance_workflows

purchase_requests
purchase_items
stationery_items
cleaning_items
purchase_stock
stock_transactions
purchase_approval_rules
local_purchase_requests

car_requests
car_workflows

inventory_years
inventory_categories
inventory_floors
inventory_locations
inventory_items
inventory_transfers

approval_workflows
approval_steps
approval_actions

notifications
notification_queue
notification_templates
email_settings
whatsapp_settings
sms_settings

attachments
audit_logs
system_settings
```

Use proper foreign keys, indexes, constraints and timestamps.

---

# 58. Important Database Rules

Use:

- Foreign keys
- Unique constraints
- Check constraints
- Indexes
- Transactions
- RLS policies

For Auditorium time conflicts, implement a reliable database-level overlap prevention strategy where applicable.

Do not rely only on frontend validation.

---

# 59. Security

Use Supabase Row Level Security.

Examples:

### Faculty/User

Can:

- Create request
- View own requests
- Respond to own queries

### Head

Can:

- View assigned department requests
- Approve
- Reject
- Query

### Maintenance Officer

Can:

- View assigned maintenance requests
- Update work status
- Complete work

### Purchase Officer

Can:

- Manage purchase requests
- View authorized stock
- Issue material

### Chairman

Can:

- View Chairman approval requests
- View escalated maintenance
- Take Chairman actions

### Admin

Full access.

Never expose:

```text
SUPABASE_SERVICE_ROLE_KEY
SMTP_PASSWORD
WHATSAPP_API_KEY
SMS_API_KEY
```

to frontend/browser.

---

# 60. Supabase Storage

Create buckets:

```text
logos
attachments
signatures
purchase-documents
maintenance-photos
pdf-documents
```

Use secure storage policies.

---

# 61. Admin Panel

Admin menu:

```text
Dashboard

MASTER DATA
  Users
  Roles & Permissions
  Departments
  Heads
  Principals
  Maintenance Officers
  Admin Officers

AUDITORIUM
  Auditoriums
  Facilities
  Approval Workflow
  Requests
  Approval Desk

MAINTENANCE
  Categories
  Requests
  Approval Desk
  Work Assignment
  Escalation Settings

PURCHASE
  Stationery
  Local Purchase
  Cleaning Items
  Stock
  Issue Material
  Approval Rules

CAR
  Requests
  Approval Workflow

INVENTORY
  Years
  Categories
  Floors
  Locations
  Items
  Transfers
  Reports

NOTIFICATIONS
  Email
  WhatsApp
  SMS
  Templates
  Notification Logs

REPORTS
  Auditorium
  Maintenance
  Purchase
  Car
  Inventory

SYSTEM
  Institute Settings
  Logo
  PDF Settings
  Audit Logs
  System Settings
```

---

# 62. UI Requirements

Professional institutional design.

Header:

- SVIT Logo
- Institute Name
- Campus

Right:

- Notifications
- User Name
- Role
- Profile
- Logout

Sidebar:

- Dynamic menu according to role

Use:

- Cards
- Tables
- Modal dialogs
- Searchable dropdowns
- Date picker
- Time picker
- File upload
- Tabs
- Status badges
- Confirmation dialogs
- Toast notifications
- Loading states
- Empty states
- Error states

---

# 63. Search and Filter

All list pages must support:

- Search
- Department Filter
- Status Filter
- Date Filter
- User Filter
- Role Filter
- Pagination
- Export

---

# 64. PDF Requirements

A4 printable PDF.

Every PDF should include:

- SVIT Logo
- Institute Name
- Campus
- Request Number
- Applicant
- Department
- Request Details
- Items if applicable
- Amount if applicable
- Approval diagram
- Approval status
- Approval dates
- Remarks
- Signature boxes

---

# 65. Excel Requirements

For applicable modules:

- Download Template
- Upload Excel
- Preview
- Validate
- Import
- Export

Do not import invalid records.

Show validation errors before final import.

---

# 66. GitHub Project Structure

Recommended:

```text
svit-campus-management/
│
├── app/
│   ├── login/
│   ├── dashboard/
│   ├── admin/
│   ├── auditorium/
│   ├── maintenance/
│   ├── purchase/
│   ├── car/
│   ├── inventory/
│   └── reports/
│
├── components/
│   ├── layout/
│   ├── forms/
│   ├── tables/
│   ├── approval/
│   ├── pdf/
│   └── ui/
│
├── lib/
│   ├── supabase/
│   ├── auth/
│   ├── approval/
│   ├── email/
│   ├── whatsapp/
│   ├── sms/
│   ├── pdf/
│   └── excel/
│
├── services/
│   ├── approval/
│   ├── notification/
│   ├── maintenance/
│   ├── purchase/
│   └── inventory/
│
├── types/
│
├── database/
│   ├── migrations/
│   ├── seed/
│   └── policies/
│
├── public/
│
├── .env.example
├── .gitignore
├── README.md
├── package.json
└── middleware.ts
```

---

# 67. Environment Variables

Create `.env.example`:

```text
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=
SMTP_FROM=

WHATSAPP_API_URL=
WHATSAPP_API_KEY=
WHATSAPP_PHONE_NUMBER_ID=

SMS_API_URL=
SMS_API_KEY=
SMS_SENDER_ID=
```

Never commit real credentials.

---

# 68. Development Phases

## Phase 1

- Project setup
- Next.js
- TypeScript
- Tailwind
- Supabase
- Authentication
- Roles
- Permissions
- Users
- Departments
- Admin Panel

## Phase 2

- Auditorium
- Five initial Auditoriums
- Dynamic authorities
- Facilities
- Booking validation
- Time conflict
- Dynamic approval
- Requests in your lane
- PDF

## Phase 3

- Maintenance
- Work assignment
- Dynamic deadlines
- Scheduler
- Overdue
- Chairman escalation

## Phase 4

- Purchase
- Stationery
- Local Purchase
- Cleaning
- Stock
- Excel
- PDF

## Phase 5

- Car Requisition

## Phase 6

- Inventory
- Floors
- Locations
- Transfers
- Reports
- Excel
- PDF

## Phase 7

- Email
- WhatsApp
- SMS
- Notification queue
- Templates
- Audit logs
- Security testing

## Phase 8

- Final testing
- Bug fixing
- Performance
- Deployment documentation

---

# 69. Testing / Acceptance Criteria

Test:

## Authentication

- Admin
- Head
- Principal
- Maintenance Officer
- Purchase Officer
- Chairman
- Faculty/User

## Auditorium

- Create request
- Minimum participant validation
- Maximum capacity validation
- Time conflict validation
- One request per overlapping slot
- Dynamic Head
- Dynamic Principal
- Dynamic Maintenance Officer
- Dynamic Admin Officer
- Approve
- Reject
- Query
- Resubmit
- Final approval
- Email
- WhatsApp
- SMS
- PDF

## Maintenance

- Create request
- Approval
- Assign officer
- Start work
- Complete work
- Due date
- Reminder
- Overdue
- Chairman escalation
- Chairman dashboard
- Email
- WhatsApp
- SMS

## Purchase

- Stationery
- Excel upload
- Stock
- Issue material
- Local Purchase
- Amount-based approval
- Cleaning stock
- PDF

## Inventory

- Year
- Department
- Category
- Floor
- Location
- Item
- Quantity
- Total
- Use/Non-use
- Transfer
- Reports
- Excel
- PDF

---

# 70. Critical Business Flow

## Auditorium

```text
USER LOGIN
   ↓
SELECT AUDITORIUM
   ↓
SELECT DATE/TIME
   ↓
ENTER PARTICIPANTS
   ↓
CHECK MINIMUM PARTICIPANTS
   ↓
CHECK CAPACITY
   ↓
CHECK TIME CONFLICT
   ↓
CHECK USER OVERLAP
   ↓
CREATE REQUEST
   ↓
REQUEST NUMBER
   ↓
EMAIL + WHATSAPP + SMS + IN-APP
   ↓
FIRST APPROVER
   ↓
APPROVE / REJECT / QUERY
   ↓
IF APPROVED
   ↓
NEXT APPROVER
   ↓
ALL APPROVED?
   ↓
FINAL APPROVAL
   ↓
APPLICANT NOTIFIED
   ↓
PDF GENERATED
```

## Maintenance

```text
USER
 ↓
MAINTENANCE REQUEST
 ↓
HEAD / CONFIGURED APPROVAL
 ↓
MAINTENANCE OFFICER
 ↓
ASSIGN WORK
 ↓
IN PROGRESS
 ↓
COMPLETED?
 ├── YES → CLOSE → NOTIFY APPLICANT
 └── NO
       ↓
    DUE DATE CHECK
       ↓
    REMINDER
       ↓
    OVERDUE
       ↓
    ESCALATION
       ↓
    CHAIRMAN DASHBOARD
       ↓
    CHAIRMAN NOTIFICATION
       ↓
    CHAIRMAN ACTION
```

---

# 71. Final Requirement

The final product must be a complete working application, not a UI-only prototype.

It must include:

- Functional authentication
- Supabase database
- RLS
- CRUD
- Dynamic roles
- Dynamic permissions
- Dynamic approval engine
- Dynamic auditorium authorities
- Dynamic purchase approval rules
- Dynamic maintenance escalation
- Automatic Email
- Automatic WhatsApp
- Automatic SMS
- In-app notifications
- PDF generation
- Excel import/export
- Stock management
- Inventory management
- Inventory transfer
- Reports
- Audit logs
- Responsive UI
- Error handling
- Form validation
- Search
- Filters
- Pagination
- Secure environment variables

Most importantly:

**Admin must be able to configure the system without changing source code.**

Admin must be able to:

- Change Auditorium Head
- Change Principal
- Change Maintenance Officer
- Change Admin Officer
- Add new Auditorium
- Change minimum participants
- Change capacity
- Change approval sequence
- Change purchase amount limits
- Change maintenance escalation days
- Add departments
- Add users
- Change roles
- Enable/disable Email
- Enable/disable WhatsApp
- Enable/disable SMS
- Change notification templates
- Manage inventory locations
- Manage stock items

The application should be designed so future modules can be added without rewriting the existing approval and notification system.

---

# 72. AI Coding Instructions

When implementing this project:

1. Use TypeScript.
2. Use reusable components.
3. Use reusable services.
4. Use one central Approval Engine.
5. Use one central Notification Engine.
6. Use database-driven configuration.
7. Do not hard-code business rules.
8. Create Supabase migrations.
9. Create seed data.
10. Create RLS policies.
11. Create proper indexes and constraints.
12. Validate both frontend and backend.
13. Use transactions for important multi-step operations.
14. Add audit logging.
15. Add error handling.
16. Add loading and empty states.
17. Add responsive design.
18. Keep secrets out of GitHub.
19. Write setup documentation.
20. Build and test module-by-module.

Start development with **Phase 1** and do not skip database architecture or security.
