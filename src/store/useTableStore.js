import { create } from "zustand";

const useTableStore = create((set) => ({
  tables: {
    users: {
      data: [
        {
          name: "محمد",
          age: 25,
        },
        {
          name: "علي",
          age: 30,
        },
      ],
    },
    payment: {
      data: [
        {
          account_id: 16,
          amount: 30000,
        },
        {
          account_id: 3,
          amount: 70000,
        },
      ],
    },
  },

  updateTableData: (tableName, data) => {
    set((state) => ({
      tables: {
        ...state.tables,
        [tableName]: { data },
      },
    }));
  },
}));

export default useTableStore;
