import {Button, Card, message, Space, Spin, Table, TableColumnsType} from "antd";
import {useEffect, useState} from "react";
import {ProductAttribute} from "../../utils/models.ts";
import {get_product_attributes} from "../../utils/products.ts";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {get_headers} from "../../utils/basic.ts";


export const AttrList = () => {
    const [attributes, setAttributes] = useState<ProductAttribute[]>([]);
    const navigate = useNavigate()
    const instance = axios.create()
    const [messageApi, contextHolder] = message.useMessage();
    const [loadingPage, setLoadingPage] = useState(true);
    const columns: TableColumnsType<ProductAttribute> = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: 100
        },
        {
            title: 'Value',
            dataIndex: 'value',
            key: 'value',
        },
        {
            title: "Actions",
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => handleEdit(record)}>Edited {record.pk}</a>
                    <a onClick={() => handleDelete(record)}>Delete</a>
                </Space>
            ),
            width: 200,
        },
    ];


    const handleEdit = (record: ProductAttribute) => {
        navigate(`/products-attr/${record.pk}/`)
    }
    const handleDelete = (record: ProductAttribute) => {
        console.log(record)
        instance.delete(`api/products/product_attributes/${record.pk}/delete/`, {
            headers: get_headers()
        })
        messageApi
            .open({
                type: "success",
                content: "Delete successfully",
                duration: 1.5
            })
            .then(() => {
                window.location.reload();
            });
    }
    useEffect(() => {
        const fetchData = async () => {
            const res = await get_product_attributes()
            setAttributes(res)
        }
        fetchData().then().finally(() => {
            setLoadingPage(!loadingPage)
        })
    }, []);
    return (
        <>
            {contextHolder}
            <Spin spinning={loadingPage}>
                {loadingPage ? (
                    <div>Loading</div>
                ) : (
                    <Card>
                        <div>
                            <Button style={{marginBottom: 18}} onClick={() => {
                                navigate("/products-attr/add")
                            }}>Add</Button>
                        </div>
                        <Table dataSource={attributes} columns={columns} rowKey={"pk"}/>
                    </Card>

                )}
            </Spin>
        </>
    );
};