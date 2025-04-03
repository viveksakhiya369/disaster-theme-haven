
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ArrowRight, AlertTriangle, Shield, Users, Clock, Map, FileText, Send } from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <header className="bg-primary py-16 md:py-24">
        <div className="container mx-auto px-6 flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-4">
            DisasterCtrl
          </h1>
          <p className="text-xl md:text-2xl text-white text-center max-w-2xl mb-8">
            Comprehensive disaster management platform for emergency response and resource coordination
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="bg-transparent border-white text-white hover:bg-white/10"
              onClick={() => navigate("/alerts")}
            >
              View Alerts
            </Button>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<AlertTriangle />}
              title="Alert Management"
              description="Receive, track, and respond to critical alerts in real-time"
            />
            <FeatureCard 
              icon={<Map />}
              title="Interactive Mapping"
              description="Visualize incidents and resources on an interactive map"
            />
            <FeatureCard 
              icon={<Users />}
              title="Personnel Tracking"
              description="Manage and coordinate your emergency response teams"
            />
            <FeatureCard 
              icon={<Shield />}
              title="Resource Management"
              description="Track and allocate critical resources efficiently"
            />
            <FeatureCard 
              icon={<Clock />}
              title="Response Time Analytics"
              description="Monitor and improve response times with data-driven insights"
            />
            <FeatureCard 
              icon={<FileText />}
              title="Detailed Reporting"
              description="Generate comprehensive reports for analysis and compliance"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-accent">
        <div className="container mx-auto px-6 flex flex-col items-center">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            Ready to enhance your disaster response?
          </h2>
          <p className="text-xl text-center max-w-2xl mb-8">
            Get started with our comprehensive disaster management platform today
          </p>
          <Button 
            size="lg" 
            className="bg-primary text-white hover:bg-primary/90"
            onClick={() => navigate("/")}
          >
            Go to Dashboard
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-sidebar-background text-sidebar-foreground">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold">DisasterCtrl</h3>
              <p>Emergency Management System</p>
            </div>
            <div className="flex gap-6">
              <Link to="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
              <Link to="/alerts" className="hover:text-primary transition-colors">Alerts</Link>
              <Link to="/incidents" className="hover:text-primary transition-colors">Incidents</Link>
              <Link to="/resources" className="hover:text-primary transition-colors">Resources</Link>
            </div>
          </div>
          <div className="border-t border-sidebar-border mt-6 pt-6 text-center">
            <p>&copy; {new Date().getFullYear()} DisasterCtrl. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Feature Card component for the features section
const FeatureCard = ({ icon, title, description }: { 
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div className="bg-card rounded-xl p-6 text-card-foreground border border-border/40 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-center text-center">
      <div className="bg-primary/10 p-3 rounded-full mb-4 text-primary">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default LandingPage;
