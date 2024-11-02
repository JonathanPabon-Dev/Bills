import { useState, useEffect } from "react";
import PaymentService from "../api/PaymentService";
import PaymentForm from "./PaymentForm";
import PaymentList from "./PaymentList";
import { CreateIcon } from "../assets/Icons";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const PaymentContainer = () => {
  const [paymentData, setPaymentData] = useState(null);
  const [storedPayments, setStoredPayments] = useState([]);
  const [toggleForm, setToggleForm] = useState(false);

  const handleSubmit = (payment) => {
    console.log(paymentData);
    if (paymentData) {
      PaymentService.updatePayment(payment).then((response) => {
        if (response.status === 204) {
          toast.success("Registro actualizado correctamente");
          loadData();
        } else {
          toast.error("Error al actualizar el registro");
        }
      });
    } else {
      PaymentService.createPayment(payment).then((response) => {
        if (response.status === 201) {
          toast.success("Registro creado correctamente");
          loadData();
        } else {
          toast.error("Error al crear el registro");
        }
      });
    }
    setPaymentData(null);
    setToggleForm(!toggleForm);
  };

  const handleCancel = () => {
    setToggleForm(!toggleForm);
  };

  const handleEdit = (payment) => {
    setPaymentData(payment);
    setToggleForm(!toggleForm);
  };

  const handleDelete = (paymentId) => {
    Swal.fire({
      text: "¿Está seguro de que desea eliminar el registro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#009c0d",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        PaymentService.deletePayment(paymentId).then((response) => {
          if (response.status === 204) {
            toast.success("Registro eliminado correctamente");
            loadData();
          } else {
            toast.error("Error al eliminar el registro");
          }
        });
      }
    });
  };

  const loadData = () => {
    PaymentService.getPayments().then((response) => {
      setStoredPayments(response.data);
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="mx-auto my-10 max-w-[90%]">
      <h2 className="mb-10 text-center text-5xl font-bold uppercase">
        {toggleForm ? " Payment Form" : "Payment Table"}
      </h2>
      {toggleForm ? (
        <>
          <PaymentForm
            paymentData={paymentData}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </>
      ) : (
        <>
          <div className="my-5 flex flex-row-reverse items-center justify-between">
            <button
              className="size-10 rounded bg-green-600 p-2 text-right font-bold text-white hover:bg-green-700"
              onClick={() => setToggleForm(!toggleForm)}
              title="Add New"
            >
              <CreateIcon stroke={"#eee"} />
            </button>
            {storedPayments.length === 0 && (
              <p>No data found. Try add a new register.</p>
            )}
          </div>
          {storedPayments.length > 0 && (
            <PaymentList
              payments={storedPayments}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </>
      )}
    </div>
  );
};

export default PaymentContainer;
