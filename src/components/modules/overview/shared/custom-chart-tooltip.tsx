"use client";
interface TooltipPayloadItem {
  name?: string;
  value?: number | string;
  color?: string;
  fill?: string;
  dataKey?: string;
  unit?: string;
  payload?: Record<string, unknown>;
}

interface CustomChartTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadItem[];
  label?: string;
  valueFormatter?: (value: number | string, item?: TooltipPayloadItem) => string;
}

export function CustomChartTooltip({
  active,
  payload,
  label,
  valueFormatter,
}: CustomChartTooltipProps) {
  if (!active || !payload || payload.length === 0) {
    return null;
  }

  return (
    <div className="rounded-xl border border-border/60 bg-background/95 p-3 shadow-xl backdrop-blur-md transition-all">
      {label && (
        <p className="mb-2 text-xs font-semibold tracking-wide text-foreground">
          {label}
        </p>
      )}
      <div className="space-y-1.5">
        {payload.map((item, index) => {
          const color = item.color || item.fill || "#6366f1";
          const formattedVal = valueFormatter
            ? valueFormatter(item.value ?? 0, item)
            : `${item.value ?? 0}${item.unit ? ` ${item.unit}` : ""}`;

          return (
            <div
              key={`item-${index}-${item.name || item.dataKey}`}
              className="flex items-center justify-between gap-4 text-xs"
            >
              <div className="flex items-center gap-1.5">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full shadow-sm"
                  style={{ backgroundColor: color }}
                />
                <span className="text-muted-foreground">
                  {item.name || item.dataKey}:
                </span>
              </div>
              <span className="font-semibold text-foreground">
                {formattedVal}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CustomChartTooltip;
