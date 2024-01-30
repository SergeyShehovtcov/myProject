import React, {
  FC,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import { Button, Col, Dropdown, Form, Modal, Row } from "react-bootstrap";
import { Modal as TModal } from "src/components/modals/index";
import {
  createProduct,
  fetchBrands,
  fetchCategories,
} from "src/http/productApi";
import { Context } from "src/index";
import { Brand, Category, Info } from "src/serverTypes";
import { observer } from "mobx-react-lite";

const CreateProduct: FC<TModal> = observer(({ show, onHide }): ReactElement => {
  const { product } = useContext(Context);
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [file, setFile] = useState<any>(null);
  const [info, setInfo] = useState<
    Pick<Info, "number" | "title" | "description">[]
  >([]);

  useEffect(() => {
    fetchCategories().then((data) => product.setCategories(data));
    fetchBrands().then((data) => product.setBrands(data));
  }, []);

  const addInfo = (): void => {
    setInfo([...info, { title: "", description: "", number: Date.now() }]);
  };

  const removeInfo = (number: number): void => {
    setInfo(info.filter((i) => i.number !== number));
  };

  const changeInfo = (key: string, value: string, number: number): void => {
    setInfo(
      info.map((i) => (i.number === number ? { ...i, [key]: value } : i)),
    );
  };

  const selectFile = (e: any) => {
    setFile(e.target.files[0]);
  };

  const addProduct = (): void => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", `${price}`);
    formData.append("img", file);
    formData.append("brandId", product.selectedBrand.id);
    formData.append("categoryId", product.selectedCategory.id);
    formData.append("info", JSON.stringify(info));
    createProduct(formData).then((data) => onHide());
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить новый товар
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>
              {product.selectedCategory?.name || "Выберите категорию"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {product.categories.map((category: Category) => (
                <Dropdown.Item
                  key={category.id}
                  onClick={() => product.setSelectedCategory(category)}
                >
                  {category.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="mt-2 mb-2">
            <Dropdown.Toggle>
              {product.selectedBrand?.name || "Выберите бренд"}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {product.brands.map((brand: Brand) => (
                <Dropdown.Item
                  key={brand.id}
                  onClick={() => product.setSelectedBrand(brand)}
                >
                  {brand.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-3"
            placeholder="Введите название товара"
          />
          <Form.Control
            value={price}
            onChange={(e) => setPrice(+e.target.value)}
            className="mt-3"
            placeholder="Введите стоймость товара"
            type="number"
          />
          <Form.Control className="mt-3" type="file" onChange={selectFile} />
          <hr />
          <Button variant="outline-dark" onClick={addInfo}>
            Добавить свойста товара
          </Button>
          {info.map((i) => (
            <Row key={i.number} className="mt-4">
              <Col md={4}>
                <Form.Control
                  value={i.title}
                  onChange={(e) =>
                    changeInfo("title", e.target.value, i.number)
                  }
                  placeholder="Введите название свойства"
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  value={i.description}
                  onChange={(e) =>
                    changeInfo("description", e.target.value, i.number)
                  }
                  placeholder="Введите описание свойства"
                />
              </Col>
              <Col md={4}>
                <Button
                  onClick={() => removeInfo(i.number)}
                  variant="outline-danger"
                >
                  Удалить
                </Button>
              </Col>
            </Row>
          ))}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>
        <Button variant="outline-success" onClick={addProduct}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateProduct;
