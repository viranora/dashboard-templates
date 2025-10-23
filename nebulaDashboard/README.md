# Data Nebula Dashboard - Dashboard Templates

<br>

<div align="center">
  <img src="src/assets/Ekran Resmi 2025-10-23 20.08.12.png" alt="Data Nebula Dashboard Demo" width="600"/>
 
</div>

<br>

An abstract and dynamic dashboard concept that visualizes data as a constantly moving cloud of particles. Designed as part of Nora's UI Gallery, this experiment moves away from traditional widgets towards an immersive, interactive data environment.

The core idea is to represent complex data states through the emergent behavior (color, density, movement) of hundreds of individual particles that react to user interaction.

<br>

## ✨ Key Features

* **Particle System Visualization:** Replaces static widgets with a large number (`particleCount`) of small, animated `Particle` components representing data points.
* **Continuous Motion & Drift:** Each particle has its own randomized, slow drifting movement, creating a constantly evolving background.
* **Mouse Interaction (Repulsion):** Particles dynamically react to the mouse cursor, smoothly moving away when the cursor approaches (`useSpring`, `useTransform`, distance calculation).
* **Randomized Properties:** Each particle is initialized (`useMemo`) with unique properties like size, color (from a defined palette), opacity, and reaction speed (`lag`), creating organic variation.
* **Screen Wrapping:** Particles that drift off one edge of the screen reappear on the opposite side, maintaining the density of the nebula.
* **Performance Considerations:** Built primarily with Framer Motion `motion.div` elements. While visually impressive, rendering and animating hundreds of DOM elements can be performance-intensive. `useMemo` is used to prevent unnecessary recalculations. *(Note: For significantly larger particle counts, Canvas or WebGL via libraries like react-three-fiber might be more optimal)*.
* **Minimalist UI:** Focuses entirely on the particle visualization against a dark space background, with placeholders for potential future control panels.

<br>

## 🚀 Tech Stack

* **Core:** React.js
* **Animation:** Framer Motion (`motion.div`, `useMotionValue`, `useSpring`, `useTransform`, `useEffect` with `requestAnimationFrame`)
* **Styling:** Tailwind CSS (with custom colors)
* **Hooks:** `useMemo`, `useState`, `useEffect`

<br>

## 🔧 How to Use / View

This component is part of the `nora-ui-gallery` project.

1.  **Ensure the main project is set up:**
    * Clone the `nora-ui-gallery` repository.
    * Install dependencies: `npm install`
    * Make sure Tailwind CSS is configured correctly (including the custom `particle-*` colors).

2.  **Navigate to the component's route:**
    * Run the development server: `npm run dev`
    * This component might be displayed on the root route (`/`) or a specific route. Check `src/App.jsx` for the route configuration.

3.  **Integrate into your own project:**
    * Copy the `DataNebulaPage.jsx` and `Particle.jsx` components, along with the `useWindowSize` hook (or import it from a shared utility file).
    * Install the required dependencies (`framer-motion`).
    * Ensure your project has Tailwind CSS set up with the necessary custom colors.
    * Adjust the `particleCount` in `DataNebulaPage.jsx` based on desired density and performance.
    * Adapt styling and layout as needed. Add actual control panels or data displays over the nebula background.

<br>

---

<div align="center">
  <p>Exploring the cosmos of data, by</p>
  <h3>Nora</h3>
</div>