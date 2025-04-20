import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SimplifiedMap from "@/components/map/SimplifiedMap";
import { 
  ArrowRight, 
  AlertTriangle, 
  Shield, 
  Users, 
  Clock, 
  Map, 
  FileText, 
  Send,
  CheckCircle2,
  Building2,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ChevronRight,
  Globe
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const LandingPage = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Background Image */}
      <header className="relative bg-primary py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img 
            src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
            alt="Emergency response backdrop" 
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-primary/60" />
        </div>
        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-4 animate-fade-in">
            DisasterCtrl
          </h1>
          <p className="text-xl md:text-2xl text-white text-center max-w-2xl mb-8 animate-slide-up">
            Comprehensive disaster management platform for emergency response and resource coordination
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{animationDelay: "0.2s"}}>
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90 backdrop-blur-sm shadow-lg"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="bg-transparent border-white text-white hover:bg-white/10 backdrop-blur-sm shadow-lg"
              onClick={() => navigate("/alerts")}
            >
              View Alerts
            </Button>
          </div>
        </div>
      </header>

      {/* Stats Banner */}
      <div className="bg-white py-8 shadow-md">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 text-center">
            <div className="p-4">
              <p className="text-3xl md:text-4xl font-bold text-primary mb-1">1000+</p>
              <p className="text-muted-foreground">Agencies</p>
            </div>
            <div className="p-4">
              <p className="text-3xl md:text-4xl font-bold text-primary mb-1">24/7</p>
              <p className="text-muted-foreground">Support</p>
            </div>
            <div className="p-4">
              <p className="text-3xl md:text-4xl font-bold text-primary mb-1">50+</p>
              <p className="text-muted-foreground">Countries</p>
            </div>
            <div className="p-4">
              <p className="text-3xl md:text-4xl font-bold text-primary mb-1">10K+</p>
              <p className="text-muted-foreground">Users</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section with Image */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12 mb-16">
            <div className="md:w-1/2 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Powerful Tools for Emergency Management
              </h2>
              <p className="text-lg mb-6 text-muted-foreground">
                DisasterCtrl provides comprehensive tools for emergency response teams to coordinate resources, track personnel, and manage incidents effectively during crisis situations.
              </p>
              <Button 
                onClick={() => navigate("/dashboard")}
                className="bg-primary text-white hover:bg-primary/90"
              >
                Explore Features
              </Button>
            </div>
            <div className="md:w-1/2 rounded-lg overflow-hidden shadow-xl animate-slide-in" style={{animationDelay: "0.3s"}}>
              <img 
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085" 
                alt="Emergency management dashboard" 
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>

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

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            How DisasterCtrl Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4 text-primary">
                <AlertTriangle size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Detect Incidents</h3>
              <p className="text-muted-foreground">
                Quickly identify and classify emergency situations through our advanced alert system
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4 text-primary">
                <Users size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Mobilize Resources</h3>
              <p className="text-muted-foreground">
                Coordinate personnel, equipment and other essential resources with real-time tracking
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4 text-primary">
                <CheckCircle2 size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Resolve & Report</h3>
              <p className="text-muted-foreground">
                Track outcomes, analyze response metrics, and generate detailed reports
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 md:py-24 bg-accent">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Trusted by Emergency Response Teams
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard 
              quote="DisasterCtrl has completely transformed how we manage emergency situations. The real-time coordination capabilities are invaluable."
              author="Sarah Johnson"
              position="Emergency Manager, Metro City"
            />
            <TestimonialCard 
              quote="The resource allocation features have helped us optimize our response times by 40%. An essential tool for any emergency services team."
              author="David Rodriguez"
              position="Fire Chief, Western District"
            />
            <TestimonialCard 
              quote="From initial alert to after-action reporting, DisasterCtrl provides a seamless experience that has improved our operational efficiency."
              author="Lisa Chen"
              position="Director, Regional Disaster Agency"
            />
          </div>
        </div>
      </section>

      {/* CTA Section with Background */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1531297484001-80022131f5a1" 
            alt="Emergency response coordination" 
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-primary/70" />
        </div>
        <div className="container mx-auto px-6 flex flex-col items-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-white">
            Ready to enhance your disaster response?
          </h2>
          <p className="text-xl text-center max-w-2xl mb-8 text-white/90">
            Get started with our comprehensive disaster management platform today
          </p>
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-white/90"
            onClick={() => navigate("/dashboard")}
          >
            Go to Dashboard
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Contact Our Team</h2>
              <p className="mb-8 text-muted-foreground">
                Have questions about DisasterCtrl? Our expert team is ready to help you implement the perfect emergency management solution for your organization.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full text-primary">
                    <Phone size={20} />
                  </div>
                  <span>+1 (888) 555-HELP</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full text-primary">
                    <Send size={20} />
                  </div>
                  <span>support@disasterctrl.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-full text-primary">
                    <Building2 size={20} />
                  </div>
                  <span>123 Emergency Lane, Crisis City, WA 98765</span>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" 
                alt="Emergency response team coordination" 
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-slate-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-6">
          {/* Top Footer Section with Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
            {/* Company Info Column */}
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-bold mb-6 text-white">DisasterCtrl</h3>
              <p className="text-slate-300 mb-6 max-w-md">
                Comprehensive emergency management platform enabling rapid coordination, 
                effective response, and real-time resource allocation during crisis situations.
              </p>
              <div className="flex space-x-4">
                <SocialIcon icon={<Facebook size={18} />} />
                <SocialIcon icon={<Twitter size={18} />} />
                <SocialIcon icon={<Instagram size={18} />} />
                <SocialIcon icon={<Linkedin size={18} />} />
              </div>
            </div>

            {/* Quick Links Column */}
            <div>
              <h4 className="font-semibold text-lg mb-6 text-white">Quick Links</h4>
              <ul className="space-y-3">
                <FooterLink to="/dashboard">Dashboard</FooterLink>
                <FooterLink to="/alerts">Alerts</FooterLink>
                <FooterLink to="/incidents">Incidents</FooterLink>
                <FooterLink to="/resources">Resources</FooterLink>
                <FooterLink to="/map">Interactive Map</FooterLink>
              </ul>
            </div>

            {/* Features Column */}
            <div>
              <h4 className="font-semibold text-lg mb-6 text-white">Features</h4>
              <ul className="space-y-3">
                <FooterLink to="#">Alert Management</FooterLink>
                <FooterLink to="#">Resource Tracking</FooterLink>
                <FooterLink to="#">Personnel Coordination</FooterLink>
                <FooterLink to="#">Analytics & Reporting</FooterLink>
                <FooterLink to="#">API Integration</FooterLink>
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <h4 className="font-semibold text-lg mb-6 text-white">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <div className="text-primary mt-1"><Phone size={16} /></div>
                  <span className="text-slate-300">+1 (888) 555-HELP</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="text-primary mt-1"><Mail size={16} /></div>
                  <span className="text-slate-300">support@disasterctrl.com</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="text-primary mt-1"><Building2 size={16} /></div>
                  <span className="text-slate-300">123 Emergency Lane, Crisis City, WA 98765</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="text-primary mt-1"><Globe size={16} /></div>
                  <span className="text-slate-300">www.disasterctrl.com</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="bg-slate-800 rounded-lg p-6 mb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div className="mb-4 md:mb-0 md:mr-8">
                <h4 className="text-xl font-semibold mb-2">Stay Updated</h4>
                <p className="text-slate-300">Subscribe to our newsletter for the latest updates and features</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-4 py-2 rounded bg-slate-700 border border-slate-600 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button className="bg-primary hover:bg-primary/90">
                  Subscribe
                  <ChevronRight size={16} />
                </Button>
              </div>
            </div>
          </div>

          <Separator className="bg-slate-700 mb-8" />

          {/* Bottom Footer Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between text-slate-400 text-sm">
            <div className="mb-4 md:mb-0">
              <p>&copy; {currentYear} DisasterCtrl. All rights reserved.</p>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <Link to="#" className="hover:text-primary transition-colors">Terms of Service</Link>
              <Link to="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link to="#" className="hover:text-primary transition-colors">Cookie Policy</Link>
              <Link to="#" className="hover:text-primary transition-colors">Accessibility</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* New Map Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Real-time Disaster Alerts
          </h2>
          <div className="w-full mx-auto">
            <SimplifiedMap />
          </div>
        </div>
      </section>
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
    <Card className="border border-border/40 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
      <CardContent className="p-6 flex flex-col items-center text-center">
        <div className="bg-primary/10 p-3 rounded-full mb-4 text-primary">
          {icon}
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

// Testimonial Card component
const TestimonialCard = ({ quote, author, position }: {
  quote: string;
  author: string;
  position: string;
}) => {
  return (
    <Card className="border border-border/40 shadow-sm hover:shadow-md transition-all duration-300">
      <CardContent className="p-6">
        <div className="mb-4 text-primary">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.9991 15.05L7.04906 17.859L8.14906 12.254L4.20006 8.62001L9.81806 7.84001L11.9991 2.70001L14.1801 7.84001L19.7981 8.62001L15.8491 12.254L16.9491 17.859L11.9991 15.05Z" 
            fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </div>
        <p className="mb-4 italic text-muted-foreground">"{quote}"</p>
        <div>
          <p className="font-semibold">{author}</p>
          <p className="text-sm text-muted-foreground">{position}</p>
        </div>
      </CardContent>
    </Card>
  );
};

// Footer Link Component
const FooterLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
  return (
    <li>
      <Link 
        to={to} 
        className="text-slate-300 hover:text-primary transition-colors flex items-center group"
      >
        <ChevronRight size={16} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
        {children}
      </Link>
    </li>
  );
};

// Social Icon Component
const SocialIcon = ({ icon }: { icon: React.ReactNode }) => {
  return (
    <a 
      href="#" 
      className="bg-slate-800 hover:bg-primary text-white p-2 rounded-full transition-colors duration-300 flex items-center justify-center"
    >
      {icon}
    </a>
  );
};

export default LandingPage;
