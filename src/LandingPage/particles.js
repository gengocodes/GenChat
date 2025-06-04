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
      background: {
        color: {
          value: "#000",
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push", //push = add more, repulse
          },
          onHover: {
            enable: true,
            mode: "repulse", //grab
          },
        },
        modes: {
          push: {
            distance: 200,
            duration: 10,
          },
          grab: {
            distance: 150,
          },
        },
      },
      particles: {
        color: {
          value: "#DFD0B8",
        },
        links: {
          color: "#DFD0B8",
          distance: 150,
          enable: true,
          opacity: 0.4,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: true,
          speed: 3,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 200, // how many links
        },
        opacity: {
          value: 0.5,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
      detectRetina: true,
    }),
    []
  );

  return (
    <Particles
      id={id}
      className={className}
      init={particlesLoaded}
      options={options}
    />
  );
};

export default React.memo(ParticlesComponent);
