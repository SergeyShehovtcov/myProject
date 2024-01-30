import React, { FC, ReactElement, useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import BrandBar from "src/components/BrandBar";
import CategoryBar from "src/components/CategoryBar";
import ProductList from "src/components/ProductList";
import {
  fetchCategories,
  fetchBrands,
  fetchProducts,
} from "src/http/productApi";
import { Context } from "src/index";
import { observer } from "mobx-react-lite";

const Shop: FC = observer((): ReactElement => {
  const { product } = useContext(Context);

  useEffect(() => {
    fetchCategories().then((data) => product.setCategories(data));
    fetchBrands().then((data) => product.setBrands(data));
    fetchProducts(null, null, 1, 2).then((data) => {
      product.setProducts(data.rows);
      product.setTotalCount(data.count);
    });
  }, []);

  return (
    <Container>
      <Row className="mt-2">
        <Col md={3}>
          <CategoryBar />
        </Col>
        <Col md={9}>
          <BrandBar />
          <ProductList />
        </Col>
      </Row>
    </Container>
  );
});

export default Shop;
