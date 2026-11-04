/**
 * ==============================================================================
 * ZENVE CRM CENTER — ENTERPRISE DASHBOARD CONTROLLER
 * ==============================================================================
 * Renders exactly 6 CRM launcher cards in a 3-column x 2-row layout.
 * Each card has ONE outer element, ONE background image, and smooth hover glow.
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
  // RENDER EXACTLY SIX CRM CARDS (NO DUPLICATES, NO DOUBLE BORDERS)
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

      // Pass card accent glow color
      card.style.setProperty("--card-glow", crm.glowColor || "rgba(255, 255, 255, 0.6)");

      // Separate card artwork, original logo, and editable HTML title
      card.innerHTML = `
        <img src="${crm.cardImage}?v=clean" alt="${crm.name}" class="card-bg-img" loading="eager" />
        <div class="card-logo-container">
          <img src="${crm.badgeImage}?v=orig" alt="${crm.name} Logo" class="card-logo-img" />
        </div>
        <div class="card-title-container">
          <h3 class="card-title-text">${crm.name}</h3>
        </div>
      `;

      // Click Event -> Same Tab Navigation
      card.addEventListener("click", function (e) {
        if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
          e.preventDefault();
          const currentUrl = window.getCrmUrl ? window.getCrmUrl(crm) : "";
          if (currentUrl && currentUrl.trim() !== "") {
            card.classList.add("card-active");
            setTimeout(() => {
              window.location.href = currentUrl;
            }, 180);
          } else {
            // Subtle click ripple feedback when URL is unconfigured
            card.classList.add("card-clicked");
            setTimeout(() => {
              card.classList.remove("card-clicked");
            }, 300);
          }
        }
      });

      cardsContainer.appendChild(card);
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
