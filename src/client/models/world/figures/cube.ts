import { nanoid } from "nanoid"
import { createRandomColor } from "client/utils"

type CubeRecord = { vectorIdx: number; nodeId: string }

type Cube = CubeRecord[][][]

interface CubeConfig {
  nodeSize: number
  axisCapacity: number
}

export function createCube({ nodeSize, axisCapacity }: CubeConfig) {
  const cube: Cube = []
  const nodes: WorldNode[] = []
  for (let x = 0; x <= axisCapacity; x++) {
    cube.push([])
    for (let y = 0; y <= axisCapacity; y++) {
      cube[x].push([])
      for (let z = 0; z <= axisCapacity; z++) {
        const nodeId = nanoid()
        const node: WorldNode = {
          position: [x, y, z],
          nodeSize,
          id: nodeId,
          color: `#${createRandomColor()}`,
        }
        nodes.push(node)
        cube[x][y].push({ vectorIdx: nodes.length, nodeId })
      }
    }
  }
  return { cube, nodes }
}
