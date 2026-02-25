"use client";

import { Card, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Text, Badge, Title, Flex } from "@tremor/react";
import { MoreHorizontal } from "lucide-react";

const transactions = [
    {
        id: "#TXN-9842",
        client: "TechNova Solutions",
        service: "Cloud Consulting",
        date: "Oct 12, 2023",
        amount: "R$ 2.400,00",
        status: "Paid",
        statusColor: "emerald",
    },
    {
        id: "#TXN-8921",
        client: "Creative Agency Inc",
        service: "Web Development",
        date: "Oct 10, 2023",
        amount: "R$ 3.150,00",
        status: "Pending",
        statusColor: "amber",
    },
    {
        id: "#TXN-7654",
        client: "Global Logistics",
        service: "App Maintenance",
        date: "Oct 08, 2023",
        amount: "R$ 1.200,00",
        status: "Paid",
        statusColor: "emerald",
    },
];

export function TransactionsTable() {
    return (
        <Card className="mt-8 bg-[#111827] border-gray-800">
            <Flex alignItems="center" justifyContent="between" className="mb-4">
                <Title className="text-white">Recent Transactions</Title>
                <button className="text-blue-500 text-sm font-medium hover:underline flex items-center gap-1">
                    View All →
                </button>
            </Flex>
            <Table className="mt-5">
                <TableHead>
                    <TableRow className="border-gray-800">
                        <TableHeaderCell className="text-gray-400 font-medium">TRANSACTION ID</TableHeaderCell>
                        <TableHeaderCell className="text-gray-400 font-medium">CLIENT / SERVICE</TableHeaderCell>
                        <TableHeaderCell className="text-gray-400 font-medium">DATE</TableHeaderCell>
                        <TableHeaderCell className="text-gray-400 font-medium text-right">AMOUNT</TableHeaderCell>
                        <TableHeaderCell className="text-gray-400 font-medium">STATUS</TableHeaderCell>
                        <TableHeaderCell className="text-gray-400 font-medium">ACTIONS</TableHeaderCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactions.map((item) => (
                        <TableRow key={item.id} className="border-gray-800 hover:bg-white/5 transition-colors">
                            <TableCell className="text-gray-400 text-sm">{item.id}</TableCell>
                            <TableCell>
                                <div className="flex flex-col">
                                    <Text className="text-white font-medium">{item.client}</Text>
                                    <Text className="text-gray-500 text-xs">{item.service}</Text>
                                </div>
                            </TableCell>
                            <TableCell className="text-gray-400 text-sm">{item.date}</TableCell>
                            <TableCell className="text-right">
                                <Text className="text-white font-medium">{item.amount}</Text>
                            </TableCell>
                            <TableCell>
                                <Badge color={item.statusColor as any} className={`${item.statusColor === 'emerald' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'}`}>
                                    {item.status}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <button className="text-gray-500 hover:text-white transition-colors">
                                    <MoreHorizontal size={18} />
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    );
}
