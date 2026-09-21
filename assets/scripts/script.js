document.addEventListener("DOMContentLoaded", () => {
  // @ ANIMATIONS
  // animate1
  const reveals = document.querySelectorAll(".reveal");
  if (reveals.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            // revealObserver.unobserve(entry.target);
          } else {
            entry.target.classList.remove("active");
          }
        });
      },
      { threshold: 0.15 },
    );

    reveals.forEach((el) => revealObserver.observe(el));
  }

  // animate2
  const heroTitle = document.querySelector("#hero h1");
  if (heroTitle) {
    const rawLines = [
      "SOFTWARE",
      '<span class="gradientText">ENGINEER</span>',
      "& CREATOR",
    ];

    heroTitle.innerHTML =
      '<span class="typeText"></span><span class="typeCursor">|</span>';
    const typeContainer = heroTitle.querySelector(".typeText");

    let lineIdx = 0;
    let charIdx = 0;
    let currentHTML = "";

    function typeNextChar() {
      if (lineIdx < rawLines.length) {
        const fullLine = rawLines[lineIdx];

        if (fullLine.startsWith("<span")) {
          currentHTML += (lineIdx > 0 ? "<br>" : "") + fullLine;
          typeContainer.innerHTML = currentHTML;
          lineIdx++;
          setTimeout(typeNextChar, 180);
        } else {
          if (charIdx === 0 && lineIdx > 0) currentHTML += "<br>";
          currentHTML += fullLine[charIdx];
          typeContainer.innerHTML = currentHTML;
          charIdx++;

          if (charIdx < fullLine.length) {
            setTimeout(typeNextChar, 50);
          } else {
            charIdx = 0;
            lineIdx++;
            setTimeout(typeNextChar, 150);
          }
        }
      } else {
        setTimeout(() => {
          const cur = heroTitle.querySelector(".typeCursor");
          // if (cur) cur.remove();
        }, 2000);
      }
    }
    typeNextChar();
  }

  // @ CORE
  const nav = document.querySelector("nav");
  const links = document.querySelectorAll(".navItem");
  const sections = document.querySelectorAll("main section[id]");
  const menuToggle = document.getElementById("menuToggle");
  const navWrapper = document.querySelector(".navWrapper");

  // hamburger toggle
  if (menuToggle && navWrapper) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("open");
      navWrapper.classList.toggle("active");
    });
    links.forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.classList.remove("open");
        navWrapper.classList.remove("active");
      });
    });
  }

  window.addEventListener("scroll", () => {
    const scrollPos = window.scrollY;

    // sticky effect
    if (nav) nav.classList.toggle("scrolled", scrollPos > 16);

    // scrollspy
    if (scrollPos < 200) {
      links.forEach((link, idx) => link.classList.toggle("active", idx === 0));
      return;
    }
    let current = "";
    sections.forEach((sec) => {
      if (scrollPos >= sec.offsetTop - 180) {
        current = sec.id;
      }
    });
    if (current) {
      links.forEach((link) => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${current}`,
        );
      });
    }
  });
});
