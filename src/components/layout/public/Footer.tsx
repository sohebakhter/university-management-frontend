import Logo from "@/assets/svg/Logo";
import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-border/60 bg-muted/20 text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex items-center justify-center size-9 rounded-lg bg-primary/10">
                <Logo />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-tight tracking-tight text-foreground">
                  SAB University
                </span>
                <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                  Management Portal
                </span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              Empowering students, distinguished faculty, and administrative
              leaders with a centralized digital campus for courses,
              departments, and academic governance.
            </p>
            <div className="flex flex-col gap-2 text-xs text-muted-foreground pt-1">
              <div className="flex items-center gap-2">
                <MapPin className="size-3.5 text-primary shrink-0" />
                <span>124 University Ave, Academic Square, Campus West</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="size-3.5 text-primary shrink-0" />
                <span>support@sab-uni.edu</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="size-3.5 text-primary shrink-0" />
                <span>+1 (800) 555-0199</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold tracking-wide uppercase text-foreground">
              Academics
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/departments"
                  className="hover:text-primary transition-colors"
                >
                  Departments
                </Link>
              </li>
              <li>
                <Link
                  href="/about-us"
                  className="hover:text-primary transition-colors"
                >
                  About University
                </Link>
              </li>
              <li>
                <Link
                  href="/departments"
                  className="hover:text-primary transition-colors"
                >
                  Degree Programs
                </Link>
              </li>
              <li>
                <Link
                  href="/about-us#leadership"
                  className="hover:text-primary transition-colors"
                >
                  Faculty Directory
                </Link>
              </li>
            </ul>
          </div>

          {/* Portals & System */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold tracking-wide uppercase text-foreground">
              Portals
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/login"
                  className="hover:text-primary transition-colors"
                >
                  Student Portal
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="hover:text-primary transition-colors"
                >
                  Instructor Portal
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="hover:text-primary transition-colors"
                >
                  Administration Login
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="hover:text-primary transition-colors"
                >
                  Course Registration
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources & Support */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold tracking-wide uppercase text-foreground">
              Resources
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/about-us#mission"
                  className="hover:text-primary transition-colors"
                >
                  Mission & Vision
                </Link>
              </li>
              <li>
                <Link
                  href="/about-us#contact"
                  className="hover:text-primary transition-colors"
                >
                  Campus Contact
                </Link>
              </li>
              <li>
                <span className="text-muted-foreground/70">Academic Calendar</span>
              </li>
              <li>
                <span className="text-muted-foreground/70">Examination Cell</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="mt-12 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© 2026 SAB University. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-foreground cursor-pointer transition-colors">
              Privacy Policy
            </span>
            <span className="hover:text-foreground cursor-pointer transition-colors">
              Terms of Service
            </span>
            <span className="hover:text-foreground cursor-pointer transition-colors">
              Campus Security
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
