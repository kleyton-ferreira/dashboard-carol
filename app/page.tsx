import {
  DollarSign,
  PackageIcon,
  ShoppingBagIcon,
  ShoppingBasketIcon,
  ShoppingCartIcon,
} from "lucide-react";
import {
  SummaryCard,
  SummaryCardTitle,
  SummaryCardIcon,
  SummaryCardValue,
} from "./(dashboard)/summary-card";
import { getDashboard } from "./_data-access/dashboard/get-dashboard";
import { formatBRL } from "./_lib/formatBRL";

const HomePage = async () => {
  const { todayRevenue, totalProducts, totalRevenue, totalSales } =
    await getDashboard();

  return (
    <div className="flex h-full w-full flex-col">
      <div className="gap-4 border-b border-gray-200 bg-white px-4 py-3 sm:flex-row sm:items-center md:px-8 md:py-4">
        <div className="hidden min-w-0 flex-col gap-1 md:flex">
          <h2 className="hidden text-base font-bold text-slate-800 md:block md:text-lg">
            Faturamento & Atendimento
          </h2>
          <p className="hidden text-sm text-slate-500 sm:block">
            Histórico de faturamentos e serviços
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-6">
          <SummaryCard>
            <SummaryCardIcon>
              <DollarSign />
            </SummaryCardIcon>
            <SummaryCardTitle>Faturamento Total</SummaryCardTitle>
            <SummaryCardValue> {formatBRL(totalRevenue)} </SummaryCardValue>
          </SummaryCard>

          <SummaryCard>
            <SummaryCardIcon>
              <ShoppingBagIcon />
            </SummaryCardIcon>
            <SummaryCardTitle>Faturamento Hoje</SummaryCardTitle>
            <SummaryCardValue> {formatBRL(todayRevenue)} </SummaryCardValue>
          </SummaryCard>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-6 lg:grid-cols-2">
          <SummaryCard>
            <SummaryCardIcon>
              <ShoppingBasketIcon />
            </SummaryCardIcon>
            <SummaryCardTitle>Atendimento de clientes</SummaryCardTitle>
            <SummaryCardValue> {totalProducts} </SummaryCardValue>
          </SummaryCard>

          <SummaryCard>
            <SummaryCardIcon>
              <PackageIcon />
            </SummaryCardIcon>
            <SummaryCardTitle>Atendimentos concluidos</SummaryCardTitle>
            <SummaryCardValue> {totalSales} </SummaryCardValue>
          </SummaryCard>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
