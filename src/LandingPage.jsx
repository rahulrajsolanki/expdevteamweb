import { useState, useRef, useEffect } from "react";

/* ------------------------------------------------------------------
   PRODUCTS — the only place you need to edit to add a product.
   Set `image` to a real screenshot path (e.g. "/images/orderly.png")
   once you have one. Until then, a placeholder illustration is shown.
   ------------------------------------------------------------------ */
const products = [
  {
    id: "orderly",
    name: "Orderly POS",
    summary: "Tables, orders and kitchen tickets on one screen.",
    description:
      "A point-of-sale built for busy floors. Take orders, split bills and send tickets to the kitchen without leaving the table.",
    features: ["Table and floor layout", "Kitchen display tickets", "Offline order sync"],
    color: "#E8553D",
    colorDeep: "#9E2F1B",
    image: null,
    isNew: true,
  },
  {
    id: "ledgerly",
    name: "Ledgerly Invoice",
    summary: "GST-ready billing with live stock tracking.",
    description:
      "Create compliant invoices in seconds, track inventory as it moves, and see sales and expenses in one clear report.",
    features: ["GST-compliant invoices", "Inventory alerts", "Profit and loss summary"],
    color: "#1F7A6D",
    colorDeep: "#0C3B35",
    image: null,
  },
  {
    id: "rosterly",
    name: "Rosterly Payroll",
    summary: "Attendance, leave and payroll without the spreadsheets.",
    description:
      "Connect biometric punches to payroll. Shifts, leave balances and salary runs update automatically.",
    features: ["Biometric attendance", "Leave management", "Automated payslips"],
    color: "#4B5BD6",
    colorDeep: "#222F87",
    image: null,
  },
  {
    id: "taskflow",
    name: "Taskflow",
    summary: "Assign, check and verify daily work across teams.",
    description:
      "Give every staff member a checklist for their shift. Supervisors verify completion with photos and get downloadable reports.",
    features: ["Recurring task templates", "Photo verification", "Downloadable reports"],
    color: "#C98A12",
    colorDeep: "#6E4A05",
    image: null,
  },
];

const navItems = [
  { label: "Services", href: "#services" },
  { label: "Products", href: "#products", badge: "New" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Team", href: "#team" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

const services = [
  {
    id: "setup",
    title: "Setup and installation",
    text: "We configure the software, hardware and menus for your outlet so you can start selling on day one.",
    icon: "setup",
  },
  {
    id: "training",
    title: "Staff training",
    text: "Hands-on sessions for owners and staff, plus recordings that new hires can revisit anytime.",
    icon: "users",
  },
  {
    id: "migration",
    title: "Data migration",
    text: "Move your menus, customers and sales history from your old system without losing a record.",
    icon: "cloud",
  },
  {
    id: "integration",
    title: "Custom integrations",
    text: "Connect delivery apps, payment gateways and accounting tools to one source of truth.",
    icon: "code",
  },
  {
    id: "support",
    title: "24x7 support",
    text: "Call, chat or email anytime. Our team resolves most issues within the hour.",
    icon: "shield",
  },
  {
    id: "consulting",
    title: "Growth consulting",
    text: "Monthly reviews of your sales, costs and staffing, with clear next steps for the month ahead.",
    icon: "chart",
  },
  {
    id: "menu",
    title: "Menu and branding",
    text: "Digital menus, price lists and receipt designs that match your brand and update in one place.",
    icon: "setup",
  },
  {
    id: "hardware",
    title: "Hardware sourcing",
    text: "We recommend, install and test printers, tablets and card readers that work with your software.",
    icon: "device",
  },
];

const portfolioProjects = [
  { id: "pf-pos", name: "Cafe Lumiere POS", category: "POS", client: "Cafe Lumiere", color: "#E8553D", colorDeep: "#9E2F1B", image: null },
  { id: "pf-billing", name: "Urban Bites Billing", category: "Billing", client: "Urban Bites", color: "#1F7A6D", colorDeep: "#0C3B35", image: null },
  { id: "pf-payroll", name: "Spice Route Payroll", category: "Payroll", client: "Spice Route Kitchens", color: "#4B5BD6", colorDeep: "#222F87", image: null },
  { id: "pf-analytics", name: "Multi-outlet Dashboard", category: "Analytics", client: "Biryani House Group", color: "#C98A12", colorDeep: "#6E4A05", image: null },
  { id: "pf-mobile", name: "Field Service App", category: "Mobile", client: "Quickfix Services", color: "#7B3FE4", colorDeep: "#3B1F80", image: null },
  { id: "pf-retail", name: "Retail Inventory Suite", category: "Retail", client: "Mosaic Retail", color: "#FF2D75", colorDeep: "#8A1040", image: null },
];

const teamMembers = [
  {
    name: "Aarav Mehta",
    role: "Founder and CEO",
    initials: "AM",
    bio: "Former restaurant owner who built the first version of our POS after years of paper ticket systems.",
    from: "#1E5BFF",
    to: "#7B3FE4",
  },
  {
    name: "Neha Kapoor",
    role: "Head of Product",
    initials: "NK",
    bio: "Leads the roadmap across billing, payroll and POS with a focus on simple daily workflows.",
    from: "#FF2D75",
    to: "#FF8A2B",
  },
  {
    name: "Vikram Rao",
    role: "Lead Engineer",
    initials: "VR",
    bio: "Architects our sync and offline systems so every outlet keeps working when the internet doesn't.",
    from: "#1F7A6D",
    to: "#66E7FF",
  },
  {
    name: "Sana Qureshi",
    role: "Customer Success Lead",
    initials: "SQ",
    bio: "Runs onboarding and training, and makes sure every new customer is live within a week.",
    from: "#E8553D",
    to: "#C98A12",
  },
  {
    name: "Dev Patel",
    role: "Implementation Manager",
    initials: "DP",
    bio: "Handles hardware setup, menu migration and integrations at outlets across the country.",
    from: "#4B5BD6",
    to: "#66E7FF",
  },
  {
    name: "Ishita Verma",
    role: "Design Lead",
    initials: "IV",
    bio: "Shapes our interfaces and visual system, keeping complex screens clear for busy staff.",
    from: "#FF8A2B",
    to: "#FF2D75",
  },
  {
    name: "Rohan Gupta",
    role: "Sales Director",
    initials: "RG",
    bio: "Helps restaurant and retail owners choose the right plan and gets them live within a week.",
    from: "#1E5BFF",
    to: "#66E7FF",
  },
  {
    name: "Tara Joseph",
    role: "QA and Support Engineer",
    initials: "TJ",
    bio: "Tests every release on real outlet setups so updates reach your counter without surprises.",
    from: "#7B3FE4",
    to: "#FF8A2B",
  },
];

const partnerLogos = ["Northwind", "Acme Co", "Lumen", "Brightpath", "Kestrel", "Halo Labs", "Parcel", "Orbit"];

const featureRows = [
  {
    id: "feat-books",
    name: "Bookkeeping",
    title: "Automated bookkeeping",
    text: "Every sale and expense is categorised and matched automatically, so your records stay accurate without manual entry.",
    color: "#1F7A6D",
    colorDeep: "#0C3B35",
  },
  {
    id: "feat-reports",
    name: "Live reports",
    title: "Reports that stay current",
    text: "Sales, stock and cash summaries refresh as transactions happen, not at the end of the month.",
    color: "#4B5BD6",
    colorDeep: "#222F87",
  },
  {
    id: "feat-forecast",
    name: "Forecasting",
    title: "Cash flow forecasting",
    text: "See upcoming receivables, payables and the runway ahead, based on the numbers you have today.",
    color: "#E8553D",
    colorDeep: "#9E2F1B",
  },
];

const aiInsights = [
  "Forecast sales and expenses for the next quarter.",
  "Flag unusual spending and duplicate invoices early.",
  "Get plain-language suggestions for pricing and planning.",
];

const aiArt = { id: "ai-art", name: "AI insights", color: "#FF2D75", colorDeep: "#7B3FE4", image: null };

const integrations = [
  { name: "Payments", initial: "P" },
  { name: "Email", initial: "E" },
  { name: "Team chat", initial: "C" },
  { name: "Cloud storage", initial: "S" },
  { name: "CRM", initial: "R" },
  { name: "Payroll", initial: "Y" },
  { name: "Calendar", initial: "K" },
  { name: "Code hosting", initial: "G" },
];

const securityPoints = [
  { title: "End-to-end encryption", text: "Data is encrypted in transit and at rest using industry-standard protocols." },
  { title: "Role-based access", text: "Give each staff member only the screens they need, and see who changed what." },
  { title: "Round-the-clock monitoring", text: "Systems are watched at all hours to detect and stop unauthorised access." },
];

const pricingPlans = [
  {
    name: "Starter",
    price: "₹999",
    period: "/month",
    blurb: "For a single outlet getting its books in order.",
    features: ["Billing and invoicing", "Daily sales reports", "Email support"],
    cta: "Start free trial",
  },
  {
    name: "Growth",
    price: "₹2,499",
    period: "/month",
    blurb: "For multi-outlet teams that need forecasts and deeper reports.",
    features: ["Everything in Starter", "Cash flow forecasting", "Multi-outlet dashboards", "Priority support"],
    cta: "Choose Growth",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    blurb: "For large chains with custom integration needs.",
    features: ["Unlimited outlets", "Custom integrations", "Dedicated account manager"],
    cta: "Talk to sales",
  },
];

const testimonials = [
  {
    quote: "Our month-end used to take a week. Now the numbers are ready the day after the month closes, and tax prep is far easier.",
    name: "Priya Sharma",
    role: "Owner, Spice Route Kitchens",
    initials: "PS",
    from: "#FF2D75",
    to: "#FF8A2B",
  },
  {
    quote: "Having sales, stock and staff data in one place made it simple to plan purchasing and cut waste across our outlets.",
    name: "Rahul Mehta",
    role: "Operations Lead, Urban Bites",
    initials: "RM",
    from: "#1E5BFF",
    to: "#66E7FF",
  },
  {
    quote: "The forecasts helped us decide when to expand. We have clear numbers to show investors every quarter.",
    name: "Ananya Iyer",
    role: "Founder, Cafe Lumiere",
    initials: "AI",
    from: "#7B3FE4",
    to: "#FF2D75",
  },
  {
    quote: "Setup took one afternoon, and our staff were taking orders on the new POS the same evening.",
    name: "Karan Singh",
    role: "Owner, Biryani House",
    initials: "KS",
    from: "#1F7A6D",
    to: "#66E7FF",
  },
  {
    quote: "Payroll that used to eat two days a month now runs itself. The attendance data alone saved us a headache every week.",
    name: "Meera Nair",
    role: "Manager, Quickfix Services",
    initials: "MN",
    from: "#C98A12",
    to: "#E8553D",
  },
];

const faqs = [
  {
    q: "How does automated bookkeeping work?",
    a: "Your sales and purchase data flows in from your billing and inventory tools. Entries are categorised and matched automatically, and anything unusual is flagged for review.",
  },
  {
    q: "Can I connect multiple outlets or bank accounts?",
    a: "Yes. The Growth and Enterprise plans support multiple outlets, locations and accounts, all reporting into one dashboard.",
  },
  {
    q: "How is this different from traditional accounting software?",
    a: "Traditional tools record what happened. Ours keep your numbers updated as it happens and suggest what to do next.",
  },
  {
    q: "How secure is my financial data?",
    a: "Everything is encrypted in transit and at rest, access is role-based, and every change is logged.",
  },
  {
    q: "Can I export reports for my accountant or investors?",
    a: "Yes. Reports export to PDF and spreadsheet formats, ready to share with your accountant or investors.",
  },
];

const whyPoints = [
  {
    title: "Built for daily use",
    text: "Screens that staff can learn in a single shift, with the most common actions one tap away.",
  },
  {
    title: "Works without internet",
    text: "Keep taking orders and billing during outages. Everything syncs the moment you reconnect.",
  },
  {
    title: "Support that picks up",
    text: "Call, email or chat with a real person. Setup help is included with every plan.",
  },
  {
    title: "Pricing you can plan around",
    text: "Clear monthly plans with no setup fees and no surprise add-ons.",
  },
];

/* ------------------------------------------------------------------
   PLACEHOLDER ART — original illustration used until `image` is set.
   ------------------------------------------------------------------ */
function DashboardArt({ product }) {
  const gid = `dash-${product.id}`;
  const areaId = `area-${product.id}`;
  const linePoints = [[230, 360], [280, 320], [330, 338], [380, 285], [430, 300], [480, 252], [530, 268], [570, 236]];
  const linePath = linePoints.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x} ${y}`).join(" ");
  const areaPath = `${linePath} L570 400 L230 400 Z`;

  return (
    <svg className="art-img" viewBox="0 0 800 520" role="img" aria-label={`${product.name} dashboard illustration`}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={product.color} />
          <stop offset="1" stopColor={product.colorDeep} />
        </linearGradient>
        <linearGradient id={areaId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={product.color} stopOpacity="0.35" />
          <stop offset="1" stopColor={product.color} stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width="800" height="520" fill={`url(#${gid})`} />
      <circle cx="720" cy="40" r="170" fill="#FFFFFF" opacity="0.1" />
      <circle cx="40" cy="520" r="150" fill="#FFFFFF" opacity="0.08" />

      {/* Window frame */}
      <rect x="60" y="60" width="680" height="410" rx="22" fill="#FFFFFF" />
      <rect x="60" y="60" width="680" height="46" rx="22" fill="#F3F5FA" />
      <rect x="60" y="88" width="680" height="18" fill="#F3F5FA" />
      <circle cx="90" cy="83" r="6" fill="#FF5F57" />
      <circle cx="110" cy="83" r="6" fill="#FEBC2E" />
      <circle cx="130" cy="83" r="6" fill="#28C840" />
      <rect x="520" y="72" width="180" height="22" rx="11" fill="#FFFFFF" />

      {/* Sidebar */}
      <rect x="60" y="106" width="130" height="364" fill="#F7F8FC" />
      <rect x="82" y="136" width="30" height="30" rx="9" fill={product.color} />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x="82" y={190 + i * 42} width={86 - (i % 2) * 16} height="12" rx="6" fill={i === 0 ? product.color : "#D9DEEB"} />
      ))}

      {/* KPI tiles */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={214 + i * 184} y="128" width="166" height="84" rx="16" fill="#F7F8FC" />
          <rect x={232 + i * 184} y="150" width="70" height="8" rx="4" fill="#B5BDD2" />
          <rect x={232 + i * 184} y="172" width={110 - i * 12} height="18" rx="7" fill={i === 0 ? product.color : "#1C2340"} />
        </g>
      ))}

      {/* Area chart */}
      <rect x="214" y="232" width="370" height="208" rx="18" fill="#FFFFFF" stroke="#E6E9F2" />
      <path d={areaPath} fill={`url(#${areaId})`} />
      <path d={linePath} fill="none" stroke={product.color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      {linePoints.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="4" fill="#FFFFFF" stroke={product.color} strokeWidth="2.5" />
      ))}

      {/* Activity list */}
      <rect x="606" y="232" width="134" height="208" rx="18" fill="#FFFFFF" stroke="#E6E9F2" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <circle cx="632" cy={262 + i * 44} r="12" fill={i % 2 ? "#1C2340" : product.color} opacity="0.9" />
          <rect x="652" y={258 + i * 44} width="66" height="8" rx="4" fill="#C9D0E0" />
          <rect x="652" y={272 + i * 44} width="40" height="6" rx="3" fill="#E4E8F2" />
        </g>
      ))}
    </svg>
  );
}

function ProductArt({ product }) {
  if (product.image) {
    return <img className="art-img" src={product.image} alt={`${product.name} screenshot`} />;
  }
  return <DashboardArt product={product} />;
}

function PlaceholderArt({ product }) {
  if (product.image) {
    return <img className="art-img" src={product.image} alt={`${product.name} screenshot`} />;
  }

  const gradientId = `grad-${product.id}`;
  return (
    <svg
      className="art-img"
      viewBox="0 0 800 520"
      role="img"
      aria-label={`${product.name} placeholder screenshot`}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={product.color} />
          <stop offset="1" stopColor={product.colorDeep} />
        </linearGradient>
      </defs>
      <rect width="800" height="520" rx="28" fill={`url(#${gradientId})`} />
      <rect x="90" y="86" width="620" height="348" rx="18" fill="#FFFFFF" opacity="0.94" />
      <rect x="90" y="86" width="620" height="44" rx="18" fill="#FFFFFF" />
      <circle cx="116" cy="108" r="6" fill={product.color} />
      <circle cx="136" cy="108" r="6" fill="#D5D9D2" />
      <circle cx="156" cy="108" r="6" fill="#D5D9D2" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect
          key={i}
          x={122 + i * 110}
          y={160}
          width="90"
          height={60 + ((i * 37) % 60)}
          rx="10"
          fill={i % 2 === 0 ? product.color : product.colorDeep}
          opacity={0.18 + i * 0.12}
        />
      ))}
      {[0, 1, 2].map((i) => (
        <rect key={i} x="122" y={310 + i * 34} width={380 - i * 70} height="14" rx="7" fill="#C9CEC6" />
      ))}
      <rect x="520" y="300" width="160" height="110" rx="14" fill={product.color} opacity="0.85" />
    </svg>
  );
}

/* ------------------------------------------------------------------
   HERO BACKGROUND — abstract original shapes, no external images.
   ------------------------------------------------------------------ */
function HeroArt() {
  return (
    <div className="hero-art" aria-hidden="true">
      <div className="blob blob-a" />
      <div className="blob blob-b" />
      <div className="blob blob-c" />
      <svg className="swoosh" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
        <path d="M-80 180 C 260 40, 520 320, 820 150 S 1280 60, 1520 240" />
        <path d="M-80 300 C 240 160, 560 430, 860 260 S 1300 170, 1520 360" />
        <path d="M-80 440 C 300 300, 600 560, 900 390 S 1340 300, 1520 480" />
        <path d="M900 900 C 980 700, 1180 640, 1520 520" />
      </svg>
      <div className="dots dots-left" />
      <div className="dots dots-right" />
      <div className="play-row">
        {[0, 1, 2, 3].map((i) => (
          <svg key={i} viewBox="0 0 20 20" width="18" height="18">
            <path d="M4 3 L16 10 L4 17 Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
          </svg>
        ))}
      </div>
      <div className="ring ring-a" />
      <div className="ring ring-b" />
    </div>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
      <path d="M4 10.5 L8 14.5 L16 6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true" className="arrow">
      <path d="M4 10 H15 M11 6 L15 10 L11 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------
   PARALLAX — moves an element's artwork slightly against the scroll.
   Skipped entirely when the user prefers reduced motion.
   ------------------------------------------------------------------ */
function useParallax(ref, strength = 36) {
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
      el.style.setProperty("--py", (-offset * strength).toFixed(1));
    };
    const request = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    return () => {
      window.removeEventListener("scroll", request);
      window.removeEventListener("resize", request);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ref, strength]);
}

/* ------------------------------------------------------------------
   PARTICLES — a drifting dot network drawn on a canvas.
   Pauses when scrolled out of view and draws one still frame
   for users who prefer reduced motion.
   ------------------------------------------------------------------ */
function ParticleField({ count = 70 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const parent = canvas.parentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const colors = ["#66E7FF", "#7B3FE4", "#FF2D75", "#FFFFFF"];
    const pointer = { x: -9999, y: -9999 };
    let width = 0;
    let height = 0;
    let particles = [];
    let frame = 0;
    let running = false;

    const resize = () => {
      const rect = parent.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.8 + 0.6,
        c: colors[Math.floor(Math.random() * colors.length)],
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      if (!reduceMotion) {
        for (const p of particles) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;

          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 9000) {
            const force = ((9000 - d2) / 9000) * 0.05;
            p.x += dx * force;
            p.y += dy * force;
          }
        }
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.strokeStyle = `rgba(102, 231, 255, ${(1 - dist / 120) * 0.22})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        ctx.fillStyle = p.c;
        ctx.globalAlpha = 0.85;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const loop = () => {
      draw();
      if (running) frame = requestAnimationFrame(loop);
    };

    const start = () => {
      if (reduceMotion || running) return;
      running = true;
      frame = requestAnimationFrame(loop);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    const handleResize = () => {
      resize();
      if (reduceMotion) draw();
    };

    const handlePointer = (event) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    };
    const handlePointerLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    resize();
    draw();

    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 }
    );
    observer.observe(canvas);

    window.addEventListener("resize", handleResize);
    parent.addEventListener("pointermove", handlePointer);
    parent.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      stop();
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      parent.removeEventListener("pointermove", handlePointer);
      parent.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [count]);

  return <canvas ref={canvasRef} className="particles" aria-hidden="true" />;
}

function ServiceIcon({ name }) {
  const shapes = {
    setup: <path d="M4 7h16M4 12h10M4 17h7" />,
    users: (
      <>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 20c1-3.5 4-5 7-5s6 1.5 7 5" />
      </>
    ),
    cloud: <path d="M7 18h10a4 4 0 0 0 .5-8A6 6 0 0 0 6 9a4 4 0 0 0 1 9z" />,
    code: <path d="M9 8l-4 4 4 4M15 8l4 4-4 4M13 6l-2 12" />,
    shield: <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" />,
    chart: <path d="M4 20h16M7 16v-5M12 16V6M17 16v-8" />,
    device: (
      <>
        <rect x="6" y="3" width="12" height="18" rx="3" />
        <path d="M11 18h2" />
      </>
    ),
  };
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {shapes[name]}
    </svg>
  );
}

function PortfolioCard({ project }) {
  const mediaRef = useRef(null);
  useParallax(mediaRef, 36);

  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    event.currentTarget.style.setProperty("--rx", `${(-y * 8).toFixed(2)}deg`);
    event.currentTarget.style.setProperty("--ry", `${(x * 10).toFixed(2)}deg`);
  };

  const handleLeave = (event) => {
    event.currentTarget.style.setProperty("--rx", "0deg");
    event.currentTarget.style.setProperty("--ry", "0deg");
  };

  return (
    <article className="pf-card" onMouseMove={handleMove} onMouseLeave={handleLeave}>
      <a className="pf-link" href={`#/portfolio/${project.id}`} aria-label={`View ${project.name} case study`}>
        <div className="pf-media" ref={mediaRef}>
          <ProductArt product={project} />
          <div className="pf-overlay">
            <span>View case study</span>
          </div>
        </div>
        <div className="pf-meta">
          <span className="pf-cat">{project.category}</span>
          <h3>{project.name}</h3>
          <p>{project.client}</p>
        </div>
      </a>
    </article>
  );
}

function Portfolio() {
  const [filter, setFilter] = useState("All");
  const categories = ["All", ...new Set(portfolioProjects.map((p) => p.category))];
  const visible = filter === "All" ? portfolioProjects : portfolioProjects.filter((p) => p.category === filter);

  return (
    <section className="portfolio" id="portfolio" aria-labelledby="portfolio-heading">
      <div className="section-head centered">
        <h2 id="portfolio-heading">Recent work</h2>
        <p>A selection of rollouts across restaurants, retail and service businesses.</p>
      </div>
      <div className="pf-filters" role="group" aria-label="Filter projects">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={`pf-filter${filter === category ? " is-active" : ""}`}
            aria-pressed={filter === category}
            onClick={() => setFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="pf-grid">
        {visible.map((project) => (
          <PortfolioCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   REVIEWS — two counter-scrolling rows of review cards. Each card
   shows an original product screenshot. Rows pause on hover.
   ------------------------------------------------------------------ */
function StarRow() {
  return (
    <div className="tm-stars" role="img" aria-label="5 out of 5 stars">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path
            d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"
            fill="#FFB020"
          />
        </svg>
      ))}
    </div>
  );
}

function ReviewWall() {
  const rowA = testimonials;
  const rowB = [...testimonials].reverse();

  const renderCard = (item, i) => {
    return (
      <figure className="rv-card" key={`${item.name}-${i}`}>
        <div className="rv-body">
          <StarRow />
          <blockquote>“{item.quote}”</blockquote>
          <figcaption>
            <span className="avatar" style={{ background: `linear-gradient(120deg, ${item.from}, ${item.to})` }}>
              {item.initials}
            </span>
            <span>
              <strong>{item.name}</strong>
              <small>{item.role}</small>
            </span>
          </figcaption>
        </div>
      </figure>
    );
  };

  return (
    <section className="reviews" aria-labelledby="reviews-heading">
      <FloatingOrbs />
      <div className="rv-head">
        <div>
          <span className="rv-eyebrow">Customer reviews</span>
          <h2 id="reviews-heading">Teams who rely on their numbers</h2>
        </div>
        <div className="rv-stats">
          <div>
            <strong>4.9</strong>
            <span>average rating</span>
          </div>
          <div>
            <strong>1,200+</strong>
            <span>verified reviews</span>
          </div>
          <div>
            <strong>98%</strong>
            <span>customers renew</span>
          </div>
        </div>
      </div>

      <div className="rv-marquee">
        <div className="rv-track">
          {[...rowA, ...rowA].map((item, i) => renderCard(item, i))}
        </div>
      </div>

      <div className="rv-marquee rv-reverse">
        <div className="rv-track">
          {[...rowB, ...rowB].map((item, i) => renderCard(item, i + 2))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
   WHY US — icon cards. The text panel rises over the artwork on hover.
   ------------------------------------------------------------------ */
const whyStyles = [
  { icon: "bolt", from: "#FF2D75", to: "#FF8A2B" },
  { icon: "offline", from: "#1E5BFF", to: "#66E7FF" },
  { icon: "headset", from: "#7B3FE4", to: "#FF2D75" },
  { icon: "tag", from: "#1F7A6D", to: "#66E7FF" },
];

function WhyIcon({ name }) {
  const shapes = {
    bolt: <path d="M13 3L5 14h6l-1 7 8-11h-6z" />,
    offline: (
      <path d="M3 3l18 18M5 12.5a10 10 0 0 1 4.5-2.5M19 12.5a10 10 0 0 0-2-1.4M9 16.5a5 5 0 0 1 3-1M12 20h.01" />
    ),
    headset: (
      <>
        <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
        <rect x="3" y="13" width="4" height="6" rx="2" />
        <rect x="17" y="13" width="4" height="6" rx="2" />
      </>
    ),
    tag: (
      <>
        <path d="M3 12V4h8l10 10-8 8z" />
        <circle cx="7.5" cy="8.5" r="1.5" />
      </>
    ),
  };
  return (
    <svg viewBox="0 0 24 24" width="48" height="48" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {shapes[name]}
    </svg>
  );
}

function SecIcon({ name }) {
  const shapes = {
    lock: (
      <>
        <rect x="5" y="11" width="14" height="10" rx="2" />
        <path d="M8 11V8a4 4 0 0 1 8 0v3" />
      </>
    ),
    users: (
      <>
        <circle cx="9" cy="8" r="3.5" />
        <path d="M2.5 20c.8-3.2 3.3-5 6.5-5s5.7 1.8 6.5 5" />
        <path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 15c1.8.6 3 2.3 3.5 5" />
      </>
    ),
    pulse: <path d="M3 12h4l2-6 4 12 2-6h6" />,
  };
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {shapes[name]}
    </svg>
  );
}

/* ------------------------------------------------------------------
   FLOATING PARTICLES — drifting circles, rising dots, pulsing rings
   and orbiting rings. Purely decorative, behind the review cards.
   ------------------------------------------------------------------ */
const orbs = [
  { kind: "drift", size: 150, x: "3%", y: "10%", c: "rgba(30, 91, 255, .16)", dur: 24, delay: 0 },
  { kind: "drift", size: 90, x: "82%", y: "62%", c: "rgba(255, 45, 117, .16)", dur: 28, delay: -6 },
  { kind: "orbit", size: 130, x: "88%", y: "6%", c: "rgba(123, 63, 228, .6)", dur: 26, delay: 0 },
  { kind: "orbit", size: 70, x: "6%", y: "70%", c: "rgba(255, 138, 43, .6)", dur: 18, delay: -4 },
  { kind: "rise", size: 14, x: "22%", y: "92%", c: "rgba(30, 91, 255, .45)", dur: 13, delay: 0 },
  { kind: "rise", size: 10, x: "40%", y: "96%", c: "rgba(255, 45, 117, .45)", dur: 17, delay: -5 },
  { kind: "rise", size: 18, x: "60%", y: "94%", c: "rgba(102, 231, 255, .6)", dur: 15, delay: -9 },
  { kind: "rise", size: 8, x: "74%", y: "98%", c: "rgba(123, 63, 228, .5)", dur: 12, delay: -3 },
  { kind: "rise", size: 12, x: "93%", y: "90%", c: "rgba(255, 138, 43, .5)", dur: 19, delay: -11 },
  { kind: "pulse", size: 220, x: "42%", y: "-6%", c: "rgba(30, 91, 255, .1)", dur: 9, delay: 0 },
  { kind: "pulse", size: 60, x: "18%", y: "26%", c: "rgba(255, 45, 117, .18)", dur: 7, delay: -2 },
  { kind: "drift", size: 36, x: "52%", y: "80%", c: "rgba(30, 91, 255, .22)", dur: 20, delay: -8 },
];

function FloatingOrbs() {
  return (
    <>
      {orbs.map((o, i) => (
        <span
          key={i}
          className={`orb orb-${o.kind}`}
          style={{
            width: o.size,
            height: o.size,
            left: o.x,
            top: o.y,
            "--c": o.c,
            animationDuration: `${o.dur}s`,
            animationDelay: `${o.delay}s`,
          }}
        />
      ))}
    </>
  );
}

/* ------------------------------------------------------------------
   INDUSTRIES WE SERVE — physics playground.
   Circles fall in when the section scrolls into view, pile up at the
   bottom, and can be dragged. A dragged circle pushes the others out
   of its way; released circles keep their momentum and settle again.
   ------------------------------------------------------------------ */
const industries = [
  { name: "Restaurants", color: "#E8553D" },
  { name: "Cafés", color: "#C98A12" },
  { name: "Bakeries", color: "#FF8A2B" },
  { name: "Cloud kitchens", color: "#7B3FE4" },
  { name: "Hotels", color: "#1E5BFF" },
  { name: "Retail stores", color: "#FF2D75" },
  { name: "Pharmacies", color: "#1F7A6D" },
  { name: "Grocery", color: "#66E7FF" },
  { name: "Salons and spas", color: "#FF2D75" },
  { name: "Gyms", color: "#1E5BFF" },
  { name: "Logistics", color: "#4B5BD6" },
  { name: "Healthcare", color: "#1F7A6D" },
  { name: "Education", color: "#7B3FE4" },
  { name: "Manufacturing", color: "#C98A12" },
  { name: "Real estate", color: "#E8553D" },
  { name: "E-commerce", color: "#1E5BFF" },
  { name: "Fintech", color: "#66E7FF" },
  { name: "Travel", color: "#FF8A2B" },
  { name: "Automotive", color: "#4B5BD6" },
  { name: "Event venues", color: "#FF2D75" },
  { name: "Fashion", color: "#7B3FE4" },
  { name: "Electronics", color: "#1F7A6D" },
  { name: "Wholesale", color: "#C98A12" },
  { name: "Cinemas", color: "#E8553D" },
];

function IndustriesBoard() {
  const boardRef = useRef(null);
  const bodyRefs = useRef([]);
  const bodiesRef = useRef([]);
  const sizeRef = useRef({ w: 0, h: 0 });
  const dragRef = useRef(null);
  const [radius, setRadius] = useState(50);
  const [dragIndex, setDragIndex] = useState(null);

  // Physics loop: gravity, walls and floor, and circle-to-circle collisions.
  // Runs only while the board is on screen.
  useEffect(() => {
    const board = boardRef.current;
    if (!board) return undefined;

    const GRAVITY = 0.5;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let running = false;
    let last = 0;

    const radiusFor = (w) => Math.max(34, Math.min(60, w / 15));

    const draw = () => {
      bodiesRef.current.forEach((b, i) => {
        const el = bodyRefs.current[i];
        if (el) el.style.transform = `translate3d(${b.x - b.r}px, ${b.y - b.r}px, 0)`;
      });
    };

    const setup = () => {
      const w = board.clientWidth;
      const h = board.clientHeight;
      const r = radiusFor(w);
      sizeRef.current = { w, h };
      setRadius(r);

      if (bodiesRef.current.length === 0) {
        // Start above the board so the circles fall in from the top.
        bodiesRef.current = industries.map((_, i) => ({
          x: r + Math.random() * Math.max(1, w - 2 * r),
          y: -r - i * 90 - Math.random() * 120,
          vx: (Math.random() - 0.5) * 2,
          vy: 0,
          r,
          m: r * r,
          fixed: false,
        }));
      } else {
        bodiesRef.current.forEach((b) => {
          b.r = r;
          b.m = r * r;
          b.x = Math.min(Math.max(b.x, r), w - r);
          b.y = Math.min(b.y, h - r);
        });
      }
      draw();
    };

    const constrain = (b, w, h) => {
      if (b.x < b.r) {
        b.x = b.r;
        if (b.vx < 0) b.vx *= -0.4;
      }
      if (b.x > w - b.r) {
        b.x = w - b.r;
        if (b.vx > 0) b.vx *= -0.4;
      }
      if (b.y > h - b.r) {
        b.y = h - b.r;
        if (b.vy > 0) b.vy *= -0.3;
        b.vx *= 0.92;
      }
      if (b.fixed && b.y < b.r) b.y = b.r;
    };

    const resolve = (a, b) => {
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const dist = Math.hypot(dx, dy) || 0.0001;
      const minDist = a.r + b.r;
      if (dist >= minDist) return;

      const nx = dx / dist;
      const ny = dy / dist;
      const overlap = minDist - dist;
      const ia = a.fixed ? 0 : 1 / a.m;
      const ib = b.fixed ? 0 : 1 / b.m;
      const sum = ia + ib;
      if (sum === 0) return;

      // Separate the two circles, moving the lighter one further.
      a.x -= nx * overlap * (ia / sum);
      a.y -= ny * overlap * (ia / sum);
      b.x += nx * overlap * (ib / sum);
      b.y += ny * overlap * (ib / sum);

      // Exchange momentum along the contact normal.
      const vn = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny;
      if (vn < 0) {
        const restitution = 0.25;
        const j = (-(1 + restitution) * vn) / sum;
        a.vx -= j * ia * nx;
        a.vy -= j * ia * ny;
        b.vx += j * ib * nx;
        b.vy += j * ib * ny;
      }
    };

    const step = (dt) => {
      const { w, h } = sizeRef.current;
      const list = bodiesRef.current;

      for (const b of list) {
        if (b.fixed) continue;
        b.vy += GRAVITY * dt;
        b.vx *= 0.999;
        b.x += b.vx * dt;
        b.y += b.vy * dt;
      }

      for (let pass = 0; pass < 4; pass++) {
        for (let i = 0; i < list.length; i++) {
          for (let j = i + 1; j < list.length; j++) resolve(list[i], list[j]);
        }
        for (const b of list) constrain(b, w, h);
      }

      draw();
    };

    const loop = (now) => {
      const dt = Math.min((now - last) / 16.67, 2);
      last = now;
      step(dt);
      frame = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running) return;
      running = true;
      last = performance.now();
      frame = requestAnimationFrame(loop);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };

    setup();

    // With reduced motion, let the circles settle instantly instead of falling.
    if (reduceMotion) {
      for (let k = 0; k < 900; k++) step(1);
    }

    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0.15 }
    );
    observer.observe(board);

    const handleResize = () => setup();
    window.addEventListener("resize", handleResize);

    return () => {
      stop();
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toLocal = (event) => {
    const rect = boardRef.current.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const handlePointerDown = (event) => {
    const list = bodiesRef.current;
    const { x, y } = toLocal(event);

    // Pick the circle on top (highest index) under the pointer.
    let hit = -1;
    for (let i = list.length - 1; i >= 0; i--) {
      if (Math.hypot(x - list[i].x, y - list[i].y) <= list[i].r) {
        hit = i;
        break;
      }
    }
    if (hit < 0) return;

    const body = list[hit];
    boardRef.current.setPointerCapture(event.pointerId);
    body.fixed = true;
    body.vx = 0;
    body.vy = 0;
    dragRef.current = { index: hit, offX: body.x - x, offY: body.y - y, px: x, py: y, vx: 0, vy: 0 };
    setDragIndex(hit);
  };

  const handlePointerMove = (event) => {
    const drag = dragRef.current;
    if (!drag) return;
    const { w, h } = sizeRef.current;
    const body = bodiesRef.current[drag.index];
    const { x, y } = toLocal(event);

    body.x = Math.min(Math.max(x + drag.offX, body.r), w - body.r);
    body.y = Math.min(Math.max(y + drag.offY, body.r), h - body.r);

    // Track pointer speed so a fast flick can throw the circle.
    drag.vx = drag.vx * 0.5 + (x - drag.px) * 0.5;
    drag.vy = drag.vy * 0.5 + (y - drag.py) * 0.5;
    drag.px = x;
    drag.py = y;
  };

  const handlePointerUp = () => {
    const drag = dragRef.current;
    if (!drag) return;
    const body = bodiesRef.current[drag.index];
    body.fixed = false;
    body.vx = Math.max(-25, Math.min(25, drag.vx));
    body.vy = Math.max(-25, Math.min(25, drag.vy));
    dragRef.current = null;
    setDragIndex(null);
  };

  return (
    <div
      ref={boardRef}
      className="ph-board"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {industries.map((item, i) => (
        <div
          key={item.name}
          ref={(el) => {
            bodyRefs.current[i] = el;
          }}
          className={`ph-body${i % 2 ? " is-outline" : ""}${dragIndex === i ? " is-dragging" : ""}`}
          style={{
            width: radius * 2,
            height: radius * 2,
            "--c": item.color,
            "--r": `${radius}px`,
          }}
        >
          <span className="ph-label">{item.name}</span>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------
   PORTFOLIO DETAIL PAGES — hash routes (#/portfolio/<id>) so they
   work on any static host. Section links (#portfolio) still scroll.
   ------------------------------------------------------------------ */
const projectDetails = {
  "pf-pos": {
    year: "2025",
    duration: "6 weeks",
    services: ["POS setup", "Menu digitisation", "Staff training"],
    summary: "A complete point-of-sale rollout for a 40-seat café, replacing paper tickets with table-side ordering and a live kitchen display.",
    challenge: "Peak-hour orders were written on paper, and the kitchen had no view of pending tickets.",
    solution: "Table-side tablets, a kitchen display and offline order sync, so service kept running through internet drops.",
    results: [
      { v: "-32%", l: "order errors" },
      { v: "2.1x", l: "faster table turns" },
      { v: "1 day", l: "to go live" },
    ],
    captions: ["Table and floor layout", "Kitchen display tickets", "Daily sales summary"],
  },
  "pf-billing": {
    year: "2025",
    duration: "4 weeks",
    services: ["GST invoicing", "Data migration", "Accountant handover"],
    summary: "A billing and invoicing system for a multi-branch restaurant group, with GST-ready invoices generated straight from every sale.",
    challenge: "Invoices were created by hand in spreadsheets, and month-end reconciliation took most of a week.",
    solution: "Automatic invoice numbering, GST breakdowns on every bill and a daily export to the accounting tool.",
    results: [
      { v: "5 days", l: "saved each month" },
      { v: "100%", l: "GST-compliant bills" },
      { v: "3", l: "branches on one ledger" },
    ],
    captions: ["Invoice builder", "GST summary report", "Branch-wise sales"],
  },
  "pf-payroll": {
    year: "2024",
    duration: "8 weeks",
    services: ["Biometric setup", "Leave rules", "Payslip automation"],
    summary: "Attendance and payroll for a 120-person kitchen and delivery team, connected to biometric readers at each outlet.",
    challenge: "Shift punches, leave requests and salary calculations lived in three different spreadsheets.",
    solution: "One attendance feed into payroll, configurable leave policies and automatic payslips by email.",
    results: [
      { v: "2 days", l: "saved each pay cycle" },
      { v: "0", l: "manual salary errors" },
      { v: "120", l: "staff on one system" },
    ],
    captions: ["Attendance calendar", "Leave balance overview", "Payslip preview"],
  },
  "pf-analytics": {
    year: "2026",
    duration: "5 weeks",
    services: ["Data pipeline", "Custom dashboards", "Forecasting"],
    summary: "A live dashboard that brings sales, stock and staffing from six outlets into one view, with weekly forecasts.",
    challenge: "Owners checked each outlet separately, so slow sellers and stock gaps were spotted too late.",
    solution: "A single dashboard with outlet comparisons, low-stock alerts and a forecast for the next four weeks.",
    results: [
      { v: "18%", l: "less stock wastage" },
      { v: "Live", l: "outlet comparisons" },
      { v: "6", l: "outlets in one view" },
    ],
    captions: ["Outlet comparison", "Sales forecast", "Stock alerts"],
  },
  "pf-mobile": {
    year: "2025",
    duration: "10 weeks",
    services: ["Mobile app", "Offline mode", "Job scheduling"],
    summary: "A field service app that lets technicians accept jobs, record work and collect payment on site, even without signal.",
    challenge: "Job details arrived by phone call, and completed work was logged days later.",
    solution: "Assigned jobs on a phone, photo proof of work, and offline sync once the technician reconnects.",
    results: [
      { v: "40%", l: "more jobs per day" },
      { v: "Same day", l: "invoices sent" },
      { v: "3 min", l: "average job logging" },
    ],
    captions: ["Job list and route", "Work completion form", "Payment on site"],
  },
  "pf-retail": {
    year: "2026",
    duration: "7 weeks",
    services: ["Inventory setup", "Barcode printing", "Supplier orders"],
    summary: "An inventory suite for a chain of 12 stores, with barcode scanning, supplier reorders and branch transfers.",
    challenge: "Stock counts were done once a quarter, so stores regularly ran out of best-selling items.",
    solution: "Barcode scanning at every store, automatic reorder points and transfer requests between branches.",
    results: [
      { v: "24%", l: "fewer stockouts" },
      { v: "1 hour", l: "to count a store" },
      { v: "12", l: "stores connected" },
    ],
    captions: ["Stock by location", "Reorder suggestions", "Barcode label printing"],
  },
};

function useHashRoute() {
  const [hash, setHash] = useState(window.location.hash);
  useEffect(() => {
    const onChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return hash;
}

function ShareBar({ title }) {
  const [copied, setCopied] = useState(false);
  const hasNativeShare = typeof navigator !== "undefined" && typeof navigator.share === "function";

  const pageUrl = () => window.location.href;
  const encodedUrl = encodeURIComponent(pageUrl());
  const encodedTitle = encodeURIComponent(title);

  const copyLink = async () => {
    const url = pageUrl();
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const field = document.createElement("textarea");
      field.value = url;
      document.body.appendChild(field);
      field.select();
      document.execCommand("copy");
      field.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const nativeShare = async () => {
    try {
      await navigator.share({ title, url: pageUrl() });
    } catch {
      /* user cancelled */
    }
  };

  const links = [
    { label: "X", href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}` },
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` },
    { label: "WhatsApp", href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}` },
    { label: "Email", href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}` },
  ];

  return (
    <div className="pd-share">
      <span>Share</span>
      {links.map((link) => (
        <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
          {link.label}
        </a>
      ))}
      <button type="button" className={copied ? "is-copied" : ""} onClick={copyLink}>
        {copied ? "Link copied" : "Copy link"}
      </button>
      {hasNativeShare && (
        <button type="button" onClick={nativeShare}>More options</button>
      )}
    </div>
  );
}

function Lightbox({ images, index, onClose, onChange }) {
  const total = images.length;

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onChange((index + 1) % total);
      if (event.key === "ArrowLeft") onChange((index - 1 + total) % total);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, total, onClose, onChange]);

  const image = images[index];
  return (
    <div className="pd-lightbox" role="dialog" aria-modal="true" aria-label="Project image" onClick={onClose}>
      <div className="pd-lb-inner" onClick={(event) => event.stopPropagation()}>
        <ProductArt product={image} />
        <p>
          {image.caption} <span>{index + 1} / {total}</span>
        </p>
        <button type="button" className="pd-lb-btn is-prev" aria-label="Previous image" onClick={() => onChange((index - 1 + total) % total)}>
          ‹
        </button>
        <button type="button" className="pd-lb-btn is-next" aria-label="Next image" onClick={() => onChange((index + 1) % total)}>
          ›
        </button>
        <button type="button" className="pd-lb-close" aria-label="Close" onClick={onClose}>
          ×
        </button>
      </div>
    </div>
  );
}

function PortfolioDetail({ project }) {
  const details = projectDetails[project.id];
  const heroRef = useRef(null);
  const [lightbox, setLightbox] = useState(null);
  useParallax(heroRef, 40);

  const total = portfolioProjects.length;
  const index = portfolioProjects.findIndex((p) => p.id === project.id);
  const prev = portfolioProjects[(index - 1 + total) % total];
  const next = portfolioProjects[(index + 1) % total];

  // Three gallery views built from the project's own colours.
  const gallery = [
    { ...project, id: `${project.id}-g1`, name: details.captions[0], caption: details.captions[0] },
    {
      ...project,
      id: `${project.id}-g2`,
      name: details.captions[1],
      caption: details.captions[1],
      color: project.colorDeep,
      colorDeep: project.color,
    },
    {
      ...project,
      id: `${project.id}-g3`,
      name: details.captions[2],
      caption: details.captions[2],
      color: "#1E5BFF",
      colorDeep: project.colorDeep,
    },
  ];

  return (
    <div className="page pd">
      <style>{styles}</style>

      <header className="pd-top">
        <a className="brand" href="#top" aria-label="SaaSio home">
          <span className="brand-mark" aria-hidden="true" />
          SaaSio
        </a>
        <a className="pd-back-top" href="#portfolio">All work</a>
      </header>

      <main>
        <section className="pd-hero">
          <div className="pd-hero-text">
            <a className="pd-back" href="#portfolio">← Back to portfolio</a>
            <span className="pf-cat">{project.category}</span>
            <h1>{project.name}</h1>
            <p className="pd-summary">{details.summary}</p>
            <dl className="pd-meta">
              <div>
                <dt>Client</dt>
                <dd>{project.client}</dd>
              </div>
              <div>
                <dt>Year</dt>
                <dd>{details.year}</dd>
              </div>
              <div>
                <dt>Duration</dt>
                <dd>{details.duration}</dd>
              </div>
            </dl>
            <ShareBar title={project.name} />
          </div>
          <div className="pd-hero-media" ref={heroRef}>
            <ProductArt product={project} />
          </div>
        </section>

        <section className="pd-body" aria-label="Project overview">
          <div className="pd-cols">
            <article>
              <h3>The challenge</h3>
              <p>{details.challenge}</p>
            </article>
            <article>
              <h3>Our solution</h3>
              <p>{details.solution}</p>
            </article>
            <article className="pd-results">
              <h3>Results</h3>
              {details.results.map((result) => (
                <div key={result.l}>
                  <strong>{result.v}</strong>
                  <span>{result.l}</span>
                </div>
              ))}
            </article>
          </div>
          <div className="pd-scope">
            {details.services.map((service) => (
              <span key={service}>{service}</span>
            ))}
          </div>
        </section>

        <section className="pd-gallery" aria-labelledby="pd-gallery-heading">
          <h2 id="pd-gallery-heading">Project gallery</h2>
          <div className="pd-grid">
            {gallery.map((image, i) => (
              <button
                key={image.id}
                type="button"
                className="pd-shot"
                onClick={() => setLightbox(i)}
                aria-label={`Open image: ${image.caption}`}
              >
                <ProductArt product={image} />
                <span className="pd-shot-cap">{image.caption}</span>
              </button>
            ))}
          </div>
        </section>

        {lightbox !== null && (
          <Lightbox images={gallery} index={lightbox} onClose={() => setLightbox(null)} onChange={setLightbox} />
        )}

        <nav className="pd-pager" aria-label="Project navigation">
          <a className="pd-pager-side is-prev" href={`#/portfolio/${prev.id}`}>
            <span className="pd-arrow" aria-hidden="true">←</span>
            <span>
              <small>Previous project</small>
              <strong>{prev.name}</strong>
            </span>
          </a>

          <a className="pd-pager-center" href="#portfolio" aria-label="Back to all portfolio projects">
            <span className="pd-circle">
              <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <rect x="4" y="4" width="6" height="6" rx="1.5" />
                <rect x="14" y="4" width="6" height="6" rx="1.5" />
                <rect x="4" y="14" width="6" height="6" rx="1.5" />
                <rect x="14" y="14" width="6" height="6" rx="1.5" />
              </svg>
            </span>
            <small>All work</small>
          </a>

          <a className="pd-pager-side is-next" href={`#/portfolio/${next.id}`}>
            <span>
              <small>Next project</small>
              <strong>{next.name}</strong>
            </span>
            <span className="pd-arrow" aria-hidden="true">→</span>
          </a>
        </nav>
      </main>

      <footer className="pd-foot">© {new Date().getFullYear()} SaaSio. All rights reserved.</footer>
    </div>
  );
}

function LandingPage() {
  const [activeId, setActiveId] = useState(products[0].id);
  const [submitted, setSubmitted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const tabRefs = useRef({});
  const heroRef = useRef(null);

  const active = products.find((p) => p.id === activeId) ?? products[0];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleHeroMove = (event) => {
    const el = heroRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", ((event.clientX - rect.left) / rect.width - 0.5).toFixed(3));
    el.style.setProperty("--my", ((event.clientY - rect.top) / rect.height - 0.5).toFixed(3));
  };

  const moveSelection = (index, delta) => {
    const next = (index + delta + products.length) % products.length;
    const nextId = products[next].id;
    setActiveId(nextId);
    tabRefs.current[nextId]?.focus();
  };

  const handleTabKey = (event, index) => {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      moveSelection(index, 1);
    }
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      moveSelection(index, -1);
    }
  };

  const handleDemoSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="page">
      <style>{styles}</style>

      <header className={`nav${scrolled ? " is-scrolled" : ""}${menuOpen ? " is-open" : ""}`}>
        <a className="brand" href="#top" aria-label="Home" onClick={closeMenu}>
          <span className="brand-mark" aria-hidden="true" />
          SaaSio
        </a>

        <nav className="nav-links" aria-label="Main">
          {navItems.map((item) =>
            item.label === "Products" ? (
              <div
                key={item.label}
                className={`nav-drop${productsOpen ? " is-open" : ""}`}
                onMouseEnter={() => setProductsOpen(true)}
                onMouseLeave={() => setProductsOpen(false)}
              >
                <a
                  href={item.href}
                  aria-haspopup="menu"
                  aria-expanded={productsOpen}
                  onFocus={() => setProductsOpen(true)}
                  onClick={() => setProductsOpen(false)}
                >
                  {item.label}
                  {item.badge && <span className="badge">{item.badge}</span>}
                  <svg className="nav-drop-chev" viewBox="0 0 20 20" width="14" height="14" aria-hidden="true">
                    <path d="M5 8l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <div className="nav-drop-menu" role="menu">
                  {products.map((product) => (
                    <a key={product.id} href={`#/product/${product.id}`} role="menuitem" onClick={closeMenu}>
                      <span className="drop-dot" style={{ background: product.color }} />
                      <span>
                        <strong>{product.name}</strong>
                        <small>{product.summary}</small>
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <a key={item.label} href={item.href} onClick={closeMenu}>
                {item.label}
                {item.badge && <span className="badge">{item.badge}</span>}
              </a>
            )
          )}
        </nav>

        <div className="nav-actions">
          <a className="btn btn-dark btn-small nav-cta" href="#contact" onClick={closeMenu}>
            Sign up
          </a>
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <div className="mobile-menu" id="mobile-menu">
          {navItems.map((item) => (
            <div key={item.label} className="mobile-group">
              <a href={item.href} onClick={closeMenu}>
                {item.label}
                {item.badge && <span className="badge">{item.badge}</span>}
              </a>
              {item.label === "Products" &&
                products.map((product) => (
                  <a key={product.id} className="mobile-sub" href={`#/product/${product.id}`} onClick={closeMenu}>
                    {product.name}
                  </a>
                ))}
            </div>
          ))}
          <a className="btn btn-dark" href="#contact" onClick={closeMenu}>Sign up</a>
        </div>
      </header>

      <main id="top">
        <section className="hero" ref={heroRef} onMouseMove={handleHeroMove}>
          <HeroArt />

          <div className="hero-inner">
            <h1>
              Grow your business real,
              <br />
              organic &amp; automatic.
            </h1>
            <p className="hero-sub">
              Sales, staff, stock and tasks, connected in one place so you spend less time
              switching screens and more time running the business.
            </p>

            <div className="hero-actions">
              <a className="btn btn-light" href="#contact">
                Try it for free <ArrowIcon />
              </a>
              <a className="btn btn-glass" href="#products">Explore products</a>
            </div>

            <ul className="hero-checks">
              <li><CheckIcon /> 7-day free trial</li>
              <li><CheckIcon /> No credit card required</li>
              <li><CheckIcon /> Cancel anytime</li>
            </ul>

          </div>

          <svg className="hero-wave" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 60 C 240 120, 480 0, 720 40 S 1200 110, 1440 50 L1440 120 L0 120 Z" />
          </svg>
        </section>

        <section className="logos" aria-label="Trusted by businesses">
          <p>Trusted by 10,000+ restaurants, retailers and service teams</p>
          <div className="logo-row">
            {partnerLogos.map((name) => (
              <span className="logo-chip" key={name}>{name}</span>
            ))}
          </div>
        </section>

        <section className="products" id="products" aria-labelledby="products-heading">
          <div className="section-head">
            <h2 id="products-heading">Our products</h2>
            <p>Each one works on its own or connects to the rest of the suite.</p>
          </div>

          <div className="showcase">
            <div className="rail" role="tablist" aria-orientation="vertical" aria-label="Products">
              {products.map((product, index) => {
                const selected = product.id === active.id;
                return (
                  <button
                    key={product.id}
                    ref={(el) => (tabRefs.current[product.id] = el)}
                    id={`tab-${product.id}`}
                    role="tab"
                    type="button"
                    aria-selected={selected}
                    aria-controls={`panel-${product.id}`}
                    tabIndex={selected ? 0 : -1}
                    className={`rail-item${selected ? " is-active" : ""}`}
                    onClick={() => setActiveId(product.id)}
                    onKeyDown={(event) => handleTabKey(event, index)}
                    style={{ "--item-color": product.color }}
                  >
                    <span className="rail-name">
                      {product.name}
                      {product.isNew && <span className="badge">New</span>}
                    </span>
                    <span className="rail-summary">{product.summary}</span>
                  </button>
                );
              })}
            </div>

            <div
              className="stage"
              role="tabpanel"
              id={`panel-${active.id}`}
              aria-labelledby={`tab-${active.id}`}
              key={active.id}
              style={{ "--stage-color": active.color }}
            >
              <div className="stage-art">
                <ProductArt product={active} />
              </div>
              <div className="stage-copy">
                <h3>{active.name}</h3>
                <p className="stage-desc">{active.description}</p>
                <ul className="feature-list">
                  {active.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <a className="btn btn-dark" href={`#/product/${active.id}`}>
                  View details <ArrowIcon />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="services" id="services" aria-labelledby="services-heading">
          <ParticleField />

          <div className="section-head centered">
            <h2 id="services-heading">Services that get you running fast</h2>
            <p>From setup to ongoing support, our team works alongside yours at every step.</p>
          </div>
          <div className="service-grid">
            {services.map((service) => (
              <article className="service-card" key={service.id}>
                <span className="service-icon">
                  <ServiceIcon name={service.icon} />
                </span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <a className="text-link" href="#contact">
                  Book this service <ArrowIcon />
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="industries" id="industries" aria-labelledby="industries-heading">
          <div className="section-head centered">
            <h2 id="industries-heading">Industries we serve</h2>
            <p>Grab any circle and drag it. The others move out of the way and settle again.</p>
          </div>
          <IndustriesBoard />
        </section>

        <section className="features" id="features" aria-labelledby="features-heading">
          <div className="section-head centered">
            <h2 id="features-heading">Bookkeeping that runs itself</h2>
            <p>Our tools handle the books, reports and forecasts, so you can focus on running the business.</p>
          </div>
          {featureRows.map((row, index) => (
            <div className={`feature-row${index % 2 === 1 ? " flip" : ""}`} key={row.id}>
              <div className="feature-art">
                <ProductArt product={row} />
              </div>
              <div className="feature-copy">
                <h3>{row.title}</h3>
                <p>{row.text}</p>
                <a className="text-link" href="#contact">
                  Learn more <ArrowIcon />
                </a>
              </div>
            </div>
          ))}
        </section>

        <section className="ai" aria-labelledby="ai-heading">
          <div className="ai-copy">
            <h2 id="ai-heading">An AI assistant for everyday decisions</h2>
            <p>Our models watch your numbers around the clock and point out what needs attention before it becomes a problem.</p>
            <ul className="check-list">
              {aiInsights.map((item) => (
                <li key={item}>
                  <CheckIcon /> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="ai-art">
            <ProductArt product={aiArt} />
          </div>
        </section>

        <Portfolio />

        <section className="why" id="why" aria-labelledby="why-heading">
          <div className="section-head centered">
            <h2 id="why-heading">Why teams choose us</h2>
            <p>Hover over a card to see what it means for your team.</p>
          </div>
          <div className="why-cards">
            {whyPoints.map((point, i) => (
              <article
                key={point.title}
                className="why-card"
                style={{ "--from": whyStyles[i].from, "--to": whyStyles[i].to }}
              >
                <div className="why-art">
                  <WhyIcon name={whyStyles[i].icon} />
                </div>
                <div className="why-panel">
                  <h3>{point.title}</h3>
                  <p>{point.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="team" id="team" aria-labelledby="team-heading">
          <div className="section-head centered">
            <h2 id="team-heading">The people behind your software</h2>
            <p>The team that builds, installs and supports your business every day.</p>
          </div>
          <div className="team-grid">
            {teamMembers.map((member) => (
              <article
                className="team-card"
                key={member.name}
                style={{ "--from": member.from, "--to": member.to }}
              >
                <div className="team-avatar" aria-hidden="true">{member.initials}</div>
                <h3>{member.name}</h3>
                <p className="team-role">{member.role}</p>
                <p className="team-bio">{member.bio}</p>
                <div className="team-social">
                  <a href="#team" aria-label={`${member.name} on LinkedIn`}>in</a>
                  <a href="#team" aria-label={`${member.name} on X`}>x</a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="security" aria-labelledby="security-heading">
          <div className="sec-grid">
            <div className="sec-visual" aria-hidden="true">
              <div className="sec-ring sec-ring-1" />
              <div className="sec-ring sec-ring-2" />
              <div className="sec-ring sec-ring-3" />
              <div className="sec-core">
                <svg viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </div>
              <span className="sec-chip chip-a">Encrypted data</span>
              <span className="sec-chip chip-b">Role-based access</span>
              <span className="sec-chip chip-c">
                <i className="sec-live" /> All systems operational
              </span>
            </div>

            <div className="sec-content">
              <span className="rv-eyebrow">Security</span>
              <h2 id="security-heading">Security you don&apos;t have to think about</h2>
              <p>Your financial data is protected with bank-grade standards from the first day.</p>
              <ol className="sec-list">
                {securityPoints.map((point, i) => (
                  <li key={point.title} className="sec-row">
                    <span className="sec-row-icon">
                      <SecIcon name={["lock", "users", "pulse"][i]} />
                    </span>
                    <div>
                      <h3>{point.title}</h3>
                      <p>{point.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="pricing" id="pricing" aria-labelledby="pricing-heading">
          <div className="section-head centered">
            <h2 id="pricing-heading">Simple, transparent pricing</h2>
            <p>Pick a plan for where you are today, and change it as you grow.</p>
          </div>
          <div className="plan-grid">
            {pricingPlans.map((plan) => (
              <article key={plan.name} className={`plan${plan.popular ? " is-popular" : ""}`}>
                {plan.popular && <span className="plan-flag">Most popular</span>}
                <h3>{plan.name}</h3>
                <p className="plan-blurb">{plan.blurb}</p>
                <p className="plan-price">
                  {plan.price}
                  {plan.period && <span>{plan.period}</span>}
                </p>
                <ul>
                  {plan.features.map((feature) => (
                    <li key={feature}>
                      <CheckIcon /> {feature}
                    </li>
                  ))}
                </ul>
                <a className={`btn ${plan.popular ? "btn-light" : "btn-dark"} btn-full`} href="#contact">
                  {plan.cta}
                </a>
              </article>
            ))}
          </div>
        </section>

        <ReviewWall />

        <section className="faq" id="faq" aria-labelledby="faq-heading">
          <div className="faq-intro">
            <h2 id="faq-heading">Frequently asked questions</h2>
            <p>
              Can&apos;t find what you need? <a href="#contact">Talk to our team.</a>
            </p>
          </div>
          <div className="faq-list">
            {faqs.map((item) => (
              <details key={item.q} className="faq-item">
                <summary>
                  {item.q}
                  <span className="faq-icon" aria-hidden="true" />
                </summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="contact" id="contact" aria-labelledby="contact-heading">
          <div className="contact-intro">
            <h2 id="contact-heading">Book a 15-minute demo</h2>
            <p>Tell us a little about your business and we will show you the parts that matter to you.</p>
            <a className="contact-line" href="mailto:hello@example.com">hello@example.com</a>
            <a className="contact-line" href="tel:+910000000000">+91 00000 00000</a>
          </div>

          {submitted ? (
            <div className="thanks" role="status">
              <h3>Thanks, we have your details.</h3>
              <p>Someone from the team will reach out within one working day.</p>
            </div>
          ) : (
            <form className="demo-form" onSubmit={handleDemoSubmit}>
              <label>
                Name
                <input type="text" name="name" required autoComplete="name" />
              </label>
              <label>
                Work email
                <input type="email" name="email" required autoComplete="email" />
              </label>
              <label>
                Phone
                <input type="tel" name="phone" autoComplete="tel" />
              </label>
              <label>
                Business name
                <input type="text" name="business" />
              </label>
              <label>
                Product you are interested in
                <select name="product" defaultValue={products[0].id}>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                  <option value="not-sure">Not sure yet</option>
                </select>
              </label>
              <button type="submit" className="btn btn-light btn-full">Request demo</button>
            </form>
          )}
        </section>
      </main>

      <footer className="site-footer">
        <div className="sf-top">
          <div className="sf-brand">
            <a className="brand" href="#top" aria-label="SaaSio home">
              <span className="brand-mark" aria-hidden="true" />
              SaaSio
            </a>
            <p>Business software that keeps your outlets, staff and books in sync, from the first sale to the year end.</p>
            <div className="sf-social">
              <a href="#top" aria-label="LinkedIn">in</a>
              <a href="#top" aria-label="X">X</a>
              <a href="#top" aria-label="Instagram">IG</a>
              <a href="#top" aria-label="YouTube">YT</a>
            </div>
          </div>

          <div className="sf-col">
            <h4>Products</h4>
            <ul>
              {products.map((product) => (
                <li key={product.id}>
                  <a href={`#/product/${product.id}`}>{product.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="sf-col">
            <h4>Company</h4>
            <ul>
              <li><a href="#services">Services</a></li>
              <li><a href="#portfolio">Portfolio</a></li>
              <li><a href="#team">Team</a></li>
              <li><a href="#pricing">Pricing</a></li>
            </ul>
          </div>

          <div className="sf-col">
            <h4>Contact</h4>
            <ul className="sf-contact">
              <li><a href="mailto:hello@example.com">hello@example.com</a></li>
              <li><a href="tel:+910000000000">+91 00000 00000</a></li>
              <li>Mon to Sat, 9am to 7pm</li>
              <li>Your street address, City, State</li>
            </ul>
          </div>
        </div>

        <div className="sf-bottom">
          <span>© {new Date().getFullYear()} SaaSio. All rights reserved.</span>
          <span className="sf-legal">
            <a href="#privacy">Privacy</a>
            <a href="#terms">Terms</a>
            <a href="#cookies">Cookies</a>
          </span>
        </div>
      </footer>
    </div>
  );
}

/* ------------------------------------------------------------------
   PRODUCT DETAIL PAGES — route #/product/<id>. Content per product:
   pricing base, rating, stats, feature groups, built-for, add-ons,
   featured highlights and reviews.
   ------------------------------------------------------------------ */
const productPages = {
  orderly: {
    base: 1499,
    rating: 4.8,
    reviewCount: 1240,
    breakdown: [82, 13, 3, 1, 1],
    headline: "Restaurant POS made simple.",
    description: "Take orders at the table, send tickets to the kitchen and close bills in three clicks, with every outlet synced in real time.",
    stats: [
      { v: "1,000+", l: "outlets live" },
      { v: "3 clicks", l: "to punch a bill" },
      { v: "99.9%", l: "uptime" },
      { v: "2 min", l: "to take a full order" },
    ],
    featureGroups: [
      { group: "Ordering", items: ["Table and floor layout", "Table-side ordering on tablets", "Split bills and merge tables", "Discounts and coupons"] },
      { group: "Kitchen", items: ["Kitchen display tickets", "Course-wise firing", "Order status for each station"] },
      { group: "Billing and payments", items: ["GST-ready invoices", "Card, UPI and cash payments", "Print and email receipts"] },
      { group: "Works offline", items: ["Offline order sync", "Local printing during outages", "Automatic cloud backup"] },
    ],
    featured: [
      { title: "Fast billing", text: "Punch, split and print a bill in under a minute." },
      { title: "Live sales", text: "See each outlet's sales as soon as an order is paid." },
      { title: "Built to scale", text: "Add outlets and staff without changing your setup." },
    ],
    builtFor: ["Cafés", "Restaurants", "Bars", "Bakeries", "Cloud kitchens", "Food courts"],
    addons: [
      { name: "Kitchen Display", price: 399, text: "Send orders to a screen at each station." },
      { name: "Table QR Ordering", price: 499, text: "Guests order and pay from their phones." },
      { name: "Loyalty Program", price: 299, text: "Points and rewards for repeat customers." },
      { name: "SMS Notifications", price: 199, text: "Order updates and offers by SMS." },
    ],
    reviews: [
      { quote: "Table turns went up within the first week. Staff learned the screens in one shift.", name: "Priya Sharma", role: "Owner, Spice Route Kitchens" },
      { quote: "Billing used to be the slowest part of service. Now it is the fastest.", name: "Karan Singh", role: "Owner, Biryani House" },
    ],
  },
  ledgerly: {
    base: 999,
    rating: 4.7,
    reviewCount: 860,
    breakdown: [76, 17, 4, 2, 1],
    headline: "Billing and books that stay current.",
    description: "Create compliant invoices in seconds, track stock as it moves and see profit and loss without waiting for month end.",
    stats: [
      { v: "5 days", l: "saved every month" },
      { v: "100%", l: "GST-compliant bills" },
      { v: "Live", l: "stock and cash reports" },
      { v: "3 min", l: "to send an invoice" },
    ],
    featureGroups: [
      { group: "Invoicing", items: ["GST-compliant invoices", "Recurring invoices", "Payment reminders", "Multi-currency billing"] },
      { group: "Inventory", items: ["Live stock tracking", "Low-stock alerts", "Batch and expiry dates"] },
      { group: "Reports", items: ["Profit and loss summary", "Cash flow overview", "Export to accountant tools"] },
      { group: "Compliance", items: ["Audit trail on every change", "Role-based access", "Automatic tax summaries"] },
    ],
    featured: [
      { title: "Compliant by default", text: "Tax breakdowns and invoice numbering are handled for you." },
      { title: "Stock that matches sales", text: "Every sale updates stock, so counts stay accurate." },
      { title: "Accountant ready", text: "Export clean reports in the format your accountant uses." },
    ],
    builtFor: ["Retail stores", "Wholesale", "Pharmacies", "Grocery", "Services", "E-commerce"],
    addons: [
      { name: "Multi-currency", price: 299, text: "Bill and report in more than one currency." },
      { name: "E-invoicing", price: 399, text: "Send e-invoices straight to the tax portal." },
      { name: "Bank sync", price: 349, text: "Match payments with bank statements automatically." },
      { name: "Payment reminders", price: 149, text: "Automatic reminders for overdue invoices." },
    ],
    reviews: [
      { quote: "We closed the books in two days instead of two weeks. The stock reports are the best part.", name: "Ananya Iyer", role: "Founder, Cafe Lumiere" },
      { quote: "Invoices look professional and tax is calculated correctly every time.", name: "Rahul Mehta", role: "Operations Lead, Urban Bites" },
    ],
  },
  rosterly: {
    base: 1199,
    rating: 4.9,
    reviewCount: 730,
    breakdown: [88, 9, 2, 1, 0],
    headline: "Attendance and payroll, without spreadsheets.",
    description: "Connect biometric punches to payroll. Shifts, leave balances and salary runs update automatically, with payslips sent by email.",
    stats: [
      { v: "2 days", l: "saved each pay cycle" },
      { v: "0", l: "manual salary errors" },
      { v: "Real time", l: "attendance feed" },
      { v: "120+", l: "staff on one system" },
    ],
    featureGroups: [
      { group: "Attendance", items: ["Biometric punch integration", "Geo-fenced check-in", "Late and overtime alerts"] },
      { group: "Leave", items: ["Custom leave policies", "Balance tracking", "Approval workflow"] },
      { group: "Payroll", items: ["Automated salary runs", "Statutory deductions", "Payslips by email"] },
      { group: "Compliance", items: ["Statutory filing reports", "Full audit history", "Secure document storage"] },
    ],
    featured: [
      { title: "Punch to payslip", text: "Attendance flows into payroll with no manual step." },
      { title: "Fewer errors", text: "Rules are applied the same way for every employee." },
      { title: "Self-service", text: "Staff check leave balances and payslips from their phones." },
    ],
    builtFor: ["Restaurants", "Hotels", "Retail", "Healthcare", "Logistics", "Manufacturing"],
    addons: [
      { name: "Biometric devices", price: 599, text: "Fingerprint or face readers for each outlet." },
      { name: "Geo attendance", price: 249, text: "Check in only from approved locations." },
      { name: "Advance salary", price: 199, text: "Approve and track salary advances." },
      { name: "Shift planner", price: 299, text: "Build rosters and share them with the team." },
    ],
    reviews: [
      { quote: "Payroll that used to take us two days a month now runs itself every time.", name: "Meera Nair", role: "Manager, Quickfix Services" },
      { quote: "The attendance data is accurate, and leave requests no longer get lost.", name: "Dev Patel", role: "Implementation Manager" },
    ],
  },
  taskflow: {
    base: 799,
    rating: 4.6,
    reviewCount: 510,
    breakdown: [71, 19, 6, 3, 1],
    headline: "Daily work, checked and done.",
    description: "Give each team member a checklist for their shift. Supervisors verify completion with photos and get reports they can share.",
    stats: [
      { v: "40%", l: "fewer missed tasks" },
      { v: "Photo", l: "proof on every task" },
      { v: "1 tap", l: "to mark a task done" },
      { v: "24/7", l: "team visibility" },
    ],
    featureGroups: [
      { group: "Tasks", items: ["Recurring task templates", "Shift-based checklists", "Due time reminders"] },
      { group: "Verification", items: ["Photo proof of work", "Supervisor sign-off", "Re-open and comment"] },
      { group: "Reports", items: ["Completion by shift", "Downloadable PDF reports", "Weekly summaries"] },
      { group: "Team", items: ["Roles and permissions", "Team chat on each task", "Multi-outlet view"] },
    ],
    featured: [
      { title: "Checklists that repeat", text: "Opening and closing routines are set once and reused." },
      { title: "Proof, not promises", text: "Photos and sign-offs show exactly what was done." },
      { title: "Reports in one tap", text: "Share a clean summary with owners and auditors." },
    ],
    builtFor: ["Restaurants", "Gyms", "Salons and spas", "Hotels", "Cinemas", "Event venues"],
    addons: [
      { name: "Photo proof", price: 149, text: "Require a photo before a task can be closed." },
      { name: "Checklist library", price: 199, text: "Ready-made routines for common formats." },
      { name: "WhatsApp alerts", price: 249, text: "Send task reminders and escalations on WhatsApp." },
      { name: "Owner dashboard", price: 299, text: "See completion across every outlet." },
    ],
    reviews: [
      { quote: "Opening checks used to be a phone call. Now every shift starts with a complete checklist.", name: "Sana Qureshi", role: "Customer Success Lead" },
      { quote: "The photo proof settled a lot of arguments. Supervisors trust the reports now.", name: "Ishita Verma", role: "Design Lead" },
    ],
  },
};

const chipColors = ["#E8553D", "#1F7A6D", "#4B5BD6", "#C98A12", "#7B3FE4", "#FF2D75"];

function ProductDetail({ product }) {
  const d = productPages[product.id];
  const [enabled, setEnabled] = useState({});
  const [demoSent, setDemoSent] = useState(false);

  const addonTotal = d.addons.reduce((sum, addon, i) => sum + (enabled[i] ? addon.price : 0), 0);
  const total = d.base + addonTotal;

  const count = products.length;
  const index = products.findIndex((p) => p.id === product.id);
  const prevProduct = products[(index - 1 + count) % count];
  const nextProduct = products[(index + 1) % count];

  const scrollToId = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  const toggleAddon = (i) => setEnabled((current) => ({ ...current, [i]: !current[i] }));

  return (
    <div className="page pd pdp">
      <style>{styles}</style>

      <header className="pd-top">
        <a className="brand" href="#top" aria-label="SaaSio home">
          <span className="brand-mark" aria-hidden="true" />
          SaaSio
        </a>
        <div className="pdp-top-actions">
          <a className="pd-back-top" href="#products">All products</a>
          <button type="button" className="btn btn-dark btn-small" onClick={() => scrollToId("pdp-demo")}>
            Book a Free Demo
          </button>
        </div>
      </header>

      <main>
        <section className="pd-hero">
          <div className="pd-hero-text">
            <a className="pd-back" href="#products">← Back to products</a>
            <span className="pf-cat pdp-tag" style={{ background: product.color, color: "#FFFFFF" }}>{product.name}</span>
            <h1>{d.headline}</h1>
            <p className="pd-summary">{d.description}</p>

            <div className="pdp-rate">
              <strong>{d.rating}</strong>
              <div>
                <StarRow />
                <small>{d.reviewCount.toLocaleString("en-IN")} ratings</small>
              </div>
            </div>

            <div className="pdp-cta">
              <button type="button" className="btn btn-dark" onClick={() => scrollToId("pdp-demo")}>
                Book a Free Demo <ArrowIcon />
              </button>
              <button type="button" className="pdp-ghost" onClick={() => scrollToId("pdp-features")}>
                See all features
              </button>
            </div>
          </div>
          <div className="pdp-media">
            <ProductArt product={product} />
          </div>
        </section>

        <section className="pdp-stats" aria-label="Key statistics">
          {d.stats.map((stat) => (
            <div key={stat.l}>
              <strong>{stat.v}</strong>
              <span>{stat.l}</span>
            </div>
          ))}
        </section>

        <section className="pdp-section pdp-features" id="pdp-features" aria-labelledby="pdp-features-heading">
          <div className="pdp-head">
            <span className="rv-eyebrow">Features</span>
            <h2 id="pdp-features-heading">Everything {product.name} does</h2>
          </div>
          <div className="pdp-feat-layout">
            <nav className="pdp-feat-nav" aria-label="Feature groups">
              {d.featureGroups.map((group, i) => (
                <button key={group.group} type="button" onClick={() => scrollToId(`pdp-g-${i}`)}>
                  {group.group}
                  <span>{group.items.length}</span>
                </button>
              ))}
            </nav>
            <div className="pdp-groups">
              {d.featureGroups.map((group, i) => (
                <article key={group.group} id={`pdp-g-${i}`} className="pdp-group">
                  <h3>
                    <i style={{ background: product.color }} aria-hidden="true" />
                    {group.group}
                  </h3>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>
                        <CheckIcon />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="pdp-section pdp-featured" aria-labelledby="pdp-featured-heading">
          <div className="pdp-head">
            <span className="rv-eyebrow">Featured</span>
            <h2 id="pdp-featured-heading">Highlights you will use daily</h2>
          </div>
          <div className="pdp-featured-list">
            {d.featured.map((item) => (
              <article key={item.title} style={{ "--c": product.color }}>
                <span className="pdp-featured-icon">
                  <WhyIcon name="bolt" />
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="pdp-section pdp-built" aria-labelledby="pdp-built-heading">
          <div className="pdp-head">
            <span className="rv-eyebrow">Built for</span>
            <h2 id="pdp-built-heading">Who uses {product.name}</h2>
          </div>
          <div className="pdp-chips">
            {d.builtFor.map((name, i) => (
              <span key={name} className="pdp-chip">
                <i style={{ background: chipColors[i % chipColors.length] }} aria-hidden="true" />
                {name}
              </span>
            ))}
          </div>
        </section>

        <section className="pdp-section pdp-addons" aria-labelledby="pdp-addons-heading">
          <div className="pdp-head">
            <span className="rv-eyebrow">Add-ons</span>
            <h2 id="pdp-addons-heading">Extend your plan</h2>
            <p>Switch on what you need. The monthly total updates as you go.</p>
          </div>
          <div className="pdp-addon-grid">
            {d.addons.map((addon, i) => (
              <label key={addon.name} className={`pdp-addon${enabled[i] ? " is-on" : ""}`}>
                <input type="checkbox" checked={!!enabled[i]} onChange={() => toggleAddon(i)} />
                <span className="pdp-addon-body">
                  <strong>{addon.name}</strong>
                  <small>{addon.text}</small>
                </span>
                <span className="pdp-addon-price">
                  +₹{addon.price}
                  <em>/mo</em>
                </span>
                <span className="pdp-switch" aria-hidden="true" />
              </label>
            ))}
          </div>
          <div className="pdp-total">
            <div>
              <span>Base plan</span>
              <strong>₹{d.base}</strong>
            </div>
            <div>
              <span>Add-ons</span>
              <strong>₹{addonTotal}</strong>
            </div>
            <div className="is-total">
              <span>Monthly total</span>
              <strong>₹{total}</strong>
            </div>
          </div>
        </section>

        <section className="pdp-section pdp-ratings" aria-labelledby="pdp-ratings-heading">
          <div className="pdp-head">
            <span className="rv-eyebrow">Reviews</span>
            <h2 id="pdp-ratings-heading">Ratings from {product.name} users</h2>
          </div>
          <div className="pdp-ratings-grid">
            <div className="pdp-rating-sum">
              <div className="pdp-big">
                <strong>{d.rating}</strong>
                <StarRow />
                <small>from {d.reviewCount.toLocaleString("en-IN")} ratings</small>
              </div>
              <ul className="pdp-bars">
                {[5, 4, 3, 2, 1].map((star, i) => (
                  <li key={star}>
                    <span>{star} star</span>
                    <div className="pdp-bar">
                      <i style={{ width: `${d.breakdown[i]}%` }} />
                    </div>
                    <em>{d.breakdown[i]}%</em>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pdp-review-list">
              {d.reviews.map((review) => (
                <figure key={review.name} className="pdp-review">
                  <StarRow />
                  <blockquote>“{review.quote}”</blockquote>
                  <figcaption>
                    <strong>{review.name}</strong>
                    <small>{review.role}</small>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="pdp-demo" id="pdp-demo" aria-labelledby="pdp-demo-heading">
          <div className="pdp-demo-copy">
            <h2 id="pdp-demo-heading">Book a Free Demo</h2>
            <p>Get a 15-minute walkthrough of {product.name} tailored to your business. No commitment.</p>
            <ul>
              {["Setup in one visit", "Data migration help", "Training for your team"].map((point) => (
                <li key={point}>
                  <CheckIcon />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {demoSent ? (
            <div className="pdp-thanks" role="status">
              <h3>Thanks, we have your request.</h3>
              <p>Our team will call you within one working day to book your demo.</p>
            </div>
          ) : (
            <form
              className="pdp-form"
              onSubmit={(event) => {
                event.preventDefault();
                setDemoSent(true);
              }}
            >
              <label>
                Name
                <input type="text" name="name" required autoComplete="name" />
              </label>
              <label>
                Phone
                <input type="tel" name="phone" required autoComplete="tel" />
              </label>
              <label>
                Email
                <input type="email" name="email" autoComplete="email" />
              </label>
              <label>
                Business type
                <select name="type" defaultValue={d.builtFor[0]}>
                  {d.builtFor.map((name) => (
                    <option key={name}>{name}</option>
                  ))}
                </select>
              </label>
              <button type="submit" className="btn btn-light btn-full">Book a Free Demo</button>
            </form>
          )}
        </section>

        <nav className="pd-pager" aria-label="Product navigation">
          <a className="pd-pager-side is-prev" href={`#/product/${prevProduct.id}`}>
            <span className="pd-arrow" aria-hidden="true">←</span>
            <span>
              <small>Previous product</small>
              <strong>{prevProduct.name}</strong>
            </span>
          </a>

          <a className="pd-pager-center" href="#products" aria-label="Back to all products">
            <span className="pd-circle">
              <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                <rect x="4" y="4" width="6" height="6" rx="1.5" />
                <rect x="14" y="4" width="6" height="6" rx="1.5" />
                <rect x="4" y="14" width="6" height="6" rx="1.5" />
                <rect x="14" y="14" width="6" height="6" rx="1.5" />
              </svg>
            </span>
            <small>All products</small>
          </a>

          <a className="pd-pager-side is-next" href={`#/product/${nextProduct.id}`}>
            <span>
              <small>Next product</small>
              <strong>{nextProduct.name}</strong>
            </span>
            <span className="pd-arrow" aria-hidden="true">→</span>
          </a>
        </nav>
      </main>

      <footer className="pd-foot">© {new Date().getFullYear()} SaaSio. All rights reserved.</footer>
    </div>
  );
}

export default function App() {
  const hash = useHashRoute();
  const isProjectRoute = hash.startsWith("#/portfolio/");
  const projectId = isProjectRoute ? hash.slice("#/portfolio/".length) : "";
  const project = portfolioProjects.find((p) => p.id === projectId);
  const isProductRoute = hash.startsWith("#/product/");
  const productId = isProductRoute ? hash.slice("#/product/".length) : "";
  const product = products.find((p) => p.id === productId);

  useEffect(() => {
    if (hash.startsWith("#/")) {
      window.scrollTo({ top: 0 });
      return;
    }
    // Section links on the home page (#products, #portfolio, ...) scroll to their section.
    if (hash.length > 1) {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [hash, isProjectRoute]);

  if (isProjectRoute && project) return <PortfolioDetail project={project} />;
  if (isProductRoute && product) return <ProductDetail product={product} />;
  return <LandingPage />;
}

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');

:root {
  --ink: #141B33;
  --ink-soft: #5A6378;
  --paper: #F5F6FB;
  --surface: #FFFFFF;
  --line: #E1E4EE;
  --font: 'Outfit', 'Segoe UI', Roboto, Arial, sans-serif;
  --ease: cubic-bezier(.2,.7,.2,1);
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; scroll-padding-top: 90px; }
body { margin: 0; background: var(--paper); color: var(--ink); font-family: var(--font); -webkit-font-smoothing: antialiased; }
.page { min-height: 100vh; overflow-x: hidden; }
a { color: inherit; }
img { max-width: 100%; }
:focus-visible { outline: 3px solid #FFFFFF; outline-offset: 3px; border-radius: 6px; }
.products :focus-visible, .why :focus-visible, .footer :focus-visible { outline-color: var(--ink); }

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation: none !important; transition: none !important; }
}

/* ---------- Buttons ---------- */
.btn {
  position: relative; display: inline-flex; align-items: center; justify-content: center; gap: 10px;
  padding: 15px 28px; border-radius: 999px; border: 0; cursor: pointer;
  font: 600 16px/1 var(--font); text-decoration: none; white-space: nowrap;
  transition: transform .25s var(--ease), box-shadow .25s var(--ease), background-color .25s, color .25s;
}
.btn:hover { transform: translateY(-3px); }
.btn:active { transform: translateY(0) scale(.98); }
.btn .arrow { transition: transform .25s var(--ease); }
.btn:hover .arrow { transform: translateX(4px); }
.btn-light { background: #FFFFFF; color: var(--ink); box-shadow: 0 10px 30px rgba(20,27,51,.18); }
.btn-light:hover { box-shadow: 0 16px 40px rgba(20,27,51,.28); }
.btn-dark { background: var(--ink); color: #FFFFFF; box-shadow: 0 10px 24px rgba(20,27,51,.18); }
.btn-dark:hover { background: #26305A; box-shadow: 0 16px 34px rgba(20,27,51,.3); }
.btn-glass { background: rgba(255,255,255,.12); color: #FFFFFF; backdrop-filter: blur(10px); box-shadow: inset 0 0 0 1.5px rgba(255,255,255,.7); }
.btn-glass:hover { background: #FFFFFF; color: var(--ink); }
.btn-small { padding: 11px 20px; font-size: 15px; }
.btn-full { width: 100%; }

/* ---------- Header ---------- */
.nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 50;
  display: flex; align-items: center; justify-content: space-between; gap: 24px;
  padding: 18px clamp(20px, 5vw, 80px);
  color: #FFFFFF; transition: background-color .3s, box-shadow .3s, padding .3s, color .3s;
}
.nav.is-scrolled {
  background: rgba(20,27,51,.72); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
  padding-block: 12px; box-shadow: 0 8px 30px rgba(0,0,0,.12);
}
.brand { display: flex; align-items: center; gap: 10px; font-weight: 800; font-size: 24px; text-decoration: none; letter-spacing: -0.02em; }
.brand-mark { width: 26px; height: 26px; border-radius: 8px; background: #FFFFFF; position: relative; transition: transform .4s var(--ease); }
.brand-mark::after { content: ""; position: absolute; right: -3px; bottom: -3px; width: 9px; height: 9px; border-radius: 50%; background: #FF8A1F; }
.brand:hover .brand-mark { transform: rotate(-12deg) scale(1.08); }

.nav-links { display: flex; gap: clamp(18px, 2.6vw, 38px); font-weight: 600; font-size: 16px; }
.nav-links a, .mobile-menu a { position: relative; text-decoration: none; padding: 6px 0; }
.nav-links a::after, .mobile-menu a::after {
  content: ""; position: absolute; left: 0; bottom: 0; height: 2px; width: 100%;
  background: currentColor; transform: scaleX(0); transform-origin: right; transition: transform .3s var(--ease);
}
.nav-links a:hover::after, .nav-links a:focus-visible::after { transform: scaleX(1); transform-origin: left; }

.badge {
  display: inline-block; margin-left: 6px; padding: 2px 6px; border-radius: 4px;
  background: #FF1E1E; color: #FFFFFF; font-size: 10px; font-weight: 700; letter-spacing: .02em; vertical-align: middle;
}
.nav-actions { display: flex; align-items: center; gap: 12px; }
.nav-cta { background: #1F2A52; }
.nav-cta:hover { background: #2C3B6E; }
.menu-toggle { display: none; width: 44px; height: 44px; border: 0; border-radius: 12px; background: rgba(255,255,255,.14); cursor: pointer; flex-direction: column; justify-content: center; align-items: center; gap: 5px; }
.menu-toggle span { display: block; width: 20px; height: 2px; border-radius: 2px; background: #FFFFFF; transition: transform .3s var(--ease), opacity .3s; }
.nav.is-open .menu-toggle span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.nav.is-open .menu-toggle span:nth-child(2) { opacity: 0; }
.nav.is-open .menu-toggle span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
.mobile-menu { display: none; }

/* ---------- Hero ---------- */
.hero {
  --mx: 0; --my: 0;
  position: relative; isolation: isolate; overflow: hidden;
  min-height: auto;
  display: flex; flex-direction: column; justify-content: center;
  padding: clamp(110px, 13vh, 140px) clamp(20px, 5vw, 80px) clamp(90px, 9vw, 120px);
  background:
    radial-gradient(1200px 700px at 85% -10%, #3DE5FF 0%, transparent 60%),
    radial-gradient(900px 600px at 10% 10%, #A9C8FF 0%, transparent 60%),
    radial-gradient(800px 700px at 50% 60%, #FF3C7F 0%, transparent 65%),
    linear-gradient(115deg, #2F6BFF 0%, #6F45E8 34%, #E63E9C 66%, #FF8A2B 100%);
  color: #FFFFFF;
}
.hero-inner { position: relative; z-index: 2; text-align: center; max-width: 980px; margin: 0 auto; }
.hero h1 {
  margin: 0; font-weight: 800; font-size: clamp(38px, 6.2vw, 80px); line-height: 1.04; letter-spacing: -0.035em;
  text-shadow: 0 4px 30px rgba(40,10,80,.18);
  animation: rise .9s var(--ease) both;
}
.hero-sub {
  margin: 26px auto 38px; max-width: 58ch; font-size: clamp(16px, 1.7vw, 19px); line-height: 1.6; color: rgba(255,255,255,.92);
  animation: rise .9s .1s var(--ease) both;
}
.hero-actions { display: flex; justify-content: center; flex-wrap: wrap; gap: 14px; animation: rise .9s .2s var(--ease) both; }
.hero-checks {
  display: flex; justify-content: center; flex-wrap: wrap; gap: 14px 32px;
  margin: 34px 0 0; padding: 0; list-style: none; font-size: 15px; font-weight: 500;
  animation: rise .9s .3s var(--ease) both;
}
.hero-checks li { display: inline-flex; align-items: center; gap: 8px; }
.hero-checks svg { color: #FFFFFF; background: rgba(255,255,255,.2); border-radius: 50%; padding: 3px; width: 20px; height: 20px; }

@keyframes rise { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }

/* Hero abstract art */
.hero-art { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
.blob { position: absolute; border-radius: 50%; filter: blur(60px); opacity: .7; transition: transform .6s var(--ease); }
.blob-a { width: 42vw; height: 42vw; min-width: 280px; min-height: 280px; left: -10vw; top: 10%; background: #66E7FF; transform: translate(calc(var(--mx) * -30px), calc(var(--my) * -30px)); }
.blob-b { width: 36vw; height: 36vw; min-width: 240px; min-height: 240px; right: -8vw; top: 0; background: #FF6BB0; transform: translate(calc(var(--mx) * 26px), calc(var(--my) * 26px)); }
.blob-c { width: 30vw; height: 30vw; min-width: 200px; min-height: 200px; left: 35%; bottom: -10%; background: #FFB14A; opacity: .45; transform: translate(calc(var(--mx) * 18px), calc(var(--my) * 18px)); }
.swoosh { position: absolute; inset: 0; width: 100%; height: 100%; }
.swoosh path { fill: none; stroke: rgba(255,255,255,.22); stroke-width: 2; vector-effect: non-scaling-stroke; }
.swoosh path:nth-child(2) { stroke: rgba(255,255,255,.14); }
.swoosh path:nth-child(3) { stroke: rgba(255,255,255,.1); }
.dots {
  position: absolute; width: 180px; height: 180px; opacity: .35;
  background-image: radial-gradient(rgba(255,255,255,.9) 2px, transparent 2.4px);
  background-size: 16px 16px;
  -webkit-mask-image: radial-gradient(circle, #000 30%, transparent 70%); mask-image: radial-gradient(circle, #000 30%, transparent 70%);
}
.dots-left { left: 4%; bottom: 22%; width: 26vw; height: 26vw; min-width: 160px; min-height: 160px; opacity: .25; }
.dots-right { right: 6%; top: 16%; width: 150px; height: 150px; opacity: .45; transition: transform .6s var(--ease); }
.hero:hover .dots-right { transform: translate(calc(var(--mx) * 14px), calc(var(--my) * 14px)); }
.play-row { position: absolute; left: 8%; top: 52%; display: flex; gap: 8px; color: rgba(255,255,255,.55); }
.ring { position: absolute; border-radius: 50%; border: 2px solid rgba(255,255,255,.25); }
.ring-a { width: 120px; height: 120px; right: 12%; top: 58%; }
.ring-b { width: 56px; height: 56px; left: 18%; top: 22%; border-style: dashed; animation: spin 26s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

/* Floating product cards */
.hero-cards { position: relative; margin-top: clamp(48px, 7vw, 84px); height: clamp(190px, 26vw, 280px); }
.float-card {
  position: absolute; border-radius: 22px; background: rgba(255,255,255,.96); color: var(--ink);
  box-shadow: 0 30px 60px rgba(20,27,51,.25); text-align: left;
  transition: transform .5s var(--ease), box-shadow .5s var(--ease);
  animation: bob 7s ease-in-out infinite;
}
.float-card:hover { box-shadow: 0 40px 80px rgba(20,27,51,.32); }
.card-main { left: 50%; bottom: 0; transform: translateX(-62%); width: min(380px, 62%); padding: 22px; animation-delay: 0s; }
.card-side { left: 50%; bottom: 36%; transform: translateX(-10%); width: min(230px, 40%); padding: 20px 22px; animation-delay: -3s; }
.card-main:hover { transform: translateX(-62%) translateY(-8px) scale(1.02); }
.card-side:hover { transform: translateX(-10%) translateY(-8px) scale(1.03); }
@keyframes bob { 0%,100% { margin-top: 0; } 50% { margin-top: -10px; } }

.card-head { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
.card-head strong, .card-head small { display: block; }
.card-head small { color: var(--ink-soft); font-size: 13px; margin-top: 2px; }
.avatar { width: 44px; height: 44px; border-radius: 14px; display: grid; place-items: center; background: linear-gradient(120deg, #1E5BFF, #FF2D75); color: #FFFFFF; font-weight: 800; font-size: 18px; flex-shrink: 0; }
.mini-chart { width: 100%; height: auto; display: block; }
.mini-chart rect { transition: opacity .3s; }
.mini-chart rect:hover { opacity: .75; }
.side-row { display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--ink-soft); font-weight: 600; }
.dot-live { width: 9px; height: 9px; border-radius: 50%; background: #FF2D55; box-shadow: 0 0 0 4px rgba(255,45,85,.2); }
.big-num { display: block; margin-top: 6px; font-size: clamp(20px, 2.2vw, 26px); letter-spacing: -0.02em; }
.card-side small { color: var(--ink-soft); font-size: 13px; }

.hero-wave { position: absolute; left: 0; bottom: -1px; width: 100%; height: clamp(50px, 7vw, 110px); z-index: 1; }
.hero-wave path { fill: var(--paper); }

@media (max-width: 760px) {
  .hero-cards { height: auto; display: grid; gap: 16px; margin-top: 44px; }
  .float-card, .card-main, .card-side { position: relative; left: auto; bottom: auto; transform: none; width: 100%; animation: none; }
  .card-main:hover, .card-side:hover { transform: translateY(-4px); }
  .card-side { max-width: 280px; margin: 0 auto; }
}

/* ---------- Products ---------- */
.products {
  position: relative; z-index: 2;
  padding: clamp(64px, 9vw, 110px) clamp(20px, 5vw, 80px);
}
.section-head { max-width: 640px; margin-bottom: 52px; }
.section-head h2, .why h2 {
  margin: 0 0 14px; font-weight: 800; font-size: clamp(32px, 4.6vw, 54px); letter-spacing: -0.03em; line-height: 1.08;
}
.section-head p { margin: 0; color: var(--ink-soft); font-size: 18px; line-height: 1.55; }

.showcase { display: grid; grid-template-columns: minmax(260px, 340px) 1fr; gap: clamp(24px, 4vw, 56px); align-items: start; }
.rail { display: flex; flex-direction: column; gap: 8px; }
.rail-item {
  display: flex; flex-direction: column; gap: 6px; text-align: left; font: inherit; color: var(--ink);
  padding: 18px 20px; border: 0; border-radius: 16px; background: transparent; cursor: pointer;
  border-left: 4px solid transparent;
  transition: background-color .25s, border-color .25s, transform .3s var(--ease), box-shadow .3s;
}
.rail-item:hover { background: #FFFFFF; transform: translateX(6px); box-shadow: 0 12px 30px rgba(20,27,51,.08); }
.rail-item.is-active { background: #FFFFFF; border-left-color: var(--item-color); box-shadow: 0 16px 36px rgba(20,27,51,.1); }
.rail-name { font-size: 21px; font-weight: 700; letter-spacing: -0.01em; }
.rail-name .badge { background: var(--item-color, #FF1E1E); }
.rail-summary { font-size: 15px; line-height: 1.5; color: var(--ink-soft); }

.stage {
  display: grid; grid-template-columns: 1.2fr 1fr; gap: clamp(20px, 3vw, 40px); align-items: center;
  padding: clamp(20px, 3vw, 36px); border-radius: 28px; background: #FFFFFF;
  box-shadow: 0 30px 70px rgba(20,27,51,.08);
  animation: stage-in .45s var(--ease);
}
@keyframes stage-in { from { opacity: 0; transform: translateY(14px) scale(.99); } to { opacity: 1; transform: none; } }
.stage-art { border-radius: 20px; overflow: hidden; transition: transform .5s var(--ease), box-shadow .5s var(--ease); }
.stage-art:hover { transform: scale(1.03) rotate(-.6deg); box-shadow: 0 24px 50px rgba(20,27,51,.2); }
.art-img { display: block; width: 100%; height: auto; }
.stage-copy h3 { margin: 0 0 12px; font-size: clamp(28px, 3vw, 38px); letter-spacing: -0.02em; font-weight: 800; }
.stage-desc { margin: 0 0 22px; font-size: 17px; line-height: 1.65; color: var(--ink-soft); }
.feature-list { margin: 0 0 30px; padding: 0; list-style: none; }
.feature-list li {
  padding: 12px 0 12px 30px; border-bottom: 1px solid var(--line); font-size: 16px; position: relative;
  transition: padding-left .3s var(--ease);
}
.feature-list li::before {
  content: ""; position: absolute; left: 0; top: 50%; width: 12px; height: 12px; margin-top: -6px; border-radius: 50%;
  background: var(--stage-color); transition: transform .3s var(--ease);
}
.feature-list li:hover { padding-left: 38px; }
.feature-list li:hover::before { transform: scale(1.3); }

/* ---------- Why ---------- */
.why { position: relative; z-index: 2; padding: clamp(64px, 9vw, 110px) clamp(20px, 5vw, 80px); }
.why-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 24px; margin-top: 44px; }
.why-item {
  padding: 30px; border-radius: 22px; background: #FFFFFF; border: 1px solid var(--line);
  transition: transform .4s var(--ease), box-shadow .4s var(--ease), border-color .4s;
}
.why-item:hover { transform: translateY(-8px); box-shadow: 0 24px 50px rgba(20,27,51,.12); border-color: transparent; }
.why-item h3 { margin: 0 0 10px; font-size: 22px; font-weight: 700; }
.why-item p { margin: 0; color: var(--ink-soft); line-height: 1.65; }

/* ---------- Contact ---------- */
.contact {
  position: relative; overflow: hidden; isolation: isolate;
  display: grid; grid-template-columns: 1fr minmax(300px, 480px); gap: clamp(32px, 6vw, 80px); align-items: center;
  margin: 0 clamp(16px, 4vw, 80px) clamp(56px, 8vw, 100px);
  padding: clamp(32px, 5vw, 72px); border-radius: 32px; color: #FFFFFF;
  background: linear-gradient(120deg, #1E5BFF 0%, #7B3FE4 45%, #FF2D75 100%);
}
.contact::before {
  content: ""; position: absolute; inset: 0; z-index: -1; opacity: .25;
  background-image: radial-gradient(rgba(255,255,255,.9) 2px, transparent 2.4px); background-size: 18px 18px;
}
.contact h2 { margin: 0 0 14px; font-size: clamp(30px, 4vw, 46px); letter-spacing: -0.02em; font-weight: 800; }
.contact-intro p { margin: 0 0 28px; color: rgba(255,255,255,.9); line-height: 1.65; font-size: 17px; }
.contact-line { display: inline-block; margin: 0 18px 8px 0; font-weight: 600; text-decoration: none; transition: transform .25s var(--ease); }
.contact-line:hover { transform: translateX(4px); text-decoration: underline; }
.demo-form { display: grid; gap: 16px; background: rgba(255,255,255,.12); padding: 24px; border-radius: 22px; backdrop-filter: blur(12px); }
.demo-form label { display: grid; gap: 6px; font-size: 14px; font-weight: 500; }
.demo-form input, .demo-form select {
  padding: 13px 15px; border-radius: 12px; border: 1px solid rgba(255,255,255,.3);
  background: rgba(255,255,255,.95); color: var(--ink); font: 16px var(--font);
  transition: border-color .2s, box-shadow .2s;
}
.demo-form input:focus, .demo-form select:focus { outline: none; border-color: #FFFFFF; box-shadow: 0 0 0 4px rgba(255,255,255,.35); }
.thanks { text-align: left; }
.thanks h3 { margin: 0 0 8px; font-size: 28px; font-weight: 800; }
.thanks p { margin: 0; color: rgba(255,255,255,.9); }

/* ---------- Footer ---------- */
.footer {
  display: flex; flex-wrap: wrap; justify-content: space-between; gap: 16px;
  padding: 28px clamp(20px, 5vw, 80px); border-top: 1px solid var(--line); font-size: 14px; color: var(--ink-soft);
}
.footer-links { display: flex; gap: 22px; }
.footer-links a { text-decoration: none; position: relative; }
.footer-links a::after { content: ""; position: absolute; left: 0; bottom: -3px; width: 100%; height: 1.5px; background: currentColor; transform: scaleX(0); transform-origin: right; transition: transform .3s var(--ease); }
.footer-links a:hover::after { transform: scaleX(1); transform-origin: left; }

/* ---------- Logos ---------- */
.logos { padding: 40px clamp(20px, 5vw, 80px) 10px; text-align: center; }
.logos p { margin: 0 0 22px; color: var(--ink-soft); font-size: 15px; }
.logo-row { display: flex; flex-wrap: wrap; justify-content: center; gap: 14px; }
.logo-chip {
  padding: 12px 22px; border-radius: 999px; background: #FFFFFF; border: 1px solid var(--line);
  font-weight: 700; color: #3B4560; cursor: default;
  transition: transform .3s var(--ease), box-shadow .3s, color .3s;
}
.logo-chip:hover { transform: translateY(-3px); box-shadow: 0 12px 26px rgba(20,27,51,.1); color: var(--ink); }

/* ---------- Shared section helpers ---------- */
.features, .ai, .integrations, .security, .pricing, .testimonials, .faq {
  position: relative; z-index: 2; padding: clamp(64px, 9vw, 110px) clamp(20px, 5vw, 80px);
}
.section-head.centered { margin-left: auto; margin-right: auto; text-align: center; }
.section-head.centered p { margin-left: auto; margin-right: auto; }

/* ---------- Feature rows ---------- */
.feature-row {
  display: grid; grid-template-columns: 1fr 1fr; gap: clamp(28px, 5vw, 80px); align-items: center;
  margin-top: clamp(48px, 6vw, 80px);
}
.feature-row.flip .feature-art { order: 2; }
.feature-art {
  border-radius: 24px; overflow: hidden; box-shadow: 0 20px 50px rgba(20,27,51,.1);
  transition: transform .5s var(--ease), box-shadow .5s var(--ease);
}
.feature-art:hover { transform: translateY(-6px); box-shadow: 0 30px 60px rgba(20,27,51,.18); }
.feature-copy h3 { margin: 0 0 12px; font-size: clamp(26px, 3vw, 36px); font-weight: 800; letter-spacing: -0.02em; line-height: 1.1; }
.feature-copy p { margin: 0 0 20px; color: var(--ink-soft); font-size: 17px; line-height: 1.65; }
.text-link {
  display: inline-flex; align-items: center; gap: 8px; padding-bottom: 4px;
  font-weight: 600; text-decoration: none; color: var(--ink);
  background: linear-gradient(120deg, #1E5BFF, #FF2D75) left bottom / 0 2px no-repeat;
  transition: background-size .35s var(--ease), gap .3s var(--ease);
}
.text-link:hover { background-size: 100% 2px; gap: 12px; }
.text-link .arrow { width: 16px; height: 16px; }

/* ---------- AI section ---------- */
.ai {
  display: grid; grid-template-columns: 1fr 1.1fr; gap: clamp(28px, 5vw, 80px); align-items: center;
  background: #FFFFFF; border-block: 1px solid var(--line);
}
.ai h2 { margin: 0 0 14px; font-size: clamp(30px, 4vw, 48px); font-weight: 800; letter-spacing: -0.03em; line-height: 1.08; }
.ai-copy > p { margin: 0 0 24px; color: var(--ink-soft); font-size: 17px; line-height: 1.65; }
.check-list { list-style: none; padding: 0; margin: 0; display: grid; gap: 14px; }
.check-list li {
  display: flex; gap: 12px; align-items: flex-start; font-size: 16px; padding: 14px 16px; border-radius: 14px;
  background: var(--paper); transition: transform .3s var(--ease), background-color .3s;
}
.check-list li:hover { transform: translateX(6px); background: #E8EEFF; }
.check-list svg {
  flex-shrink: 0; margin-top: 1px; width: 22px; height: 22px; padding: 4px; border-radius: 50%;
  color: #FFFFFF; background: linear-gradient(120deg, #1E5BFF, #FF2D75);
}
.ai-art {
  border-radius: 24px; overflow: hidden; box-shadow: 0 30px 70px rgba(20,27,51,.15);
  transition: transform .5s var(--ease), box-shadow .5s var(--ease);
}
.ai-art:hover { transform: rotate(-1deg) scale(1.02); box-shadow: 0 40px 80px rgba(20,27,51,.22); }

/* ---------- Integrations ---------- */
.integration-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); gap: 16px; margin-top: 44px; }
.integration {
  display: flex; align-items: center; gap: 14px; padding: 18px 20px; border-radius: 18px;
  background: #FFFFFF; border: 1px solid var(--line); font-weight: 600;
  transition: transform .3s var(--ease), box-shadow .3s, border-color .3s;
}
.integration:hover { transform: translateY(-5px); box-shadow: 0 18px 36px rgba(20,27,51,.1); border-color: transparent; }
.integration-icon {
  width: 42px; height: 42px; border-radius: 12px; display: grid; place-items: center; flex-shrink: 0;
  background: var(--paper); font-weight: 800; transition: background .3s, color .3s;
}
.integration:hover .integration-icon { background: linear-gradient(120deg, #1E5BFF, #FF2D75); color: #FFFFFF; }

/* ---------- Pricing ---------- */
.plan-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px; margin-top: 52px; align-items: stretch; }
.plan {
  position: relative; display: flex; flex-direction: column; padding: 34px 30px; border-radius: 26px;
  background: #FFFFFF; border: 1px solid var(--line);
  transition: transform .4s var(--ease), box-shadow .4s var(--ease);
}
.plan:hover { transform: translateY(-8px); box-shadow: 0 30px 60px rgba(20,27,51,.12); }
.plan h3 { margin: 0; font-size: 24px; font-weight: 800; }
.plan-blurb { margin: 8px 0 22px; color: var(--ink-soft); font-size: 15px; line-height: 1.55; min-height: 3em; }
.plan-price { margin: 0 0 24px; font-size: 48px; font-weight: 800; letter-spacing: -0.03em; }
.plan-price span { margin-left: 4px; font-size: 16px; font-weight: 500; letter-spacing: 0; color: var(--ink-soft); }
.plan ul { list-style: none; padding: 0; margin: 0 0 30px; display: grid; gap: 12px; flex: 1; }
.plan li { display: flex; gap: 10px; align-items: flex-start; font-size: 15px; }
.plan li svg { flex-shrink: 0; margin-top: 2px; color: #1E5BFF; }
.plan .btn { margin-top: auto; }
.plan.is-popular {
  background: var(--ink); color: #FFFFFF; border-color: transparent; transform: translateY(-10px);
  box-shadow: 0 40px 80px rgba(20,27,51,.3);
}
.plan.is-popular:hover { transform: translateY(-18px); }
.plan.is-popular .plan-blurb, .plan.is-popular .plan-price span { color: #B9C2DA; }
.plan.is-popular li svg { color: #FF8AB0; }
.plan.is-popular .btn-light { background: #FFFFFF; }
.plan-flag {
  position: absolute; top: -14px; left: 30px; padding: 6px 12px; border-radius: 999px;
  background: linear-gradient(120deg, #1E5BFF, #FF2D75); color: #FFFFFF; font-size: 13px; font-weight: 700;
}

/* ---------- Testimonials ---------- */
.quote-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 24px; margin-top: 52px; }
.quote-card {
  margin: 0; padding: 30px; border-radius: 24px; background: #FFFFFF; border: 1px solid var(--line);
  display: flex; flex-direction: column; gap: 24px;
  transition: transform .4s var(--ease), box-shadow .4s var(--ease);
}
.quote-card:hover { transform: translateY(-6px); box-shadow: 0 24px 50px rgba(20,27,51,.1); }
.quote-card blockquote { margin: 0; flex: 1; font-size: 17px; line-height: 1.65; }
.quote-card figcaption { display: flex; align-items: center; gap: 12px; }
.quote-card figcaption strong, .quote-card figcaption small { display: block; }
.quote-card small { color: var(--ink-soft); font-size: 14px; }

/* ---------- Testimonials slider ---------- */
.testimonials {
  position: relative; overflow: hidden; isolation: isolate;
  padding: clamp(64px, 9vw, 110px) clamp(20px, 5vw, 80px);
  background: #FFF3F8;
}
.testimonials > * { position: relative; z-index: 1; }
.testimonials > .tm-aurora { position: absolute; inset: 0; z-index: 0; pointer-events: none; overflow: hidden; }
.testimonials :focus-visible { outline-color: var(--ink); }
/* Soft drifting colour blobs plus a fine grain layer for texture. */
.tm-aurora::after {
  content: ""; position: absolute; inset: 0; opacity: .14; mix-blend-mode: multiply;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
}
.tm-blob { position: absolute; border-radius: 50%; filter: blur(80px); opacity: .65; animation: tm-drift 16s ease-in-out infinite alternate; }
.tm-blob-1 { width: 520px; height: 520px; left: -140px; top: -140px; background: #FF9CC2; }
.tm-blob-2 { width: 600px; height: 600px; right: -180px; top: 10%; background: #9CB8FF; animation-duration: 20s; animation-delay: -4s; }
.tm-blob-3 { width: 460px; height: 460px; left: 30%; bottom: -200px; background: #FFD39C; animation-duration: 18s; animation-delay: -8s; }
.tm-blob-4 { width: 380px; height: 380px; right: 20%; bottom: -120px; background: #A9F0E0; animation-duration: 22s; }
@keyframes tm-drift {
  from { transform: translate(0, 0) scale(1); }
  to { transform: translate(70px, -50px) scale(1.12); }
}

.tm { max-width: 820px; margin: 56px auto 0; }
.tm-viewport { overflow: hidden; border-radius: 30px; cursor: grab; touch-action: pan-y; }
.tm-viewport:active { cursor: grabbing; }
.tm-track { display: flex; transition: transform .7s var(--ease); }
.tm-slide { flex: 0 0 100%; margin: 0; padding: 6px; }
.tm-card {
  position: relative; overflow: hidden; padding: clamp(28px, 4vw, 48px); border-radius: 30px;
  background: rgba(255, 255, 255, .72); border: 1px solid rgba(255, 255, 255, .9);
  backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px);
  box-shadow: 0 30px 70px rgba(20, 27, 51, .12);
  transition: transform .5s var(--ease), box-shadow .5s var(--ease);
}
.tm-card::before {
  content: "“"; position: absolute; top: 4px; right: 28px; pointer-events: none;
  font: 800 150px/1 Georgia, serif; color: rgba(30, 91, 255, .1);
}
.tm-card:hover { transform: translateY(-6px); box-shadow: 0 40px 80px rgba(20, 27, 51, .18); }
.tm-stars { display: flex; gap: 4px; margin-bottom: 22px; }
.tm-card blockquote {
  position: relative; margin: 0 0 32px; font-size: clamp(19px, 2.2vw, 24px); line-height: 1.5;
  font-weight: 500; letter-spacing: -0.01em; color: var(--ink);
}
.tm-card figcaption { display: flex; align-items: center; gap: 14px; }
.tm-card figcaption .avatar { width: 52px; height: 52px; border-radius: 18px; font-size: 17px; }
.tm-card figcaption strong, .tm-card figcaption small { display: block; }
.tm-card small { color: var(--ink-soft); font-size: 15px; }

.tm-controls { display: flex; align-items: center; justify-content: center; gap: 22px; margin-top: 32px; }
.tm-arrow {
  display: grid; place-items: center; width: 50px; height: 50px; border-radius: 50%; cursor: pointer;
  border: 1px solid rgba(20, 27, 51, .15); background: rgba(255, 255, 255, .85); color: var(--ink);
  transition: background-color .3s, color .3s, transform .3s var(--ease), border-color .3s;
}
.tm-arrow:hover { background: var(--ink); border-color: var(--ink); color: #FFFFFF; transform: scale(1.08); }
.tm-arrow.is-next svg { transform: rotate(180deg); }
.tm-dots { display: flex; gap: 10px; }
.tm-dot {
  width: 10px; height: 10px; padding: 0; border: 0; border-radius: 999px; cursor: pointer;
  background: rgba(20, 27, 51, .2); transition: width .4s var(--ease), background-color .3s;
}
.tm-dot:hover { background: rgba(20, 27, 51, .45); }
.tm-dot.is-active { width: 32px; background: linear-gradient(120deg, #1E5BFF, #FF2D75); }

@media (prefers-reduced-motion: reduce) {
  .tm-blob { animation: none; }
}

@media (max-width: 560px) {
  .tm-card::before { font-size: 110px; right: 18px; }
  .tm-controls { gap: 14px; }
}

/* ---------- Reviews: two-column layout ---------- */
.tm-layout {
  display: grid; grid-template-columns: minmax(280px, .9fr) 1.2fr;
  gap: clamp(36px, 5vw, 80px); align-items: center;
}
.tm-layout .tm { max-width: none; margin: 0; }
.tm-eyebrow {
  display: inline-block; padding: 7px 14px; border-radius: 999px; background: #FFFFFF;
  color: var(--ink); font-size: 14px; font-weight: 700; box-shadow: 0 6px 18px rgba(20, 27, 51, .08);
}
.tm-intro h2 { margin: 16px 0 16px; font-size: clamp(32px, 4vw, 50px); font-weight: 800; letter-spacing: -0.03em; line-height: 1.06; }
.tm-lead { margin: 0 0 30px; color: var(--ink-soft); font-size: 17px; line-height: 1.65; }
.tm-score {
  display: flex; align-items: center; gap: 18px; width: fit-content; margin-bottom: 24px;
  padding: 20px 24px; border-radius: 22px; background: rgba(255, 255, 255, .8); border: 1px solid #FFFFFF;
  box-shadow: 0 16px 40px rgba(20, 27, 51, .08); transition: transform .4s var(--ease), box-shadow .4s var(--ease);
}
.tm-score:hover { transform: translateY(-4px); box-shadow: 0 24px 50px rgba(20, 27, 51, .14); }
.tm-score > strong {
  font-size: 56px; font-weight: 800; letter-spacing: -0.04em; line-height: 1;
  background: linear-gradient(120deg, #1E5BFF, #FF2D75); -webkit-background-clip: text; background-clip: text; color: transparent;
}
.tm-score-meta { display: grid; gap: 6px; }
.tm-score-meta small { color: var(--ink-soft); font-size: 14px; }
.tm-stats { list-style: none; margin: 0 0 28px; padding: 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
.tm-stats li {
  padding: 16px; border-radius: 18px; background: rgba(255, 255, 255, .6);
  transition: transform .3s var(--ease), background-color .3s;
}
.tm-stats li:hover { transform: translateY(-4px); background: #FFFFFF; }
.tm-stats strong { display: block; font-size: 24px; font-weight: 800; letter-spacing: -0.02em; }
.tm-stats span { color: var(--ink-soft); font-size: 13px; line-height: 1.4; }
.tm-people { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; }
.tm-people small { color: var(--ink-soft); font-size: 14px; }
.tm-avatars { display: flex; }
.tm-avatars span {
  width: 44px; height: 44px; margin-left: -10px; border-radius: 50%; border: 3px solid #FFF3F8;
  display: grid; place-items: center; color: #FFFFFF; font-size: 14px; font-weight: 700;
  transition: transform .3s var(--ease);
}
.tm-avatars span:first-child { margin-left: 0; }
.tm-avatars span:hover { transform: translateY(-4px) scale(1.08); }
.tm-card::after {
  content: ""; position: absolute; left: 0; right: 0; top: 0; height: 4px;
  background: linear-gradient(90deg, #1E5BFF, #7B3FE4, #FF2D75);
}

@media (max-width: 900px) {
  .tm-layout { grid-template-columns: 1fr; }
}
@media (max-width: 560px) {
  .tm-stats { grid-template-columns: 1fr; }
}

/* ---------- Nav: products dropdown ---------- */
.nav-drop { position: relative; }
.nav-drop > a { display: inline-flex; align-items: center; gap: 6px; }
.nav-drop-chev { transition: transform .3s var(--ease); }
.nav-drop.is-open .nav-drop-chev { transform: rotate(180deg); }
.nav-drop-menu {
  position: absolute; top: calc(100% + 14px); left: -14px; z-index: 60;
  display: grid; gap: 4px; width: 340px; padding: 10px; border-radius: 20px; background: #FFFFFF;
  box-shadow: 0 30px 60px rgba(20, 27, 51, .28);
  opacity: 0; visibility: hidden; transform: translateY(8px);
  transition: opacity .25s, transform .3s var(--ease), visibility .25s;
}
.nav-drop-menu::before { content: ""; position: absolute; left: 0; right: 0; top: -16px; height: 16px; }
.nav-drop.is-open .nav-drop-menu { opacity: 1; visibility: visible; transform: none; }
.nav-drop-menu a {
  display: flex; align-items: center; gap: 14px; padding: 12px; border-radius: 14px;
  color: var(--ink); font-weight: 400; transition: background-color .25s, transform .3s var(--ease);
}
.nav-drop-menu a::after { display: none; }
.nav-drop-menu a:hover { background: #F3F5FB; transform: translateX(4px); }
.nav-drop-menu strong { display: block; font-size: 15px; font-weight: 700; }
.nav-drop-menu small { display: block; margin-top: 2px; font-size: 13px; color: var(--ink-soft); }
.drop-dot { width: 14px; height: 14px; border-radius: 5px; flex-shrink: 0; }
.mobile-group { display: flex; flex-direction: column; gap: 4px; }
.mobile-sub { padding-left: 34px !important; font-size: 15px !important; opacity: .85; }

/* ---------- Why us: icon cards with reveal panel ---------- */
.why-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; margin-top: 52px; }
.why-card {
  position: relative; isolation: isolate; overflow: hidden; height: 380px; border-radius: 28px; color: #FFFFFF;
  background: linear-gradient(150deg, var(--from), var(--to));
  box-shadow: 0 24px 50px rgba(20, 27, 51, .15);
  transition: transform .5s var(--ease), box-shadow .5s var(--ease);
}
.why-card::before {
  content: ""; position: absolute; z-index: -1; right: -90px; top: -90px; width: 260px; height: 260px;
  border-radius: 50%; background: rgba(255, 255, 255, .14); transition: transform .8s var(--ease);
}
.why-card::after {
  content: ""; position: absolute; z-index: -1; left: -60px; bottom: 40px; width: 150px; height: 150px;
  border-radius: 50%; border: 2px dashed rgba(255, 255, 255, .3);
}
.why-card:hover { transform: translateY(-8px); box-shadow: 0 34px 70px rgba(20, 27, 51, .24); }
.why-card:hover::before { transform: scale(1.35) translate(-20px, 20px); }
.why-art {
  position: absolute; top: 40px; left: 50%; width: 118px; height: 118px; margin-left: -59px;
  display: grid; place-items: center; border-radius: 36px; background: rgba(255, 255, 255, .2);
  backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);
  transition: transform .6s var(--ease), background-color .4s;
}
.why-art svg { width: 52px; height: 52px; }
.why-card:hover .why-art { transform: translateY(-14px) scale(1.06) rotate(-5deg); background: rgba(255, 255, 255, .3); }
.why-panel {
  position: absolute; left: 0; right: 0; bottom: 0; padding: 26px 26px 24px; border-radius: 28px 28px 0 0;
  background: rgba(255, 255, 255, .97); color: var(--ink);
  height: 250px;
  transform: translateY(158px);
  box-shadow: 0 -12px 34px rgba(20, 27, 51, .14);
  transition: transform .6s var(--ease);
}
.why-panel h3 { margin: 0 0 10px; font-size: 21px; font-weight: 800; letter-spacing: -0.01em; }
.why-panel p {
  margin: 0; font-size: 15px; line-height: 1.6; color: var(--ink-soft);
  opacity: 0; transform: translateY(10px); transition: opacity .4s .1s, transform .5s .1s var(--ease);
}
.why-card:hover .why-panel { transform: translateY(0); }
.why-card:hover .why-panel p { opacity: 1; transform: none; }

/* ---------- Reviews: scrolling rows ---------- */
.reviews {
  position: relative; overflow: hidden; padding: clamp(64px, 8vw, 100px) 0;
  background: linear-gradient(180deg, #F5F6FB 0%, #E9EEFF 100%);
}
.rv-head {
  display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-end; gap: 28px;
  padding: 0 clamp(20px, 5vw, 80px); margin-bottom: 44px;
}
.rv-eyebrow {
  display: inline-block; padding: 7px 14px; border-radius: 999px; background: #FFFFFF;
  font-size: 14px; font-weight: 700; box-shadow: 0 6px 18px rgba(20, 27, 51, .08);
}
.rv-head h2 { margin: 14px 0 0; font-size: clamp(32px, 4.4vw, 52px); font-weight: 800; letter-spacing: -0.03em; line-height: 1.05; }
.rv-stats { display: flex; flex-wrap: wrap; gap: 12px; }
.rv-stats div {
  min-width: 140px; padding: 16px 20px; border-radius: 20px; background: #FFFFFF;
  box-shadow: 0 14px 30px rgba(20, 27, 51, .07); transition: transform .3s var(--ease);
}
.rv-stats div:hover { transform: translateY(-4px); }
.rv-stats strong { display: block; font-size: 26px; font-weight: 800; letter-spacing: -0.02em; }
.rv-stats span { font-size: 13px; color: var(--ink-soft); }
.rv-marquee {
  overflow: hidden; padding: 14px 0;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
}
.rv-marquee + .rv-marquee { margin-top: 8px; }
.rv-track { display: flex; gap: 24px; width: max-content; animation: rv-scroll 48s linear infinite; }
.rv-reverse .rv-track { animation-direction: reverse; animation-duration: 56s; }
.rv-marquee:hover .rv-track { animation-play-state: paused; }
@keyframes rv-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
.rv-card {
  flex-shrink: 0; width: 360px; margin: 0; overflow: hidden; border-radius: 26px;
  background: #FFFFFF; border: 1px solid var(--line); box-shadow: 0 16px 40px rgba(20, 27, 51, .08);
  transition: transform .4s var(--ease), box-shadow .4s var(--ease);
}
.rv-card:hover { transform: translateY(-8px) rotate(-.4deg); box-shadow: 0 30px 60px rgba(20, 27, 51, .16); }
.rv-thumb { height: 150px; overflow: hidden; }
.rv-thumb .art-img { width: 100%; height: auto; transition: transform .6s var(--ease); }
.rv-card:hover .rv-thumb .art-img { transform: scale(1.08); }
.rv-body { padding: 20px 22px 22px; }
.rv-body .tm-stars { margin-bottom: 10px; gap: 3px; }
.rv-body blockquote {
  margin: 0 0 16px; font-size: 16px; line-height: 1.55; color: var(--ink);
  display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
}
.rv-body figcaption { display: flex; align-items: center; gap: 12px; }
.rv-body figcaption .avatar { width: 42px; height: 42px; border-radius: 14px; font-size: 15px; }
.rv-body figcaption strong, .rv-body figcaption small { display: block; }
.rv-body small { font-size: 13px; color: var(--ink-soft); }
@media (prefers-reduced-motion: reduce) {
  .rv-track { animation: none; }
  .rv-marquee { overflow-x: auto; }
}

/* ---------- Footer: four columns ---------- */
.site-footer {
  position: relative; overflow: hidden; isolation: isolate;
  padding: 80px clamp(20px, 5vw, 80px) 30px; background: var(--ink); color: #C6CEE4;
}
.site-footer::before {
  content: ""; position: absolute; inset: 0; z-index: -1;
  background:
    radial-gradient(700px 360px at 0% 0%, rgba(30, 91, 255, .28), transparent 70%),
    radial-gradient(600px 320px at 100% 100%, rgba(255, 45, 117, .2), transparent 70%);
}
.site-footer .brand { color: #FFFFFF; }
.sf-top { display: grid; grid-template-columns: 1.4fr 1fr 1fr 1.2fr; gap: 48px; }
.sf-brand p { max-width: 36ch; margin: 20px 0 24px; font-size: 15px; line-height: 1.65; }
.sf-social { display: flex; gap: 10px; }
.sf-social a {
  display: grid; place-items: center; width: 44px; height: 44px; border-radius: 14px;
  background: rgba(255, 255, 255, .08); color: #FFFFFF; font-size: 13px; font-weight: 700; text-decoration: none;
  transition: transform .35s var(--ease), background .35s;
}
.sf-social a:hover { background: linear-gradient(120deg, #1E5BFF, #FF2D75); transform: translateY(-4px) rotate(-4deg); }
.sf-col h4 { margin: 0 0 20px; font-size: 16px; font-weight: 700; color: #FFFFFF; letter-spacing: .01em; }
.sf-col ul { display: grid; gap: 12px; margin: 0; padding: 0; list-style: none; }
.sf-col a { display: inline-block; color: #C6CEE4; text-decoration: none; transition: color .25s, transform .3s var(--ease); }
.sf-col a:hover { color: #FFFFFF; transform: translateX(5px); }
.sf-contact li { font-size: 15px; line-height: 1.5; }
.sf-bottom {
  display: flex; flex-wrap: wrap; justify-content: space-between; gap: 14px; margin-top: 60px;
  padding-top: 24px; border-top: 1px solid rgba(255, 255, 255, .1); font-size: 14px;
}
.sf-legal { display: flex; gap: 22px; }
.sf-legal a { color: #C6CEE4; text-decoration: none; transition: color .25s; }
.sf-legal a:hover { color: #FFFFFF; }
@media (max-width: 900px) {
  .sf-top { grid-template-columns: 1fr 1fr; }
  .sf-brand { grid-column: 1 / -1; }
  .why-card { height: 360px; }
}
@media (max-width: 560px) {
  .sf-top { grid-template-columns: 1fr; gap: 36px; }
  .rv-card { width: 290px; }
  .why-card { height: 340px; }
}

/* ---------- Security: visual + rows ---------- */
.security { overflow: hidden; background: #FFFFFF; }
.security::before {
  content: ""; position: absolute; top: -20vw; right: -20vw; width: 60vw; height: 60vw; max-width: 800px; max-height: 800px;
  border-radius: 50%; pointer-events: none; background: radial-gradient(circle, rgba(123, 63, 228, .12), transparent 65%);
}
.security > * { position: relative; z-index: 1; }
.sec-grid { display: grid; grid-template-columns: 1fr 1.1fr; gap: clamp(40px, 6vw, 96px); align-items: center; }
.sec-visual { position: relative; width: 100%; max-width: 460px; aspect-ratio: 1; margin: 0 auto; }
.sec-ring { position: absolute; inset: 0; border-radius: 50%; border: 1.5px solid rgba(30, 91, 255, .18); }
.sec-ring-1 { inset: 6%; }
.sec-ring-2 { inset: 20%; border-style: dashed; border-color: rgba(255, 45, 117, .3); animation: sec-spin 30s linear infinite; }
.sec-ring-3 { inset: 34%; border-color: rgba(123, 63, 228, .25); }
.sec-visual:hover .sec-ring-2 { animation-duration: 12s; }
.sec-core {
  position: absolute; left: 50%; top: 50%; width: 150px; height: 150px; margin: -75px 0 0 -75px;
  display: grid; place-items: center; color: #FFFFFF; border-radius: 48px;
  background: linear-gradient(135deg, #1E5BFF, #7B3FE4 50%, #FF2D75);
  box-shadow: 0 30px 60px rgba(123, 63, 228, .4);
  animation: sec-float 6s ease-in-out infinite;
  transition: transform .6s var(--ease), border-radius .6s var(--ease);
}
.sec-visual:hover .sec-core { transform: scale(1.08) rotate(-6deg); border-radius: 70px; }
.sec-chip {
  position: absolute; display: inline-flex; align-items: center; gap: 8px; padding: 10px 16px; border-radius: 999px;
  background: #FFFFFF; color: var(--ink); font-size: 14px; font-weight: 600; white-space: nowrap;
  box-shadow: 0 14px 30px rgba(20, 27, 51, .12); animation: sec-bob 5s ease-in-out infinite;
  transition: box-shadow .3s var(--ease);
}
.sec-chip:hover { box-shadow: 0 22px 40px rgba(20, 27, 51, .2); }
.chip-a { top: 12%; left: -2%; }
.chip-b { bottom: 20%; right: -4%; animation-delay: -2s; }
.chip-c { bottom: 4%; left: 4%; animation-delay: -3.5s; }
.sec-live {
  width: 9px; height: 9px; border-radius: 50%; background: #22C55E;
  animation: sec-pulse 2s infinite;
}
@keyframes sec-spin { to { transform: rotate(360deg); } }
@keyframes sec-float { 0%, 100% { margin-top: -75px; } 50% { margin-top: -87px; } }
@keyframes sec-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
@keyframes sec-pulse {
  0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, .6); }
  70% { box-shadow: 0 0 0 10px rgba(34, 197, 94, 0); }
  100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
}

.sec-content h2 { margin: 16px 0 16px; font-size: clamp(32px, 4vw, 50px); font-weight: 800; letter-spacing: -0.03em; line-height: 1.06; }
.sec-content > p { margin: 0 0 32px; font-size: 17px; line-height: 1.65; color: var(--ink-soft); }
.sec-list { display: grid; gap: 14px; margin: 0; padding: 0; list-style: none; }
.sec-row {
  position: relative; display: flex; gap: 18px; align-items: flex-start; overflow: hidden;
  padding: 20px 22px; border-radius: 22px; border: 1px solid transparent; background: var(--paper);
  transition: transform .4s var(--ease), background-color .4s, box-shadow .4s, border-color .4s;
}
.sec-row::before {
  content: ""; position: absolute; left: 0; top: 0; bottom: 0; width: 4px;
  background: linear-gradient(180deg, #1E5BFF, #FF2D75); transform: scaleY(0); transition: transform .45s var(--ease);
}
.sec-row:hover { transform: translateX(10px); background: #FFFFFF; border-color: var(--line); box-shadow: 0 20px 40px rgba(20, 27, 51, .08); }
.sec-row:hover::before { transform: scaleY(1); }
.sec-row-icon {
  display: grid; place-items: center; flex-shrink: 0; width: 52px; height: 52px; border-radius: 16px;
  background: #FFFFFF; color: var(--ink); box-shadow: 0 8px 18px rgba(20, 27, 51, .06);
  transition: background .4s, color .4s, transform .5s var(--ease);
}
.sec-row:hover .sec-row-icon { background: linear-gradient(135deg, #1E5BFF, #FF2D75); color: #FFFFFF; transform: rotate(-8deg) scale(1.06); }
.sec-row h3 { margin: 2px 0 6px; font-size: 19px; font-weight: 700; }
.sec-row p { margin: 0; font-size: 15px; line-height: 1.6; color: var(--ink-soft); }

@media (max-width: 900px) {
  .sec-grid { grid-template-columns: 1fr; }
  .sec-visual { max-width: 380px; }
}
@media (max-width: 560px) {
  .chip-a { left: 0; }
  .chip-b { right: 0; }
  .sec-row { padding: 18px; }
}
@media (prefers-reduced-motion: reduce) {
  .sec-ring-2, .sec-core, .sec-chip, .sec-live { animation: none; }
}

/* ---------- Reviews: floating particles ---------- */
.reviews > * { position: relative; z-index: 1; }
.reviews > .orb { position: absolute; z-index: 0; pointer-events: none; }
.orb {
  border-radius: 50%; background: var(--c);
  animation-iteration-count: infinite; animation-timing-function: ease-in-out;
}
.orb-drift { animation-name: orb-drift; }
.orb-rise { animation-name: orb-rise; animation-timing-function: linear; }
.orb-pulse { animation-name: orb-pulse; }
.orb-orbit { background: none; border: 1.5px dashed var(--c); animation-name: orb-spin; animation-timing-function: linear; }
.orb-orbit::after {
  content: ""; position: absolute; top: -6px; left: 50%; width: 12px; height: 12px; margin-left: -6px;
  border-radius: 50%; background: var(--c);
}
@keyframes orb-drift {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(70px, -40px); }
}
@keyframes orb-rise {
  0% { transform: translateY(0); opacity: 0; }
  15% { opacity: 1; }
  100% { transform: translateY(-420px); opacity: 0; }
}
@keyframes orb-pulse {
  0%, 100% { transform: scale(1); opacity: .5; }
  50% { transform: scale(1.25); opacity: .15; }
}
@keyframes orb-spin { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) {
  .orb { animation: none; }
}

/* ---------- Industries we serve: physics board ---------- */
.industries { position: relative; padding: clamp(64px, 9vw, 110px) clamp(20px, 5vw, 80px); background: var(--paper); }
.ph-board {
  position: relative; overflow: hidden; height: 560px; margin-top: 48px; border-radius: 36px;
  background-color: #FFFFFF;
  background-image: radial-gradient(rgba(20, 27, 51, .08) 1.2px, transparent 1.4px);
  background-size: 22px 22px;
  border: 1px solid var(--line); touch-action: none; user-select: none;
}
.ph-body {
  position: absolute; left: 0; top: 0; display: grid; place-items: center; border-radius: 50%;
  color: #FFFFFF; cursor: grab; will-change: transform;
  background: radial-gradient(circle at 30% 25%, rgba(255, 255, 255, .45), transparent 42%), var(--c);
  box-shadow: 0 16px 30px rgba(20, 27, 51, .18);
  transition: box-shadow .3s var(--ease);
}
.ph-body:active { cursor: grabbing; }
.ph-body.is-outline {
  background: #FFFFFF; color: var(--ink); border: 3px solid var(--c); box-shadow: 0 14px 26px rgba(20, 27, 51, .1);
}
.ph-body.is-dragging { box-shadow: 0 34px 60px rgba(20, 27, 51, .32); }
.ph-body:hover { box-shadow: 0 22px 40px rgba(20, 27, 51, .24); }
.ph-label {
  padding: 0 14%; font-size: calc(var(--r) * .19); font-weight: 700; line-height: 1.15;
  text-align: center; pointer-events: none;
}
@media (max-width: 560px) {
  .ph-board { height: 500px; border-radius: 26px; }
}

/* ---------- Portfolio card link ---------- */
.pf-link { display: block; color: inherit; text-decoration: none; }
.pf-link:focus-visible { outline: 3px solid var(--ink); outline-offset: 6px; border-radius: 24px; }

/* ---------- Portfolio detail page ---------- */
.pd { min-height: 100vh; background: var(--paper); color: var(--ink); }
.pd-top {
  position: sticky; top: 0; z-index: 40; display: flex; justify-content: space-between; align-items: center;
  padding: 16px clamp(20px, 5vw, 80px); background: rgba(245, 246, 251, .88);
  backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-bottom: 1px solid var(--line);
}
.pd-top .brand { color: var(--ink); }
.pd-top .brand-mark { background: linear-gradient(135deg, #1E5BFF, #FF2D75); }
.pd-back-top {
  padding: 10px 18px; border-radius: 999px; background: #FFFFFF; color: var(--ink); font-weight: 600; text-decoration: none;
  box-shadow: 0 8px 20px rgba(20, 27, 51, .08); transition: transform .3s var(--ease), background-color .3s, color .3s;
}
.pd-back-top:hover { background: var(--ink); color: #FFFFFF; transform: translateY(-2px); }

.pd-hero {
  display: grid; grid-template-columns: 1fr 1.1fr; gap: clamp(32px, 5vw, 72px); align-items: center;
  padding: clamp(48px, 7vw, 96px) clamp(20px, 5vw, 80px) clamp(32px, 4vw, 56px);
}
.pd-back {
  display: inline-flex; margin-bottom: 22px; color: var(--ink-soft); font-weight: 600; text-decoration: none;
  transition: transform .3s var(--ease), color .3s;
}
.pd-back:hover { color: var(--ink); transform: translateX(-5px); }
.pd-hero h1 {
  margin: 16px 0 18px; font-size: clamp(38px, 5.4vw, 68px); font-weight: 800; letter-spacing: -0.035em; line-height: 1.02;
}
.pd-summary { margin: 0 0 28px; max-width: 52ch; font-size: 18px; line-height: 1.65; color: var(--ink-soft); }
.pd-meta { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin: 0 0 28px; }
.pd-meta div {
  padding: 14px 16px; border-radius: 18px; background: #FFFFFF; border: 1px solid var(--line);
  transition: transform .3s var(--ease), box-shadow .3s;
}
.pd-meta div:hover { transform: translateY(-4px); box-shadow: 0 16px 30px rgba(20, 27, 51, .08); }
.pd-meta dt { font-size: 13px; color: var(--ink-soft); }
.pd-meta dd { margin: 4px 0 0; font-size: 16px; font-weight: 700; }

.pd-share { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; }
.pd-share > span { margin-right: 4px; font-size: 14px; font-weight: 700; color: var(--ink-soft); }
.pd-share a, .pd-share button {
  display: inline-flex; align-items: center; padding: 10px 16px; border-radius: 999px; cursor: pointer;
  border: 1px solid var(--line); background: #FFFFFF; color: var(--ink); font: 600 14px var(--font); text-decoration: none;
  transition: transform .25s var(--ease), background-color .25s, color .25s, border-color .25s;
}
.pd-share a:hover, .pd-share button:hover { background: var(--ink); color: #FFFFFF; border-color: var(--ink); transform: translateY(-3px); }
.pd-share .is-copied { background: #1F7A6D; border-color: #1F7A6D; color: #FFFFFF; }

.pd-hero-media { position: relative; overflow: hidden; border-radius: 30px; box-shadow: 0 40px 80px rgba(20, 27, 51, .18); }
.pd-hero-media > .art-img {
  transform: translate3d(0, calc(var(--py, 0) * 1px), 0) scale(1.12); will-change: transform;
}

.pd-body { padding: 0 clamp(20px, 5vw, 80px) clamp(40px, 6vw, 72px); }
.pd-cols { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.pd-cols article {
  padding: 30px; border-radius: 26px; background: #FFFFFF; border: 1px solid var(--line);
  transition: transform .4s var(--ease), box-shadow .4s;
}
.pd-cols article:hover { transform: translateY(-6px); box-shadow: 0 26px 50px rgba(20, 27, 51, .1); }
.pd-cols h3 { margin: 0 0 12px; font-size: 22px; font-weight: 800; }
.pd-cols p { margin: 0; line-height: 1.7; color: var(--ink-soft); }
.pd-results { background: linear-gradient(150deg, #1E5BFF, #7B3FE4 55%, #FF2D75); border-color: transparent !important; color: #FFFFFF; }
.pd-results h3 { color: #FFFFFF; }
.pd-results > div { padding: 12px 0; border-top: 1px solid rgba(255, 255, 255, .25); }
.pd-results > div strong { display: block; font-size: 28px; font-weight: 800; letter-spacing: -0.02em; }
.pd-results > div span { font-size: 14px; opacity: .9; }
.pd-scope { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 28px; }
.pd-scope span {
  padding: 10px 18px; border-radius: 999px; background: var(--ink); color: #FFFFFF; font-size: 14px; font-weight: 600;
  transition: transform .3s var(--ease);
}
.pd-scope span:hover { transform: translateY(-3px); }

.pd-gallery { padding: 0 clamp(20px, 5vw, 80px) clamp(48px, 6vw, 80px); }
.pd-gallery h2 { margin: 0 0 28px; font-size: clamp(28px, 3.4vw, 40px); font-weight: 800; letter-spacing: -0.02em; }
.pd-grid { display: grid; grid-template-columns: 1.4fr 1fr; gap: 24px; }
.pd-shot {
  position: relative; overflow: hidden; padding: 0; border: 0; border-radius: 26px; cursor: zoom-in;
  background: #FFFFFF; box-shadow: 0 20px 44px rgba(20, 27, 51, .12);
  transition: transform .5s var(--ease), box-shadow .5s var(--ease);
}
.pd-shot:hover { transform: translateY(-6px); box-shadow: 0 34px 70px rgba(20, 27, 51, .2); }
.pd-shot .art-img { display: block; width: 100%; height: auto; transition: transform .8s var(--ease); }
.pd-shot:hover .art-img { transform: scale(1.05); }
.pd-shot:nth-child(3) { grid-column: 1 / -1; }
.pd-shot-cap {
  position: absolute; left: 16px; bottom: 16px; padding: 10px 16px; border-radius: 999px;
  background: rgba(255, 255, 255, .94); color: var(--ink); font-size: 14px; font-weight: 600;
  transition: transform .35s var(--ease);
}
.pd-shot:hover .pd-shot-cap { transform: translateY(-4px); }

.pd-lightbox {
  position: fixed; inset: 0; z-index: 100; display: grid; place-items: center; padding: 24px;
  background: rgba(11, 16, 36, .82); backdrop-filter: blur(8px); animation: pd-fade .3s ease-out;
}
@keyframes pd-fade { from { opacity: 0; } to { opacity: 1; } }
.pd-lb-inner { position: relative; width: min(1000px, 100%); overflow: hidden; border-radius: 24px; background: #FFFFFF; box-shadow: 0 40px 90px rgba(0, 0, 0, .4); }
.pd-lb-inner .art-img { display: block; width: 100%; height: auto; }
.pd-lb-inner p { margin: 0; padding: 18px 22px; font-weight: 600; color: var(--ink); display: flex; justify-content: space-between; }
.pd-lb-inner p span { color: var(--ink-soft); font-weight: 500; }
.pd-lb-btn, .pd-lb-close {
  position: absolute; display: grid; place-items: center; border: 0; border-radius: 50%; cursor: pointer;
  background: #FFFFFF; color: var(--ink); box-shadow: 0 10px 24px rgba(0, 0, 0, .25);
  transition: transform .3s var(--ease), background-color .3s, color .3s;
}
.pd-lb-btn { top: 50%; width: 52px; height: 52px; margin-top: -26px; font-size: 30px; line-height: 1; }
.pd-lb-btn.is-prev { left: 14px; }
.pd-lb-btn.is-next { right: 14px; }
.pd-lb-btn:hover { background: var(--ink); color: #FFFFFF; transform: scale(1.08); }
.pd-lb-close { top: 14px; right: 14px; width: 44px; height: 44px; font-size: 26px; line-height: 1; }
.pd-lb-close:hover { background: var(--ink); color: #FFFFFF; transform: rotate(90deg); }

.pd-pager {
  display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 24px;
  padding: clamp(32px, 4vw, 56px) clamp(20px, 5vw, 80px) clamp(40px, 5vw, 72px); border-top: 1px solid var(--line);
}
.pd-pager-side {
  display: flex; align-items: center; gap: 16px; padding: 22px 24px; border-radius: 24px;
  background: #FFFFFF; border: 1px solid var(--line); color: var(--ink); text-decoration: none;
  transition: transform .4s var(--ease), box-shadow .4s;
}
.pd-pager-side:hover { transform: translateY(-6px); box-shadow: 0 24px 50px rgba(20, 27, 51, .12); }
.pd-pager-side.is-next { justify-content: flex-end; text-align: right; }
.pd-pager-side small { display: block; margin-bottom: 4px; font-size: 13px; color: var(--ink-soft); }
.pd-pager-side strong { font-size: 19px; font-weight: 800; letter-spacing: -0.01em; }
.pd-arrow {
  display: grid; place-items: center; flex-shrink: 0; width: 52px; height: 52px; border-radius: 50%;
  background: var(--paper); font-size: 22px; transition: background-color .4s, color .4s, transform .4s var(--ease);
}
.pd-pager-side.is-prev:hover .pd-arrow { background: var(--ink); color: #FFFFFF; transform: translateX(-4px); }
.pd-pager-side.is-next:hover .pd-arrow { background: var(--ink); color: #FFFFFF; transform: translateX(4px); }
.pd-pager-center { display: flex; flex-direction: column; align-items: center; gap: 10px; color: var(--ink); text-decoration: none; }
.pd-pager-center small { font-size: 14px; font-weight: 700; }
.pd-circle {
  display: grid; place-items: center; width: 84px; height: 84px; border-radius: 50%; color: #FFFFFF;
  background: linear-gradient(135deg, #1E5BFF, #7B3FE4 50%, #FF2D75);
  box-shadow: 0 18px 36px rgba(123, 63, 228, .35); transition: transform .6s var(--ease), box-shadow .4s;
}
.pd-pager-center:hover .pd-circle { transform: rotate(90deg) scale(1.08); box-shadow: 0 26px 50px rgba(123, 63, 228, .45); }
.pd-foot { padding: 24px clamp(20px, 5vw, 80px); border-top: 1px solid var(--line); font-size: 14px; color: var(--ink-soft); }

@media (max-width: 900px) {
  .pd-hero { grid-template-columns: 1fr; }
  .pd-cols { grid-template-columns: 1fr; }
  .pd-grid { grid-template-columns: 1fr; }
  .pd-shot:nth-child(3) { grid-column: auto; }
}
@media (max-width: 560px) {
  .pd-meta { grid-template-columns: 1fr; }
  .pd-pager { grid-template-columns: 1fr; }
  .pd-pager-center { order: -1; }
  .pd-pager-side.is-next { justify-content: flex-start; text-align: left; }
  .pd-pager-side.is-next .pd-arrow { order: 2; }
  .pd-pager-side { padding: 18px; }
}
@media (prefers-reduced-motion: reduce) {
  .pd-lightbox { animation: none; }
}

/* ---------- Product detail page ---------- */
.pdp-top-actions { display: flex; align-items: center; gap: 12px; }
.pdp-tag { margin-bottom: 4px; }
.pdp-media {
  position: relative; overflow: hidden; border-radius: 30px; box-shadow: 0 40px 80px rgba(20, 27, 51, .18);
  transition: transform .6s var(--ease);
}
.pdp-media:hover { transform: translateY(-6px); }
.pdp-media .art-img { display: block; width: 100%; height: auto; }

.pdp-rate { display: flex; align-items: center; gap: 16px; margin-bottom: 28px; }
.pdp-rate > strong { font-size: 44px; font-weight: 800; letter-spacing: -0.03em; line-height: 1; }
.pdp-rate small { display: block; margin-top: 4px; font-size: 14px; color: var(--ink-soft); }
.pdp-rate .tm-stars { margin: 0; }
.pdp-cta { display: flex; flex-wrap: wrap; gap: 12px; }
.pdp-ghost {
  padding: 15px 26px; border-radius: 999px; border: 0; cursor: pointer; font: 600 16px var(--font); color: var(--ink);
  background: transparent; box-shadow: inset 0 0 0 1.5px var(--ink);
  transition: background-color .3s, color .3s, transform .3s var(--ease);
}
.pdp-ghost:hover { background: var(--ink); color: #FFFFFF; transform: translateY(-3px); }

.pdp-stats {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px;
  padding: 0 clamp(20px, 5vw, 80px) clamp(40px, 5vw, 64px);
}
.pdp-stats > div {
  padding: 26px 24px; border-radius: 22px; background: #FFFFFF; border: 1px solid var(--line);
  transition: transform .35s var(--ease), box-shadow .35s;
}
.pdp-stats > div:hover { transform: translateY(-6px); box-shadow: 0 22px 44px rgba(20, 27, 51, .1); }
.pdp-stats strong { display: block; font-size: 32px; font-weight: 800; letter-spacing: -0.02em; }
.pdp-stats span { font-size: 14px; color: var(--ink-soft); }

.pdp-section { padding: clamp(56px, 7vw, 96px) clamp(20px, 5vw, 80px); }
.pdp-head { max-width: 680px; margin-bottom: 44px; }
.pdp-head h2 { margin: 14px 0 12px; font-size: clamp(30px, 4vw, 46px); font-weight: 800; letter-spacing: -0.03em; line-height: 1.06; }
.pdp-head p { margin: 0; font-size: 17px; line-height: 1.6; color: var(--ink-soft); }

/* Features: sidebar + grouped lists */
.pdp-features { background: #FFFFFF; border-block: 1px solid var(--line); }
.pdp-feat-layout { display: grid; grid-template-columns: 260px 1fr; gap: clamp(28px, 4vw, 56px); align-items: start; }
.pdp-feat-nav { position: sticky; top: 100px; display: grid; gap: 8px; }
.pdp-feat-nav button {
  display: flex; justify-content: space-between; align-items: center; padding: 14px 18px; border: 0; border-radius: 16px;
  background: var(--paper); color: var(--ink); font: 600 15px var(--font); text-align: left; cursor: pointer;
  transition: background-color .3s, color .3s, transform .3s var(--ease);
}
.pdp-feat-nav button span {
  min-width: 28px; padding: 3px 8px; border-radius: 999px; background: #FFFFFF; font-size: 12px; text-align: center;
}
.pdp-feat-nav button:hover { background: var(--ink); color: #FFFFFF; transform: translateX(6px); }
.pdp-groups { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
.pdp-group {
  padding: 30px; border-radius: 26px; background: var(--paper); border: 1px solid transparent;
  transition: transform .4s var(--ease), background-color .4s, box-shadow .4s, border-color .4s;
}
.pdp-group:hover { transform: translateY(-6px); background: #FFFFFF; border-color: var(--line); box-shadow: 0 24px 46px rgba(20, 27, 51, .08); }
.pdp-group h3 { display: flex; align-items: center; gap: 12px; margin: 0 0 18px; font-size: 20px; font-weight: 800; }
.pdp-group h3 i { width: 12px; height: 12px; border-radius: 4px; }
.pdp-group ul { display: grid; gap: 12px; margin: 0; padding: 0; list-style: none; }
.pdp-group li {
  display: flex; align-items: center; gap: 12px; padding: 12px 14px; border-radius: 14px;
  background: #FFFFFF; font-size: 15px; font-weight: 500; transition: transform .3s var(--ease), background-color .3s;
}
.pdp-group li:hover { transform: translateX(6px); background: #EEF2FF; }
.pdp-group li svg {
  flex-shrink: 0; width: 22px; height: 22px; padding: 4px; border-radius: 50%;
  color: #FFFFFF; background: linear-gradient(120deg, #1E5BFF, #FF2D75);
}

/* Featured highlights */
.pdp-featured-list { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.pdp-featured-list article {
  padding: 34px 30px; border-radius: 28px; background: #FFFFFF; border: 1px solid var(--line);
  position: relative; overflow: hidden; transition: transform .45s var(--ease), box-shadow .45s;
}
.pdp-featured-list article::after {
  content: ""; position: absolute; right: -50px; top: -50px; width: 150px; height: 150px; border-radius: 50%;
  background: var(--c); opacity: .12; transition: transform .6s var(--ease);
}
.pdp-featured-list article:hover { transform: translateY(-8px); box-shadow: 0 30px 60px rgba(20, 27, 51, .12); }
.pdp-featured-list article:hover::after { transform: scale(1.5); }
.pdp-featured-icon {
  display: grid; place-items: center; width: 64px; height: 64px; margin-bottom: 22px; border-radius: 20px;
  background: var(--paper); color: var(--ink); transition: transform .4s var(--ease), background .4s, color .4s;
}
.pdp-featured-icon svg { width: 30px; height: 30px; }
.pdp-featured-list article:hover .pdp-featured-icon { transform: rotate(-8deg) scale(1.06); background: var(--c); color: #FFFFFF; }
.pdp-featured-list h3 { margin: 0 0 10px; font-size: 22px; font-weight: 800; }
.pdp-featured-list p { margin: 0; font-size: 15px; line-height: 1.65; color: var(--ink-soft); }

/* Built for */
.pdp-chips { display: flex; flex-wrap: wrap; gap: 14px; }
.pdp-chip {
  display: inline-flex; align-items: center; gap: 12px; padding: 16px 24px; border-radius: 999px;
  background: #FFFFFF; border: 1px solid var(--line); font-size: 17px; font-weight: 600;
  box-shadow: 0 10px 24px rgba(20, 27, 51, .06); transition: transform .3s var(--ease), box-shadow .3s;
}
.pdp-chip:hover { transform: translateY(-5px); box-shadow: 0 20px 36px rgba(20, 27, 51, .12); }
.pdp-chip i { width: 14px; height: 14px; border-radius: 50%; }

/* Add-ons */
.pdp-addons { background: var(--paper); }
.pdp-addon-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 18px; }
.pdp-addon {
  position: relative; display: flex; align-items: center; gap: 18px; padding: 22px 24px; border-radius: 22px; cursor: pointer;
  background: #FFFFFF; border: 2px solid transparent; box-shadow: 0 12px 30px rgba(20, 27, 51, .06);
  transition: transform .35s var(--ease), border-color .35s, box-shadow .35s;
}
.pdp-addon:hover { transform: translateY(-5px); box-shadow: 0 22px 40px rgba(20, 27, 51, .1); }
.pdp-addon.is-on { border-color: #1E5BFF; }
.pdp-addon input { position: absolute; opacity: 0; width: 1px; height: 1px; pointer-events: none; }
.pdp-addon:focus-within { outline: 3px solid var(--ink); outline-offset: 3px; }
.pdp-addon-body { flex: 1; display: grid; gap: 4px; }
.pdp-addon-body strong { font-size: 18px; font-weight: 700; }
.pdp-addon-body small { font-size: 14px; line-height: 1.5; color: var(--ink-soft); }
.pdp-addon-price { font-size: 18px; font-weight: 800; white-space: nowrap; }
.pdp-addon-price em { font-style: normal; font-size: 13px; font-weight: 500; color: var(--ink-soft); }
.pdp-switch {
  position: relative; flex-shrink: 0; width: 46px; height: 26px; border-radius: 999px; background: #D5DAE6;
  transition: background-color .3s;
}
.pdp-switch::after {
  content: ""; position: absolute; top: 3px; left: 3px; width: 20px; height: 20px; border-radius: 50%;
  background: #FFFFFF; box-shadow: 0 2px 6px rgba(0, 0, 0, .2); transition: transform .35s var(--ease);
}
.pdp-addon.is-on .pdp-switch { background: linear-gradient(120deg, #1E5BFF, #FF2D75); }
.pdp-addon.is-on .pdp-switch::after { transform: translateX(20px); }
.pdp-total {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-top: 28px;
}
.pdp-total > div {
  padding: 22px 24px; border-radius: 22px; background: #FFFFFF; border: 1px solid var(--line);
  display: grid; gap: 6px; transition: transform .3s var(--ease);
}
.pdp-total > div:hover { transform: translateY(-4px); }
.pdp-total span { font-size: 14px; color: var(--ink-soft); }
.pdp-total strong { font-size: 26px; font-weight: 800; letter-spacing: -0.02em; }
.pdp-total .is-total { background: var(--ink); border-color: var(--ink); color: #FFFFFF; }
.pdp-total .is-total span { color: #B9C2DA; }

/* Ratings */
.pdp-ratings-grid { display: grid; grid-template-columns: 1fr 1.4fr; gap: 24px; align-items: start; }
.pdp-rating-sum { padding: 32px; border-radius: 28px; background: #FFFFFF; border: 1px solid var(--line); }
.pdp-big strong { display: block; font-size: 64px; font-weight: 800; letter-spacing: -0.04em; line-height: 1; }
.pdp-big .tm-stars { margin: 12px 0 6px; }
.pdp-big small { color: var(--ink-soft); font-size: 14px; }
.pdp-bars { display: grid; gap: 12px; margin: 26px 0 0; padding: 0; list-style: none; }
.pdp-bars li { display: grid; grid-template-columns: 56px 1fr 44px; align-items: center; gap: 12px; font-size: 14px; }
.pdp-bars em { font-style: normal; text-align: right; color: var(--ink-soft); }
.pdp-bar { height: 8px; border-radius: 999px; background: var(--paper); overflow: hidden; }
.pdp-bar i {
  display: block; height: 100%; border-radius: 999px;
  background: linear-gradient(90deg, #1E5BFF, #FF2D75); transition: width 1s var(--ease);
}
.pdp-review-list { display: grid; gap: 18px; }
.pdp-review {
  margin: 0; padding: 28px; border-radius: 24px; background: #FFFFFF; border: 1px solid var(--line);
  transition: transform .35s var(--ease), box-shadow .35s;
}
.pdp-review:hover { transform: translateX(8px); box-shadow: 0 20px 40px rgba(20, 27, 51, .08); }
.pdp-review .tm-stars { margin: 0 0 12px; }
.pdp-review blockquote { margin: 0 0 16px; font-size: 17px; line-height: 1.6; color: var(--ink); }
.pdp-review figcaption strong, .pdp-review figcaption small { display: block; }
.pdp-review figcaption small { color: var(--ink-soft); font-size: 14px; }

/* Demo */
.pdp-demo {
  position: relative; overflow: hidden; isolation: isolate; margin: 0 clamp(16px, 4vw, 80px) clamp(48px, 6vw, 80px);
  padding: clamp(40px, 5vw, 72px); border-radius: 32px; color: #FFFFFF;
  display: grid; grid-template-columns: 1fr minmax(300px, 460px); gap: clamp(32px, 5vw, 72px); align-items: center;
  background: linear-gradient(120deg, #1E5BFF 0%, #7B3FE4 45%, #FF2D75 100%);
}
.pdp-demo::before {
  content: ""; position: absolute; inset: 0; z-index: -1; opacity: .25;
  background-image: radial-gradient(rgba(255, 255, 255, .9) 2px, transparent 2.4px); background-size: 18px 18px;
}
.pdp-demo h2 { margin: 0 0 14px; font-size: clamp(30px, 4vw, 46px); font-weight: 800; letter-spacing: -0.02em; }
.pdp-demo-copy > p { margin: 0 0 24px; font-size: 17px; line-height: 1.65; color: rgba(255, 255, 255, .9); }
.pdp-demo ul { display: grid; gap: 12px; margin: 0; padding: 0; list-style: none; }
.pdp-demo li { display: flex; align-items: center; gap: 10px; font-weight: 500; }
.pdp-demo li svg { width: 22px; height: 22px; padding: 4px; border-radius: 50%; background: rgba(255, 255, 255, .25); }
.pdp-form { display: grid; gap: 16px; padding: 26px; border-radius: 22px; background: rgba(255, 255, 255, .12); backdrop-filter: blur(12px); }
.pdp-form label { display: grid; gap: 6px; font-size: 14px; font-weight: 500; }
.pdp-form input, .pdp-form select {
  padding: 13px 15px; border-radius: 12px; border: 1px solid rgba(255, 255, 255, .3);
  background: rgba(255, 255, 255, .95); color: var(--ink); font: 16px var(--font);
}
.pdp-form input:focus, .pdp-form select:focus { outline: none; border-color: #FFFFFF; box-shadow: 0 0 0 4px rgba(255, 255, 255, .35); }
.pdp-thanks { padding: 26px; border-radius: 22px; background: rgba(255, 255, 255, .12); }
.pdp-thanks h3 { margin: 0 0 8px; font-size: 26px; font-weight: 800; }
.pdp-thanks p { margin: 0; color: rgba(255, 255, 255, .9); }

@media (max-width: 1024px) {
  .pdp-stats { grid-template-columns: repeat(2, 1fr); }
  .pdp-featured-list { grid-template-columns: 1fr; }
}
@media (max-width: 900px) {
  .pdp-feat-layout { grid-template-columns: 1fr; }
  .pdp-feat-nav { position: static; grid-template-columns: repeat(2, 1fr); }
  .pdp-groups { grid-template-columns: 1fr; }
  .pdp-addon-grid { grid-template-columns: 1fr; }
  .pdp-total { grid-template-columns: 1fr; }
  .pdp-ratings-grid { grid-template-columns: 1fr; }
  .pdp-demo { grid-template-columns: 1fr; }
}
@media (max-width: 560px) {
  .pdp-feat-nav { grid-template-columns: 1fr; }
  .pdp-stats { grid-template-columns: 1fr 1fr; gap: 12px; }
  .pdp-stats strong { font-size: 26px; }
  .pdp-top-actions .pd-back-top { display: none; }
  .pdp-demo { margin-inline: 12px; border-radius: 24px; }
}

/* ---------- FAQ ---------- */
.faq { display: grid; grid-template-columns: minmax(240px, 1fr) 1.6fr; gap: clamp(28px, 5vw, 80px); align-items: start; }
.faq-intro h2 { margin: 0 0 14px; font-size: clamp(30px, 4vw, 46px); font-weight: 800; letter-spacing: -0.03em; line-height: 1.08; }
.faq-intro p { margin: 0; color: var(--ink-soft); font-size: 17px; line-height: 1.6; }
.faq-intro a { color: var(--ink); font-weight: 600; }
.faq-item { border-bottom: 1px solid var(--line); }
.faq-item summary {
  list-style: none; cursor: pointer; display: flex; justify-content: space-between; align-items: center; gap: 20px;
  padding: 22px 4px; font-size: 19px; font-weight: 700;
  transition: color .25s, padding-left .3s var(--ease);
}
.faq-item summary::-webkit-details-marker { display: none; }
.faq-item summary:hover { color: #1E5BFF; padding-left: 10px; }
.faq-icon { position: relative; width: 14px; height: 14px; flex-shrink: 0; }
.faq-icon::before, .faq-icon::after {
  content: ""; position: absolute; left: 0; top: 50%; width: 14px; height: 2px; border-radius: 2px;
  background: currentColor; transition: transform .3s var(--ease);
}
.faq-icon::after { transform: rotate(90deg); }
.faq-item[open] .faq-icon::after { transform: rotate(0deg); }
.faq-item p { margin: 0; padding: 0 4px 24px; color: var(--ink-soft); font-size: 16px; line-height: 1.65; animation: rise .35s var(--ease) both; }

/* ---------- Closing call-to-action ---------- */
.cta-band {
  position: relative; overflow: hidden; isolation: isolate; text-align: center; color: #FFFFFF;
  margin: 0 clamp(16px, 4vw, 80px) clamp(56px, 8vw, 100px);
  padding: clamp(48px, 7vw, 88px) clamp(24px, 5vw, 72px); border-radius: 32px; background: var(--ink);
}
.cta-band::before {
  content: ""; position: absolute; inset: 0; z-index: -1;
  background:
    radial-gradient(600px 300px at 15% 0%, rgba(61,229,255,.45), transparent 70%),
    radial-gradient(600px 300px at 90% 100%, rgba(255,45,117,.5), transparent 70%);
}
.cta-band h2 { margin: 0 0 14px; font-size: clamp(32px, 5vw, 58px); font-weight: 800; letter-spacing: -0.03em; line-height: 1.05; }
.cta-band p { margin: 0 auto 32px; max-width: 52ch; color: rgba(255,255,255,.85); font-size: 18px; line-height: 1.6; }
.cta-band .hero-actions { animation: none; }

/* ---------- Responsive ---------- */
@media (max-width: 900px) {
  .feature-row, .ai, .faq { grid-template-columns: 1fr; }
  .feature-row.flip .feature-art { order: 0; }
  .plan.is-popular { transform: none; }
  .plan.is-popular:hover { transform: translateY(-8px); }
}

@media (max-width: 560px) {
  .logo-chip { padding: 10px 16px; font-size: 14px; }
  .plan-grid, .quote-grid { gap: 18px; }
  .faq-item summary { font-size: 17px; }
  .cta-band { margin-inline: 12px; border-radius: 24px; }
}

/* ---------- Services ---------- */
.services { position: relative; z-index: 2; padding: clamp(64px, 9vw, 110px) clamp(20px, 5vw, 80px); }
.service-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(270px, 1fr)); gap: 24px; margin-top: 52px; }
.service-card {
  position: relative; isolation: isolate; overflow: hidden; padding: 34px 30px; border-radius: 26px;
  background: #FFFFFF; border: 1px solid var(--line);
  transition: transform .4s var(--ease), box-shadow .4s var(--ease), border-color .4s;
}
.service-card::before {
  content: ""; position: absolute; inset: 0; z-index: -1; opacity: 0;
  background: linear-gradient(120deg, #1E5BFF 0%, #7B3FE4 50%, #FF2D75 100%);
  transition: opacity .4s var(--ease);
}
.service-card:hover { transform: translateY(-8px); box-shadow: 0 30px 60px rgba(20,27,51,.14); border-color: transparent; }
.service-card:hover::before { opacity: 1; }
.service-icon {
  display: grid; place-items: center; width: 54px; height: 54px; margin-bottom: 22px; border-radius: 16px;
  background: var(--paper); color: var(--ink);
  transition: background .4s, color .4s, transform .4s var(--ease);
}
.service-card:hover .service-icon { background: rgba(255,255,255,.2); color: #FFFFFF; transform: rotate(-6deg) scale(1.05); }
.service-card h3 { margin: 0 0 10px; font-size: 22px; font-weight: 700; transition: color .4s; }
.service-card p { margin: 0 0 20px; color: var(--ink-soft); line-height: 1.6; transition: color .4s; }
.service-card .text-link { color: var(--ink); transition: color .4s, background-size .35s var(--ease), gap .3s var(--ease); }
.service-card:hover h3 { color: #FFFFFF; }
.service-card:hover p { color: rgba(255,255,255,.9); }
.service-card:hover .text-link { color: #FFFFFF; background-image: linear-gradient(#FFFFFF, #FFFFFF); }

/* ---------- Services: dark theme ---------- */
.services {
  overflow: hidden; color: #FFFFFF;
  background:
    radial-gradient(900px 520px at 12% 0%, rgba(30, 91, 255, .38), transparent 70%),
    radial-gradient(800px 520px at 92% 100%, rgba(255, 45, 117, .26), transparent 70%),
    #0B1024;
}
.particles { position: absolute; inset: 0; width: 100%; height: 100%; z-index: 0; pointer-events: none; }
.services > .section-head,
.services > .service-grid { position: relative; z-index: 1; }
.services .section-head h2 { color: #FFFFFF; }
.services .section-head p { color: #AEB8D4; }
.services .service-card {
  background: rgba(255, 255, 255, .05); border-color: rgba(255, 255, 255, .12);
  backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
}
.services .service-card:hover { box-shadow: 0 30px 70px rgba(0, 0, 0, .4); }
.services .service-card h3 { color: #FFFFFF; }
.services .service-card p { color: #AEB8D4; }
.services .service-icon { background: rgba(255, 255, 255, .08); color: #66E7FF; }
.services .service-card .text-link { color: #FFFFFF; }

/* ---------- Portfolio ---------- */
.portfolio {
  position: relative; z-index: 2; padding: clamp(64px, 9vw, 110px) clamp(20px, 5vw, 80px);
  background: #FFFFFF; border-block: 1px solid var(--line);
}
.pf-filters { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin-bottom: 48px; }
.pf-filter {
  padding: 11px 20px; border-radius: 999px; border: 1px solid var(--line); background: #FFFFFF;
  font: 600 15px var(--font); color: var(--ink); cursor: pointer;
  transition: transform .25s var(--ease), background-color .25s, color .25s, border-color .25s;
}
.pf-filter:hover { transform: translateY(-2px); border-color: var(--ink); }
.pf-filter.is-active { background: var(--ink); color: #FFFFFF; border-color: var(--ink); }
.pf-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 40px 28px; }
.pf-card {
  transform: perspective(900px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg));
  transition: transform .35s var(--ease); will-change: transform;
}
.pf-media {
  position: relative; overflow: hidden; border-radius: 24px; box-shadow: 0 24px 50px rgba(20,27,51,.12);
  transition: box-shadow .4s var(--ease);
}
.pf-card:hover .pf-media { box-shadow: 0 34px 70px rgba(20,27,51,.22); }
/* The artwork moves slightly against the scroll (--py is set by useParallax) and is scaled up so its edges never show. */
.pf-media > .art-img {
  display: block; width: 100%; height: auto; will-change: transform;
  transform: translate3d(0, calc(var(--py, 0) * 1px), 0) scale(1.12);
}
.pf-overlay {
  position: absolute; inset: 0; display: grid; place-items: center;
  background: linear-gradient(180deg, rgba(20,27,51,0) 30%, rgba(20,27,51,.78) 100%);
  opacity: 0; transition: opacity .4s var(--ease);
}
.pf-overlay span {
  padding: 12px 20px; border-radius: 999px; background: #FFFFFF; color: var(--ink); font-weight: 700;
  transform: translateY(14px); transition: transform .45s var(--ease);
}
.pf-card:hover .pf-overlay { opacity: 1; }
.pf-card:hover .pf-overlay span { transform: none; }
.pf-meta { display: flex; flex-direction: column; gap: 4px; margin-top: 20px; }
.pf-cat {
  align-self: flex-start; padding: 4px 10px; border-radius: 999px;
  background: var(--paper); color: var(--ink-soft); font-size: 13px; font-weight: 600;
}
.pf-meta h3 { margin: 6px 0 0; font-size: 22px; font-weight: 700; letter-spacing: -0.01em; }
.pf-meta p { margin: 0; color: var(--ink-soft); }
@media (prefers-reduced-motion: reduce) {
  .pf-card { transform: none; }
  .pf-media > .art-img { transform: scale(1.12); }
}

/* ---------- Team ---------- */
.team { position: relative; z-index: 2; padding: clamp(64px, 9vw, 110px) clamp(20px, 5vw, 80px); }
.team-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 26px; margin-top: 52px; }
.team-card {
  padding: 32px 26px; border-radius: 26px; background: #FFFFFF; border: 1px solid var(--line); text-align: center;
  transition: transform .4s var(--ease), box-shadow .4s var(--ease);
}
.team-card:hover { transform: translateY(-8px); box-shadow: 0 28px 56px rgba(20,27,51,.12); }
.team-avatar {
  width: 124px; height: 124px; margin: 0 auto 22px; border-radius: 40px;
  display: grid; place-items: center; color: #FFFFFF; font-size: 38px; font-weight: 800; letter-spacing: -0.02em;
  background: linear-gradient(135deg, var(--from), var(--to));
  transition: transform .5s var(--ease), border-radius .5s var(--ease);
}
.team-card:hover .team-avatar { transform: rotate(-6deg) scale(1.06); border-radius: 60px; }
.team-card h3 { margin: 0; font-size: 21px; font-weight: 700; }
.team-role {
  margin: 6px 0 12px; font-weight: 600;
  background: linear-gradient(120deg, #1E5BFF, #FF2D75); -webkit-background-clip: text; background-clip: text; color: transparent;
}
.team-bio { margin: 0 0 18px; color: var(--ink-soft); font-size: 15px; line-height: 1.6; }
.team-social { display: flex; justify-content: center; gap: 10px; }
.team-social a {
  display: grid; place-items: center; width: 38px; height: 38px; border-radius: 50%;
  background: var(--paper); color: var(--ink); font-weight: 700; font-size: 14px; text-decoration: none;
  transition: background-color .3s, color .3s, transform .3s var(--ease);
}
.team-social a:hover { background: var(--ink); color: #FFFFFF; transform: translateY(-3px); }

/* ---------- Responsive (existing) ---------- */
@media (max-width: 1024px) {
  .nav-links { gap: 20px; font-size: 15px; }
  .showcase { grid-template-columns: 1fr; }
  .rail { flex-direction: row; overflow-x: auto; padding: 6px 2px 14px; scroll-snap-type: x proximity; scrollbar-width: none; }
  .rail::-webkit-scrollbar { display: none; }
  .rail-item { min-width: 250px; scroll-snap-align: start; border-left: 0; border-bottom: 3px solid transparent; }
  .rail-item.is-active { border-bottom-color: var(--item-color); }
  .rail-item:hover { transform: translateY(-3px); }
  .stage { grid-template-columns: 1fr; }
  .contact { grid-template-columns: 1fr; }
}

@media (max-width: 900px) {
  .nav-links { display: none; }
  .menu-toggle { display: flex; }
  .nav-cta { display: none; }
  .mobile-menu {
    position: absolute; top: 100%; left: 12px; right: 12px; display: none; flex-direction: column; gap: 4px;
    padding: 12px; border-radius: 20px; background: rgba(20,27,51,.94); backdrop-filter: blur(14px);
    box-shadow: 0 24px 50px rgba(0,0,0,.25);
  }
  .nav.is-open .mobile-menu { display: flex; animation: rise .35s var(--ease) both; }
  .mobile-menu a { padding: 14px 16px; font-size: 17px; font-weight: 600; color: #FFFFFF; text-decoration: none; border-radius: 12px; }
  .mobile-menu a:hover { background: rgba(255,255,255,.1); }
  .mobile-menu a::after { display: none; }
  .mobile-menu .btn { margin-top: 8px; background: #FFFFFF; color: var(--ink); justify-content: center; }
  .mobile-menu .badge { margin-left: 8px; }
}

@media (max-width: 560px) {
  .nav { padding: 14px 18px; }
  .brand { font-size: 21px; }
  .hero { padding-top: 120px; }
  .hero-actions .btn { width: 100%; max-width: 320px; }
  .hero-checks { gap: 10px 20px; font-size: 14px; }
  .blob { filter: blur(40px); }
  .swoosh path:nth-child(n+3) { display: none; }
  .play-row { display: none; }
  .demo-form { padding: 18px; }
  .contact { margin-inline: 12px; border-radius: 24px; }
  .why-item { padding: 24px; }
  .footer { flex-direction: column; align-items: flex-start; }
}
`;
