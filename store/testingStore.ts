import {create} from 'zustand';

interface TestingStore {
  iplocalhost: string;
}

const useTestingStore = create<TestingStore>((set) => ({
  iplocalhost: '192.168.123.102',
}));

export default useTestingStore