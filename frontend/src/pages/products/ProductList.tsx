import { useEffect, useState } from "react";
import axios from "axios";
import * as React from "react";
import {
  Button,
  Card,
  message,
  Pagination,
  PaginationProps,
  Space,
  Spin,
  Table,
  TableColumnsType,
  Tag,
} from "antd";
import "bootstrap/dist/css/bootstrap.css";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

interface Product {
  key: React.Key;
  pk: number;
  owner: {}; // 你可能需要更改这里的类型，以匹配 User 模型的定义
  name: string;
  description: string | null;
  sku: string;
  // image: string | null;  // 这里你可能希望使用实际的图像 URL 类型
  // price: number | null;
  // discount_price: number | null;
  // is_discounted: boolean;
  // stock_quantity: number;
  is_in_stock: boolean;
  // categories: number[];  // 你可能需要更改这里的类型，以匹配 Category 模型的定义
  // created_at: string;  // 或者使用 Date 类型
  // updated_at: string;  // 或者使用 Date 类型
  // attributes: number[];  // 你可能需要更改这里的类型，以匹配 ProductAttribute 模型的定义
  // supplier: number | null;  // 你可能需要更改这里的类型，以匹配 Supplier 模型的定义
  // weight: number | null;
  // dimensions: string | null;
  // status: string;  // 根据 ProductStatus.choices 中的实际值更改类型
  // public: boolean;
  is_valid: boolean;
}

interface Result {
  count: number;
  next: string;
  previous: string;
  total_pages: number;
  results: Product[];
}

export function ProductList() {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [productList, setProductList] = useState<Product[]>([]);
  const [result, setResult] = useState<Result>({
    count: 0,
    next: "null",
    previous: "null",
    total_pages: 0,
    results: [],
  });
  const access = localStorage.getItem("access");
  const headers = {
    Authorization: `Bearer ${access}`,
    "Content-Type": "application/json",
  };
  const instance = axios.create();

  const fetchData = async (
    limit: number,
    offset: number,
    current_page: number,
  ) => {
    try {
      return await instance.get("/api/products/", {
        headers: headers,
        params: {
          limit: limit,
          offset: offset * (current_page - 1),
        },
      });
    } finally {
      setPageLoading(false);
    }
  };

  const updateData = (limit: number, offset: number, current_page: number) => {
    fetchData(limit, offset, current_page)
      .then((res) => {
        if (res.data) {
          setResult(res.data);
          setProductList(res.data.results);
        }
      })
      .catch((err) => {
        if (err.response.data.code === "token_not_valid") {
          console.log("token_not_valid");
          navigate("/login");
        }
      })
      .finally(() => {});
  };
  const handleEdit = (item: Product) => {
    navigate(`/products/${item.pk}`);
  };
  const handleDelete = (item: Product) => {
    instance
      .delete(`api/products/${item.pk}/delete/`, {
        headers: headers,
      })
      .finally();
    messageApi
      .open({
        type: "success",
        content: "Delete successfully",
      })
      .then(() => {
        window.location.reload();
      });
  };

  const deleteSelected = () => {
    instance
      .delete("api/products/delete/", {
        data: { delete_list: selectedRowKeys }, // 将数据放入 data 属性
        headers: headers,
      })
      .then((res) => {
        if (res.data.status === "success") {
          console.log("success");
          setDeleteLoading(true);
          // ajax request after empty completing
          setTimeout(() => {
            setSelectedRowKeys([]);
            updateData(10, 0, 1);
            setDeleteLoading(false);
          }, 1000);
        }
      })
      .finally();
  };
  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      updateData(10, 0, 1);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const [current, setCurrent] = useState(1);
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  const onPageChange: PaginationProps["onChange"] = (select_page) => {
    setCurrent(select_page);
    updateData(10, 10, select_page);
  };
  const onShowPageSizeChange = (current: number, size: number) => {
    updateData(size, 0, current);
  };

  const columns: TableColumnsType<Product> = [
    {
      title: "SKU",
      dataIndex: "sku",
      width: 200,
      sorter: (a, b) => a.sku.localeCompare(b.sku),
    },
    {
      title: "Name",
      dataIndex: "name",
      width: 300,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Is In Stock",
      dataIndex: "is_in_stock",
      render: (val: boolean) =>
        val ? (
          <Tag icon={<CheckCircleOutlined />} color="success">
            In Stock
          </Tag>
        ) : (
          <Tag icon={<CloseCircleOutlined />} color="error">
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
      onFilter: (value: any, record) => record.is_in_stock === value,
      width: 100,
    },
    {
      title: "Is Valid",
      dataIndex: "is_valid",
      render: (val: boolean) =>
        val ? (
          <Tag icon={<CheckCircleOutlined />} color="success">
            Valid
          </Tag>
        ) : (
          <Tag icon={<CloseCircleOutlined />} color="error">
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
      onFilter: (value: any, record) => record.is_valid === value,
      width: 100,
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record)}>Edited {record.pk}</a>
          <a onClick={() => handleDelete(record)}>Delete</a>
        </Space>
      ),
      width: 200,
    },
  ];

  useEffect(() => {
    updateData(10, 0, 1);
  }, []);

  const handleAdd = () => {
    console.log("handleAdd");
    navigate("add");
  };
  return (
    <>
      {contextHolder}
      <Spin
        indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
        spinning={pageLoading}
        tip="Loading..."
      >
        {pageLoading ? (
          <div>loading</div>
        ) : (
          <Card>
            <div
              style={{
                margin: 16,
              }}
            >
              <Button onClick={start} loading={loading}>
                Reload All
              </Button>
              <Button
                style={{ marginLeft: 8, marginRight: 8 }}
                onClick={handleAdd}
              >
                Add
              </Button>
              <Button
                type="primary"
                onClick={deleteSelected}
                disabled={!hasSelected}
                loading={deleteLoading}
                style={{ marginLeft: 8, marginRight: 8 }}
              >
                Delete
                <span style={{ marginLeft: 8 }}>
                  {hasSelected
                    ? `Selected ${selectedRowKeys.length} items`
                    : ""}
                </span>
              </Button>
            </div>
            <Card>
              <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={productList}
                rowKey={"pk"}
                pagination={false}
              />
              <Pagination
                showQuickJumper
                showSizeChanger
                onShowSizeChange={onShowPageSizeChange}
                style={{ marginTop: 20 }}
                defaultCurrent={1}
                current={current}
                total={result.count}
                showTotal={(total, range) =>
                  `${range[0]}-${range[1]} of ${total} items`
                }
                // defaultPageSize={20}
                onChange={onPageChange}
              />
            </Card>
          </Card>
        )}
      </Spin>
    </>
  );
}
