import {create} from 'zustand';

interface TestingStore {
  iplocalhost: string;
}

const useTestingStore = create<TestingStore>((set) => ({
  // ip rumah
  iplocalhost: '192.168.100.121'
  
  // iplocalhost: '192.168.1.70',
}));

export default useTestingStore