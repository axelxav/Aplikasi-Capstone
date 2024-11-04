import { create } from "zustand";

interface SelectedTimeStore {
  selectedTime: string
  setSelectedTime: (place: string) => void
}

const useSelectedTime = create<SelectedTimeStore>((set) => ({
  selectedTime: 'Select Time',
  setSelectedTime: (place) => set({ selectedTime: place })
}));

export default useSelectedTime;