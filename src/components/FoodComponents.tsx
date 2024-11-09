"use client";
import { useState } from "react";
import { Card, Checkbox, Row, Col, Select } from "antd";
import Image from "next/image";

const { Option } = Select;
const dishes = [
  {
    name: "Trà sữa",
    image: "/images/Tra-sua-truyen-thong.png",
    category: "Đồ uống",
  },
  {
    name: "Bánh tráng",
    image: "/images/banh-trang.jpeg",
    category: "Đồ ăn vặt",
  },
  { name: "Cá viên", image: "/images/ca-vien.png", category: "Đồ ăn vặt" },
  { name: "Hủ tiếu", image: "/images/hu-tieu.png", category: "Món ăn chính" },
  { name: "Cơm tấm", image: "/images/com-tam.png", category: "Món ăn chính" },
  { name: "Bánh mì", image: "/images/banh-mi.jpg", category: "Món ăn chính" },
  { name: "Phở", image: "/images/pho.png", category: "Món ăn chính" },
  {
    name: "Bún bò Huế",
    image: "/images/bun-bo-hue.png",
    category: "Món ăn chính",
  },
  { name: "Gỏi cuốn", image: "/images/goi-cuon.png", category: "Đồ ăn vặt" },
  {
    name: "Chè đậu xanh",
    image: "/images/che-dau-xanh.png",
    category: "Món tráng miệng",
  },
  { name: "Nem rán", image: "/images/nem-ran.png", category: "Món ăn chính" },
  {
    name: "Cà phê sữa đá",
    image: "/images/ca-phe-sua-da.jpg",
    category: "Đồ uống",
  },
  { name: "Xôi gà", image: "/images/xoi-ga.png", category: "Món ăn chính" },
  {
    name: "Bánh flan",
    image: "/images/banh-flan.png",
    category: "Món tráng miệng",
  },
  { name: "Mực xào", image: "/images/muc-xao.png", category: "Món ăn chính" },
  { name: "Nước mía", image: "/images/nuoc-mia.png", category: "Đồ uống" },
];

const categories = [
  "All",
  "Đồ uống",
  "Đồ ăn vặt",
  "Món ăn chính",
  "Món tráng miệng",
  "Món ăn chay",
];

export default function Home() {
  const [selectedDishes, setSelectedDishes] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const handleSelectDish = (dish: string) => {
    if (selectedDishes.includes(dish)) {
      setSelectedDishes(selectedDishes.filter((item) => item !== dish));
    } else {
      setSelectedDishes([...selectedDishes, dish]);
    }
  };

  const filteredDishes =
    selectedCategory === "All"
      ? dishes
      : dishes.filter((dish) => dish.category === selectedCategory);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl mb-4 text-center">Restaurant Name</h1>
      <Select
        defaultValue="All"
        style={{ width: 200, marginBottom: 16 }}
        onChange={setSelectedCategory}
      >
        {categories.map((category) => (
          <Option key={category} value={category}>
            {category}
          </Option>
        ))}
      </Select>
      <Row gutter={[16, 16]} justify="center">
        {filteredDishes.map((dish) => (
          <Col xs={24} sm={12} md={8} key={dish.name}>
            <Card
              hoverable
              cover={
                <Image
                  alt={dish.name}
                  src={dish.image}
                  layout="responsive" // Đảm bảo hình ảnh có thể điều chỉnh kích thước
                  width={300} // Chiều rộng cố định
                  height={200} // Chiều cao cố định
                  className="!w-[300px] !h-[200px]"
                />
              }
              actions={[
                <Checkbox
                  checked={selectedDishes.includes(dish.name)}
                  onChange={() => handleSelectDish(dish.name)}
                >
                  Select
                </Checkbox>,
              ]}
            >
              {/* <Card.Meta title={dish.name} description={dish.category} /> */}
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
