import React, {useState} from 'react';
import {
    BarChartOutlined,
    GithubOutlined,
    LaptopOutlined,
    DashboardOutlined,
    SecurityScanOutlined,
    UserOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import CVE from './cve';
import NewIssue from './NewIssue';
import Stats from './stats';
import Form from './Form';
import NewRepo from './NewRepo';
import Dashb from './dashb';
import {Button} from "@/components/ui/button";
import Overview from "@/components/overview";
import Link from "next/link";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Activity,
    ArrowUpRight,
    CircleUser,
    Gauge,
    DollarSign,
    Package2,
    Search,
    Users,
} from "lucide-react"
import {color} from "d3-color";

const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const items: MenuProps['items'] = [
    getItem('Overview', '6', <LaptopOutlined />),
    { type: 'divider' },

    getItem('Github Repos', 'sub2', <GithubOutlined />, [
        getItem('List of Repos', '1'),
        getItem('Manually Add Repos', '2'),
    ]),

    { type: 'divider' },

    // getItem('Issue Status', 'sub', <BarChartOutlined />, [
    //     getItem('Issue Charts', '3'),
    //     getItem('Issue Details', '4'),
    //
    // ]),
    getItem('Issue Status', '4', <BarChartOutlined />),
    { type: 'divider' },

    getItem('Security Vulnerabilities', '5',<SecurityScanOutlined /> ),

];

const App: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const [activeMenu, setActiveMenu] = useState('6');

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setActiveMenu(e.key);
    };

    return (
    <Layout style={{minHeight: '100vh'}}>
        <Header style={{display: 'flex', alignItems: 'center', background: 'white'}}>
                <div className="demo-logo"/>
                <nav
                    className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                    <Link
                        href="#"
                        className="flex items-center gap-2 text-lg font-semibold md:text-base"
                    >
                        <Gauge className="h-6 w-6"/>
                        {/*<LaptopOutlined /> <DashboardOutlined style = "font-size:20px"/>*/}
                        {/*<span className="sr-only">Acme Inc</span>*/}
                    </Link>
                    <Link
                        href="#"
                        className="text-foreground transition-colors hover:text-foreground"
                    >
                        Dashboard
                    </Link>
                </nav>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant="outline"
                            size="icon"
                            className="shrink-0 md:hidden"
                        >
                            <Menu className="h-5 w-5"/>
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <nav className="grid gap-6 text-lg font-medium">
                            <Link
                                href="#"
                                className="flex items-center gap-2 text-lg font-semibold"
                            >
                                <Package2 className="h-6 w-6"/>
                                <span className="sr-only">Acme Inc</span>
                            </Link>
                            <Link href="#" className="hover:text-foreground">
                                Dashboard
                            </Link>

                        </nav>
                    </SheetContent>
                </Sheet>
                <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                    <form className="ml-auto flex-1 sm:flex-initial">
                        {/*<div className="relative">*/}
                        {/*    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>*/}
                        {/*    <Input*/}
                        {/*        type="search"*/}
                        {/*        placeholder="Search products..."*/}
                        {/*        className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"*/}
                        {/*    />*/}
                        {/*</div>*/}
                    </form>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="icon" className="rounded-full">
                                <CircleUser className="h-5 w-5"/>
                                <span className="sr-only">Toggle user menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuItem>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
        </Header>
        <Layout>
        <Sider width={250} style={{background: colorBgContainer}}>
            <Menu
                onClick={onClick}
                style={{width: 250}}
                selectedKeys={[activeMenu]} // 更新这一行
                defaultSelectedKeys={['6']}
                defaultOpenKeys={['sub2']}
                mode="inline"
                items={items}
            />
        </Sider>
        <Layout style={{display: 'flex', flexDirection: 'column', flex: 1, padding: '24px'}}>
            <Content
                style={{
                    flex: 1,
                    padding: 24,
                    margin: 0,
                    minHeight: 280,
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}
            >
                {activeMenu == '6' && <Dashb changeMenu={setActiveMenu}/> }
                {activeMenu == '1' && <NewRepo/>}
                {activeMenu == '2' && <Form/>}
                {/*{activeMenu == '3' && <Stats/>}*/}
                {activeMenu == '4' && <NewIssue/>}
                {activeMenu === '5' && <CVE/>}
            </Content>
        </Layout>
    </Layout>
    </Layout>

)
    ;
};

export default App;