import { nanoid } from "nanoid"

interface MapConfig {
  nodeSize: number
  axisCapacity: number
}

interface Node {
  position: DecartCords // stands for xyz
  nodeSize: number
  id: string
  color: string
}

type CubeRecord = { vectorIdx: number; nodeId: string }
type Cube = CubeRecord[][][]

function createRandomColor(): string {
  return Math.floor(Math.random() * 16777215).toString(16)
}

export function createWorld({ nodeSize, axisCapacity }: MapConfig) {
  const cube: Cube = []
  const nodes: Node[] = []
  for (let x = 0; x <= axisCapacity; x++) {
    cube.push([])
    for (let y = 0; y <= axisCapacity; y++) {
      cube[x].push([])
      for (let z = 0; z <= axisCapacity; z++) {
        const nodeId = nanoid()
        const node: Node = {
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
