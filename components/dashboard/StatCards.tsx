"use client";

import { Card, Text, Metric, Flex, BadgeDelta, ProgressBar } from "@tremor/react";
import { TrendingUp, TrendingDown, Clock, Wallet } from "lucide-react";

const stats = [
    {
        title: "Total Revenue (YTD)",
        metric: "R$ 58.320,00",
        delta: "+12.5%",
        deltaType: "moderateIncrease",
        icon: TrendingUp,
        color: "blue",
    },
    {
        title: "Monthly Growth",
        metric: "R$ 6.450,00",
        delta: "+4.2%",
        deltaType: "moderateIncrease",
        icon: TrendingUp,
        color: "emerald",
    },
    {
        title: "Remaining Limit",
        metric: "R$ 22.680,00",
        subtext: "28% available",
        icon: Clock,
        color: "amber",
    },
    {
        title: "Total Expenses",
        metric: "R$ 12.410,00",
        delta: "-2.1%",
        deltaType: "moderateDecrease",
        icon: Wallet,
        color: "rose",
    },
];

export function StatCards() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {stats.map((item) => (
                <Card key={item.title} decoration="top" decorationColor={item.color as any} className="bg-[#111827] border-gray-800">
                    <Flex alignItems="start">
                        <Text className="text-gray-400 font-medium">{item.title}</Text>
                        {item.delta && (
                            <BadgeDelta deltaType={item.deltaType as any}>
                                {item.delta}
                            </BadgeDelta>
                        )}
                    </Flex>
                    <Flex className="mt-2" justifyContent="start" alignItems="baseline">
                        <Metric className="text-white font-bold">{item.metric}</Metric>
                    </Flex>
                    {item.subtext && (
                        <div className="mt-2">
                            <Text className="text-xs text-gray-500 mb-1">{item.subtext}</Text>
                            <ProgressBar value={72} color="amber" className="h-1" />
                        </div>
                    )}
                </Card>
            ))}
        </div>
    );
}
