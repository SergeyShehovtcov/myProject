import React, { FC, ReactElement, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Modal as TModal } from "src/components/modals/index";
import { createCategory } from "src/http/productApi";

const CreateCategory: FC<TModal> = ({ show, onHide }): ReactElement => {
  const [value, setValue] = useState<string>("");

  const addCategory = (): void => {
    createCategory({ name: value }).then((data) => {
      setValue("");
      onHide();
    });
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить категорию
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Введите название категории"
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger" onClick={onHide}>
          Закрыть
        </Button>
        <Button variant="outline-success" onClick={addCategory}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateCategory;
