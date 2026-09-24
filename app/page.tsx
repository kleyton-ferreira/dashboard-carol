import {
  DollarSign,
  PackageIcon,
  ShoppingBagIcon,
  ShoppingBasketIcon,
} from "lucide-react";

import {
  SummaryCard,
  SummaryCardTitle,
  SummaryCardIcon,
  SummaryCardValue,
} from "./(dashboard)/summary-card";
import { getDashboard } from "./_data-access/dashboard/get-dashboard";
import { formatBRL } from "./_lib/formatBRL";
import RevenueChart from "./(dashboard)/revenue-chart";
import MostSoldClientItem from "./(dashboard)/most-sold-client-item";

const HomePage = async () => {
  const {
    todayRevenue,
    totalProducts,
    totalRevenue,
    totalSales,
    totalLast30DaysRevenue,
    mostSoldProducts,
  } = await getDashboard();

  return (
    <div className="flex h-full w-full flex-col">
      <div className="gap-4 border-b border-gray-200 bg-white px-4 py-3 sm:flex-row sm:items-center md:px-8 md:py-4">
        <div className="hidden min-w-0 flex-col gap-1 md:flex">
          <h2 className="hidden text-base font-bold text-slate-800 md:block md:text-lg">
            Faturamentos & Atendimentos
          </h2>
          <p className="hidden text-sm text-slate-500 sm:block">
            Histórico de faturamentos e serviços
          </p>
        </div>

        <div className="mb-3 grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-6">
          <SummaryCard>
            <SummaryCardIcon>
              <DollarSign className="animate-pulse" />
            </SummaryCardIcon>
            <SummaryCardTitle>Faturamento Total</SummaryCardTitle>
            <SummaryCardValue> {formatBRL(totalRevenue)} </SummaryCardValue>
          </SummaryCard>

          <SummaryCard>
            <SummaryCardIcon>
              <ShoppingBagIcon className="animate-pulse" />
            </SummaryCardIcon>
            <SummaryCardTitle>Faturamento Hoje</SummaryCardTitle>
            <SummaryCardValue> {formatBRL(todayRevenue)} </SummaryCardValue>
          </SummaryCard>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-6 lg:grid-cols-2">
          <SummaryCard>
            <SummaryCardIcon>
              <ShoppingBasketIcon className="animate-pulse" />
            </SummaryCardIcon>
            <SummaryCardTitle>Atendimento de clientes</SummaryCardTitle>
            <SummaryCardValue> {totalProducts} </SummaryCardValue>
          </SummaryCard>

          <SummaryCard>
            <SummaryCardIcon>
              <PackageIcon className="animate-pulse" />
            </SummaryCardIcon>
            <SummaryCardTitle>Atendimentos concluidos</SummaryCardTitle>
            <SummaryCardValue> {totalSales} </SummaryCardValue>
          </SummaryCard>
        </div>
      </div>

      <div className="grid min-h-0 grid-cols-1 gap-1 lg:grid-cols-[minmax(0,2.5fr),minmax(0,1fr)]">
        <div className="flex h-full min-h-[406px] flex-col overflow-hidden rounded-xl bg-white p-4 sm:p-5 md:p-6">
          <div className="text-center">
            <p className="text-[15px] font-bold text-purple-600 md:text-lg">
              Faturamento dos Últimos 30 dias
            </p>
            <p className="text-xs text-slate-500 md:text-sm">
              Acompanhe seus faturamentos diários
            </p>
          </div>
          <RevenueChart data={totalLast30DaysRevenue} />
        </div>
        <div className="flex h-full min-h-[300px] flex-col overflow-hidden rounded-lg bg-white p-4 sm:p-5 md:p-6">
          <p className="mb-2 text-sm font-bold text-purple-700 sm:mb-3 sm:text-base md:mb-4">
            Clientes e Serviços
          </p>

          <div className="min-h-0 flex-1 space-y-1.5 overflow-auto sm:space-y-2">
            {mostSoldProducts.map((clientItem) => (
              <MostSoldClientItem
                product={clientItem}
                key={clientItem.productId}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
