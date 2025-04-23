
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Mail, ArrowLeft } from "lucide-react";

const VerifyEmail = () => {
  const email = localStorage.getItem('pendingVerificationEmail') || 'your email';

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-slate-100 dark:bg-slate-900 p-4">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-slate-800 p-8 rounded-xl shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Disaster<span className="text-primary">Ctrl</span></h1>
          <div className="mt-8 flex justify-center">
            <Mail className="h-12 w-12 text-primary" />
          </div>
          <h2 className="mt-6 text-2xl font-semibold">Verify your email</h2>
          <p className="mt-4 text-sm text-muted-foreground">
            We've sent a verification link to <strong>{email}</strong>. Please check your email and click the link to verify your account.
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-center text-muted-foreground">
            Once verified, you can proceed to login to your account.
          </p>
          <Link to="/auth/login" className="block w-full">
            <Button variant="outline" className="w-full flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
