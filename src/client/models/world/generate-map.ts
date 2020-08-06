import { nanoid } from "nanoid"

interface MapConfig {
  nodeSize: number
  axisCapacity: number
}

interface Node {
  x: number
  y: number
  z: number
  nodeSize: number
  id: string
  color: string
}

export const generateMap = ({ nodeSize, axisCapacity }: MapConfig) => {
  const nodesByID = {} as { [id: string]: Node }
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
        const randomColor = Math.floor(Math.random() * 16777215).toString(16)
        const node = { x, y, z, nodeSize, id, color: `#${randomColor}` }
        xMap.set(id, node)
        nodesByID[id] = node
      }
    })
  })
  return { dimensionalMap: zMap, nodesByID }
}
