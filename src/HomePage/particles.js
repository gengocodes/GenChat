/* eslint-disable no-unused-vars */ //disable the unused variable warning throughout the entire file
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useMemo, useState } from "react";
// import { loadAll } from "@/tsparticles/all"; // if you are going to use loadAll, install the "@tsparticles/all" package too.
// import { loadFull } from "tsparticles"; // if you are going to use loadFull, install the "tsparticles" package too.
import { loadSlim } from "@tsparticles/slim"; // if you are going to use loadSlim, install the "@tsparticles/slim" package too.
import React from "react";
// import { loadBasic } from "@tsparticles/basic"; // if you are going to use loadBasic, install the "@tsparticles/basic" package too.



const ParticlesComponent = ({ id, className }) => {

  const [init, setInit] = useState(false);
  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine);
      //await loadFull(engine);
      await loadSlim(engine);
      //await loadBasic(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };


  const options = useMemo(
    () => ({
      // background: {
      //   color: {
      //     value: "black", // dark background for fire effect
      //   },
      // },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push", // push particles on click
          },
          onHover: {
            enable: true,
            mode: 'repulse', // particles will move away on hover
          },
        },
        modes: {
          push: {
            distance: 200,
            duration: 0.4,
          },
          repulse: {
            distance: 100,
          },
        },
      },
      particles: {
        color: {
          value: ["#F6F7FD", "#90A2FF", "#536FFF", "#1E43FF"], // fiery colors (orange, yellow, red)
        },
        move: {
          direction: "none", 
          enable: true,
          outModes: {
            default: "out", // particles will go out of view
          },
          random: true,
          speed: 3, // control speed of the particles
          straight: false, // allow particles to move in random directions to simulate flickering
        },
        number: {
          value: 40, // number of particles
        },
        opacity: {
          value: 0.2, // opacity to simulate the transparency of fire
          random: true,
          animation: {
            enable: true,
            speed: 0.4,
            minimumValue: 0.5,
          },
        },
        shape: {
          type: "circle", // particles will be circles
        },
        size: {
          value: { min: 1, max: 6 }, // larger particles to simulate flames
          random: true,
          animation: {
            enable: true,
            speed: 1,
            minimumValue: 1,
          },
        },
        tilt: {
          enable: true,
          value: 30,
          random: true,
          animation: {
            enable: true,
            speed: 0.5,
            minimumValue: 5,
          },
        },
      },
      detectRetina: true,
    }),
    []
  );

  return <Particles id={id} className={className} init={particlesLoaded} options={options} />;
};

export default React.memo(ParticlesComponent);

