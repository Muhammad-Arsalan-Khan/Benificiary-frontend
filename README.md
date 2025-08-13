# Beneficiary Management System

This is a web application built using **React** and **Material-UI (MUI)** that allows the following roles:

1. **Beneficiary**: Submits a request for assistance.
2. **Receptionist**: Creates tokens and manages beneficiary details.
3. **Department**: Scans tokens or CNICs to view details and update the status of the application.
4. **Admin**: Can perform CRUD operations for both Receptionists and Department staff, as well as view and manage application statuses (Pending, In-progress, Completed, Rejected).

## Features

- **Beneficiary**:
  - Submit application with personal details like name, CNIC, phone, address, and purpose.
  - Receive a token along with a QR code for future reference.
  
- **Receptionist**:
  - Manage and submit applications for beneficiaries.
  - Assign tokens and issue QR codes.
  - View application details with token-based searches.

- **Department**:
  - Scan tokens or CNICs to retrieve application details.
  - Track the status of the application and update its progress.

- **Admin**:
  - View all applications submitted by beneficiaries.
  - CRUD operations for both Receptionists and Department members.
  - View the status of all applications and filter them by status (Pending, Progress, Complete, Rejected).

## Tech Stack

- **Frontend**:
  - **React**: JavaScript library for building user interfaces.
  - **Material-UI (MUI)**: React components for faster and easier web development.
  - **Axios**: For making HTTP requests to the backend API.
  - **SweetAlert2**: For user-friendly popups.
  - **Cookies.js**: For handling client-side cookies.
  
- **Backend**:
  - **Node.js & Express.js**: For creating the API endpoints and handling HTTP requests.
  - **MongoDB**: NoSQL database to store data (Beneficiary information, token data, user data).
  - **JWT (JSON Web Tokens)**: For secure user authentication.
  - **bcrypt.js**: For hashing and securing passwords.

## Installation

### Prerequisites

Make sure you have the following installed
- **npm** (Node package manager)

### Steps

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd <project-directory>
