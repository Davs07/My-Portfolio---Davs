import { useEffect, useLayoutEffect, useRef} from "react";
import logo from "./img/DAVS-logo.png";
import D from "./img/D.png";
import heztorMockup from "./img/mockup-heztor.jpg";
import davsPicture from "./img/DAVS-PICTURE-1.jpg";
import { HashRouter } from "react-router-dom";
import "./App.css";
import { useTexts } from "./services/useTexts";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Scrollbar from "smooth-scrollbar";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  useEffect(() => {
    const scrollBar = Scrollbar.init(document.querySelector(".main"), {
      damping: 0.06,
      delegateTo: document,
      alwaysShowTracks: false,
      speed: 3,
    });

    ScrollTrigger.defaults({
      scroller: ".main",
    });

    ScrollTrigger.scrollerProxy(".main", {
      scrollTop(value) {
        if (arguments.length) {
          scrollBar.scrollTop = value;
        }
        return scrollBar.scrollTop;
      },
    });

    scrollBar.addListener(ScrollTrigger.update);

    const changeHeaderStyles = (backgroundColor, textColor) => {
      gsap.to("header", {
        backgroundColor: backgroundColor,
        color: textColor,
        duration: 0.5,
      });
    };

    const sectionColor = document.querySelectorAll("[data-bgcolor]");
    sectionColor.forEach((colorSection, i) => {
      const prevBgColor = i === 0 ? "" : sectionColor[i - 1].dataset.bgcolor;
      const prevTextColor =
        i === 0 ? "" : sectionColor[i - 1].dataset.textcolor;
      const textColor = colorSection.dataset.textcolor;

      ScrollTrigger.create({
        trigger: colorSection,
        scroller: ".main",
        start: "top 50%",
        onEnter: () => {
          const bgColor = colorSection.dataset.bgcolor;
          gsap.to(".main", {
            backgroundColor: bgColor,
            color: textColor,
            overwrite: "auto",
          });
          changeHeaderStyles(bgColor, textColor);
        },
        onLeaveBack: () => {
          gsap.to(".main", {
            backgroundColor: prevBgColor,
            color: prevTextColor,
            overwrite: "auto",
          });
          changeHeaderStyles(prevBgColor, prevTextColor);
        },
      });
    });

    const changeHeaderTextColor = (color) => {
      gsap.to("header", {
        color: color,
        duration: 0.5,
      });
    };

    return () => {};
  }, []);

  const { allEnglish, texts, links, handleChangeLanguage, changeLanguage } =
    useTexts();

  const skills = [
    {
      id: 1,
      name: "HTML",
      icon: <i className="devicon-html5-plain"></i>,
      link: "https://html.spec.whatwg.org/",
    },
    {
      id: 2,
      name: "CSS",
      icon: <i className="devicon-css3-plain"></i>,
      link: "https://www.w3.org/Style/CSS/",
    },
    {
      id: 3,
      name: "JS",
      icon: <i className="devicon-javascript-plain"></i>,
      link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    },
    {
      id: 4,
      name: "REACT",
      icon: <i className="devicon-react-original"></i>,
      link: "https://reactjs.org/",
    },
    {
      id: 13,
      name: "NestJS",
      icon: <i class="devicon-nestjs-plain"></i>,
      link: "https://nestjs.com/" 
    },
    {
      id: 12,
      name: "Next.JS",
      icon: <i class="devicon-nextjs-plain"></i>,
      link: "https://nextjs.org/"
    },
    {
      id: 5,
      name: "JAVA",
      icon: <i className="devicon-java-plain"></i>,
      link: "https://www.oracle.com/java/",
    },
    {
      id: 6,
      name: "SPRING",
      icon: <i className="devicon-spring-plain"></i>,
      link: "https://spring.io/",
    },
    {
      id: 7,
      name: "MYSQL",
      icon: <i className="devicon-mysql-plain"></i>,
      link: "https://www.mysql.com/",
    },
    {
      id: 9,
      name: "GIT",
      icon: <i className="devicon-git-plain"></i>,
      link: "https://git-scm.com/",
    },
    {
      id: 10,
      name: "TAILWIND",
      icon: <i className="devicon-tailwindcss-plain"></i>,
      link: "https://tailwindcss.com/",
    },
    {
      id: 11,
      name: "SASS",
      icon: <i className="devicon-sass-plain"></i>,
      link: "https://sass-lang.com/",
    },
  ];

  const comp = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(".header", { opacity: 0, x: -100, duration: 1.5 }).to(
        ".header",
        { opacity: 1, x: 0, duration: 1.5 },
        "-=1"
      );
      tl.from(
        "#hero-text-1",
        { opacity: 0, y: 100, x: 50, duration: 2, delay: 0.1 },
        "-=1"
      )
        .from(
          "#hero-text-2",
          { opacity: 0, y: 100, x: 50, duration: 2, delay: 0.2 },
          "-=1"
        )
        .from(
          "#hero-text-3",
          { opacity: 0, y: 100, x: 50, duration: 2, delay: 0.3 },
          "-=1"
        );
    });
    return () => ctx.revert();
  }, []);

  return (
    <HashRouter>
      <header className="fixed px-4 z-10 text-dark h-16 w-full md:block">
        <div className="header container mx-auto flex items-center justify-between h-full">
          <div>
            <a href="#" className="flex justify-center items-start gap-2">
              <h2 className="text-4xl font-work font-bold">DAVS</h2>
              <span className="a-logo flex items-center justify-center border border-2 h-6 w-6 border-black p-1 hover:bg-black bg-[#F1F5F9]">
                <img src={logo} alt="" className=" w-full" />
              </span>
            </a>
          </div>
          <div className="text-center flex justify-evenly gap-x-4 ">
            <nav className=" contents font-semibold text-base hidden lg:text-lg lg:flex ">
              <ul className="  mx-auto flex items-center">
                {texts.options.map((option, index) => (
                  <li key={index} className="nav-item p-5 xl:p-8">
                    <a href={`#${links[index]}`} className="hover:text-black">
                      <span>{option}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <button
              className="language border border-2 flex  items-center border-current font-bold  p-1 my-auto place-items-center  "
              onClick={handleChangeLanguage}>
              {!changeLanguage ? "ES" : "EN"}
            </button>
          </div>
        </div>
      </header>
      <main
        ref={comp}
        className="main h-screen font-satoshi w-full flex flex-col  min-h-screen">
        <section
          id="hero"
          className="min-h-screen w-screen relative flex items-center justify-center px-32"
          data-bgcolor="#F1F5F9"
          data-textcolor="#070707">
          <div>
            <h1
              className="hero-text  font-work
            text-8xl  md:text-10xl lg:text-12xl xl:text-[16rem] my-14 font-bold  md:my-auto uppercase text-center">
              <span id="hero-text-1">{allEnglish.heroText[0]}</span>
              <br />
              <span id="hero-text-2">{allEnglish.heroText[1]}</span>
              <br />
              <span id="hero-text-3">{allEnglish.heroText[2]}</span>
            </h1>
          </div>
        </section>
        <section
          className="min-h-screen flex"
          data-bgcolor="#070707"
          data-textcolor="#F1F5F9">
          <h2 className="text-[2.3em] md:text-[8vw] xl:text-[6vw] sm:leading-[1.25em] tracking-tighter font-bold mx-10 my-auto text-start">
            {allEnglish.myDescription}
          </h2>
        </section>
        <section
          id="about"
          className="min-h-screen w-screen flex my-auto"
          data-bgcolor="#F1F5F9"
          data-textcolor="#070707">
          <div className="flex flex-col items-start my-auto w-full">
            <div className="pt-12 md:pt0 mx-auto flex items-center">
              <img src={D} alt="" className="h-[1.2em] sm:h-[2.2em] lg:h-[3.2em]  " />
              <h1 className="text-[2.3em] sm:text-[5em] lg:text-[9em] tracking-normal font-melodrama font-bold mx-4 text-center">
                {texts.subTitles[0]}
              </h1>
              <img src={D} alt="" className="h-[1.2em] sm:h-[2.2em] lg:h-[3.2em]  rotate-180" />
            </div>
            <div className="py-10  px-[2em] flex flex-col lg:flex-row items-center justify-center">
              <div className="w-full flex items-center justify-center pb-8">
                <img src={davsPicture} alt="" />
              </div>
              <div className="w-full py-10  md:px-[3em] text-start">
                <p className=" text-lg pb-10 sm:text-[4vw] lg:text-4xl sm:leading-[1.25em] text-start">
                  {allEnglish.about[0]}
                  <br />
                  <br />
                  {allEnglish.about[1]}
                  <br />
                  <br />
                  {allEnglish.about[2]}
                </p>
              </div>
            </div>
          </div>
        </section>
        <section
          id="skills"
          className="min-h-screen  flex my-auto "
          data-bgcolor="#F1F5F9"
          data-textcolor="#070707">
          <div className="flex flex-col items-start my-auto w-full">
            <div className="pt-12 md:pt0 mx-auto flex items-center">
              <img src={D} alt="" className="h-[1.2em] sm:h-[2.2em] lg:h-[3.2em]  " />
              <h1 className="text-[2.3em] sm:text-[5em] lg:text-[9em]  tracking-normal font-melodrama font-bold mx-4 text-center">
                {texts.subTitles[1]}
              </h1>
              <img src={D} alt="" className="h-[1.2em] sm:h-[2.2em] lg:h-[3.2em]  rotate-180" />
            </div>
            <div className="py-10 px-[2em] md:px-[4em] text-start">
              <p className="text-lg pb-10 sm:text-[4vw] lg:text-4xl sm:leading-[1.25em] text-start">
                {allEnglish.skills}
              </p>

              <div className="w-full grid grid-cols-3 gap-6 md:grid-cols-4">
                {skills.map((skill) => (
                  <div
                    key={skill.id}
                    className=" icons-tech  flex items-center justify-center ">
                    <a href={skill.link} target="_blank">
                      <div className="group flex items-center justify-center text-5xl md:text-8xl p-4 hover:bg-black hover:text-white">
                        <div className="wrapper-icon group-hover:text-white text-[1em]">{skill.icon}</div>
                      </div>
                      {/* <p className=" ml-4">{skill.name}</p> */}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section
          id="projects"
          className="min-h-screen w-screen relative flex my-auto"
          data-bgcolor="#070707"
          data-textcolor="#F1F5F9">
          <div className="flex flex-col items-start my-auto w-full">
            <div className="pt-12 md:pt0 mx-auto flex items-center">
              <img src={D} alt="" className="h-[1.2em] sm:h-[2.2em] lg:h-[3.2em]  " />
              <h1 className="text-[2.3em] sm:text-[5em] lg:text-[9em] tracking-normal font-melodrama font-bold mx-4 text-center">
                {texts.subTitles[2]}
              </h1>
              <img src={D} alt="" className="h-[1.2em] sm:h-[2.2em] lg:h-[3.2em]  rotate-180" />
            </div>
            <div className="py-10 px-[2em] md:px-[4em]">
              <p className="text-lg pb-10 sm:text-[4vw] lg:text-4xl sm:leading-[1.25em] text-start">
                {allEnglish.projects}
              </p>
            </div>
            <div className=" flex flex-col w-full justify-center items-center px-auto gap-3 md:gap-5">
              <img src={heztorMockup} alt="" className="w-[80vw]" />
              <div className="flex justify-start gap-4 md:gap-10 w-full px-[10vw]  h-8 md:h-12">
                <span className="border  border-2 flex items-center border-current px-4  text-base md:text-3xl">
                  2023
                </span>
                <span className="border border-2 flex items-center gap-3 border-current px-4  text-base md:text-3xl">
                  <i className="devicon-react-original"></i> •{" "}
                  <i className="devicon-sass-original"></i> •{" "}
                  <i className="devicon-spring-plain"></i> •{" "}
                  <i className="devicon-mysql-plain"></i>
                </span>
              </div>
              <div className="flex justify-start gap-4 md:gap-10 w-full px-[10vw]">
                <h4 className="text-2xl md:text-4xl lg:text-6xl font-microsoft ">
                  Heztor App
                </h4>
              </div>
            </div>
          </div>
        </section>
        <section
          id="contact"
          className="min-h-screen flex my-auto flex-col"
          data-bgcolor="#F1F5F9"
          data-textcolor="#070707">
          <div className="flex flex-col items-start my-auto w-full">
            <div className="pt-12 md:pt0 mx-auto flex items-center">
              <img src={D} alt="" className="h-[1.2em] sm:h-[2.2em] lg:h-[3.2em]  " />
              <h1 className="text-[2.3em] sm:text-[5em] lg:text-[9em] tracking-normal font-melodrama font-bold mx-4 text-center">
                {texts.subTitles[3]}
              </h1>
              <img src={D} alt="" className="h-[1.2em] sm:h-[2.2em] lg:h-[3.2em]  rotate-180" />
            </div>
            <div className="py-10 px-[2em] mx-auto flex flex-row justify-between items-center w-full">
              <div className=" flex justify-center items-center w-full">
                <h4 className="text-[5vw] md:text-4xl font-semibold font-microsoft text-center">
                  {allEnglish.contact[0]} <br /> {allEnglish.contact[1]}
                  <br /> {allEnglish.contact[2]}
                </h4>
              </div>
            </div>
            <div className="mt-4 flex flex-col mx-auto ">
              <div className="mt-4 flex flex-col md:flex-row gap-6">
                <div className="flex flex-col">
                  <label className="text-black" htmlFor="name">
                    {texts.form[0]}
                  </label>
                  <input
                    placeholder={texts.form[1]}
                    className="w-full bg-slate-100 w-[90vw] sm:w-[22rem] border border-2 bg-transparent border-black border-gray-700 text-black px-2 py-1"
                    type="text"
                    id="name"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-black" htmlFor="email">
                    {texts.form[2]}
                  </label>
                  <input
                    placeholder={texts.form[3]}
                    className="w-full bg-slate-100 w-[90vw] sm:w-[22rem] border border-2 bg-transparent border-black border-gray-700 text-black px-2 py-1"
                    type="email"
                    id="email"
                  />
                </div>
              </div>

              <div className="flex flex-col my-4">
                <label className="text-black" htmlFor="message">
                  {texts.form[4]}
                </label>
                <textarea
                  placeholder={texts.form[5]}
                  className="w-full bg-slate-100 border border-2 bg-transparent border-black min-h-[140px] border-gray-700 text-black px-2 py-1"
                  id="message"></textarea>
              </div>

              <div className="mt-2 flex justify-end">
                <button
                  className=" text-black border border-black border-2 px-4 py-1 hover:bg-black hover:text-white transition-all duration-200"
                  type="submit">
                  {texts.form[6]}
                </button>
              </div>
            </div>
          </div>
          <div className=" text-2xl w-full flex flex-col gap-6 px-10 pb-5 md:flex-row justify-between items-start md:items-center font-satoshi">
            <h4>© 2023 Davy Rodríguez</h4>
            <ul className="flex gap-[3em]">
              <li>
                <a href="https://github.com/Davs07" target="_blank" className="font-satoshi flex items-center gap-2">
                  <iconify-icon icon="line-md:github-loop"></iconify-icon>
                  Github
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/davy-rodr%C3%ADguez-b80608268/" target="_blank" className="font-satoshi flex items-center gap-2">
                  <iconify-icon icon="line-md:linkedin"></iconify-icon>
                  Linkedin
                </a>
              </li>
            </ul>
            <h4>Cajamarca, PERÚ</h4>
          </div>
        </section>
      </main>
    </HashRouter>
  );
};

export default App;
