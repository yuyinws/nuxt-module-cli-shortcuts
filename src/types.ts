export interface ShortCut {
  key: string
  description: string
  action: () => void | Promise<void>
}
