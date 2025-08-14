import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/enhanced-button";
import { Menu, X, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const {
    user,
    signOut
  } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const navLinks = [{
    href: "#features",
    label: "Features"
  }, {
    href: "#dashboards",
    label: "Dashboards"
  }, {
    href: "#pricing",
    label: "Pricing"
  }, {
    href: "#faq",
    label: "FAQ"
  }, {
    href: "#contact",
    label: "Contact"
  }];
  return <nav className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${isScrolled ? "bg-background/95 backdrop-blur-md shadow-soft" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 bg-slate-50">
          {/* Logo */}
          <div className="flex items-center">
            <div className="bg-gradient-hero bg-clip-text text-transparent font-bold text-xl bg-slate-950">
              SmartClassAI
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => <a key={link.href} href={link.href} className="text-muted-foreground hover:text-primary transition-smooth font-medium">
                {link.label}
              </a>)}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? <>
                <Button variant="ghost" size="sm" onClick={() => navigate('/profile')} className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Profile
                </Button>
                <Button variant="outline" size="sm" onClick={signOut}>
                  Sign Out
                </Button>
              </> : <>
                <Button variant="ghost" size="sm" onClick={() => navigate('/auth')}>
                  Login
                </Button>
                <Button variant="hero" size="sm" onClick={() => navigate('/auth')}>
                  Start Free Trial
                </Button>
              </>}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md shadow-large border-t border-border">
            <div className="px-4 py-6 space-y-4">
              {navLinks.map(link => <a key={link.href} href={link.href} className="block text-muted-foreground hover:text-primary transition-smooth font-medium py-2" onClick={() => setIsMobileMenuOpen(false)}>
                  {link.label}
                </a>)}
              <div className="pt-4 space-y-3">
                {user ? <>
                    <Button variant="ghost" size="sm" className="w-full flex items-center gap-2" onClick={() => {
                navigate('/profile');
                setIsMobileMenuOpen(false);
              }}>
                      <User className="h-4 w-4" />
                      Profile
                    </Button>
                    <Button variant="outline" size="sm" className="w-full" onClick={() => {
                signOut();
                setIsMobileMenuOpen(false);
              }}>
                      Sign Out
                    </Button>
                  </> : <>
                    <Button variant="ghost" size="sm" className="w-full" onClick={() => {
                navigate('/auth');
                setIsMobileMenuOpen(false);
              }}>
                      Login
                    </Button>
                    <Button variant="hero" size="sm" className="w-full" onClick={() => {
                navigate('/auth');
                setIsMobileMenuOpen(false);
              }}>
                      Start Free Trial
                    </Button>
                  </>}
              </div>
            </div>
          </div>}
      </div>
    </nav>;
};
export default Navigation;