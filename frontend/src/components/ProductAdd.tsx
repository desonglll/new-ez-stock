import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Form,
  Input,
  message,
  Select,
  Space,
  Switch,
  DatePicker,
  Upload,
  Row,
  Col,
  Divider,
  UploadProps,
  Image,
  UploadFile,
} from "antd";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import {
  CheckOutlined,
  CloseOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { get_headers, get_local_access_code } from "../utils/basic.ts";
import { getSuppliers } from "../utils/suppliers.ts";
import { getCategories } from "../utils/categories.ts";
import { get_product_attributes } from "../utils/products.ts";
import { Product } from "../utils/models.ts";
import { UploadChangeParam } from "antd/es/upload";

const { TextArea } = Input;

interface ProductAddProps {
  drawerOpen: boolean;
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refreshData: () => void;
}

export const ProductAdd: React.FC<ProductAddProps> = ({
  drawerOpen,
  setDrawerOpen,
  refreshData,
}) => {
  const [suppliers, setSuppliers] = useState<[]>([]);
  const [categories, setCategories] = useState<[]>([]);
  const [productAttr, setProductAttr] = useState<[]>([]);
  const [isDiscount, setIsDiscount] = useState(false);
  const navigate = useNavigate();
  const instance = axios.create();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
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
    onChange(
      event: UploadChangeParam<
        UploadFile<{
          image_url: string;
        }>
      >
    ) {
      if (event.file && event.file.response && event.file.response.image_url) {
        setImageURL(event.file.response.image_url);
        setImagePreviewURL(event.file.response.image_url);
      } else {
        console.error("Unexpected response structure:", event);
      }
    },
  };
  const success = () => {
    messageApi
      .open({
        type: "success",
        content: "Updated successfully",
        duration: 1.5,
      })
      .then(() => {
        // navigate("/warehouse/products");
        setDrawerOpen(!drawerOpen);
        refreshData();
      });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        /**
         * Get suppliers selection
         */
        setSuppliers(await getSuppliers());

        /**
         * Get categories selection
         */
        const cateResponseData = await getCategories();
        const cate = cateResponseData.map(
          (item: {
            pk: number;
            user: number;
            name: string;
            description: string;
          }) => ({
            label: item.name,
            value: item.pk,
          })
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
          })
        );
        setProductAttr(product_attr);
      } catch (err) {
        console.log("err: ", err);
        navigate("/login");
      } finally {
        console.log("finally");
      }
    };
    fetchData().finally();
  }, []);
  const onFormFinish = (val: Product) => {
    val["image"] = imageURL;
    console.log(val);
    instance
      .post(`api/products/`, val, {
        headers: get_headers(),
      })
      .then();
    success();
  };
  const normFile = (e: { fileList: FileList }) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <>
      {contextHolder}
      <Card>
        <Form
          labelCol={{ span: 9 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          form={form}
          onFinish={onFormFinish}
          initialValues={{
            created_at: dayjs(),
            updated_at: dayjs(),
          }}
        >
          <Divider></Divider>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please enter the name!" }]}
              >
                <Input placeholder="Enter the name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Price"
                name="price"
                rules={[{ message: "Please enter the price!" }]}
              >
                <Input prefix="￥" suffix="RMB" placeholder="Enter the price" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Created At" name="created_at">
                <DatePicker showTime disabled />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Updated At" name={"updated_at"}>
                <DatePicker showTime />
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
                  showSearch={true}
                  style={{ width: "100%" }}
                  options={categories}
                  onSearch={(value: string) => {
                    console.log("search:", value);
                  }}
                  filterOption={(
                    input: string,
                    option?: {
                      label: string;
                      value: string;
                    }
                  ) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name={"attributes"} label="Attributes">
                <Select
                  mode="multiple"
                  size={"middle"}
                  placeholder="Please select"
                  showSearch={true}
                  style={{ width: "100%" }}
                  options={productAttr}
                  onSearch={(value: string) => {
                    console.log("search:", value);
                  }}
                  filterOption={(
                    input: string,
                    option?: {
                      label: string;
                      value: string;
                    }
                  ) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item name={"supplier"} label="Supplier">
                <Select
                  showSearch={true}
                  onSearch={(value: string) => {
                    console.log("search:", value);
                  }}
                  filterOption={(input, option) =>
                    ((option && option.children) || "")
                      .toString()
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                >
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
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
          <Divider></Divider>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name={"description"} label={"Description"}>
                <TextArea
                  showCount
                  maxLength={100}
                  // onChange={onChange}
                  placeholder="disable resize"
                  style={{ height: 120, resize: "none" }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Row>
                <Col span={9}></Col>
                <div style={{ width: 120, height: 120 }}>
                  {imagePreviewURL === "" ? (
                    <div>Noo image</div>
                  ) : (
                    <Image width={120} height={120} src={imagePreviewURL} />
                  )}
                </div>
              </Row>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name={"is_valid"}
                label="Valid"
                valuePropName="checked"
              >
                <Switch
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name={"is_discounted"} label="Discounted">
                <Switch
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
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
              <Input prefix="￥" suffix="RMB" />
            </Form.Item>
          ) : null}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name={"is_in_stock"} label="InStock">
                <Switch
                  checkedChildren={<CheckOutlined />}
                  unCheckedChildren={<CloseOutlined />}
                />
              </Form.Item>
            </Col>
          </Row>
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
    </>
  );
};
