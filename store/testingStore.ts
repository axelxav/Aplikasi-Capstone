import {create} from 'zustand';

interface TestingStore {
  iplocalhost: string;
}

const useTestingStore = create<TestingStore>((set) => ({
  iplocalhost: '10.200.139.104',
}));

export default useTestingStore