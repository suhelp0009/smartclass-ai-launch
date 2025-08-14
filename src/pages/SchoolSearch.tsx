import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Check, ChevronsUpDown, Search, Plus, Award, Users, Globe, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface School {
  id: string;
  name: string;
  subdomain: string;
  admin_email: string;
}

const SchoolSearch = () => {
  const [schools, setSchools] = useState<School[]>([]);
  const [selectedSchool, setSelectedSchool] = useState<School | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [newSchool, setNewSchool] = useState({
    name: '',
    subdomain: '',
    contact_number: '',
    address: ''
  });
  
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    try {
      const { data, error } = await supabase
        .from('schools')
        .select('id, name, subdomain, admin_email')
        .eq('is_active', true)
        .order('name');

      if (error) throw error;
      setSchools(data || []);
    } catch (error) {
      console.error('Error fetching schools:', error);
      toast({
        title: "Error",
        description: "Failed to load schools. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSchoolSelect = (school: School) => {
    setSelectedSchool(school);
    setOpen(false);
    
    // Redirect to school's subdomain portal
    const currentDomain = window.location.hostname;
    const baseDomain = currentDomain.replace(/^[^.]+\./, ''); // Remove subdomain if present
    const newUrl = `https://${school.subdomain}.${baseDomain}`;
    
    // For development, redirect to the auth page with school context
    if (currentDomain === 'localhost' || currentDomain.includes('lovable.app')) {
      navigate(`/auth?school=${school.subdomain}`);
    } else {
      window.location.href = newUrl;
    }
  };

  const handleRegisterSchool = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabase
        .from('schools')
        .insert({
          name: newSchool.name,
          subdomain: newSchool.subdomain.toLowerCase(),
          admin_email: user.email,
          contact_number: newSchool.contact_number,
          address: newSchool.address
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success!",
        description: "School registered successfully.",
      });

      // Update user profile with school reference
      await supabase
        .from('profiles')
        .update({ school_id: data.id })
        .eq('user_id', user.id);

      // Refresh schools list and select the new school
      await fetchSchools();
      handleSchoolSelect(data);
      
    } catch (error: any) {
      console.error('Error registering school:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to register school. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center min-h-screen">
          {/* Left side - Brand section */}
          <div className="text-white space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold">
                SmartClass<span className="text-accent-glow">AI</span>
              </h1>
              <p className="text-xl md:text-2xl font-medium opacity-90">
                Leading the Way in Education Technology
              </p>
              <p className="text-lg opacity-80 max-w-lg">
                Most awarded EdTech company of 2021/22, including being part of 
                Top 65 fastest growing companies of 2021 in APAC
              </p>
            </div>

            {/* Awards section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <Award className="h-8 w-8 text-accent-glow mb-2" />
                <h3 className="font-semibold text-sm">Student Information System:</h3>
                <p className="text-xs opacity-80">Winner for 2 years</p>
                <p className="text-xs opacity-70 mt-1">
                  Edtech Awards 2021 and 2022 by Edtech Digest
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <Users className="h-8 w-8 text-accent-glow mb-2" />
                <h3 className="font-semibold text-sm">Education Management & Analytics</h3>
                <p className="text-xs opacity-70 mt-1">
                  Top 10 in Australia and New Zealand
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <Users className="h-8 w-8 text-accent-glow mb-2" />
                <h3 className="font-semibold text-sm">Top 500 High Growth Companies in APAC</h3>
                <p className="text-xs opacity-70 mt-1">
                  Ranked Top 5 in EdTech
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm opacity-80">
              <Globe className="h-4 w-4" />
              <span>Trusted by 6000+ educational institutions in 130 countries</span>
            </div>
          </div>

          {/* Right side - School search */}
          <div className="flex items-center justify-center">
            <Card className="w-full max-w-md shadow-large bg-card/95 backdrop-blur-sm border-white/20">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">Find Your Schools Portal</CardTitle>
                <p className="text-muted-foreground">
                  Search for your school to access your portal
                </p>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {!showRegisterForm ? (
              <div className="space-y-6">
                {/* Search Input */}
                <div className="space-y-3">
                  <Label htmlFor="school-search" className="text-base font-medium">
                    Select Your School
                  </Label>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        id="school-search"
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full h-12 justify-between text-left font-normal bg-card hover:bg-accent/50 transition-smooth"
                      >
                        <div className="flex items-center gap-3">
                          <Search className="h-4 w-4 text-muted-foreground" />
                          <span className={selectedSchool ? "text-foreground" : "text-muted-foreground"}>
                            {selectedSchool ? selectedSchool.name : "Search Your School Portal"}
                          </span>
                        </div>
                        <ChevronsUpDown className="h-4 w-4 shrink-0 text-muted-foreground" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0 bg-popover border shadow-large" align="start">
                      <Command className="bg-transparent">
                        <CommandInput 
                          placeholder="Type school name..." 
                          className="border-0 focus:ring-0"
                        />
                        <CommandList className="max-h-60">
                          <CommandEmpty className="py-6 text-center text-muted-foreground">
                            No schools found.
                          </CommandEmpty>
                          <CommandGroup>
                            {schools.map((school) => (
                              <CommandItem
                                key={school.id}
                                value={school.name}
                                onSelect={() => handleSchoolSelect(school)}
                                className="py-3 cursor-pointer hover:bg-accent/50 transition-smooth"
                              >
                                <Check
                                  className={cn(
                                    "mr-3 h-4 w-4 text-accent",
                                    selectedSchool?.id === school.id ? "opacity-100" : "opacity-0"
                                  )}
                                />
                                <div className="flex-1">
                                  <div className="font-medium text-foreground">{school.name}</div>
                                  <div className="text-sm text-muted-foreground">
                                    {school.subdomain}.smartclassai.com
                                  </div>
                                </div>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Register New School */}
                <div className="text-center pt-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    Don't see your school listed?
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setShowRegisterForm(true)}
                    className="w-full h-11 border-2 border-primary/20 hover:border-primary hover:bg-primary/5 transition-smooth"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Register New School
                  </Button>
                </div>
              </div>
            ) : (
              <Card className="border-0 shadow-none bg-transparent">
                <CardContent className="p-0">
                  <form onSubmit={handleRegisterSchool} className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="school-name" className="text-base font-medium">School Name</Label>
                      <Input
                        id="school-name"
                        type="text"
                        placeholder="Lincoln High School"
                        value={newSchool.name}
                        onChange={(e) => setNewSchool(prev => ({ ...prev, name: e.target.value }))}
                        required
                        className="h-11 bg-card border-border/50 focus:border-primary transition-smooth"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subdomain" className="text-base font-medium">Subdomain</Label>
                      <div className="flex items-center border border-border/50 rounded-lg overflow-hidden focus-within:border-primary transition-smooth">
                        <Input
                          id="subdomain"
                          type="text"
                          placeholder="lincolnhigh"
                          value={newSchool.subdomain}
                          onChange={(e) => setNewSchool(prev => ({ ...prev, subdomain: e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '') }))}
                          required
                          className="border-0 rounded-none h-11 bg-transparent focus:ring-0"
                        />
                        <div className="px-4 py-3 bg-muted/50 text-sm text-muted-foreground border-l border-border/50">
                          .smartclassai.com
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="contact" className="text-base font-medium">Contact Number (Optional)</Label>
                      <Input
                        id="contact"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        value={newSchool.contact_number}
                        onChange={(e) => setNewSchool(prev => ({ ...prev, contact_number: e.target.value }))}
                        className="h-11 bg-card border-border/50 focus:border-primary transition-smooth"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-base font-medium">Address (Optional)</Label>
                      <Input
                        id="address"
                        type="text"
                        placeholder="123 Main St, City, State 12345"
                        value={newSchool.address}
                        onChange={(e) => setNewSchool(prev => ({ ...prev, address: e.target.value }))}
                        className="h-11 bg-card border-border/50 focus:border-primary transition-smooth"
                      />
                    </div>

                    <div className="flex gap-3 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowRegisterForm(false)}
                        className="flex-1 h-11"
                      >
                        Back
                      </Button>
                      <Button 
                        type="submit" 
                        disabled={isLoading} 
                        className="flex-1 h-11 bg-primary hover:bg-primary/90 transition-smooth"
                      >
                        {isLoading ? "Registering..." : "Register School"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchoolSearch;