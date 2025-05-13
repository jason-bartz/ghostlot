'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import supabase from '@/lib/supabase';

// Demo mode flag
const DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  userType: 'dealer' | 'consumer' | null;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, userType: 'dealer' | 'consumer', userData: any) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState<'dealer' | 'consumer' | null>(null);

  useEffect(() => {
    // Demo mode setup
    if (DEMO_MODE) {
      console.log('Running in demo mode');
      
      // Create mock user for demo mode
      const mockUser = {
        id: 'demo-dealer-id',
        email: 'demo@dealer.com',
        app_metadata: {},
        user_metadata: {},
        aud: 'authenticated',
        created_at: new Date().toISOString()
      };
      
      setUser(mockUser as User);
      setUserType('dealer');
      setLoading(false);
      return;
    }
    
    // Normal mode - Check active session
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Error fetching session:', error);
        setLoading(false);
        return;
      }

      if (data?.session) {
        setUser(data.session.user);

        // Determine if the user is a dealer or consumer
        try {
          const { data: dealerData, error: dealerError } = await supabase
            .from('dealers')
            .select('id')
            .eq('id', data.session.user.id)
            .single();

          if (dealerError && dealerError.code !== 'PGRST116') {
            console.error('Error checking dealer status:', dealerError);
          }

          if (dealerData) {
            setUserType('dealer');
          } else {
            // If not found in dealers, check consumers table
            const { data: consumerData, error: consumerError } = await supabase
              .from('consumers')
              .select('id')
              .eq('id', data.session.user.id)
              .single();

            if (consumerError && consumerError.code !== 'PGRST116') {
              console.error('Error checking consumer status:', consumerError);
            }

            if (consumerData) {
              setUserType('consumer');
            } else {
              console.error('User not found in dealers or consumers table');
              // User exists in auth but not in either table - handle this case
              setUserType(null);
            }
          }
        } catch (err) {
          console.error('Error determining user type:', err);
          setUserType(null);
        }
      }

      setLoading(false);
    };

    checkSession();

    // Skip setting up auth listener in demo mode
    if (DEMO_MODE) return;

    // Set up auth state change listener
    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        setUser(session.user);

        // Determine if the user is a dealer or consumer
        try {
          const { data: dealerData, error: dealerError } = await supabase
            .from('dealers')
            .select('id')
            .eq('id', session.user.id)
            .single();

          if (dealerError && dealerError.code !== 'PGRST116') {
            console.error('Error checking dealer status:', dealerError);
          }

          if (dealerData) {
            setUserType('dealer');
          } else {
            // If not found in dealers, check consumers table
            const { data: consumerData, error: consumerError } = await supabase
              .from('consumers')
              .select('id')
              .eq('id', session.user.id)
              .single();

            if (consumerError && consumerError.code !== 'PGRST116') {
              console.error('Error checking consumer status:', consumerError);
            }

            if (consumerData) {
              setUserType('consumer');
            } else {
              console.error('User not found in dealers or consumers table');
              // User exists in auth but not in either table - handle this case
              setUserType(null);
            }
          }
        } catch (err) {
          console.error('Error determining user type:', err);
          setUserType(null);
        }
      } else {
        setUser(null);
        setUserType(null);
      }

      setLoading(false);
    });

    return () => {
      data?.subscription?.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      // Demo mode bypass
      if (DEMO_MODE || email === 'test@test.com' && password === 'testtest') {
        console.log('Using demo/test account bypass');

        // Create a mock user object
        const mockUser = {
          id: 'demo-dealer-id',
          email: email || 'demo@dealer.com',
          app_metadata: {},
          user_metadata: {},
          aud: 'authenticated',
          created_at: new Date().toISOString()
        };

        // Set the user and userType directly
        setUser(mockUser as User);
        setUserType('dealer'); // Default to dealer for demo

        // Return success
        return { error: null };
      }

      // Regular authentication flow
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Error signing in:', error);
        return { error };
      }

      if (!data.user) {
        console.error('No user data returned after signin');
        return { error: { message: 'Sign in failed - no user data' } };
      }

      // Determine user type after successful signin
      try {
        const { data: dealerData, error: dealerError } = await supabase
          .from('dealers')
          .select('id')
          .eq('id', data.user.id)
          .single();

        if (dealerError && dealerError.code !== 'PGRST116') {
          console.error('Error checking dealer status during signin:', dealerError);
        }

        if (dealerData) {
          setUserType('dealer');
        } else {
          // Check if user is a consumer
          const { data: consumerData, error: consumerError } = await supabase
            .from('consumers')
            .select('id')
            .eq('id', data.user.id)
            .single();

          if (consumerError && consumerError.code !== 'PGRST116') {
            console.error('Error checking consumer status during signin:', consumerError);
          }

          if (consumerData) {
            setUserType('consumer');
          } else {
            console.error('User not found in dealers or consumers table during signin');
            return { error: { message: 'User profile not found' } };
          }
        }

        return { error: null };
      } catch (err: any) {
        console.error('Error determining user type during signin:', err);
        return { error: { message: 'Failed to determine user type' } };
      }
    } catch (err: any) {
      console.error('Unexpected error during sign in:', err);
      return { error: { message: err.message || 'An unexpected error occurred' } };
    }
  };

  const signUp = async (email: string, password: string, userType: 'dealer' | 'consumer', userData: any) => {
    try {
      // Demo mode bypass
      if (DEMO_MODE) {
        console.log('Using demo mode for signup');
        
        // Create a mock user object
        const mockUser = {
          id: 'demo-user-id',
          email,
          app_metadata: {},
          user_metadata: {},
          aud: 'authenticated',
          created_at: new Date().toISOString()
        };
        
        // Set the user and userType directly
        setUser(mockUser as User);
        setUserType(userType);
        
        return { error: null };
      }
      
      // Create the user with Supabase Auth
      const { data: authData, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error('Error signing up user:', error);
        return { error };
      }

      if (!authData.user?.id) {
        console.error('User ID not found after sign up');
        return { error: { message: 'Failed to create user account' } };
      }

      // Create the user profile in the appropriate table
      const userId = authData.user.id;

      let profileError;
      if (userType === 'dealer') {
        const { error: dealerError } = await supabase.from('dealers').insert([{
          id: userId,
          ...userData
        }]);
        profileError = dealerError;
      } else {
        const { error: consumerError } = await supabase.from('consumers').insert([{
          id: userId,
          ...userData
        }]);
        profileError = consumerError;
      }

      if (profileError) {
        console.error(`Error creating ${userType} profile:`, profileError);
        return { error: { message: `Created account but failed to set up ${userType} profile` } };
      }

      // Explicitly set the user type after successful signup
      setUserType(userType);

      return { error: null };
    } catch (err: any) {
      console.error('Unexpected error during sign up:', err);
      return { error: { message: err.message || 'An unexpected error occurred' } };
    }
  };

  const signOut = async () => {
    if (DEMO_MODE) {
      // Handle demo mode signout without calling Supabase
      setUser(null);
      setUserType(null);
      return;
    }
    
    await supabase.auth.signOut();
  };

  const resetPassword = async (email: string) => {
    if (DEMO_MODE) {
      // Mock successful password reset in demo mode
      console.log('Demo mode: Password reset requested for', email);
      return { error: null };
    }
    
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    
    return { error };
  };

  const value = {
    user,
    loading,
    userType,
    signIn,
    signUp,
    signOut,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}