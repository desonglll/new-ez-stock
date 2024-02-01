import ReactECharts from "echarts-for-react";
import { Card } from "antd";
import { StaticInfo } from "../components/StaticInfo.tsx";
import { useEffect, useState } from "react";
import { getProductInfo } from "../utils/products.ts";

const options = {
  grid: { top: 8, right: 8, bottom: 24, left: 36 },
  xAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: "line",
      smooth: true,
    },
  ],
  tooltip: {
    trigger: "axis",
  },
};

export function Analyze() {
  const [productInfo, setProductInfo] = useState({
    categories_count: 0,
    product_attributes: [],
    products_count: 0,
    valid_products_count: 0,
    supplier_info: [],
  });
  const [supplierInfo, setSupplierInfo] = useState<[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const product_info = await getProductInfo();
      setProductInfo(product_info.data);
      console.log(product_info.data);
      const supplier_info = product_info.data.supplier_info.map(
        (item: {
          name: string;
          pk: number;
          user: string;
          product_count: number;
        }) => ({
          name: item.name,
          value: item.product_count,
        }),
      );
      setSupplierInfo(supplier_info);
    };

    fetchData().finally();
  }, []);
  const demoOptions = {
    title: {
      text: "仪表盘",
      subtext: "产品状态",
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "left",
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: "50%",
        data: [
          {
            value: productInfo.products_count,
            name: "Product Count",
          },
          {
            value: productInfo.valid_products_count,
            name: "Valid Product Count",
          },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };
  const supplierProductOptions = {
    title: {
      text: "仪表盘",
      subtext: "Supplier Product",
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "left",
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: "50%",
        data: supplierInfo,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  return (
    <Card>
      <ReactECharts option={options} />
      <div style={{ display: "flex" }}>
        <ReactECharts
          style={{ height: "500px", width: "50%" }}
          option={demoOptions}
        />
        <ReactECharts
          style={{ height: "500px", width: "50%" }}
          option={supplierProductOptions}
        />
      </div>
      <StaticInfo />
    </Card>
  );
}
