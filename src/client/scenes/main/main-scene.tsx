import React, { useRef, useState } from "react"
import * as meshline from "threejs-meshline"
import { Canvas, useFrame, extend } from "react-three-fiber"
import { Vector3, CatmullRomCurve3 } from "three"
import { generateMap } from "client/models/world/generate-map"

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

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color={hovered ? "hotpink" : color} />
    </mesh>
  )
}

const { nodesByID } = generateMap({ nodeSize: 1, axisCapacity: 12 })

export const MainScene = () => (
  <Canvas style={{ width: "100%", height: "100%" }} camera={{ position: [30, 20, 20] }}>
    <ambientLight />
    <pointLight position={[10, 10, 10]} />
    {/* <Box position={[-1.2, 0, 0]} />
    <Box position={[1.2, 0, 0]} /> */}
    {Object.values(nodesByID).map(({ x, y, z, color }) => (
      <Box position={[x, y, z]} color={color} />
    ))}
    {/* <Line3 /> */}
  </Canvas>
)
