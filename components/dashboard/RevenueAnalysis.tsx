"use client";

import { Card, Title, BarChart, DonutChart, Text, Flex, Badge } from "@tremor/react";

const chartData = [
    { date: "Jan", "Actual Revenue": 2500, "Limit": 6750 },
    { date: "Feb", "Actual Revenue": 3100, "Limit": 6750 },
    { date: "Mar", "Actual Revenue": 4200, "Limit": 6750 },
    { date: "Apr", "Actual Revenue": 4800, "Limit": 6750 },
    { date: "May", "Actual Revenue": 5100, "Limit": 6750 },
    { date: "Jun", "Actual Revenue": 5900, "Limit": 6750 },
    { date: "Jul", "Actual Revenue": 5300, "Limit": 6750 },
    { date: "Aug", "Actual Revenue": 6500, "Limit": 6750 },
    { date: "Sep", "Actual Revenue": 7200, "Limit": 6750 },
    { date: "Oct", "Actual Revenue": 7133, "Limit": 6750 },
    { date: "Nov", "Actual Revenue": 2354, "Limit": 6750 },
    { date: "Dec", "Actual Revenue": 12, "Limit": 6750 },
];

const categoryData = [
    { name: "Consulting", value: 40824 },
    { name: "Digital Products", value: 11664 },
    { name: "Workshops", value: 5832 },
];

export function RevenueAnalysis() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            <Card className="lg:col-span-2 bg-[#111527] border-gray-800">
                <Flex alignItems="center" justifyContent="between">
                    <div>
                        <Title className="text-white">Monthly Billing vs. MEI Limit</Title>
                        <Text className="text-gray-400">Track your pro-rated annual progress</Text>
                    </div>
                    <Badge color="red" className="bg-red-500/10 text-red-500 border-red-500/20">Critical Threshold</Badge>
                </Flex>
                <BarChart
                    className="mt-6 h-80"
                    data={chartData}
                    index="date"
                    categories={["Actual Revenue"]}
                    colors={["blue"]}
                    showLegend={false}
                    valueFormatter={(number) => `R$ ${Intl.NumberFormat("pt-BR").format(number).toString()}`}
                    yAxisWidth={60}
                    showGridLines={false}
                />
            </Card>

            <Card className="bg-[#111827] border-gray-800">
                <Title className="text-white text-center">Revenue by Category</Title>
                <Text className="text-gray-400 text-center">Service types breakdown</Text>
                <DonutChart
                    className="mt-6 h-60"
                    data={categoryData}
                    category="value"
                    index="name"
                    colors={["blue", "emerald", "violet"]}
                    valueFormatter={(number) => `R$ ${Intl.NumberFormat("pt-BR").format(number).toString()}`}
                    showAnimation={true}
                />
                <div className="mt-6 space-y-2">
                    {categoryData.map((item, idx) => (
                        <div key={item.name} className="flex justify-between items-center text-sm">
                            <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${idx === 0 ? 'bg-blue-500' : idx === 1 ? 'bg-emerald-500' : 'bg-violet-500'}`}></div>
                                <span className="text-gray-400">{item.name}</span>
                            </div>
                            <span className="text-white font-medium">R$ {Intl.NumberFormat("pt-BR").format(item.value)}</span>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}
