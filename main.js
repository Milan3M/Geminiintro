document.addEventListener("DOMContentLoaded", function () {
  /* -------------------------
     Preloader Fade Out
  -------------------------- */
  const preloader = document.getElementById("preloader");
  window.addEventListener("load", () => {
    gsap.to(preloader, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        preloader.style.display = "none";
      },
    });
  });

  /* -------------------------
     Hamburger Menu Toggle
  -------------------------- */
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  /* -------------------------
     GSAP Scroll Animations
  -------------------------- */
  gsap.registerPlugin(ScrollTrigger);

  // Animate section titles
  gsap.utils.toArray(".section-title").forEach((title) => {
    gsap.from(title, {
      opacity: 0,
      y: 50,
      duration: 1,
      scrollTrigger: {
        trigger: title,
        start: "top 90%",
      },
    });
  });

  // Animate miscellaneous text and cards
  gsap.utils.toArray(".section-text, .project-card, .testimonial").forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
      },
      ease: "power2.out",
    });
  });

  // Hero text entrance
  gsap.from(".hero-title", {
    opacity: 0,
    y: -60,
    duration: 1.2,
    ease: "power2.out",
    delay: 0.6,
  });
  gsap.from(".hero-subtitle", {
    opacity: 0,
    y: 60,
    duration: 1.2,
    ease: "power2.out",
    delay: 0.8,
  });
  gsap.from(".primary-btn", {
    opacity: 0,
    scale: 0.8,
    duration: 1,
    ease: "back.out(1.7)",
    delay: 1,
  });

  /* -------------------------
     Three.js 3D Particle Background
  -------------------------- */
  const canvas = document.getElementById("three-canvas");
  if (canvas) {
    // Set up the scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      canvas.clientWidth / canvas.clientHeight,
      1,
      1000
    );
    camera.position.z = 400;

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Create a particle system
    const particlesCount = 2000;
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesPositions = [];
    for (let i = 0; i < particlesCount; i++) {
      particlesPositions.push(
        (Math.random() - 0.5) * 800,
        (Math.random() - 0.5) * 800,
        (Math.random() - 0.5) * 800
      );
    }
    particlesGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(particlesPositions, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 1.5,
      transparent: true,
      opacity: 0.8,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Animate the particle system
    function animate() {
      requestAnimationFrame(animate);
      particles.rotation.y += 0.0007;
      renderer.render(scene, camera);
    }
    animate();

    // Resize handling
    window.addEventListener("resize", () => {
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    });
  }
});
