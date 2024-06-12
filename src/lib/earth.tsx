import * as Three from "three";

import Earth from "../assets/earth/2k_earth_daymap.jpg";

const getEarth = (detail: number) => {
  const loader = new Three.TextureLoader();
  const earthGeometry = new Three.IcosahedronGeometry(1, detail);
  const earthMaterial = new Three.MeshStandardMaterial({
    map: loader.load(Earth),
  });
  const earthMesh = new Three.Mesh(earthGeometry, earthMaterial);
  earthMesh.rotateY(23.45);

  return earthMesh;
};

export default getEarth;
