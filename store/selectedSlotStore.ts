import { create } from "zustand";

interface SelectedSlotStore {
  selectedSlot: string
  setSelectedSlot: (place: string) => void
}

const useSelectedSlot = create<SelectedSlotStore>((set) => ({
  selectedSlot: 'Select Slot',
  setSelectedSlot: (place) => set({ selectedSlot: place })
}));

export default useSelectedSlot;