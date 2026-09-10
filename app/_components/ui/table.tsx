import * as React from "react";

import { cn } from "@/app/_herlpers/utils";

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="scrollbar-hide relative w-full overflow-x-auto">
    <table
      ref={ref}
      className={cn(
        "w-full caption-bottom",
        "text-xs sm:text-sm md:text-base", // Responsivo para 3 breakpoints
        "min-w-full", // Força largura mínima para scroll mobile
        className,
      )}
      {...props}
    />
  </div>
));
Table.displayName = "Table";

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn(
      "[&_tr]:border-b",
      "hidden sm:table-header-group", // Esconde apenas em mobile muito pequeno
      className,
    )}
    {...props}
  />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn(
      "[&_tr:last-child]:border-0",
      "block sm:table-row-group", // Display block em mobile
      className,
    )}
    {...props}
  />
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      "block sm:table-footer-group",
      className,
    )}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      "block sm:table-row", // Muda pra block em mobile
      "mb-3 sm:mb-0", // Margin em mobile
      "rounded-lg sm:rounded-none", // Border-radius em mobile
      "border sm:border-b", // Completa border em mobile
      "overflow-hidden", // Contém conteúdo dentro da borda
      "shadow-sm sm:shadow-none", // Sombra em mobile para profundidade
      "bg-card sm:bg-transparent", // Background em mobile
      className,
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      "py-2 sm:h-12 sm:py-0", // Padding reduzido em mobile
      "px-2 sm:px-3 md:px-4", // Padding horizontal responsivo
      "text-xs sm:text-sm md:text-base", // Fonte responsiva
      "font-semibold", // Destaca headers
      className,
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "p-4 align-middle [&:has([role=checkbox])]:pr-0",
      "block sm:table-cell", // Display block em mobile
      "py-2.5 sm:py-3 md:py-4", // Padding vertical responsivo
      "px-2 sm:px-3 md:px-4", // Padding horizontal responsivo
      "text-xs sm:text-sm md:text-base", // Fonte responsiva
      "before:font-semibold before:text-muted-foreground before:content-[attr(data-label)] sm:before:content-none", // Label em mobile
      "before:block sm:before:hidden", // Mostra/esconde label
      "before:mb-1.5 sm:before:mb-0", // Espaço após label
      "before:text-xs sm:before:text-sm", // Fonte do label responsiva
      "before:uppercase before:tracking-wide", // Estilo do label
      className,
    )}
    {...props}
  />
));
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn(
      "mt-4 text-muted-foreground",
      "text-xs sm:text-sm", // Fonte reduzida em mobile
      className,
    )}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
