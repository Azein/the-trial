import React, { useRef, useState, useMemo } from "react"
import * as meshline from "threejs-meshline"
import { OrbitControls } from "drei"
import { Canvas, useFrame, extend } from "react-three-fiber"
import { Vector3, CatmullRomCurve3 } from "three"
import { createCube } from "client/models/world/figures/cube"
import { createComplexFigure, generateArenaNode } from "client/models/world/figures/ complex-figure"
import { BASE_SCALE, SCALED, CAMERA_POSITION, LIGHT_POSITION } from "./constants"

extend(meshline)

const Line3 = () => {
  const points = []
  points.push(new Vector3(-10, 0, 0))
  points.push(new Vector3(0, 10, 0))
  points.push(new Vector3(10, 0, 0))

  const curve = new CatmullRomCurve3(points).getPoints(1000)
  return (
    <mesh>
      <meshLine attach="geometry" vertices={curve} />
      <meshLineMaterial
        attach="material"
        transparent
        depthTest={false}
        lineWidth={0.85}
        color="#000"
      />
    </mesh>
  )
}

const Box = ({ color, isVisible, ...props }: any) => {
  const mesh = useRef() as any

  // useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01))

  return (
    <mesh {...props} ref={mesh} scale={BASE_SCALE} visible={isVisible}>
      <boxBufferGeometry attach="geometry" args={BASE_SCALE} />
      <meshStandardMaterial attach="material" color={color} />
    </mesh>
  )
}

// const { nodes } = createCube({ nodeSize: 1, axisCapacity: 12 })
const { nodesByID } = createComplexFigure({
  nodeSize: 1,
  axisConfig: { xCap: 50, yCap: 2, zCap: 50 },
  yLevelColors: ["#000"],
  generateNode: generateArenaNode,
})

export const MainScene = () => {
  return (
    <Canvas style={{ width: "100%", height: "100%" }} camera={{ position: CAMERA_POSITION }}>
      <ambientLight />
      <pointLight position={LIGHT_POSITION} />
      <OrbitControls />
      {Object.values(nodesByID).map((node) => (
        <Box key={node.id} position={node.position} color={node.color} isVisible={node.isVisible} />
      ))}

      {/* <Line3 /> */}
    </Canvas>
  )
}
