/**
 * v0 by Vercel.
 * @see https://v0.dev/t/WawDos5QSZ6
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import React, { useState, useEffect } from 'react';



import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { ResponsiveBar } from "@nivo/bar"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface Vulnerability {
    CVE: string;
    severity: string;
    public_date: string;
    advisories: any[];
    bugzilla: string;
    bugzilla_description: string;
    cvss_score: number | null;
    cvss_scoring_vector: string | null;
    CWE: string | null;
    affected_packages: any[];
    package_state: any | null;
    resource_url: string;
    cvss3_scoring_vector: string | null;
    cvss3_score: string | null;
}


export default function CVE() {

    const [displayNum, setDisplayNum] = useState(6); // 新增，设定初始显示仓库数量
    const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>([]);

    // 假设你的 vulnerabilities 状态已经在这里了
    const [filter, setFilter] = useState('all');

    // 筛选逻辑
    const filteredVulnerabilities = vulnerabilities.filter(vulnerability => {
        if (filter === 'high') return vulnerability.severity === 'important';
        if (filter === 'medium') return vulnerability.severity === 'moderate'; // 假设"moderate" 表示"medium"等级
        if (filter === 'low') return vulnerability.severity === 'low';
        if (filter === 'unknown') return !vulnerability.severity || vulnerability.severity === 'unknown';
        return true; // 如果没有筛选条件或筛选条件为"all"，则返回所有项目
    });

    useEffect(() => {
        fetch('https://access.redhat.com/labs/securitydataapi/cve.json?after=2024-04-15')
            .then(response => response.json())
            .then(data => {
                setVulnerabilities(data); // 更新状态以存储获取到的 CVE 数据
            })
            .catch(error => console.error('Fetching errors:', error));
    }, []); // 空依赖数组表示这个效果只运行一次，当组件首次挂载时

    const getIcon = (severity: String) => {
        switch (severity) {
            case "low":
                return <AlertCircleIcon className="w-5 h-5 text-blue-500" />;
            case "moderate":
                return <AlertCircleIcon className="w-5 h-5 text-yellow-500" />;
            case "important":
                return <AlertCircleIcon className="w-5 h-5 text-red-500" />;
            default:
                return <InfoIcon className="w-5 h-5 text-gray-500" />;
        }
    };

    // //新增，监听滚轮事件
    // useEffect(() => {
    //   const handleScroll = () => {
    //     if(window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight){
    //       setDisplayNum(prevNum => prevNum + 6); //当滚动到底部时，显示更多的仓库信息
    //     }
    //   };
    //   window.addEventListener('scroll', handleScroll);
    //   return () => window.removeEventListener('scroll', handleScroll); // 取消滚动监听
    // },[]);

    return (

        <Card>
            <CardHeader className="flex items-center justify-between">
                <CardTitle>Security Vulnerabilities</CardTitle>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="outline">
                            <FilterIcon className="w-4 h-4 mr-2" />
                            Filter
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setFilter('high')}>
                            <AlertCircleIcon className="w-5 h-5 text-red-500" /> High Severity
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setFilter('medium')}>
                            <AlertCircleIcon className="w-5 h-5 text-yellow-500" /> Medium Severity
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setFilter('low')}>
                            <AlertCircleIcon className="w-5 h-5 text-blue-500" /> Low Severity
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setFilter('unknown')}>
                            <AlertCircleIcon className="w-5 h-5 text-gray-500" /> Unknown Severity
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>
            <CardContent className="grid gap-4">
                {filteredVulnerabilities.map((vulnerability) => (
                    <div className="flex items-center justify-between" key={vulnerability.CVE}>
                        <div className="flex items-center gap-2">
                            {/* 你可以根据 severity 动态改变图标和样式 */}
                            {getIcon(vulnerability.severity)}
                            <Link className="font-medium" href={vulnerability.resource_url}>
                                {vulnerability.CVE}
                            </Link>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                            <span>{(vulnerability.severity?.charAt(0).toUpperCase() + vulnerability.severity?.slice(1)) || 'Unknown'} Severity</span>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>

    )
}

function AlertCircleIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" x2="12" y1="8" y2="12" />
            <line x1="12" x2="12.01" y1="16" y2="16" />
        </svg>
    )
}


function AlertTriangleIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
            <path d="M12 9v4" />
            <path d="M12 17h.01" />
        </svg>
    )
}


function BarChart(props: React.ComponentProps<"div">) {
    return (
        <div {...props}>
            <ResponsiveBar
                data={[
                    { name: "Jan", count: 111 },
                    { name: "Feb", count: 157 },
                    { name: "Mar", count: 129 },
                    { name: "Apr", count: 150 },
                    { name: "May", count: 119 },
                    { name: "Jun", count: 72 },
                ]}
                keys={["count"]}
                indexBy="name"
                margin={{ top: 0, right: 0, bottom: 40, left: 40 }}
                padding={0.3}
                colors={["#2563eb"]}
                axisBottom={{
                    tickSize: 0,
                    tickPadding: 16,
                }}
                axisLeft={{
                    tickSize: 0,
                    tickValues: 4,
                    tickPadding: 16,
                }}
                gridYValues={4}
                theme={{
                    tooltip: {
                        chip: {
                            borderRadius: "9999px",
                        },
                        container: {
                            fontSize: "12px",
                            textTransform: "capitalize",
                            borderRadius: "6px",
                        },
                    },
                    grid: {
                        line: {
                            stroke: "#f3f4f6",
                        },
                    },
                }}
                tooltipLabel={({ id }) => `${id}`}
                enableLabel={false}
                role="application"
                ariaLabel="A bar chart showing data"
            />
        </div>
    )
}


function FilterIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
        </svg>
    )
}


function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
            <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
    )
}


function InfoIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
        </svg>
    )
}


function LayoutDashboardIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="7" height="9" x="3" y="3" rx="1" />
            <rect width="7" height="5" x="14" y="3" rx="1" />
            <rect width="7" height="9" x="14" y="12" rx="1" />
            <rect width="7" height="5" x="3" y="16" rx="1" />
        </svg>
    )
}


function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
        </svg>
    )
}
