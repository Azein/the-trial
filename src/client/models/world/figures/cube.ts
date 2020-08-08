import { nanoid } from "nanoid"

interface MapConfig {
  nodeSize: number
  axisCapacity: number
}

type CubeRecord = { vectorIdx: number; nodeId: string }

type Cube = CubeRecord[][][]

function createRandomColor(): string {
  return Math.floor(Math.random() * 16777215).toString(16)
}

export function createCube({ nodeSize, axisCapacity }: MapConfig) {
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

export const createMapBasedCube = ({ nodeSize, axisCapacity }: MapConfig) => {
  const nodesByID = {} as { [id: string]: WorldNode }
  const zMap = new Map()
  for (let z = 0; z <= axisCapacity; z++) {
    zMap.set(z, new Map())
  }
  zMap.forEach((yMap, z) => {
    for (let y = 0; y <= axisCapacity; y++) {
      yMap.set(y, new Map())
    }
    yMap.forEach((xMap: any, y: any) => {
      for (let x = 0; x <= axisCapacity; x++) {
        const id = nanoid()
        const node: WorldNode = {
          position: [x, y, z],
          nodeSize,
          id,
          color: `#${createRandomColor()}`,
        }
        xMap.set(id, node)
        nodesByID[id] = node
      }
    })
  })
  return { dimensionalMap: zMap, nodesByID }
}
