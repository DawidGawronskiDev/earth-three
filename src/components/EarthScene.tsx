import { useEffect, useRef } from "react";
import * as Three from "three";

export default function EarthScene() {
  const refContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = refContainer.current;

    const scene = new Three.Scene();
    const camera = new Three.PerspectiveCamera(
      90,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    camera.position.z = 5;

    const renderer = new Three.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container && container.appendChild(renderer.domElement);

    const geometry = new Three.BoxGeometry();
    const material = new Three.MeshBasicMaterial();
    const cube = new Three.Mesh(geometry, material);
    scene.add(cube);

    const animate = () => {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();
  }, []);

  return (
    <div ref={refContainer} style={{ width: "100vw", height: "100vh" }}></div>
  );
}
