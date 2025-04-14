
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, MailCheck } from "lucide-react";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Here you would typically handle password reset request
    toast({
      title: "Reset Link Sent",
      description: "Check your email for password reset instructions",
    });
    
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-slate-100 dark:bg-slate-900 p-4">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-slate-800 p-8 rounded-xl shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Disaster<span className="text-primary">Ctrl</span></h1>
          <h2 className="mt-2 text-xl font-semibold">Reset your password</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            We'll send you a link to reset your password
          </p>
        </div>
        
        {!submitted ? (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
                placeholder="your.email@example.com"
              />
            </div>
            
            <Button type="submit" className="w-full flex items-center justify-center gap-2">
              <MailCheck className="h-4 w-4" />
              Send Reset Link
            </Button>
            
            <div className="text-center">
              <Link to="/auth/login" className="text-primary hover:underline inline-flex items-center gap-1">
                <ArrowLeft className="h-4 w-4" />
                Back to login
              </Link>
            </div>
          </form>
        ) : (
          <div className="mt-8 space-y-6">
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
              <MailCheck className="h-12 w-12 mx-auto text-green-500 mb-2" />
              <h3 className="text-lg font-medium">Check your email</h3>
              <p className="text-sm text-muted-foreground mt-2">
                We've sent a password reset link to <strong>{email}</strong>
              </p>
            </div>
            
            <div className="text-center">
              <Link to="/auth/login" className="text-primary hover:underline inline-flex items-center gap-1">
                <ArrowLeft className="h-4 w-4" />
                Back to login
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
