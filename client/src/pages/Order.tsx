import React, { FC, ReactElement, useContext, useEffect, useState } from 'react';
import { Container, Row, Form, Col, Button, InputGroup } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

import { Context } from 'src/index';
import { check } from 'src/http/userApi';
import { User } from 'src/serverTypes';
import Spinner from 'src/components/Spinner';

const Order: FC = observer((): ReactElement => {
  const { user } = useContext(Context).user;
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(true);

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center">
      <Row>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} md="3" controlId="validationCustom01">
              <Form.Label>Email</Form.Label>
              <Form.Control required type="email" placeholder="Email" defaultValue={user.email} disabled/>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationCustom02">
              <Form.Label>Имя</Form.Label>
              <Form.Control required type="text" placeholder="Введите имя..." defaultValue="" />
              <Form.Control.Feedback>Успех!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">Пажалуйста введите ваше имя</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationCustom02">
              <Form.Label>Фамилия</Form.Label>
              <Form.Control required type="text" placeholder="Введите фамилию..." defaultValue="" />
              <Form.Control.Feedback>Успех!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">Пажалуйста введите вашу фамилию</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationCustom02">
              <Form.Label>Моб.телефон</Form.Label>
              <Form.Control required type="text" placeholder="+7" defaultValue="" />
              <Form.Control.Feedback>Успех!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">Введите телефон для связи</Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row>
              <Form.Check 
                type="switch"
                id="cash"
                label="Наличный расчет"
              />
          </Form.Row>
          <Form.Row>
              <Form.Check 
                type="switch"
                id="cashless"
                label="Безналичный расчет"
              />
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="12" controlId="validationCustom02">
              <Form.Label>Адрес доставки</Form.Label>
              <Form.Control required as="textarea" rows={3}/>
              <Form.Control.Feedback>Успех!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">Введите адрес доставки</Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md="12" controlId="validationCustom02">
              <Form.Label>Дополнительная информация</Form.Label>
              <Form.Control required as="textarea" rows={3}/>
              <Form.Control.Feedback>Успех!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">Введите дополнительные сведения</Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Group>
            <Form.Check required label="Согласие на обработку персональных данных" feedback="Вы должны согласиться перед отправкой" />
          </Form.Group>
          <Button type="submit">Оформить заказ</Button>
        </Form>
      </Row>
    </Container>
  );
});

export default Order;
function setLoading(arg0: boolean): void {
  throw new Error('Function not implemented.');
}

