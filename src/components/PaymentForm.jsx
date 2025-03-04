import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { billNameList, methodsList } from "../utils/utils";

const PaymentForm = ({ paymentData, onSubmit, onCancel }) => {
  const initialData = {
    billName: "",
    paymentDeadline: "",
    amount: null,
    paymentDate: null,
    totalPaid: null,
    paymentMethod: null,
    description: "",
  };

  const [payment, setPayment] = useState(initialData);

  const handleChange = (e) => {
    setPayment({
      ...payment,
      [e.target.name]: e.target.value !== "" ? e.target.value : null,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPayment = payment.paymentDate
      ? { ...payment, totalPaid: payment.totalPaid || payment.amount }
      : payment;
    onSubmit(newPayment);
  };

  const handleCancel = () => {
    onCancel();
  };

  useEffect(() => {
    if (paymentData) {
      setPayment(paymentData);
    }
  }, [paymentData]);

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <label>
          Bill Name
          <select
            name="billName"
            value={payment.billName}
            onChange={handleChange}
            className="mt-1 w-full rounded-md bg-slate-600 px-2 py-2"
            required
          >
            <option value="">Seleccione una opción</option>
            {billNameList.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
        </label>

        {payment.billName === "Otro" && (
          <label>
            Description
            <input
              type="text"
              name="description"
              value={payment.description}
              onChange={handleChange}
              className="mt-1 w-full rounded-md bg-slate-600 px-2 py-2"
              required={payment.billName === "Otro"}
            />
          </label>
        )}

        <label>
          Payment Deadline
          <input
            type="date"
            name="paymentDeadline"
            value={payment.paymentDeadline}
            onChange={handleChange}
            className="mt-1 w-full rounded-md bg-slate-600 px-2 py-2"
            required
          />
        </label>

        <label>
          Amount
          <input
            type="number"
            name="amount"
            step={0.01}
            min={0}
            value={payment.amount || ""}
            onChange={handleChange}
            className="mt-1 w-full rounded-md bg-slate-600 px-2 py-2"
            required
          />
        </label>

        <label>
          Payment Date
          <input
            type="datetime-local"
            name="paymentDate"
            value={
              payment.paymentDate
                ? payment.paymentDate.toLocaleString("es-CO")
                : ""
            }
            onChange={handleChange}
            className="mt-1 w-full rounded-md bg-slate-600 p-2"
          />
        </label>

        <label>
          Total Paid
          <input
            type="number"
            name="totalPaid"
            min={0}
            step={0.01}
            value={payment.totalPaid || ""}
            onChange={handleChange}
            className="mt-1 w-full rounded-md bg-slate-600 px-2 py-2"
          />
        </label>

        <label>
          Payment Method
          <select
            name="paymentMethod"
            value={payment.paymentMethod || ""}
            onChange={handleChange}
            className="mt-1 w-full rounded-md bg-slate-600 p-2"
          >
            <option value="">Seleccione una opción</option>
            {methodsList.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
        </label>

        <div className="mt-3 flex justify-end gap-3">
          <button
            type="button"
            className="w-fit rounded-md bg-slate-700 px-5 py-2 hover:bg-slate-800"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-fit rounded-md bg-blue-700 px-5 py-2 hover:bg-blue-800"
          >
            {paymentData ? "Save Changes" : "Send"}
          </button>
        </div>
      </form>
    </>
  );
};

PaymentForm.propTypes = {
  paymentData: PropTypes.object,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};

export default PaymentForm;
