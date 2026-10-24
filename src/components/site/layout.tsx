import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Menu, X, Phone, Mail, User } from "lucide-react";
import logo from "@/assets/logo.jpg.asset.json";
import { firm, nav, offices } from "@/lib/site";

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("is-visible"); io.disconnect(); }
    }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex min-w-0 items-center gap-3" aria-label={`${firm.name} — Home`}>
      <span className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full bg-card">
        <img src={logo.url} alt="" className="h-full w-full scale-125 object-cover object-[50%_35%]" />
      </span>
      <span className="min-w-0 leading-tight">
        <span className={`block truncate font-serif text-xl font-semibold tracking-wide ${light ? "text-on-navy" : "text-primary"}`}>RSB Legal</span>
        <span className={`block truncate text-[0.6rem] uppercase tracking-[0.22em] ${light ? "text-on-navy-muted" : "text-muted-foreground"}`}>Associates & Consultants</span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-on-navy/10 bg-navy/95 backdrop-blur">
      <div className="container-site flex h-20 items-center justify-between gap-4">
        <Logo light />
        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="link-gold pb-1 text-sm text-on-navy-muted transition-colors hover:text-on-navy" activeProps={{ className: "text-on-navy! bg-[length:100%_1px]!" }}>
              {n.label}
            </Link>
          ))}
          <Link to="/consultation" className="btn-primary py-3!">Book Consultation</Link>
        </nav>
        <button className="text-on-navy lg:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav aria-label="Mobile" className="border-t border-on-navy/10 bg-navy lg:hidden">
          <div className="container-site flex flex-col py-4">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="border-b border-on-navy/10 py-4 font-serif text-2xl text-on-navy">{n.label}</Link>
            ))}
            <Link to="/consultation" onClick={() => setOpen(false)} className="btn-primary mt-6 justify-center">Book Consultation</Link>
          </div>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-navy-deep text-on-navy-muted">
      <div className="container-site grid gap-12 py-20 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo light />
          <p className="mt-6 font-serif text-2xl italic text-gold">{firm.tagline}</p>
          <p className="mt-4 text-sm leading-relaxed">A legal practice established in {firm.established}, Mumbai.</p>
        </div>
        <div className="md:col-span-2">
          <h2 className="eyebrow mb-5">Firm</h2>
          <ul className="space-y-3 text-sm">
            {nav.map((n) => <li key={n.to}><Link to={n.to} className="link-gold hover:text-on-navy">{n.label}</Link></li>)}
            <li><Link to="/consultation" className="link-gold hover:text-on-navy">Consultation</Link></li>
          </ul>
        </div>
        <div className="md:col-span-3">
          <h2 className="eyebrow mb-5">Offices</h2>
          {offices.map((o) => (
            <address key={o.label} className="mb-5 text-sm not-italic leading-relaxed">
              <span className="text-on-navy">{o.label}</span><br />{o.lines.join(" ")}
            </address>
          ))}
        </div>
        <div className="md:col-span-3">
          <h2 className="eyebrow mb-5">Contact</h2>
          <ul className="space-y-3 text-sm">
            <li><a href={firm.phoneHref} className="flex items-center gap-2 hover:text-on-navy"><Phone className="h-4 w-4 text-gold" />{firm.phone}</a></li>
            <li><a href={`mailto:${firm.email}`} className="flex items-center gap-2 break-all hover:text-on-navy"><Mail className="h-4 w-4 shrink-0 text-gold" />{firm.email}</a></li>
            <li className="pt-2">{firm.hours}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-on-navy/10">
        <div className="container-site flex flex-col gap-3 py-6 text-xs md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {firm.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/disclaimer" className="hover:text-on-navy">Legal Disclaimer</Link>
            <Link to="/privacy" className="hover:text-on-navy">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function PageHeader({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <section className="hero-pattern">
      <div className="container-site py-24 md:py-32">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-5 max-w-4xl text-5xl leading-[1.05] text-on-navy! md:text-7xl">{title}</h1>
          {intro && <p className="mt-8 max-w-2xl text-lg leading-relaxed text-on-navy-muted">{intro}</p>}
        </Reveal>
      </div>
    </section>
  );
}

export function SectionTitle({ eyebrow, title, className = "" }: { eyebrow: string; title: string; className?: string }) {
  return (
    <div className={className}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 text-4xl leading-tight md:text-5xl">{title}</h2>
      <span className="gold-rule mt-6" />
    </div>
  );
}

export function TeamPhoto({ name, photo, className = "" }: { name: string; photo: string | null; className?: string }) {
  if (!photo) {
    return (
      <div className={`flex flex-col items-center justify-center gap-3 bg-secondary text-muted-foreground ${className}`}>
        <User className="h-14 w-14 text-gold" aria-hidden />
        <span className="text-xs uppercase tracking-[0.2em]">Photo to be added</span>
      </div>
    );
  }
  return <img src={photo} alt={`Portrait of ${name}`} loading="lazy" className={`object-cover object-top ${className}`} />;
}

export function CtaBand() {
  return (
    <section className="hero-pattern">
      <div className="container-site flex flex-col items-start justify-between gap-8 py-20 md:flex-row md:items-center">
        <Reveal>
          <p className="eyebrow">Consultations by appointment</p>
          <h2 className="mt-4 max-w-2xl text-4xl text-on-navy! md:text-5xl">Discuss your legal requirement with our team.</h2>
        </Reveal>
        <div className="flex flex-wrap gap-4">
          <Link to="/consultation" className="btn-primary">Request a Consultation</Link>
          <a href={firm.phoneHref} className="btn-outline-light">Call the Firm</a>
        </div>
      </div>
    </section>
  );
}
