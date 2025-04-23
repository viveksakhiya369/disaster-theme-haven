import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AlertsPage from "./pages/alerts/Index";
import IncidentsPage from "./pages/incidents/Index";
import MapViewPage from "./pages/map/Index";
import PersonnelPage from "./pages/personnel/Index";
import ResourcesPage from "./pages/resources/Index";
import ReportsPage from "./pages/reports/Index";
import PlanningPage from "./pages/planning/Index";
import ContactsPage from "./pages/contacts/Index";
import SettingsPage from "./pages/settings/Index";
import LendingPage from "./pages/lending/Index";
import LandingPage from "./pages/landing/Index";
import LoginPage from "./pages/auth/Login";
import RegisterPage from "./pages/auth/Register";
import ForgotPasswordPage from "./pages/auth/ForgotPassword";
import SendAlertsPage from "./pages/admin/SendAlerts";
import MapView from "./pages/map/MapView";
import VerifyEmail from "./pages/auth/VerifyEmail";
import DepartmentLoginPage from "./pages/auth/DepartmentLogin";
import DepartmentDashboard from "./pages/department/DepartmentDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Index />} />
          <Route path="/alerts" element={<AlertsPage />} />
          <Route path="/incidents" element={<IncidentsPage />} />
          <Route path="/map" element={<MapViewPage />} />
          <Route path="/personnel" element={<PersonnelPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/planning" element={<PlanningPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/lending" element={<LendingPage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<RegisterPage />} />
          <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/admin/alerts" element={<SendAlertsPage />} />
          <Route path="/map/view" element={<MapView />} />
          <Route path="/auth/verify-email" element={<VerifyEmail />} />
          <Route path="/auth/department-login" element={<DepartmentLoginPage />} />
          <Route path="/department/dashboard" element={<DepartmentDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
