import {useNavigate, useParams} from "react-router-dom";
import {Button, Card, Col, Form, Input, message, Row, Select, Spin, Switch} from "antd";
import {useEffect, useState} from "react";
import {Category} from "../../utils/models.ts";
import {LoadingOutlined} from "@ant-design/icons";
import axios from "axios";
import {get_headers} from "../../utils/basic.ts";
import {get_category_by_pk} from "../../utils/categories.ts";

export const CategoryEdit = () => {
    const {pk} = useParams();
    const instance = axios.create();
    const [loadingPage, setLoadingPage] = useState(true);
    const [category, setCategory] = useState<Category>();
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const [parentSelections, setParentSelections] = useState([]);
    const [isChild, setIsChild] = useState(false);

    useEffect(() => {
        const fetchData = async (pk: number) => {
            const res = await get_category_by_pk(pk);
            const parentData = await instance.get("api/categories/get_parent/")
            let parent: never [] = parentData.data.data.map((item: { pk: number; name: string; }) => ({
                    value: item.pk,
                    label: item.name
                }
            ));

            console.log(parent)
            parent = parent.filter(v => v.value !== pk)
            console.log(parent)
            setParentSelections(parent)

            console.log(res)
            if (res.parent) {
                setIsChild(true)
            }
            setCategory(res);
        };
        fetchData(Number(pk))
            .then()
            .finally(() => {
                setLoadingPage(!loadingPage);
            });
    }, []);
    const success = () => {
        messageApi
            .open({
                type: "success",
                content: "Updated successfully",
                duration: 1.5,
            })
            .then(() => {
                navigate("/workspace/warehouse/categories");
            });
    };
    const handleSubmit = (data: Category) => {
        console.log(data);
        if (!data.is_children) {
            data.parent = null
        }
        instance
            .put(`api/categories/${pk}/update/`, data, {
                headers: get_headers(),
            })
            .then((res) => {
                console.log(res);
            });
        success();
    };

    return (
        <>
            {contextHolder}
            <Spin
                spinning={loadingPage}
                indicator={<LoadingOutlined style={{fontSize: 24}} spin/>}
            >
                {loadingPage ? (
                    <div>Loading</div>
                ) : (
                    <Form
                        initialValues={{
                            name: category?.name,
                            description: category?.description,
                            parent: category?.parent,
                            is_children: isChild
                        }}
                        labelCol={{span: 9}}
                        onFinish={(data) => handleSubmit(data)}
                    >
                        <div
                            style={{
                                margin: 20,
                                backgroundColor: "transparent",
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <Card style={{width: "80%"}}>
                                <Row>
                                    <Col span={18}>
                                        <Form.Item
                                            name={"name"}
                                            label={"分类名称"}
                                            rules={[
                                                {required: true, message: "Please enter the name!"},
                                            ]}
                                        >
                                            <Input/>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={18}>
                                        <Form.Item name={"description"} label={"分类描述"}>
                                            <Input/>
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col span={18}>
                                        <Form.Item name={"is_children"} label={"是否有所属分类"}>
                                            <Switch onChange={() => {
                                                setIsChild(!isChild)
                                            }}/>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                {isChild ? (
                                    <Row>
                                        <Col span={18}>
                                            <Form.Item name={"parent"} label={"所属分类"}>
                                                <Select
                                                    options={parentSelections}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                ) : (
                                    <div></div>
                                )}
                                <Row>
                                    <Col>
                                        <Form.Item>
                                            <Button htmlType={"submit"}>更新</Button>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Card>
                        </div>
                    </Form>
                )}
            </Spin>
        </>
    );
};
