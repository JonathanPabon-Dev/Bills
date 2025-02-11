import { supabase, validateConnection } from "../../supabase";

const PaymentService = {
  getPayments: async (filters = {}) => {
    try {
      if (!validateConnection) {
        throw new Error("Connection error!");
      }

      let query = supabase.from("bills").select();

      if (filters.billName !== undefined && filters.billName !== "") {
        query = query.eq("billName", filters.billName);
      }
      if (filters.deadlineSince !== undefined && filters.deadlineSince !== "") {
        query = query.gte("paymentDeadline", filters.deadlineSince);
      }
      if (filters.deadlineUntil !== undefined && filters.deadlineUntil !== "") {
        query = query.lte("paymentDeadline", filters.deadlineUntil);
      }

      query = query.order("paymentDeadline", { ascending: false });

      const response = await query;
      return response;
    } catch (error) {
      console.error(error);
    }
  },

  createPayment: async (payment) => {
    try {
      if (!validateConnection) {
        throw new Error("Connection error!");
      }
      const response = await supabase.from("bills").insert({ ...payment });
      return response;
    } catch (error) {
      console.error(error);
    }
  },

  updatePayment: async (payment) => {
    try {
      if (!validateConnection) {
        throw new Error("Connection error!");
      }
      const response = await supabase
        .from("bills")
        .update({ ...payment })
        .eq("id", payment.id);
      return response;
    } catch (error) {
      console.error(error);
    }
  },

  deletePayment: async (paymentId) => {
    try {
      if (!validateConnection) {
        throw new Error("Connection error!");
      }
      const response = await supabase
        .from("bills")
        .delete()
        .eq("id", paymentId);
      return response;
    } catch (error) {
      console.error(error);
    }
  },
};

export default PaymentService;
