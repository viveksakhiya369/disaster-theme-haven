
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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
