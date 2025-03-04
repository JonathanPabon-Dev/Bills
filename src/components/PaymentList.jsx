import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { EditIcon, DeleteIcon } from "../assets/Icons";
import { billNameList } from "../utils/utils";
import TooltipMessagge from "./TooltipMessagge";

const PaymentList = ({ payments, onEdit, onDelete }) => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);

  useEffect(() => {
    const accAmount = payments.reduce(
      (acc, payment) => acc + payment.amount,
      0,
    );

    const accPaid = payments.reduce(
      (acc, payment) => acc + payment.totalPaid,
      0,
    );

    setTotalAmount(accAmount);
    setTotalPaid(accPaid);
  }, [payments]);

  return (
    <div className="overflow-x-auto rounded-lg border border-slate-800">
      <table className="text-nowrap">
        <thead>
          <tr>
            <th className="px-4 py-2 text-lg font-bold">Bill Name</th>
            <th className="px-4 py-2 text-lg font-bold">Payment Deadline</th>
            <th className="px-4 py-2 text-lg font-bold">Amount</th>
            <th className="px-4 py-2 text-lg font-bold">Payment Date</th>
            <th className="px-4 py-2 text-lg font-bold">Total Paid</th>
            <th className="px-4 py-2 text-lg font-bold">Method</th>
            <th className="px-4 py-2 text-lg font-bold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment, index) => (
            <tr
              key={payment.id}
              className={index % 2 === 0 ? "bg-slate-700" : "bg-slate-800"}
            >
              <td className="px-4 py-2">
                <div className="flex justify-between">
                  {
                    billNameList.find(
                      (registro) => registro.value === payment.billName,
                    ).name
                  }
                  {payment.billName === "Otro" && (
                    <TooltipMessagge messagge={payment.description} />
                  )}
                </div>
              </td>
              <td className="px-4 py-2 text-center">
                {payment.paymentDeadline}
              </td>
              <td className="px-4 py-2">
                <div className="flex justify-between">
                  <span>$</span>
                  <span>{payment.amount.toLocaleString("en-us")}</span>
                </div>
              </td>
              <td className="px-4 py-2 text-center">
                {payment.paymentDate
                  ? payment.paymentDate
                      .toLocaleString("es-ES", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        seconds: "0-digit",
                        hour12: false,
                      })
                      .replace("T", " ")
                      .slice(0, -3)
                  : ""}
              </td>
              <td className="px-4 py-2">
                {payment.totalPaid ? (
                  <div className="flex justify-between">
                    <span>$</span>
                    <span>{payment.totalPaid.toLocaleString("en-us")}</span>
                  </div>
                ) : (
                  ""
                )}
              </td>
              <td className="px-4 py-2">{payment.paymentMethod}</td>
              <td className="flex gap-3 px-4 py-2">
                <button
                  className="rounded bg-blue-700 p-2 font-bold text-white hover:bg-blue-800"
                  onClick={() => onEdit(payment)}
                  title="Edit"
                >
                  <EditIcon stroke={"#eee"} />
                </button>
                <button
                  className="rounded bg-red-700 p-2 font-bold text-white hover:bg-red-800"
                  onClick={() => onDelete(payment.id)}
                  title="Delete"
                >
                  <DeleteIcon stroke={"#eee"} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td className="px-4 py-2 font-bold">Total</td>
            <td className="px-4 py-2"></td>
            <td className="px-4 py-2">
              <div className="flex justify-between">
                <span>$</span>
                <span>{totalAmount.toLocaleString("en-us")}</span>
              </div>
            </td>
            <td className="px-4 py-2"></td>
            <td className="px-4 py-2">
              <div className="flex justify-between">
                <span>$</span>
                <span>{totalPaid.toLocaleString("en-us")}</span>
              </div>
            </td>
            <td className="px-4 py-2"></td>
            <td className="px-4 py-2"></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

PaymentList.propTypes = {
  payments: PropTypes.arrayOf(PropTypes.object).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default PaymentList;
