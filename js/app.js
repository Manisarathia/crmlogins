/**
 * ==============================================================================
 * ZENVE CRM HUB — ENTERPRISE MASTER CONTROLLER
 * ==============================================================================
 * Renders the 5 CRM launcher cards with Zenve TM logos, manages radiant
 * running border glow physics, 3D perspective tilt, and same-tab navigation.
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
  const toastBanner = document.getElementById("launch-notification");
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  let toastTimer = null;

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
  // RENDER CRM CARDS (RUNNING GLOW BORDER + COMPACT ARCHITECTURE)
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

      // Apply CSS custom properties for rich per-card ambient glow and gradient
      card.style.setProperty("--card-gradient", crm.gradient);
      card.style.setProperty("--card-glow", crm.glowColor);
      card.style.setProperty("--card-glow-sec", crm.glowSecondary || crm.glowColor);
      card.style.setProperty("--card-arrow", crm.arrowColor);

      card.innerHTML = `
        <!-- Continuous Running Neon Border Light Effect (Soft Aura Blur) -->
        <div class="card-running-border-glow"></div>

        <!-- Continuous Running Neon Border Light Effect (Sharp Laser Trail) -->
        <div class="card-running-border"></div>

        <!-- Persistent Outer Luminous Glow Aura -->
        <div class="card-glow-aura"></div>

        <!-- Solid Gradient Inner Card (Zero Empty Gap) -->
        <div class="card-inner-box">
          <!-- Dynamic Specular Highlight -->
          <div class="card-specular-sheen"></div>
          
          <!-- Animated Light Sweep -->
          <div class="card-light-sweep"></div>

          <!-- White Circular Logo Emblem -->
          <div class="badge-circle-wrapper">
            <div class="badge-circle-halo"></div>
            <div class="badge-white-circle">
              <img src="${crm.badgeImage}?v=gold-circle" alt="${crm.name} Logo" class="badge-logo-image" loading="eager" />
            </div>
          </div>

          <!-- CRM Name -->
          <h2 class="card-title-text">${crm.name}</h2>

          <!-- Action Button: White Circle Arrow -->
          <div class="card-action-wrap">
            <div class="arrow-circle-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
          </div>
        </div>
      `;

      // Click Event -> Same Tab Navigation with Visual Feedback or Empty URL notification
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
  // SAME-TAB LAUNCH CONTROLLER (ERROR POPUP DELETED)
  // ============================================================================
  function handleCrmLaunch(crm, targetUrl, cardElement) {
    if (!targetUrl || targetUrl.trim() === "") {
      // Error popup deleted as requested
      return;
    }

    cardElement.classList.add("card-launching");
    setTimeout(() => {
      window.location.href = targetUrl;
    }, 180);
  }

  function showToast(contentHtml, isWarning) {
    // Error popup deleted per user request
    return;
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

      // Maximum 3D rotation: +/- 7 degrees
      const rotateX = ((centerY - y) / centerY) * 7;
      const rotateY = ((x - centerX) / centerX) * 7;

      innerBox.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-6px)`;

      // Move specular radial sheen to cursor coordinates
      if (sheen) {
        sheen.style.opacity = "1";
        sheen.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.38) 0%, rgba(255, 255, 255, 0) 65%)`;
      }
    });

    card.addEventListener("mouseleave", function () {
      innerBox.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
      if (sheen) {
        sheen.style.opacity = "0";
      }
    });
  }

  // ============================================================================
  // INITIALIZATION
  // ============================================================================
  function init() {
    initTheme();
    renderCrmCards();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
