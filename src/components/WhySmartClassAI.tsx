import { Brain, MessageSquare, Smartphone } from "lucide-react";

const WhySmartClassAI = () => {
  const highlights = [
    {
      icon: Brain,
      title: "AI-Powered Efficiency",
      description: "Automate attendance, grading, and reporting with AI.",
      gradient: "from-primary to-primary-glow",
    },
    {
      icon: MessageSquare,
      title: "Seamless Communication",
      description: "Instant alerts via WhatsApp, SMS, and email.",
      gradient: "from-accent to-accent-glow",
    },
    {
      icon: Smartphone,
      title: "Accessible Anywhere",
      description: "Fully synced web and mobile apps.",
      gradient: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Why Choose <span className="bg-gradient-hero bg-clip-text text-transparent">SmartClassAI</span>?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Transform your school management with AI-powered tools designed for modern education.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {highlights.map((highlight, index) => (
            <div
              key={highlight.title}
              className="group relative bg-card rounded-2xl p-8 shadow-soft hover:shadow-medium transition-smooth animate-slide-in-up"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${highlight.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-smooth`} />
              
              <div className="relative">
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${highlight.gradient} mb-6`}>
                  <highlight.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{highlight.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{highlight.description}</p>
              </div>

              {/* Hover effect border */}
              <div className="absolute inset-0 rounded-2xl ring-2 ring-transparent group-hover:ring-primary/20 transition-smooth" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySmartClassAI;