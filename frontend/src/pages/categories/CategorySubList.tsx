import {Button, Card, message, Space, Table, TableProps, Typography} from "antd";
import {useEffect, useState} from "react";
import axios from "axios";
import {get_headers} from "../../utils/basic.ts";
import {useNavigate} from "react-router-dom";
import {Category} from "../../utils/models.ts";
import {Fade, Grow} from "@material-ui/core";

export function CategorySubList() {
    const [subList, setSubList] = useState([])
    const instance = axios.create()
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    const handleEdit = (event: Category) => {
        console.log(event);
        navigate(`/warehouse/categories/${event.key}`);
    };
    const handleDelete = (event: Category) => {
        console.log(event);
        const instance = axios.create();
        instance
            .delete(`api/categories/${event.key}/delete/`, {
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
    const columns: TableProps<Category>["columns"] = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Parent Name',
            dataIndex: 'parent_name',
            key: "parent_name"
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
    useEffect(() => {
        const fetchData = async () => {
            const resData = await instance.get("api/categories/get_sub/", {
                headers: get_headers()
            })

            const listData = resData.data.data.map((item: {
                pk: number;
                name: string;
                description: string;
                parent_name: string
            }) => ({
                key: item.pk,
                name: item.name,
                description: item.description,
                parent_name: item.parent_name
            }))
            setSubList(listData)
        }
        fetchData().then()
        setLoading(!loading)

    }, []);
    return (
        <>
            {contextHolder}
            {loading ? (
                <div></div>
            ) : (
                <Fade in={true} timeout={500}>
                    <Card>
                        <Typography.Paragraph>
                            SubCategories can be selected in product edit or add page.
                        </Typography.Paragraph>
                        <div>
                            <Button
                                style={{marginBottom: 16}}
                                onClick={() => {
                                    navigate("/warehouse/categories/add");
                                }}
                            >
                                Add
                            </Button>
                        </div>
                        <Grow in={true} style={{transformOrigin: '0 0 0'}}
                              {...({timeout: 1000})}>
                            <Table
                                dataSource={subList}
                                columns={columns}
                                pagination={false}
                            />
                        </Grow>
                    </Card>
                </Fade>
            )}
        </>
    )
        ;
}