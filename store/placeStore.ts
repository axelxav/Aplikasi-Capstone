import { create } from "zustand";

interface PlaceStore {
  placeName: string
  setPlaceName: (place: string) => void
}

const usePlaceStore = create<PlaceStore>((set) => ({
  placeName: '',
  setPlaceName: (place) => set({ placeName: place })
}));

export default usePlaceStore;