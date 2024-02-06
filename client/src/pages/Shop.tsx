import React, { FC, ReactElement, useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Col, Container, Row } from "react-bootstrap";

import BrandBar from "src/components/BrandBar";
import CategoryBar from "src/components/CategoryBar";
import ProductList from "src/components/ProductList";
import Pages from "src/components/Pages";
import { fetchCategories, fetchBrands, fetchProducts } from "src/http/productApi";
import { Context } from "src/index";


const Shop: FC = observer((): ReactElement => {
  const { product } = useContext(Context);

  useEffect(() => {
    fetchCategories().then((data) => product.setCategories(data));
    fetchBrands().then((data) => product.setBrands(data));
    fetchProducts(null, null, 1, 3).then((data) => {
      product.setProducts(data.rows);
      product.setTotalCount(data.count);
    });
  }, []);

  useEffect(() => {
    fetchProducts(product.selectedCategory?.id, product.selectedBrand?.id, product.page, 3).then((data) => {
      product.setProducts(data.rows);
      product.setTotalCount(data.count);
    });
  }, [product.page, product.selectedCategory, product.selectedBrand]);

  return (
    <Container>
      <Row className="mt-2">
        <Col md={3}>
          <CategoryBar />
        </Col>
        <Col md={9}>
          <BrandBar />
          <ProductList />
          <Pages />
        </Col>
      </Row>
    </Container>
  );
});

export default Shop;
