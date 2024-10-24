/* eslint-disable react-hooks/exhaustive-deps */
import { SectionTitle } from "@/components/section-title";
import { Button } from "@/components/ui/button";

import { withLayout } from "@/HOC/withLayout";
import { format, formatDate, subDays } from "date-fns";
import { ArrowLeftRight, Hash, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { useLoadPaymentsUseCase } from "../../useCases/useLoadPaymentsUseCase";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { paymentState } from "../../states/atoms";
import { IPayment } from "../../contracts/IRecoilState";
import PaymentIcon from "@/components/payment-icon";
import { formatPayment } from "@/helpers/formatPayment";
import DateFilter from "@/features/messages/presentations/components/messages-received/date-filter";
import { NoContent } from "@/components/no-content";
import PaginationComponent from "@/components/pagination";

const TransactionsHistory = () => {
  const setPaymentState = useSetRecoilState(paymentState);
  const [date, setDate] = useState<DateRange | undefined>({
    to: new Date(),
    from: subDays(new Date(), 30),
  });

  const { payments, controller } = useRecoilValue(paymentState);
  const { isLoadingPayments } = controller;
  const { loadPayments } = useLoadPaymentsUseCase();

  useEffect(() => {
    loadPayments();
  }, []);

  const handleSetDate = (date: DateRange) => {
    setDate(date);

    const from_date_formatted = date.from && format(date.from, "yyyy-MM-dd");
    const to_date_formatted = date.to && format(date.to, "yyyy-MM-dd");

    setPaymentState((prevState) => ({
      ...prevState,
      controller: {
        ...prevState.controller,
        params: {
          ...prevState.controller.params,
          startDate: from_date_formatted,
          endDate: to_date_formatted,
        },
      },
    }));
  };

  const clearDate = () => {
    setDate(undefined);

    setPaymentState((prevState) => ({
      ...prevState,
      controller: {
        ...prevState.controller,
        params: {
          ...prevState.controller.params,
          startDate: undefined,
          endDate: undefined,
        },
      },
    }));
  };

  return (
    <div>
      <SectionTitle title="Histórico de Transações" />

      {/* Filtro de Data */}
      <div className="flex justify-between items-center flex-wrap bg-muted/40 p-4">
        <DateFilter
          date={date}
          onDateSelect={handleSetDate}
          onClear={clearDate}
        />
        <Button
          variant="default"
          className="w-full lg:w-auto mt-4 lg:mt-0"
          onClick={() => {
            setPaymentState((prevState) => ({
              ...prevState,
              controller: {
                ...prevState.controller,
                params: {
                  ...prevState.controller.params,
                  page: 1,
                },
              },
            }));
            loadPayments({
              page: 1,
            });
          }}
        >
          <Search className="h-4 w-4 mr-2" />
          Filtrar
        </Button>
      </div>

      {!isLoadingPayments && !payments.results.length && (
        <div className="mt-10">
          <NoContent message="Nenhum pagamento para mostrar" />
        </div>
      )}
      {/* Cartões de Transações */}
      {!isLoadingPayments &&
        !!payments.results.length &&
        payments.results.map((payment: IPayment) => (
          <div
            className="border p-4 mt-10 bg-muted/40 flex flex-wrap items-start md:items-center justify-between gap-4 lg:gap-10 flex-col md:flex-row"
            key={payment.id}
          >
            <div className="flex items-start md:items-center gap-4 lg:gap-10 flex-1 flex-col md:flex-row">
              <ArrowLeftRight className="h-4 w-4" />
              {/* Data */}
              <span className="text-md">
                {formatDate(payment.createdAt, "dd/MM/yyyy")}
              </span>
              {/* ID da transação */}
              <div className="flex items-center gap-2">
                <Hash className="h-4 w-4" />
                <div className="flex flex-col">
                  <span className="text-md text-muted-foreground">
                    ID da transação
                  </span>
                  <span className="text-md font-semibold break-all">
                    {payment.senderId}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <PaymentIcon currency={payment.currency} className="h-5 w-5" />
              <span className="text-lg font-bold">
                {formatPayment({
                  amount: payment.amount,
                  type: payment.currency,
                })}
              </span>
            </div>
          </div>
        ))}
      <PaginationComponent
        currentPage={controller.params.page}
        totalPages={payments.totalPages}
        total={payments.count}
        onPageChange={(page) => {
          setPaymentState((prevState) => ({
            ...prevState,
            controller: {
              ...prevState.controller,
              params: {
                ...prevState.controller.params,
                page: page,
              },
            },
          }));

          loadPayments({
            page: page,
          });

          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />
    </div>
  );
};

export const TransactionsHistoryPage = withLayout(
  TransactionsHistory,
  "LiveChat - Histórico de Transações"
);
