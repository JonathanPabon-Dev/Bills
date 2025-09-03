export const billNameList = [
  { value: "Agua", name: "Agua" },
  { value: "Luz", name: "Luz" },
  { value: "Gas", name: "Gas" },
  { value: "Movistar", name: "Movistar" },
  { value: "Claro", name: "Claro" },
  { value: "TcNu", name: "Tarjeta Crédito NU" },
  { value: "TcDavivienda", name: "Tarjeta Crédito Davivienda" },
  { value: "Arriendo", name: "Arriendo" },
  { value: "TcAlkosto", name: "Tarjeta Crédito Alkosto" },
  { value: "Admon", name: "Administración" },
  { value: "Plataformas", name: "Suscripciones" },
  { value: "Addi", name: "Addi" },
  { value: "Cine", name: "Cine" },
  { value: "Otro", name: "Otro" },
];

export const methodsList = [
  { value: "Efectivo", name: "Efectivo" },
  { value: "Transferencia", name: "Transferencia" },
  { value: "Crédito", name: "Tarjeta de Crédito" },
];

export const defaultDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}-${"01"}`;
};

export const initialFilters = {
  deadlineSince: defaultDate(),
  deadlineUntil: "",
  billName: "",
};
