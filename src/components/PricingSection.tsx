import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/enhanced-button";
const PricingSection = () => {
  const plans = [{
    name: "Starter",
    price: "₹4,999",
    period: "per month",
    description: "Perfect for small schools getting started",
    features: ["Up to 200 students", "Core dashboards", "Basic attendance tracking", "Grade management", "Email notifications", "Email support", "Basic analytics"],
    cta: "Start Free Trial",
    popular: false
  }, {
    name: "Growth",
    price: "₹12,999",
    period: "per month",
    description: "Ideal for growing schools with advanced needs",
    features: ["Up to 1,200 students", "All dashboards included", "AI-powered features", "WhatsApp notifications", "SMS alerts", "Priority support", "Advanced analytics", "Parent communication portal", "AI study assistant"],
    cta: "Start Free Trial",
    popular: true
  }, {
    name: "Enterprise",
    price: "Custom",
    period: "pricing",
    description: "Tailored solutions for large institutions",
    features: ["Unlimited students", "White-label solution", "SSO integration", "Custom integrations", "Dedicated account manager", "24/7 phone support", "Custom analytics", "API access", "Training & onboarding"],
    cta: "Contact Sales",
    popular: false
  }];
  return <section id="pricing" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Simple, <span className="bg-gradient-hero bg-clip-text text-slate-950">Transparent</span> Pricing
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan for your school. No hidden fees, no surprises. Start with a 30-day free trial.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => <div key={plan.name} className={`relative bg-card rounded-3xl shadow-soft hover:shadow-large transition-smooth p-8 animate-slide-in-up ${plan.popular ? "ring-2 ring-primary shadow-accent" : ""}`} style={{
          animationDelay: `${index * 0.2}s`
        }}>
              {/* Popular Badge */}
              {plan.popular && <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-hero text-white px-4 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                    <Star className="h-4 w-4" />
                    <span>Most Popular</span>
                  </div>
                </div>}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center space-x-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => <li key={feature} className="flex items-start space-x-3 animate-slide-in-up" style={{
              animationDelay: `${index * 0.2 + featureIndex * 0.05}s`
            }}>
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>)}
              </ul>

              {/* CTA */}
              <Button variant={plan.popular ? "hero" : plan.name === "Enterprise" ? "premium" : "success"} size="lg" className="w-full">
                {plan.cta}
              </Button>
            </div>)}
        </div>

        {/* Trust Section */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-6 bg-card rounded-2xl px-8 py-4 shadow-soft">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">30-day free trial</span>
            </div>
            <div className="w-px h-6 bg-border"></div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">No credit card required</span>
            </div>
            <div className="w-px h-6 bg-border"></div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default PricingSection;