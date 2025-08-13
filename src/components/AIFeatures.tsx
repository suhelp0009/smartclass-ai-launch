import { Button } from "@/components/ui/enhanced-button";
import { Bot, Zap, Smartphone, MessageCircle, BookOpen, TrendingUp } from "lucide-react";
import aiFeatures from "@/assets/ai-features.jpg";
import communicationHub from "@/assets/communication-hub.jpg";
import aiStudyHelper from "@/assets/ai-study-helper.jpg";
import mobileSync from "@/assets/mobile-sync.jpg";

const AIFeatures = () => {
  const features = [
    {
      icon: Bot,
      title: "AI-Powered Automation",
      description: "Smart attendance tracking with facial recognition, automated grading with intelligent analysis, and real-time performance insights.",
      image: aiFeatures,
      gradient: "from-primary to-primary-glow",
      delay: "0s"
    },
    {
      icon: MessageCircle,
      title: "Seamless Communication Hub",
      description: "Instant WhatsApp notifications, SMS alerts, and email communication. Keep parents, teachers, and students connected 24/7.",
      image: communicationHub,
      gradient: "from-accent to-accent-glow",
      delay: "0.2s"
    },
    {
      icon: BookOpen,
      title: "AI Study Assistant",
      description: "Personalized learning support with AI-powered homework help, smart study recommendations, and academic progress tracking.",
      image: aiStudyHelper,
      gradient: "from-purple-500 to-pink-500",
      delay: "0.4s"
    },
    {
      icon: Smartphone,
      title: "Mobile-First Design",
      description: "Fully synchronized web and mobile applications. Access your dashboards anywhere, anytime with real-time data sync.",
      image: mobileSync,
      gradient: "from-emerald-500 to-cyan-500",
      delay: "0.6s"
    }
  ];

  return (
    <section className="py-24 bg-gradient-primary-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4 mr-2" />
            AI-Powered Features
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Transform Education with{" "}
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Smart Technology
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Experience the future of school management with our AI-driven platform that automates routine tasks, 
            enhances communication, and provides intelligent insights for better educational outcomes.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative bg-card rounded-3xl p-8 shadow-soft hover:shadow-large transition-smooth animate-slide-in-up"
              style={{ animationDelay: feature.delay }}
            >
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-smooth`} />
              
              <div className="relative">
                {/* Feature Image */}
                <div className="mb-8 overflow-hidden rounded-2xl shadow-medium">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-64 object-cover transform group-hover:scale-105 transition-smooth"
                  />
                </div>

                {/* Content */}
                <div className="flex items-start space-x-4">
                  <div className={`flex-shrink-0 p-3 rounded-xl bg-gradient-to-br ${feature.gradient} shadow-medium`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3 text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Hover effect border */}
              <div className="absolute inset-0 rounded-3xl ring-2 ring-transparent group-hover:ring-primary/20 transition-smooth" />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <Button variant="hero" size="xl" className="group">
              Experience AI Features
              <TrendingUp className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-smooth" />
            </Button>
            <Button variant="premium" size="xl">
              See Live Demo
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-4 max-w-md mx-auto">
            Join 250+ schools already using SmartClassAI to revolutionize their educational management
          </p>
        </div>
      </div>
    </section>
  );
};

export default AIFeatures;