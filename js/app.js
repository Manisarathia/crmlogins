/**
 * ==============================================================================
 * ZENVE CRM HUB — ENTERPRISE MASTER CONTROLLER
 * ==============================================================================
 * Renders the 6 CRM launcher cards with their exact individual artwork,
 * continuous radiant running laser border glow, 3D perspective tilt physics,
 * and same-tab navigation.
 * ==============================================================================
 */

(function () {
  "use strict";

  const config = window.ZENVE_CRM_CONFIG;
  if (!config) {
    console.error("Zenve CRM Configuration not found!");
    return;
  }

  // DOM Elements
  const cardsContainer = document.getElementById("crm-cards-grid");
  const themeToggleBtn = document.getElementById("theme-toggle-btn");

  // ============================================================================
  // THEME MANAGEMENT (Light / Dark)
  // ============================================================================
  function initTheme() {
    const savedTheme = localStorage.getItem("zenve_theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
    updateThemeIcon(savedTheme);

    if (themeToggleBtn) {
      themeToggleBtn.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("zenve_theme", newTheme);
        updateThemeIcon(newTheme);
      });
    }
  }

  function updateThemeIcon(theme) {
    if (!themeToggleBtn) return;
    if (theme === "dark") {
      themeToggleBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      `;
      themeToggleBtn.setAttribute("title", "Switch to Daylight Mode");
    } else {
      themeToggleBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      `;
      themeToggleBtn.setAttribute("title", "Switch to Obsidian Mode");
    }
  }

  // ============================================================================
  // RENDER CRM CARDS (6 CARDS WITH INDIVIDUAL ARTWORK & RUNNING GLOW)
  // ============================================================================
  function renderCrmCards() {
    if (!cardsContainer) return;
    cardsContainer.innerHTML = "";

    config.crms.forEach((crm) => {
      const activeUrl = window.getCrmUrl ? window.getCrmUrl(crm) : "";

      const card = document.createElement("a");
      card.className = "crm-card";
      card.setAttribute("href", activeUrl || "javascript:void(0);");
      card.setAttribute("target", "_self");
      card.setAttribute("data-id", crm.id);
      card.setAttribute("aria-label", `Launch ${crm.name}`);

      // Apply CSS custom properties for rich per-card ambient glow and colors
      card.style.setProperty("--card-gradient", crm.gradient || "");
      card.style.setProperty("--card-glow", crm.glowColor || "rgba(255, 255, 255, 0.6)");
      card.style.setProperty("--card-glow-sec", crm.glowSecondary || crm.glowColor || "rgba(255, 255, 255, 0.35)");
      card.style.setProperty("--card-arrow", crm.arrowColor || "#ffffff");

      card.innerHTML = `
        <!-- Continuous Running Neon Border Light Effect (Soft Aura Blur) -->
        <div class="card-running-border-glow"></div>

        <!-- Continuous Running Neon Border Light Effect (Sharp Laser Trail) -->
        <div class="card-running-border"></div>

        <!-- Persistent Outer Luminous Glow Aura -->
        <div class="card-glow-aura"></div>

        <!-- Solid Inner Card with Exact 3D Artwork Background -->
        <div class="card-inner-box">
          <!-- Exact High-Resolution Card Artwork Surface -->
          <img src="${crm.cardImage || crm.badgeImage}?v=art-2k" alt="${crm.name}" class="card-surface-img" loading="eager" />

          <!-- Dynamic Specular Highlight -->
          <div class="card-specular-sheen"></div>
          
          <!-- Animated Light Sweep on Hover -->
          <div class="card-light-sweep"></div>

          <!-- Accessible Screen Reader Name -->
          <span class="visually-hidden">${crm.name}</span>
        </div>
      `;

      // Click Event -> Same Tab Navigation with Visual Feedback
      card.addEventListener("click", function (e) {
        if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
          e.preventDefault();
          const currentUrl = window.getCrmUrl ? window.getCrmUrl(crm) : "";
          handleCrmLaunch(crm, currentUrl, card);
        }
      });

      // 3D Perspective Tilt Physics
      attachTiltPhysics(card);

      cardsContainer.appendChild(card);
    });
  }

  // ============================================================================
  // SAME-TAB LAUNCH CONTROLLER
  // ============================================================================
  function handleCrmLaunch(crm, targetUrl, cardElement) {
    if (!targetUrl || targetUrl.trim() === "") {
      // Empty URL: provide gentle click ripple feedback
      cardElement.classList.add("card-clicked-feedback");
      setTimeout(() => {
        cardElement.classList.remove("card-clicked-feedback");
      }, 400);
      return;
    }

    cardElement.classList.add("card-launching");
    setTimeout(() => {
      window.location.href = targetUrl;
    }, 180);
  }

  // ============================================================================
  // REALISTIC 3D PERSPECTIVE TILT PHYSICS & SPECULAR SHINE
  // ============================================================================
  function attachTiltPhysics(card) {
    const innerBox = card.querySelector(".card-inner-box");
    const sheen = card.querySelector(".card-specular-sheen");

    card.addEventListener("mousemove", function (e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Maximum 3D rotation: +/- 6 degrees for smooth realistic tilt
      const rotateX = ((centerY - y) / centerY) * 6;
      const rotateY = ((x - centerX) / centerX) * 6;

      innerBox.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-5px) scale(1.02)`;

      // Move specular reflection toward light source
      if (sheen) {
        sheen.style.opacity = "0.75";
        sheen.style.background = `radial-gradient(circle at ${(x / rect.width) * 100}% ${(y / rect.height) * 100}%, rgba(255, 255, 255, 0.45) 0%, transparent 65%)`;
      }
    });

    card.addEventListener("mouseleave", function () {
      innerBox.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)";
      if (sheen) {
        sheen.style.opacity = "0";
      }
    });
  }

  // ============================================================================
  // KEYBOARD ACCESSIBILITY
  // ============================================================================
  function initKeyboardNav() {
    window.addEventListener("keydown", function (e) {
      const cards = Array.from(document.querySelectorAll(".crm-card"));
      const activeElement = document.activeElement;
      const currentIndex = cards.indexOf(activeElement);

      if (e.key >= "1" && e.key <= "6" && !e.altKey && !e.ctrlKey && !e.metaKey) {
        const targetCard = cards[parseInt(e.key, 10) - 1];
        if (targetCard) {
          targetCard.focus();
          targetCard.click();
        }
        return;
      }

      if (currentIndex === -1) return;

      let nextIndex = currentIndex;
      if (e.key === "ArrowRight") {
        nextIndex = (currentIndex + 1) % cards.length;
        e.preventDefault();
      } else if (e.key === "ArrowLeft") {
        nextIndex = (currentIndex - 1 + cards.length) % cards.length;
        e.preventDefault();
      } else if (e.key === "ArrowDown") {
        if (currentIndex + 3 < cards.length) nextIndex = currentIndex + 3;
        e.preventDefault();
      } else if (e.key === "ArrowUp") {
        if (currentIndex - 3 >= 0) nextIndex = currentIndex - 3;
        e.preventDefault();
      }

      if (nextIndex !== currentIndex && cards[nextIndex]) {
        cards[nextIndex].focus();
      }
    });
  }

  // ============================================================================
  // INITIALIZATION ON DOM READY
  // ============================================================================
  document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    renderCrmCards();
    initKeyboardNav();
  });
})();
