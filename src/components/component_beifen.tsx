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

interface githubRepos {
  name: string;
  url: string;
}

export default function Component() {

  const [githubRepos, setProjects] = useState<githubRepos[]>([]);

  useEffect(() => {
    fetch('/projects.json')  // 假设文件名为projects.json，位于public目录下
        .then(response => response.json())
        .then(data => setProjects(data as githubRepos[]))
        .catch(error => console.error('Error loading the projects:', error));
  }, []);  // 空依赖数组保证只在组件加载时执行一次

  return (
      <div className="flex flex-col w-full min-h-screen">
        <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
          <Link className="flex items-center gap-2 text-lg font-semibold sm:text-base mr-4" href="#">
            <LayoutDashboardIcon className="w-6 h-6" />
            <span className="sr-only">GitHub Issue Dashboard</span>
          </Link>
          <div className="relative flex-1 max-w-md">
            <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
                className="pl-10 pr-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 dark:text-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
                placeholder="Search for a GitHub project..."
                type="search"
            />
          </div>
          <div className="flex items-center gap-4 md:gap-2 lg:gap-4">
            <Button className="rounded-full" size="icon" variant="ghost">
              <img
                  alt="Avatar"
                  className="rounded-full border"
                  height="32"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "32/32",
                    objectFit: "cover",
                  }}
                  width="32"
              />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </div>
        </header>
        <main className="flex-1 bg-gray-100/40 dark:bg-gray-800/40 p-4 md:p-10 grid gap-8">
          <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex items-center justify-between">
                <CardTitle>Popular Projects</CardTitle>
                <Button size="sm" variant="outline">
                  View All
                </Button>
              </CardHeader>
              <CardContent className="grid gap-4">
                {githubRepos.map(githubRepos => (
                    <div key={githubRepos.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <GithubIcon className="w-5 h-5" />
                        <Link className="font-medium" href={githubRepos.url}>
                          {githubRepos.name}
                        </Link>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                        <AlertCircleIcon className="w-4 h-4" />
                        <span>12 new issues</span>
                      </div>
                    </div>
                ))}
              </CardContent>
            </Card>
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
                    <DropdownMenuItem>
                      <AlertCircleIcon className="w-4 h-4 mr-2" />
                      High Severity
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <AlertTriangleIcon className="w-4 h-4 mr-2" />
                      Medium Severity
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <InfoIcon className="w-4 h-4 mr-2" />
                      Low Severity
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircleIcon className="w-5 h-5 text-red-500" />
                    <Link className="font-medium" href="#">
                      CVE-2023-12345
                    </Link>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                    <span>High Severity</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangleIcon className="w-5 h-5 text-yellow-500" />
                    <Link className="font-medium" href="#">
                      CVE-2023-54321
                    </Link>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                    <span>Medium Severity</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <InfoIcon className="w-5 h-5 text-blue-500" />
                    <Link className="font-medium" href="#">
                      CVE-2023-98765
                    </Link>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                    <span>Low Severity</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex items-center justify-between">
                <CardTitle>Issue Trends</CardTitle>
                <Button size="sm" variant="outline">
                  View Details
                </Button>
              </CardHeader>
              <CardContent>
                <BarChart className="w-full aspect-[16/9]" />
              </CardContent>
            </Card>

          </div>
          <div className="max-w-6xl mx-auto">
            <Card>
              <CardHeader className="flex items-center justify-between">
                <CardTitle>Project Details</CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="sm" variant="outline">
                      <FilterIcon className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <GithubIcon className="w-4 h-4 mr-2" />
                      shadcn/ui
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <GithubIcon className="w-4 h-4 mr-2" />
                      vercel/next.js
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <GithubIcon className="w-4 h-4 mr-2" />
                      tailwindlabs/tailwindcss
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Issue</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>Assignee</TableHead>
                      <TableHead>Created</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Link className="font-medium" href="#">
                          Incorrect error handling in login flow
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Badge variant="destructive">High</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <img
                              alt="Assignee Avatar"
                              className="rounded-full"
                              height="24"
                              src="/placeholder.svg"
                              style={{
                                aspectRatio: "24/24",
                                objectFit: "cover",
                              }}
                              width="24"
                          />
                          <span>John Doe</span>
                        </div>
                      </TableCell>
                      <TableCell>2 days ago</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Link className="font-medium" href="#">
                          Accessibility issues with dropdown menu
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">Medium</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <img
                              alt="Assignee Avatar"
                              className="rounded-full"
                              height="24"
                              src="/placeholder.svg"
                              style={{
                                aspectRatio: "24/24",
                                objectFit: "cover",
                              }}
                              width="24"
                          />
                          <span>Jane Smith</span>
                        </div>
                      </TableCell>
                      <TableCell>1 week ago</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <Link className="font-medium" href="#">
                          Typo in documentation
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Badge variant="default">Low</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <img
                              alt="Assignee Avatar"
                              className="rounded-full"
                              height="24"
                              src="/placeholder.svg"
                              style={{
                                aspectRatio: "24/24",
                                objectFit: "cover",
                              }}
                              width="24"
                          />
                          <span>Michael Johnson</span>
                        </div>
                      </TableCell>
                      <TableCell>3 days ago</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
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
