import { nanoid } from "nanoid"
import { createRandomColor } from "client/utils"

interface AxisConfig {
  xCap: number
  yCap: number
  zCap: number
}

interface NodeConfig {
  x: number
  y: number
  z: number
  yLevelColors: string[]
  nodeSize: number
  axisConfig: AxisConfig
}

interface FigureConfig {
  nodeSize: number
  axisConfig: AxisConfig
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

export const generateArenaNode = ({
  x,
  y,
  z,
  nodeSize,
  yLevelColors,
  axisConfig,
}: NodeConfig): WorldNode => {
  const { xCap, yCap, zCap } = axisConfig
  const id = nanoid()
  const node = {
    position: [x, y, z] as [number, number, number],
    nodeSize,
    id,
    color: yLevelColors[y] || `#${createRandomColor()}`,
  } as WorldNode

  if (y > 0 && z > 0 && z < zCap - 1 && x > 0 && x < xCap - 1) {
    node.transparent = true
    node.opacity = 0
  }

  return node
}

export const createComplexFigure = ({
  nodeSize,
  axisConfig,
  yLevelColors = [],
  generateNode,
}: FigureConfig) => {
  const { xCap, yCap, zCap } = axisConfig
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
        const nodeConfig = { x, y, z, yLevelColors, nodeSize, axisConfig }
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
