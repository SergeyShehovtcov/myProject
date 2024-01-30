import { observer } from "mobx-react-lite";
import React, { FC, ReactElement, useContext } from "react";
import { Card, Row } from "react-bootstrap";
import { Context } from "src/index";
import { Brand } from "src/serverTypes";

const BrandBar: FC = observer((): ReactElement => {
  const { product } = useContext(Context);

  return (
    <Row className="d-flex">
      {product.brands.map((brand: Brand) => (
        <Card
          key={brand.id}
          style={{ cursor: "pointer", width: 100, border: "1px solid ligth" }}
          className="p-3"
          onClick={() => product.setSelectedBrand(brand)}
          border={brand.id === product.selectedBrand?.id ? "danger" : "ligth"}
        >
          {brand.name}
        </Card>
      ))}
    </Row>
  );
});

export default BrandBar;
