import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {message} from "antd";
import React, { useState } from 'react';


export default function Component() {
    const [owner, setOwner] = useState('');
    const [repoName, setRepoName] = useState('');
    const addRepo = () => {
        console.log("Owner" + owner + "RepoName" + repoName);
        const url = `http://localhost:7853/addRepo?owner=${encodeURIComponent(owner)}&name=${encodeURIComponent(repoName)}`;
        // 发送 GET 请求到后端
        console.log(url);
        fetch(url)
            .then(response => {
                // 检查响应的状态码
                if (response.ok) { // 如果响应状态码是 200-299
                    return response.json().then(data => {
                        message.success('The repository has been added to the monitoring list!');
                        console.log('Success:', data);
                    });
                } else { // 如果响应状态码不是 200-299
                    return response.json().then(data => {
                        message.error('Failed to add repository');
                        console.error('Error:', data);
                    });
                }
            })
            .catch(error => {
                // 网络或其他错误处理
                console.error('Network or other error:', error);
                message.error('This is an error message');
            });

    };
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingTop: '10%',  // 表单居中偏上的样式
            width: '100%',      // 确保包裹容器宽度充满父容器
        }}>
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Add Repos</CardTitle>
                    <CardDescription>
                        Enter a GitHub repository name to add to the monitoring list.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="owner">Owner</Label>
                        <Input id="owner" type="text" required value={owner}
                               onChange={e => setOwner(e.target.value)}/>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="name">Repository name</Label>
                        <Input id="name" type="text" required onChange={e => setRepoName(e.target.value)}/>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" onClick={addRepo}>Submit</Button>
                </CardFooter>
            </Card>
        </div>


    );
}