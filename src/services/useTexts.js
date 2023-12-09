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
        navbar: ["About", "Skills", "Projects", "Contact"],
        heroText: ["Hi,", "I'm", "Davs"],
        myDescription: `I aim to create innovative technological solutions that not only
        solve problems but also inspire and connect with users in a
        meaningful way.`,
        about: [
          "My name is Davy Rodríguez, and I am a passionate web developer dedicated to transforming ideas into captivating digital experiences.",
          "With continually growing technical skills and a creative mindset, my goal is to take each project to the next level by combining efficiency in backend development with meticulous aesthetics in the frontend.",
          "My commitment to constant learning and my unique perspective, influenced by my passion for music, literature, film, and video games, make me an enthusiastic and adaptable candidate. Discover how I can bring a distinctive touch to your team and projects!",
        ],
        skills:
          "With an arsenal of technological tools, I am prepared to breathe life into any project. My constant curiosity drives me to refine my skills and explore new technologies.",
        projects:
          "In my experience, I prioritize quality over quantity. Each project is an opportunity to blend creativity and technical skills, emphasizing excellence over quantity, transforming ideas into impactful and enduring digital experiences.",
        contact: [
          "Do you have a project in mind?",
          "Allow me to help bring it to life",
          "and become a valuable part of your team.",
        ],
      }
    : {
        navbar: ["Sobre", "Habilidades", "Proyectos", "Contacto"],
        heroText: ["Hola,", "Soy", "Davs"],
        myDescription: `Busco crear soluciones tecnológicas innovadoras que no solo resuelvan problemas, sino que también inspiren y conecten con los usuarios de manera significativa.`,
        about: [
          "Mi nombre es Davy Rodríguez y soy un apasionado desarrollador web dedicado a transformar ideas en experiencias digitales cautivadoras.",
          "Con habilidades técnicas en constante crecimiento y una mente creativa, mi objetivo es llevar cada proyecto al siguiente nivel, combinando eficiencia en el desarrollo backend con una estética cuidadosa en el frontend.",
          "Mi compromiso con el aprendizaje constante y mi perspectiva única, influenciada por mi pasión por la música, la literatura, el cine y los videojuegos, me convierten en un candidato entusiasta y adaptable. ¡Descubre cómo puedo aportar un toque distintivo a tu equipo y proyectos!",
        ],
        skills:
          "Con un arsenal tecnológico, estoy preparado para dar vida a cualquier proyecto. Mi curiosidad constante me impulsa a perfeccionar habilidades y explorar nuevas tecnologías.",
        projects:
          "En mi experiencia, priorizo calidad sobre cantidad. Cada proyecto es una oportunidad para fusionar creatividad y habilidades técnicas, destacando la excelencia sobre la cantidad, transformando ideas en experiencias digitales impactantes y duraderas.",
        contact: [
          "¿Tienes algún proyecto en mente?",
          "Permíteme ayudarte a darle vida",
          "y formar parte de tu equipo.",
        ],
      };

  const texts = !changeLanguage
    ? {
        options: ["About", "Skills", "Projects", "Contact"],
        subTitles: ["About me", "My skills", "My projects", "Contact me"],
        form: [
          "Name",
          "Your name",
          "Email",
          "Your email",
          "Message",
          "Your message",
          "Submit",
        ],
      }
    : {
        options: ["Sobre", "Habilidades", "Proyectos", "Contacto"],
        subTitles: [
          "Sobre mí",
          "Mis habilidades",
          "Mis proyectos",
          "Contáctame",
        ],
        form: [
          "Nombre",
          "Tu nombre",
          "Email",
          "Tu email",
          "Mensaje",
          "Tu mensaje",
          "Enviar",
        ],
      };

  const links = ["about", "skills", "projects", "contact"];
  return {
    allEnglish,
    texts,
    links,
    handleChangeLanguage,
    changeLanguage,
  };
};
