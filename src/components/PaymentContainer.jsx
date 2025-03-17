import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import PaymentService from "../api/PaymentService";
import PaymentForm from "./PaymentForm";
import PaymentList from "./PaymentList";
import { CreateIcon, FilterIcon, ResetFilterIcon } from "../assets/Icons";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import FilterModal from "./FilterModal";
import { defaultDate, initialFilters } from "../utils/utils";

const PaymentContainer = () => {
  const [paymentData, setPaymentData] = useState(null);
  const [storedPayments, setStoredPayments] = useState([]);
  const [toggleForm, setToggleForm] = useState(false);
  const [toggleFilters, setToggleFilters] = useState(false);
  const [filters, setFilters] = useState(initialFilters);
  const [hasFilters, setHasFilters] = useState(false);

  const handleSubmit = (payment) => {
    if (paymentData) {
      PaymentService.updatePayment(payment).then((response) => {
        if (response.status === 204) {
          toast.success("Record updated successfully");
          loadData();
        } else {
          toast.error("Error updatting record");
        }
      });
    } else {
      PaymentService.createPayment(payment).then((response) => {
        if (response.status === 201) {
          toast.success("Record created successfully");
          loadData();
        } else {
          toast.error("Error creatting record");
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
      text: "Confirm delete record?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#009c0d",
      cancelButtonColor: "#d33",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        PaymentService.deletePayment(paymentId).then((response) => {
          if (response.status === 204) {
            toast.success("Recored deleted successfully");
            loadData();
          } else {
            toast.error("Error deleting record");
          }
        });
      }
    });
  };

  const handleClearFilters = () => {
    setFilters(initialFilters);
  };

  const loadData = useCallback(() => {
    PaymentService.getPayments(filters).then((response) => {
      setStoredPayments(response.data);
    });
  }, [filters]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    setHasFilters(
      (filters.billName !== undefined && filters.billName !== "") ||
        (filters.deadlineSince !== undefined &&
          filters.deadlineSince !== "" &&
          filters.deadlineSince !== defaultDate()) ||
        (filters.deadlineUntil !== undefined && filters.deadlineUntil !== ""),
    );
  }, [filters]);

  return (
    <div className="container mx-auto my-10 max-w-fit">
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
          <div className="my-5 flex flex-row-reverse items-center justify-between gap-5">
            <div className="flex gap-2">
              <button
                className="size-10 rounded bg-green-600 p-2 text-right font-bold text-white hover:bg-green-700"
                onClick={() => setToggleForm(!toggleForm)}
                title="Add New"
              >
                <CreateIcon stroke={"#eee"} />
              </button>
              <button
                className="size-10 rounded bg-slate-600 p-2 text-right font-bold text-white hover:bg-slate-700"
                onClick={() => setToggleFilters(true)}
                title="Filters"
              >
                <FilterIcon stroke={"#eee"} />
              </button>
              <button
                className={
                  hasFilters
                    ? "size-10 rounded bg-slate-600 p-2 text-right font-bold text-white hover:bg-slate-700"
                    : "hidden"
                }
                onClick={() => handleClearFilters()}
                title="Clear Filters"
              >
                <ResetFilterIcon stroke={"#eee"} />
              </button>
            </div>
            {storedPayments.length === 0 && (
              <p className="text-lg font-bold">
                No data found. Try add a new register.
              </p>
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
      <FilterModal
        isOpen={toggleFilters}
        onClose={() => setToggleFilters(false)}
        filters={filters}
        setFilters={setFilters}
      />
    </div>
  );
};

PaymentContainer.propTypes = {
  initialFilters: PropTypes.object,
};

export default PaymentContainer;
