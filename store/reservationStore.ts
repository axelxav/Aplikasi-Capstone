import { create } from "zustand";

interface ReservationStore {
  reservation_qr: string;
  setReservationQR: (qr: string) => void;
}

const useReservationStore = create<ReservationStore>((set) => ({
  reservation_qr: '',
  setReservationQR: (qr) => set({ reservation_qr: qr })
}));

export default useReservationStore;