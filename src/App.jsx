import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import logo from "./img/DAVS-logo.png";
import D from "./img/D.png";
import heztorMockup from "./img/Heztor-mockup.jpg";
import davsPicture from "./img/DAVS-PICTURE-1.jpg";

import "./App.css";

function App() {
  const arrayMySkills =
    "HTML CSS JS REACT JAVA SPRING MYSQL GSAP GIT TAILWIND SASS";
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
      id: 8,
      name: "GSAP",
      icon: <iconify-icon icon="cib:greensock"></iconify-icon>,
      link: "https://greensock.com/gsap/",
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

  return (
    <>
      <main className="min-h-screen font-satoshi w-screen flex flex-col bg-slate-100">
        <header className="fixed px-4 z-10 bg-slate-100 text-dark h-20 w-full md:block">
          <div className="container mx-auto flex items-center justify-between h-full">
            <div>
              <a href="" className="flex justify-center items-start gap-2">
                <h2 className="text-6xl font-work font-bold">DAVS</h2>
                <span className="a-logo flex items-center justify-center border border-2 h-8 w-8 border-black p-1 hover:bg-black">
                  <img src={logo} alt="" className=" w-10 " />
                </span>
              </a>
            </div>
            <div className="text-center flex justify-evenly gap-x-4 ">
              <nav className="contents font-semibold text-base hidden lg:text-lg lg:flex ">
                <ul className="mx-auto flex items-center">
                  <li className="p-5 xl:p-8 active">
                    <a href="">
                      <span>About</span>
                    </a>
                  </li>
                  <li className="p-5 xl:p-8">
                    <a href="">
                      <span>Skills</span>
                    </a>
                  </li>
                  <li className="p-5 xl:p-8">
                    <a href="">
                      <span>Projects</span>
                    </a>
                  </li>
                  <li className="p-5 xl:p-8">
                    <a href="">
                      <span>Contact</span>
                    </a>
                  </li>
                </ul>
              </nav>
              <button className="border border-2 flex items-center border-black font-bold h-5 px-1 py-0 my-auto place-items-center hover:bg-black hover:text-white">
                es | en
              </button>
            </div>
          </div>
        </header>
        <section className=" min-h-screen flex flex-col text-center  justify-center">
          <h1
            className=" font-black font-work
            text-6xl  md:text-9xl lg:text-10xl xl:text-12xl my-14 font-bold  md:my-auto">
            HI I'M DAVS
          </h1>
          <h1
            className=" font-black font-work
            text-6xl  md:text-9xl lg:text-10xl xl:text-12xl my-14 font-bold md:my-auto">
            HI I'M DAVS
          </h1>
          <h1
            className=" font-black font-work
            text-6xl  md:text-9xl lg:text-10xl xl:text-12xl my-14 font-bold md:my-auto">
            HI I'M DAVS
          </h1>
        </section>
        <section className=" font-satoshi min-h-screen flex bg-gray-900 text-white">
          <h2 className="text-[2.3em] md:text-[8vw] xl:text-[6vw] sm:leading-[1.25em] tracking-tighter font-bold mx-10 my-auto ">
            I aim to create innovative technological solutions that not only
            solve problems but also inspire and connect with users in a
            meaningful way.
          </h2>
        </section>
        <section className=" font-satoshi min-h-screen flex my-auto ">
          <div className="flex flex-col items-start my-auto w-full">
            <div className="pt-12 md:pt0 mx-auto flex items-center">
              <img src={D} alt="" className="h-5 md:h-16 " />
              <h1 className="text-5xl md:text-9xl tracking-normal font-melodrama font-bold mx-4 ">
                About me
              </h1>
              <img src={D} alt="" className="h-5 md:h-16 rotate-180" />
            </div>
            <div className="py-10  px-[2em] flex flex-col lg:flex-row items-center justify-center">
              <div className="w-full flex items-center justify-center pb-8">
                <img src={davsPicture} alt="" />
              </div>
              <div className="w-full">
                <p className=" text-lg sm:text-[4vw] md:text-[4vw] lg:text-4xl md:text-[1.9vw]  sm:leading-[1.25em]">
                  Mi nombre es Davy Rodríguez y soy un apasionado desarrollador
                  Full Stack dedicado a transformar ideas en experiencias
                  digitales cautivadoras.
                  <br />
                  <br />
                  Con habilidades técnicas en constante crecimiento y una mente
                  creativa, mi objetivo es llevar cada proyecto al siguiente
                  nivel, combinando eficiencia en el desarrollo backend con una
                  estética cuidadosa en el frontend.
                  <br />
                  <br />
                  Mi compromiso con el aprendizaje constante y mi perspectiva
                  única, influenciada por mi pasión por la música, la
                  literatura, el cine y los videojuegos, me convierten en un
                  candidato entusiasta y adaptable. ¡Descubre cómo puedo aportar
                  un toque distintivo a tu equipo y proyectos!
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className=" font-satoshi min-h-screen flex my-auto">
          <div className="flex flex-col items-start my-auto w-full">
            <div className="pt-12 md:pt0 mx-auto flex items-center">
              <img src={D} alt="" className="h-5 md:h-16 " />
              <h1 className="text-5xl md:text-9xl tracking-normal font-melodrama font-bold mx-4 ">
                My Skills
              </h1>
              <img src={D} alt="" className="h-5 md:h-16 rotate-180" />
            </div>
            <div className="py-10 px-[2em] md:px-[12em]">
              <p className="text-lg pb-10 sm:text-[4vw] lg:text-4xl sm:leading-[1.25em]">
                Con un arsenal de herramientas tecnológicas, estoy preparado
                para dar vida a cualquier proyecto. Mi curiosidad constante me
                lleva a abrazar la evolución de mis habilidades y a explorar
                nuevas tecnologías.
              </p>

              <div className="w-full grid grid-cols-3 gap-6 md:grid-cols-4">
                {skills.map((skill) => (
                  <div
                    key={skill.id}
                    className=" icons-tech  flex items-center justify-center ">
                    <a href={skill.link} target="_blank">
                      <div className=" flex items-center justify-center text-5xl md:text-8xl p-4 hover:bg-black hover:text-white">
                        <div className="wrapper-icon">{skill.icon}</div>
                      </div>
                      {/* <p className=" ml-4">{skill.name}</p> */}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className=" font-satoshi min-h-screen flex my-auto">
          <div className="flex flex-col items-start my-auto w-full">
            <div className="pt-12 md:pt0 mx-auto flex items-center">
              <img src={D} alt="" className="h-5 md:h-16 " />
              <h1 className="text-5xl md:text-9xl tracking-normal font-melodrama font-bold mx-4 ">
                My Projects
              </h1>
              <img src={D} alt="" className="h-5 md:h-16 rotate-180" />
            </div>
            <div className="py-10 px-[2em] md:px-[12em]">
              <p className="text-lg pb-10 sm:text-[4vw] lg:text-4xl sm:leading-[1.25em]">
                En mi experiencia, priorizo calidad sobre cantidad. Cada
                proyecto es una oportunidad para fusionar creatividad y
                habilidades técnicas, destacando la excelencia sobre la
                cantidad, transformando ideas en experiencias digitales
                impactantes y duraderas.
              </p>
            </div>
            <div className=" flex flex-col w-full justify-center items-center px-auto gap-3 md:gap-5">
              <img src={heztorMockup} alt="" className="w-[80vw]" />
              <div className="flex justify-start gap-4 md:gap-10 w-full px-[10vw]  h-8 md:h-12">
                <span className="border  border-2 flex items-center border-black px-4  text-base md:text-3xl">
                  2023
                </span>
                <span className="border border-2 flex items-center gap-3 border-black px-4  text-base md:text-3xl">
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
        <section className=" font-satoshi min-h-screen flex my-auto flex-col">
          <div className="flex flex-col items-start my-auto w-full">
            <div className="pt-12 md:pt0 mx-auto flex items-center">
              <img src={D} alt="" className="h-5 md:h-16 " />
              <h1 className="text-5xl md:text-9xl tracking-normal font-melodrama font-bold mx-4 ">
                Contact me
              </h1>
              <img src={D} alt="" className="h-5 md:h-16 rotate-180" />
            </div>
            <div className="py-10 px-[2em] mx-auto flex flex-row justify-between items-center w-full">
              <div className=" flex justify-center items-center w-full">
                <h4 className="text-[5vw] md:text-4xl font-semibold font-microsoft text-center">
                  ¿Tienes algún proyecto en mente? <br /> Permíteme ayudarte a
                  darle vida <br /> y formar parte de tu equipo.
                </h4>
              </div>
            </div>
            <div className="mt-4 flex flex-col mx-auto ">
              <div className="mt-4 flex flex-col md:flex-row gap-6">
                <div className="flex flex-col">
                  <label className="text-black" for="name">
                    Name
                  </label>
                  <input
                    placeholder="Your name"
                    className="w-full bg-slate-100 w-[90vw] sm:w-[22rem] border border-2 border-black border-gray-700 text-black px-2 py-1"
                    type="text"
                    id="name"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-black" for="email">
                    Email
                  </label>
                  <input
                    placeholder="Your email"
                    className="w-full bg-slate-100 w-[90vw] sm:w-[22rem] border border-2 border-black border-gray-700 text-black px-2 py-1"
                    type="email"
                    id="email"
                  />
                </div>
              </div>

              <div className="flex flex-col my-4">
                <label className="text-black" for="message">
                  Message
                </label>
                <textarea
                  placeholder="Your message"
                  className="w-full bg-slate-100 border border-2 border-black min-h-[140px] border-gray-700 text-black px-2 py-1"
                  id="message"></textarea>
              </div>

              <div className="mt-2 flex justify-end">
                <button
                  className=" text-black border border-black border-2 px-4 py-1 hover:bg-black hover:text-white transition-all duration-200"
                  type="submit">
                  Submit
                </button>
              </div>
            </div>
          </div>
          <div className=" text-2xl w-full flex flex-col gap-6 px-10 pb-5 md:flex-row justify-between items-start md:items-center font-satoshi">
            <h4>© 2023 Davy Rodríguez</h4>
            <ul className="flex gap-[3em]">
              <li>
                <a href="" className="font-satoshi flex items-center gap-2">
                  <iconify-icon icon="line-md:github-loop"></iconify-icon>
                  Github
                </a>
              </li>
              <li>
                <a href="" className="font-satoshi flex items-center gap-2">
                  <iconify-icon icon="line-md:linkedin"></iconify-icon>
                  Linkedin
                </a>
              </li>
            </ul>
            <h4>Cajamarca, PERÚ</h4>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
