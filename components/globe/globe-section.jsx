"use client";

import React, { useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import CustomGLBLoader from "@/components/globe/CustomGLBLoader";
import Model from "@/components/globe/Model";

export default GlobeSection = () => {
  const [obj, setObj] = useState(null);
  const [target, setTarget] = useState("india");
  const controlsRef = useRef();
  return (
    <>
      <Suspense fallback={null}>
        <Canvas
          style={{ height: "100%", width: "100%", backgroundColor: "black" }}
          camera={{
            fov: 70,
            position: [0, 0, 1],
          }}
        >
          <ambientLight intensity={15} />
          <OrbitControls
            ref={controlsRef}
            enableZoom={true}
            enableRotate={false}
          />
          <CustomGLBLoader setObj={setObj} />
          <Model obj={obj} target={target} controlsRef={controlsRef} />
        </Canvas>
      </Suspense>
      <div className="flex">
        <button
          type="button"
          className="btn"
          onClick={() => {
            setTarget("usa");
          }}
        >
          USA
        </button>
        <button
          type="button"
          className="btn"
          onClick={() => {
            setTarget("india");
          }}
        >
          India
        </button>
      </div>
    </>
  );
};
