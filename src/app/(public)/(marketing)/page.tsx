import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  Award,
  BookOpen,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  GraduationCap,
  School,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "SAB University | Academic Excellence & University Management Portal",
  description:
    "Welcome to SAB University. Discover our academic departments, smart course registration, faculty directories, and comprehensive university management system.",
};

export default function HomePage() {
  const features = [
    {
      icon: Building2,
      title: "Department Oversight",
      description:
        "Comprehensive management of academic faculties, degree curriculums, and departmental faculty assignments.",
    },
    {
      icon: BookOpen,
      title: "Course & Section Planning",
      description:
        "Dynamic course catalogs, prerequisite checks, and intelligent section capacity scheduling for each term.",
    },
    {
      icon: Users,
      title: "Role-Based Portals",
      description:
        "Tailored environments for students, professors, and administrators with secure access to records and tasks.",
    },
    {
      icon: Calendar,
      title: "Semester Lifecycle",
      description:
        "Structured semester workflows covering registration windows, midterm assessments, and final grade posting.",
    },
    {
      icon: Award,
      title: "Academic Grading & Records",
      description:
        "Automated GPA calculation, official transcript generation, and transparent grade publishing.",
    },
    {
      icon: ShieldCheck,
      title: "Secure Verification",
      description:
        "Protected student data, verified attendance records, and authenticated enrollment processing.",
    },
  ];

  const featuredDepartments = [
    {
      code: "CSE",
      name: "Computer Science & Engineering",
      faculty: "School of Engineering & Technology",
      programs: "B.Sc. & M.Sc. in CSE, Data Science, AI",
      students: "2,400+ Enrolled",
    },
    {
      code: "BBA",
      name: "School of Business & Economics",
      faculty: "Faculty of Business Studies",
      programs: "BBA, MBA, Executive Management, Finance",
      students: "3,100+ Enrolled",
    },
    {
      code: "EEE",
      name: "Electrical & Electronic Engineering",
      faculty: "School of Engineering & Technology",
      programs: "B.Sc. in EEE, Telecommunication, Power Systems",
      students: "1,850+ Enrolled",
    },
    {
      code: "LAW",
      name: "Department of Law & Justice",
      faculty: "Faculty of Law & Governance",
      programs: "LL.B (Hons), LL.M in Corporate Jurisprudence",
      students: "1,200+ Enrolled",
    },
    {
      code: "PHR",
      name: "Department of Pharmacy",
      faculty: "School of Health Sciences",
      programs: "Bachelor of Pharmacy, Clinical Therapeutics",
      students: "950+ Enrolled",
    },
    {
      code: "ENG",
      name: "Department of English & Humanities",
      faculty: "Faculty of Arts & Social Sciences",
      programs: "B.A. & M.A. in English Literature & Linguistics",
      students: "820+ Enrolled",
    },
  ];

  const stats = [
    { value: "15,000+", label: "Active Students", icon: GraduationCap },
    { value: "250+", label: "Distinguished Faculty", icon: Users },
    { value: "45+", label: "Accredited Programs", icon: School },
    { value: "98%", label: "Graduate Career Rate", icon: TrendingUp },
  ];

  const notices = [
    {
      tag: "Academic",
      date: "Spring Term 2026",
      title: "Course Registration & Advising Schedule Released",
      description:
        "Registration window opens on Monday for all undergraduate departments. Check your portal for specific slot timings.",
    },
    {
      tag: "Examination",
      date: "Upcoming",
      title: "Mid-Semester Examination Routine & Guidelines",
      description:
        "Official timetable published across all academic departments. Students are advised to verify their exam section codes.",
    },
    {
      tag: "Campus Life",
      date: "Annual Event",
      title: "Inter-Departmental Technology & Innovation Fair",
      description:
        "Showcasing student research, capstone engineering projects, and entrepreneurial case competitions.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden py-16 sm:py-24 lg:py-28 bg-linear-to-b from-primary/5 via-background to-background">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[24px_24px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                <Sparkles className="size-3.5" />
                <span>Next-Gen Higher Education Management</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15]">
                Fostering Excellence,{" "}
                <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-primary/70">
                  Empowering Leaders
                </span>
              </h1>

              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Welcome to SAB University. A centralized digital campus where
                students discover courses, faculty manage academic sections, and
                administrators oversee university-wide excellence with ease.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <Button asChild size="lg" className="font-semibold shadow-sm">
                  <Link href="/departments" className="flex items-center gap-2">
                    <span>Explore Departments</span>
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>

                <Button asChild variant="outline" size="lg">
                  <Link href="/login">Access Portal</Link>
                </Button>

                <Button asChild variant="ghost" size="lg">
                  <Link href="/about-us">Learn About SAB</Link>
                </Button>
              </div>

              {/* Quick Trust Highlights */}
              <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-muted-foreground border-t border-border/60">
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <CheckCircle2 className="size-4 text-primary shrink-0" />
                  <span>Accredited Curriculums</span>
                </div>
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <CheckCircle2 className="size-4 text-primary shrink-0" />
                  <span>Real-time Registration</span>
                </div>
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <CheckCircle2 className="size-4 text-primary shrink-0" />
                  <span>Integrated Academic Hub</span>
                </div>
              </div>
            </div>

            {/* Hero Visual Card / Portal Mockup */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md rounded-2xl border border-border/80 bg-card p-6 shadow-xl backdrop-blur-xs">
                <div className="flex items-center justify-between pb-4 border-b border-border/60">
                  <div className="flex items-center gap-2">
                    <div className="size-3 rounded-full bg-red-500/80" />
                    <div className="size-3 rounded-full bg-amber-500/80" />
                    <div className="size-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <Badge variant="outline" className="text-[11px] font-mono">
                    SAB-PORTAL-v2.6
                  </Badge>
                </div>

                <div className="mt-4 space-y-4">
                  <div className="p-4 rounded-xl bg-muted/40 border border-border/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-muted-foreground">
                        Current Semester
                      </span>
                      <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                        Ongoing
                      </span>
                    </div>
                    <p className="text-sm font-bold text-foreground">
                      Spring Term 2026 Academic Session
                    </p>
                    <div className="mt-2 w-full bg-muted rounded-full h-1.5 overflow-hidden">
                      <div className="bg-primary h-full rounded-full w-2/3" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-xl bg-muted/20 border border-border/40">
                      <p className="text-[11px] text-muted-foreground">
                        Departments
                      </p>
                      <p className="text-xl font-bold text-foreground mt-0.5">
                        12+
                      </p>
                      <p className="text-[10px] text-emerald-600 mt-1">
                        Fully Accredited
                      </p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-muted/20 border border-border/40">
                      <p className="text-[11px] text-muted-foreground">
                        Active Courses
                      </p>
                      <p className="text-xl font-bold text-foreground mt-0.5">
                        140+
                      </p>
                      <p className="text-[10px] text-primary mt-1">
                        Open for Enroll
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-primary/5 border border-primary/20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <GraduationCap className="size-4" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-foreground">
                          Student Portal Ready
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                          Grades, Schedule & Advising
                        </p>
                      </div>
                    </div>
                    <Button asChild size="xs" variant="default">
                      <Link href="/login">Login</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS SECTION (BY THE NUMBERS) */}
      <section className="py-12 border-y border-border/60 bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="flex flex-col items-center text-center p-4 rounded-xl transition-all hover:bg-card/50"
                >
                  <div className="p-2.5 rounded-xl bg-primary/10 text-primary mb-3">
                    <Icon className="size-5" />
                  </div>
                  <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                    {stat.value}
                  </span>
                  <span className="text-sm font-medium text-muted-foreground mt-1">
                    {stat.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. CORE MANAGEMENT CAPABILITIES (FEATURES) */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <Badge variant="secondary" className="px-3 py-1 font-semibold">
              Platform Features
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
              Built for Modern Higher Education
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              Every tool required to streamline administrative workflows,
              enhance faculty collaboration, and enrich the student experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={feature.title}
                  className="transition-all hover:shadow-md hover:border-primary/40 group"
                >
                  <CardHeader className="space-y-3">
                    <div className="size-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="size-5" />
                    </div>
                    <CardTitle className="text-lg font-bold">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. ACADEMIC DEPARTMENTS SPOTLIGHT */}
      <section className="py-16 sm:py-24 bg-muted/20 border-t border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div className="space-y-2 max-w-xl">
              <Badge variant="outline" className="font-semibold text-primary">
                Academics & Curriculums
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                Premier Academic Departments
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground">
                Discover accredited faculties committed to cutting-edge research
                and practical career readiness.
              </p>
            </div>
            <Button asChild variant="outline">
              <Link href="/departments" className="flex items-center gap-1.5">
                <span>View All Departments</span>
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredDepartments.map((dept) => (
              <div
                key={dept.code}
                className="rounded-2xl border border-border/70 bg-card p-6 shadow-xs transition-all hover:shadow-md hover:border-primary/30 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-primary/10 text-primary border border-primary/20">
                      {dept.code}
                    </span>
                    <span className="text-xs font-medium text-muted-foreground">
                      {dept.students}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-foreground">
                    {dept.name}
                  </h3>
                  <p className="text-xs font-medium text-primary/80">
                    {dept.faculty}
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                    {dept.programs}
                  </p>
                </div>

                <div className="pt-5 mt-4 border-t border-border/50 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Degrees & Courses
                  </span>
                  <Link
                    href="/departments"
                    className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                  >
                    <span>Curriculum</span>
                    <ArrowRight className="size-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. NOTICE BOARD & ACADEMIC UPDATES */}
      <section className="py-16 sm:py-24 bg-background border-t border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-3">
            <Badge variant="secondary" className="px-3 py-1 font-semibold">
              Notice Board
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Official Campus Announcements
            </h2>
            <p className="text-sm text-muted-foreground">
              Keep updated with semester milestones, exam schedules, and
              academic notifications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {notices.map((notice) => (
              <div
                key={notice.tag}
                className="rounded-2xl border border-border/60 bg-muted/10 p-6 flex flex-col justify-between space-y-4 hover:border-primary/30 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2 py-0.5 rounded-full font-medium bg-primary/10 text-primary">
                      {notice.tag}
                    </span>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="size-3" />
                      <span>{notice.date}</span>
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-foreground">
                    {notice.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {notice.description}
                  </p>
                </div>

                <div className="pt-2 text-xs font-medium text-primary">
                  <span>Authorized by Academic Registry</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION (CTA) */}
      <section className="py-16 sm:py-20 bg-linear-to-r from-primary/10 via-primary/5 to-secondary/30 border-t border-border/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <Badge
            variant="outline"
            className="text-xs font-semibold bg-background"
          >
            Join SAB University
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Ready to Begin Your Academic Journey?
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Discover our accredited academic degree programs or log in to your
            student, instructor, or administrator portal to access records and
            schedules.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Button asChild size="lg" className="font-semibold shadow-xs">
              <Link href="/departments" className="flex items-center gap-2">
                <span>View All Departments</span>
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/login">Portal Login</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
