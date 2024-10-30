// frontend/store/userStore.ts
import {create} from 'zustand';

interface UserInfo {
  username: string;
  phone_num: string;
  license_plate: string;
  user_unique: string;
}

interface UserStore {
  userInfo: UserInfo;
  setUserInfo: (newUserInfo: UserInfo) => void;
}

const useUserStore = create<UserStore>((set) => ({
  userInfo: {
    username: '',
    phone_num: '',
    license_plate: '',
    user_unique: '',
  },
  setUserInfo: (newUserInfo) => set({ userInfo: newUserInfo }),
}));

export default useUserStore;
