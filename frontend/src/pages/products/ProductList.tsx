// OPTIMIZED

import {Button, notification, Spin, Table, TableProps, Tag} from "antd";
import {Product} from "../../utils/models.ts";
import React, {Key, useEffect, useState} from "react";
import {delete_product_by_pk, delete_products, get_products} from "../../utils/products.ts";
import ButtonGroup from "antd/es/button/button-group";
import {useNavigate} from "react-router-dom";
import {CheckCircleOutlined, CloseCircleOutlined, SmileOutlined} from '@ant-design/icons';
import "../../assets/ProductList.scss"

export function ProductList() {
    const navigate = useNavigate()
    const [api, contextHolder] = notification.useNotification();
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [count, setCount] = useState(0)
    const [items, setItems] = useState<Product[]>()
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const columns: TableProps<Product>['columns'] = [
        {
            title: 'PK',
            dataIndex: 'pk',
        },
        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "Is In Stock",
            dataIndex: "is_in_stock",
            render: (val: boolean) =>
                val ? (
                    <Tag icon={<CheckCircleOutlined/>} color="success">
                        In Stock
                    </Tag>
                ) : (
                    <Tag icon={<CloseCircleOutlined/>} color="error">
                        Not In Stock
                    </Tag>
                ),
            filters: [
                {
                    text: "有库存",
                    value: true,
                },
                {
                    text: "无库存",
                    value: false,
                },
            ],
            onFilter: (value: boolean | Key, record) => record.is_in_stock === value,
            width: 100,
        },
        {
            title: "Is Valid",
            dataIndex: "is_valid",
            render: (val: boolean) =>
                val ? (
                    <Tag icon={<CheckCircleOutlined/>} color="success">
                        Valid
                    </Tag>
                ) : (
                    <Tag icon={<CloseCircleOutlined/>} color="error">
                        Invalid
                    </Tag>
                ),
            filters: [
                {
                    text: "有效",
                    value: true,
                },
                {
                    text: "无效",
                    value: false,
                },
            ],
            onFilter: (value: boolean | Key, record) => record.is_valid === value,
            width: 100,
        },
        {
            title: "Actions",
            render: (item) => <ButtonGroup>
                <Button style={{width: 100}} onClick={() => {
                    navigate(`/warehouse/products/${item.pk}`)
                }}>Edit {item.pk}</Button>
                <Button style={{width: 100}}
                        onClick={() => {
                            console.log(`Delete ${item.pk}`)
                            handleDelete(item.pk).then()
                        }}
                        danger
                >Delete {item.pk}</Button>
            </ButtonGroup>
        }
    ]
    /**
     * async function, using to fetch the data from backend
     * @param currentPage means the page number started with.
     * @param pageSize means the limit of the items per page.
     */
    const fetchData = async (currentPage: number, pageSize: number) => {
        const response = await get_products(currentPage, pageSize)
        console.log(response)
        setCount(response.count)
        return response.results.map((item: Product) => ({
            pk: item.pk,
            name: item.name,
            is_in_stock: item.is_in_stock,
            is_valid: item.is_valid
        }))
    }
    /**
     * Deleting a product item by specific pk number.
     * @param pk
     */
    const handleDelete = async (pk: number) => {
        const response = await delete_product_by_pk(pk)
        if (response.status === "success") {
            api.open({
                message: `Delete ${pk} successfully`,
                description:
                    'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
                icon: <SmileOutlined style={{color: '#108ee9'}}/>,
            });
        }
        fetchData(currentPage, pageSize).then((mapData) => {
            setItems(mapData)
        })
    }
    /**
     * UseEffect function
     */
    useEffect(() => {
        fetchData(1, 10).then((mapData) => {
            setItems(mapData)
        }).finally(() => {
            setLoading(!loading)
        })
    }, []);
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const deleteSelected = async () => {
        const response = await delete_products(selectedRowKeys)
        if (response.status === "success") {
            api.open({
                message: `Delete ${selectedRowKeys} successfully`,
                description:
                    'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
                icon: <SmileOutlined style={{color: '#108ee9'}}/>,
            });
        }
        fetchData(currentPage, pageSize).then((mapData) => {
            setItems(mapData)
        })
    };
    return (
        <>
            <Spin spinning={loading}>
                {loading ? (<div>aa</div>) : (
                    <>
                        {contextHolder}
                        <Button className={"add_button"} onClick={() => {
                            navigate("/warehouse/products/add")
                        }}>Add</Button>
                        <Button danger className={"delete_button"} onClick={deleteSelected}>Delete</Button>
                        <Table rowKey={"pk"}
                               columns={columns}
                               dataSource={items}
                               pagination={{
                                   showSizeChanger: true,
                                   onChange: (page, pageSize) => {
                                       setCurrentPage(page)
                                       setPageSize(pageSize)
                                       fetchData(page, pageSize).then((mapData) => {
                                           setItems(mapData)
                                       })
                                   },
                                   total: count,
                                   current: currentPage
                               }}
                               rowSelection={rowSelection}
                        />
                    </>
                )}
            </Spin>
        </>
    );
}
