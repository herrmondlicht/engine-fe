import React, { useMemo, useState } from "react";
import useSWR from "swr";

import { LineInfo, PageTitle } from "components";
import { Card, ScreenLoader } from "ui-fragments";
import { useNotification } from "hooks";
import { APIRoutes, engineAPI, getMonthName, toBRL } from "utils";

import FinancialChart from "./FinancialChart";
import Seasonality from "./Seasonality";

const sortReportsByDate = reports =>
  [...reports].sort(
    (firstReport, secondReport) =>
      Number(firstReport.year) - Number(secondReport.year) ||
      Number(firstReport.month) - Number(secondReport.month)
  );

const getSeasonalityAnalysis = reports => {
  const years = [...new Set(reports.map(report => Number(report.year)))].sort(
    (firstYear, secondYear) => secondYear - firstYear
  );

  if (years.length < 2) {
    return null;
  }

  const [currentYear, previousYear] = years;
  const previousYearReports = new Map(
    reports
      .filter(report => Number(report.year) === previousYear)
      .map(report => [Number(report.month), report])
  );
  const comparisons = reports
    .filter(report => Number(report.year) === currentYear)
    .map(report => {
      const previousReport = previousYearReports.get(Number(report.month));
      if (!previousReport) {
        return null;
      }

      return {
        ...report,
        change:
          (Number(report.service_price) || 0) -
          (Number(previousReport.service_price) || 0),
      };
    })
    .filter(Boolean);

  if (comparisons.length === 0) {
    return null;
  }

  return {
    currentYear,
    previousYear,
    bestMonths: comparisons
      .filter(report => report.change > 0)
      .sort(
        (firstReport, secondReport) => secondReport.change - firstReport.change
      )
      .slice(0, 3),
    worstMonths: comparisons
      .filter(report => report.change < 0)
      .sort(
        (firstReport, secondReport) => firstReport.change - secondReport.change
      )
      .slice(0, 3),
  };
};

const Dashboard = () => {
  const { showErrorNotification } = useNotification();
  const [selectedRange, setSelectedRange] = useState("ytd");

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

  const reportData = useMemo(
    () => (reportsData?.data ? sortReportsByDate(reportsData.data) : []),
    [reportsData]
  );
  const orderedReportData = useMemo(
    () => [...reportData].reverse(),
    [reportData]
  );
  const chartData = useMemo(() => {
    if (reportData.length === 0) {
      return [];
    }

    const mostRecentReport = reportData[reportData.length - 1];
    if (selectedRange === "lastThreeMonths") {
      return reportData.slice(-3);
    }
    if (selectedRange === "lastSixMonths") {
      return reportData.slice(-6);
    }
    return reportData.filter(
      report => Number(report.year) === Number(mostRecentReport.year)
    );
  }, [reportData, selectedRange]);
  const seasonalityAnalysis = useMemo(
    () => getSeasonalityAnalysis(reportData),
    [reportData]
  );
  const getReportLabel = report =>
    `${getMonthName(report.month).slice(0, 3)} ${report.year}`;

  if (!reportsData?.data || isValidating) {
    return <ScreenLoader isLoading={true} />;
  }

  return (
    <div>
      <div className="mb-8 grid grid-cols-1 gap-8 xl:grid-cols-5">
        <Card
          className={seasonalityAnalysis ? "xl:col-span-3" : "xl:col-span-5"}
        >
          <FinancialChart
            reports={chartData}
            range={selectedRange}
            onRangeChange={setSelectedRange}
            getReportLabel={getReportLabel}
          />
        </Card>
        {seasonalityAnalysis && (
          <Card className="xl:col-span-2">
            <Seasonality
              analysis={seasonalityAnalysis}
              getReportLabel={getReportLabel}
            />
          </Card>
        )}
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {orderedReportData.map(report => (
          <Card key={`${report.year}-${report.month}`} className="min-w-fit">
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
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
