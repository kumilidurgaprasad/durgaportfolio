
document.addEventListener("DOMContentLoaded", () => {

    // Mobile navigation
    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");

    if (menuBtn && navLinks) {
        menuBtn.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("open");

            menuBtn.setAttribute("aria-expanded", String(isOpen));
            menuBtn.innerHTML = isOpen
                ? '<i class="fas fa-xmark"></i>'
                : '<i class="fas fa-bars"></i>';
        });

        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("open");
                menuBtn.setAttribute("aria-expanded", "false");
                menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }

    // Dark and light theme
    const themeToggle = document.getElementById("themeToggle");

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            document.body.classList.toggle("light-theme");

            const isLight = document.body.classList.contains("light-theme");

            themeToggle.innerHTML = isLight
                ? '<i class="fas fa-sun"></i>'
                : '<i class="fas fa-moon"></i>';

            themeToggle.setAttribute(
                "aria-label",
                isLight ? "Switch to dark theme" : "Switch to light theme"
            );
        });
    }

    // Typing animation
    const typingText = document.getElementById("typingText");

    if (typingText) {
        const roles = [
            "Java Developer",
            "Backend Developer",
            
            
        ];

        let roleIndex = 0;
        let characterIndex = 0;
        let deleting = false;

        function typeRole() {
            const currentRole = roles[roleIndex];

            if (deleting) {
                characterIndex--;
            } else {
                characterIndex++;
            }

            typingText.textContent =
                currentRole.substring(0, characterIndex);

            let delay = deleting ? 45 : 85;

            if (!deleting && characterIndex === currentRole.length) {
                deleting = true;
                delay = 1400;
            } else if (deleting && characterIndex === 0) {
                deleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                delay = 350;
            }

            window.setTimeout(typeRole, delay);
        }

        typeRole();
    }

    // Reveal sections when they enter the viewport
    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries, currentObserver) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        currentObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(element => observer.observe(element));
    } else {
        revealElements.forEach(element => {
            element.classList.add("visible");
        });
    }

    // Active navigation link while scrolling
    const sections = document.querySelectorAll("main section[id]");
    const navItems = document.querySelectorAll(".nav-links a");

    if ("IntersectionObserver" in window) {
        const sectionObserver = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        navItems.forEach(link => {
                            link.classList.toggle(
                                "active",
                                link.getAttribute("href") ===
                                    "#" + entry.target.id
                            );
                        });
                    }
                });
            },
            {
                rootMargin: "-25% 0px -60% 0px"
            }
        );

        sections.forEach(section => sectionObserver.observe(section));
    }

    // Scroll-to-top button
    const scrollTop = document.getElementById("scrollTop");

    if (scrollTop) {
        window.addEventListener("scroll", () => {
            scrollTop.classList.toggle("show", window.scrollY > 350);
        });

        scrollTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // Automatically update footer year
    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // If project images are not available yet, keep the
    // designed gradient background and project icon visible.
    document.querySelectorAll(".project-image img").forEach(img => {
        img.addEventListener("error", () => {
            img.style.display = "none";
        });
    });

    // Contact form: prepare an email in the user's email application
    const contactForm = document.getElementById("contactForm");

    if (contactForm) {
        contactForm.addEventListener("submit", event => {
            event.preventDefault();

            const name = document.getElementById("contactName").value.trim();
            const email = document.getElementById("contactEmail").value.trim();
            const subject = document.getElementById("contactSubject").value.trim();
            const message = document.getElementById("contactMessage").value.trim();

            if (!name || !email || !subject || !message) {
                alert("Please fill in all fields.");
                return;
            }

            const body =
                "Name: " + name + "\n" +
                "Email: " + email + "\n\n" +
                message;

            const mailtoLink =
                "mailto:kumilidurgaprasad@gmail.com" +
                "?subject=" + encodeURIComponent(subject) +
                "&body=" + encodeURIComponent(body);

            window.location.href = mailtoLink;
        });
    }

});
