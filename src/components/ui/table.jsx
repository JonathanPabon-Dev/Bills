import { forwardRef } from "react";
import PropTypes from "prop-types";
import { cn } from "@/lib/utils";

// Componente Table simple
const Table = forwardRef(({ className, ...props }, ref) => (
  <div className="w-full overflow-auto">
    <table ref={ref} className={cn("w-full text-sm", className)} {...props} />
  </div>
));
Table.displayName = "Table";
Table.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

// Componente TableHeader simple
const TableHeader = forwardRef(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("", className)} {...props} />
));
TableHeader.displayName = "TableHeader";
TableHeader.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

// Componente TableBody simple
const TableBody = forwardRef(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn("", className)} {...props} />
));
TableBody.displayName = "TableBody";
TableBody.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

// Componente TableRow con estilos básicos
const TableRow = forwardRef(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "transition-colors hover:bg-gray-50 dark:hover:bg-gray-800",
      className,
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";
TableRow.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

// Componente TableHead con estilos básicos
const TableHead = forwardRef(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "whitespace-nowrap h-10 px-4 text-left align-middle font-medium text-gray-500 dark:text-gray-400",
      className,
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";
TableHead.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

// Componente TableCell con estilos básicos
const TableCell = forwardRef(({ className, ...props }, ref) => (
  <td 
    ref={ref} 
    className={cn(
      "whitespace-nowrap p-3 align-middle",
      className
    )} 
    {...props} 
  />
));
TableCell.displayName = "TableCell";
TableCell.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

// Exportar solo los componentes necesarios
export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell };
