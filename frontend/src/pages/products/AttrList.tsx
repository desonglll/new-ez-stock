import {Button, Card, Drawer, message, Skeleton, Space, Spin, Table, TableColumnsType} from "antd";
import {useEffect, useState} from "react";
import {ProductAttribute} from "../../utils/models.ts";
import {get_product_attributes} from "../../utils/products.ts";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {get_headers} from "../../utils/basic.ts";
import {AttrAdd} from "../../components/AttrAdd.tsx";


export const AttrList = () => {
    const [attributes, setAttributes] = useState<ProductAttribute[]>([]);
    const navigate = useNavigate()
    const instance = axios.create()
    const [messageApi, contextHolder] = message.useMessage();
    const [loadingPage, setLoadingPage] = useState(true);
    const [drawerOpen, setDrawerOpen] = useState(false)
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
        navigate(`/warehouse/products-attr/${record.pk}/`)
    }
    const handleDelete = (record: ProductAttribute) => {
        console.log(record)
        instance.delete(`api/products/product_attributes/${record.pk}/`, {
            headers: get_headers()
        }).then()
        messageApi
            .open({
                type: "success",
                content: "Delete successfully",
                duration: 1.5
            })
            .then(() => {
                // window.location.reload();
                fetchData().then()
            });
    }
    const fetchData = async () => {
        const res = await get_product_attributes()
        setAttributes(res)
    }
    useEffect(() => {
        fetchData().then().finally(() => {
            setLoadingPage(!loadingPage)
        })
    }, []);
    return (
        <>
            {contextHolder}
            <Skeleton loading={loadingPage}>
                {loadingPage ? (
                    <div></div>
                ) : (
                    <Card>
                        <div>
                            <Button style={{marginBottom: 18}} onClick={() => {
                                setDrawerOpen(!drawerOpen)
                            }}>Add</Button>
                        </div>
                        <Table dataSource={attributes} columns={columns} rowKey={"pk"}/>
                        <Drawer
                            open={drawerOpen}
                            size={"large"}
                            onClose={() => {
                                setDrawerOpen(!drawerOpen)
                                fetchData().then()
                            }}
                            placement={"right"}
                        >
                            <AttrAdd/>
                        </Drawer>
                    </Card>
                )}
            </Skeleton>
        </>
    );
};