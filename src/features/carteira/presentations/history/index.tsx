/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@/components/ui/button";

import { withLayout } from "@/HOC/withLayout";
import { format, formatDate } from "date-fns";
import { Hash, Search } from "lucide-react";
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
import { authState } from "@/features/auth/states/atoms";
import { SelectUserCombobox } from "@/components/select-user-combobox";
import { DoubleArrowDownIcon, DoubleArrowUpIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { HistoryTotalsItem } from "./components/history-totals-item";

const TransactionsHistory = () => {
  const { user } = useRecoilValue(authState);
  const setPaymentState = useSetRecoilState(paymentState);
  const { payments, controller } = useRecoilValue(paymentState);
  const [date, setDate] = useState<DateRange | undefined>({
    to: controller.params.startDate
      ? new Date(controller.params.startDate)
      : undefined,
    from: controller.params.endDate
      ? new Date(controller.params.endDate)
      : undefined,
  });

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

  const clearUserId = () => {
    setPaymentState((prevState) => ({
      ...prevState,
      controller: {
        ...prevState.controller,
        params: {
          ...prevState.controller.params,
          userId: null,
        },
      },
    }));
  };

  const isAdmin = user.id === 3;

  return (
    <div>
      <div className="flex justify-between items-center flex-wrap bg-card-custom p-4">
        <div className="flex items-center flex-1 flex-wrap gap-2">
          <DateFilter
            date={date}
            onDateSelect={handleSetDate}
            onClear={clearDate}
          />
          {isAdmin && (
            <SelectUserCombobox
              userSelected={controller.params.userId}
              onClear={clearUserId}
              onUserSelect={async (user) => {
                await setPaymentState((prevState) => ({
                  ...prevState,
                  controller: {
                    ...prevState.controller,
                    params: {
                      ...prevState.controller.params,
                      userId: user,
                    },
                  },
                }));
              }}
            />
          )}
        </div>
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
      {isAdmin && (
        <div className="flex  mt-2 ">
          <HistoryTotalsItem data={payments.includes} />
        </div>
      )}

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
            className="border p-4 mt-10 bg-card-custom flex flex-wrap items-start md:items-center justify-between gap-4 lg:gap-10 flex-col md:flex-row"
            key={payment.id}
          >
            <div className="flex items-start md:items-center gap-4 lg:gap-10 flex-1 flex-col md:flex-row">
              {payment.transactionType === "payment" ? (
                <div className="p-1 w-6 h-6 rounded border flex items-center justify-center bg-green-400/20 border-green-700 text-green-700">
                  <DoubleArrowDownIcon className="h-4 w-4" />
                </div>
              ) : (
                <div className="p-1 w-6 h-6 rounded border flex items-center justify-center bg-red-400/20 border-red-700 text-red-700">
                  <DoubleArrowUpIcon className="h-4 w-4" />
                </div>
              )}
              <div className="flex flex-col">
                {isAdmin && (
                  <span className="font-bold">{payment.receiverName}</span>
                )}
                <span className="text-md">
                  {formatDate(payment.createdAt, "dd/MM/yyyy")}
                </span>
              </div>
              {/* ID da transação */}
              <div className="flex items-center gap-2">
                <Hash className="h-4 w-4" />
                <div className="flex flex-col">
                  <span className="text-md text-muted-foreground">
                    ID da transação
                  </span>
                  <span className="text-md font-semibold break-all">
                    {payment.id}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <PaymentIcon currency={payment.currency} className="h-5 w-5" />
              <div>
                {payment.transactionType === "payment" ? (
                  ""
                ) : (
                  <span className="text-lg font-bold text-red-700 dark:text-red-400 mr-1">
                    -
                  </span>
                )}
                <span
                  className={cn(
                    "text-lg font-bold",
                    payment.transactionType === "payment"
                      ? "text-green-700 dark:text-green-400"
                      : "text-red-700 dark:text-red-400"
                  )}
                >
                  {formatPayment({
                    amount: payment.amount,
                    type: payment.currency,
                  })}
                </span>
              </div>
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
  "LiveTip - Histórico de Transações"
);
