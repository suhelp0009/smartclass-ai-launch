import { Button } from "@/components/ui/enhanced-button";
import { Play, Users, GraduationCap, Clock, Zap, HeadphonesIcon } from "lucide-react";
import heroImage from "@/assets/hero-illustration.jpg";

const HeroSection = () => {
  const trustBadges = [
    { icon: Users, value: "250+", label: "Schools" },
    { icon: GraduationCap, value: "150k", label: "Students" },
    { icon: Users, value: "12k", label: "Teachers" },
    { icon: Clock, value: "99.9%", label: "Uptime" },
    { icon: Zap, value: "2 Min", label: "Setup" },
    { icon: HeadphonesIcon, value: "24/7", label: "Support" },
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-16 pb-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/30" />
      
      {/* Floating shapes */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-primary/10 rounded-full animate-float" />
      <div className="absolute bottom-20 left-10 w-24 h-24 bg-accent/10 rounded-full animate-float" style={{ animationDelay: '2s' }} />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="animate-slide-in-up">
            <div className="mb-6">
              <div className="inline-flex items-center bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
                🚀 AI-Powered School Management
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                <span className="bg-gradient-hero bg-clip-text text-transparent">
                  SmartClassAI
                </span>
                <br />
                <span className="text-foreground">
                  AI-Powered Smart School Management
                </span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                All-in-one dashboards for students, parents, teachers, and administrators. 
                Attendance, grading, AI study help, analytics, fees, and communication — on web & mobile.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button variant="hero" size="xl" className="group" asChild>
                <a href="/register">
                  Start Free Trial
                  <Play className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-smooth" />
                </a>
              </Button>
              <Button variant="hero-outline" size="xl">
                Request Demo
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 lg:grid-cols-6 gap-4">
              {trustBadges.map((badge, index) => (
                <div
                  key={badge.label}
                  className="text-center animate-slide-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex justify-center mb-2">
                    <badge.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="font-bold text-lg text-foreground">{badge.value}</div>
                  <div className="text-xs text-muted-foreground">{badge.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative animate-slide-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="relative">
              <img
                src={heroImage}
                alt="SmartClassAI Dashboard Ecosystem"
                className="w-full h-auto rounded-2xl shadow-large transform hover:scale-105 transition-smooth"
              />
              {/* Floating UI elements */}
              <div className="absolute -top-4 -right-4 bg-card shadow-medium rounded-lg p-3 animate-float">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">Live Updates</span>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-card shadow-medium rounded-lg p-3 animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">AI Powered</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;