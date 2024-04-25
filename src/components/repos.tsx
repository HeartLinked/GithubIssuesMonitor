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
import {Pagination} from "antd";

interface githubRepos {
    name: string;
    url: string;
}

export default function Component() {

    const [githubRepos, setProjects] = useState<githubRepos[]>([]);
    const displayNum = 18;
    const [currentPage, setCurrentPage] = useState(1);
    const pageGithubRepos = githubRepos.slice((currentPage - 1) * displayNum, currentPage * displayNum);
    // 假设你的 vulnerabilities 状态已经在这里了
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetch('/github_repos.json')  // 假设文件位于public目录下
            .then(response => response.json())
            .then(data => setProjects(data as githubRepos[]))
            .catch(error => console.error('Error loading the projects:', error));
    }, []);  // 空依赖数组保证只在组件加载时执行一次

    return (
        <>
            <Card>
                <CardHeader className="flex items-center justify-between">
                    <CardTitle>Popular Projects</CardTitle>
                    <Button size="sm" variant="outline">
                        View All
                    </Button>
                </CardHeader>
                <CardContent className="grid gap-4">
                    {pageGithubRepos.map(githubRepo => (
                        <div key={githubRepo.name} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <GithubIcon className="w-5 h-5"/>
                                <Link className="font-medium" href={githubRepo.url}>
                                    {githubRepo.name}
                                </Link>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                                <AlertCircleIcon className="w-4 h-4"/>
                                <span>12 new issues</span>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
            <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
                <Pagination
                    total={githubRepos.length}
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

