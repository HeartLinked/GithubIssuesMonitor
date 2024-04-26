"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

// const data = [
//     {
//         name: "Jan",
//         total: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//         name: "Feb",
//         total: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//         name: "Mar",
//         total: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//         name: "Apr",
//         total: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//         name: "May",
//         total: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//         name: "Jun",
//         total: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//         name: "Jul",
//         total: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//         name: "Aug",
//         total: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//         name: "Sep",
//         total: Math.floor(Math.random() * 5000) + 1000,
//     },
//     {
//         name: "Oct",
//         total: Math.floor(Math.random() * 5000) + 1000,
//     },
//     // {
//     //     name: "Nov",
//     //     total: Math.floor(Math.random() * 5000) + 1000,
//     // },
//     // {
//     //     name: "Dec",
//     //     total: Math.floor(Math.random() * 5000) + 1000,
//     // },
// ]

export default function Overview() {

    const data = [];

// 获取今天的日期
    const today = new Date();

    for (let i = 10; i > 0; i--) {
        // 创建一个新的日期对象，表示从今天起向前的第 i 天
        const date = new Date(today);
        date.setDate(today.getDate() - i);

        // 格式化日期为月份和日期的组合，例如 "4.16"
        const dateString = `${date.getMonth() + 1}.${date.getDate()}`;

        // 生成随机的 total 值
        const total = Math.floor(Math.random() * 5000) + 1000;

        // 将生成的对象添加到数据数组中
        data.push({
            name: dateString,
            total: total
        });
    }


    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
                <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                />
                <Bar
                    dataKey="total"
                    fill="currentColor"
                    radius={[4, 4, 0, 0]}
                    className="fill-primary"
                />
            </BarChart>
        </ResponsiveContainer>
    )
}