// OPTIMIZED

import {Button, Form, Input, message, Modal, notification, Popconfirm, Table, TableProps, Tag} from "antd";
import {Product} from "../../utils/models.ts";
import React, {Key, useEffect, useState} from "react";
import {delete_product_by_pk, delete_products, get_products} from "../../utils/products.ts";
import ButtonGroup from "antd/es/button/button-group";
import {CheckCircleOutlined, CloseCircleOutlined, SmileOutlined} from '@ant-design/icons';
import "../../assets/ProductList.scss"
import {ProductAdd} from "../../components/ProductAdd.tsx";
import {ProductEdit} from "../../components/ProductEdit.tsx";
import {Fade, Grow} from "@material-ui/core";
import FormItem from "antd/es/form/FormItem";

export function ProductList() {
    const [api, contextHolder] = notification.useNotification();
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [count, setCount] = useState(0)
    const [items, setItems] = useState<Product[]>()
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [editPK, setEditPK] = useState(0)
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
                    // navigate(`/warehouse/products/${item.pk}`)
                    setEditPK(item.pk)
                    setModalOpen(!modalOpen)
                }}>Edit {item.pk}</Button>
                <Popconfirm
                    title="Delete the task"
                    description="Are you sure to delete this task?"
                    onConfirm={() => {
                        console.log(`Delete ${item.pk}`)
                        handleDelete(item.pk).then()
                    }}
                    onCancel={(e?: React.MouseEvent<HTMLElement>) => {
                        console.log(e)
                        message.error('Click on No').then();
                    }}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button style={{width: 100}}
                            danger
                    >Delete {item.pk}</Button>
                </Popconfirm>
            </ButtonGroup>
        }
    ]
    /**
     * async function, using to fetch the data from backend
     * @param currentPage means the page number started with.
     * @param pageSize means the limit of the items per page.
     * @param searchField
     */
    const fetchData = async (currentPage: number, pageSize: number, searchField: string = "null") => {
        const response = await get_products(currentPage, pageSize, searchField)
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
        if (selectedRowKeys.length > 0) {
            const response = await delete_products(selectedRowKeys)
            if (response.status === "success") {
                api.open({
                    message: `Delete ${selectedRowKeys} successfully`,
                    description:
                        `Delete: ${selectedRowKeys}`,
                    icon: <SmileOutlined style={{color: '#108ee9'}}/>,
                });
            }
            fetchData(currentPage, pageSize).then((mapData) => {
                setItems(mapData)
            })
        } else {
            api.open({
                message: `Delete ${selectedRowKeys} unsuccessfully`,
                description:
                    'There is no selected products.',
                icon: <CloseCircleOutlined style={{color: '#ff0000'}}/>,
            });
        }

    };
    const refreshData = () => {
        fetchData(currentPage, pageSize).then((mapData) => {
            setItems(mapData)
        })
    }
    return (
        <>
            {loading ? (
                <div></div>
            ) : (
                <>
                    <Fade in={true} timeout={500}>
                        <div>
                            {contextHolder}
                            <Button className={"refreshButton"} onClick={refreshData}>Reload</Button>
                            <Grow in={true} style={{transformOrigin: '0 0 0'}}
                                  {...({timeout: 1000})}>
                                <Button className={"addButton"} onClick={() => {
                                    setEditModalOpen(!editModalOpen)
                                }}>Add</Button>
                            </Grow>
                            <Popconfirm
                                className={"deleteButton"}
                                title="Delete the task"
                                description="Are you sure to delete this task?"
                                onConfirm={deleteSelected}
                                onCancel={(e?: React.MouseEvent<HTMLElement>) => {
                                    console.log(e)
                                    message.error('Click on No').then();
                                }} okText="Yes"
                                cancelText="No"
                            >
                                <Grow in={true} style={{transformOrigin: '0 0 0'}}
                                      {...({timeout: 1000})}>
                                    <Button danger>Delete</Button>
                                </Grow>
                            </Popconfirm>
                            <Form
                                className={"searchForm"}
                                onFinish={(event: {
                                    searchField: string
                                }) => {
                                    fetchData(currentPage, pageSize, event.searchField).then((mapData) => {
                                        setItems(mapData)
                                    })
                                }}>
                                <FormItem name={"searchField"}>
                                    <div>
                                        <Input style={{width: 200, marginTop: 18, marginRight: 18}}
                                               placeholder={"Please enter name"}/>
                                        <Button htmlType={"submit"}>Search</Button>
                                    </div>
                                </FormItem>
                            </Form>
                            <Grow in={true} style={{transformOrigin: '0 0 0'}}
                                  {...({timeout: 1000})}>
                                <Table
                                    className={"product_table"}
                                    rowKey={"pk"}
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
                                        current: currentPage,
                                        position: ["bottomLeft"]
                                    }}
                                    rowSelection={rowSelection}
                                />
                            </Grow>
                            {/*<Drawer*/}
                            {/*    title="Basic Drawer"*/}
                            {/*    onClose={() => {*/}
                            {/*        console.log("close")*/}
                            {/*        setDrawerOpen(!editModalOpen)*/}
                            {/*    }}*/}
                            {/*    open={editModalOpen}*/}
                            {/*    size={"large"}*/}
                            {/*>*/}
                            {/*    <ProductAdd editModalOpen={editModalOpen} setDrawerOpen={setDrawerOpen}*/}
                            {/*                refreshData={refreshData}/>*/}
                            {/*</Drawer>*/}
                            <Modal
                                title="Basic Drawer"
                                open={editModalOpen}
                                onCancel={() => {
                                    setEditModalOpen(!editModalOpen)
                                }}
                                okButtonProps={{style: {display: 'none'}}} // 隐藏 OK 按钮
                                cancelButtonProps={{style: {display: 'none'}}} // 隐藏 Cancel 按钮
                            >
                                <ProductAdd drawerOpen={editModalOpen} setDrawerOpen={setEditModalOpen}
                                            refreshData={refreshData}/>
                            </Modal>
                            <Modal open={modalOpen}
                                   onCancel={() => {
                                       setModalOpen(!modalOpen)
                                   }}
                                   okButtonProps={{style: {display: 'none'}}} // 隐藏 OK 按钮
                                   cancelButtonProps={{style: {display: 'none'}}} // 隐藏 Cancel 按钮
                            >
                                <ProductEdit pk={editPK} modalOpen={modalOpen} setModalOpen={setModalOpen}
                                             refreshData={refreshData}/>
                            </Modal>


                        </div>
                    </Fade>
                </>
            )}
        </>
    );
}
