import * as Three from "three";
import Clouds from "../assets/earth/2k_earth_clouds.jpg";

const getClouds = (detail: number) => {
  const loader = new Three.TextureLoader();
  const cloudsGeometry = new Three.IcosahedronGeometry(1, detail);
  const cloudsMaterial = new Three.MeshStandardMaterial({
    map: loader.load(Clouds),
    blending: Three.AdditiveBlending,
  });
  const cloudsMesh = new Three.Mesh(cloudsGeometry, cloudsMaterial);
  cloudsMesh.scale.set(1.001, 1.001, 1.001);
  cloudsMesh.rotateY(23.45);

  return cloudsMesh;
};

export default getClouds;
