import React, { FC, ReactElement, useContext, useEffect, useState } from 'react';
import { Container, Row, Form, Col, Button, Image, InputGroup } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

import Spinner from 'src/components/Spinner';
import { Context } from 'src/index';
import { check } from 'src/http/userApi';
import { User } from 'src/serverTypes';
import { Product, Order as OrderType } from 'src/serverTypes';
import { BASE_URL } from 'src/utils/constants';

const Order: FC = observer((): ReactElement => {
  const { user } = useContext(Context).user;
  const { basket } = useContext(Context);
  const [validated, setValidated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [cash, setCash] = useState<boolean>(false);
  const [cashless, setCashless] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [comment, setComment] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [newOrder, setNewOrder] = useState<OrderType>(null);

  useEffect(() => {
    console.log(newOrder);
  }, [newOrder]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    setValidated(true);
    if (form.checkValidity() === false) return;

    setNewOrder({
      user: user,
      cash: cash,
      cashless: cashless,
      products: basket.products,
      recipient: {
        name: name,
        surname: surname,
        address: address,
        comment: comment,
        phone: phone,
      },
    });
  };

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

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Row>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} md="3" controlId="validationCustom01">
              <Form.Label>Email</Form.Label>
              <Form.Control required type="email" placeholder="Email" defaultValue={user.email} disabled />
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationCustom02">
              <Form.Label>Имя</Form.Label>
              <Form.Control
                onChange={(e) => setName(e.target.value)}
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
                onChange={(e) => setSurname(e.target.value)}
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
                onChange={(e) => setPhone(e.target.value)}
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
              onChange={(e) => setCash(e.target.checked)}
              checked={cash}
              type="switch"
              id="cash"
              label="Наличный расчет"
            />
          </Form.Row>
          <Form.Row>
            <Form.Check
              onChange={(e) => setCashless(e.target.checked)}
              checked={cashless}
              type="switch"
              id="cashless"
              label="Безналичный расчет"
            />
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="12" controlId="validationCustom02">
              <Form.Label>Адрес доставки</Form.Label>
              <Form.Control onChange={(e) => setAddress(e.target.value)} required as="textarea" rows={3} />
              <Form.Control.Feedback>Успех!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">Введите адрес доставки</Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="12" controlId="validationCustom02">
              <Form.Label>Дополнительная информация</Form.Label>
              <Form.Control onChange={(e) => setComment(e.target.value)} required as="textarea" rows={3} />
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
          <Button type="submit" variant="outline-success" className="mt-4">
            Оформить заказ
          </Button>
        </Form>
      </Row>
    </Container>
  );
});

export default Order;
