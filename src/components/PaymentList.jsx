import { useEffect, useState } from "react";
import PropTypes from "prop-types";
// Pagination is handled by the parent component
import {
  EditIcon,
  DeleteIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "../assets/Icons";
import { billNameList } from "../utils/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const PaymentList = ({
  payments = [],
  onEdit,
  onDelete,
  pagination = { page: 1, totalPages: 1, totalItems: 0 },
  onPageChange,
  pageSize = 10,
}) => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalPaid, setTotalPaid] = useState(0);

  // Calcular totales
  useEffect(() => {
    const accAmount = payments.reduce(
      (acc, payment) => acc + payment.amount,
      0,
    );
    const accPaid = payments.reduce(
      (acc, payment) => acc + (payment.totalPaid || 0),
      0,
    );
    setTotalAmount(accAmount);
    setTotalPaid(accPaid);
  }, [payments]);

  const { page = 1, totalPages = 1, totalItems = 0 } = pagination;
  const startItem = Math.min((page - 1) * pageSize + 1, totalItems);
  const endItem = Math.min(page * pageSize, totalItems);

  // Pagination is handled by the parent component through onPageChange

  const handlePageChange = (newPage) => {
    console.log(newPage);
    const pageNumber = Math.max(1, Math.min(newPage, totalPages));
    if (pageNumber !== page) {
      onPageChange(pageNumber);
    }
  };

  const renderPagination = () => (
    <div className="flex flex-col items-center space-y-3 px-2 py-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
      <div className="text-muted-foreground text-center text-sm sm:text-left">
        Showing {startItem} to {endItem} of {totalItems} entries
      </div>
      <div className="flex items-center space-x-2">
        <button
          className="rounded border p-1 disabled:opacity-50"
          onClick={() => handlePageChange(1)}
          disabled={page <= 1}
          aria-label="First page"
        >
          <ChevronDoubleLeftIcon className="h-4 w-4" />
        </button>
        <button
          className="rounded border p-1 disabled:opacity-50"
          onClick={() => handlePageChange(page - 1)}
          disabled={page <= 1}
          aria-label="Previous page"
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </button>
        <span className="px-2 text-sm">
          Page {page} of {totalPages}
        </span>
        <button
          className="rounded border p-1 disabled:opacity-50"
          onClick={() => handlePageChange(page + 1)}
          disabled={page >= totalPages}
          aria-label="Next page"
        >
          <ChevronRightIcon className="h-4 w-4" />
        </button>
        <button
          className="rounded border p-1 disabled:opacity-50"
          onClick={() => handlePageChange(totalPages)}
          disabled={page >= totalPages}
          aria-label="Last page"
        >
          <ChevronDoubleRightIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );

  // Render the table
  return (
    <div className="flex flex-col space-y-4">
      <div className="text-card-foreground rounded-lg border border-slate-300 bg-slate-100 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="text-center">
              <TableHead className="text-center">Bill Name</TableHead>
              <TableHead className="text-center">Deadline</TableHead>
              <TableHead className="text-center">Amount</TableHead>
              <TableHead className="text-center">Payment Date</TableHead>
              <TableHead className="text-center">Total Paid</TableHead>
              <TableHead className="text-center">Payment Method</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.length > 0 ? (
              payments.map((payment, index) => (
                <TableRow
                  key={payment.id}
                  className={`hover:bg-muted/50 ${
                    index % 2 === 0
                      ? "bg-slate-200 dark:bg-gray-700"
                      : "bg-slate-300 dark:bg-gray-800"
                  }`}
                >
                  <TableCell className="font-medium">
                    <div>
                      {payment.billName === "Otro"
                        ? payment.description
                        : billNameList.find((r) => r.value === payment.billName)
                            ?.name}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    {payment.paymentDeadline}
                  </TableCell>
                  <TableCell className="text-right">
                    $ {payment.amount.toLocaleString("en-us")}
                  </TableCell>
                  <TableCell>
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
                  </TableCell>
                  <TableCell className="text-right">
                    $ {(payment.totalPaid || 0).toLocaleString("en-us")}
                  </TableCell>
                  <TableCell>{payment.paymentMethod || ""}</TableCell>
                  <TableCell className="w-[120px] p-0">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => onEdit(payment)}
                        className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-500 text-white transition-colors hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                        aria-label="Edit payment"
                        type="button"
                      >
                        <EditIcon
                          className="h-4 w-4 text-white"
                          stroke="currentColor"
                        />
                      </button>
                      <button
                        onClick={() => onDelete(payment.id)}
                        className="flex h-6 w-6 items-center justify-center rounded-md bg-red-500 text-white transition-colors hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
                        aria-label="Delete payment"
                        type="button"
                      >
                        <DeleteIcon
                          className="h-4 w-4 text-white"
                          stroke="currentColor"
                        />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <tfoot className="bg-muted/50 font-bold">
            <TableRow>
              <TableCell>Total</TableCell>
              <TableCell />
              <TableCell className="text-right">
                <div>$ {totalAmount.toLocaleString("en-us")}</div>
              </TableCell>
              <TableCell />
              <TableCell className="text-right">
                <div>$ {totalPaid.toLocaleString("en-us")}</div>
              </TableCell>
              <TableCell colSpan={2} />
            </TableRow>
          </tfoot>
        </Table>
      </div>
      {totalPages > 1 && renderPagination()}
    </div>
  );
};

PaymentList.propTypes = {
  payments: PropTypes.arrayOf(PropTypes.object).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  pagination: PropTypes.shape({
    page: PropTypes.number,
    totalPages: PropTypes.number,
    totalItems: PropTypes.number,
  }),
  onPageChange: PropTypes.func.isRequired,
  pageSize: PropTypes.number,
};

export default PaymentList;
