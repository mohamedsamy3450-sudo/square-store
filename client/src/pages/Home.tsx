import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpLeft,
  Box,
  CarFront,
  Check,
  ChevronLeft,
  Code2,
  Download,
  FileCode2,
  Github,
  MapPinned,
  Menu,
  MessageCircle,
  PackageOpen,
  Search,
  Shirt,
  Sparkles,
  X,
  Zap,
} from "lucide-react";

const categories = [
  { id: "all", label: "الكل", icon: Sparkles },
  { id: "scripts", label: "سكربتات", icon: Code2 },
  { id: "maps", label: "مابات", icon: MapPinned },
  { id: "cars", label: "سيارات", icon: CarFront },
  { id: "clothes", label: "ملابس", icon: Shirt },
  { id: "files", label: "ملفات", icon: FileCode2 },
  { id: "free", label: "مجاني", icon: Download },
];

const resources = [
  {
    title: "Square HUD",
    description: "واجهة HUD نظيفة وسريعة، مصممة لتندمج مع أي سيرفر.",
    category: "scripts",
    categoryLabel: "سكربتات",
    tag: "مدفوع",
    price: "$19",
    isFree: false,
    downloads: "2.4K",
    color: "mint",
    icon: Code2,
  },
  {
    title: "Downtown Loft",
    description: "ماب داخلي بتفاصيل سينمائية وإضاءة واقعية للمدن الحديثة.",
    category: "maps",
    categoryLabel: "مابات",
    tag: "مدفوع",
    price: "$35",
    isFree: false,
    downloads: "1.8K",
    color: "blue",
    icon: MapPinned,
  },
  {
    title: "Vortex RS",
    description: "سيارة رياضية جاهزة للسباقات مع handling متوازن واحترافي.",
    category: "cars",
    categoryLabel: "سيارات",
    tag: "مدفوع",
    price: "$25",
    isFree: false,
    downloads: "3.1K",
    color: "orange",
    icon: CarFront,
  },
  {
    title: "Urban Essentials",
    description: "باقة ملابس يومية عالية الجودة للشخصيات داخل السيرفر.",
    category: "clothes",
    categoryLabel: "ملابس",
    tag: "مدفوع",
    price: "$12",
    isFree: false,
    downloads: "980",
    color: "purple",
    icon: Shirt,
  },
  {
    title: "Server Starter Pack",
    description: "ملفات بداية مرتبة تساعدك تبني سيرفرك بأقل وقت ممكن.",
    category: "files",
    categoryLabel: "ملفات",
    tag: "مجاني",
    downloads: "1.2K",
    color: "teal",
    icon: PackageOpen,
  },
  {
    title: "Smart Garage",
    description: "نظام كراج خفيف مع تجربة استخدام واضحة ودعم متعدد السيارات.",
    category: "scripts",
    categoryLabel: "سكربتات",
    tag: "مجاني",
    downloads: "760",
    color: "pink",
    icon: Box,
  },
];

const categoryStyles: Record<string, string> = {
  mint: "from-emerald-400/35 via-emerald-950/20 to-slate-950 text-emerald-300",
  blue: "from-sky-400/35 via-blue-950/20 to-slate-950 text-sky-300",
  orange: "from-orange-400/35 via-orange-950/20 to-slate-950 text-orange-300",
  purple: "from-violet-400/35 via-violet-950/20 to-slate-950 text-violet-300",
  teal: "from-cyan-400/35 via-cyan-950/20 to-slate-950 text-cyan-300",
  pink: "from-pink-400/35 via-pink-950/20 to-slate-950 text-pink-300",
};

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3" dir="ltr">
      <div className="logo-mark"><span></span><span></span><span></span><span></span></div>
      {!compact && <div className="leading-none"><div className="brand-word">SQUARE</div><div className="brand-sub">STORE / FIVEM RESOURCES</div></div>}
    </div>
  );
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 5000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 3200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const filteredResources = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return resources.filter((resource) => {
      const matchesCategory = activeCategory === "all" || (activeCategory === "free" ? resource.isFree : resource.category === activeCategory);
      const matchesQuery = !query || `${resource.title} ${resource.description} ${resource.categoryLabel}`.toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  const showToast = (message: string) => setToast(message);

  return (
    <div className="site-shell" dir="rtl">
      {loading && (
        <div className="loading-screen" aria-label="جاري تحميل Square Store">
          <div className="loading-orbit"></div>
          <Logo />
          <div className="loading-status">جاري تجهيز الموارد<span className="loading-dots">...</span></div>
          <div className="loading-line"><span /></div>
          <div className="loading-count">SQUARE STORE <b>01 / 01</b></div>
        </div>
      )}

      <header className="topbar">
        <div className="container topbar-inner">
          <button className="mobile-menu" onClick={() => setMenuOpen((value) => !value)} aria-label="فتح القائمة">
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
          <button className="logo-button" onClick={() => scrollTo("top")} aria-label="العودة للبداية"><Logo /></button>
          <nav className={`nav-links ${menuOpen ? "is-open" : ""}`}>
            <button className="nav-link active" onClick={() => scrollTo("top")}>الرئيسية</button>
            <button className="nav-link" onClick={() => scrollTo("resources")}>الموارد</button>
            <button className="nav-link" onClick={() => scrollTo("about")}>عنّي</button>
            <button className="nav-link" onClick={() => scrollTo("contact")}>تواصل</button>
          </nav>
          <div className="topbar-actions">
            <span className="online-pill"><span className="pulse-dot"></span> متاح الآن</span>
            <button className="outline-button" onClick={() => scrollTo("resources")}>تصفح الموارد <ArrowUpLeft size={16} /></button>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-backdrop"></div>
          <div className="hero-grain"></div>
          <div className="container hero-grid">
            <div className="hero-copy reveal-up">
              <div className="eyebrow"><span className="eyebrow-line"></span> مساحة المطورين العرب <span className="eyebrow-line"></span></div>
              <h1>موارد تبني بها<br /><span>عالمك الخاص.</span></h1>
              <p className="hero-description">أهلاً بك في <strong>Square Store</strong> — متجر أبو فهد لموارد FiveM الاحترافية. سكربتات، مابات، سيارات وملفات جاهزة ترفع مستوى سيرفرك، مع قسم مجاني للمجتمع.</p>
              <div className="hero-actions">
                <button className="primary-button" onClick={() => scrollTo("resources")}>اكتشف الموارد <ArrowUpLeft size={18} /></button>
                <button className="text-button" onClick={() => scrollTo("about")}>تعرف عليّ <ChevronLeft size={17} /></button>
              </div>
              <div className="hero-proof"><div className="avatar-stack"><span>س</span><span>م</span><span>ع</span><span>+9</span></div><div><strong>+2,400</strong><small>تحميل من مجتمع FiveM</small></div></div>
            </div>
            <div className="hero-showcase reveal-up delay-2">
              <div className="code-window">
                <div className="window-top"><div className="window-dots"><i></i><i></i><i></i></div><span>square_resource / client.lua</span><Code2 size={15} /></div>
                <div className="code-body" dir="ltr">
                  <div><em>01</em><span><b className="syntax-purple">local</b> resource = <b className="syntax-green">"square_hud"</b></span></div>
                  <div><em>02</em><span><b className="syntax-purple">if</b> resource:isReady() <b className="syntax-purple">then</b></span></div>
                  <div><em>03</em><span className="code-indent">player:show(<b className="syntax-green">"Welcome back"</b>)</span></div>
                  <div><em>04</em><span><b className="syntax-purple">end</b></span></div>
                  <div className="code-spacer"><em>05</em><span></span></div>
                  <div><em>06</em><span className="comment">-- crafted by Abu FAHD</span></div>
                </div>
                <div className="code-footer"><span className="live-dot"></span> جاهز للتحميل <span className="footer-right">FiveM / Lua / 0.01ms</span></div>
              </div>
              <div className="floating-note note-top"><Zap size={15} /> خفيف وسريع</div>
              <div className="floating-note note-bottom"><Check size={15} /> مجاني دائماً</div>
            </div>
          </div>
          <div className="hero-scroll"><span>SCROLL TO EXPLORE</span><span className="scroll-line"></span></div>
        </section>

        <section className="marquee-strip"><div className="marquee-track"><span>FREE RESOURCES</span><b>✦</b><span>BUILT FOR FIVEM</span><b>✦</b><span>CRAFTED BY ABU FAHD</span><b>✦</b><span>FREE RESOURCES</span><b>✦</b><span>BUILT FOR FIVEM</span><b>✦</b></div></section>

        <section id="resources" className="resources-section section-padding">
          <div className="container">
            <div className="section-heading reveal-up"><div><div className="section-kicker"><span>01</span> المكتبة</div><h2>كل ما تحتاجه<br /><span>في مكان واحد.</span></h2></div><p>موارد مختارة بعناية، معمولة بحب للمطورين اللي عايزين يبنوا سيرفر مختلف.<br /><strong>منتجات احترافية + قسم مجاني للمجتمع.</strong></p></div>
            <div className="resource-toolbar"><div className="category-tabs">{categories.map(({ id, label, icon: Icon }) => <button key={id} className={`category-tab ${activeCategory === id ? "selected" : ""}`} onClick={() => setActiveCategory(id)}><Icon size={16} />{label}</button>)}</div><label className="search-box"><Search size={17} /><input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="ابحث عن مورد..." aria-label="ابحث عن مورد" /></label></div>
            <div className="resource-grid">{filteredResources.map((resource, index) => { const Icon = resource.icon; return <article className={`resource-card reveal-up delay-${(index % 3) + 1}`} key={resource.title}><div className={`resource-visual ${categoryStyles[resource.color]}`}><div className="visual-grid"></div><Icon size={54} strokeWidth={1.15} /><span className={`resource-tag ${resource.isFree ? "free-tag" : "paid-tag"}`}>{resource.tag}</span><span className="visual-index">0{index + 1}</span></div><div className="resource-content"><div className="resource-meta"><span>{resource.categoryLabel}</span><span className="meta-divider"></span><span>{resource.downloads} تحميل</span><strong className="resource-price">{resource.price}</strong></div><h3>{resource.title}</h3><p>{resource.description}</p><button className="download-button" onClick={() => showToast(resource.isFree ? `تم تجهيز ${resource.title} — أضف رابط التحميل الخاص بك لاحقاً` : `تم اختيار ${resource.title} بسعر ${resource.price} — أضف رابط الشراء الخاص بك لاحقاً`)}>{resource.isFree ? "تحميل مجاني" : `شراء الآن — ${resource.price}`} <Download size={16} /></button></div></article> })}</div>
            {filteredResources.length === 0 && <div className="empty-state"><Search size={28} /><strong>ما لقيناش مورد بالبحث ده</strong><span>جرب كلمة مختلفة أو ارجع لكل الموارد.</span></div>}
            <div className="library-footer"><span><span className="pulse-dot"></span> يتم تحديث المكتبة باستمرار</span><button onClick={() => showToast("سيتم إضافة المزيد من الموارد قريباً")}>عرض كل الموارد <ArrowUpLeft size={15} /></button></div>
          </div>
        </section>

        <section id="about" className="about-section section-padding">
          <div className="container about-grid"><div className="about-art reveal-up"><div className="art-ring ring-one"></div><div className="art-ring ring-two"></div><div className="art-core"><Logo compact /><span>AF</span></div><div className="art-caption">CREATIVE DEVELOPER<br /><b>EST. 2021</b></div></div><div className="about-copy reveal-up delay-1"><div className="section-kicker"><span>02</span> المبرمج</div><h2>أنا أبو فهد،<br /><span>وأحب التفاصيل.</span></h2><p>مبرمج FiveM أشتغل على تحويل الأفكار المجنونة لتجارب حقيقية داخل السيرفر. أؤمن إن أفضل السكربتات مش بس تشتغل — لازم تكون خفيفة، مرتبة، وممتعة في الاستخدام.</p><p>Square Store هو المكان اللي أشارك فيه الأدوات والملفات اللي صنعتها خلال رحلتي، عشان كل مطور يقدر يبدأ أسرع ويبني أفضل.</p><div className="about-signature">ABU FAHD <span>—</span> FiveM Developer</div><button className="ghost-button" onClick={() => scrollTo("contact")}>خلينا نتكلم <MessageCircle size={16} /></button></div></div>
        </section>

        <section id="contact" className="contact-section section-padding"><div className="container contact-card"><div><div className="section-kicker"><span>03</span> تواصل</div><h2>عندك فكرة؟<br /><span>خلينا نبنيها.</span></h2><p>لو محتاج سكربت خاص، تعاون، أو عندك سؤال عن الموارد — ابعتلي.</p></div><div className="contact-actions"><button className="primary-button" onClick={() => showToast("أضف رابط Discord أو البريد الخاص بك هنا")}>تواصل على Discord <ArrowUpLeft size={18} /></button><button className="social-button" aria-label="GitHub" onClick={() => showToast("أضف رابط GitHub الخاص بك هنا")}><Github size={19} /></button></div><div className="contact-ornament">✦</div></div></section>
      </main>

      <footer className="footer"><div className="container footer-inner"><Logo /><span>صُنع بـ <b>حب</b> لمجتمع FiveM العربي</span><span>© 2024 Square Store</span></div></footer>
      {toast && <div className="toast-message"><Check size={17} /> {toast}</div>}
    </div>
  );
}
