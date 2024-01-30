import React, { FC, ReactElement, useState } from "react";
import { Button, Container } from "react-bootstrap";
import CreateBrand from "src/components/modals/CreateBrand";
import CreateCategory from "src/components/modals/CreateCategory";
import CreateProduct from "src/components/modals/CreateProduct";

const Admin: FC = (): ReactElement => {
  const [categoryVisible, setCategoryVisible] = useState<boolean>(false);
  const [brandVisible, setBrandVisible] = useState<boolean>(false);
  const [productVisible, setProductVisible] = useState<boolean>(false);

  return (
    <Container className="d-flex flex-column">
      <Button
        variant="outline-dark"
        className="mt-4 p-2"
        onClick={() => setCategoryVisible(true)}
      >
        Добавить категорию
      </Button>
      <Button
        variant="outline-dark"
        className="mt-4 p-2"
        onClick={() => setBrandVisible(true)}
      >
        Добавить бренд
      </Button>
      <Button
        variant="outline-dark"
        className="mt-4 p-2"
        onClick={() => setProductVisible(true)}
      >
        Добавить товар
      </Button>
      <CreateCategory
        show={categoryVisible}
        onHide={() => setCategoryVisible(false)}
      />
      <CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
      <CreateProduct
        show={productVisible}
        onHide={() => setProductVisible(false)}
      />
    </Container>
  );
};

export default Admin;
