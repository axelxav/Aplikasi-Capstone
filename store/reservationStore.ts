import { create } from "zustand";

interface ReservationStore {
  reservation_qr: string;
  setReservationQR: (qr: string) => void;
  startCount: boolean;
  setStartCount: (start: boolean) => void;
}

const useReservationStore = create<ReservationStore>((set) => ({
  reservation_qr: '',
  setReservationQR: (qr) => set({ reservation_qr: qr }),
  startCount: false,
  setStartCount: (start) => set({ startCount: start }),
}));

export default useReservationStore;