import Link from "next/link"
import {
    Activity,
    ArrowUpRight,
    CircleUser,
    CreditCard,
    DollarSign,
    ShieldAlert,
    Menu,
    Github,
    Package2,
    Search,
    Users,
} from "lucide-react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    CustomCard,
    CardContent,
    CardDescription,
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
import Overview from "@/components/overview";
import {useEffect, useState} from "react";

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

interface DashbProps {
    changeMenu: (menuId: string) => void; // 声明changeMenu函数的类型
}

const Dashb: React.FC<DashbProps> = ({ changeMenu }) => {

    const [cveCount, setCveCount] = useState(0);
    const [repoCount, setRepoCount] = useState(0);

    useEffect(() => {
        const url = `http://39.99.238.81:7853/githubList`;
        console.log(url);
        fetch(url)
            .then(response => response.json())
            .then(data => {
                // 设置 CVE 数量
                setRepoCount(data.length);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, []); // 空依赖数组表示这个效果只运行一次，当组件首次挂载时

    useEffect(() => {
        // 获取当前日期
        const currentDate = new Date();
        // 获取当前年份
        const currentYear = currentDate.getFullYear();
        // 获取当前月份，月份从 0 开始计数，所以需要加 1
        const currentMonth = currentDate.getMonth() + 1;
        // 将月份格式化为两位数字
        const formattedMonth = currentMonth.toString().padStart(2, '0');
        // 构建请求的 URL，月份的日期固定为 01
        const url = `https://access.redhat.com/labs/securitydataapi/cve.json?after=${currentYear}-${formattedMonth}-01`;
        console.log(url);
        fetch(url)
            .then(response => response.json())
            .then(data => {
                // 设置 CVE 数量
                setCveCount(data.length);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, []); // 空依赖数组表示这个效果只运行一次，当组件首次挂载时

    const [lastMonthCveCount, setLastMonthCveCount] = useState(0);
    useEffect(() => {
        // 获取当前日期
        const currentDate = new Date();
        // 获取上个月的第一天
        const firstDayOfLastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        // 获取这个月的第一天
        const firstDayOfThisMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

        // 格式化日期为 YYYY-MM-DD
        const formatDate = (date: Date) => {
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            return `${year}-${month}-${day}`;
        };

        const after = formatDate(firstDayOfLastMonth);
        const before = formatDate(firstDayOfThisMonth);

        const url = `https://access.redhat.com/labs/securitydataapi/cve.json?after=${after}&before=${before}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                // 设置上个月的 CVE 数量
                setLastMonthCveCount(data.length);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, []);

    return (
        <div className="flex min-h-screen w-full flex-col">
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                    <CustomCard x-chunk="dashboard-01-chunk-0">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Github Repos Monitoring
                            </CardTitle>
                            <Github className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{repoCount}</div>
                            <p className="text-xs text-muted-foreground">
                                {repoCount} repositories are being monitored.
                            </p>
                        </CardContent>
                    </CustomCard>
                    <CustomCard x-chunk="dashboard-01-chunk-1">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                CVE-2024 Lists
                            </CardTitle>
                            <ShieldAlert className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{cveCount}</div>
                            <p className="text-xs text-muted-foreground">
                                {((cveCount / lastMonthCveCount) * 100).toFixed(1)}% of last month
                            </p>
                        </CardContent>
                    </CustomCard>
                    <CustomCard x-chunk="dashboard-01-chunk-2">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Sales</CardTitle>
                            <CreditCard className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">+12,234</div>
                            <p className="text-xs text-muted-foreground">
                                +19% from last month
                            </p>
                        </CardContent>
                    </CustomCard>
                    <CustomCard x-chunk="dashboard-01-chunk-3">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Active Now</CardTitle>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">+573</div>
                            <p className="text-xs text-muted-foreground">
                                +201 since last hour
                            </p>
                        </CardContent>
                    </CustomCard>
                </div>
                <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
                    <CustomCard
                        className="xl:col-span-2" x-chunk="dashboard-01-chunk-4"
                    >
                        <CardHeader className="flex flex-row items-center">
                            <div className="grid gap-2">
                                <CardTitle>Issue Report</CardTitle>
                                <CardDescription>
                                    Recent transactions from your store.
                                </CardDescription>
                            </div>
                            <Button asChild size="sm" className="ml-auto gap-1" onClick={() => changeMenu('4')}>
                                <Link href="#">
                                    View All
                                    <ArrowUpRight className="h-4 w-4" />
                                </Link>
                            </Button>
                        </CardHeader>
                        <CardContent className="pl-2">
                            <Overview />
                        </CardContent>
                    </CustomCard>
                    <CustomCard x-chunk="dashboard-01-chunk-5">
                        <CardHeader>
                            <CardTitle>Recent Sales</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-8">
                            <div className="flex items-center gap-4">
                                <Avatar className="hidden h-9 w-9 sm:flex">
                                    <AvatarImage src="/avatars/01.png" alt="Avatar" />
                                    <AvatarFallback>OM</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1">
                                    <p className="text-sm font-medium leading-none">
                                        Olivia Martin
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        olivia.martin@email.com
                                    </p>
                                </div>
                                <div className="ml-auto font-medium">+$1,999.00</div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Avatar className="hidden h-9 w-9 sm:flex">
                                    <AvatarImage src="/avatars/02.png" alt="Avatar" />
                                    <AvatarFallback>JL</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1">
                                    <p className="text-sm font-medium leading-none">
                                        Jackson Lee
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        jackson.lee@email.com
                                    </p>
                                </div>
                                <div className="ml-auto font-medium">+$39.00</div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Avatar className="hidden h-9 w-9 sm:flex">
                                    <AvatarImage src="/avatars/03.png" alt="Avatar" />
                                    <AvatarFallback>IN</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1">
                                    <p className="text-sm font-medium leading-none">
                                        Isabella Nguyen
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        isabella.nguyen@email.com
                                    </p>
                                </div>
                                <div className="ml-auto font-medium">+$299.00</div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Avatar className="hidden h-9 w-9 sm:flex">
                                    <AvatarImage src="/avatars/04.png" alt="Avatar" />
                                    <AvatarFallback>WK</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1">
                                    <p className="text-sm font-medium leading-none">
                                        William Kim
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        will@email.com
                                    </p>
                                </div>
                                <div className="ml-auto font-medium">+$99.00</div>
                            </div>
                            <div className="flex items-center gap-4">
                                <Avatar className="hidden h-9 w-9 sm:flex">
                                    <AvatarImage src="/avatars/05.png" alt="Avatar" />
                                    <AvatarFallback>SD</AvatarFallback>
                                </Avatar>
                                <div className="grid gap-1">
                                    <p className="text-sm font-medium leading-none">
                                        Sofia Davis
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        sofia.davis@email.com
                                    </p>
                                </div>
                                <div className="ml-auto font-medium">+$39.00</div>
                            </div>
                        </CardContent>
                    </CustomCard>
                </div>
            </main>
        </div>
    );
}

export default Dashb;
