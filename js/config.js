/**
 * ==============================================================================
 * 🔗 CONFIGURE YOUR 5 CRM DESTINATION URLS HERE
 * ==============================================================================
 * Set your 5 CRM URLs in the fields below.
 * Replace "" with your target URL for each CRM:
 * e.g., "http://localhost:5173" or "https://yourcrmdomain.com"
 * 
 * All 5 URLs are initialized to empty string "" as requested.
 * ==============================================================================
 */

const CRM_URLS = {
  FASHION_CRM: "",    // 1. Fashion Designers CRM URL
  VENDOR_CRM: "",     // 2. Vendor CRM URL
  DA_CENTER_CRM: "",  // 3. DA Center CRM URL
  DOCTOR_CRM: "",     // 4. Doctor CRM URL
  ZIPPY_CRM: ""       // 5. Zippy CRM URL
};

/**
 * ==============================================================================
 * ZENVE CRM HUB — PORTAL CONFIGURATION
 * ==============================================================================
 */
const ZENVE_CRM_CONFIG = {
  portal: {
    headerTitle: "CRM Logins",
    mainTitle: "Choose Your CRM",
    subtitle: "Select a CRM to log in and get started."
  },

  // Centralized Configuration for the 5 CRM Applications
  crms: [
    {
      id: "fashion-crm",
      order: 1,
      name: "Fashion Designers CRM",
      badgeImage: "assets/badge-fashion.png",
      accent: "gold",
      baseColor: "#D4AF37",
      gradient: "linear-gradient(135deg, #FFF1B8 0%, #E6B422 18%, #D4AF37 38%, #FFF1B8 52%, #E6B422 64%, #D4AF37 80%, #8C6414 100%)",
      glowColor: "rgba(212, 175, 55, 0.75)",
      glowSecondary: "rgba(255, 241, 184, 0.55)",
      arrowColor: "#8C6414",
      urlKey: "FASHION_CRM"
    },
    {
      id: "vendor-crm",
      order: 2,
      name: "Vendor CRM",
      badgeImage: "assets/badge-zenve-tm.png",
      accent: "sky",
      baseColor: "#2CAFEC",
      gradient: "linear-gradient(180deg, #44b9ef 0%, #2CAFEC 50%, #159cd9 100%)",
      glowColor: "rgba(44, 175, 236, 0.6)",
      glowSecondary: "rgba(21, 156, 217, 0.38)",
      arrowColor: "#2CAFEC",
      urlKey: "VENDOR_CRM"
    },
    {
      id: "da-center",
      order: 3,
      name: "DA Center CRM",
      badgeImage: "assets/badge-zenve-tm.png",
      accent: "blue",
      baseColor: "#2D89E0",
      gradient: "linear-gradient(180deg, #4396e4 0%, #2D89E0 50%, #1c72c4 100%)",
      glowColor: "rgba(45, 137, 224, 0.6)",
      glowSecondary: "rgba(28, 114, 196, 0.38)",
      arrowColor: "#2D89E0",
      urlKey: "DA_CENTER_CRM"
    },
    {
      id: "doctor-crm",
      order: 4,
      name: "Doctor CRM",
      badgeImage: "assets/badge-zenve-tm.png",
      accent: "purple",
      baseColor: "#6E1985",
      gradient: "linear-gradient(180deg, #85229f 0%, #6E1985 50%, #521064 100%)",
      glowColor: "rgba(110, 25, 133, 0.65)",
      glowSecondary: "rgba(82, 16, 100, 0.4)",
      arrowColor: "#6E1985",
      urlKey: "DOCTOR_CRM"
    },
    {
      id: "zippy-crm",
      order: 5,
      name: "Zippy CRM",
      badgeImage: "assets/badge-zippy-circle.png",
      accent: "forest",
      baseColor: "#00674F",
      gradient: "linear-gradient(180deg, #09795e 0%, #00674F 50%, #004d3b 100%)",
      glowColor: "rgba(0, 103, 79, 0.6)",
      glowSecondary: "rgba(0, 77, 59, 0.38)",
      arrowColor: "#00674F",
      urlKey: "ZIPPY_CRM"
    }
  ]
};

// Helper function to resolve URL for a given CRM
function getCrmUrl(crm) {
  if (typeof CRM_URLS !== "undefined" && crm.urlKey && CRM_URLS[crm.urlKey]) {
    return CRM_URLS[crm.urlKey].trim();
  }
  return "";
}

if (typeof window !== "undefined") {
  window.CRM_URLS = CRM_URLS;
  window.ZENVE_CRM_CONFIG = ZENVE_CRM_CONFIG;
  window.getCrmUrl = getCrmUrl;
}
