import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import SmartClassAILanding from "@/components/SmartClassAILanding";

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return user ? <AuthenticatedHome /> : <SmartClassAILanding />;
};

const AuthenticatedHome = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold">Welcome to SmartClass AI</h1>
          <p className="text-xl text-muted-foreground">
            Your school management portal is ready!
          </p>
          <div className="flex justify-center gap-4">
            <a 
              href="/profile" 
              className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Manage Profile
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
