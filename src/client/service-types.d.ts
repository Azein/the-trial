type DecartCords = [number, number, number]

interface WorldNode {
  position: DecartCords // stands for xyz
  nodeSize: number
  id: string
  color: string
  isVisible?: boolean
}
