import React, { FC, ReactElement, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Container, Row, Form, Button, Col, Image } from 'react-bootstrap';
import { Context } from 'src/index';
import { Product } from 'src/serverTypes';
import { BASE_URL, LOGIN_ROUTE } from 'src/utils/constants';
import AuthModal from 'src/components/modals/AuthModal';

const Basket: FC = observer((): ReactElement => {
  const { basket } = useContext(Context);
  const [show, setShow] = useState(false);
  const history = useHistory();

  const createOrder = (): void => {
    //history.push(LOGIN_ROUTE);
    setShow(true);
  };

  const onHide = (): void => {
    setShow(false);
  };

  const deleteProduct = (index: number): void => {
    basket.delete(index);
    localStorage.setItem('basket', JSON.stringify(basket.products));
  };

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Row>
        <Form>
          <hr />
          <Button variant="outline-dark" onClick={createOrder}>
            {basket?.count > 0 ? `Оформить заказ ${basket?.count} ед. на сумму ${basket?.sum}` : 'Ваша корзина пуста'}
          </Button>
          {basket?.products.map((product: Product, index: number) => (
            <Row key={index} className="mt-4">
              <Col md={3}>
                <Image width={35} height={35} src={`${BASE_URL}/${product?.img}`} />
              </Col>
              <Col md={3}>
                <Form.Control value={product.name} disabled />
              </Col>
              <Col md={3}>
                <Form.Control value={product.price + ' р.'} disabled />
              </Col>
              <Col md={3}>
                <Button onClick={() => deleteProduct(index)} variant="outline-danger">
                  Удалить
                </Button>
              </Col>
            </Row>
          ))}
        </Form>
      </Row>
      <AuthModal show={show} onHide={onHide} />
    </Container>
  );
});

export default Basket;
