# Vishal's Digital Portfolio

A high-performance, visually immersive 3D web portfolio built to showcase modern web technologies and elegant design patterns. 

## 🚀 Tech Stack

This bitch is built with some of the best tools available for interactive web development:

*   **Framework**: [Next.js](https://nextjs.org/) (v16+)
*   **Library**: [React](https://react.dev/) (v19)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) (v4)
*   **3D Graphics**: [Three.js](https://threejs.org/) & [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction) (@react-three/drei, postprocessing)
*   **Animations**: [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://gsap.com/)
*   **Smooth Scrolling**: [Lenis](https://lenis.studiofreight.com/)

## ⚙️ Features

*   **Immersive 3D Experience**: Integrated WebGL effects and objects using React Three Fiber.
*   **Fluid Animations**: Complex timeline animations driven by GSAP and Framer Motion.
*   **Smooth Scrolling**: High-performance smooth scrolling via Lenis for that premium feel.
*   **Interactive UI**: Custom components including hero sections, easter eggs (`WhoamiEgg`), and highly polished user interfaces.
*   **Deploy Ready**: Setup includes `gh-pages` script for quick and easy deployments.

## 🛠️ Getting Started

To spin this fucker up locally, follow these steps:

1.  **Install dependencies**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

2.  **Run the development server**
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

3.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📦 Deployment

This project comes pre-configured for GitHub Pages deployment.

To deploy, just run:
```bash
npm run deploy
```
*Note: Make sure your `next.config.js` or `next.config.ts` has the correct `basePath` or output settings if you encounter issues with static exports.*
