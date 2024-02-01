import { Col, Row, Statistic } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

interface Info {
  categories_count: number;
  product_attributes: [];
  products_count: number;
}

export function StaticInfo() {
  const instance = axios.create();
  const [infoData, setInfoData] = useState<Info>({
    categories_count: 0,
    product_attributes: [],
    products_count: 0,
  });

  const fetchData = async () => {
    try {
      await instance.get("api/product_info/").then((res) => {
        console.log(res.data.data);
        setInfoData(res.data.data);
      });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Statistic title="产品总数" value={infoData.products_count} />
        </Col>
      </Row>
    </>
  );
}
