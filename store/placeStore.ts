import { create } from "zustand";

interface PlaceStore {
  placeName: string
  setPlaceName: (place: string) => void
  placeId: number
  setPlaceId: (id: number) => void
}

const usePlaceStore = create<PlaceStore>((set) => ({
  placeName: '',
  setPlaceName: (place) => set({ placeName: place }),
  placeId: 0,
  setPlaceId: (id) => set({ placeId: id })
}));

export default usePlaceStore;