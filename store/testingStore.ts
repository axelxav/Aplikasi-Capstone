import {create} from 'zustand';

interface TestingStore {
  iplocalhost: string;
}

const useTestingStore = create<TestingStore>((set) => ({
  iplocalhost: '172.20.10.5',
}));

export default useTestingStore