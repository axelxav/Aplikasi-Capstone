import {create} from 'zustand';

interface TestingStore {
  iplocalhost: string;
}

const useTestingStore = create<TestingStore>((set) => ({
  iplocalhost: '192.168.137.1', //ganti sama ip sekarang
}));

export default useTestingStore