import {useNavigate, useParams} from "react-router-dom";
import {
    Button,
    Card,
    Form,
    Input,
    message,
    Select,
    Space,
    Spin,
    Switch,
    Typography,
    Image,
    DatePicker,
    Upload,
    Row,
    Col,
    Divider,
    UploadProps,
} from "antd";
import {useEffect, useState} from "react";
import {get_product_attributes, getProductByPk} from "../../utils/products.ts";
import {Product} from "../../utils/models.ts";
import "bootstrap/dist/css/bootstrap.css";
import {getSuppliers} from "../../utils/suppliers.ts";
import axios from "axios";
import {
    CheckOutlined,
    CloseOutlined,
    LoadingOutlined,
    UploadOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import {get_headers, get_local_access_code} from "../../utils/basic.ts";

const {TextArea} = Input;
export const ProductEdit = () => {
    /**
     * Passed param
     */
    const {pk} = useParams();

    /**
     * This variable is for detail object received from backend
     */
    const [item, setItem] = useState<Product>();
    /**
     * For supplier selections
     */
    const [suppliers, setSuppliers] = useState<[]>([]);
    /**
     * For category selections
     */
    const [categories, setCategories] = useState<[]>([]);
    const [productAttr, setProductAttr] = useState<[]>([]);
    const [form] = Form.useForm();

    /**
     * For control the initial value of switch by given detail message
     */
    const [isDiscount, setIsDiscount] = useState(false);

    /**
     * Waiting for the detail message load for enter the page at the first time
     */
    const [pageLoading, setPageLoading] = useState(true);

    /**
     * For navigate to some basic page if something wrong happened
     */
    const navigate = useNavigate();

    /**
     * This is axios instance.
     * For send http request to the backend server.
     */
    const instance = axios.create();

    /**
     * For global success message
     */
    const [messageApi, contextHolder] = message.useMessage();

    /**
     * For receiving the image url after upload to backend successfully.
     */
    const [imageURL, setImageURL] = useState("");

    /**
     *  Url for displaying preview image.
     */
    const [imagePreviewURL, setImagePreviewURL] = useState("");

    /**
     * Configuration for upload element.
     */
    const props: UploadProps = {
        name: "image",
        action: `${axios.defaults.baseURL}/api/upload/`,
        headers: {
            Authorization: `Bearer ${get_local_access_code()}`,
        },
        onChange(event) {
            if (event.file && event.file.response && event.file.response.image_url) {
                setImageURL(event.file.response.image_url);
                setImagePreviewURL(event.file.response.image_url);
                success();
            } else {
                console.log(event)
            }
        },
    };

    /**
     * For global success message.
     * @param msg
     */
    const success = (msg = "Operation") => {
        messageApi
            .open({
                type: "success",
                content: `${msg} successfully`,
                duration: 1.5,
            })
            .then();
    };

    /**
     * useEffect hook function.
     */
    useEffect(() => {
        const fetchData = async (pk: number) => {
            try {
                const result = await getProductByPk(pk); // Getting product detail directly
                setItem(result);
                /**
                 * Update image preview url after grab the detail information
                 */
                if (result.image !== "") {
                    setImagePreviewURL(result.image);
                }
                setIsDiscount(result.is_discounted);

                /**
                 * Get suppliers selection
                 */
                setSuppliers(await getSuppliers());

                /**
                 * Get categories selection
                 */
                const cateResponseData = await instance.get("api/categories/get_sub/");
                const cate = cateResponseData.data.data.map(
                    (item: {
                        pk: number;
                        user: number;
                        name: string;
                        description: string;
                    }) => ({
                        label: item.name,
                        value: item.pk,
                    }),
                );
                setCategories(cate);

                /**
                 * Get products attributes
                 */
                const productAttrResponseData = await get_product_attributes();
                const product_attr = productAttrResponseData.map(
                    (item: { name: string; pk: number; value: string }) => ({
                        label: item.name,
                        value: item.pk,
                    }),
                );
                setProductAttr(product_attr);
            } catch (err) {
                /**
                 * Redirect to basic page after error occurred.
                 */
                console.log("err: ", err);
                navigate("/login");
            } finally {
                setPageLoading(false);
            }
        };
        fetchData(Number(pk)).finally();
    }, []);

    /**
     * Form submit to backend api
     * @param val
     */
    const onFormFinish = (val: Product) => {
        val["image"] = imageURL;
        console.log(val);
        instance
            .put(`api/products/${pk}/update/`, val, {
                headers: get_headers(),
            })
            .then((res) => {
                console.log(res.data);
                success();
            });
    };
    const normFile = (e: any) => {
        console.log("Upload event:", e);
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };
    return (
        <>
            {contextHolder}

            <Spin
                indicator={<LoadingOutlined style={{fontSize: 24}} spin/>}
                spinning={pageLoading}
                tip="Loading..."
            >
                {pageLoading ? (
                    <div>loading</div>
                ) : (
                    <div
                        style={{
                            margin: 20,
                            backgroundColor: "transparent",
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <Card>
                            <Form
                                labelCol={{span: 9}}
                                wrapperCol={{span: 14}}
                                layout="horizontal"
                                form={form}
                                onFinish={onFormFinish}
                                initialValues={{
                                    name: item?.name,
                                    price: item?.price,
                                    categories: item?.categories,
                                    supplier: item?.supplier,
                                    is_valid: item?.is_valid,
                                    attributes: item?.attributes,
                                    description: item?.description,
                                    is_discounted: item?.is_discounted,
                                    discount_price: item?.is_discounted ? item.discount_price : 0,
                                    created_at: dayjs(item?.created_at),
                                    updated_at: dayjs(item?.updated_at),
                                }}
                            >
                                <div style={{display: "flex", margin: 20}}>
                                    <Card style={{width: "fit-content", height: "fit-content"}}>
                                        <Row gutter={24}>
                                            <Col span={24}>
                                                <Typography.Title level={3}>
                                                    SKU: {item?.sku}
                                                </Typography.Title>
                                            </Col>
                                        </Row>
                                    </Card>
                                </div>
                                <Divider></Divider>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item
                                            label="Name"
                                            name="name"
                                            rules={[
                                                {required: true, message: "Please enter the name!"},
                                            ]}
                                        >
                                            <Input placeholder="Enter the name"/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label="Price"
                                            name="price"
                                            rules={[{message: "Please enter the price!"}]}
                                        >
                                            <Input
                                                prefix="￥"
                                                suffix="RMB"
                                                placeholder="Enter the price"
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item label="Created At" name="created_at">
                                            <DatePicker showTime disabled/>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item label="Updated At" name={"updated_at"}>
                                            <DatePicker showTime/>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item name={"categories"} label="Categories">
                                            <Select
                                                mode="multiple"
                                                size={"middle"}
                                                placeholder="Please select"
                                                // onChange={handleChange}
                                                showSearch={true}
                                                style={{width: "100%"}}
                                                options={categories}
                                                onSearch={(value: string) => {
                                                    console.log('search:', value);
                                                }}
                                                filterOption={(input: string, option?: {
                                                    label: string;
                                                    value: string
                                                }) =>
                                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item name={"attributes"} label="Attributes">
                                            <Select
                                                showSearch={true}
                                                mode="multiple"
                                                size={"middle"}
                                                placeholder="Please select"
                                                // onChange={handleChange}
                                                style={{width: "100%"}}
                                                options={productAttr}
                                                onSearch={(value: string) => {
                                                    console.log('search:', value);
                                                }}
                                                filterOption={(input: string, option?: {
                                                    label: string;
                                                    value: string
                                                }) =>
                                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item name={"supplier"} label="Supplier">
                                            <Select
                                                showSearch={true}
                                                onSearch={(value: string) => {
                                                    console.log('search:', value);
                                                }}
                                                filterOption={(input: string, option?: {
                                                    label: string;
                                                    value: string
                                                }) =>
                                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}>
                                                {suppliers.map((item: { pk: string; name: string }) => (
                                                    <Select.Option key={item.pk} value={item.pk}>
                                                        {item.name}
                                                    </Select.Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label="Image"
                                            name="image"
                                            // 以下两条是必须的
                                            valuePropName="fileList"
                                            // 如果没有下面这一句会报错
                                            getValueFromEvent={normFile}
                                        >
                                            <Upload {...props}>
                                                <Button icon={<UploadOutlined/>}>
                                                    Click to Upload
                                                </Button>
                                            </Upload>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Divider/>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item name={"description"} label={"Description"}>
                                            <TextArea
                                                showCount
                                                maxLength={100}
                                                // onChange={onChange}
                                                placeholder="disable resize"
                                                style={{height: 120, resize: "none"}}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Row>
                                            <Col span={9}></Col>
                                            <div style={{width: 120, height: 120}}>
                                                {imagePreviewURL === "" ? (
                                                    <div>Noo image</div>
                                                ) : (
                                                    <Image
                                                        width={120}
                                                        height={120}
                                                        src={imagePreviewURL}
                                                    />
                                                )}
                                            </div>
                                        </Row>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item
                                            name={"is_valid"}
                                            label="Is Valid"
                                            valuePropName="checked"
                                            style={{width: 500}}
                                        >
                                            <Switch
                                                checkedChildren={<CheckOutlined/>}
                                                unCheckedChildren={<CloseOutlined/>}
                                            />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item name={"is_discounted"} label="Is Discounted">
                                            <Switch
                                                checkedChildren={<CheckOutlined/>}
                                                unCheckedChildren={<CloseOutlined/>}
                                                onChange={(e: boolean) => {
                                                    console.log(e);
                                                    setIsDiscount(e);
                                                }}
                                            />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                {isDiscount ? (
                                    <Form.Item name={"discount_price"} label={"Discount Price"}>
                                        <Input prefix="￥" suffix="RMB"/>
                                    </Form.Item>
                                ) : null}
                                <Form.Item label={"Actions"}>
                                    <Space>
                                        <Button type="primary" htmlType="submit">
                                            Submit
                                        </Button>
                                        <Button
                                            htmlType="button"
                                            onClick={() => {
                                                form.resetFields();
                                            }}
                                        >
                                            Reset
                                        </Button>
                                    </Space>
                                </Form.Item>
                            </Form>
                        </Card>
                    </div>
                )}
            </Spin>
        </>
    );
};
