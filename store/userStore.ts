// frontend/store/userStore.ts
import {create} from 'zustand';

interface UserInfo {
  userID: string;
  username: string;
  user_email: string;
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
    userID: '',
    username: '',
    user_email: '',
    phone_num: '',
    license_plate: '',
    user_unique: '',
  },
  setUserInfo: (newUserInfo) => set({ userInfo: newUserInfo }),
}));

export default useUserStore;
