import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowRight,
  BookOpen,
  Building,
  CheckCircle2,
  Clock,
  Compass,
  GraduationCap,
  HeartHandshake,
  Lightbulb,
  Mail,
  MapPin,
  ShieldCheck,
  Target,
  Users,
} from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "About Us | SAB University",
  description:
    "Learn about SAB University's mission, leadership, academic excellence, values, and campus facilities.",
};

const AboutUsPage = () => {
  const values = [
    {
      icon: Target,
      title: "Academic Rigor",
      description:
        "High-caliber curriculums designed to challenge and prepare students for complex global industries.",
    },
    {
      icon: ShieldCheck,
      title: "Integrity & Ethics",
      description:
        "Transparent governance, honest academic research, and strong civic responsibility across all levels.",
    },
    {
      icon: Lightbulb,
      title: "Innovation & Discovery",
      description:
        "Fostering creative problem solving, multidisciplinary research, and cutting-edge digital learning platforms.",
    },
    {
      icon: HeartHandshake,
      title: "Student-First Community",
      description:
        "Dedicated faculty mentorship, inclusive student bodies, and comprehensive career development support.",
    },
  ];

  const facilities = [
    {
      icon: BookOpen,
      title: "Central Digital Library",
      desc: "Over 100,000 print titles, international journal subscriptions, and collaborative quiet study pods.",
    },
    {
      icon: Building,
      title: "Advanced Engineering & AI Labs",
      desc: "High-performance computing clusters, robotics testbeds, and specialized hardware workstations.",
    },
    {
      icon: Users,
      title: "Career & Placement Center",
      desc: "Direct corporate recruiting pipelines, resume workshops, and internship placement with 150+ partners.",
    },
    {
      icon: GraduationCap,
      title: "Smart Lecture Halls",
      desc: "Acoustically engineered amphitheaters equipped with interactive digital displays and live streaming.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative py-16 sm:py-24 bg-linear-to-b from-primary/5 via-background to-background border-b border-border/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <Badge variant="outline" className="px-3 py-1 font-semibold text-primary">
            About SAB University
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
            Nurturing Curiosity, Advancing Knowledge,{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-primary/70">
              Inspiring Leaders
            </span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Founded with a vision for transformative higher education, SAB
            University bridges rigorous scholarship with modern digital campus
            management. We empower students, faculty, and researchers to make a
            meaningful impact on society.
          </p>
        </div>
      </section>

      {/* 2. MISSION & VISION */}
      <section id="mission" className="py-16 sm:py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="rounded-2xl border border-border/70 bg-card p-8 shadow-xs flex flex-col justify-between">
              <div className="space-y-4">
                <div className="size-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Target className="size-6" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">
                  Our Mission
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  To provide transformative, world-class education that equips
                  diverse learners with critical thinking, ethical integrity, and
                  specialized skills to solve complex problems and lead with
                  distinction in their careers.
                </p>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground pt-6 border-t border-border/50">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-primary shrink-0" />
                  <span>Student-centered curriculum tailored for modern careers</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-primary shrink-0" />
                  <span>Continuous faculty research and innovation initiatives</span>
                </li>
              </ul>
            </div>

            {/* Vision */}
            <div className="rounded-2xl border border-border/70 bg-card p-8 shadow-xs flex flex-col justify-between">
              <div className="space-y-4">
                <div className="size-12 rounded-xl bg-secondary text-secondary-foreground flex items-center justify-center">
                  <Compass className="size-6" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">
                  Our Vision
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  To stand as a globally recognized university celebrated for
                  academic rigor, groundbreaking multidisciplinary research, and
                  an innovative digital ecosystem that empowers students across
                  all walks of life.
                </p>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground pt-6 border-t border-border/50">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-primary shrink-0" />
                  <span>Global academic partnerships and accreditation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-primary shrink-0" />
                  <span>Paperless, transparent university administration</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE VALUES */}
      <section className="py-16 sm:py-20 bg-muted/20 border-t border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <Badge variant="secondary" className="px-3 py-1 font-semibold">
              Principles & Culture
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Core Values That Guide Us
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              These fundamental principles steer our academic standards,
              faculty mentorship, and student governance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val) => {
              const Icon = val.icon;
              return (
                <div
                  key={val.title}
                  className="rounded-2xl border border-border/70 bg-card p-6 shadow-xs flex flex-col justify-between space-y-3 hover:border-primary/40 transition-all"
                >
                  <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="text-base font-bold text-foreground">
                    {val.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. LEADERSHIP & VC MESSAGE */}
      <section id="leadership" className="py-16 sm:py-20 bg-background border-t border-border/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-primary/20 bg-linear-to-br from-primary/5 via-card to-card p-8 sm:p-12 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <Badge variant="default" className="text-xs">
                Vice-Chancellor's Message
              </Badge>
            </div>
            <blockquote className="text-lg sm:text-xl font-medium text-foreground italic leading-relaxed">
              "At SAB University, our goal is not merely to teach courses, but
              to ignite an enduring spirit of inquiry and integrity. Through our
              streamlined digital campus platform, we ensure that every student
              and educator has the tools to achieve their highest academic
              potential."
            </blockquote>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-border/50">
              <div>
                <p className="text-base font-bold text-foreground">
                  Prof. Dr. M. Rahman, Ph.D.
                </p>
                <p className="text-xs text-muted-foreground">
                  Vice-Chancellor & Academic Council President
                </p>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link href="/departments" className="flex items-center gap-1.5">
                  <span>Explore Academic Programs</span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CAMPUS & FACILITIES */}
      <section className="py-16 sm:py-20 bg-muted/20 border-t border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <Badge variant="outline" className="px-3 py-1 font-semibold text-primary">
              Campus Environment
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Facilities Supporting Student Success
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Explore state-of-the-art infrastructure designed to inspire
              collaboration, research, and personal growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {facilities.map((fac) => {
              const Icon = fac.icon;
              return (
                <Card key={fac.title} className="hover:border-primary/40 transition-all">
                  <CardHeader className="space-y-3">
                    <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                      <Icon className="size-5" />
                    </div>
                    <CardTitle className="text-base font-bold">
                      {fac.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {fac.desc}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. CAMPUS LOCATION & CONTACT */}
      <section id="contact" className="py-16 sm:py-20 bg-background border-t border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-3">
            <Badge variant="secondary" className="px-3 py-1 font-semibold">
              Contact & Inquiries
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Connect With SAB University
            </h2>
            <p className="text-sm text-muted-foreground">
              Have questions regarding admissions, department courses, or
              student portal access? Our team is here to assist.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="rounded-2xl border border-border/70 bg-card p-6 text-center space-y-3">
              <div className="mx-auto size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <MapPin className="size-5" />
              </div>
              <h3 className="text-sm font-bold text-foreground">Main Campus</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                124 University Avenue, Academic Square, Campus West Block
              </p>
            </div>

            <div className="rounded-2xl border border-border/70 bg-card p-6 text-center space-y-3">
              <div className="mx-auto size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Mail className="size-5" />
              </div>
              <h3 className="text-sm font-bold text-foreground">Email Support</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                admissions@sab-uni.edu
                <br />
                support@sab-uni.edu
              </p>
            </div>

            <div className="rounded-2xl border border-border/70 bg-card p-6 text-center space-y-3">
              <div className="mx-auto size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Clock className="size-5" />
              </div>
              <h3 className="text-sm font-bold text-foreground">Office Hours</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Sunday - Thursday: 8:00 AM - 5:00 PM
                <br />
                Friday & Saturday: Closed
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
