// ============================================
// MDeangelis.me - Interactive JavaScript
// Modern, Smooth User Experience
// ============================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {

  // === Mobile Menu Toggle ===
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const isExpanded = navMenu.classList.contains('active');
      mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
      mobileMenuToggle.textContent = isExpanded ? '✕' : '☰';
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        mobileMenuToggle.textContent = '☰';
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        mobileMenuToggle.textContent = '☰';
      }
    });
  }

  // === Navbar Scroll Effect ===
  const navbar = document.querySelector('.navbar');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScrollY = window.scrollY;
  });

  // === Smooth Scroll for Anchor Links ===
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');

      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const navbarHeight = navbar.offsetHeight;
        const targetPosition = targetElement.offsetTop - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // === Intersection Observer for Fade-in Animations ===
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  // Observe all elements with fade-in class
  const fadeElements = document.querySelectorAll('.fade-in');
  fadeElements.forEach(element => {
    observer.observe(element);
  });

  // === Active Navigation Link Highlight ===
  const sections = document.querySelectorAll('section[id]');

  const highlightNavLink = () => {
    const scrollY = window.scrollY;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - navbar.offsetHeight - 100;
      const sectionId = section.getAttribute('id');
      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (navLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLink.classList.add('active');
        } else {
          navLink.classList.remove('active');
        }
      }
    });
  };

  window.addEventListener('scroll', highlightNavLink);
  highlightNavLink(); // Initial call

  // === Hero Typing Effect ===
  const subtitleElement = document.querySelector('.hero-subtitle');
  if (subtitleElement) {
    const text = subtitleElement.textContent;
    subtitleElement.textContent = '';
    let i = 0;

    function typeWriter() {
      if (i < text.length) {
        subtitleElement.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
      } else {
        // Remove pulsing cursor after typing is done
        subtitleElement.style.borderRight = 'none';
      }
    }

    // Start typing after a small delay
    setTimeout(typeWriter, 1000);
  }

  // === Hero Parallax Effect ===
  const heroContent = document.querySelector('.hero-content');
  const heroOrbs = document.querySelectorAll('.hero-orb');

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    if (scrolled < window.innerHeight) {
      if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.4}px)`;
        heroContent.style.opacity = 1 - (scrolled / 700);
      }

      heroOrbs.forEach((orb, index) => {
        const speed = index === 0 ? 0.2 : 0.1;
        orb.style.transform = `translateY(${scrolled * speed}px)`;
      });
    }
  });

  // === Interactive 3D Tilt Cards ===
  const interesseCards = document.querySelectorAll('.interesse-card');

  interesseCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10; // Max rotation deg
      const rotateY = ((x - centerX) / centerX) * 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

      // Update glow effect position
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
  });

  // === Cursor Glow Effect (Global) ===
  const cursorGlow = document.createElement('div');
  cursorGlow.classList.add('cursor-glow');
  document.body.appendChild(cursorGlow);

  document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
  });

  // === CTA Button Enhanced Click Effect ===
  const ctaButtons = document.querySelectorAll('.cta-button');

  ctaButtons.forEach(button => {
    button.addEventListener('click', function (e) {
      // Create a pulse effect
      this.style.transform = 'scale(0.95)';

      setTimeout(() => {
        this.style.transform = '';
      }, 150);
    });
  });

  // === Performance: Lazy Loading ===
  // Native lazy loading is supported by all modern browsers. 
  // No polyfill needed for this project target.

  // === Accessibility: Keyboard Navigation Enhancement ===
  document.addEventListener('keydown', (e) => {
    // Focus visible for keyboard users
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-nav');
    }
  });

  document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
  });

  // === Dynamic Copyright Year ===
  const updateCopyrightYear = () => {
    const yearElements = document.querySelectorAll('.copyright-year');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(element => {
      element.textContent = currentYear;
    });
  };

  updateCopyrightYear();

  // === Performance Monitoring (Optional) ===
  if ('PerformanceObserver' in window) {
    try {
      const perfObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'measure') {
            console.log(`Performance: ${entry.name} took ${entry.duration}ms`);
          }
        }
      });

      perfObserver.observe({ entryTypes: ['measure'] });

      // Mark page load complete
      window.addEventListener('load', () => {
        performance.mark('page-load-complete');
      });
    } catch (e) {
      // Performance API not fully supported
      console.log('Performance monitoring not available');
    }
  }

  // === Debug Info (Dev Only - Remove in Production) ===
  console.log('%c👋 Ciao! Welcome to mdeangelis.me', 'font-size: 20px; font-weight: bold; color: #e07856;');
  console.log('%cMade with ❤️ and passion for technology', 'font-size: 14px; color: #a8adb7;');

});



// === Interest Modal Logic === //

const interestDetails = {
  "Informatica": {
    title: "Informatica & Architetture",
    text: `
      <p>L'informatica è il mio linguaggio naturale. Non mi limito a utilizzare gli strumenti, ma cerco di comprenderne i meccanismi profondi. Dalle architetture dei sistemi distribuiti alla sicurezza informatica, ogni aspetto è una sfida intellettuale.</p>
      <p>Mi affascina progettare soluzioni scalabili e robuste, ottimizzando le risorse e garantendo la continuità operativa. Per me, un sistema informatico ben progettato è un'opera d'arte funzionale.</p>
    `
  },
  "Tecnologia": {
    title: "Frontiera Tecnologica",
    text: `
      <p>Vivo immerso nell'innovazione. Seguo costantemente l'evoluzione dell'hardware e del software, dai processori di nuova generazione ai dispositivi IoT che rendono le nostre case intelligenti.</p>
      <p>La tecnologia non è solo gadget, ma uno strumento per migliorare la qualità della vita. Sperimento con domotica, wearable tech e realtà aumentata per esplorare come il digitale possa fondersi armoniosamente con il fisico.</p>
    `
  },
  "Programmazione": {
    title: "Arte del Codice",
    text: `
      <p>Scrivere codice è come comporre musica: richiede tecnica, creatività e struttura. Sono uno sviluppatore appassionato di Clean Code e Best Practices.</p>
      <p>I miei linguaggi e framework di riferimento includono JavaScript (React, Node.js), Python per automazione e AI, e CSS moderno per UI spettacolari. Amo risolvere problemi algoritmici complessi e trasformare idee astratte in software funzionante.</p>
    `
  },
  "Intelligenza Artificiale": {
    title: "AI & Machine Learning",
    text: `
      <p>L'Intelligenza Artificiale è la rivoluzione del nostro tempo. Studio i Large Language Models, le reti neurali e le applicazioni generative che stanno ridefinendo la creatività e il lavoro.</p>
      <p>Mi interesso non solo agli aspetti tecnici, ma anche all'etica dell'AI e al suo impatto sociale. Utilizzo strumenti AI quotidianamente per potenziare la produttività ed esplorare nuove frontiere creative.</p>
    `
  },
  "Viaggi": {
    title: "Esplorazione Globale",
    text: `
      <p>Viaggiare è l'unica cosa che compri e che ti rende più ricco. Ogni destinazione è un'opportunità per uscire dalla comfort zone e vedere il mondo con occhi diversi.</p>
      <p>Amo sia le metropoli frenetiche che i paesaggi naturali incontaminati. Ogni viaggio è documentato con foto e appunti, costruendo un bagaglio di esperienze che influenza anche il mio approccio al lavoro e alla vita.</p>
    `
  },
  "Passeggiate": {
    title: "Walking & Thinking",
    text: `
      <p>Solvitur ambulando: camminando si risolve. Le lunghe passeggiate sono il mio metodo preferito per il debugging mentale. Immerso nella natura o tra le vie cittadine, trovo chiarezza e nuove idee.</p>
      <p>È un momento di disconnessione digitale e riconnessione con il mondo reale, essenziale per mantenere l'equilibrio e la creatività.</p>
    `
  },
  "Lettura": {
    title: "Biblioteca Mentale",
    text: `
      <p>I libri sono portali verso altre menti. La mia libreria spazia dalla saggistica tecnica alla fantascienza speculativa, dalla filosofia alla biografia di grandi innovatori.</p>
      <p>Credo nell'apprendimento continuo (Life-long Learning) e la lettura è il carburante principale per la mia crescita personale e professionale.</p>
    `
  },
  "Musica": {
    title: "Soundscapes & Ritmo",
    text: `
      <p>La musica è matematica emotiva. Ascolto una vasta gamma di generi, dall'elettronica ambient al jazz, cercando sempre sonorità che stimolino l'immaginazione.</p>
      <p>Mi diletto anche nella produzione musicale digitale, esplorando sintetizzatori e sound design. La musica accompagna ogni mia sessione di coding, dettando il ritmo del flusso di lavoro.</p>
      <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.1);">
        <p><strong>🎧 Ascolta le mie produzioni:</strong></p>
        <div style="display: flex; flex-wrap: wrap; gap: 1rem; margin-top: 1rem;">
          <a href="https://open.spotify.com/intl-it/artist/3OucxkLy5uqnpSEHavZbpe" target="_blank" rel="noopener" style="color: #1DB954; text-decoration: none; display: flex; align-items: center; gap: 10px; font-weight: 500; background: rgba(29,185,84,0.1); padding: 0.75rem 1rem; border-radius: 12px; transition: transform 0.2s;">
            <img src="./assets/icon_music_spotify.png" alt="Spotify" style="width: 32px; height: 32px; object-fit: contain;">
            Spotify
          </a>
          <a href="https://music.apple.com/us/artist/mdeangelis/1796261710" target="_blank" rel="noopener" style="color: #FC3C44; text-decoration: none; display: flex; align-items: center; gap: 10px; font-weight: 500; background: rgba(252,60,68,0.1); padding: 0.75rem 1rem; border-radius: 12px; transition: transform 0.2s;">
            <img src="./assets/icon_music_applemusic.png" alt="Apple Music" style="width: 32px; height: 32px; object-fit: contain;">
            Apple Music
          </a>
          <a href="https://music.youtube.com/watch?v=KHAmgXV0C3E&si=NrSRWKvDqQhWrx_g" target="_blank" rel="noopener" style="color: #FF0000; text-decoration: none; display: flex; align-items: center; gap: 10px; font-weight: 500; background: rgba(255,0,0,0.1); padding: 0.75rem 1rem; border-radius: 12px; transition: transform 0.2s;">
            <img src="./assets/icon_social_youtube.png" alt="YouTube Music" style="width: 32px; height: 32px; object-fit: contain;">
            YouTube Music
          </a>
        </div>
      </div>
    `
  },
  "Cultura": {
    title: "Arte & Storia",
    text: `
      <p>La tecnologia senza cultura è vuota. Mi nutro di arte, cinema, teatro e storia per comprendere il contesto umano in cui operiamo.</p>
      <p>Visitare musei, assistere a mostre e approfondire periodi storici mi aiuta a sviluppare un pensiero laterale fondamentale per l'innovazione creativa.</p>
    `
  },
  "Amici": {
    title: "Connessioni Autentiche",
    text: `
      <p>In un mondo iperconnesso digitalmente, il valore di un abbraccio, di una risata condivisa e di una presenza fisica è inestimabile.</p>
      <p>Investo tempo ed energia nelle relazioni, organizzando incontri e mantenendo viva la rete sociale reale. Gli amici sono la famiglia che ci scegliamo.</p>
    `
  },
  "Buon Cibo": {
    title: "Gastronomia & Gusto",
    text: `
      <p>Il cibo è cultura commestibile. Sono un appassionato gourmet che ama esplorare ristoranti e trattorie alla ricerca di sapori autentici.</p>
      <p>Mi piace anche cucinare, sperimentando ricette e tecniche. La cucina, come il codice, richiede ingredienti di qualità, processi precisi e un tocco di creatività personale.</p>
    `
  },
  "Vini": {
    title: "Enologia & Passione",
    text: `
      <p>Il vino è poesia imbottigliata. La mia passione enologica mi porta a studiare vitigni, terroir e tecniche di vinificazione.</p>
      <p>Amo partecipare a degustazioni e visitare cantine, scoprendo le storie dei produttori. Un buon calice è il compagno perfetto per una conversazione profonda o un momento di relax.</p>
    `
  },
  "Conversazioni": {
    title: "Dialettica & Scambio",
    text: `
      <p>Le grandi idee nascono dal confronto. Adoro le lunghe conversazioni notturne, i dibattiti costruttivi e lo scambio di punti di vista.</p>
      <p>Saper ascoltare è importante quanto saper parlare. Cerco sempre interlocutori che possano sfidare le mie convinzioni e arricchire la mia visione del mondo.</p>
    `
  },
  "Lingue": {
    title: "Poliglotta",
    text: `
      <p>Ogni lingua è una diversa visione della realtà. Parlo fluentemente Italiano e Inglese, e mi diverto a esplorare le basi di altre lingue.</p>
      <p>Imparare una lingua significa aprire una porta verso una nuova cultura, un nuovo modo di pensare e nuove opportunità di connessione umana.</p>
    `
  }
};

// Create Modal HTML structure
const createModal = () => {
  if (document.querySelector('.modal-overlay')) return;

  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'modal-overlay';
  modalOverlay.innerHTML = `
    <div class="modal-content" role="dialog" aria-modal="true">
      <div class="modal-header">
        <h2 class="modal-title"></h2>
        <button class="modal-close" aria-label="Chiudi">✕</button>
      </div>
      <div class="modal-body"></div>
    </div>
  `;
  document.body.appendChild(modalOverlay);

  // Close logic
  const closeBtn = modalOverlay.querySelector('.modal-close');
  closeBtn.addEventListener('click', closeModal);

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
      closeModal();
    }
  });
};

const openModal = (title, content) => {
  createModal();
  const modalOverlay = document.querySelector('.modal-overlay');
  const modalTitle = modalOverlay.querySelector('.modal-title');
  const modalBody = modalOverlay.querySelector('.modal-body');

  modalTitle.textContent = title;
  modalBody.innerHTML = content;

  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden'; // Prevent scrolling background
};

const closeModal = () => {
  const modalOverlay = document.querySelector('.modal-overlay');
  if (modalOverlay) {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }
};

// Bind click events to cards
document.addEventListener('DOMContentLoaded', () => {
  // Existing code...

  // Re-select cards in case they were dynamically added (though they are static here)
  const cards = document.querySelectorAll('.interesse-card');
  cards.forEach(card => {
    card.addEventListener('click', function () {
      const titleEl = this.querySelector('.interesse-title');
      if (titleEl) {
        const key = titleEl.textContent.trim();
        const details = interestDetails[key];

        if (details) {
          openModal(details.title, details.text);
        }
      }
    });
  });
});

