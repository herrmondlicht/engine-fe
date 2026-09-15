import React, { useState } from "react";

import { toBRL } from "utils";

const CHART_WIDTH = 640;
const CHART_HEIGHT = 240;
const PADDING = { top: 18, right: 16, bottom: 38, left: 16 };

const getPointCoordinates = (reports, valueKey, highestValue) =>
  reports.map((report, index) => {
    const usableWidth = CHART_WIDTH - PADDING.left - PADDING.right;
    const usableHeight = CHART_HEIGHT - PADDING.top - PADDING.bottom;
    const x =
      reports.length === 1
        ? CHART_WIDTH / 2
        : PADDING.left + (usableWidth * index) / (reports.length - 1);
    const value = Number(report[valueKey]) || 0;
    const y =
      PADDING.top +
      usableHeight -
      (value / Math.max(highestValue, 1)) * usableHeight;

    return { x, y, report };
  });

const FinancialChart = ({ reports, range, onRangeChange, getReportLabel }) => {
  const [activePointIndex, setActivePointIndex] = useState(null);
  const highestValue = Math.max(
    ...reports.flatMap(report => [
      Number(report.service_price) || 0,
      Number(report.service_items_price) || 0,
    ]),
    1
  );
  const servicePoints = getPointCoordinates(
    reports,
    "service_price",
    highestValue
  );
  const partsPoints = getPointCoordinates(
    reports,
    "service_items_price",
    highestValue
  );
  const toPolylinePoints = points =>
    points.map(({ x, y }) => `${x},${y}`).join(" ");
  const activePoint = servicePoints[activePointIndex];
  const rangeOptions = [
    { id: "ytd", label: "YTD" },
    { id: "lastSixMonths", label: "6 meses" },
    { id: "lastThreeMonths", label: "3 meses" },
  ];
  const setClosestPoint = (clientX, element) => {
    const { left, width } = element.getBoundingClientRect();
    if (!width) {
      return;
    }

    const chartX = ((clientX - left) / width) * CHART_WIDTH;
    const closestPointIndex = servicePoints.reduce(
      (closestIndex, point, index) =>
        Math.abs(point.x - chartX) <
        Math.abs(servicePoints[closestIndex].x - chartX)
          ? index
          : closestIndex,
      0
    );
    setActivePointIndex(closestPointIndex);
  };
  const handlePointKeyDown = (event, index) => {
    if (["Enter", " "].includes(event.key)) {
      event.preventDefault();
      setActivePointIndex(index);
    }
  };

  return (
    <section aria-labelledby="financial-chart-title">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
            Financeiro
          </p>
          <h2
            id="financial-chart-title"
            className="mt-1 text-xl font-semibold text-gray-800"
          >
            Evolução do faturamento
          </h2>
        </div>
        <div className="flex flex-wrap gap-2" aria-label="Período do gráfico">
          {rangeOptions.map(option => {
            const isSelected = range === option.id;
            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => onRangeChange(option.id)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-2 ${
                  isSelected
                    ? "bg-primary-0 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-gray-600">
          <span className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-primary-0" />
            Mão de obra
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-secondary-0" />
            Peças
          </span>
        </div>

        <div className="relative">
          <svg
            role="group"
            aria-label={`Evolução financeira: ${
              rangeOptions.find(option => option.id === range)?.label
            }`}
            viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
            className="h-56 w-full overflow-visible"
            onMouseMove={event =>
              setClosestPoint(event.clientX, event.currentTarget)
            }
            onMouseLeave={() => setActivePointIndex(null)}
            onTouchStart={event => {
              const touch = event.touches[0];
              if (touch) {
                setClosestPoint(touch.clientX, event.currentTarget);
              }
            }}
          >
            <rect
              x={PADDING.left}
              y={PADDING.top}
              width={CHART_WIDTH - PADDING.left - PADDING.right}
              height={CHART_HEIGHT - PADDING.top - PADDING.bottom}
              fill="transparent"
            />
            {[0.25, 0.5, 0.75, 1].map(level => {
              const y =
                PADDING.top +
                (CHART_HEIGHT - PADDING.top - PADDING.bottom) * level;
              return (
                <line
                  key={level}
                  x1={PADDING.left}
                  x2={CHART_WIDTH - PADDING.right}
                  y1={y}
                  y2={y}
                  stroke="#E5E7EB"
                  strokeDasharray="4 5"
                />
              );
            })}
            {reports.length > 1 && (
              <>
                <polyline
                  fill="none"
                  points={toPolylinePoints(partsPoints)}
                  stroke="#1CC8EE"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                />
                <polyline
                  fill="none"
                  points={toPolylinePoints(servicePoints)}
                  stroke="#5F2EEA"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                />
              </>
            )}
            {servicePoints.map(({ x, y, report }, index) => (
              <g key={`service-${report.month}-${report.year}`}>
                <circle
                  cx={x}
                  cy={y}
                  r="5"
                  fill="#5F2EEA"
                  role="button"
                  tabIndex="0"
                  aria-label={`Ver dados de ${getReportLabel(report)}`}
                  onMouseEnter={() => setActivePointIndex(index)}
                  onFocus={() => setActivePointIndex(index)}
                  onTouchStart={() => setActivePointIndex(index)}
                  onClick={() => setActivePointIndex(index)}
                  onKeyDown={event => handlePointKeyDown(event, index)}
                />
                <title>{`${getReportLabel(report)}: mão de obra ${toBRL(
                  report.service_price
                )}`}</title>
              </g>
            ))}
            {partsPoints.map(({ x, y, report }, index) => (
              <g key={`parts-${report.month}-${report.year}`}>
                <circle
                  cx={x}
                  cy={y}
                  r="5"
                  fill="#1CC8EE"
                  onMouseEnter={() => setActivePointIndex(index)}
                  onTouchStart={() => setActivePointIndex(index)}
                  onClick={() => setActivePointIndex(index)}
                />
                <title>{`${getReportLabel(report)}: peças ${toBRL(
                  report.service_items_price
                )}`}</title>
              </g>
            ))}
            {servicePoints.map(({ x, report }) => (
              <text
                key={`label-${report.month}-${report.year}`}
                x={x}
                y={CHART_HEIGHT - 12}
                textAnchor="middle"
                fill="#6B7280"
                fontSize="11"
              >
                {getReportLabel(report)}
              </text>
            ))}
          </svg>
          {activePoint && (
            <div
              data-testid="financial-chart-tooltip"
              role="status"
              className="pointer-events-none absolute z-10 w-44 rounded-xl bg-gray-800 px-3 py-2 text-xs text-white shadow-lg transform -translate-x-1/2 -translate-y-full"
              style={{
                left: `${Math.min(
                  Math.max((activePoint.x / CHART_WIDTH) * 100, 18),
                  82
                )}%`,
                top: `${Math.max((activePoint.y / CHART_HEIGHT) * 100, 28)}%`,
              }}
            >
              <p className="font-semibold">
                {getReportLabel(activePoint.report)}
              </p>
              <p className="mt-1 text-gray-200">
                Mão de obra: {toBRL(activePoint.report.service_price)}
              </p>
              <p className="text-gray-200">
                Peças: {toBRL(activePoint.report.service_items_price)}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FinancialChart;
