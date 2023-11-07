import { create } from 'zustand';

type ModalStoreType = {
  isModalVisible: boolean;
  setIsModalVisible: (isModalVisible: boolean) => void;
};

const useModalStore = create<ModalStoreType>((set) => ({
  isModalVisible: false,
  setIsModalVisible: (isModalVisible) => set({ isModalVisible }),
}));

export default useModalStore;

