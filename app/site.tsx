import type { Metadata } from "next";
import Link from "next/link";

type Metric = {
  label: string;
  value: string;
};

type Service = {
  title: string;
  copy: string;
};

type BusinessLine = {
  slug: string;
  name: string;
  label: string;
  summary: string;
  story: string;
  services: Service[];
  proof: Metric[];
  image: string;
  imageAlt: string;
  motion: string;
  motif: string[];
  cta: string;
};

type Page = {
  slug: string;
  navLabel: string;
  title: string;
  description: string;
  eyebrow: string;
  headline: string;
  intro: string;
  kind:
    | "story"
    | "business-index"
    | "business"
    | "impact"
    | "foundations"
    | "careers"
    | "contact"
    | "news"
    | "legal";
  sections?: Array<{
    title: string;
    copy: string;
    items?: string[];
  }>;
  legalBody?: string[];
  business?: BusinessLine;
};

const logoUrl = "https://www.pamtechgroup.com/logo.svg";

const businessLines: BusinessLine[] = [
  {
    slug: "oil-gas",
    name: "Oil & Gas",
    label: "Reliable Energy Movement",
    summary:
      "Powering Nigeria's energy future with reliable fuel distribution and innovative petroleum solutions.",
    story:
      "Pamtech Oil and Gas began in 2016 after identifying a critical gap in Nigeria's downstream sector. The business is built around disciplined trading, dependable distribution, and practical energy support for fleets, businesses, and communities.",
    services: [
      { title: "Fuel Distribution", copy: "Reliable movement of petroleum products to customers and partners." },
      { title: "Fleet Management", copy: "Coordinated support for business mobility and fuel needs." },
      { title: "Bulk Supply", copy: "Structured supply for organizations with larger energy demand." },
      { title: "Energy Consulting", copy: "Practical guidance for fuel planning and operating efficiency." },
    ],
    proof: [
      { value: "750M+", label: "Liters Fuel Delivered" },
      { value: "2016", label: "Founded In Owerri" },
      { value: "10+", label: "Years Of Excellence" },
    ],
    image:
      "https://www.pamtechgroup.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Foil_and_gas.becfa23e.png&w=1920&q=75",
    imageAlt: "Pamtech fuel distribution operation with branded trucks.",
    motion:
      "A supply route moves across the page, connecting depot, fleet, customer, and distribution checkpoints as proof points appear.",
    motif: ["Route line", "Fuel movement", "Distribution checkpoints", "Fleet cards"],
    cta: "Make An Inquiry",
  },
  {
    slug: "autoland",
    name: "Autoland",
    label: "Automotive Trust",
    summary:
      "A professional automotive ecosystem for vehicle sales, maintenance, service, parts, and fleet support.",
    story:
      "Pamtech Autoland was built to bring transparency, proper vehicle history tracking, professional diagnostics, and reliable service delivery into one coordinated ecosystem.",
    services: [
      { title: "Vehicle Sales", copy: "Quality vehicle access with a stronger trust layer." },
      { title: "Maintenance & Repair", copy: "Professional garage support and diagnostics." },
      { title: "Parts & Accessories", copy: "Integrated support for genuine parts and accessories." },
      { title: "Fleet Services", copy: "Service coordination for organizational and commercial fleets." },
    ],
    proof: [
      { value: "2", label: "State-Of-The-Art Garages" },
      { value: "150+", label: "Employees" },
      { value: "2021", label: "Autoland Launch" },
    ],
    image:
      "https://www.pamtechgroup.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fauto_land.6170b133.png&w=1920&q=75",
    imageAlt: "Pamtech Autoland service and vehicle environment.",
    motion:
      "A vehicle advances through diagnosis, service bay, parts confirmation, quality check, and customer handoff.",
    motif: ["Diagnostic scan", "Service bay", "Repair checklist", "Vehicle handoff"],
    cta: "View Services",
  },
  {
    slug: "autoparts",
    name: "Autoparts",
    label: "Genuine Parts Access",
    summary:
      "Supplying genuine, high-quality automotive parts to keep vehicles running at peak performance.",
    story:
      "Pamtech Autoparts supports drivers, garages, fleet operators, and wholesale customers with dependable access to parts, accessories, and technical support.",
    services: [
      { title: "Genuine Parts", copy: "Reliable parts with a focus on authenticity and fit." },
      { title: "Accessories", copy: "Vehicle accessories that support performance and usability." },
      { title: "Wholesale Supply", copy: "Parts access for businesses and repeat buyers." },
      { title: "Technical Support", copy: "Guidance that helps customers choose the right parts." },
    ],
    proof: [
      { value: "2", label: "Regional Spare Part Plazas" },
      { value: "South-East", label: "Market Presence" },
      { value: "South-South", label: "Market Presence" },
    ],
    image:
      "https://www.pamtechgroup.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fauto_parts.565a770a.png&w=1920&q=75",
    imageAlt: "Pamtech automotive parts and accessories.",
    motion:
      "Parts categories reveal from inventory shelves, pass through an authenticity check, and resolve into customer fulfillment.",
    motif: ["Inventory grid", "Part highlight", "Authenticity mark", "Fulfillment path"],
    cta: "Request Parts",
  },
  {
    slug: "luxury-ride",
    name: "Luxury Ride",
    label: "Premium Mobility",
    summary:
      "Premium transportation with comfort, safety, chauffeur support, and corporate mobility packages.",
    story:
      "Pamtech Luxury Ride redefines elegance and comfort with an exclusive fleet of premium vehicles tailored for personal, corporate, airport, and event needs.",
    services: [
      { title: "Executive Transport", copy: "Premium rides for leaders, teams, and high-value movement." },
      { title: "Event Services", copy: "Coordinated mobility for ceremonies, events, and special programs." },
      { title: "Airport Transfers", copy: "Reliable pick-up and arrival experiences." },
      { title: "Corporate Packages", copy: "Structured transport support for organizations." },
    ],
    proof: [
      { value: "30+", label: "SUVs" },
      { value: "2+", label: "Coaster Buses" },
      { value: "2022", label: "Luxury Transportation Milestone" },
    ],
    image:
      "https://www.pamtechgroup.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fluxury_ride.0c9b10cd.png&w=1920&q=75",
    imageAlt: "Pamtech Luxury Ride vehicle fleet.",
    motion:
      "A premium route moves from booking to chauffeur assignment, ride experience, and arrival.",
    motif: ["Booking step", "Route progression", "Chauffeur detail", "Arrival moment"],
    cta: "Book A Ride",
  },
  {
    slug: "media",
    name: "Media",
    label: "Reach And Community",
    summary:
      "Connecting communities through compelling content, broadcasting excellence, and digital innovation.",
    story:
      "Pamtech Media uses content and storytelling to build community, support business growth, and drive customer success across digital and broadcast channels.",
    services: [
      { title: "Broadcasting", copy: "Audience-centered programming and communication." },
      { title: "Content Production", copy: "Story development, filming, editing, and publishing workflows." },
      { title: "Digital Media", copy: "Digital-first channels for reach, attention, and community." },
      { title: "Advertising Solutions", copy: "Campaign support for brands and businesses." },
    ],
    proof: [
      { value: "2B+", label: "People Reached" },
      { value: "2.5M+", label: "Combined Followers" },
      { value: "15+", label: "In-House Influencers" },
    ],
    image:
      "https://www.pamtechgroup.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fpamtech_media.15fde7b6.jpg&w=1920&q=75",
    imageAlt: "Pamtech Media content and communications visual.",
    motion:
      "One content idea expands into channel tiles, audience ripples, reach counters, and community outcomes.",
    motif: ["Content tile", "Ripple effect", "Channel expansion", "Reach counter"],
    cta: "Start A Campaign",
  },
  {
    slug: "technology",
    name: "Technology",
    label: "Useful Digital Products",
    summary:
      "Digital solutions, product ecosystems, cloud services, and infrastructure that improve how people live and work.",
    story:
      "Pamtech Technology is focused on becoming Africa's most innovative and people-centered technology company, known for practical products that improve daily life and business workflows.",
    services: [
      { title: "Software Development", copy: "Product design and software systems for real business needs." },
      { title: "Cloud Solutions", copy: "Infrastructure and deployment support for modern operations." },
      { title: "IT Consulting", copy: "Technical guidance for organizations and teams." },
      { title: "Digital Infrastructure", copy: "Foundational systems for scalable digital transformation." },
    ],
    proof: [
      { value: "Carcare", label: "App And Garage" },
      { value: "Petrol Padi", label: "Product Ecosystem" },
      { value: "Learn", label: "With Pamtech" },
    ],
    image:
      "https://www.pamtechgroup.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fpamtech_tech.5af8f3ae.jpg&w=1920&q=75",
    imageAlt: "Pamtech Technology product and software visual.",
    motion:
      "User problems branch into product cards for Carcare App, Carcare Garage, Petrol Padi, and Learn With Pamtech.",
    motif: ["Device frames", "Product cards", "Connected nodes", "Workflow reveal"],
    cta: "Request Demo",
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    label: "Homes And Wealth",
    summary:
      "Creating landmark properties and sustainable communities for modern living and investment.",
    story:
      "Pamtech Properties & Real Estate launched to create places people can call home and smarter opportunities for building wealth.",
    services: [
      { title: "Property Development", copy: "Development of homes, estates, and community environments." },
      { title: "Sales & Leasing", copy: "Support for buyers, tenants, and investors." },
      { title: "Property Management", copy: "Ongoing management for quality and continuity." },
      { title: "Investment Advisory", copy: "Practical guidance for real estate wealth-building decisions." },
    ],
    proof: [
      { value: "08", label: "City Garden" },
      { value: "150+", label: "Smart Homes" },
      { value: "Wealth", label: "Campus" },
    ],
    image:
      "https://www.pamtechgroup.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Freal_estate.4bac5a31.png&w=1920&q=75",
    imageAlt: "Pamtech real estate development visual.",
    motion:
      "A land grid reveals roads, homes, community spaces, and investment proof points as the user scrolls.",
    motif: ["Land grid", "Building layers", "Home reveal", "Community map"],
    cta: "Make An Inquiry",
  },
];

const impactMetrics: Metric[] = [
  { value: "100,000+", label: "Customers Served" },
  { value: "25,000+", label: "Vehicles Maintained" },
  { value: "750M+", label: "Liters Fuel Delivered" },
  { value: "25M+", label: "Lives Impacted" },
  { value: "10+", label: "Years Of Excellence" },
  { value: "7", label: "Business Lines" },
];

const pages: Page[] = [
  {
    slug: "our-story",
    navLabel: "Our Story",
    title: "Our Story",
    description:
      "Pamtech Group's journey from a team of three to a multi-sector group committed to serving humanity.",
    eyebrow: "Our Journey",
    headline: "From a team of three to a group built for impact.",
    intro:
      "Pamtech Group's story is a decade-long movement of intentional growth, disciplined expansion, and committed service to humanity.",
    kind: "story",
    sections: [
      {
        title: "2016 - The Beginning",
        copy:
          "Pamtech Oil and Gas began in Owerri, Imo State after identifying a critical gap in Nigeria's downstream sector.",
        items: [
          "Founded in Owerri, Imo State",
          "Started with a team of 3 and expanded gradually",
          "Built a foundation for disciplined trading and distribution",
        ],
      },
      {
        title: "2021 - Autoland",
        copy:
          "Pamtech Autoland launched to bring transparency, professional diagnostics, and reliable service into one automotive ecosystem.",
        items: ["2 state-of-the-art garages", "150+ employees", "Regional South-East and South-South presence"],
      },
      {
        title: "2022 - Luxury Ride",
        copy:
          "Pamtech Luxury Ride expanded the group into premium transportation for personal, corporate, and event needs.",
        items: ["30+ SUVs", "2+ coaster buses", "Premium transport for personal and corporate needs"],
      },
      {
        title: "2023 - Media & Communications",
        copy:
          "Pamtech Media grew a community-centered content and storytelling platform for business growth and customer success.",
        items: ["2B+ people reached", "2.5M+ combined followers", "15+ in-house influencers"],
      },
      {
        title: "2025 - Digital Innovation",
        copy:
          "Pamtech Technology began building useful digital products that improve how people live, learn, and do business.",
        items: ["Carcare App", "Carcare Garage", "Petrol Padi", "Learn With Pamtech"],
      },
      {
        title: "2026 - Real Estate",
        copy:
          "Pamtech Properties & Real Estate launched to create homes, smart communities, and wealth-building opportunities.",
        items: ["08 City Garden", "Wealth Campus", "150+ smart homes"],
      },
    ],
  },
  {
    slug: "business-lines",
    navLabel: "Business Lines",
    title: "Business Lines",
    description:
      "Explore Pamtech Group's seven business lines across energy, mobility, media, technology, and real estate.",
    eyebrow: "Seven Business Lines",
    headline: "Diverse expertise, unified purpose.",
    intro:
      "Each Pamtech business line solves a real operational, customer, or community need while carrying the group promise of service.",
    kind: "business-index",
  },
  {
    slug: "impact",
    navLabel: "Impact",
    title: "Impact",
    description:
      "Pamtech Group impact metrics, commercial proof, community value, and the path into Foundations.",
    eyebrow: "Impact Overview",
    headline: "Growth that serves people.",
    intro:
      "Across energy, mobility, media, technology, and real estate, Pamtech measures success by the lives, businesses, and communities improved.",
    kind: "impact",
    sections: [
      {
        title: "Industry Impact",
        copy:
          "Pamtech supports daily operations across fuel distribution, vehicle maintenance, media reach, digital products, and real estate development.",
      },
      {
        title: "Customer Impact",
        copy:
          "More than 100,000 customers have been served through the group's expanding business ecosystem.",
      },
      {
        title: "Community Impact",
        copy:
          "The group's service mission extends beyond commerce into education, empowerment, and community development.",
      },
      {
        title: "Skills And Employment",
        copy:
          "Pamtech's growth creates opportunities for operators, technologists, creatives, mechanics, service teams, and community workers.",
      },
    ],
  },
  {
    slug: "impact/foundations",
    navLabel: "Foundations",
    title: "Foundations",
    description:
      "Pamtech Foundation programs, beneficiaries, education support, grants, youth empowerment, and community development.",
    eyebrow: "Pamtech Foundations",
    headline: "Service to humanity made practical.",
    intro:
      "Pamtech Foundations houses the group's human-impact work through education, empowerment, community development, and youth-focused programs.",
    kind: "foundations",
    sections: [
      {
        title: "DAD4Adolescents",
        copy:
          "A youth-centered program focused on development, guidance, and practical support for adolescents.",
      },
      {
        title: "1000+ Beneficiaries",
        copy:
          "Foundation programs have reached more than 1000 beneficiaries through community-centered support.",
      },
      {
        title: "Business Grants And Empowerment",
        copy:
          "Pamtech supports empowerment by helping people access business grants, training, and opportunity pathways.",
      },
      {
        title: "Education, Health And Community",
        copy:
          "Programs include education support, healthcare access, community development, and youth empowerment.",
      },
    ],
  },
  {
    slug: "careers",
    navLabel: "Careers",
    title: "Careers",
    description:
      "Build your career across Pamtech Group's business lines, teams, and growing operations.",
    eyebrow: "Careers",
    headline: "Build your career across a growing group.",
    intro:
      "Join a team of innovators, operators, builders, creatives, and problem-solvers shaping industries across Nigeria.",
    kind: "careers",
    sections: [
      {
        title: "Why Work At Pamtech",
        copy:
          "Pamtech offers exposure to multiple industries, practical learning, and the opportunity to contribute to work that serves people.",
      },
      {
        title: "Teams And Business Areas",
        copy:
          "Opportunities can span energy, automotive service, parts, transportation, media, technology, real estate, and foundations.",
      },
      {
        title: "Culture And Values",
        copy:
          "The group values excellence, service, ownership, problem-solving, innovation, and community-minded growth.",
      },
      {
        title: "Open Roles Placeholder",
        copy:
          "The careers listing can connect to a recruitment system later. For now, this area is ready for editable role cards.",
      },
    ],
  },
  {
    slug: "contact",
    navLabel: "Contact",
    title: "Contact",
    description:
      "Reach Pamtech Group by office, phone, email, or inquiry form across business lines.",
    eyebrow: "Contact",
    headline: "Start a conversation.",
    intro:
      "Reach the right Pamtech team across our offices, business lines, and partnership channels.",
    kind: "contact",
  },
  {
    slug: "news",
    navLabel: "News & Updates",
    title: "News & Updates",
    description:
      "Pamtech Group announcements, business updates, foundation stories, careers news, and media updates.",
    eyebrow: "Newsroom",
    headline: "Updates from across the group.",
    intro:
      "A dedicated home for group announcements, business-line updates, foundation stories, careers news, and media activity.",
    kind: "news",
  },
  {
    slug: "privacy-policy",
    navLabel: "Privacy Policy",
    title: "Privacy Policy",
    description: "Pamtech Group website privacy policy and public contact information.",
    eyebrow: "Legal",
    headline: "Privacy Policy",
    intro:
      "This page should use the current privacy content as the starting point and preserve both official public emails.",
    kind: "legal",
    legalBody: [
      "Pamtech Group respects the privacy of visitors, customers, applicants, partners, and stakeholders who use this website.",
      "The redesigned policy should explain what information may be collected through forms, analytics, communication channels, and website interactions.",
      "Both official emails should appear for privacy-related contact: info@pamtech.com and info@pamtechgroup.com.",
      "Final legal language should be reviewed before launch.",
    ],
  },
  {
    slug: "terms-of-service",
    navLabel: "Terms of Service",
    title: "Terms of Service",
    description: "Pamtech Group website terms covering use, content, disclaimers, and links.",
    eyebrow: "Legal",
    headline: "Terms Of Service",
    intro:
      "A standard public terms page for website use, content ownership, disclaimers, external links, and contact details.",
    kind: "legal",
    legalBody: [
      "Visitors may use this website to learn about Pamtech Group, its business lines, impact work, careers, and public contact channels.",
      "All brand assets, page content, imagery, and business information should be treated as Pamtech Group property unless otherwise stated.",
      "The final page should include disclaimers for placeholder CTAs, third-party links, and informational content.",
      "Final legal language should be reviewed before launch.",
    ],
  },
  {
    slug: "cookie-policy",
    navLabel: "Cookie Policy",
    title: "Cookie Policy",
    description: "Pamtech Group cookie policy for essential, analytics, and optional marketing cookies.",
    eyebrow: "Legal",
    headline: "Cookie Policy",
    intro:
      "A simple cookie policy explaining essential, analytics, and optional marketing cookies if used.",
    kind: "legal",
    legalBody: [
      "This website may use essential cookies to support navigation, security, form behavior, and basic site functionality.",
      "Analytics cookies should only be used if the final implementation includes analytics.",
      "Marketing cookies should only be described if marketing pixels or advertising tools are added.",
      "Final legal language should be reviewed before launch.",
    ],
  },
];

const businessPages: Page[] = businessLines.map((business) => ({
  slug: `business-lines/${business.slug}`,
  navLabel: business.name,
  title: business.name,
  description: business.summary,
  eyebrow: business.label,
  headline: business.name,
  intro: business.summary,
  kind: "business",
  business,
}));

export const allPages = [...pages, ...businessPages];

export function getPage(slug?: string[]) {
  const path = slug?.join("/") ?? "";
  return allPages.find((page) => page.slug === path);
}

export function routeParams() {
  return allPages.map((page) => ({ slug: page.slug.split("/") }));
}

export function pageMetadata(page?: Page): Metadata {
  const title = page ? `${page.title} | Pamtech Group` : "Pamtech Group";
  const description =
    page?.description ??
    "Pamtech Group is a Nigerian multi-sector company committed to service, innovation, and operational excellence.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: "Pamtech Group",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link href="/" className="brand-link" aria-label="Pamtech Group home">
        <img src={logoUrl} alt="Pamtech logo" />
      </Link>

      <nav className="desktop-nav" aria-label="Primary navigation">
        <Link href="/our-story">Our Story</Link>
        <details className="nav-dropdown">
          <summary>Business Lines</summary>
          <div className="dropdown-panel">
            <Link href="/business-lines">Overview</Link>
            {businessLines.map((line) => (
              <Link key={line.slug} href={`/business-lines/${line.slug}`}>
                {line.name}
              </Link>
            ))}
          </div>
        </details>
        <details className="nav-dropdown">
          <summary>Impact</summary>
          <div className="dropdown-panel">
            <Link href="/impact">Impact Overview</Link>
            <Link href="/impact/foundations">Foundations</Link>
          </div>
        </details>
        <Link href="/careers">Careers</Link>
        <Link href="/contact">Contact</Link>
      </nav>

      <details className="mobile-nav">
        <summary aria-label="Open navigation menu">
          <span>Menu</span>
        </summary>
        <div className="mobile-panel">
          <Link href="/our-story">Our Story</Link>
          <Link href="/business-lines">Business Lines</Link>
          {businessLines.map((line) => (
            <Link key={line.slug} href={`/business-lines/${line.slug}`}>
              {line.name}
            </Link>
          ))}
          <Link href="/impact">Impact</Link>
          <Link href="/impact/foundations">Foundations</Link>
          <Link href="/careers">Careers</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/news">News & Updates</Link>
        </div>
      </details>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <img src={logoUrl} alt="Pamtech logo" className="footer-logo" />
          <p>
            Building tomorrow, serving today. Transforming industries and impacting lives across
            Nigeria and beyond.
          </p>
        </div>
        <div>
          <h2>Business Lines</h2>
          {businessLines.map((line) => (
            <Link key={line.slug} href={`/business-lines/${line.slug}`}>
              {line.name}
            </Link>
          ))}
        </div>
        <div>
          <h2>Quick Links</h2>
          <Link href="/our-story">Our Story</Link>
          <Link href="/impact">Impact</Link>
          <Link href="/impact/foundations">Foundations</Link>
          <Link href="/careers">Careers</Link>
          <Link href="/news">News & Updates</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div>
          <h2>Get In Touch</h2>
          <p>Plot CR17 Housing Area T, Port Harcourt Rd, behind Apams, New Owerri, Owerri, Imo State, Nigeria.</p>
          <p>No 3 Edward Woherem Avenue, Opposite Ruby Event Center, Beside Winners Chapel Church/Jackbina Filling Station, Rumuodara/Rumuodomaya, Rivers State, Nigeria.</p>
          <p>+234 811 500 4000</p>
          <p>0703 445 0400</p>
          <p>+234 803 7077 608</p>
          <p>info@pamtech.com</p>
          <p>info@pamtechgroup.com</p>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Pamtech Group. All rights reserved.</span>
        <div>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms-of-service">Terms of Service</Link>
          <Link href="/cookie-policy">Cookie Policy</Link>
        </div>
      </div>
    </footer>
  );
}

export function HomePage() {
  return (
    <>
      <section className="hero home-hero">
        <div className="hero-media" />
        <div className="hero-content reveal">
          <p className="eyebrow">Celebrating 10+ Years Of Excellence</p>
          <h1>Committed Service to Humanity</h1>
          <p>
            From energy and mobility to media, technology, and real estate, Pamtech Group is
            transforming industries across Nigeria with innovation and excellence.
          </p>
          <div className="hero-actions">
            <Link href="/business-lines" className="button primary">
              Explore Business Lines
            </Link>
            <a href="#" className="button secondary">
              Start a Conversation
            </a>
          </div>
          <MetricStrip
            metrics={[
              { value: "7", label: "Business Lines" },
              { value: "400+", label: "Team Members" },
              { value: "10+", label: "Years" },
            ]}
          />
        </div>
      </section>

      <section className="trusted-band">
        <p>Trusted by leading organizations across Nigeria</p>
        <div>
          {["World Bank", "Masters Energy", "Imo State Government", "Dangote", "First Bank", "GTBank", "Access Bank"].map(
            (name) => (
              <span key={name}>{name}</span>
            ),
          )}
        </div>
      </section>

      <section className="section">
        <SectionIntro
          eyebrow="Business Lines"
          title="Diverse expertise, unified purpose."
          copy="Each business line carries Pamtech's promise of operational excellence and committed service."
        />
        <BusinessGrid />
      </section>

      <section className="section split-section">
        <div>
          <p className="eyebrow">Our Story</p>
          <h2>A decade of intentional growth.</h2>
          <p>
            From a team of three to a multi-sector group, every milestone reflects a deliberate
            response to a real customer, industry, or community need.
          </p>
          <Link href="/our-story" className="text-link">
            Read Our Story
          </Link>
        </div>
        <div className="mini-timeline">
          {["2016 Oil & Gas", "2021 Autoland", "2022 Luxury Ride", "2023 Media", "2025 Technology", "2026 Real Estate"].map(
            (item) => (
              <span key={item}>{item}</span>
            ),
          )}
        </div>
      </section>

      <section className="section impact-preview">
        <SectionIntro
          eyebrow="Impact"
          title="Measurable excellence across every sector."
          copy="Pamtech's growth story is strongest when it is tied to the people, customers, and communities served."
        />
        <MetricGrid metrics={impactMetrics} />
        <Link href="/impact" className="button primary">
          View Our Impact
        </Link>
      </section>

      <section className="section product-preview">
        <SectionIntro
          eyebrow="Technology Products"
          title="Innovation that drives impact."
          copy="Pamtech's technology products are designed to make service, operations, learning, and mobility easier."
        />
        <div className="product-grid">
          {["Carcare App", "Carcare Garage", "Learn With Pamtech", "Petrol Padi"].map((product) => (
            <article key={product}>
              <span>Product</span>
              <h3>{product}</h3>
              <p>Placeholder product destination ready for future editing.</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section cta-split">
        <article>
          <p className="eyebrow">Careers</p>
          <h2>Build your career.</h2>
          <p>Join innovators, operators, builders, and problem-solvers across the group.</p>
          <Link href="/careers" className="button primary">
            View Open Positions
          </Link>
        </article>
        <article>
          <p className="eyebrow">Partnership</p>
          <h2>Partner with us.</h2>
          <p>Let&apos;s create value together across industries, customers, and communities.</p>
          <Link href="/contact" className="button secondary-dark">
            Start a Conversation
          </Link>
        </article>
      </section>
    </>
  );
}

export function RenderPage({ page }: { page: Page }) {
  if (page.kind === "business-index") return <BusinessIndexPage page={page} />;
  if (page.kind === "business" && page.business) return <BusinessPage business={page.business} />;
  if (page.kind === "story") return <StoryPage page={page} />;
  if (page.kind === "impact") return <ImpactPage page={page} />;
  if (page.kind === "foundations") return <FoundationsPage page={page} />;
  if (page.kind === "careers") return <SimplePage page={page} cta="View Open Positions" />;
  if (page.kind === "contact") return <ContactPage page={page} />;
  if (page.kind === "news") return <NewsPage page={page} />;
  return <LegalPage page={page} />;
}

function StoryPage({ page }: { page: Page }) {
  return (
    <>
      <PageHero page={page} videoLabel="Our Story video asset placeholder" />
      <section className="section timeline-section">
        <SectionIntro
          eyebrow="Milestones"
          title="A decade of intentional growth."
          copy="Each chapter marks Pamtech's movement into a new service area while preserving the same purpose."
        />
        <div className="timeline">
          {page.sections?.map((section) => (
            <article key={section.title}>
              <span>{section.title.split(" - ")[0]}</span>
              <h2>{section.title.split(" - ")[1]}</h2>
              <p>{section.copy}</p>
              {section.items ? (
                <ul>
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>
      </section>
      <FinalCta title="The journey continues." copy="Explore how Pamtech's story connects to measurable impact." href="/impact" label="See Our Impact" />
    </>
  );
}

function ImpactPage({ page }: { page: Page }) {
  return (
    <>
      <PageHero page={page} videoLabel="Impact video asset placeholder" />
      <section className="section impact-page">
        <MetricGrid metrics={impactMetrics} />
      </section>
      <section className="section pillar-grid">
        {page.sections?.map((section) => (
          <article key={section.title}>
            <p className="eyebrow">Impact Pillar</p>
            <h2>{section.title}</h2>
            <p>{section.copy}</p>
          </article>
        ))}
      </section>
      <FinalCta title="Foundations is where purpose becomes practical." copy="Explore Pamtech's community, youth, education, health, and empowerment work." href="/impact/foundations" label="Explore Foundations" />
    </>
  );
}

function FoundationsPage({ page }: { page: Page }) {
  return (
    <>
      <PageHero page={page} />
      <section className="section program-grid">
        {page.sections?.map((section) => (
          <article key={section.title}>
            <span>Program</span>
            <h2>{section.title}</h2>
            <p>{section.copy}</p>
          </article>
        ))}
      </section>
      <section className="section human-band">
        <div>
          <p className="eyebrow">Human Impact</p>
          <h2>Warm, respectful, evidence-led storytelling.</h2>
          <p>
            The final page should use real program imagery, consent-cleared beneficiary stories,
            and community visuals that feel authentic to Pamtech&apos;s work.
          </p>
        </div>
      </section>
      <FinalCta title="Partner with Foundations." copy="Support a program, start a conversation, or help expand the reach of Pamtech's service mission." href="#" label="Partner With Foundation" />
    </>
  );
}

function BusinessIndexPage({ page }: { page: Page }) {
  return (
    <>
      <PageHero page={page} />
      <section className="section">
        <BusinessGrid />
      </section>
      <FinalCta title="Need help choosing the right business line?" copy="Start with a group-level inquiry and the right team can route the conversation." href="/contact" label="Contact Pamtech" />
    </>
  );
}

function BusinessPage({ business }: { business: BusinessLine }) {
  return (
    <>
      <section className="business-hero">
        <div className="business-hero-copy">
          <p className="eyebrow">{business.label}</p>
          <h1>{business.name}</h1>
          <p>{business.summary}</p>
          <div className="hero-actions">
            <a href="#" className="button primary">
              {business.cta}
            </a>
            <Link href="/contact" className="button secondary-dark">
              Contact Pamtech
            </Link>
          </div>
        </div>
        <img src={business.image} alt={business.imageAlt} />
      </section>

      <section className="section split-section business-story">
        <div>
          <p className="eyebrow">Sector Story</p>
          <h2>{business.story}</h2>
        </div>
        <MetricGrid metrics={business.proof} compact />
      </section>

      <section className="section">
        <SectionIntro eyebrow="Key Services" title="What this business delivers." copy="Service areas are preserved from the current Pamtech website and expanded into a clearer page structure." />
        <div className="service-grid">
          {business.services.map((service) => (
            <article key={service.title}>
              <span>Service</span>
              <h3>{service.title}</h3>
              <p>{service.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section motion-story">
        <div>
          <p className="eyebrow">Signature Scroll Story</p>
          <h2>{business.motion}</h2>
          <p>
            This section is ready for richer scroll animation once final video and photography assets
            are available.
          </p>
        </div>
        <div className="motion-steps">
          {business.motif.map((step, index) => (
            <span key={step}>
              <strong>{String(index + 1).padStart(2, "0")}</strong>
              {step}
            </span>
          ))}
        </div>
      </section>

      <section className="section related-section">
        <SectionIntro eyebrow="Explore The Group" title="Related business lines." copy="Move across Pamtech's wider ecosystem from one business story into another." />
        <div className="related-links">
          {businessLines
            .filter((line) => line.slug !== business.slug)
            .slice(0, 3)
            .map((line) => (
              <Link key={line.slug} href={`/business-lines/${line.slug}`}>
                {line.name}
              </Link>
            ))}
        </div>
      </section>
      <FinalCta title={`Start with ${business.name}.`} copy="CTA destinations are placeholders for now and can be connected when final actions are confirmed." href="#" label={business.cta} />
    </>
  );
}

function SimplePage({ page, cta }: { page: Page; cta: string }) {
  return (
    <>
      <PageHero page={page} />
      <section className="section pillar-grid">
        {page.sections?.map((section) => (
          <article key={section.title}>
            <p className="eyebrow">Careers</p>
            <h2>{section.title}</h2>
            <p>{section.copy}</p>
          </article>
        ))}
      </section>
      <FinalCta title="Ready when the hiring pipeline is." copy="This page can connect to a recruitment portal or application form later." href="#" label={cta} />
    </>
  );
}

function ContactPage({ page }: { page: Page }) {
  return (
    <>
      <PageHero page={page} />
      <section className="section contact-grid">
        <article>
          <p className="eyebrow">Head Office</p>
          <h2>Owerri Office</h2>
          <p>Plot CR17 Housing Area T, Port Harcourt Rd, behind Apams, New Owerri, Owerri, Imo State, Nigeria.</p>
          <p>+234 811 500 4000</p>
        </article>
        <article>
          <p className="eyebrow">Regional Office</p>
          <h2>Port Harcourt Office</h2>
          <p>No 3 Edward Woherem Avenue, Opposite Ruby Event Center, Beside Winners Chapel Church/Jackbina Filling Station, Rumuodara/Rumuodomaya, Rivers State, Nigeria.</p>
          <p>0703 445 0400</p>
        </article>
        <article>
          <p className="eyebrow">Public Contacts</p>
          <h2>Phone And Email</h2>
          <p>+234 803 7077 608</p>
          <p>info@pamtech.com</p>
          <p>info@pamtechgroup.com</p>
          <p>Mon - Sat: 8:00 AM - 6:00 PM</p>
        </article>
      </section>
      <section className="section form-section">
        <div>
          <p className="eyebrow">Inquiry Form</p>
          <h2>Send a message.</h2>
          <p>Fields are ready for future wiring. For now, the form is a front-end placeholder.</p>
        </div>
        <form>
          <label>Name<input name="name" placeholder="Your name" /></label>
          <label>Email<input name="email" type="email" placeholder="you@example.com" /></label>
          <label>Phone<input name="phone" placeholder="Phone number" /></label>
          <label>Inquiry Type<select name="type" defaultValue=""><option value="" disabled>Select inquiry type</option><option>Business inquiry</option><option>Career inquiry</option><option>Foundation inquiry</option><option>Partnership</option></select></label>
          <label>Business Line<select name="businessLine" defaultValue=""><option value="" disabled>Select business line</option>{businessLines.map((line) => <option key={line.slug}>{line.name}</option>)}</select></label>
          <label>Message<textarea name="message" placeholder="Tell us how we can help" /></label>
          <button className="button primary" type="button">Send Message</button>
        </form>
      </section>
    </>
  );
}

function NewsPage({ page }: { page: Page }) {
  const categories = ["Group News", "Business Lines", "Foundation", "Careers", "Media"];
  return (
    <>
      <PageHero page={page} />
      <section className="section news-grid">
        <article className="featured-news">
          <p className="eyebrow">Featured Update</p>
          <h2>Featured story placeholder</h2>
          <p>
            This area can hold a major announcement, project milestone, foundation story, or hiring update.
          </p>
          <a href="#" className="text-link">Read More</a>
        </article>
        {categories.map((category) => (
          <article key={category}>
            <span>{category}</span>
            <h3>{category} update</h3>
            <p>News card placeholder ready for CMS or editable content.</p>
          </article>
        ))}
      </section>
    </>
  );
}

function LegalPage({ page }: { page: Page }) {
  return (
    <>
      <PageHero page={page} compact />
      <section className="legal-body">
        <p className="last-updated">Last updated: July 23, 2026</p>
        {page.legalBody?.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </section>
    </>
  );
}

function PageHero({
  page,
  videoLabel,
  compact = false,
}: {
  page: Page;
  videoLabel?: string;
  compact?: boolean;
}) {
  return (
    <section className={compact ? "page-hero compact" : "page-hero"}>
      <div className="page-hero-bg" />
      <div className="page-hero-content">
        <p className="eyebrow">{page.eyebrow}</p>
        <h1>{page.headline}</h1>
        <p>{page.intro}</p>
        {videoLabel ? <span className="video-chip">{videoLabel}</span> : null}
      </div>
    </section>
  );
}

function SectionIntro({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return (
    <div className="section-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p>{copy}</p>
    </div>
  );
}

function BusinessGrid() {
  return (
    <div className="business-grid">
      {businessLines.map((line) => (
        <article key={line.slug}>
          <img src={line.image} alt={line.imageAlt} />
          <div>
            <span>{line.label}</span>
            <h3>{line.name}</h3>
            <p>{line.summary}</p>
            <Link href={`/business-lines/${line.slug}`} className="text-link">
              View Business Line
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}

function MetricStrip({ metrics }: { metrics: Metric[] }) {
  return (
    <div className="metric-strip">
      {metrics.map((metric) => (
        <span key={metric.label}>
          <strong>{metric.value}</strong>
          {metric.label}
        </span>
      ))}
    </div>
  );
}

function MetricGrid({ metrics, compact = false }: { metrics: Metric[]; compact?: boolean }) {
  return (
    <div className={compact ? "metric-grid compact" : "metric-grid"}>
      {metrics.map((metric) => (
        <article key={metric.label}>
          <strong>{metric.value}</strong>
          <span>{metric.label}</span>
        </article>
      ))}
    </div>
  );
}

function FinalCta({ title, copy, href, label }: { title: string; copy: string; href: string; label: string }) {
  return (
    <section className="final-cta">
      <div>
        <p className="eyebrow">Next Step</p>
        <h2>{title}</h2>
        <p>{copy}</p>
      </div>
      <Link href={href} className="button primary">
        {label}
      </Link>
    </section>
  );
}
