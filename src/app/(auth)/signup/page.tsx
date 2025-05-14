"use client";

import SignUpForm from '@/components/auth/SignUpForm';

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src="/ghostlot.png" alt="GhostLot Logo" className="h-16 mx-auto" />
        </div>
        <SignUpForm />
      </div>
    </div>
  );
}