import React, { FC, ReactElement, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { createBrand } from "src/http/productApi";
import { Modal as TModal } from "src/components/modals/index";

const CreateBrand: FC<TModal> = ({ show, onHide }): ReactElement => {
  const [value, setValue] = useState<string>("");

  const addBrand = (): void => {
    createBrand({ name: value }).then((data) => {
      setValue("");
      onHide();
    });
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить бренд
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Введите название бренда"
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>
        <Button variant="outline-success" onClick={addBrand}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateBrand;
