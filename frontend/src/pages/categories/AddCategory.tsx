import {Button, Card, Col, Form, Input, message, Row, Select, Switch} from "antd";
import {Category} from "../../utils/models.ts";
import axios from "axios";
import {get_headers} from "../../utils/basic.ts";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

export const AddCategory = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const instance = axios.create()
    const [parentSelections, setParentSelections] = useState([]);
    const [isParent, setIsParent] = useState(false);
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
                navigate("/warehouse/categories");
            });
    };
    return (
        <>
            {contextHolder}
            <Form labelCol={{span: 9}} onFinish={(data) => handleSubmit(data)}>
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
                                    label={"Name"}
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
                                <Form.Item name={"description"} label={"Description"}>
                                    <Input/>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={18}>
                                <Form.Item name={"is_parent"} label={"Is Parent"}>
                                    <Switch onChange={() => {
                                        setIsParent(!isParent)
                                    }}/>
                                </Form.Item>
                            </Col>
                        </Row>
                        {!isParent ? (
                            <Row>
                                <Col span={18}>
                                    <Form.Item name={"parent"} label={"Parent Name"}>
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
                                    <Button htmlType={"submit"}>Add</Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Card>
                </div>
            </Form>
        </>
    );
};
