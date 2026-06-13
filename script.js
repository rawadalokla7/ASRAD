// =============================================
// ASRAD ENHANCED — 10/10 Experience Script
// Features: GSAP animations, Three.js WebGL, Lenis smooth scroll,
//           Kinetic typography, 3D tilt, Audio, Theme system
// =============================================

document.addEventListener('DOMContentLoaded', () => {

  // =============================================
  // LOADING SCREEN
  // =============================================
  const loadingScreen = document.createElement('div');
  loadingScreen.id = 'loading-screen';
  loadingScreen.innerHTML = `
    <svg width="60" height="60" viewBox="0 0 500 500" fill="none" style="animation: spin 2s linear infinite;">
      <circle cx="250" cy="250" r="235" stroke="#C8A053" stroke-width="2" fill="none" opacity="0.3"/>
      <circle cx="250" cy="250" r="215" stroke="#C8A053" stroke-width="1.5" stroke-dasharray="4 2" opacity="0.5"/>
      <text x="248" y="280" text-anchor="middle" fill="#C8A053" font-size="120" font-family="'Cinzel', serif" font-weight="600" letter-spacing="-8">RA</text>
    </svg>
    <div class="loading-bar"><div class="loading-bar-fill" id="loading-fill"></div></div>
    <span style="font-family: 'Cinzel', serif; font-size: 11px; color: #C8A053; letter-spacing: 0.3em; text-transform: uppercase;">Rooted in Elegance</span>
  `;
  document.body.appendChild(loadingScreen);

  // Real resource loading with progress tracking
  const resourcesToLoad = [
    'https://cdn.tailwindcss.com',
    'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollToPlugin.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',
    'https://unpkg.com/lenis@1.1.18/dist/lenis.min.js',
    'https://unpkg.com/lucide@latest'
  ];

  let loadedCount = 0;
  const totalResources = resourcesToLoad.length;
  const fill = document.getElementById('loading-fill');

  function updateProgress() {
    loadedCount++;
    const progress = Math.min((loadedCount / totalResources) * 100, 100);
    if (fill) fill.style.width = progress + '%';

    if (loadedCount >= totalResources) {
      setTimeout(() => {
        loadingScreen.classList.add('hidden');
        initApp();
      }, 400);
    }
  }

  document.querySelectorAll('script[src]').forEach(script => {
    if (script.src.includes('cdn') || script.src.includes('unpkg')) {
      script.addEventListener('load', updateProgress);
      script.addEventListener('error', updateProgress);
    }
  });

  setTimeout(() => {
    if (loadedCount < totalResources) {
      const interval = setInterval(() => {
        loadedCount++;
        const progress = Math.min((loadedCount / totalResources) * 100, 100);
        if (fill) fill.style.width = progress + '%';
        if (loadedCount >= totalResources) {
          clearInterval(interval);
          setTimeout(() => {
            loadingScreen.classList.add('hidden');
            initApp();
          }, 400);
        }
      }, 150);
    }
  }, 2000);

  function initApp() {
    // =============================================
    // LENIS SMOOTH SCROLL
    // =============================================
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // =============================================
    // WEBGL GOLDEN MESH BACKGROUND
    // =============================================
    initWebGL();

    // =============================================
    // GOLDEN PARTICLES
    // =============================================
    initParticles();

    // =============================================
    // ENHANCED CURSOR
    // =============================================
    initCursor();

    // =============================================
    // THEME TOGGLE
    // =============================================
    initTheme();

    // =============================================
    // AUDIO SYSTEM
    // =============================================
    initAudio();

    // =============================================
    // GSAP SCROLL ANIMATIONS
    // =============================================
    initGSAPAnimations();

    // =============================================
    // 3D TILT CARDS
    // =============================================
    initTiltCards();

    // =============================================
    // KINETIC TYPOGRAPHY
    // =============================================
    initKineticTypography();

    // =============================================
    // NAVBAR SCROLL
    // =============================================
    initNavbar(lenis);

    // =============================================
    // HERO SLIDESHOW
    // =============================================
    initHeroSlideshow();

    // =============================================
    // SERVICES
    // =============================================
    initServices();

    // =============================================
    // WORKS FILTER
    // =============================================
    initWorksFilter();

    // =============================================
    // LIGHTBOX
    // =============================================
    initLightbox(lenis);

    // =============================================
    // CONTACT FORM
    // =============================================
    initContactForm();

    // =============================================
    // BACK TO TOP
    // =============================================
    initBackToTop(lenis);

    // =============================================
    // MOBILE MENU
    // =============================================
    initMobileMenu(lenis);

    // =============================================
    // LUCIDE ICONS
    // =============================================
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  // =============================================
  // WEBGL GOLDEN MESH
  // =============================================
  function initWebGL() {
    try {
      const canvas = document.getElementById('webgl-canvas');
      if (!canvas || window.matchMedia('(pointer: coarse)').matches) return;

      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        console.warn('WebGL not supported, skipping 3D background');
        return;
      }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create golden mesh lines
    const geometry = new THREE.BufferGeometry();
    const count = 30;
    const positions = [];

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 20;
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 10;
      positions.push(x, y, z);
      positions.push(x + (Math.random() - 0.5) * 3, y + (Math.random() - 0.5) * 3, z);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));

    const material = new THREE.LineBasicMaterial({
      color: 0xC8A053,
      transparent: true,
      opacity: 0.15
    });

    const lines = new THREE.LineSegments(geometry, material);
    scene.add(lines);

    // Add floating golden particles
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 100;
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
      particlePositions[i] = (Math.random() - 0.5) * 20;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xEAD093,
      size: 0.03,
      transparent: true,
      opacity: 0.6
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    camera.position.z = 5;

    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    let frame = 0;
    function animate() {
      frame++;
      requestAnimationFrame(animate);

      lines.rotation.x += 0.0003;
      lines.rotation.y += 0.0005;
      lines.rotation.z += 0.0002;

      particles.rotation.y += 0.0002;

      // Mouse parallax
      lines.rotation.x += mouseY * 0.0001;
      lines.rotation.y += mouseX * 0.0001;

      renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
    } catch (err) {
      console.warn('WebGL initialization failed:', err.message);
    }
  }

  // =============================================
  // GOLDEN PARTICLES
  // =============================================
  function initParticles() {
    const container = document.getElementById('particles-container');
    if (!container || window.matchMedia('(pointer: coarse)').matches) return;

    const particleCount = 25;
    for (let i = 0; i < particleCount; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.animationDelay = Math.random() * 12 + 's';
      p.style.animationDuration = (8 + Math.random() * 8) + 's';
      p.style.width = (2 + Math.random() * 3) + 'px';
      p.style.height = p.style.width;
      container.appendChild(p);
    }
  }

  // =============================================
  // ENHANCED CURSOR
  // =============================================
  function initCursor() {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    const trail = document.getElementById('cursor-trail');
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let trailX = 0, trailY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + 'px';
      dot.style.top = mouseY + 'px';
    });

    function animateCursor() {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      trailX += (mouseX - trailX) * 0.06;
      trailY += (mouseY - trailY) * 0.06;

      ring.style.left = ringX + 'px';
      ring.style.top = ringY + 'px';
      if (trail) {
        trail.style.left = trailX + 'px';
        trail.style.top = trailY + 'px';
      }

      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], .work-card, .service-select-btn, .tilt-card');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
      el.addEventListener('mousedown', () => document.body.classList.add('cursor-click'));
      el.addEventListener('mouseup', () => document.body.classList.remove('cursor-click'));
    });
  }

  // =============================================
  // THEME TOGGLE
  // =============================================
  function initTheme() {
    const toggle = document.getElementById('theme-toggle');
    const icon = document.getElementById('theme-icon');
    if (!toggle) return;

    // Check saved preference
    const savedTheme = localStorage.getItem('asrad-theme');
    if (savedTheme === 'light') {
      document.body.classList.add('light-mode');
      updateThemeIcon(true);
    }

    toggle.addEventListener('click', () => {
      const isLight = document.body.classList.toggle('light-mode');
      localStorage.setItem('asrad-theme', isLight ? 'light' : 'dark');
      updateThemeIcon(isLight);
      playSound('click');
    });

    function updateThemeIcon(isLight) {
      if (!icon) return;
      icon.innerHTML = isLight 
        ? '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>'
        : '<circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>';
    }
  }

  // =============================================
  // AUDIO SYSTEM
  // =============================================
  let audioEnabled = false;
  let audioContext = null;

  function initAudio() {
    const toggle = document.getElementById('audio-toggle');
    if (!toggle) return;

    toggle.addEventListener('click', async () => {
      if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
      }
      audioEnabled = !audioEnabled;
      toggle.style.opacity = audioEnabled ? '1' : '0.5';
      if (audioEnabled) {
        playAmbientSound();
      }
    });
  }

  function playSound(type) {
    if (!audioEnabled || !audioContext) return;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    if (type === 'click') {
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.1);
      gainNode.gain.setValueAtTime(0.03, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.15);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.15);
    } else if (type === 'hover') {
      oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.02, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.08);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.08);
    } else if (type === 'success') {
      oscillator.frequency.setValueAtTime(523, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.1);
      oscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.2);
      gainNode.gain.setValueAtTime(0.04, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.4);
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.4);
    }
  }

  function playAmbientSound() {
    // Subtle ambient pad would go here with Web Audio API
  }

  window.playSound = playSound;

  // =============================================
  // GSAP SCROLL ANIMATIONS
  // =============================================
  function initGSAPAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Reveal items on scroll
    const revealItems = document.querySelectorAll('.reveal-item');
    revealItems.forEach((item, index) => {
      gsap.fromTo(item, 
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          delay: index % 3 * 0.1
        }
      );
    });

    // Reveal-scale items on scroll (e.g. testimonial cards)
    const revealScaleItems = document.querySelectorAll('.reveal-scale');
    revealScaleItems.forEach((item, index) => {
      gsap.fromTo(item,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          delay: index % 3 * 0.1
        }
      );
    });

    // Generic .reveal items on scroll
    const revealGenericItems = document.querySelectorAll('.reveal');
    revealGenericItems.forEach((item, index) => {
      gsap.fromTo(item,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          delay: index % 3 * 0.1
        }
      );
    });

    // Parallax for decorative elements
    gsap.utils.toArray('.orb-float').forEach(el => {
      gsap.to(el, {
        y: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: el.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1
        }
      });
    });

    // Stats counter animation with GSAP
    const statCounters = document.querySelectorAll('.stat-counter');
    statCounters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target')) || 0;
      const suffix = counter.getAttribute('data-suffix') || '';

      ScrollTrigger.create({
        trigger: counter,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(counter, {
            innerHTML: target,
            duration: 2,
            ease: 'power2.out',
            snap: { innerHTML: 1 },
            onUpdate: function() {
              counter.innerHTML = Math.round(this.targets()[0].innerHTML) + suffix;
            }
          });
        },
        once: true
      });
    });

    // Section headings animation
    gsap.utils.toArray('section h2').forEach(heading => {
      gsap.fromTo(heading,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });
  }

  // =============================================
  // 3D TILT CARDS
  // =============================================
  function initTiltCards() {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const cards = document.querySelectorAll('.tilt-card');

    cards.forEach(card => {
      const glare = document.createElement('div');
      glare.className = 'tilt-glare';
      card.appendChild(glare);

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / centerY * -8;
        const rotateY = (x - centerX) / centerX * 8;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

        // Move glare
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;
        glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.08) 0%, transparent 60%)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      });
    });
  }

  // =============================================
  // KINETIC TYPOGRAPHY
  // =============================================
  function initKineticTypography() {
    const heroTitle = document.getElementById('hero-title');
    if (!heroTitle) return;

    const chars = heroTitle.querySelectorAll('.hero-char');
    chars.forEach((char, index) => {
      setTimeout(() => {
        char.classList.add('animated');
      }, 600 + index * 150);
    });
  }

  // =============================================
  // NAVBAR
  // =============================================
  function initNavbar(lenis) {
    const navbar = document.getElementById('navbar');
    const progressBar = document.getElementById('scroll-progress');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    if (!navbar) return;

    lenis.on('scroll', ({ scroll, limit }) => {
      // Progress bar
      if (progressBar) {
        progressBar.style.width = (scroll / limit) * 100 + '%';
      }

      // Navbar style
      if (scroll > 50) {
        navbar.classList.remove('bg-transparent', 'py-5', 'lg:py-6');
        navbar.classList.add('bg-[#051613]/95', 'backdrop-blur-md', 'border-b', 'border-[#C8A053]/15', 'py-3.5', 'shadow-lg');
      } else {
        navbar.classList.remove('bg-[#051613]/95', 'backdrop-blur-md', 'border-b', 'border-[#C8A053]/15', 'py-3.5', 'shadow-lg');
        navbar.classList.add('bg-transparent', 'py-5', 'lg:py-6');
      }

      // Scroll spy
      let currentSectionId = 'hero';
      sections.forEach(sec => {
        if (scroll + 150 >= sec.offsetTop && scroll + 150 < sec.offsetTop + sec.offsetHeight) {
          currentSectionId = sec.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        const indicator = link.querySelector('.nav-indicator');
        if (link.getAttribute('data-section') === currentSectionId) {
          link.classList.remove('text-[#F7F1E5]/70');
          link.classList.add('text-[#C8A053]', 'font-semibold', 'active-nav');
          if (indicator) indicator.classList.remove('hidden');
        } else {
          link.classList.remove('text-[#C8A053]', 'font-semibold', 'active-nav');
          link.classList.add('text-[#F7F1E5]/70');
          if (indicator) indicator.classList.add('hidden');
        }
      });
    });
  }

  // =============================================
  // HERO SLIDESHOW
  // =============================================
  function initHeroSlideshow() {
    const slides = document.querySelectorAll('.hero-slide');
    const slideDotBtns = document.querySelectorAll('.hero-dot-btn');
    const prevSlideBtn = document.getElementById('hero-slide-prev');
    const nextSlideBtn = document.getElementById('hero-slide-next');

    const slideData = [
      { logo: 'MILAN', title: 'مـيـلان', subtitle: 'العطور الفاخرة عيار ٢٤', tag: 'العلامة الفاخرة لعام 2025' },
      { logo: 'AL-TARAF GROUP', title: 'مجموعة الترف العالمية', subtitle: 'التوجيه السينمائي والبراندينج', tag: 'التوجيه السينمائي المتميز' },
      { logo: 'ROWDAH', title: 'الروضة', subtitle: 'أركان معمارية متناسقة', tag: 'المنصات التفاعلية الراقية' },
      { logo: 'JOUD', title: 'جـيـود', subtitle: 'معرض الفن المعاصر', tag: 'الشبكات الاجتماعية المتميزة' }
    ];

    let currentSlideIndex = 0;
    let slideTimer = null;

    function showSlide(index) {
      if (index >= slides.length) index = 0;
      if (index < 0) index = slides.length - 1;
      currentSlideIndex = index;

      slides.forEach((slide, i) => {
        if (i === index) {
          gsap.to(slide, { opacity: 1, duration: 1, ease: 'power2.inOut' });
          slide.classList.add('z-10');
        } else {
          gsap.to(slide, { opacity: 0, duration: 1, ease: 'power2.inOut' });
          slide.classList.remove('z-10');
        }
      });

      const data = slideData[index];
      const logoLabel = document.getElementById('slide-logo-label');
      const titleLabel = document.getElementById('slide-title-label');
      const subtitleLabel = document.getElementById('slide-subtitle-label');
      const tagLabel = document.getElementById('slide-tag');

      if (logoLabel) logoLabel.textContent = `المشروع المميز / ${data.logo}`;
      if (titleLabel) titleLabel.textContent = data.title;
      if (subtitleLabel) subtitleLabel.textContent = data.subtitle;
      if (tagLabel) tagLabel.textContent = data.tag;

      slideDotBtns.forEach((btn, i) => {
        const span = btn.querySelector('span');
        if (!span) return;
        if (i === index) {
          span.className = 'text-[10px] font-medium block px-3 py-1 rounded-full border bg-[#C8A053] text-[#051613] border-[#C8A053]';
        } else {
          span.className = 'text-[10px] font-medium block px-3 py-1 rounded-full border bg-[#0E4027]/10 text-[#F7F1E5]/50 border-white/5 hover:border-[#C8A053]/30 hover:text-[#C8A053]';
        }
      });
    }

    function startSlideTimer() {
      clearInterval(slideTimer);
      slideTimer = setInterval(() => showSlide(currentSlideIndex + 1), 6000);
    }

    if (nextSlideBtn) nextSlideBtn.addEventListener('click', () => { showSlide(currentSlideIndex + 1); startSlideTimer(); });
    if (prevSlideBtn) prevSlideBtn.addEventListener('click', () => { showSlide(currentSlideIndex - 1); startSlideTimer(); });
    slideDotBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        showSlide(parseInt(btn.getAttribute('data-index')));
        startSlideTimer();
      });
    });
    startSlideTimer();
  }

  // =============================================
  // SERVICES
  // =============================================
  function initServices() {
    const serviceSelectBtns = document.querySelectorAll('.service-select-btn');
    const serviceDetailImage = document.getElementById('service-detail-image');
    const serviceDetailTitle = document.getElementById('service-detail-title');
    const serviceDetailIcon = document.getElementById('service-detail-icon');
    const serviceDetailDesc = document.getElementById('service-detail-desc');
    const serviceDetailBullets = document.getElementById('service-detail-bullets');

    const servicesData = {
      'brand-research': {
        title: 'دراسة واستكشاف كينونة العلامة ورسم الفلسفة',
        description: 'نبحث في الجذور والوجدان المعرفي لكل منشأة؛ لنستلهم قصة عميقة، فلسفة مستدامة، ومقومات جمالية تصنع اتجاهاً فنياً يستقطب النخبة.',
        imageUrl: 'images/ASRAD-1.png',
        icon: 'compass',
        bullets: [
          'تحديد السرد الفلسفي والتوجه الفكري والمقومات الكلاسيكية.',
          'صياغة اسم العلامة ونبرة صوتها التعبيرية الراقية الهيبة.',
          'تصميم وبناء لوحات الإلهام (Moodboards) والمحاكاة الجمالية.',
          'توفير مشاورات مباشرة ١-١ لرسم استراتيجية رصينة ومدروسة.'
        ]
      },
      'logo-geometry': {
        title: 'تصميم التمائم والشعارات الهندسية',
        description: 'نصمم تمائم متفردة تعتمد على تناغم الأشكال ونسب النسبة الذهبية الكلاسيكية، لتستقر دلالاتها بعمق في وجدان جمهورك المستهدف.',
        imageUrl: 'images/logo_geometry.png',
        icon: 'sparkles',
        bullets: [
          'هندسة ورسم الشعارات بالخطوط المعمارية والنسب الكلاسيكية.',
          'دراسة الفراغ والمساحات السلبية حول الأيقونة لضمان الرسوخ.',
          'صياغة التميمة الفريدة المناسبة للطباعة الفاخرة والنقش بالذهب.',
          'تأطير الشعار بجميع صيغه البنيوية المعتمدة.'
        ]
      },
      'brand-guidelines': {
        title: 'أدلة الهوية العلوية ونظم الطباعة وتحديد الخطوط',
        description: 'نجمع تفاصيل هويتك في دليل كامل من طراز فاخر، يحدد قواعد الاستخدام، الألوان البانتونية المخصصة، والخطوط السينيمائية المناسبة لبراندك.',
        imageUrl: 'images/asrad_concept.png',
        icon: 'origami',
        bullets: [
          'تحديد الألوان الحصرية (Pantone الذهب المطفأ، والظل الفخم).',
          'اختيار ورسم الخطوط الاستثنائية والخط العربي المصاحب.',
          'بناء الدليل الكامل للاستخدام وتطبيقات الهوية والعلانات.',
          'تصميم المواد المكتبية والأوراق والبطاقات الجاهزة للإنتاج.'
        ]
      },
      'sensory-packaging': {
        title: 'التطبيق الحسي وتصميم قوالب تغليف المنتجات',
        description: 'نحول هويتك إلى تلمسات حسية ملموسة؛ من زجاجات العطور والعلب الفارهة ورقائق القماش والتذهيب البارز لتبث شعور الرفاهية الأبرز.',
        imageUrl: 'images/AL-Hikma-1.png',
        icon: 'pen-tool',
        bullets: [
          'تصميم زجاجات عطور ومجسمات فنية مخصصة ثنائية الأبعاد.',
          'بناء قوالب الصناديق وحقائب التغليف الفاخرة المعتمدة.',
          'رسم تفاصيل النقش، حياكة الحصائر، والختم الحراري بالذهب.',
          'اختيار نوعيات الأوراق الفاخرة ذات الأطراف المشرشرة.'
        ]
      },
      'digital-outlook': {
        title: 'المواءمة والامتداد البصري الرقمي للهوية',
        description: 'نوجه اتساق الهوية البصرية ليتكامل بهدوء وجمالية مع شبكة إنستغرام والمعارض الإلكترونية الرقمية لضمان الهيبة الفورية على الهواتف والأجهزة.',
        imageUrl: 'images/rowdah_web_2.png',
        icon: 'cpu',
        bullets: [
          'تصميم تماثل منشورات شبكة الإنستغرام بمفهوم الفن المعماري الصامت.',
          'بناء هوية مرئية متطابقة مع شاشات التابلت دون تداخل الكلمات.',
          'تصميم التوجيه واللوحات الجمالية الرقمية والمتحركة الأنيقة.',
          'دليل رقمي شامل لإنتاج حملات إعلانية وتوضيحية.'
        ]
      }
    };

    serviceSelectBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const serviceId = btn.getAttribute('data-id');
        const data = servicesData[serviceId];
        if (!data) return;

        playSound('click');

        // Reset all buttons
        serviceSelectBtns.forEach(other => {
          other.classList.remove('is-active');
          other.className = 'service-select-btn w-full text-right p-5 md:p-6 rounded-xl border transition-all duration-300 relative overflow-hidden flex items-center gap-4 group cursor-pointer bg-[#0E4027]/10 border-[#C8A053]/10 hover:border-[#C8A053]/25 hover:bg-[#0E4027]/20';

          const otherGlow = other.querySelector('.active-service-glow');
          if (otherGlow) otherGlow.classList.add('hidden');

          const otherBox = other.querySelector('.service-icon-box');
          if (otherBox) {
            otherBox.className = 'service-icon-box w-12 h-12 flex items-center justify-center rounded-lg border transition-all duration-300 bg-[#051613] text-[#C8A053] border-[#C8A053]/15';
          }

          const otherTitle = other.querySelector('.service-item-title');
          if (otherTitle) {
            otherTitle.classList.remove('text-[#C8A053]');
            otherTitle.classList.add('text-[#F7F1E5]');
          }

          const otherArrow = other.querySelector('.arrow-icon');
          if (otherArrow) {
            otherArrow.classList.remove('opacity-100', 'translate-x-0');
            otherArrow.classList.add('opacity-0', '-translate-x-2');
          }
        });

        // Activate clicked button
        btn.classList.add('is-active');
        btn.className = 'service-select-btn is-active w-full text-right p-5 md:p-6 rounded-xl border transition-all duration-300 relative overflow-hidden flex items-center gap-4 group cursor-pointer bg-[#0E4027]/40 border-[#C8A053]/40 shadow-md shadow-[#C8A053]/5';

        const glow = btn.querySelector('.active-service-glow');
        if (glow) glow.classList.remove('hidden');

        const box = btn.querySelector('.service-icon-box');
        if (box) {
          box.className = 'service-icon-box w-12 h-12 flex items-center justify-center rounded-lg border transition-all duration-300 bg-[#C8A053] text-[#051613] border-[#C8A053]';
        }

        const title = btn.querySelector('.service-item-title');
        if (title) {
          title.classList.remove('text-[#F7F1E5]');
          title.classList.add('text-[#C8A053]');
        }

        const arrow = btn.querySelector('.arrow-icon');
        if (arrow) {
          arrow.classList.remove('opacity-0', '-translate-x-2');
          arrow.classList.add('opacity-100', 'translate-x-0');
        }

        // Animate detail card
        const detailCard = document.getElementById('service-detail-card');
        if (detailCard) {
          gsap.to(detailCard, {
            opacity: 0,
            y: 15,
            duration: 0.25,
            ease: 'power2.in',
            onComplete: () => {
              if (serviceDetailImage) serviceDetailImage.setAttribute('src', data.imageUrl);
              if (serviceDetailTitle) serviceDetailTitle.textContent = data.title;
              if (serviceDetailIcon) { serviceDetailIcon.setAttribute('data-lucide', data.icon); }
              if (serviceDetailDesc) serviceDetailDesc.textContent = data.description;
              if (serviceDetailBullets) {
                serviceDetailBullets.innerHTML = data.bullets.map(b => `
                  <div class="flex items-start gap-2 text-xs text-[#F7F1E5]/90">
                    <i data-lucide="check-circle" class="w-4 h-4 text-[#C8A053] shrink-0 mt-0.5"></i>
                    <span>${b}</span>
                  </div>`).join('');
              }
              if (typeof lucide !== 'undefined') lucide.createIcons();

              gsap.to(detailCard, {
                opacity: 1,
                y: 0,
                duration: 0.4,
                ease: 'power2.out'
              });
            }
          });
        }
      });
    });
  }

  // =============================================
  // WORKS FILTER
  // =============================================
  function initWorksFilter() {
    const worksFilterTabs = document.querySelectorAll('.works-filter-tab');
    const workCards = document.querySelectorAll('.work-card');

    worksFilterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        playSound('click');

        worksFilterTabs.forEach(t => {
          t.className = 'works-filter-tab px-5 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-300 cursor-pointer bg-[#0E4027]/20 border border-[#C8A053]/10 text-[#F7F1E5]/70 hover:text-[#C8A053] hover:border-[#C8A053]/25';
        });
        tab.className = 'works-filter-tab px-5 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-300 cursor-pointer bg-[#C8A053] text-[#051613] shadow-md shadow-[#C8A053]/10';

        const grid = document.getElementById('works-grid');
        const activeFilter = tab.getAttribute('data-filter');
        if (grid) {
          gsap.to(grid, {
            opacity: 0.3,
            y: 8,
            duration: 0.25,
            ease: 'power2.in',
            onComplete: () => {
              workCards.forEach(card => {
                const cat = card.getAttribute('data-category');
                card.style.display = (activeFilter === 'all' || cat === activeFilter) ? 'block' : 'none';
              });
              gsap.to(grid, {
                opacity: 1,
                y: 0,
                duration: 0.4,
                ease: 'power2.out'
              });
            }
          });
        }
      });
    });
  }

  // =============================================
  // LIGHTBOX
  // =============================================
  function initLightbox(lenis) {
    const workDatabase = {
      'milan': {
        title: 'نـظـام الـهـويـة والـصـيـاغـة لـعـطـور مـيـلان',
        category: 'الهوية البصرية واللوجو',
        imageUrl: 'images/milan_brand_3.png',
        client: 'شركة ميلان المحدودة', year: '2025',
        description: 'تم تصميم النظام البصري الكامل لزجاجات وتغليف عطور ميلان. لوحة اختبار الخطوط الكلاسيكية ونسب الشعار المحفورة بطلاء الذهب عيار ٢٤ قيراط.',
        philosophy: 'موازنة الفراغات الهندسية حول التميمة الذهبية لتخليد الوجود البصري الفاخر لزجاجة العطر.'
      },
      'milan-digital': {
        title: 'مـطـبـوعـات ودلائـل الـغـايـلايـن الـمـتـكـامـلـة لـمـيـلانو',
        category: 'سوشال ميديا',
        imageUrl: 'images/milan_digital_2.png',
        client: 'شركة ميلانو المحدودة', year: '2025',
        description: 'كتاب الهوية البصرية المطبوع ونماذج قوالب التغليف والعلب الخضراء المعتمدة لعطور ميلان.',
        philosophy: 'نغمات من أخضر الغرير العميق وألوان الصحراء الدافئة دليلاً على ترسيخ العلامة التجارية.'
      },
      'luxury-exp': {
        title: 'مـخـرجـات ودلائـل حـمـلـة الـتـرف الـسـيـنـمـائـيـة',
        category: 'إعلانات وإخراج',
        imageUrl: 'images/taraf_luxury_brand_3.png',
        client: 'مجموعة الترف العالمية', year: '2024',
        description: 'صياغة كتيب التوجيه الفني والسينمائي المتكامل. رصد فلسفة الظل والضوء ونسب الكتلة الهندسية المنحوتة.',
        philosophy: 'الغموض الفاخر يخلق مسافة شغف تشد النخبة وتدفعهم لعيش التجربة الملموسة.'
      },
      'rowdah': {
        title: 'الـمـنـصـة الـتـفـاعـلـيـة لـطـيـف الـروضـة',
        category: 'موقع إلكتروني',
        imageUrl: 'images/rowdah_web_1.png',
        client: 'الروضة للتطوير والاستثمار', year: '2025',
        description: 'تصميم وبناء المنصة الرقمية التفاعلية للقصور والفلل السكنية الراقية مع أدوات القياس النحاسية المدمجة.',
        philosophy: 'التناسق الذهبي كمرجع بنيوي لتقاطع الكتل لتوجيه عين الزائر للنسب الأنيقة للمبنى.'
      },
      'joud': {
        title: 'الـهـويـة الـتـنـظـيـمـيـة لـشـبـكـة جـالـيـري جـيـود',
        category: 'سوشال ميديا',
        imageUrl: 'images/joud_social_3.png',
        client: 'جاليري جيود المعاصر', year: '2025',
        description: 'تنسيق قنوات التواصل الاجتماعي وصنع الدليل الجمالي الاستراتيجي لشبكة انستجرام في جاليري جيود.',
        philosophy: 'المساحات السلبية الإيفوارية لضمان أن القطعة الفنية تبقى البطل المطلق في الإطار.'
      },
      'aurum': {
        title: 'الـتـمـوضـع الـرقـمـي الـفـاخـر لـمـنـتـجـعـات أوروم',
        category: 'مواقع إلكترونية',
        imageUrl: 'images/aurum_2.png',
        client: 'مجموعة فنادق ومنتجعات أوروم العالمية', year: '2025',
        description: 'بناء وتطوير واجهات ونظام الحجز الرقمي للهواتف المحمولة والتابلت بخصوصية جمالية وفلسفة ضيافة فارهة.',
        philosophy: 'هندسة الواجهة تبث شعور الهدوء الفوري ليعكس هيبة وفخامة الخدمة المعمارية.'
      },
      'zaryab': {
        title: 'إحـيـاء هـويـة دار زريـاب لـلـتـراث والآلات الـفـنـيـة',
        category: 'الهوية البصرية واللوجو',
        imageUrl: 'images/zaryab_identity_2.png',
        client: 'دار زرياب للمقتنيات والتحف والموسيقى', year: '2024',
        description: 'إعادة صياغة الهوية الحروفية الفنية واللوجو المطور المطعم بذهب المعماريين لعلامة زرياب.',
        philosophy: 'تقاطعات فنية حركية تشبه توتر نبرات الآلات وعروق الأخشاب النادرة.'
      },
      'thuraya': {
        title: 'تـأصـيـل بدائـل الـعـلامـة لـمـجـوهـرات ثـريـا الـراقـيـة',
        category: 'الهوية البصرية واللوجو',
        imageUrl: 'images/thuraya_jewelry_brand_2.png',
        client: 'دار ثريا للمجوهرات الفاخرة', year: '2025',
        description: 'تصميم لوجو ونظام تعبئة مخملية فاخرة مرصعة بطلاء الذهب لبراند ثريا السويسري في جنيف ودمشق.',
        philosophy: 'الخطوط والنسب الذهبية المتناهية تبرهن على منتهى الفخامة من الوهلة الأولى للتغليف.'
      }
    };

    const lightbox = document.getElementById('work-lightbox');
    const lightboxBgClose = document.getElementById('lightbox-bg-close');
    const lightboxCloseBtn = document.getElementById('lightbox-close');
    const lightboxCloseBottom = document.getElementById('lightbox-close-bottom');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCategory = document.getElementById('lightbox-category');
    const lightboxCategorySpaced = document.getElementById('lightbox-category-spaced');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxClient = document.getElementById('lightbox-client');
    const lightboxYear = document.getElementById('lightbox-year');
    const lightboxDesc = document.getElementById('lightbox-desc');
    const lightboxPhilosophy = document.getElementById('lightbox-philosophy');

    function openLightbox(workId) {
      const data = workDatabase[workId];
      if (!data || !lightbox) return;

      playSound('click');

      if (lightboxImage) lightboxImage.setAttribute('src', data.imageUrl);
      if (lightboxCategory) lightboxCategory.textContent = data.category;
      if (lightboxCategorySpaced) lightboxCategorySpaced.textContent = `صالة المخرجات / ${data.category}`;
      if (lightboxTitle) lightboxTitle.textContent = data.title;
      if (lightboxClient) lightboxClient.textContent = data.client;
      if (lightboxYear) lightboxYear.textContent = data.year;
      if (lightboxDesc) lightboxDesc.textContent = data.description;
      if (lightboxPhilosophy) lightboxPhilosophy.textContent = data.philosophy;

      lightbox.classList.remove('opacity-0', 'pointer-events-none');
      lightbox.classList.add('opacity-100');

      const card = lightbox.querySelector('.relative.w-full.max-w-4xl');
      if (card) {
        gsap.fromTo(card, 
          { scale: 0.9, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: 'power3.out' }
        );
      }

      document.body.style.overflow = 'hidden';
      if (lenis) lenis.stop();
    }

    function closeLightbox() {
      if (!lightbox) return;

      playSound('click');

      const card = lightbox.querySelector('.relative.w-full.max-w-4xl');
      if (card) {
        gsap.to(card, {
          scale: 0.9,
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in',
          onComplete: () => {
            lightbox.classList.remove('opacity-100');
            lightbox.classList.add('opacity-0', 'pointer-events-none');
          }
        });
      } else {
        lightbox.classList.remove('opacity-100');
        lightbox.classList.add('opacity-0', 'pointer-events-none');
      }

      document.body.style.overflow = '';
      if (lenis) lenis.start();
    }

    document.querySelectorAll('.work-card').forEach(card => {
      card.addEventListener('click', () => openLightbox(card.getAttribute('data-id')));
    });

    if (lightboxBgClose) lightboxBgClose.addEventListener('click', closeLightbox);
    if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', closeLightbox);
    if (lightboxCloseBottom) lightboxCloseBottom.addEventListener('click', closeLightbox);

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  // =============================================
  // CONTACT FORM
  // =============================================
  function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const budgetButtons = document.querySelectorAll('.budget-opt-btn');
    const formSuccessBox = document.getElementById('form-success-box');
    const formSubmitBtn = document.getElementById('form-submit-btn');

    let selectedBudget = 'bespoke';
    const budgetLabels = {
      'premium': '3,000$ (باقة التأسيس)',
      'exclusive': '5,000$ (باقة التموضع الرقمي)',
      'elite': '7,000$ (الباقة الشاملة)',
      'bespoke': '10,000$+ (باقة المعماري المطلق)'
    };

    budgetButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        playSound('click');
        selectedBudget = btn.getAttribute('data-budget');
        budgetButtons.forEach(b => {
          b.className = 'budget-opt-btn py-3 px-4 rounded-xl text-center text-xs font-medium border transition-all duration-300 cursor-pointer bg-[#051613] border-[#C8A053]/10 text-[#F7F1E5]/70';
        });
        btn.className = 'budget-opt-btn py-3 px-4 rounded-xl text-center text-xs font-bold border transition-all duration-300 cursor-pointer bg-[#C8A053] text-[#051613] border-[#C8A053] shadow-md shadow-[#C8A053]/10';
      });
    });

    if (contactForm) {
      contactForm.setAttribute('novalidate', '');
      contactForm.addEventListener('submit', async e => {
        e.preventDefault();
        if (!formSubmitBtn) return;

        playSound('click');

        const original = formSubmitBtn.innerHTML;
        formSubmitBtn.disabled = true;
        formSubmitBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg><span>يجري إرسال موجز مشروعك...</span>`;

        const name = document.getElementById('form-name')?.value?.trim() || 'غير محدد';
        const phone = document.getElementById('form-phone')?.value?.trim() || 'غير محدد';
        const email = document.getElementById('form-email')?.value?.trim() || 'غير محدد';
        const service = document.getElementById('form-service')?.value || 'غير محدد';
        const message = document.getElementById('form-message')?.value?.trim() || 'غير محدد';
        const budget = budgetLabels[selectedBudget] || 'غير محدد';

        const serviceLabels = {
          'visual-identity': 'الهوية البصرية والمفاهيم الإبداعية',
          'web-development': 'تصميم وتطوير المواقع الفاخرة',
          'creative-ads': 'الحملات والإعلانات الإبداعية',
          'digital-content': 'صناعة المحتوى الرقمي الفاخر',
          'social-media': 'إدارة وتنسيق قنوات التواصل الاجتماعي'
        };
        const serviceName = serviceLabels[service] || service;

        // Honeypot check — if this hidden field has a value, it's a bot, silently stop.
        const honeypot = document.getElementById('form-website')?.value?.trim();
        if (honeypot) {
          formSubmitBtn.disabled = false;
          formSubmitBtn.innerHTML = original;
          return;
        }

        // ============================================
        // Web3Forms — every submission is sent directly to asrad901@gmail.com
        // the moment the user clicks "submit" (no redirect, stays on this page).
        // Access key is already configured below ✔
        // ============================================
        const WEB3FORMS_ACCESS_KEY = '9d150e66-8369-4784-83e4-ae3f29b1c4dc';

        const submissionMessage = `
طلب جديد من موقع أسراد

معلومات العميل:
- الاسم / الشركة: ${name}
- رقم الهاتف: ${phone}
- البريد الإلكتروني: ${email}

تفاصيل المشروع:
- الخدمة المطلوبة: ${serviceName}
- الميزانية التقديرية: ${budget}

الوصف والرؤية:
${message}

تاريخ الإرسال: ${new Date().toLocaleString('ar-SY')}
المصدر: asrad.design
        `.trim();

        try {
          const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json'
            },
            body: JSON.stringify({
              access_key: WEB3FORMS_ACCESS_KEY,
              subject: `طلب جديد من ${name} — موقع أسراد`,
              from_name: 'موقع أسراد — نموذج التواصل',
              name: name,
              phone: phone,
              email: email,
              service: serviceName,
              budget: budget,
              message: submissionMessage
            })
          });

          const result = await response.json();

          if (!response.ok || !result.success) {
            throw new Error(result.message || 'Submission failed');
          }

          playSound('success');
          if (formSuccessBox) {
            formSuccessBox.classList.remove('hidden');
            gsap.fromTo(formSuccessBox, 
              { opacity: 0, y: -10 },
              { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
            );
          }

          formSubmitBtn.className = 'w-full py-4 rounded-xl font-extrabold text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden cursor-not-allowed bg-emerald-600 text-white shadow-md';
          formSubmitBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg><span>تم الإرسال — تواصلنا معك خلال 24 ساعة</span>`;

          ['form-name','form-phone','form-email','form-message'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.value = '';
          });

          setTimeout(() => {
            if (formSuccessBox) {
              gsap.to(formSuccessBox, {
                opacity: 0,
                y: -10,
                duration: 0.3,
                onComplete: () => formSuccessBox.classList.add('hidden')
              });
            }
            formSubmitBtn.className = 'w-full py-4 rounded-xl font-extrabold text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden cursor-pointer bg-gradient-to-r from-[#C8A053] to-[#EAD093] text-[#051613] hover:brightness-105 shadow-xl shadow-[#C8A053]/10';
            formSubmitBtn.innerHTML = original;
            formSubmitBtn.disabled = false;
          }, 5000);

        } catch (err) {
          console.error('Form submission error:', err);
          formSubmitBtn.disabled = false;
          formSubmitBtn.innerHTML = original;
          alert('حدث خطأ أثناء الإرسال. يرجى التواصل مباشرة عبر الواتساب: +963 935 878 256');
        }
      });
    }
  }

  // =============================================
  // BACK TO TOP
  // =============================================
  function initBackToTop(lenis) {
    const bttBtn = document.getElementById('footer-back-to-top');
    if (bttBtn && lenis) {
      bttBtn.addEventListener('click', () => {
        playSound('click');
        lenis.scrollTo(0, { duration: 2 });
      });
    }

    const footerYearSpan = document.getElementById('footer-year');
    if (footerYearSpan) footerYearSpan.textContent = new Date().getFullYear();
  }

  // =============================================
  // MOBILE MENU
  // =============================================
  function initMobileMenu(lenis) {
    const mobileToggleBtn = document.getElementById('mobile-nav-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileToggleBtn && mobileMenu) {
      mobileToggleBtn.addEventListener('click', () => {
        playSound('click');
        const isOpen = mobileMenu.classList.contains('translate-x-0');
        if (isOpen) {
          gsap.to(mobileMenu, {
            x: '100%',
            opacity: 0,
            duration: 0.4,
            ease: 'power2.in',
            onComplete: () => {
              mobileMenu.classList.remove('translate-x-0', 'opacity-100');
              mobileMenu.classList.add('translate-x-full', 'opacity-0', 'pointer-events-none');
            }
          });
          setHamburger(false);
          if (lenis) lenis.start();
        } else {
          mobileMenu.classList.remove('translate-x-full', 'opacity-0', 'pointer-events-none');
          mobileMenu.classList.add('translate-x-0', 'opacity-100');
          gsap.fromTo(mobileMenu, 
            { x: '100%' },
            { x: '0%', duration: 0.5, ease: 'power3.out' }
          );
          setHamburger(true);
          if (lenis) lenis.stop();
        }
      });

      mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          gsap.to(mobileMenu, {
            x: '100%',
            opacity: 0,
            duration: 0.4,
            ease: 'power2.in',
            onComplete: () => {
              mobileMenu.classList.remove('translate-x-0', 'opacity-100');
              mobileMenu.classList.add('translate-x-full', 'opacity-0', 'pointer-events-none');
            }
          });
          setHamburger(false);
          if (lenis) lenis.start();
        });
      });
    }

    function setHamburger(isOpen) {
      const iconEl = document.getElementById('hamburger-icon');
      if (iconEl) {
        iconEl.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
        if (typeof lucide !== 'undefined') lucide.createIcons();
      }
    }
  }

}); // End DOMContentLoaded
