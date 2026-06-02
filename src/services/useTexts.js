import { useEffect, useState } from "react";

let initialChangeLanguage =
  JSON.parse(localStorage.getItem("changeLanguage")) || false;

export const useTexts = () => {
  const [changeLanguage, setChangeLanguage] = useState(initialChangeLanguage);
  const handleChangeLanguage = () => {
    setChangeLanguage(!changeLanguage);
  };
  useEffect(() => {
    localStorage.setItem("changeLanguage", JSON.stringify(changeLanguage));
  }, [changeLanguage]);

  const allEnglish = !changeLanguage
    ? {
        navbar: ["Home", "Experience", "Projects", "Skills", "About", "Contact"],
        heroGreeting: "Hello, I'm Davy Rodriguez.",
        heroSubtitle: "Full Stack Developer focused on fintech, SaaS and high-complexity digital products.",
        heroDescription: "I've worked on products like LatinPay and Solucionalo.pe, building solutions with Laravel, React, Next.js, NestJS, TypeScript, AWS and multitenant architectures.",
        heroCtas: ["View Experience", "View Projects", "Contact Me"],
        experience: {
          company: "Latin American Capital SAC",
          role: "Full Stack Developer / Backend Engineer",
          roleDesc: "I develop digital products for the group, participating in LatinPay and Solucionalo.pe, with a focus on API integration, process automation, security, multitenancy and operational experience.",
          products: [
            {
              name: "LatinPay",
              badge: "B2B Fintech Portal",
              image: "https://placehold.co/800x450/0f172a/64748b?text=LatinPay",
              imageAlt: "LatinPay portal screenshot",
              description: "LatinPay is a 100% digital fintech that facilitates payments between merchants and customers through mobile and internet banking, without the need for POS, focused on secure collections and low commissions.",
              detail: "In this product I participated in the web app, CMS optimization and integration with financial and operational services of the business ecosystem.",
              tasks: [
                "Development of the LatinPay web app for financial operation and business administration.",
                "Optimization of the internal CMS to improve operational flows and content management.",
                "Integration with payment and bank validation APIs such as Yapago and Shinkansen.",
                "Work with authentication flows, notifications, files and operational experience components.",
              ],
              techs: ["Laravel", "PHP", "React", "TypeScript", "AWS", "Tailwind CSS", "SQS", "Reverb", "Passport", "Redis"],
              link: "https://latinpay.pe",
              linkText: "latinpay.pe",
            },
            {
              name: "Solucionalo.pe",
              badge: "Multitenant SaaS",
              image: "https://placehold.co/800x450/0f172a/64748b?text=Solucionalo.pe",
              imageAlt: "Solucionalo.pe dashboard screenshot",
              description: "Solucionalo.pe is a SaaS platform for Peruvian companies to manage their digital Complaints Book, with SLA alerts, reports, QR, branch roles and AI assistance.",
              detail: "The product is focused on legal compliance, flow automation and centralization of claims on a single platform.",
              tasks: [
                "Development of modules for claims management, tracking and formal case handling.",
                "Implementation of alerts and control flows to meet response times.",
                "Construction of multi-company and multi-channel experiences with administration panels.",
                "Participation in the technical base of the product with modern and scalable architecture.",
              ],
              techs: ["Next.js", "NestJS", "TypeScript", "Turborepo", "Drizzle", "PostgreSQL", "Tailwind CSS", "AWS"],
              link: "https://solucionalo.pe",
              linkText: "solucionalo.pe",
            },
          ],
        },
        projects: {
          list: [
            {
              name: "MANDO",
              badge: "SaaS Platform",
              image: "https://placehold.co/800x450/f1f5f9/334155?text=MANDO",
              imageAlt: "MANDO platform screenshot",
              description: "MANDO is a cloud ERP and POS platform designed to modernize small and medium businesses with modules for retail, restaurants, services and hospitality.",
              detail: "Unifies sales, SUNAT electronic billing, cash register, e-commerce catalog, WhatsApp inbox, automations and AI assistants in a single operating experience.",
              tasks: [
                "Backend development with NestJS, Prisma, PostgreSQL, Redis, OpenAI SDK and Gemini Vision.",
                "Frontend development with Next.js 15, React 19, Zustand, TanStack Query, Radix UI and Framer Motion.",
                "Implementation of web and mobile POS for sales, product variants, scanning and operational cash register.",
                "Integration of shared WhatsApp inbox with automations, RAG and human handoff.",
                "Development of Hada, an agentic copilot with SSE streaming, Structured Outputs and human confirmation before executing transactional actions.",
                "Construction of computer vision flows for image analysis and massive creation of products or purchases.",
                "Implementation of hybrid printing engine with Web Bluetooth, Android Intents and Electron desktop agent for ESC/POS tickets.",
              ],
              techs: ["NestJS", "Prisma", "PostgreSQL", "Redis", "OpenAI SDK", "Gemini Vision", "Socket.io", "Clerk", "Mercado Pago", "Next.js 15", "React 19", "Zustand", "TanStack Query", "Radix UI", "Framer Motion", "React Native", "Expo", "Electron", "Vite", "Typesense"],
              link: "https://mando.uno",
              linkText: "mando.uno",
            },
          ],
        },
        skillCategories: [
          { label: "Frontend", skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Zustand", "React Query", "Radix UI", "Zod"] },
          { label: "Backend", skills: ["NestJS", "Node.js", "Laravel", "PHP", "Java", "Spring Boot", "REST APIs", "GraphQL", "WebSockets", "Webhooks", "Prisma", "Drizzle"] },
          { label: "Infrastructure & Cloud", skills: ["AWS", "S3", "CloudFront", "SES", "SQS", "Redis", "Reverb", "Docker"] },
          { label: "Integrations", skills: ["Culqi", "Shinkansen", "Yapago", "BanBif", "Cloudinary", "Resend", "OpenAI", "Mapbox", "Google Maps", "VirusTotal"] },
          { label: "Databases", skills: ["PostgreSQL", "MySQL", "MongoDB", "SQL", "Redis"] },
          { label: "Design / Product", skills: ["Figma", "UX/UI", "Design Systems", "Responsive Design"] },
          { label: "AI Developer Tools", skills: ["Cursor", "Claude Code", "GitHub Copilot", "MCP", "Rules", "N8N", "Spec-driven development"] },
          { label: "Workflows", skills: ["Git", "GitHub", "VS Code", "Code Review", "Debugging", "Prompting"] },
        ],
        about: {
          p1: "I'm a developer focused on building useful, secure and scalable products.",
          p2: "I like working on real problems where technical detail changes the user experience and business outcome.",
          p3: "I've developed solutions for fintech, SaaS and process automation, combining backend, frontend and external service integration. I'm looking to keep growing in products with good architecture, technical clarity and high value for the user.",
        },
        contact: {
          headline: "Got a project in mind?",
          sub: "If you're building a digital product, a SaaS platform or a financial solution, I'd love to help you build it.",
          links: [
            { label: "GitHub", url: "https://github.com/Davs07", value: "github.com/Davs07" },
            { label: "LinkedIn", url: "https://www.linkedin.com/in/davy-rodr%C3%ADguez-b80608268/", value: "linkedin.com/in/davy-rodríguez" },
            { label: "Location", url: null, value: "Cajamarca, Perú" },
            { label: "Email", url: "mailto:davyrodriguez107@gmail.com", value: "davyrodriguez107@gmail.com" },
          ],
          form: { name: "Name", namePlaceholder: "Your name", email: "Email", emailPlaceholder: "your@email.com", message: "Message", messagePlaceholder: "Tell me about your project...", submit: "Send message" },
        },
        footer: "© 2026 Davs. Building fintech, SaaS products and digital experiences focused on real impact.",
      }
    : {
        navbar: ["Inicio", "Experiencia", "Proyectos", "Habilidades", "Sobre mí", "Contacto"],
        heroGreeting: "Hola, soy Davy Rodriguez.",
        heroSubtitle: "Desarrollador Full Stack enfocado en fintech, SaaS y productos digitales de alta complejidad.",
        heroDescription: "He trabajado en productos como LatinPay y Solucionalo.pe, construyendo soluciones con Laravel, React, Next.js, NestJS, TypeScript, AWS y arquitecturas multitenant.",
        heroCtas: ["Ver experiencia", "Ver proyectos", "Contactarme"],
        experience: {
          company: "Latin American Capital SAC",
          role: "Desarrollador Full Stack / Backend Engineer",
          roleDesc: "Trabajo en el desarrollo de productos digitales del grupo, participando en LatinPay y Solucionalo.pe, con foco en integración de APIs, automatización de procesos, seguridad, multitenencia y experiencia operativa.",
          products: [
            {
              name: "LatinPay",
              badge: "Portal Financiero B2B",
              image: "https://placehold.co/800x450/0f172a/64748b?text=LatinPay",
              imageAlt: "Captura del portal LatinPay",
              description: "LatinPay es una fintech 100% digital que facilita pagos entre comercios y clientes a través de banca móvil y banca por internet, sin necesidad de POS, con enfoque en cobros seguros y comisiones bajas.",
              detail: "En este producto participé en la app web, la optimización del CMS y la integración con servicios financieros y operativos del ecosistema del negocio.",
              tasks: [
                "Desarrollo de la app web de LatinPay para operación financiera y administración de negocio.",
                "Optimización del CMS interno para mejorar flujos operativos y administración de contenido.",
                "Integración con APIs de pago y validación bancaria como Yapago y Shinkansen.",
                "Trabajo con flujos de autenticación, notificaciones, archivos y componentes de experiencia operativa.",
              ],
              techs: ["Laravel", "PHP", "React", "TypeScript", "AWS", "Tailwind CSS", "SQS", "Reverb", "Passport", "Redis"],
              link: "https://latinpay.pe",
              linkText: "latinpay.pe",
            },
            {
              name: "Solucionalo.pe",
              badge: "SaaS Multitenant",
              image: "https://placehold.co/800x450/0f172a/64748b?text=Solucionalo.pe",
              imageAlt: "Captura del dashboard de Solucionalo.pe",
              description: "Solucionalo.pe es una plataforma SaaS para que empresas peruanas gestionen su Libro de Reclamaciones de forma digital, con alertas SLA, reportes, QR, roles por sucursal y asistencia de IA.",
              detail: "El producto está orientado a cumplimiento legal, automatización de flujos y centralización de reclamos en una sola plataforma.",
              tasks: [
                "Desarrollo de módulos para gestión de reclamos, seguimiento y atención formal de casos.",
                "Implementación de alertas y flujos de control para cumplir con los tiempos de atención.",
                "Construcción de experiencias multiempresa y multicanal con paneles de administración.",
                "Participación en la base técnica del producto con arquitectura moderna y escalable.",
              ],
              techs: ["Next.js", "NestJS", "TypeScript", "Turborepo", "Drizzle", "PostgreSQL", "Tailwind CSS", "AWS"],
              link: "https://solucionalo.pe",
              linkText: "solucionalo.pe",
            },
          ],
        },
        projects: {
          list: [
            {
              name: "MANDO",
              badge: "Plataforma SaaS",
              image: "https://placehold.co/800x450/f1f5f9/334155?text=MANDO",
              imageAlt: "Captura de la plataforma MANDO",
              description: "MANDO es una plataforma ERP y POS en la nube diseñada para modernizar pequeños y medianos negocios con módulos para retail, restaurantes, servicios y hotelería.",
              detail: "Unifica ventas, facturación electrónica SUNAT, caja, catálogo e-commerce, bandeja de WhatsApp, automatizaciones y asistentes de IA en una sola experiencia de operación.",
              tasks: [
                "Desarrollo de backend con NestJS, Prisma, PostgreSQL, Redis, OpenAI SDK y Gemini Vision.",
                "Desarrollo del frontend con Next.js 15, React 19, Zustand, TanStack Query, Radix UI y Framer Motion.",
                "Implementación de POS web y móvil para ventas, variantes de producto, escaneo y caja operativa.",
                "Integración de bandeja compartida de WhatsApp con automatizaciones, RAG y handoff humano.",
                "Desarrollo de Hada, un copiloto agéntico con streaming SSE, Structured Outputs y confirmación humana antes de ejecutar acciones transaccionales.",
                "Construcción de flujos de visión artificial para análisis de imágenes y creación masiva de productos o compras.",
                "Implementación de motor de impresión híbrido con Web Bluetooth, Android Intents y agente de escritorio Electron para tickets ESC/POS.",
              ],
              techs: ["NestJS", "Prisma", "PostgreSQL", "Redis", "OpenAI SDK", "Gemini Vision", "Socket.io", "Clerk", "Mercado Pago", "Next.js 15", "React 19", "Zustand", "TanStack Query", "Radix UI", "Framer Motion", "React Native", "Expo", "Electron", "Vite", "Typesense"],
              link: "https://mando.uno",
              linkText: "mando.uno",
            },
          ],
        },
        skillCategories: [
          { label: "Frontend", skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Zustand", "React Query", "Radix UI", "Zod"] },
          { label: "Backend", skills: ["NestJS", "Node.js", "Laravel", "PHP", "Java", "Spring Boot", "REST APIs", "GraphQL", "WebSockets", "Webhooks", "Prisma", "Drizzle"] },
          { label: "Infraestructura & Cloud", skills: ["AWS", "S3", "CloudFront", "SES", "SQS", "Redis", "Reverb", "Docker"] },
          { label: "Integraciones", skills: ["Culqi", "Shinkansen", "Yapago", "BanBif", "Cloudinary", "Resend", "OpenAI", "Mapbox", "Google Maps", "VirusTotal"] },
          { label: "Bases de datos", skills: ["PostgreSQL", "MySQL", "MongoDB", "SQL", "Redis"] },
          { label: "Design / Product", skills: ["Figma", "UX/UI", "Design Systems", "Responsive Design"] },
          { label: "AI Developer Tools", skills: ["Cursor", "Claude Code", "GitHub Copilot", "MCP", "Rules", "N8N", "Spec-driven development"] },
          { label: "Workflows", skills: ["Git", "GitHub", "VS Code", "Code Review", "Debugging", "Prompting"] },
        ],
        about: {
          p1: "Soy un desarrollador enfocado en construir productos útiles, seguros y escalables.",
          p2: "Me gusta trabajar en problemas reales donde el detalle técnico sí cambia la experiencia del usuario y el resultado del negocio.",
          p3: "He desarrollado soluciones para fintech, SaaS y automatización de procesos, combinando backend, frontend e integración de servicios externos. Busco seguir creciendo en productos con buena arquitectura, claridad técnica y alto valor para el usuario.",
        },
        contact: {
          headline: "¿Tienes un proyecto en mente?",
          sub: "Si estás construyendo un producto digital, una plataforma SaaS o una solución financiera, me encantaría ayudarte a desarrollarla.",
          links: [
            { label: "GitHub", url: "https://github.com/Davs07", value: "github.com/Davs07" },
            { label: "LinkedIn", url: "https://www.linkedin.com/in/davy-rodr%C3%ADguez-b80608268/", value: "linkedin.com/in/davy-rodríguez" },
            { label: "Ubicación", url: null, value: "Cajamarca, Perú" },
            { label: "Email", url: "mailto:davyrodriguez107@gmail.com", value: "davyrodriguez107@gmail.com" },
          ],
          form: { name: "Nombre", namePlaceholder: "Tu nombre", email: "Email", emailPlaceholder: "tu@email.com", message: "Mensaje", messagePlaceholder: "Cuéntame sobre tu proyecto...", submit: "Enviar mensaje" },
        },
        footer: "© 2026 Davs. Construyendo productos fintech, SaaS y experiencias digitales con foco en impacto real.",
      };

  const links = ["hero", "experience", "projects", "skills", "about", "contact"];

  return {
    allEnglish,
    links,
    handleChangeLanguage,
    changeLanguage,
  };
};
