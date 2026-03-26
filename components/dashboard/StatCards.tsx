"use client";

import { Card, Text, Metric, Flex, BadgeDelta, ProgressBar } from "@tremor/react";
import { TrendingUp, Clock, Wallet, LucideIcon } from "lucide-react";
import { Sparkline } from "@/components/ui/Sparkline";

export interface StatItem {
  title: string;
  metric: string;
  delta?: string;
  deltaType?: "moderateIncrease" | "moderateDecrease" | "increase" | "decrease" | "unchanged";
  subtext?: string;
  progressValue?: number;
  icon?: LucideIcon;
  color: string;
  /** Tooltip com explicação */
  tooltip?: string;
  /** Dados para sparkline (tendência) */
  sparklineData?: number[];
}

const defaultStats: StatItem[] = [
  { title: "Total Revenue (YTD)", metric: "R$ 58.320,00", delta: "+12.5%", deltaType: "moderateIncrease", icon: TrendingUp, color: "blue" },
  { title: "Monthly Growth", metric: "R$ 6.450,00", delta: "+4.2%", deltaType: "moderateIncrease", icon: TrendingUp, color: "emerald" },
  { title: "Remaining Limit", metric: "R$ 22.680,00", subtext: "28% available", progressValue: 72, icon: Clock, color: "amber" },
  { title: "Total Expenses", metric: "R$ 12.410,00", delta: "-2.1%", deltaType: "moderateDecrease", icon: Wallet, color: "rose" },
];

const COLOR_MAP: Record<string, string> = {
  blue: "#3b82f6",
  emerald: "#10b981",
  rose: "#f43f5e",
  amber: "#f59e0b",
  violet: "#8b5cf6",
};

interface StatCardsProps {
  stats?: StatItem[];
}

export function StatCards({ stats = defaultStats }: StatCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
      {stats.map((item) => (
        <Card
          key={item.title}
          decoration="top"
          decorationColor={item.color as "blue" | "emerald" | "rose" | "amber" | "violet"}
          className="bg-[#111827] border-gray-800 group"
          title={item.tooltip}
        >
          <Flex alignItems="start">
            <Text className="text-gray-400 font-medium">{item.title}</Text>
            {item.delta && (
              <BadgeDelta deltaType={item.deltaType as "increase" | "decrease" | "unchanged" | "moderateIncrease" | "moderateDecrease"}>
                {item.delta}
              </BadgeDelta>
            )}
          </Flex>
          <Flex className="mt-2" justifyContent="start" alignItems="baseline">
            <Metric className="text-white font-bold">{item.metric}</Metric>
          </Flex>
          {item.sparklineData && item.sparklineData.length >= 2 && (
            <div className="mt-3" title="Tendência dos últimos meses">
              <Sparkline data={item.sparklineData} color={COLOR_MAP[item.color] ?? "#3b82f6"} />
            </div>
          )}
          {item.subtext && (
            <div className="mt-2">
              <Text className="text-xs text-gray-500 mb-1">{item.subtext}</Text>
              {item.progressValue !== undefined && (
                <ProgressBar value={item.progressValue} color={item.color as "amber" | "emerald" | "blue"} className="h-1" />
              )}
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}
