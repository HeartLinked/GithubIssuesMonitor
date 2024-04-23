import React, {useState} from 'react';
import {
    BarChartOutlined,
    GithubOutlined,
    LaptopOutlined,
    NotificationOutlined,
    SecurityScanOutlined,
    UserOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import Link from "next/link";

const { Header, Content, Sider } = Layout;

const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
    key,
    label: `nav ${key}`,
}));

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
    getItem('Github Repos', 'sub2', <GithubOutlined />, [
        getItem('List of Repos', '1'),
        getItem('Manually Add Repos', '2'),
    ]),

    { type: 'divider' },

    getItem('Issue Status', 'sub', <BarChartOutlined />, [
        getItem('Issue Charts', '3'),
        getItem('Issue Details', '4'),

    ]),
    getItem('Security Vulnerabilities', '5',<SecurityScanOutlined /> ),

];

const App: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const [activeMenu, setActiveMenu] = useState('1');

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setActiveMenu(e.key);
    };

    return (
        <Layout>
            <Header style={{ display: 'flex', alignItems: 'center' }}>
                <div className="demo-logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    items={items1}
                    style={{ flex: 1, minWidth: 0 }}
                />
            </Header>
            <Layout>
                <Sider width={250} style={{ background: colorBgContainer }}>
                    <Menu
                        onClick={onClick}
                        style={{ width: 250 }}
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                        items={items}
                    />
                </Sider>
                <Layout style={{ padding: '24px 24px 24px' }}>

                    <Content
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        {/*{activeMenu === '5' && <CVE />}*/}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default App;