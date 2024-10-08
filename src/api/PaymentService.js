import { supabase, validateConnection } from "../../supabase";

const PaymentService = {
  getPayments: async () => {
    try {
      if (!validateConnection) {
        throw new Error("Error de conexión.");
      }
      const response = await supabase
        .from("bills")
        .select()
        .order("paymentDeadline", { ascending: false });
      return response;
    } catch (error) {
      console.error(error);
    }
  },

  createPayment: async (payment) => {
    try {
      if (!validateConnection) {
        throw new Error("Error de conexión.");
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
        throw new Error("Error de conexión.");
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
        throw new Error("Error de conexión.");
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
