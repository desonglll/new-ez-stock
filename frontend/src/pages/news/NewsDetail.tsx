import {useParams} from "react-router-dom";
import Title from "antd/lib/typography/Title";
import {useEffect, useState} from "react";
import axios from "axios";
import {News} from "../../utils/models.ts";
import {Card, Spin} from "antd";
import Paragraph from "antd/lib/typography/Paragraph";

export function NewsDetail() {
    const {id} = useParams()
    const [newsData, setNewsData] = useState<News>()
    const [loading, setLoading] = useState(true)
    const instance = axios.create()
    useEffect(() => {
        const fetchData = async () => {
            const data = await instance.get(`api/news/${id}/`)
            console.log(data.data.data)
            const serilizerData: News = {
                key: data.data.data.id,
                author: data.data.data.author,
                content: data.data.data.content,
                date: data.data.data.date,
                id: data.data.data.id,
                pub_date: data.data.pub_date,
                title: data.data.data.title,
            }
            setNewsData(serilizerData)
        }
        fetchData().then()
        setLoading(!loading)

    }, []);
    return (
        <>
            <Spin spinning={loading}>
                {loading ? (
                    <div></div>
                ) : (
                    <Card>
                        <Title level={2}>
                            {newsData?.title}
                        </Title>
                        <Paragraph style={{fontSize: 18}}>
                            {newsData?.content}
                        </Paragraph>
                    </Card>
                )}
            </Spin>
        </>
    );
}