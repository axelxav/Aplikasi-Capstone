import { create } from "zustand";

interface OtsStore {
  validationCount: boolean;
  setValidationCount: (validation: boolean) => void;
  otsReservation: boolean;
  setOtsReservation: (reservation: boolean) => void;
}

const useOtsStore = create<OtsStore>((set) => ({
  validationCount: false,
  setValidationCount: (validation) => set({ validationCount: validation }),
  otsReservation: false,
  setOtsReservation: (reservation) => set({ otsReservation: reservation }),
}));

export default useOtsStore;