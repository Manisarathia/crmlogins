# Zenve CRM Hub — Master CRM Launcher & Portal

A high-performance **Master CRM Index & Portal Page** unifying all 5 Zenve CRM applications into one cohesive, visually stunning landing interface.

---

## 🌟 The 5 Unified CRM Applications

| # | CRM Name | Domain / Operations | Logo Set | Connected URL |
|---|:---|:---|:---|:---|
| **1** | **Fashion Designers CRM** | Haute couture, designer catalogs & apparel merchandising | **Zenve Fashion Logo** | `https://zenvefashioncm.lovable.app/` |
| **2** | **Vendor CRM** | Supplier onboarding, purchase orders & inventory governance | **ZENVE™ Logo** | `http://localhost:8080/swagger-ui/index.html` |
| **3** | **DA Center CRM** | Veterinary research metrics, Redis distributed cache & state | **ZENVE™ Logo** | `http://localhost:5173/` |
| **4** | **Doctor CRM** | Healthcare networks, clinics, consultations & commissions | **ZENVE™ Logo** | `https://admincrm.zenvevet.com/admin/#/` |
| **5** | **Zippy CRM** | Field force tracking, geo-fenced attendance & route planner | **Zenve Zippy Logo** | `https://attendance.zenvevet.com/` |

---

## 💎 Design & Visual Highlights

- **Zenve™ Official Logo Integration**: Custom-fitted, high-resolution official Zenve™ logos for **DA Center CRM**, **Vendor CRM**, and **Doctor CRM** as requested, plus **Zenve Fashion** and **Zenve Zippy** brand emblems.
- **Radiant Ambient Card Glow**: Multi-layered, color-coded radiant aura around every card (Amber, Sky Blue, Dark Slate, Turquoise Cyan, Olive Sage) with continuous gentle breathing pulse animations.
- **Hover Lift & Intensified Aura**: Smooth 3D tilt physics, dynamic specular shine, and an outer neon bloom on cursor hover.
- **Dual Visual Themes**:
  - **Radiant Daylight Mode** (default): Soft lavender, sky-blue aurora gradient curves matching the portal design.
  - **Obsidian Neon Mode**: Dark cyberpunk glassmorphism with high-intensity glowing cards.
- **Zero-Scrolling Guarantee**: Strictly contained within `100vh` / `100dvh` across all viewports (desktop, laptop, tablet, mobile).
- **Single-Tab Navigation**: Instant navigation in the active browser tab with launching ripple animations.

---

## ⚙️ Centralized Configuration (`js/config.js`)

All 5 CRM URLs, titles, and logos are centrally controlled in `js/config.js`:

```javascript
// Located in js/config.js
const ZENVE_CRM_CONFIG = {
  activeEnvironment: "production", // 'production' | 'local' | 'custom'
  crms: [ ... ]
};
```

---

## 🚀 How to Run

1. **Local Web Server**:
   ```powershell
   cd c:\indexpage
   python -m http.server 3000
   ```
   Open `http://localhost:3000` in your browser.
2. **Direct Launch**:
   Open `index.html` directly in Chrome, Edge, or Firefox.
