# Cerulean Health - Hospital Management System

A comprehensive, multi-role hospital management system built with modern web technologies. This application provides tailored portals for various hospital staff roles and patients, streamlining workflows, improving patient care, and managing hospital resources effectively.

## Features

- **Multi-Role Dashboards**: Tailored interfaces for Super Admin, Hospital Admin, Doctors, Nurses, Receptionists, Laboratory, Pharmacy, Insurance personnel, and Patients.
- **Patient Management**: Complete patient registration, medical history tracking, and appointment scheduling.
- **Prescriptions & Pharmacy**: End-to-end prescription management, from doctor's prescription to pharmacy dispensing and inventory alerts.
- **Laboratory Integration**: Sample registration, test processing, and automated PDF report generation.
- **Insurance Processing**: Pre-authorization requests, claims tracking, and status monitoring.
- **Document Export**: PDF generation for medical records, prescriptions, and lab reports.
- **Data Export**: CSV export functionality for pharmacy inventory.

## Technical Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Document Generation**: jsPDF, jspdf-autotable
- **Build Tool**: Vite

## Demo Credentials

You can use the following credentials to explore the different portals of the application:

| Role | Email | Password |
| :--- | :--- | :--- |
| **Super Admin** | `superadmin@system.org` | `password123` |
| **Hospital Admin** | `admin@hospital.org` | `password123` |
| **Doctor** | `dr.karthick@hospital.org` | `password123` |
| **Nurse** | `nurse.priya@hospital.org` | `password123` |
| **Receptionist** | `reception@hospital.org` | `password123` |
| **Laboratory** | `lab@hospital.org` | `password123` |
| **Pharmacy** | `pharmacy@hospital.org` | `password123` |
| **Insurance** | `insurance@hospital.org` | `password123` |
| **Patient** | `patient.meenakshi@email.com` | `password123` |

## 🚀 Installation & Setup

Follow these steps to get the project up and running on your local machine.

### Prerequisites

Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/en/) (v16.0.0 or higher recommended)
- npm (usually comes with Node.js) or [Yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

### Step 1: Clone the Repository

Open your terminal and clone the repository using Git:
```bash
git clone https://github.com/your-username/cerulean-health.git
cd cerulean-health
```

### Step 2: Install Dependencies

Install the required project dependencies. We use `npm` by default:
```bash
npm install
```
*(Alternatively, you can use `yarn install` or `pnpm install` if you prefer).*

### Step 3: Running the Development Server

Start the Vite development server to view the app in your browser:
```bash
npm run dev
```
The application will typically be available at `http://localhost:5173` (or the port specified in your terminal). The development server includes hot-module replacement (HMR) for instant feedback while coding.

### Step 4: Building for Production

To create a production-ready build:
```bash
npm run build
```
This will compile the TypeScript code and bundle the assets into the `dist/` directory.

To preview the production build locally:
```bash
npm run preview
```

## 📁 Project Structure

Here is a brief overview of the project's folder structure:
```text
cerulean-health/
├── public/                 # Static assets (images, icons, etc.)
├── src/                    # Source code
│   ├── components/         # Reusable UI components
│   ├── layouts/            # Page layouts (e.g., AppLayout with Sidebar)
│   ├── pages/              # Application pages and role-based dashboards
│   ├── utils/              # Helper functions (e.g., PDF generation)
│   ├── App.tsx             # Main application component & routing
│   └── index.css           # Global Tailwind CSS styles
├── package.json            # Project metadata and scripts
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite configuration
```

## Key Functionalities

- **PDF Generation**: Medical records, prescriptions, and lab results can be exported directly to PDF.
- **Inventory Management**: Pharmacy module includes low-stock alerts, reorder functionality, and CSV export.
- **Form Modals**: Quick access form overlays for patient registration, sample collection, and insurance pre-authorization.
- **Responsive Design**: The application is fully responsive, optimized for both desktop and mobile devices.
- **Dark Mode Support**: Built-in support for light and dark themes based on user preference.
