import { GraduationCap, Users, BookOpen, Settings } from "lucide-react";
import { Button } from "@/components/ui/enhanced-button";
import studentImage from "@/assets/student-dashboard.jpg";
import parentImage from "@/assets/parent-dashboard.jpg";
import teacherImage from "@/assets/teacher-dashboard.jpg";
import adminImage from "@/assets/admin-dashboard.jpg";

const DashboardHighlights = () => {
  const dashboards = [
    {
      title: "Student Dashboard",
      icon: GraduationCap,
      image: studentImage,
      features: [
        "Profile & timetable",
        "Real-time attendance",
        "AI RAG academic assistant",
        "Assignments & submissions",
        "Performance analytics",
        "Communication with teachers",
      ],
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Parent Dashboard",
      icon: Users,
      image: parentImage,
      features: [
        "Real-time attendance & grades",
        "Performance and term reports",
        "Homework and assignment tracker",
        "Direct teacher messaging",
        "Fee tracking & receipts",
        "Event/exam notifications",
        "AI-based learning tips for child",
        "Multi-child account switching",
      ],
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Teacher Dashboard",
      icon: BookOpen,
      image: teacherImage,
      features: [
        "Attendance & grading tools",
        "AI lesson planning",
        "Class engagement insights",
        "Assignment management",
        "Student progress tracking",
        "Parent communication portal",
      ],
      color: "from-purple-500 to-violet-500",
    },
    {
      title: "Admin Dashboard",
      icon: Settings,
      image: adminImage,
      features: [
        "School-wide analytics",
        "Staff & payroll management",
        "Fee collection & reconciliation",
        "Resource allocation",
        "Compliance tools",
        "AI-driven school performance insights",
      ],
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <section id="dashboards" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Powerful <span className="bg-gradient-hero bg-clip-text text-transparent">Dashboards</span> for Everyone
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Role-based dashboards designed for students, parents, teachers, and administrators with AI-powered insights.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {dashboards.map((dashboard, index) => (
            <div
              key={dashboard.title}
              className="group bg-card rounded-3xl shadow-soft hover:shadow-large transition-smooth overflow-hidden animate-slide-in-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Header */}
              <div className="p-6 border-b border-border">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${dashboard.color}`}>
                    <dashboard.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">{dashboard.title}</h3>
                </div>
              </div>

              {/* Content */}
              <div className="grid md:grid-cols-2 gap-6 p-6">
                {/* Features List */}
                <div className="space-y-3">
                  {dashboard.features.map((feature, featureIndex) => (
                    <div
                      key={feature}
                      className="flex items-center space-x-3 animate-slide-in-up"
                      style={{ animationDelay: `${(index * 0.15) + (featureIndex * 0.05)}s` }}
                    >
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${dashboard.color}`} />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Dashboard Preview */}
                <div className="relative">
                  <img
                    src={dashboard.image}
                    alt={`${dashboard.title} Preview`}
                    className="w-full h-48 object-cover rounded-xl shadow-medium group-hover:scale-105 transition-smooth"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl" />
                </div>
              </div>

              {/* CTA */}
              <div className="px-6 pb-6">
                <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-smooth">
                  Explore {dashboard.title}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Integration Section */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-card rounded-3xl p-8 shadow-medium">
            <h3 className="text-2xl font-semibold mb-4">Seamless Integrations</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Connect with WhatsApp Business API, SMS, email alerts. Import data via CSV/Excel or APIs. 
              Multi-language & RTL support for global accessibility.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {["WhatsApp", "SMS", "Email", "CSV Import", "API Integration", "Multi-Language"].map((integration) => (
                <div key={integration} className="bg-background px-4 py-2 rounded-lg shadow-soft">
                  <span className="text-sm font-medium">{integration}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardHighlights;