import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

function ParticlesBackground() {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: false,

        background: {
          color: "transparent",
        },

        fpsLimit: 60,

        particles: {
          number: {
            value: 65,
          },

          color: {
            value: ["#00E676", "#00A8FF", "#FFE600"],
          },

          links: {
            enable: true,
            distance: 130,
            color: "#00A8FF",
            opacity: 0.25,
            width: 1,
          },

          move: {
            enable: true,
            speed: 1,
          },

          opacity: {
            value: 0.6,
          },

          size: {
            value: { min: 1, max: 4 },
          },
        },

        detectRetina: true,
      }}
    />
  );
}

export default ParticlesBackground;