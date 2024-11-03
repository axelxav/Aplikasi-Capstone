import {create} from 'zustand';

interface LocationStore {
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
}

const useLocationStore = create<LocationStore>((set) => ({
  selectedLocation: 'All Locations',
  setSelectedLocation: (location) => set({ selectedLocation: location})
}));

export default useLocationStore