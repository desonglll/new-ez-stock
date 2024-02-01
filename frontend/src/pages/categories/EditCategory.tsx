import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Col, Form, Input, message, Row, Spin } from "antd";
import { useEffect, useState } from "react";
import { Category } from "../../utils/models.ts";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import { get_headers } from "../../utils/basic.ts";
import { get_category_by_pk } from "../../utils/categories.ts";

export const EditCategory = () => {
  const { pk } = useParams();
  const instance = axios.create();
  const [loadingPage, setLoadingPage] = useState(true);
  const [category, setCategory] = useState<Category>();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    const fetchData = async (pk: number) => {
      const res = await get_category_by_pk(pk);
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
        navigate("/categories");
      });
  };
  const handleSubmit = (data: Category) => {
    console.log(data);
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
        indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
      >
        {loadingPage ? (
          <div>Loading</div>
        ) : (
          <Form
            initialValues={{
              name: category?.name,
              description: category?.description,
            }}
            labelCol={{ span: 9 }}
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
              <Card style={{ width: "80%" }}>
                <Row>
                  <Col span={18}>
                    <Form.Item
                      name={"name"}
                      label={"Name"}
                      rules={[
                        { required: true, message: "Please enter the name!" },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={18}>
                    <Form.Item name={"description"} label={"Description"}>
                      <Input />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Item>
                      <Button htmlType={"submit"}>Update</Button>
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
