import {Button, Card, message, Space, Table, TableProps, Tag} from "antd";
import * as React from "react";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {get_headers} from "../../utils/basic.ts";
import {Category} from "../../utils/models.ts";
import {getCategories} from "../../utils/categories.ts";
import {CheckCircleOutlined, CloseCircleOutlined} from "@ant-design/icons";
import {Fade} from "@material-ui/core";

export const CategoryList = () => {
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const [loadingPage, setLoadingPage] = useState(true);
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const handleEdit = (event: Category) => {
        console.log(event);
        navigate(`/warehouse/categories/${event.pk}`);
    };
    const handleDelete = (event: Category) => {
        console.log(event);
        const instance = axios.create();
        instance
            .delete(`api/categories/${event.pk}/delete/`, {
                headers: get_headers(),
            })
            .then((res) => {
                console.log(res);
            });
        messageApi
            .open({
                type: "success",
                content: "Delete successfully",
                duration: 1.5,
            })
            .then(() => {
                window.location.reload();
            });
    };
    const [categoryData, setCategoryData] = useState<Category[]>([]);
    const columns: TableProps<Category>["columns"] = [
        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "is Parent",
            dataIndex: "parent",
            render: (_, record) =>
                record.parent === null ? (
                    <Tag icon={<CheckCircleOutlined/>} color="success">
                        Parent
                    </Tag>
                ) : (
                    <Tag icon={<CloseCircleOutlined/>} color="error">
                        Not Parent
                    </Tag>
                ),
            filters: [
                {
                    text: "P",
                    value: true,
                },
                {
                    text: "NP",
                    value: false,
                },
            ],
            onFilter: (value: boolean | React.Key, record) => {
                if (value === true)
                    return record.parent === null
                else
                    return record.parent != null
            }
        },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => handleEdit(record)}>Edited {record.pk}</a>
                    <a onClick={() => handleDelete(record)}>Delete</a>
                </Space>
            ),
        },
    ];
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
        console.log(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    useEffect(() => {
        const fetchData = async () => {
            const categories_data = await getCategories();
            console.log(categories_data)
            const data: Category[] = categories_data.map((item: Category) => ({
                pk: item.pk,
                name: item.name,
                parent: item.parent
            }));
            setCategoryData(data);
        };
        fetchData()
            .then(() => {
            })
            .finally(() => {
                setLoadingPage(!loadingPage);
            });
    }, []);
    return (
        <>
            {contextHolder}
            {loadingPage ? (
                <div></div>
            ) : (
                <Fade in={true} timeout={500}>
                    <Card style={{margin: 16}}>
                        <div>
                            <Button
                                style={{marginBottom: 16}}
                                onClick={() => {
                                    navigate("add");
                                }}
                            >
                                Add
                            </Button>
                        </div>
                        <Card>
                            <Table
                                rowKey={"pk"}
                                rowSelection={rowSelection}
                                columns={columns}
                                dataSource={categoryData}
                                pagination={false}
                            />
                        </Card>
                    </Card>
                </Fade>
            )}
        </>
    );
};
