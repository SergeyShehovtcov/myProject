import React, { FC, ReactElement, useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Card, Container, Form, Row } from 'react-bootstrap';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { login, registration } from 'src/http/userApi';
import { Context } from 'src/index';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from 'src/utils/constants';

const Auth: FC = observer((): ReactElement => {
  const { user } = useContext(Context);
  const location = useLocation();
  const history = useHistory();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [msgInputEmail, setMsgInputEmail] = useState<string>('none');
  const [msgNoValidEmail, setMsgNoValidEmail] = useState<string>('none');
  const [msgInputPass, setMsgInputPass] = useState<string>('none');
  const [msgNoValidPass, setMsgNoValidPass] = useState<string>('none');

  const noEmptyEmail = (): boolean => {
    if (email) {
      setMsgInputEmail('none');
      return true;
    } else {
      setMsgInputEmail('block');
      return false;
    }
  };

  const validEmail = (): boolean => {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setMsgNoValidEmail('block');
      return false;
    } else {
      setMsgNoValidEmail('none');
      return true;
    }
  };

  const noEmptyPass = (): boolean => {
    if (password) {
      setMsgInputPass('none');
      return true;
    } else {
      setMsgInputPass('block');
      return false;
    }
  };

  const validPassword = (): boolean => {
    if (password.length < 3) {
      setMsgNoValidPass('block');
      return false;
    } else {
      setMsgNoValidPass('none');
      return true;
    }
  };

  const click = async () => {
    setMsgInputEmail('none');
    setMsgNoValidEmail('none');
    setMsgInputPass('none');
    setMsgNoValidPass('none');
    if (noEmptyEmail() && validEmail() && noEmptyPass() && validPassword()) {
      try {
        let data;
        if (isLogin) {
          data = await login(email, password);
        } else {
          data = await registration(email, password);
        }
        user.setUser(user);
        user.setIsAuth(true);
        history.push(SHOP_ROUTE);
      } catch (e) {
        alert(e.response.data.message);
      }
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: window.innerHeight - 54 }}>
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
        <Form className="d-flex flex-column mt-3">
          <h6 className="text-danger" style={{ display: msgInputEmail }}>
            Введите email
          </h6>
          <h6 className="text-danger" style={{ display: msgNoValidEmail }}>
            Не валидный email
          </h6>
          <Form.Control
            className="mb-3"
            placeholder="Введите ваш email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h6 className="text-danger" style={{ display: msgInputPass }}>
            Введите пароль
          </h6>
          <h6 className="text-danger" style={{ display: msgNoValidPass }}>
            Не валидный пароль. Должен быть не менее 5 символов
          </h6>
          <Form.Control
            placeholder="Введите ваш пароль..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
            {isLogin ? (
              <div>
                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
              </div>
            ) : (
              <div>
                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
              </div>
            )}
            <Button variant={'outline-success'} onClick={click}>
              {isLogin ? 'Войти' : 'Регистрация'}
            </Button>
          </Row>
        </Form>
      </Card>
    </Container>
  );
});

export default Auth;
