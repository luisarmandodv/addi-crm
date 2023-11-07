import { create } from 'zustand';
import { UserData } from 'src/types/index'

type ProspectStore = {
  leads: UserData[];
  setLeads: (lead: UserData) => void;
  prospects: UserData[];
  setProspects: (prospect: UserData) => void;
};

const useClientsStore = create<ProspectStore>((set) => ({
  leads: [],
  setLeads: (lead: UserData) =>
    set((state) => ({ leads: [...state.leads, lead] })),
  prospects: [],
  setProspects: (prospect: UserData) =>
    set((state) => ({
        leads: state.leads.filter((obj) => obj.id !== prospect.id),
        prospects: [...state.prospects, prospect]
    })),
}));

export default useClientsStore;

