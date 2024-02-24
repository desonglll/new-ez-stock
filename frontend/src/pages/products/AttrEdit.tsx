import {useNavigate, useParams} from "react-router-dom";
import {Button, Card, Form, Input, message, Spin, Typography} from "antd";
import FormItem from "antd/es/form/FormItem";
import {useEffect, useState} from "react";
import {get_product_attribute_by_pk} from "../../utils/products.ts";
import {ProductAttribute} from "../../utils/models.ts";
import {LoadingOutlined} from "@ant-design/icons";
import axios from "axios";
import {get_headers} from "../../utils/basic.ts";

export const AttrEdit = () => {
    const {pk} = useParams()
    const [attribute, setAttribute] = useState<ProductAttribute>();
    const [loadingPage, setLoadingPage] = useState(true)
    const instance = axios.create()
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate()

    const success = () => {
        messageApi
            .open({
                type: "success",
                content: "Updated successfully",
                duration: 1.5,
            })
            .then(() => {
                navigate("/products-attr");
            });
    };
    useEffect(() => {
        const fetchData = async () => {
            const res = await get_product_attribute_by_pk(Number(pk))
            setAttribute(res)
        }
        fetchData().then().finally(() => {
            setLoadingPage(!loadingPage)
        })

    }, []);
    const onFinish = (item: ProductAttribute) => {
        console.log(item)
        instance.put(`api/products/product_attributes/${pk}/update/`, item, {
            headers: get_headers()
        }).then(r => {
            console.log(r)
        })
        success();
    }
    return (
        <>
            {contextHolder}
            <Spin spinning={loadingPage} indicator={<LoadingOutlined style={{fontSize: 24}} spin/>}
            >
                {loadingPage ? (
                    <div>Loading
                    </div>
                ) : (
                    <div style={{display: "flex", justifyContent: "center"}}>
                        <Card style={{width: "70vw"}}>
                            <Typography.Title level={3}>
                                Edit {pk}
                            </Typography.Title>
                            <Form
                                initialValues={{
                                    name: attribute?.name,
                                    value: attribute?.value
                                }}
                                onFinish={onFinish}
                            >
                                <FormItem name={"name"} label={"Name"} rules={[
                                    {required: true, message: "Please enter the name!"},
                                ]}>
                                    <Input/>
                                </FormItem>
                                <FormItem name={"value"} label={"Value"} rules={[
                                    {required: true, message: "Please enter the value!"},
                                ]}>
                                    <Input/>
                                </FormItem>
                                <FormItem>
                                    <Button htmlType={"submit"}>Update</Button>
                                </FormItem>
                            </Form>
                        </Card>
                    </div>
                )}
            </Spin>
        </>
    );
};