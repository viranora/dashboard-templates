# Living Ecosystem Dashboard - Dashboard Templates



<div align="center">
  
  <img src="src/assets/Ekran Resmi 2025-10-23 20.14.12.png" alt="Living Ecosystem Dashboard Demo" width="600"/>
</div>



An organic and fluid dashboard concept visualizing interconnected data points as a living system. Designed as part of Nora's UI Gallery, this experiment explores non-rectangular UI elements, data flow animation, and status-responsive visuals.

The core idea is to represent a system's health and activity through pulsating connections and widgets that react visually to underlying data states (simulated).



## ✨ Key Features

* **Organic Widget Shapes:** Widgets (`OrganicWidget.jsx`) utilize high `border-radius` to achieve soft, blob-like shapes instead of sharp rectangles.
* **Breathing Animation:** Widgets exhibit a subtle, continuous "breathing" effect (scaling and opacity changes via Framer Motion `animate`) to give a sense of life.
* **Status-Responsive Visuals:** Widgets change their border color, glow (`boxShadow`), and potentially internal animations based on a `status` prop (e.g., 'ok' vs. 'error'), providing immediate visual feedback on data health.
* **Animated Connection Lines:** Widgets are linked by lines (`ConnectionLine.jsx`) drawn using SVG. These lines appear with an animation (`pathLength`).
* **Data Flow Pulse:** An animated light pulse travels along the connection lines (`motion.circle` with `offsetPath`) to visualize the flow of data between widgets (pulse stops in 'error' state).
* **Glassmorphism & Glow Effects:** Widgets and lines use semi-transparent backgrounds, blurs, and glow effects (`boxShadow`, gradients) for a soft, luminous aesthetic.
* **(Simplified) Hover Interaction:** Widgets scale up slightly on hover. A basic state (`hoveredWidget`) is used to simulate neighboring widgets reacting (scaling down slightly).



## 🚀 Tech Stack

* **Core:** React.js
* **Animation:** Framer Motion (`motion.div`, `motion.line`, `motion.circle`, `variants`, `animate`, `whileHover`, SVG path animation)
* **Styling:** Tailwind CSS (with custom colors, `keyframes`, `animation`, `boxShadow`)
* **Layout:** Absolute positioning (for demo), SVG for lines.
* **Hooks:** `useState`, `useEffect`, `useRef`, `createRef`



## 🔧 How to Use / View

This component is part of the `nora-ui-gallery` project.

1.  **Ensure the main project is set up:**
    * Clone the `nora-ui-gallery` repository.
    * Install dependencies: `npm install`
    * Make sure Tailwind CSS is configured correctly (including the custom `eco-*` colors, `keyframes`, `animation`, and `boxShadow` definitions).

2.  **Navigate to the component's route:**
    * Run the development server: `npm run dev`
    * This component might be displayed on the root route (`/`) or a specific route. Check `src/App.jsx` for the route configuration.

3.  **Integrate into your own project:**
    * Copy the `EcosystemDashboardPage.jsx`, `OrganicWidget.jsx`, and `ConnectionLine.jsx` components.
    * Install the required dependencies (`framer-motion`, `react-router-dom`).
    * Ensure your project has Tailwind CSS set up with the necessary custom definitions.
    * Adapt the widget layout (currently absolute positioned), `widgetStatus` state management, and `connections` array in `EcosystemDashboardPage.jsx` based on your data structure and needs. The line coordinate calculation might need adjustments depending on the layout method.



---

<div align="center">
  <p>Breathing life into data, by</p>
  <h3>Nora</h3>
</div>