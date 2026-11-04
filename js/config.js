/**
 * ==============================================================================
 * 🔗 CONFIGURE YOUR 6 CRM DESTINATION URLS HERE
 * ==============================================================================
 * Set your 6 CRM URLs in the fields below.
 * Replace "" with your target URL for each CRM:
 * e.g., "http://localhost:5173" or "https://yourcrmdomain.com"
 * 
 * All 6 URLs are initialized to empty string "" as requested.
 * ==============================================================================
 */

const CRM_URLS = {
  FASHION_CRM: "",    // 1. Fashion Designers URL
  VENDOR_CRM: "",     // 2. Vendor URL
  DOCTOR_CRM: "",     // 3. Doctor URL
  ZIPPY_CRM: "",      // 4. Zippy URL
  DA_CENTER_CRM: "",  // 5. DA Center URL
  ATTENDANCE_CRM: ""  // 6. Attendance URL
};

/**
 * ==============================================================================
 * ZENVE CRM HUB — ENTERPRISE PORTAL CONFIGURATION
 * ==============================================================================
 */
const ZENVE_CRM_CONFIG = {
  portal: {
    headerTitle: "Zenve CRM",
    mainTitle: "CRM CENTER",
    subtitle: "Select a CRM to log in and get started."
  },

  // Centralized Configuration for the 6 CRM Applications (3/3 Layout)
  crms: [
    {
      id: "fashion-crm",
      order: 1,
      name: "Fashion Designers",
      cardImage: "assets/card-fashion.png",
      badgeImage: "assets/logo-original-fashion.png",
      accent: "fuchsia",
      baseColor: "#D81B60",
      gradient: "linear-gradient(135deg, #FF4081 0%, #D81B60 50%, #C2185B 100%)",
      glowColor: "rgba(235, 30, 120, 0.75)",
      glowSecondary: "rgba(255, 64, 129, 0.45)",
      arrowColor: "#D81B60",
      urlKey: "FASHION_CRM"
    },
    {
      id: "vendor-crm",
      order: 2,
      name: "Vendor",
      cardImage: "assets/card-vendor.png",
      badgeImage: "assets/logo-original-zenve-main.png",
      accent: "orange",
      baseColor: "#F58220",
      gradient: "linear-gradient(135deg, #FFA726 0%, #F58220 50%, #E65100 100%)",
      glowColor: "rgba(245, 130, 32, 0.75)",
      glowSecondary: "rgba(255, 167, 38, 0.45)",
      arrowColor: "#F58220",
      urlKey: "VENDOR_CRM"
    },
    {
      id: "doctor-crm",
      order: 3,
      name: "Doctor",
      cardImage: "assets/card-doctor.png",
      badgeImage: "assets/logo-original-zenve-main.png",
      accent: "cyan",
      baseColor: "#00A3E0",
      gradient: "linear-gradient(135deg, #29B6F6 0%, #00A3E0 50%, #0277BD 100%)",
      glowColor: "rgba(0, 163, 224, 0.75)",
      glowSecondary: "rgba(41, 182, 246, 0.45)",
      arrowColor: "#00A3E0",
      urlKey: "DOCTOR_CRM"
    },
    {
      id: "zippy-crm",
      order: 4,
      name: "Zippy",
      cardImage: "assets/card-zippy.png",
      badgeImage: "assets/logo-original-zippy.png",
      accent: "purple",
      baseColor: "#7B1FA2",
      gradient: "linear-gradient(135deg, #AB47BC 0%, #7B1FA2 50%, #4A148C 100%)",
      glowColor: "rgba(123, 31, 162, 0.75)",
      glowSecondary: "rgba(171, 71, 188, 0.45)",
      arrowColor: "#7B1FA2",
      urlKey: "ZIPPY_CRM"
    },
    {
      id: "da-center",
      order: 5,
      name: "DA Center",
      cardImage: "assets/card-da-center.png",
      badgeImage: "assets/logo-original-zenve-main.png",
      accent: "emerald",
      baseColor: "#00C853",
      gradient: "linear-gradient(135deg, #69F0AE 0%, #00C853 50%, #1B5E20 100%)",
      glowColor: "rgba(0, 200, 83, 0.75)",
      glowSecondary: "rgba(105, 240, 174, 0.45)",
      arrowColor: "#00C853",
      urlKey: "DA_CENTER_CRM"
    },
    {
      id: "attendance-crm",
      order: 6,
      name: "Attendance",
      cardImage: "assets/card-attendance.png",
      badgeImage: "assets/logo-original-zippy.png",
      accent: "teal",
      baseColor: "#00BCD4",
      gradient: "linear-gradient(135deg, #4DD0E1 0%, #00BCD4 50%, #00838F 100%)",
      glowColor: "rgba(0, 188, 212, 0.75)",
      glowSecondary: "rgba(77, 208, 225, 0.45)",
      arrowColor: "#00BCD4",
      urlKey: "ATTENDANCE_CRM"
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

// Make globally accessible
window.ZENVE_CRM_CONFIG = ZENVE_CRM_CONFIG;
window.getCrmUrl = getCrmUrl;
