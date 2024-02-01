import { useEffect, useState } from "react";
import { getSuppliers } from "../../utils/suppliers.ts";
import { Button, Card, message, Space, Spin, Table, TableProps } from "antd";
import { Supplier } from "../../utils/models.ts";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { get_headers } from "../../utils/basic.ts";
import * as React from "react";

export const SupplierList = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [loadingPage, setLoadingPage] = useState(true);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const handleEdit = (event: any) => {
    console.log(event);
    navigate(`/suppliers/${event.pk}`);
  };
  const handleDelete = (event: any) => {
    console.log(event);
    const instance = axios.create();
    instance
      .delete(`api/suppliers/${event.pk}/delete/`, {
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
  const [supplierData, setSupplierData] = useState<Supplier[]>([]);
  const columns: TableProps<Supplier>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
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
      const suppliers_data = await getSuppliers();
      const data: Supplier[] = suppliers_data.map((item: Supplier) => ({
        pk: item.pk,
        name: item.name,
      }));
      setSupplierData(data);
    };
    fetchData()
      .then(() => {})
      .finally(() => {
        setLoadingPage(!loadingPage);
        console.log(loadingPage);
      });
  }, []);
  return (
    <>
      <Spin spinning={loadingPage}>
        {contextHolder}
        {loadingPage ? (
          <div>Loading</div>
        ) : (
          <Card style={{ margin: 16 }}>
            <div>
              <Button
                style={{ marginBottom: 16 }}
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
                dataSource={supplierData}
                pagination={false}
              />
            </Card>
          </Card>
        )}
      </Spin>
    </>
  );
};
