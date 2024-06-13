import * as Three from "three";
import { useEffect, useRef } from "react";
import { OrbitControls } from "three/examples/jsm/Addons.js";

import getEarth from "../lib/earth";
import getClouds from "../lib/clouds";
import getLights from "../lib/lights";
import getMoon from "../lib/moon";

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
    camera.position.z = 2;

    const renderer = new Three.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 2;
    controls.maxDistance = 5;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    if (container) {
      container.innerHTML = "";
      container.appendChild(renderer.domElement);
    }

    const earthGroup = new Three.Group();
    scene.add(earthGroup);

    const detail = 16;

    const earthMesh = getEarth(detail);
    earthGroup.add(earthMesh);

    const cloudsMesh = getClouds(detail);
    earthGroup.add(cloudsMesh);

    const lightsMesh = getLights(detail);
    earthGroup.add(lightsMesh);

    const moonMesh = getMoon(detail);
    earthGroup.add(moonMesh);
    moonMesh.position.z = -4;
    moonMesh.scale.set(0.25, 0.25, 0.25);

    const sunLight = new Three.DirectionalLight(0xffffff, 0.5);
    sunLight.position.set(1, 1, 0);
    scene.add(sunLight);

    const ambientLight = new Three.AmbientLight(0xffffff, 0.01);
    scene.add(ambientLight);

    const animate = (t = 0) => {
      requestAnimationFrame(animate);

      earthMesh.rotation.y += 0.001;
      lightsMesh.rotation.y += 0.001;
      cloudsMesh.rotation.y += 0.002;

      moonMesh.position.x = Math.sin(t * 0.001) * 2;
      moonMesh.position.z = Math.cos(t * 0.001) * 2;
      moonMesh.position.y = Math.cos(t * 0.001) * 2;

      controls.update();

      renderer.render(scene, camera);
    };

    animate();
  }, []);

  return (
    <div ref={refContainer} style={{ width: "100vw", height: "100vh" }}></div>
  );
}
