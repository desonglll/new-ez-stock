import {Button, Card, Space, Spin, Table, TableProps} from "antd";
import {useEffect, useState} from "react";
import axios from "axios";
import {get_headers} from "../../utils/basic.ts";
import {News} from "../../utils/models.ts";
import {useNavigate} from "react-router-dom";


export function NewsList() {
    const [newsList, setNewsList] = useState([]);
    const instance = axios.create()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);
    const handleDetail = (record: News) => {
        console.log(record)
        navigate(`/news/${record.id}/`)
    }
    // const handleDelete = (record: News) => {
    //     console.log(record)
    // }
    const columns: TableProps<News>["columns"] = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (text: string, record) => <a onClick={() => handleDetail(record)}>{text}</a>,
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => handleDetail(record)}>Detail {record.id}</a>
                    {/*<a onClick={() => handleDelete(record)}>Delete</a>*/}
                </Space>
            ),
        }
    ]
    useEffect(() => {
        const fetchData = async () => {
            const data = await instance.get("api/news/", {
                headers: get_headers()
            })
            console.log(data.data.data)
            const news_data = data.data.data.map((item: {
                id: number;
                author: number;
                content: string;
                date: string;
                pub_date: string;
                title: string;
            }) => ({
                key: item.id,
                author: item.author,
                content: item.content,
                date: item.date,
                id: item.id,
                pub_date: item.pub_date,
                title: item.title
            }))
            setNewsList(news_data)

        }
        fetchData().then()
        setLoading(!loading)

    }, []);
    const handleAdd = () => {
        console.log("Click")
        navigate("/news/add/")
    }
    return (
        <>
            <Spin spinning={loading}>
                {loading ? (
                    <div>Loading</div>
                ) : (
                    <Card>
                        <div style={{marginBottom: 18}}>
                            <Button onClick={handleAdd}>
                                Add
                            </Button>
                        </div>
                        <Table
                            columns={columns}
                            dataSource={newsList}
                            pagination={false}
                        />
                    </Card>
                )}

            </Spin>

        </>
    );
}