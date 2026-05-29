import { useEffect, useLayoutEffect, useRef, useState } from "react";
import logo from "./img/DAVS-logo.png";
import davsPicture from "./img/DAVS-PICTURE-1.jpg";
import { HashRouter } from "react-router-dom";
import "./App.css";
import { useTexts } from "./services/useTexts";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Scrollbar from "smooth-scrollbar";

gsap.registerPlugin(ScrollTrigger);

// ─── Tech Badge ────────────────────────────────────────────────────────────────
const TechBadge = ({ tech, dark }) => (
  <span className={`tech-badge ${dark ? "tech-badge--dark" : "tech-badge--light"}`}>
    {tech}
  </span>
);

// ─── Product Card (Experiencia) ────────────────────────────────────────────────
const ProductCard = ({ product, dark }) => (
  <div className={`product-card ${dark ? "product-card--dark" : "product-card--light"}`}>
    <div className="product-card__header">
      <div className="product-card__title-row">
        <h3 className="product-card__name">{product.name}</h3>
        <span className={`product-badge ${dark ? "product-badge--dark" : "product-badge--light"}`}>
          {product.badge}
        </span>
      </div>
      <p className="product-card__description">{product.description}</p>
      <p className="product-card__detail">{product.detail}</p>
    </div>

    <div className="product-card__tasks">
      <p className="product-card__tasks-label">Lo que hice</p>
      <ul className="product-card__task-list">
        {product.tasks.map((task, i) => (
          <li key={i} className="product-card__task-item">
            <span className="product-card__task-dot">→</span>
            <span>{task}</span>
          </li>
        ))}
      </ul>
    </div>

    <div className="product-card__footer">
      <div className="product-card__techs">
        {product.techs.map((t) => (
          <TechBadge key={t} tech={t} dark={!dark} />
        ))}
      </div>
      <a
        href={product.link}
        target="_blank"
        rel="noopener noreferrer"
        className={`product-card__link ${dark ? "product-card__link--dark" : "product-card__link--light"}`}
      >
        Ver proyecto: {product.linkText} ↗
      </a>
    </div>
  </div>
);

// ─── Project Card ──────────────────────────────────────────────────────────────
const ProjectCard = ({ project, dark }) => (
  <div className={`project-card ${dark ? "project-card--dark" : "project-card--light"}`}>
    <div className="project-card__top">
      <div className="project-card__header">
        <div className="project-card__title-row">
          <h3 className="project-card__name">{project.name}</h3>
          <span className={`product-badge ${dark ? "product-badge--dark" : "product-badge--light"}`}>
            {project.badge}
          </span>
        </div>
        <p className="project-card__description">{project.description}</p>
        <p className="project-card__detail">{project.detail}</p>
      </div>
      <ul className="project-card__task-list">
        {project.tasks.map((task, i) => (
          <li key={i} className="product-card__task-item">
            <span className="product-card__task-dot">→</span>
            <span>{task}</span>
          </li>
        ))}
      </ul>
    </div>
    <div className="product-card__footer">
      <div className="product-card__techs">
        {project.techs.map((t) => (
          <TechBadge key={t} tech={t} dark={!dark} />
        ))}
      </div>
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className={`product-card__link ${dark ? "product-card__link--dark" : "product-card__link--light"}`}
      >
        Ver proyecto: {project.linkText} ↗
      </a>
    </div>
  </div>
);

// ─── Skill Category ────────────────────────────────────────────────────────────
const SkillCategory = ({ category }) => (
  <div className="skill-category">
    <p className="skill-category__label">{category.label}</p>
    <div className="skill-category__list">
      {category.skills.map((s) => (
        <span key={s} className="skill-tag">{s}</span>
      ))}
    </div>
  </div>
);

// ─── Main App ──────────────────────────────────────────────────────────────────
const App = () => {
  const comp = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const { allEnglish, links, handleChangeLanguage, changeLanguage } = useTexts();

  // ── Smooth scroll + color transitions
  useEffect(() => {
    const scrollBar = Scrollbar.init(document.querySelector(".main"), {
      damping: 0.06,
      delegateTo: document,
      alwaysShowTracks: false,
      speed: 3,
    });

    ScrollTrigger.defaults({ scroller: ".main" });

    ScrollTrigger.scrollerProxy(".main", {
      scrollTop(value) {
        if (arguments.length) scrollBar.scrollTop = value;
        return scrollBar.scrollTop;
      },
    });

    scrollBar.addListener(ScrollTrigger.update);

    const changeHeaderStyles = (backgroundColor, textColor) => {
      gsap.to("header", { backgroundColor, color: textColor, duration: 0.5 });
    };

    const sectionColor = document.querySelectorAll("[data-bgcolor]");
    sectionColor.forEach((colorSection, i) => {
      const prevBgColor = i === 0 ? "" : sectionColor[i - 1].dataset.bgcolor;
      const prevTextColor = i === 0 ? "" : sectionColor[i - 1].dataset.textcolor;
      const textColor = colorSection.dataset.textcolor;

      ScrollTrigger.create({
        trigger: colorSection,
        scroller: ".main",
        start: "top 50%",
        onEnter: () => {
          const bgColor = colorSection.dataset.bgcolor;
          gsap.to(".main", { backgroundColor: bgColor, color: textColor, overwrite: "auto" });
          changeHeaderStyles(bgColor, textColor);
        },
        onLeaveBack: () => {
          gsap.to(".main", { backgroundColor: prevBgColor, color: prevTextColor, overwrite: "auto" });
          changeHeaderStyles(prevBgColor, prevTextColor);
        },
      });
    });

    return () => {};
  }, []);

  // ── Entrance animations
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(".header", { opacity: 0, x: -100, duration: 1.5 })
        .to(".header", { opacity: 1, x: 0, duration: 1.5 }, "-=1")
        .from("#hero-greeting", { opacity: 0, y: 60, duration: 1.2, delay: 0.1 }, "-=1")
        .from("#hero-subtitle", { opacity: 0, y: 60, duration: 1.2, delay: 0.15 }, "-=0.9")
        .from("#hero-desc", { opacity: 0, y: 40, duration: 1, delay: 0.2 }, "-=0.8")
        .from("#hero-ctas", { opacity: 0, y: 30, duration: 0.8 }, "-=0.6");
    });
    return () => ctx.revert();
  }, []);

  const navLabels = allEnglish.navbar;

  return (
    <HashRouter>
      {/* ── HEADER */}
      <header className="fixed px-4 md:px-8 z-10 h-16 w-full transition-colors">
        <div className="header container mx-auto flex items-center justify-between h-full max-w-6xl">
          {/* Logo */}
          <a href="#hero" className="flex justify-center items-center gap-2 group">
            <span className="logo-box">
              <img src={logo} alt="Davs logo" className="w-full h-full object-contain" />
            </span>
            <span className="text-xl font-work font-bold tracking-widest">DAVS</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <ul className="flex items-center">
              {navLabels.map((label, i) => (
                <li key={i}>
                  <a href={`#${links[i]}`} className="nav-link px-4 py-2 font-satoshi font-semibold text-sm tracking-wide">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <button
              className="lang-btn ml-4 font-bold text-sm border border-current px-3 py-1"
              onClick={handleChangeLanguage}
            >
              {!changeLanguage ? "ES" : "EN"}
            </button>
          </nav>

          {/* Mobile Nav Toggle */}
          <div className="flex lg:hidden items-center gap-3">
            <button className="lang-btn font-bold text-sm border border-current px-3 py-1" onClick={handleChangeLanguage}>
              {!changeLanguage ? "ES" : "EN"}
            </button>
            <button
              className="mobile-menu-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span className={`hamburger ${menuOpen ? "open" : ""}`}></span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {menuOpen && (
          <div className="mobile-menu lg:hidden">
            <ul className="flex flex-col">
              {navLabels.map((label, i) => (
                <li key={i}>
                  <a
                    href={`#${links[i]}`}
                    className="mobile-nav-link block px-6 py-4 font-satoshi font-semibold text-base"
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      {/* ── MAIN */}
      <main ref={comp} className="main h-screen font-satoshi w-full flex flex-col min-h-screen">

        {/* ── HERO */}
        <section
          id="hero"
          className="section-hero min-h-screen w-full relative flex flex-col items-start justify-center px-6 md:px-16 xl:px-32"
          data-bgcolor="#F1F5F9"
          data-textcolor="#070707"
        >
          <div className="hero-content max-w-5xl mx-auto w-full">
            <p className="hero-eyebrow" id="hero-greeting">{allEnglish.heroGreeting}</p>
            <h1 className="hero-title font-work" id="hero-subtitle">
              {allEnglish.heroSubtitle}
            </h1>
            <p className="hero-desc" id="hero-desc">{allEnglish.heroDescription}</p>
            <div className="hero-ctas" id="hero-ctas">
              {allEnglish.heroCtas.map((cta, i) => (
                <a
                  key={i}
                  href={`#${links[i + 1]}`}
                  className={`hero-cta ${i === 0 ? "hero-cta--primary" : "hero-cta--secondary"}`}
                >
                  {cta}
                </a>
              ))}
            </div>
          </div>

          {/* Scroll hint */}
          <div className="scroll-hint">
            <span className="scroll-hint__line"></span>
            <span className="scroll-hint__text font-satoshi text-xs tracking-widest uppercase">scroll</span>
          </div>
        </section>

        {/* ── EXPERIENCIA */}
        <section
          id="experience"
          className="min-h-screen w-full py-32 px-6 md:px-16 xl:px-32"
          data-bgcolor="#070707"
          data-textcolor="#F1F5F9"
        >
          <div className="section-inner max-w-5xl mx-auto">
            {/* Section header */}
            <div className="section-label mb-2">
              <span className="section-label__text">01 — Experiencia</span>
            </div>
            <h2 className="section-title font-work">{allEnglish.experience.company}</h2>
            <div className="experience-role">
              <span className="experience-role__title">{allEnglish.experience.role}</span>
            </div>
            <p className="section-desc mt-4 mb-16">{allEnglish.experience.roleDesc}</p>

            {/* Product cards */}
            <div className="products-grid">
              {allEnglish.experience.products.map((product) => (
                <ProductCard key={product.name} product={product} dark={true} />
              ))}
            </div>
          </div>
        </section>

        {/* ── PROYECTOS */}
        <section
          id="projects"
          className="min-h-screen w-full py-32 px-6 md:px-16 xl:px-32"
          data-bgcolor="#F1F5F9"
          data-textcolor="#070707"
        >
          <div className="section-inner max-w-5xl mx-auto">
            <div className="section-label mb-2">
              <span className="section-label__text">02 — Proyectos</span>
            </div>
            <h2 className="section-title font-work section-title--dark">Proyectos personales</h2>
            <p className="section-desc section-desc--dark mb-16">
              Proyectos que construí de forma independiente, combinando backend, frontend e integración de servicios.
            </p>

            <div className="projects-grid">
              {allEnglish.projects.list.map((project) => (
                <ProjectCard key={project.name} project={project} dark={false} />
              ))}
            </div>
          </div>
        </section>

        {/* ── HABILIDADES */}
        <section
          id="skills"
          className="min-h-screen w-full py-32 px-6 md:px-16 xl:px-32"
          data-bgcolor="#070707"
          data-textcolor="#F1F5F9"
        >
          <div className="section-inner max-w-5xl mx-auto">
            <div className="section-label mb-2">
              <span className="section-label__text">03 — Habilidades</span>
            </div>
            <h2 className="section-title font-work">Stack técnico</h2>
            <p className="section-desc mb-16">
              Tecnologías con las que trabajo en productos reales, combinando frontend, backend, infraestructura e integraciones.
            </p>

            <div className="skills-grid">
              {allEnglish.skillCategories.map((cat) => (
                <SkillCategory key={cat.label} category={cat} />
              ))}
            </div>

            {/* Devicon icons row */}
            <div className="devicons-row mt-16">
              {[
                { icon: "devicon-html5-plain", label: "HTML" },
                { icon: "devicon-css3-plain", label: "CSS" },
                { icon: "devicon-javascript-plain", label: "JS" },
                { icon: "devicon-typescript-plain", label: "TS" },
                { icon: "devicon-react-original", label: "React" },
                { icon: "devicon-nextjs-plain", label: "Next.js" },
                { icon: "devicon-nestjs-plain", label: "NestJS" },
                { icon: "devicon-laravel-plain", label: "Laravel" },
                { icon: "devicon-postgresql-plain", label: "PostgreSQL" },
                { icon: "devicon-docker-plain", label: "Docker" },
                { icon: "devicon-git-plain", label: "Git" },
                { icon: "devicon-tailwindcss-plain", label: "Tailwind" },
              ].map(({ icon, label }) => (
                <div key={label} className="devicon-item">
                  <i className={`${icon} devicon-item__icon`}></i>
                  <span className="devicon-item__label">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SOBRE MÍ */}
        <section
          id="about"
          className="min-h-screen w-full py-32 px-6 md:px-16 xl:px-32"
          data-bgcolor="#F1F5F9"
          data-textcolor="#070707"
        >
          <div className="section-inner max-w-5xl mx-auto">
            <div className="section-label mb-2">
              <span className="section-label__text">04 — Sobre mí</span>
            </div>

            <div className="about-grid">
              {/* Picture */}
              <div className="about-picture-wrapper">
                <div className="about-picture-frame">
                  <img src={davsPicture} alt="Davy Rodríguez" className="about-picture" />
                </div>
                <div className="about-picture-caption">
                  <span>Cajamarca, Perú</span>
                </div>
              </div>

              {/* Text */}
              <div className="about-text">
                <h2 className="about-title font-work section-title--dark">Davy Rodríguez</h2>
                <div className="about-paragraphs">
                  <p>{allEnglish.about.p1}</p>
                  <p>{allEnglish.about.p2}</p>
                  <p>{allEnglish.about.p3}</p>
                </div>
                <div className="about-ctas">
                  <a
                    href="https://github.com/Davs07"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="about-cta"
                  >
                    <iconify-icon icon="line-md:github-loop"></iconify-icon>
                    GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/davy-rodr%C3%ADguez-b80608268/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="about-cta"
                  >
                    <iconify-icon icon="line-md:linkedin"></iconify-icon>
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CONTACTO */}
        <section
          id="contact"
          className="min-h-screen w-full py-32 px-6 md:px-16 xl:px-32 flex flex-col"
          data-bgcolor="#070707"
          data-textcolor="#F1F5F9"
        >
          <div className="section-inner max-w-5xl mx-auto w-full flex-1">
            <div className="section-label mb-2">
              <span className="section-label__text">05 — Contacto</span>
            </div>
            <h2 className="section-title font-work">{allEnglish.contact.headline}</h2>
            <p className="section-desc mb-12">{allEnglish.contact.sub}</p>

            <div className="contact-grid">
              {/* Info links */}
              <div className="contact-info">
                {allEnglish.contact.links.map((link, i) => (
                  <div key={i} className="contact-info__item">
                    <span className="contact-info__label">{link.label}</span>
                    {link.url ? (
                      <a
                        href={link.url}
                        target={link.url.startsWith("mailto") ? "_self" : "_blank"}
                        rel="noopener noreferrer"
                        className="contact-info__value contact-info__value--link"
                      >
                        {link.value}
                      </a>
                    ) : (
                      <span className="contact-info__value">{link.value}</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Contact form */}
              <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                <div className="contact-form__row">
                  <div className="contact-form__field">
                    <label htmlFor="contact-name">{allEnglish.contact.form.name}</label>
                    <input
                      type="text"
                      id="contact-name"
                      placeholder={allEnglish.contact.form.namePlaceholder}
                    />
                  </div>
                  <div className="contact-form__field">
                    <label htmlFor="contact-email">{allEnglish.contact.form.email}</label>
                    <input
                      type="email"
                      id="contact-email"
                      placeholder={allEnglish.contact.form.emailPlaceholder}
                    />
                  </div>
                </div>
                <div className="contact-form__field">
                  <label htmlFor="contact-message">{allEnglish.contact.form.message}</label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    placeholder={allEnglish.contact.form.messagePlaceholder}
                  />
                </div>
                <div className="contact-form__submit-row">
                  <button type="submit" className="contact-form__submit">
                    {allEnglish.contact.form.submit}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Footer */}
          <footer className="section-footer max-w-5xl mx-auto w-full mt-20 pt-8 border-t border-current border-opacity-20">
            <div className="footer-inner">
              <p className="footer-copy">{allEnglish.footer}</p>
              <ul className="footer-links">
                <li>
                  <a href="https://github.com/Davs07" target="_blank" rel="noopener noreferrer" className="footer-link">
                    <iconify-icon icon="line-md:github-loop"></iconify-icon>
                    Github
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/davy-rodr%C3%ADguez-b80608268/" target="_blank" rel="noopener noreferrer" className="footer-link">
                    <iconify-icon icon="line-md:linkedin"></iconify-icon>
                    Linkedin
                  </a>
                </li>
              </ul>
            </div>
          </footer>
        </section>
      </main>
    </HashRouter>
  );
};

export default App;
