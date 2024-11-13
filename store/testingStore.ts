import {create} from 'zustand';

interface TestingStore {
  iplocalhost: string;
}

const useTestingStore = create<TestingStore>((set) => ({
  // ip rumah
  iplocalhost: '192.168.100.121'
  
  // iplocalhost: '10.200.92.215',
}));

export default useTestingStore