import { create } from "zustand";

const useHeaders = create((set) => ({
  state: {
    users: {
      name: "الاسم",
      age: "العمر",
    },
    payment: {
      account_id: "رقم الحساب",
      amount: "المبلغ",
    },
  },
}));

export default useHeaders;
