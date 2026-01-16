
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Session, User } from '@supabase/supabase-js';
import { toast } from 'sonner';

interface AuthContextType {
    session: Session | null;
    user: User | null;
    loading: boolean;
    signOut: () => Promise<void>;
    signInWithGoogle: () => Promise<void>;
    signInWithGithub: () => Promise<void>;
    signInWithEmail: (email: string, password: string) => Promise<{ user: User | null; session: Session | null } | null>;
    signUpWithEmail: (email: string, password: string, data: { full_name: string; phone?: string }) => Promise<{ user: User | null; session: Session | null } | null>;
}

const AuthContext = createContext<AuthContextType>({
    session: null,
    user: null,
    loading: true,
    signOut: async () => { },
    signInWithGoogle: async () => { },
    signInWithGithub: async () => { },
    signInWithEmail: async () => null,
    signUpWithEmail: async () => null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [session, setSession] = useState<Session | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Get initial session
        const getInitialSession = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                setSession(session);
                setUser(session?.user ?? null);
            } catch (error) {
                console.error('Error checking auth session:', error);
            } finally {
                setLoading(false);
            }
        };

        getInitialSession();

        // Listen for changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const signOut = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            toast.success('Signed out successfully');
        } catch (error: any) {
            toast.error('Error accessing logout: ' + (error.message || 'Unknown error'));
        }
    };

    const signInWithGoogle = async () => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/auth?mode=callback`,
                }
            });
            if (error) throw error;
        } catch (error: any) {
            toast.error('Error logging in with Google: ' + error.message);
        }
    };

    const signInWithGithub = async () => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'github',
                options: {
                    redirectTo: `${window.location.origin}/auth?mode=callback`,
                }
            });
            if (error) throw error;
        } catch (error: any) {
            toast.error('Error logging in with Github: ' + error.message);
        }
    };

    const signInWithEmail = async (email: string, password: string) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) throw error;
            return data;
        } catch (error: any) {
            toast.error(error.message);
            throw error;
        }
    };

    const signUpWithEmail = async (email: string, password: string, metadata: { full_name: string; phone?: string }) => {
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: metadata
                }
            });
            if (error) throw error;
            return data;
        } catch (error: any) {
            toast.error(error.message);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ session, user, loading, signOut, signInWithGoogle, signInWithGithub, signInWithEmail, signUpWithEmail }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
