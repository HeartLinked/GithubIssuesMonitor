import Image from "next/image"
import { MoreHorizontal } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {message, notification, Pagination} from "antd";


import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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

interface githubRepos {
    name: string;
    url: string;
    owner: string;
}

export default function Component() {

    const [githubRepos, setProjects] = useState<githubRepos[]>([]);
    const displayNum = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const pageGithubRepos = githubRepos.slice((currentPage - 1) * displayNum, currentPage * displayNum);

    const [messageApi, contextHolder] = message.useMessage();
    const [reload, setReload] = useState(false);  // 添加用于触发重新加载的状态


    useEffect(() => {
        fetch('http://localhost:7853/githubList')  // 假设文件位于public目录下
            .then(response => response.json())
            .then(data => {
                // 转换数据为 githubRepos[] 类型
                const transformedData = data.map((repo: any) => {
                    const parts = repo.name.split('/'); // 例如 "EbookFoundation/free-programming-books"
                    return {
                        owner: parts[0], // "EbookFoundation"
                        name: parts[1], // "free-programming-books"
                        url: repo.url // 假设原始数据中包含了url
                    };
                });
                setProjects(transformedData as githubRepos[]);
            })
            .catch(error => console.error('Error loading the projects:', error));
    }, [reload]);  // 空依赖数组保证只在组件加载时执行一次

    const deleteSuccess = (repoName: String) => {
        // 假设有一个删除逻辑或调用API的代码
        console.log("Delete action triggered");
        message.info('This is a normal message');

        // 例如，调用一个删除API
        // fetch('/api/delete-item', { method: 'POST' })
        //     .then(() => console.log('Item deleted successfully'))
        //     .catch(err => console.error('Error deleting item:', err));
        fetch(`http://localhost:7853/deleteRepo?url=${repoName}`)
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    message.success('Repository deleted successfully');
                    setReload(!reload);  // 成功后切换 reload 状态
                } else {
                    message.error('Failed to delete repository');
                }
            })
            .catch(error => {
                console.error('Error deleting repository:', error);
                message.error('Error deleting repository');
            });
    };

    return (
    <>
        <Card>
            <CardHeader>
                <CardTitle>Github Repos List</CardTitle>
                <CardDescription>
                    The list of Github Repositories under monitoring.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead style={{width: '37%'}}>Repository Name</TableHead>
                            <TableHead style={{width: '20%'}}>Status</TableHead>
                            <TableHead style={{width: '23%'}} className="hidden md:table-cell">
                                Owner
                            </TableHead>
                            <TableHead style={{width: '20%'}}>
                                <span className="sr-only">Actions</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>

                        {pageGithubRepos.map((repo, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <Link className="font-medium" href={repo.url}>
                                        {repo.name}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    {/* 假设issue对象中有Severity属性 */}
                                    <Badge variant="outline">Active</Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        {/* Author作为分配的人 */}
                                        <span>{repo.owner}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button aria-haspopup="true" size="icon" variant="ghost">
                                                <MoreHorizontal className="h-4 w-4"/>
                                                <span className="sr-only">Toggle menu</span>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                            <DropdownMenuItem onClick={() => deleteSuccess(repo.url)}>Delete</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>

                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </CardContent>

        </Card>
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '10px'}}>
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

