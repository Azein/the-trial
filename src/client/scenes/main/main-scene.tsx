import React, { useRef, useState, useMemo } from "react"
import * as meshline from "threejs-meshline"
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

const Box = ({ color, ...props }: any) => {
  const mesh = useRef() as any

  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  // useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01))

  const { transparent, opacity, ...rest } = props

  return (
    <mesh
      {...rest}
      ref={mesh}
      scale={active ? SCALED : BASE_SCALE}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxBufferGeometry attach="geometry" args={BASE_SCALE} />
      {transparent ? ( // has to be either with or without transparency, three requirement
        <meshStandardMaterial
          attach="material"
          color={hovered ? "hotpink" : color}
          transparent={transparent}
          opacity={opacity}
        />
      ) : (
        <meshStandardMaterial attach="material" color={hovered ? "hotpink" : color} />
      )}
    </mesh>
  )
}

// const { nodes } = createCube({ nodeSize: 1, axisCapacity: 12 })
const { nodesByID } = createComplexFigure({
  nodeSize: 1,
  axisConfig: { xCap: 10, yCap: 2, zCap: 10 },
  yLevelColors: ["#000"],
  generateNode: generateArenaNode,
})

export const MainScene = () => (
  <Canvas style={{ width: "100%", height: "100%" }} camera={{ position: CAMERA_POSITION }}>
    <ambientLight />
    <pointLight position={LIGHT_POSITION} />
    {Object.values(nodesByID).map((node) => (
      <Box
        key={node.id}
        position={node.position}
        color={node.color}
        opacity={node.opacity}
        transparent={node.transparent}
      />
    ))}
    {/* <Line3 /> */}
  </Canvas>
)
