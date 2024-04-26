import Image from "next/image"
import { MoreHorizontal } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {message, notification, Pagination} from "antd";
import {Trash2} from "lucide-react";

import {
    CustomCard,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/customCard"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import React, {useEffect, useState} from "react";
import Link from "next/link";

interface githubIssues {
    Issue_Title: string;
    Issue_Url: string;
    "CVE-ID": string;
    Author: string;
    Issue_Created_At: string;
}

function formatIssueDate(dateString: string) {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
}

function truncateString(str: string, maxLength: number) {
    if (str.length > maxLength) {
        return str.substring(0, maxLength) + '...';
    }
    return str;
}


export default function Component() {

    const [issues, setIssues] = useState<githubIssues[]>([]);
    const displayNum = 13;
    const [currentPage, setCurrentPage] = useState(1);
    const pageIssues = issues.slice((currentPage - 1) * displayNum, currentPage * displayNum);

    const [messageApi, contextHolder] = message.useMessage();
    const [reload, setReload] = useState(false);  // 添加用于触发重新加载的状态


    useEffect(() => {
        // 获取public文件夹中的github_issues.json文件
        fetch('/github_issues.json')
            .then((response) => response.json())
            .then((data) => {
                setIssues(data); // 更新状态以便渲染
            })
            .catch((error) => {
                console.error('Error fetching the issues:', error);
            });
    }, []); // 空依赖数组保证这段代码只执行一次


    return (
        <>
            <CustomCard>
                <CardHeader>
                    <CardTitle>Github Repositories Issue Report</CardTitle>
                    <CardDescription>
                        The list of Github Repositories under monitoring.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead style={{width: '47%'}}>Issue</TableHead>
                                <TableHead style={{width: '18%'}}>User</TableHead>
                                <TableHead style={{width: '18%'}}>Create</TableHead>
                                <TableHead style={{width: '17%'}} className="hidden md:table-cell">
                                    Severity Prediction
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>

                            {pageIssues.map((repo, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <Link className="font-medium" href={repo.Issue_Url}>
                                            {truncateString(repo.Issue_Title, 78)}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            {/* Author作为分配的人 */}
                                            <span>{repo.Author}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <span>{formatIssueDate(repo.Issue_Created_At)}</span>
                                    </TableCell>



                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>
                </CardContent>

            </CustomCard>
            <div style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
                <Pagination
                    total={issues.length}
                    showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                    pageSize={displayNum}
                    current={currentPage}
                    onChange={setCurrentPage}
                />
            </div>
        </>

    )
}

