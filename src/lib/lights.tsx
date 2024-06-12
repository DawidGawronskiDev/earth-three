import * as Three from "three";

import Lights from "../assets/earth/2k_earth_nightmap.jpg";

const getLights = (detail: number) => {
  const loader = new Three.TextureLoader();
  const lightsGeometry = new Three.IcosahedronGeometry(1, detail);
  const lightsMaterial = new Three.MeshStandardMaterial({
    map: loader.load(Lights),
    blending: Three.AdditiveBlending,
  });
  const lightsMesh = new Three.Mesh(lightsGeometry, lightsMaterial);
  lightsMesh.scale.set(1.005, 1.005, 1.005);
  lightsMesh.rotateY(23.45);

  return lightsMesh;
};

export default getLights;
