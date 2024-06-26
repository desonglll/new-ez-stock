import {Button, Card, Col, Form, Input, message, Row, Select, Switch} from "antd";
import {Category} from "../../utils/models.ts";
import axios from "axios";
import {get_headers} from "../../utils/basic.ts";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

export const CategoryAdd = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const instance = axios.create()
    const [parentSelections, setParentSelections] = useState([]);
    const [isChild, setIsChild] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            const parentData = await instance.get("api/categories/get_parent/")
            const parent = parentData.data.data.map((item: { pk: number; name: string; }) => ({
                    value: item.pk,
                    label: item.name
                }
            ))
            console.log(parent)
            setParentSelections(parent)
        }
        fetchData().then()
    }, []);
    const handleSubmit = (data: Category) => {
        if (!data.is_children) {
            data.parent = null
        }
        console.log(data);

        const instance = axios.create();
        instance
            .post("api/categories/", data, {
                headers: get_headers(),
            })
            .then((res) => {
                console.log(res);
            });
        success();
    };
    const success = () => {
        messageApi
            .open({
                type: "success",
                content: "Added successfully",
                duration: 1.5,
            })
            .then(() => {
                navigate("/workspace/warehouse/categories");
            });
    };
    return (
        <>
            {contextHolder}
            <Form labelCol={{span: 9}} onFinish={(data) => handleSubmit(data)}
                  initialValues={{
                      is_children: false
                  }}>
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
                                    <Button htmlType={"submit"}>添加</Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                </div>
            </Form>
        </>
    );
};
