import * as Three from "three";
import Moon from "../assets/moon/2k_mercury.jpg";

const getMoon = (detail: number) => {
  const loader = new Three.TextureLoader();
  const moonGeometry = new Three.IcosahedronGeometry(1, detail);
  const moonMaterial = new Three.MeshStandardMaterial({
    map: loader.load(Moon),
  });
  const moonMesh = new Three.Mesh(moonGeometry, moonMaterial);

  return moonMesh;
};

export default getMoon;
