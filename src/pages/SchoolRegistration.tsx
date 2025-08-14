import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const SchoolRegistration = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    organizationName: '',
    fullName: '',
    email: '',
    contactNumber: '',
    subdomain: '',
    username: '',
    password: '',
    acceptTerms: false
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Auto-format subdomain
    if (field === 'subdomain') {
      setFormData(prev => ({
        ...prev,
        subdomain: (value as string).toLowerCase().replace(/[^a-z0-9]/g, '')
      }));
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!formData.acceptTerms) {
        throw new Error('Please accept the terms of service');
      }

      // Sign up the user first
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            display_name: formData.fullName,
            organization_name: formData.organizationName,
            contact_number: formData.contactNumber,
            sub_domain: formData.subdomain,
            username: formData.username,
            role: 'admin'
          }
        }
      });

      if (authError) throw authError;

      if (authData.user) {
        // Create the school entry
        const { error: schoolError } = await supabase
          .from('schools')
          .insert({
            name: formData.organizationName,
            subdomain: formData.subdomain,
            admin_email: formData.email,
            contact_number: formData.contactNumber
          });

        if (schoolError) throw schoolError;

        toast({
          title: "Success!",
          description: "Account created successfully. Please check your email to verify your account.",
        });

        // Redirect to school search page
        navigate('/school-search');
      }
      
    } catch (error: any) {
      console.error('Error registering:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to create account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-large bg-card/95 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="p-2 hover:bg-accent/50"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="text-sm text-muted-foreground">
              Have an account? <button onClick={() => navigate('/school-search')} className="text-primary hover:underline">Sign In</button>
            </div>
          </div>
          <CardTitle className="text-3xl font-bold">Create Your Account</CardTitle>
          <p className="text-primary text-lg">
            It's free for 14 days. No credit card required.
          </p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="organization" className="text-sm font-medium">
                  Organization Name*
                </Label>
                <Input
                  id="organization"
                  type="text"
                  placeholder="Your Organization Name Here"
                  value={formData.organizationName}
                  onChange={(e) => handleInputChange('organizationName', e.target.value)}
                  required
                  className="h-12 bg-muted/50 border-border/50 focus:border-primary transition-smooth"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-medium">
                  Your Full Name*
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Your Full Name Here"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  required
                  className="h-12 bg-muted/50 border-border/50 focus:border-primary transition-smooth"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address*
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@companyname.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                  className="h-12 bg-muted/50 border-border/50 focus:border-primary transition-smooth"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact" className="text-sm font-medium">
                  Contact Number*
                </Label>
                <Input
                  id="contact"
                  type="tel"
                  placeholder="201-555-0123"
                  value={formData.contactNumber}
                  onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                  required
                  className="h-12 bg-muted/50 border-border/50 focus:border-primary transition-smooth"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subdomain" className="text-sm font-medium">
                Select Sub-domain*
              </Label>
              <div className="flex items-center border border-border/50 rounded-lg overflow-hidden focus-within:border-primary transition-smooth">
                <Input
                  id="subdomain"
                  type="text"
                  placeholder="Your Sub-Domain Name Here"
                  value={formData.subdomain}
                  onChange={(e) => handleInputChange('subdomain', e.target.value)}
                  required
                  className="border-0 rounded-none h-12 bg-transparent focus:ring-0"
                />
                <div className="px-4 py-3 bg-muted/50 text-sm text-muted-foreground border-l border-border/50">
                  .classe365.com
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium">
                  Username*
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Your Username Here"
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  required
                  className="h-12 bg-muted/50 border-border/50 focus:border-primary transition-smooth"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password*
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Your Password Here"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  required
                  className="h-12 bg-muted/50 border-border/50 focus:border-primary transition-smooth"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="terms"
                checked={formData.acceptTerms}
                onCheckedChange={(checked) => handleInputChange('acceptTerms', checked)}
              />
              <Label htmlFor="terms" className="text-sm text-muted-foreground">
                By creating a Classe365 account, you're agreeing to accept our{' '}
                <a href="#" className="text-primary hover:underline">terms of service</a>.
              </Label>
            </div>

            <Button 
              type="submit" 
              disabled={isLoading} 
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-lg transition-smooth"
            >
              {isLoading ? "Registering..." : "Register"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SchoolRegistration;