import { nanoid } from "nanoid"
import { createRandomColor } from "client/utils"

interface NodeConfig {
  x: number
  y: number
  z: number
  yLevelColors: string[]
  nodeSize: number
}

interface FigureConfig {
  nodeSize: number
  axisConfig: {
    xCap: number
    yCap: number
    zCap: number
  }
  yLevelColors?: string[]
  generateNode?: (data: NodeConfig) => WorldNode | undefined
}

const defaultGenerateNode = ({ x, y, z, nodeSize, yLevelColors }: NodeConfig): WorldNode => {
  const id = nanoid()
  return {
    position: [x, y, z],
    nodeSize,
    id,
    color: yLevelColors[y] || `#${createRandomColor()}`,
  }
}

export const createComplexFigure = ({
  nodeSize,
  axisConfig: { xCap, yCap, zCap },
  yLevelColors = [],
  generateNode,
}: FigureConfig) => {
  const nodesByID = {} as { [id: string]: WorldNode }
  const yMap = new Map()
  for (let y = 0; y < yCap; y++) {
    yMap.set(y, new Map())
  }
  yMap.forEach((zMap, y) => {
    for (let z = 0; z < zCap; z++) {
      zMap.set(z, new Map())
    }
    zMap.forEach((xMap: any, z: any) => {
      for (let x = 0; x < xCap; x++) {
        const nodeConfig = { x, y, z, yLevelColors, nodeSize }
        const node = generateNode ? generateNode(nodeConfig) : defaultGenerateNode(nodeConfig)
        if (node) {
          xMap.set(node.id, node)
          nodesByID[node.id] = node
        }
      }
    })
  })
  return { dimensionalMap: yMap, nodesByID }
}
