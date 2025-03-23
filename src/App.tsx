
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
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
import LoginPage from "./pages/auth/Login";
import RegisterPage from "./pages/auth/Register";
import ForgotPasswordPage from "./pages/auth/ForgotPassword";
import PersonnelProfilePage from "./pages/personnel/ProfileView";
import CreateReportPage from "./pages/reports/CreateReport";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: true,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/alerts" element={<AlertsPage />} />
            <Route path="/incidents" element={<IncidentsPage />} />
            <Route path="/map" element={<MapViewPage />} />
            <Route path="/personnel" element={<PersonnelPage />} />
            <Route path="/personnel/profile/:id" element={<PersonnelProfilePage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/reports/create" element={<CreateReportPage />} />
            <Route path="/planning" element={<PlanningPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            
            {/* Auth routes */}
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/auth/register" element={<RegisterPage />} />
            <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
