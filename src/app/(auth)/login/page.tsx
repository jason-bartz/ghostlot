"use client";

import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src="/ghostlot-logo.png" alt="GhostLot Logo" className="h-16 mx-auto" />
        </div>
        <LoginForm />
      </div>
    </div>
  );
}