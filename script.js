document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       NAVBAR SCROLL EFFECT
       ========================================================================== */
    const navbar = document.getElementById('navbar');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };
    
    // Initial check
    handleScroll();
    
    // Event listener
    window.addEventListener('scroll', handleScroll);

    /* ==========================================================================
       MOBILE MENU TOGGLE
       ========================================================================== */
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('show');
            
            // Cambiar icono
            const icon = menuToggle.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('show')) {
                    icon.classList.remove('ph-list');
                    icon.classList.add('ph-x');
                } else {
                    icon.classList.remove('ph-x');
                    icon.classList.add('ph-list');
                }
            }
        });
        
        // Cerrar menú al hacer clic en un enlace de navegación
        const navItems = navLinks.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('show');
                menuToggle.setAttribute('aria-expanded', 'false');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('ph-x');
                    icon.classList.add('ph-list');
                }
            });
        });
    }

    /* ==========================================================================
       SMOOTH SCROLL & ACTIVE LINK HIGHLIGHTING
       ========================================================================== */
    const sections = document.querySelectorAll('section[id]');
    
    const scrollActive = () => {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-links a[href*=${sectionId}]`);

            if (navLink) {
                if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    };
    
    window.addEventListener('scroll', scrollActive);

    /* ==========================================================================
       SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
       ========================================================================== */
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale, .fade-in-up');
    
    // Configuración del observer
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Dejar de observar una vez que se muestra
            }
        });
    }, revealOptions);
    
    revealElements.forEach(el => {
        // Inicializar sin clase para el CSS nativo
        // Al intersectar se añadirá la clase .active que levanta los elementos
        revealObserver.observe(el);
    });
    
    /* ==========================================================================
       INTERACTIVE MAP/RADAR (Optional touches)
       ========================================================================== */
    // Add subtle parallax or movement to tech points if desired
    const techGraphic = document.querySelector('.tech-graphic');
    if (techGraphic && window.matchMedia("(min-width: 992px)").matches) {
        techGraphic.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = techGraphic.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;
            
            const points = techGraphic.querySelectorAll('.tech-point');
            points.forEach((point, index) => {
                const depth = (index + 1) * 10;
                point.style.transform = `translate(calc(-50% + ${x * depth}px), calc(-50% + ${y * depth}px))`;
            });
            
            const lines = techGraphic.querySelectorAll('.tech-line');
            lines.forEach((line, index) => {
                const depth = (index + 2) * 8;
                const baseRotate = index === 0 ? 15 : -25;
                line.style.transform = `rotate(${baseRotate + (x * depth)}deg)`;
            });
        });
        
        techGraphic.addEventListener('mouseleave', () => {
            const points = techGraphic.querySelectorAll('.tech-point');
            points.forEach(point => point.style.transform = `translate(-50%, -50%)`);
            
            const lines = techGraphic.querySelectorAll('.tech-line');
            lines.forEach((line, index) => {
                const baseRotate = index === 0 ? 15 : -25;
                line.style.transform = `rotate(${baseRotate}deg)`;
            });
        });
    }
    
    /* ==========================================================================
       WHATSAPP CONTACT FORM
       ========================================================================== */
    const waForm = document.getElementById('waForm');
    if (waForm) {
        waForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('waName').value;
            const subject = document.getElementById('waSubject').value;
            const message = document.getElementById('waMessage').value;
            
            let text = `Hola Ing. Valido, mi nombre es *${name}*.\n`;
            text += `*Asunto:* ${subject}\n\n`;
            text += `*Mensaje:* ${message}`;
            
            const wsNumber = "5493400665147";
            const wsUrl = `https://wa.me/${wsNumber}?text=${encodeURIComponent(text)}`;
            
            window.open(wsUrl, '_blank');
        });
    }
});
