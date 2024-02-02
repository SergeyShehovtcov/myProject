import React, { FC, ReactElement, useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Col, Container, Row, Image, Card, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { fetchOneProduct } from "src/http/productApi";
import { Product as ProductType } from "src/serverTypes";
import { BASE_URL } from "src/utils/constants";
import bigStar from "src/assets/bigStar.png";
import { Context } from "src/index";

const Product: FC = observer((): ReactElement => {
  const { basket } = useContext(Context); 
  const [product, setProduct] = useState<ProductType>();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    fetchOneProduct(+id).then((data) => setProduct(data));
  }, []);

  return (
    <Container className="mt-3">
      <Row>
        <Col md={4}>
          <Image width={300} height={300} src={`${BASE_URL}/${product?.img}`} />
        </Col>
        <Col md={4}>
          <Row className="d-flex flex-column align-items-center">
            <h2>{product?.name}</h2>
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                background: `url(${bigStar}) no-repeat center center`,
                width: 240,
                height: 240,
                backgroundSize: "cover",
                fontSize: 64,
              }}
            >
              {product?.rating}
            </div>
          </Row>
        </Col>
        <Col md={4}>
          <Card
            className="d-flex flex-column align-items-center justify-content-around"
            style={{
              width: 300,
              height: 300,
              fontSize: 32,
              border: "5px solid lightgray",
            }}
          >
            <h3>Цена: {product?.price} руб. </h3>
            <Button variant="outline-dark" onClick={() => basket.add(product)}>Добавить в корзину </Button>
            <h3>В корзине: ({basket.count}) ед.</h3>
          </Card>
        </Col>
      </Row>
      <Row className="d-flex flex-column m-3">
        <h1>Характеристики</h1>
        {product?.info.map((info, index) => (
          <Row
            key={info.id}
            style={{
              background: index % 2 === 0 ? "lightgray" : "transparent",
              padding: 10,
            }}
          >
            {info.title}: {info.description}
          </Row>
        ))}
      </Row>
    </Container>
  );
});

export default Product;
