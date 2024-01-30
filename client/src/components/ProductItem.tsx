import React, { FC, ReactElement } from "react";
import { Card, Col, Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Product } from "src/serverTypes";
import { BASE_URL, PRODUCT_ROUTE } from "src/utils/constants";
import star from "src/assets/star.png";

const ProductItem: FC<
  Omit<Product, "brandId" | "categoryId" | "createdAt" | "updatedAt" | "info">
> = ({ id, name, price, rating, img }): ReactElement => {
  const history = useHistory();

  return (
    <Col
      md={3}
      className="mt-3"
      onClick={() => history.push(`${PRODUCT_ROUTE}/${id}`)}
    >
      <Card style={{ width: 150, cursor: "pointer" }} border="light">
        <Image width={150} height={150} src={`${BASE_URL}/${img}`} />
        <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
          <div>{name}</div>
          <div className="d-flex align-items-center">
            <div>{rating}</div>
            <Image width={18} height={18} src={star} />
          </div>
        </div>
        <div>{price} руб.</div>
      </Card>
    </Col>
  );
};

export default ProductItem;
