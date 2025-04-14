
import Sidebar from "./Sidebar";
import DashboardHeader from "./DashboardHeader";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen flex">
      <div className="fixed top-0 left-0 h-full z-10">
        <Sidebar />
      </div>
      <div className="flex-1 ml-16 md:ml-64 min-h-screen flex flex-col">
        <DashboardHeader />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
