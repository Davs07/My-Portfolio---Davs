import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useCallback,
  createContext,
  useContext,
} from "react";
import logo from "./img/DAVS-logo.png";
import logoLight from "./img/DAVS-logo.png";
import davsPicture from "./img/DAVS-PICTURE-1.jpg";
import { HashRouter } from "react-router-dom";
import "./App.css";
import { useTexts } from "./services/useTexts";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Scrollbar from "smooth-scrollbar";

gsap.registerPlugin(ScrollTrigger);

export const ScrollContext = createContext(false);

// ─── PRELOADER ─────────────────────────────────────────────────────────────────
const Preloader = ({ onComplete }) => {
  const wrapperRef = useRef(null);
  const overlayRef = useRef(null);
  const lettersRef = useRef([]);
  const word = ["D", "a", "v", "s"];

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Letras entran desde abajo
      tl.from(lettersRef.current, {
        y: "110%",
        opacity: 0,
        duration: 0.8,
        stagger: 0.07,
        ease: "back.out(1.7)",
      })
        // Pequeña pausa
        .to({}, { duration: 0.3 })
        // Letras salen hacia arriba
        .to(lettersRef.current, {
          y: "-110%",
          duration: 0.7,
          stagger: 0.05,
          ease: "power3.in",
        })
        // Overlay se aplana desde arriba
        .to(
          [wrapperRef.current, overlayRef.current],
          {
            scaleY: 0,
            transformOrigin: "top",
            ease: "power4.inOut",
            duration: 0.9,
            stagger: 0.15,
            onComplete: () => onComplete(),
          },
          "-=0.3"
        );
    });
    return () => ctx.revert();
  }, [onComplete]);

  return (
    <>
      <div ref={wrapperRef} className="preloader">
        <div className="preloader__inner">
          {word.map((letter, i) => (
            <div
              key={i}
              className="preloader__letter-wrap"
            >
              <span
                ref={(el) => (lettersRef.current[i] = el)}
                className="preloader__letter"
              >
                {letter}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div ref={overlayRef} className="preloader preloader--overlay" />
    </>
  );
};

// ─── MASK TEXT (líneas que emergen desde abajo) ────────────────────────────────
const MaskText = ({ children, tag = "p", delay = 0, className = "", animate = true }) => {
  const wrapRef = useRef(null);
  const isReady = useContext(ScrollContext);

  useEffect(() => {
    if (!animate || !isReady) return;
    const el = wrapRef.current;
    if (!el) return;
    const inner = el.querySelector(".mask-text__inner");

    let ctx = gsap.context(() => {
      gsap.fromTo(
        inner,
        { y: "105%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 1,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            scroller: ".main",
            start: "top 88%",
            once: true,
          },
        }
      );
    });
    return () => ctx.revert();
  }, [delay, animate, isReady]);

  const Tag = tag;
  return (
    <div ref={wrapRef} className="mask-text">
      <Tag className={`mask-text__inner ${className}`}>{children}</Tag>
    </div>
  );
};

// ─── REVEAL COVER (overlay que se retira) ─────────────────────────────────────
const RevealCover = ({ children, className = "" }) => {
  const containerRef = useRef(null);
  const coverRef = useRef(null);
  const innerRef = useRef(null);
  const isReady = useContext(ScrollContext);

  useEffect(() => {
    if (!isReady) return;
    const container = containerRef.current;
    const cover = coverRef.current;
    const inner = innerRef.current;
    if (!container || !cover) return;

    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          scroller: ".main",
          start: "top 80%",
          once: true,
        },
      });

      // Cover se retira de izquierda a derecha
      tl.to(cover, {
        width: "0%",
        duration: 1.4,
        ease: "power4.inOut",
      });

      // Imagen hace scale-down (1.2 → 1)
      if (inner) {
        tl.from(
          inner,
          {
            scale: 1.15,
            duration: 1.6,
            ease: "power3.out",
          },
          0
        );
      }
    });
    return () => ctx.revert();
  }, [isReady]);

  return (
    <div ref={containerRef} className={`reveal-container ${className}`}>
      <div ref={coverRef} className="reveal-cover" />
      <div ref={innerRef} className="reveal-inner">
        {children}
      </div>
    </div>
  );
};

// ─── FADE UP (genérico para elementos) ────────────────────────────────────────
const FadeUp = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const isReady = useContext(ScrollContext);

  useEffect(() => {
    if (!isReady) return;
    const el = ref.current;
    if (!el) return;

    let ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            scroller: ".main",
            start: "top 90%",
            once: true,
          },
        }
      );
    });
    return () => ctx.revert();
  }, [delay, isReady]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

// ─── STAGGER LIST (lista de items con stagger) ────────────────────────────────
const StaggerList = ({ items, renderItem, className = "" }) => {
  const listRef = useRef(null);
  const isReady = useContext(ScrollContext);

  useEffect(() => {
    if (!isReady) return;
    const el = listRef.current;
    if (!el) return;
    const children = el.querySelectorAll(".stagger-item");

    let ctx = gsap.context(() => {
      gsap.fromTo(
        children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            scroller: ".main",
            start: "top 85%",
            once: true,
          },
        }
      );
    });
    return () => ctx.revert();
  }, [isReady]);

  return (
    <div ref={listRef} className={className}>
      {items.map((item, i) => (
        <div key={i} className="stagger-item">
          {renderItem(item, i)}
        </div>
      ))}
    </div>
  );
};

// ─── HORIZONTAL TICKER (texto en bucle) ───────────────────────────────────────
const Ticker = ({ text, speed = 40, dark = false }) => {
  const trackRef = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const itemWidth = track.children[0]?.offsetWidth || 0;
    if (itemWidth === 0) return;
    let x = 0;

    const tick = () => {
      x -= speed / 60;
      if (Math.abs(x) >= itemWidth) x = 0;
      gsap.set(track, { x });
      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [speed]);

  const repeated = Array(6).fill(text);

  return (
    <div className={`ticker ${dark ? "ticker--dark" : "ticker--light"}`}>
      <div ref={trackRef} className="ticker__track">
        {repeated.map((t, i) => (
          <span key={i} className="ticker__item">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
};

// ─── ANIMATED NAV LINK (letras con stagger en hover) ─────────────────────────
const AnimNavLink = ({ label, href, onClick }) => {
  const topRef = useRef(null);
  const botRef = useRef(null);

  const handleEnter = () => {
    gsap.to(topRef.current, {
      y: -22,
      duration: 0.35,
      ease: "power2.out",
    });
    gsap.fromTo(
      botRef.current,
      { y: 22 },
      { y: 0, duration: 0.35, ease: "power2.out" }
    );
  };

  const handleLeave = () => {
    gsap.to(topRef.current, { y: 0, duration: 0.35, ease: "power2.out" });
    gsap.to(botRef.current, { y: 22, duration: 0.35, ease: "power2.out" });
  };

  return (
    <a
      href={href}
      className="anim-nav-link"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={onClick}
    >
      <span ref={topRef} className="anim-nav-link__top">
        {label}
      </span>
      <span ref={botRef} className="anim-nav-link__bot">
        {label}
      </span>
    </a>
  );
};

// ─── TECH BADGE ────────────────────────────────────────────────────────────────
const TechBadge = ({ tech, dark }) => (
  <span className={`tech-badge ${dark ? "tech-badge--dark" : "tech-badge--light"}`}>
    {tech}
  </span>
);

// ─── PRODUCT CARD ──────────────────────────────────────────────────────────────
const ProductCard = ({ product, dark, index = 0 }) => {
  const cardRef = useRef(null);
  const isReady = useContext(ScrollContext);

  useEffect(() => {
    if (!isReady) return;
    const el = cardRef.current;
    if (!el) return;
    let ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          delay: index * 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            scroller: ".main",
            start: "top 88%",
            once: true,
          },
        }
      );
    });
    return () => ctx.revert();
  }, [index, isReady]);

  return (
    <div
      ref={cardRef}
      className={`product-card ${dark ? "product-card--dark" : "product-card--light"}`}
    >
      {/* Imagen del producto */}
      {product.image && (
        <div className="product-card__image-wrap">
          <RevealCover className="product-card__image-reveal">
            <img
              src={product.image}
              alt={product.imageAlt || product.name}
              className="product-card__image"
            />
          </RevealCover>
        </div>
      )}

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
            <TechBadge key={t} tech={t} dark={dark} />
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
};

// ─── PROJECT CARD ──────────────────────────────────────────────────────────────
const ProjectCard = ({ project, dark }) => {
  const cardRef = useRef(null);
  const isReady = useContext(ScrollContext);

  useEffect(() => {
    if (!isReady) return;
    const el = cardRef.current;
    if (!el) return;
    let ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            scroller: ".main",
            start: "top 88%",
            once: true,
          },
        }
      );
    });
    return () => ctx.revert();
  }, [isReady]);

  return (
    <div
      ref={cardRef}
      className={`project-card ${dark ? "project-card--dark" : "project-card--light"}`}
    >
      {/* Imagen del proyecto */}
      {project.image && (
        <div className="product-card__image-wrap">
          <RevealCover className="product-card__image-reveal">
            <img
              src={project.image}
              alt={project.imageAlt || project.name}
              className="product-card__image"
            />
          </RevealCover>
        </div>
      )}

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
            <TechBadge key={t} tech={t} dark={dark} />
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
};

// ─── SKILL CATEGORY ────────────────────────────────────────────────────────────
const SkillCategory = ({ category }) => (
  <div className="skill-category">
    <p className="skill-category__label">{category.label}</p>
    <div className="skill-category__list">
      {category.skills.map((s) => (
        <span key={s} className="skill-tag">
          {s}
        </span>
      ))}
    </div>
  </div>
);

// ─── MAIN APP ──────────────────────────────────────────────────────────────────
const App = () => {
  const comp = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [scrollbarReady, setScrollbarReady] = useState(false);
  const [isDark, setIsDark] = useState(false); // para invertir el logo
  const scrollBarRef = useRef(null);

  const { allEnglish, links, handleChangeLanguage, changeLanguage } = useTexts();

  // Navegar con smooth-scrollbar a una sección por id
  const scrollToSection = useCallback((sectionId) => {
    const el = document.getElementById(sectionId);
    if (!el || !scrollBarRef.current) return;
    scrollBarRef.current.scrollIntoView(el, { alignToTop: true });
    setMenuOpen(false);
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    setPreloaderDone(true);
  }, []);

  // ── Smooth scroll + color transitions
  useEffect(() => {
    if (!preloaderDone) return;

    const scrollBar = Scrollbar.init(document.querySelector(".main"), {
      damping: 0.06,
      delegateTo: document,
      alwaysShowTracks: false,
      speed: 3,
    });
    scrollBarRef.current = scrollBar;

    ScrollTrigger.defaults({ scroller: ".main" });

    ScrollTrigger.scrollerProxy(".main", {
      scrollTop(value) {
        if (arguments.length) {
          scrollBar.scrollTop = value;
        }
        return scrollBar.scrollTop;
      },
      getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
      },
      pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });

    scrollBar.addListener(ScrollTrigger.update);

    const changeHeaderStyles = (backgroundColor, textColor) => {
      gsap.to("header", { backgroundColor, color: textColor, duration: 0.5 });
    };

    let ctx = gsap.context(() => {
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
            // Logo oscuro en fondo claro, claro en fondo oscuro
            setIsDark(textColor === "#F1F5F9");
          },
          onLeaveBack: () => {
            gsap.to(".main", { backgroundColor: prevBgColor, color: prevTextColor, overwrite: "auto" });
            changeHeaderStyles(prevBgColor, prevTextColor);
            setIsDark(prevTextColor === "#F1F5F9");
          },
        });
      });
      // Importante: le decimos a los hijos que el scrollerProxy y Scrollbar están listos.
      // Para asegurar que los DOM ya tienen las dimensiones, usamos un pequeño retraso.
      setTimeout(() => setScrollbarReady(true), 50);
      ScrollTrigger.refresh();
    });

    return () => {
      ctx.revert();
      if (scrollBar) {
        scrollBar.destroy();
      }
    };
  }, [preloaderDone]);

  // ── Hero entrance (tras preloader)
  useLayoutEffect(() => {
    if (!preloaderDone) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });

      // Header desliza desde arriba
      tl.from(".header", { opacity: 0, y: -30, duration: 0.8, ease: "power3.out" })
        // Eyebrow
        .from("#hero-greeting .mask-text__inner", {
          y: "105%",
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        }, "-=0.4")
        // Título (2 líneas con stagger)
        .from("#hero-subtitle .mask-text__inner", {
          y: "105%",
          opacity: 0,
          duration: 1.1,
          ease: "power3.out",
        }, "-=0.7")
        // Descripción
        .from("#hero-desc", { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.6")
        // CTAs en stagger
        .from("#hero-ctas > *", {
          y: 25,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
        }, "-=0.5")
        // Scroll hint
        .from(".scroll-hint", { opacity: 0, duration: 0.6 }, "-=0.2");
    });

    return () => ctx.revert();
  }, [preloaderDone]);

  const navLabels = allEnglish.navbar;

  return (
    <HashRouter>
      {/* ── PRELOADER */}
      {!preloaderDone && <Preloader onComplete={handlePreloaderComplete} />}

      {/* ── HEADER */}
      <header className="fixed px-4 md:px-8 z-10 h-16 w-full transition-colors">
        <div className="header container mx-auto flex items-center justify-between h-full max-w-6xl">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); scrollToSection("hero"); }}
            className="flex justify-center items-center gap-2 group"
          >
            <span className="logo-box">
              <img
                src={logo}
                alt="Davs logo"
                className="w-full h-full object-contain"
                style={{ filter: isDark ? "invert(1) brightness(10)" : "none", transition: "filter 0.4s ease" }}
              />
            </span>
            <span className="text-xl font-work font-bold tracking-widest">DAVS</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <ul className="flex items-center">
              {navLabels.map((label, i) => (
                <li key={i} className="overflow-hidden">
                  <AnimNavLink
                    label={label}
                    href={`#${links[i]}`}
                    onClick={(e) => { e.preventDefault(); scrollToSection(links[i]); }}
                  />
                </li>
              ))}
            </ul>
            <button className="lang-btn ml-4 font-bold text-sm border border-current px-3 py-1" onClick={handleChangeLanguage}>
              {!changeLanguage ? "ES" : "EN"}
            </button>
          </nav>

          {/* Mobile */}
          <div className="flex lg:hidden items-center gap-3">
            <button className="lang-btn font-bold text-sm border border-current px-3 py-1" onClick={handleChangeLanguage}>
              {!changeLanguage ? "ES" : "EN"}
            </button>
            <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
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
                  <button
                    className="mobile-nav-link block w-full text-left px-6 py-4 font-satoshi font-semibold text-base"
                    onClick={() => scrollToSection(links[i])}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      {/* ── MAIN */}
      <main ref={comp} className="main h-screen font-satoshi w-full flex flex-col min-h-screen">
        <ScrollContext.Provider value={scrollbarReady}>
          {/* ── HERO */}
          <section
            id="hero"
          className="section-hero min-h-screen w-full relative flex flex-col items-start justify-center px-6 md:px-16 xl:px-32"
          data-bgcolor="#F1F5F9"
          data-textcolor="#070707"
        >
          <div className="hero-content max-w-5xl mx-auto w-full">
            <div id="hero-greeting">
              <MaskText tag="p" className="hero-eyebrow" animate={false}>{allEnglish.heroGreeting}</MaskText>
            </div>
            <div id="hero-subtitle">
              <MaskText tag="h1" className="hero-title font-work" animate={false}>{allEnglish.heroSubtitle}</MaskText>
            </div>
            <p className="hero-desc" id="hero-desc">{allEnglish.heroDescription}</p>
            <div className="hero-ctas" id="hero-ctas">
              {allEnglish.heroCtas.map((cta, i) => (
                <button
                  key={i}
                  onClick={() => scrollToSection(links[i + 1])}
                  className={`hero-cta ${i === 0 ? "hero-cta--primary" : "hero-cta--secondary"}`}
                >
                  {cta}
                </button>
              ))}
            </div>
          </div>

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
            <FadeUp className="mb-2">
              <span className="section-label__text">01 — Experiencia</span>
            </FadeUp>
            <MaskText tag="h2" className="section-title font-work">
              {allEnglish.experience.company}
            </MaskText>
            <FadeUp delay={0.1} className="mt-3 mb-4">
              <span className="experience-role__title">{allEnglish.experience.role}</span>
            </FadeUp>
            <FadeUp delay={0.15} className="mb-16">
              <p className="section-desc">{allEnglish.experience.roleDesc}</p>
            </FadeUp>

            <div className="products-grid">
              {allEnglish.experience.products.map((product, i) => (
                <ProductCard key={product.name} product={product} dark={true} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Ticker entre secciones */}
        <div data-bgcolor="#070707" data-textcolor="#F1F5F9">
          <Ticker
            text="LatinPay · Solucionalo.pe · MANDO · Laravel · React · NestJS · Next.js · TypeScript · AWS ·"
            dark={true}
            speed={35}
          />
        </div>

        {/* ── PROYECTOS */}
        <section
          id="projects"
          className="min-h-screen w-full py-32 px-6 md:px-16 xl:px-32"
          data-bgcolor="#F1F5F9"
          data-textcolor="#070707"
        >
          <div className="section-inner max-w-5xl mx-auto">
            <FadeUp className="mb-2">
              <span className="section-label__text">02 — Proyectos</span>
            </FadeUp>
            <MaskText tag="h2" className="section-title font-work section-title--dark">
              Proyectos personales
            </MaskText>
            <FadeUp delay={0.1} className="mb-16">
              <p className="section-desc section-desc--dark">
                Proyectos que construí de forma independiente, combinando backend, frontend e integración de servicios.
              </p>
            </FadeUp>

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
            <FadeUp className="mb-2">
              <span className="section-label__text">03 — Habilidades</span>
            </FadeUp>
            <MaskText tag="h2" className="section-title font-work">
              Stack técnico
            </MaskText>
            <FadeUp delay={0.1} className="mb-16">
              <p className="section-desc">
                Tecnologías con las que trabajo en productos reales, combinando frontend, backend, infraestructura e integraciones.
              </p>
            </FadeUp>

            <StaggerList
              items={allEnglish.skillCategories}
              renderItem={(cat) => <SkillCategory category={cat} />}
              className="skills-grid"
            />

            {/* Devicons */}
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
                { icon: "devicon-java-plain", label: "Java" },
                { icon: "devicon-spring-plain", label: "Spring" },
                { icon: "devicon-postgresql-plain", label: "PostgreSQL" },
                { icon: "devicon-mongodb-plain", label: "MongoDB" },
                { icon: "devicon-docker-plain", label: "Docker" },
                { icon: "devicon-amazonwebservices-plain-wordmark", label: "AWS" },
                { icon: "devicon-git-plain", label: "Git" },
                { icon: "devicon-figma-plain", label: "Figma" },
              ].map(({ icon, label }) => (
                <div key={label} className="devicon-item">
                  <i className={`${icon} devicon-item__icon`}></i>
                  <span className="devicon-item__label">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Ticker al final de skills */}
          <Ticker
            text="React · Next.js · TypeScript · Laravel · NestJS · AWS · Tailwind · PostgreSQL · Docker · Redis ·"
            dark={true}
            speed={30}
          />
        </section>

        {/* ── SOBRE MÍ */}
        <section
          id="about"
          className="min-h-screen w-full py-32 px-6 md:px-16 xl:px-32"
          data-bgcolor="#F1F5F9"
          data-textcolor="#070707"
        >
          <div className="section-inner max-w-5xl mx-auto">
            <FadeUp className="mb-2">
              <span className="section-label__text">04 — Sobre mí</span>
            </FadeUp>

            <div className="about-grid">
              {/* Picture con RevealCover */}
              <div className="about-picture-wrapper">
                <RevealCover className="about-picture-frame">
                  <img src={davsPicture} alt="Davy Rodríguez" className="about-picture" />
                </RevealCover>
                <FadeUp delay={0.3}>
                  <div className="about-picture-caption">
                    <span>Cajamarca, Perú</span>
                  </div>
                </FadeUp>
              </div>

              {/* Text */}
              <div className="about-text">
                <MaskText tag="h2" className="about-title font-work section-title--dark">
                  Davy Rodríguez
                </MaskText>
                <div className="about-paragraphs">
                  <FadeUp delay={0.1}>
                    <p>{allEnglish.about.p1}</p>
                  </FadeUp>
                  <FadeUp delay={0.2}>
                    <p>{allEnglish.about.p2}</p>
                  </FadeUp>
                  <FadeUp delay={0.3}>
                    <p>{allEnglish.about.p3}</p>
                  </FadeUp>
                </div>
                <FadeUp delay={0.35} className="about-ctas">
                  <a href="https://github.com/Davs07" target="_blank" rel="noopener noreferrer" className="about-cta">
                    <iconify-icon icon="line-md:github-loop"></iconify-icon>
                    GitHub
                  </a>
                  <a href="https://www.linkedin.com/in/davy-rodr%C3%ADguez-b80608268/" target="_blank" rel="noopener noreferrer" className="about-cta">
                    <iconify-icon icon="line-md:linkedin"></iconify-icon>
                    LinkedIn
                  </a>
                </FadeUp>
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
            <FadeUp className="mb-2">
              <span className="section-label__text">05 — Contacto</span>
            </FadeUp>
            <MaskText tag="h2" className="section-title font-work">
              {allEnglish.contact.headline}
            </MaskText>
            <FadeUp delay={0.1} className="mb-12">
              <p className="section-desc">{allEnglish.contact.sub}</p>
            </FadeUp>

            <div className="contact-grid">
              {/* Info */}
              <StaggerList
                items={allEnglish.contact.links}
                renderItem={(link) => (
                  <div className="contact-info__item">
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
                )}
                className="contact-info"
              />

              {/* Form */}
              <FadeUp delay={0.2}>
                <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                  <div className="contact-form__row">
                    <div className="contact-form__field">
                      <label htmlFor="contact-name">{allEnglish.contact.form.name}</label>
                      <input type="text" id="contact-name" placeholder={allEnglish.contact.form.namePlaceholder} />
                    </div>
                    <div className="contact-form__field">
                      <label htmlFor="contact-email">{allEnglish.contact.form.email}</label>
                      <input type="email" id="contact-email" placeholder={allEnglish.contact.form.emailPlaceholder} />
                    </div>
                  </div>
                  <div className="contact-form__field">
                    <label htmlFor="contact-message">{allEnglish.contact.form.message}</label>
                    <textarea id="contact-message" rows={5} placeholder={allEnglish.contact.form.messagePlaceholder} />
                  </div>
                  <div className="contact-form__submit-row">
                    <button type="submit" className="contact-form__submit">
                      {allEnglish.contact.form.submit}
                    </button>
                  </div>
                </form>
              </FadeUp>
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
        </ScrollContext.Provider>
      </main>
    </HashRouter>
  );
};

export default App;
