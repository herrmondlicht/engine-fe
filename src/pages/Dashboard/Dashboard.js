import React, { useMemo } from "react";
import useSWR from "swr";

import { LineInfo, PageTitle } from "components";
import { Card, ScreenLoader } from "ui-fragments";
import { useNotification } from "hooks";
import { APIRoutes, engineAPI, getMonthName, toBRL } from "utils";

const Dashboard = () => {
  const { showErrorNotification } = useNotification();

  const { data: reportsData, isValidating } = useSWR(
    APIRoutes.reports.url,
    engineAPI.reports.get,
    {
      onError: () =>
        showErrorNotification({
          id: "clientServiceFetchError",
          message: "Opa! Não deu pra carregar o relatório dos serviços",
        }),
    }
  );

  const orderedReportData = useMemo(
    () => reportsData?.data?.reverse() || [],
    [reportsData?.data]
  );

  return (
    <ScreenLoader isLoading={!reportsData?.data || isValidating}>
      <div className="flex gap-8 flex-wrap">
        {orderedReportData.map((report, index) => (
          <div
            key={index}
            style={{ minWidth: "300px" }}
            className="w-full sm:w-auto"
          >
            <Card className="min-w-fit">
              <PageTitle
                description={`${getMonthName(report?.month)} ${report?.year}`}
              />
              <div className="flex flex-col gap-3 justify-center mt-3 text-green-700">
                <LineInfo
                  title="Total M. Obra"
                  description={toBRL(report?.service_price)}
                />
                <LineInfo
                  title="Total de Peças"
                  description={toBRL(report?.service_items_price)}
                />
              </div>
            </Card>
          </div>
        ))}
      </div>
    </ScreenLoader>
  );
};

export default Dashboard;
