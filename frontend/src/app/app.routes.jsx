import { createBrowserRouter } from 'react-router-dom';
import Layout from '../features/layout/Layout.jsx';
import Landing from '../features/landing/Landing.jsx';
import Register from '../features/auth/Register.jsx';
import Login from '../features/auth/Login.jsx';
import OtpVerification from '../features/auth/OtpVerification.jsx';
import ClearanceForm from '../features/application/ClearanceForm.jsx';
import Dashboard from '../features/dashboard/Dashboard.jsx';
import Services from '../features/dashboard/Services.jsx';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />
  },
  {
    element: <Layout />,
    children: [
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "otp", element: <OtpVerification /> },
      { path: "clearance", element: <ClearanceForm /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "services", element: <Services /> }
    ]
  }
]);
