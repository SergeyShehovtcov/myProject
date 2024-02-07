import React, { FC, ReactElement, useContext, useEffect, useState } from 'react';
import { Container, Row, Form, Col, Button, Image, InputGroup } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

import Spinner from 'src/components/Spinner';
import { Context } from 'src/index';
import { check } from 'src/http/userApi';
import { User } from 'src/serverTypes';
import { Product, Order as OrderType, Recipient } from 'src/serverTypes';
import { BASE_URL } from 'src/utils/constants';

const Order: FC = observer((): ReactElement => {
  const { user } = useContext(Context).user;
  const { basket } = useContext(Context);
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState<OrderType>(null);
  const [recipient, setRecipient] = useState<Recipient>(null);
  const [cash, setCash] = useState<boolean>(false);
  const [cashless, setCashless] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      check()
        .then(({ id, email, role }: User) => {
          user.setUser({ id, email, role });
          user.setIsAuth(true);
        })
        .finally(() => setLoading(false))
        .catch((e) => console.log(e));
    }, 1000);
  }, []);

  if (loading) {
    return <Spinner />;
  }

  const createOrder = (): void => {
    setOrder({
      user,
      products: basket.products,
      cash,
      cashless,
      recipient,
    });
  };

  const handleClick = () => {
    //event.preventDefault();
    //event.stopPropagation();
    //const form = event.currentTarget;
    //if (form.checkValidity() === false) {
    //}

    setValidated(true);
    createOrder();
    console.log(order);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Row>
        <Form noValidate validated={validated}>
          <Form.Row>
            <Form.Group as={Col} md="3" controlId="validationCustom01">
              <Form.Label>Email</Form.Label>
              <Form.Control required type="email" placeholder="Email" defaultValue={user.email} disabled />
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationCustom02">
              <Form.Label>Имя</Form.Label>
              <Form.Control
                onChange={(e) => setRecipient({ ...recipient, name: e.target.value })}
                required
                type="text"
                placeholder="Введите имя..."
                defaultValue=""
              />
              <Form.Control.Feedback>Успех!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">Пажалуйста введите ваше имя</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationCustom02">
              <Form.Label>Фамилия</Form.Label>
              <Form.Control
                onChange={(e) => setRecipient({ ...recipient, surname: e.target.value })}
                required
                type="text"
                placeholder="Введите фамилию..."
                defaultValue=""
              />
              <Form.Control.Feedback>Успех!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">Пажалуйста введите вашу фамилию</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationCustom02">
              <Form.Label>Моб.телефон</Form.Label>
              <Form.Control
                onChange={(e) => setRecipient({ ...recipient, phone: e.target.value })}
                required
                type="text"
                placeholder="+7"
                defaultValue=""
              />
              <Form.Control.Feedback>Успех!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">Введите телефон для связи</Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Check
              onChange={() => setCash(!cash)}
              checked={cash}
              type="switch"
              id="cash"
              label="Наличный расчет"
            />
          </Form.Row>
          <Form.Row>
            <Form.Check
              onChange={() => setCashless(!cashless)}
              checked={cashless}
              type="switch"
              id="cashless"
              label="Безналичный расчет"
            />
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="12" controlId="validationCustom02">
              <Form.Label>Адрес доставки</Form.Label>
              <Form.Control
                onChange={(e) => setRecipient({ ...recipient, address: e.target.value })}
                required
                as="textarea"
                rows={3}
              />
              <Form.Control.Feedback>Успех!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">Введите адрес доставки</Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="12" controlId="validationCustom02">
              <Form.Label>Дополнительная информация</Form.Label>
              <Form.Control
                onChange={(e) => setRecipient({ ...recipient, comment: e.target.value })}
                required
                as="textarea"
                rows={3}
              />
              <Form.Control.Feedback>Успех!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">Введите дополнительные сведения</Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Group>
            <Form.Check
              required
              label="Согласие на обработку персональных данных"
              feedback="Вы должны согласиться перед отправкой"
            />
          </Form.Group>
          {basket?.products.map((product: Product, index: number) => (
            <Form.Row key={index} className="mt-4">
              <Col md={3}>
                <Image width={35} height={35} src={`${BASE_URL}/${product?.img}`} />
              </Col>
              <Col md={3}>
                <Form.Control value={product.name} disabled />
              </Col>
              <Col md={3}>
                <Form.Control value={product.price + ' р.'} disabled />
              </Col>
            </Form.Row>
          ))}
          <Button variant="outline-success" onClick={handleClick} className="mt-4">
            Оформить заказ
          </Button>
        </Form>
      </Row>
    </Container>
  );
});

export default Order;
