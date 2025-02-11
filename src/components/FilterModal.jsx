import PropTypes from "prop-types";
import { billNameList } from "../utils/utils";

const FilterModal = ({ isOpen, onClose, filters, setFilters }) => {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90">
      <div className="rounded bg-slate-800 p-5 shadow-lg">
        <h2 className="mb-4 text-xl font-bold">Filters</h2>
        <div className="mb-4">
          <div className="mb-4">
            <label>
              Bill Name
              <select
                name="billName"
                value={filters.billName}
                onChange={handleFilterChange}
                className="w-full rounded-md bg-slate-500 p-2"
              >
                <option value="">Seleccione una opción</option>
                {billNameList.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div className="mb-4">
            <label>
              Deadline Since
              <input
                type="date"
                name="deadlineSince"
                value={filters.deadlineSince || ""}
                onChange={handleFilterChange}
                className="w-full rounded-md bg-slate-500 p-2"
              />
            </label>
          </div>
          <div className="mb-4">
            <label>
              Deadline Until
              <input
                type="date"
                name="deadlineUntil"
                value={filters.deadlineUntil || ""}
                onChange={handleFilterChange}
                className="w-full rounded-md bg-slate-500 p-2"
              />
            </label>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <button
            className="rounded bg-gray-500 px-4 py-2 hover:bg-gray-600"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

FilterModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
};

export default FilterModal;
