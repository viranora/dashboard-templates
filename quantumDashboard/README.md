# Quantum Dashboard - Dashboard Templates

<br>

<div align="center">
  <img src="src/assets/Ekran Resmi 2025-10-23 20.02.18.png" alt="Quantum Dashboard Demo" width="600"/>

</div>

<br>

A futuristic dashboard concept featuring semi-transparent, floating widgets with dramatic 3D tilt interactions. Designed as part of Nora's UI Gallery, this experiment focuses on creating an immersive, high-tech interface feel using physics-based animations and depth effects.

The core idea is an interface where focused elements come forward and react physically to the user's cursor, mimicking advanced analytical displays or command center panels.

<br>

## ✨ Key Features

* **Dramatic 3D Tilt:** Widgets (`QuantumWidget.jsx`) tilt significantly (up to 30 degrees) towards the mouse cursor using Framer Motion (`useMotionValue`, `useSpring`, `useTransform`) for a strong sense of depth and interaction.
* **Focus State Management:** The dashboard (`QuantumDashboardPage.jsx`) tracks mouse position to determine which widget is focused. Focused widgets scale up slightly, gain a higher `zIndex`, and display a neon glow effect, while unfocused widgets could potentially recede (logic commented out in `QuantumWidget` for simplicity in this version).
* **Glassmorphism Widgets:** Widgets employ a semi-transparent, blurred background (`backdrop-blur`), subtle borders (`border-widget-border`), and rounded corners for a sleek, modern glass look.
* **Minimalist & Futuristic Theme:** Uses a very dark background (`space-bg`), neon cyan accents (`neon-cyan`), and clean typography to evoke a high-tech, sci-fi aesthetic.
* **Spring Physics:** All animations (tilt, scale, glow) utilize Framer Motion's spring physics for smooth, natural-feeling transitions.
* **Grid Layout:** Widgets are arranged using Tailwind CSS Grid for a structured yet flexible layout.

<br>

## 🚀 Tech Stack

* **Core:** React.js
* **Animation:** Framer Motion (`useMotionValue`, `useSpring`, `useTransform`, `motion` components)
* **Styling:** Tailwind CSS (with custom colors and `boxShadow`)

<br>

## 🔧 How to Use / View

This component is part of the `nora-ui-gallery` project.

1.  **Ensure the main project is set up:**
    * Clone the `nora-ui-gallery` repository.
    * Install dependencies: `npm install`
    * Make sure Tailwind CSS is configured correctly (including the custom `colors` and `boxShadow` definitions).

2.  **Navigate to the component's route:**
    * Run the development server: `npm run dev`
    * This component might be displayed on the root route (`/`) or a specific route. Check `src/App.jsx` for the route configuration.

3.  **Integrate into your own project:**
    * Copy the `QuantumDashboardPage.jsx` and `QuantumWidget.jsx` components.
    * Install the required dependencies (`framer-motion`, `react-router-dom`).
    * Ensure your project has Tailwind CSS set up with the necessary custom definitions.
    * Adapt the `widgets` array data structure and `gridClass` definitions in `QuantumDashboardPage.jsx` to fit your desired layout and content.

<br>

---

<div align="center">
  <p>Visualizing the future, one dimension at a time, by</p>
  <h3>Nora</h3>
</div>
