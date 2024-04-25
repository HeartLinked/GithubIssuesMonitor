/**
 * v0 by Vercel.
 * @see https://v0.dev/t/WawDos5QSZ6
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import React, { useState, useEffect } from 'react';
import { Pagination } from 'antd';

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"
import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import {Badge} from "@/components/ui/badge";


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

    const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>([]);

    // 假设你的 vulnerabilities 状态已经在这里了
    const [filter, setFilter] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);

    // 筛选逻辑
    const filteredVulnerabilities = vulnerabilities.filter(vulnerability => {
        if (filter === 'important') return vulnerability.severity === 'important';
        if (filter === 'moderate') return vulnerability.severity === 'moderate'; // 假设"moderate" 表示"medium"等级
        if (filter === 'low') return vulnerability.severity === 'low';
        if (filter === 'unknown') return !vulnerability.severity || vulnerability.severity === 'unknown';
        return true; // 如果没有筛选条件或筛选条件为"all"，则返回所有项目
    });

    // ...
    const displayNum = 12;
    const pageVulnerabilities = filteredVulnerabilities.slice((currentPage - 1) * displayNum, currentPage * displayNum);

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
    return (
    <>
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
            <CardContent>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>CVE</TableHead>
                            <TableHead>Severity</TableHead>
                            <TableHead>CWE</TableHead>
                            <TableHead>Cvss3 Score</TableHead>
                            <TableHead>Public Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {pageVulnerabilities.map((vulnerability, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        {getIcon(vulnerability.severity)}
                                        <Link className="font-medium" href={vulnerability.resource_url}>
                                            {vulnerability.CVE}
                                        </Link>
                                    </div>
                                </TableCell>

                                <TableCell>
                                    <Badge variant={
                                        vulnerability.severity === 'important' ? 'destructive' :
                                            vulnerability.severity === 'moderate' ? 'secondary' :
                                                vulnerability.severity === 'low' ? 'default' :
                                                    'default'}>
                                        <span>{(vulnerability.severity?.charAt(0).toUpperCase() + vulnerability.severity?.slice(1)) || 'Unknown'} </span>
                                    </Badge>
                                </TableCell>

                                <TableCell>
                                    <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                                        <span>{vulnerability.CWE || 'Unknown'} </span>
                                    </div>
                                </TableCell>

                                <TableCell>
                                    <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                                        <span>{vulnerability.cvss3_score || 'Unknown'} </span>
                                    </div>
                                </TableCell>

                                <TableCell>{
                                    new Date(vulnerability.public_date).toLocaleDateString()}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>


                {/*{pageVulnerabilities.map((vulnerability) => (*/}
                {/*    <div className="flex items-center justify-between" key={vulnerability.CVE}>*/}
                {/*        <div className="flex items-center gap-2">*/}
                {/*            /!* 你可以根据 severity 动态改变图标和样式 *!/*/}
                {/*            {getIcon(vulnerability.severity)}*/}
                {/*            <Link className="font-medium" href={vulnerability.resource_url}>*/}
                {/*                {vulnerability.CVE}*/}
                {/*            </Link>*/}
                {/*        </div>*/}
                {/*        <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">*/}
                {/*            <span>{(vulnerability.severity?.charAt(0).toUpperCase() + vulnerability.severity?.slice(1)) || 'Unknown'} Severity</span>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*))}*/}
            </CardContent>
        </Card>
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
            <Pagination
                total={filteredVulnerabilities.length}
                showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                pageSize={displayNum}
                current={currentPage}
                onChange={setCurrentPage}
            />
        </div>
    </>


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


