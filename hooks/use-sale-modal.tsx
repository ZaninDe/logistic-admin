import { create } from 'zustand'

interface useSaleModalProps {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useSaleModal = create<useSaleModalProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
