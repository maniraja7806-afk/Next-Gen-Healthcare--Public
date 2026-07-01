# 🏥 Cerulean Health - Comprehensive Hospital Management System

A highly integrated, multi-role hospital management system built with modern web technologies. Cerulean Health provides tailored portals for various hospital staff roles and patients, streamlining workflows, eliminating data silos, and improving overall patient care.

---

## 🎯 The Problem It Solves

In many healthcare facilities, day-to-day operations are fragmented. Different departments (Reception, Laboratory, Pharmacy, Insurance) often use disparate software systems or rely heavily on paper trails. This leads to critical issues:
- **Delayed Patient Care:** Time is wasted physically moving files, locating test results, or waiting for manual insurance approvals.
- **Data Silos & Errors:** Miscommunication between doctors and pharmacies frequently leads to prescription errors or lack of patient context.
- **Inventory Mismanagement:** Pharmacies run out of critical stock unexpectedly due to a lack of real-time usage tracking.
- **Tedious Administrative Burdens:** Manual pre-authorization and claims processes frustrate both patients and hospital administrative staff.

**Cerulean Health solves this by providing a unified, real-time ecosystem.** When a doctor writes a prescription, the pharmacy queue updates instantly. When a lab test is ordered, the laboratory dashboard reflects it immediately. Every single role gets exactly the data they need, precisely when they need it, creating a seamless experience for both healthcare providers and patients.

---

## ✨ Core Features & Modules

### 👨‍⚕️ Clinical & Patient Care
- **Doctor Dashboard:** Real-time patient queues, digital prescription generation, and access to complete longitudinal medical histories.
- **Nurse Station:** Vital signs monitoring, ward management, inpatient tracking, and automated task delegation.
- **Patient Portal:** Patients can log in to view their upcoming appointments, download their medical records, track active prescriptions securely, and even connect external wearable health data.

### 💊 Pharmacy & Inventory
- **Smart Dispensing:** Active prescription queues are linked directly to doctor consultations. Pharmacies can view and dispense medications without physical paper slips.
- **Inventory Management:** Real-time stock tracking with visual low-stock and critical-stock alerts.
- **Automated Reordering:** One-click reorder requests for critical medications directly to vendors.
- **Data Export:** Export current inventory status to CSV for routine audits, compliance, and accounting.

### 🔬 Laboratory & Diagnostics
- **Sample Registration:** Instantly register and tag biological samples (Blood, Urine, Swab, etc.) with patient IDs.
- **Result Processing:** Update test parameters (e.g., Complete Blood Count, Liver Function Test) alongside automated reference ranges.
- **Automated PDF Reports:** Generate professional, printable, and downloadable laboratory reports with one click using our integrated PDF generator.

### 🏢 Administration & Front Desk
- **Receptionist Dashboard:** Streamlined new patient registration flows and real-time appointment booking interfaces.
- **Insurance Processing:** A dedicated portal for handling TPAs (Third Party Administrators), submitting pre-authorization requests, tracking estimated costs, and managing claim statuses.
- **Admin Analytics:** (Super Admin / Hospital Admin) A system-wide overview of hospital metrics, revenue tracking, staff management, and broad system configurations.

---

## 💡 Suggestions for Future Enhancements (Roadmap)

As this platform scales, implementing the following features would drastically elevate its value and utility:

1. **Telemedicine & Virtual Consultations:** Integrating WebRTC-based video consultations directly within the Patient and Doctor portals to support remote care and post-operative follow-ups.
2. **AI-Powered Diagnostics Assistant:** Integrating a Large Language Model (like Gemini) to flag potential drug-to-drug interactions, summarize extremely long medical histories into 3-bullet summaries for doctors, or pre-analyze lab parameters for anomalies.
3. **Automated Billing & Invoicing Ledger:** Tying the pharmacy, lab, and consultation modules into a unified billing ledger with payment gateway integration (e.g., Stripe, PayPal, Razorpay) for instant digital payments.
4. **IoT & Wearable Health Sync:** Expanding the Patient Portal to allow direct API synchronization with smartwatches (Apple Health, Google Fit, Fitbit) to log continuous heart rate, sleep, and activity data directly to their medical records.
5. **Automated Notification Engine:** Integrating an SMS/WhatsApp service (like Twilio) to send automated alerts when lab results are ready, or when a patient has an upcoming appointment in 24 hours.

---

## 🛠️ Technical Stack

- **Frontend Framework**: React 18 with TypeScript for type-safe, scalable UI development.
- **Styling**: Tailwind CSS for rapid, utility-first, responsive styling.
- **Routing**: React Router DOM for seamless Single Page Application (SPA) navigation.
- **Icons**: Lucide React.
- **Animations**: Framer Motion for buttery-smooth page transitions and modal overlays.
- **Document Generation**: `jsPDF` and `jspdf-autotable` for generating strict, professional medical PDFs client-side.
- **Build Tool**: Vite (Lightning-fast HMR and optimized production builds).

---

## 🔐 Demo Credentials

You can use the following credentials to explore the different portals of the application. *(Note: The demo login screen features quick-access buttons for testing convenience).*

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

---

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

---

## 📁 Project Structure

Here is a brief overview of the project's folder structure to help you navigate the codebase:

```text
cerulean-health/
├── public/                 # Static assets (images, icons, etc.)
├── src/                    # Source code
│   ├── components/         # Reusable UI components (Modals, Charts, Skeletons)
│   ├── layouts/            # Page layouts (e.g., AppLayout with Sidebar routing)
│   ├── pages/              # Application pages and role-based dashboards
│   ├── utils/              # Helper functions (e.g., PDF generation utilities)
│   ├── App.tsx             # Main application component & core routing logic
│   └── index.css           # Global Tailwind CSS styles and directives
├── package.json            # Project metadata and scripts
├── tailwind.config.js      # Tailwind CSS configuration and custom themes
├── tsconfig.json           # TypeScript compilation configuration
└── vite.config.ts          # Vite configuration and plugins
```
