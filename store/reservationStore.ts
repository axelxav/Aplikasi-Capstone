import { create } from "zustand";

interface ReservationStore {
  reservation_qr: string;
  setReservationQR: (qr: string) => void;
  startCount: boolean;
  setStartCount: (start: boolean) => void;
  hasArrived: boolean;
  setHasArrived: (arrived: boolean) => void;
  hasFinished: boolean;
  setHasFinished: (open: boolean) => void;
}

const useReservationStore = create<ReservationStore>((set) => ({
  reservation_qr: '',
  setReservationQR: (qr) => set({ reservation_qr: qr }),
  startCount: false,
  setStartCount: (start) => set({ startCount: start }),
  hasArrived: false,
  setHasArrived: (arrived) => set({ hasArrived: arrived }),
  hasFinished: false,
  setHasFinished: (open) => set({ hasFinished: open }),
}));

export default useReservationStore;