import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

const Register = () => {
  const [formData, setFormData] = useState({
    organizationName: "",
    fullName: "",
    email: "",
    contactNumber: "",
    subDomain: "",
    username: "",
    password: "",
    agreedToTerms: false,
  });
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreedToTerms) {
      toast({
        title: "Terms Required",
        description: "Please agree to the terms of service",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Sign up the user with additional metadata
      const { error } = await signUp(formData.email, formData.password, {
        display_name: formData.fullName,
        organization_name: formData.organizationName,
        contact_number: formData.contactNumber,
        sub_domain: formData.subDomain,
        username: formData.username,
        role: 'admin' // Set as admin since this is for school management
      });

      if (error) {
        toast({
          title: "Registration Failed",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Registration Successful!",
        description: "Please check your email to verify your account and complete the setup.",
      });

      // Redirect to home page
      navigate("/");
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <Card className="shadow-2xl border-0 bg-card/95 backdrop-blur">
          <CardHeader className="text-center pb-8">
            <div className="flex justify-end mb-4">
              <span className="text-sm text-muted-foreground">
                Have an account?{" "}
                <Link to="/auth" className="text-primary hover:underline font-medium">
                  Sign In
                </Link>
              </span>
            </div>
            <CardTitle className="text-3xl font-bold text-foreground">
              Create Your Account
            </CardTitle>
            <p className="text-primary mt-2">
              It's free for 14 days. No credit card required.
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Organization Name and Full Name */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="organizationName" className="text-foreground font-medium">
                    Organization Name*
                  </Label>
                  <Input
                    id="organizationName"
                    name="organizationName"
                    type="text"
                    value={formData.organizationName}
                    onChange={handleInputChange}
                    placeholder="Your Organization Name Here"
                    required
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="fullName" className="text-foreground font-medium">
                    Your Full Name*
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Your Full Name Here"
                    required
                    className="mt-2"
                  />
                </div>
              </div>

              {/* Email and Contact Number */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="email" className="text-foreground font-medium">
                    Email Address*
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="name@companyname.com"
                    required
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="contactNumber" className="text-foreground font-medium">
                    Contact Number*
                  </Label>
                  <Input
                    id="contactNumber"
                    name="contactNumber"
                    type="tel"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    placeholder="201-555-0123"
                    required
                    className="mt-2"
                  />
                </div>
              </div>

              {/* Sub-domain */}
              <div>
                <Label htmlFor="subDomain" className="text-foreground font-medium">
                  Select Sub-domain*
                </Label>
                <div className="flex mt-2">
                  <Input
                    id="subDomain"
                    name="subDomain"
                    type="text"
                    value={formData.subDomain}
                    onChange={handleInputChange}
                    placeholder="Your Sub-Domain Name Here"
                    required
                    className="rounded-r-none"
                  />
                  <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-input bg-muted text-muted-foreground text-sm">
                    .classe365.com
                  </span>
                </div>
              </div>

              {/* Username and Password */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="username" className="text-foreground font-medium">
                    Username*
                  </Label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Your Username Here"
                    required
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="password" className="text-foreground font-medium">
                    Password*
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Your Password Here"
                    required
                    className="mt-2"
                  />
                </div>
              </div>

              {/* Terms checkbox */}
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="agreedToTerms"
                  checked={formData.agreedToTerms}
                  onCheckedChange={(checked) =>
                    setFormData(prev => ({ ...prev, agreedToTerms: !!checked }))
                  }
                />
                <Label htmlFor="agreedToTerms" className="text-sm text-muted-foreground leading-relaxed">
                  By creating a Classe365 account, you're agreeing to accept our{" "}
                  <Link to="#" className="text-primary hover:underline">
                    terms of service
                  </Link>
                  .
                </Label>
              </div>

              {/* Submit button */}
              <Button
                type="submit"
                className="w-full h-12 text-lg font-medium"
                disabled={loading}
              >
                {loading ? "Creating Account..." : "Register"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;