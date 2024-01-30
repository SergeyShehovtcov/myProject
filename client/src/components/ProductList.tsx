import React, { FC, ReactElement, useContext } from "react";
import { Row } from "react-bootstrap";
import { Context } from "src/index";
import { Product } from "src/serverTypes";
import ProductItem from "./ProductItem";
import { observer } from "mobx-react-lite";

const ProductList: FC = observer((): ReactElement => {
  const { product } = useContext(Context);

  return (
    <Row className="d-flex">
      {product.products.map(({ id, name, price, rating, img }: Product) => (
        <ProductItem
          key={id}
          id={id}
          name={name}
          price={price}
          rating={rating}
          img={img}
        />
      ))}
    </Row>
  );
});

export default ProductList;
