import React from "react";

import { toBRL } from "utils";

const SeasonalityList = ({ title, reports, tone, getReportLabel }) => (
  <div>
    <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
    <ol className="mt-3 space-y-3">
      {reports.map(report => (
        <li
          key={report.month}
          className="flex items-center justify-between gap-3"
        >
          <div>
            <p className="text-sm font-medium text-gray-800">
              {getReportLabel(report)}
            </p>
            <p className="text-xs text-gray-500">
              {toBRL(report.service_price)}
            </p>
          </div>
          <span className={`text-sm font-semibold ${tone}`}>
            {report.change > 0 ? "+" : ""}
            {toBRL(report.change)}
          </span>
        </li>
      ))}
    </ol>
  </div>
);

const Seasonality = ({ analysis, getReportLabel }) => {
  if (!analysis) {
    return null;
  }

  const { currentYear, previousYear, bestMonths, worstMonths } = analysis;

  return (
    <section aria-labelledby="seasonality-title">
      <p className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
        Sazonalidade
      </p>
      <h2
        id="seasonality-title"
        className="mt-1 text-xl font-semibold text-gray-800"
      >
        Meses que mais variaram
      </h2>
      <p className="mt-2 text-sm text-gray-500">
        Mão de obra em {currentYear} comparada a {previousYear}.
      </p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-1">
        {bestMonths.length > 0 && (
          <SeasonalityList
            title="3 melhores meses"
            reports={bestMonths}
            tone="text-success-0"
            getReportLabel={getReportLabel}
          />
        )}
        {worstMonths.length > 0 && (
          <SeasonalityList
            title="3 meses com queda"
            reports={worstMonths}
            tone="text-error-0"
            getReportLabel={getReportLabel}
          />
        )}
      </div>
    </section>
  );
};

export default Seasonality;
