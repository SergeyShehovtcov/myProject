import React, { FC, ReactElement, useContext } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { NavLink, useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { Modal as TModal } from 'src/components/modals/index';
import { useInput } from 'src/hooks/useInput';
import { REGISTRATION_ROUTE, ORDER_ROUTE } from 'src/utils/constants';
import { login } from 'src/http/userApi';
import { Context } from 'src/index';
import { User } from 'src/serverTypes';

const AuthModal: FC<TModal> = observer(({ show, onHide }): ReactElement => {
  const { user } = useContext(Context);
  const email = useInput('', { isEmpty: true, minLength: 3, isEmail: true });
  const password = useInput('', { isEmpty: true, minLength: 5, maxLength: 8 });
  const history = useHistory();

  const showErrorEmailMsg = (): ReactElement => {
    if (email.fucused && email.isEmpty) return <span style={{ color: 'red' }}>Email не может быть пустым</span>;
    if (email.fucused && email.minLengthError)
      return <span style={{ color: 'red' }}>Длина Email не менее 3 символов</span>;
    if (email.fucused && email.emailError) return <span style={{ color: 'red' }}>Некорректный email</span>;
  };

  const showErrorPasswordMsg = (): ReactElement => {
    if (password.fucused && password.isEmpty) return <span style={{ color: 'red' }}>Пароль не может быть пустым</span>;
    if (password.fucused && password.minLengthError)
      return <span style={{ color: 'red' }}>Длина пароля должна быть от 5 до 8 символов</span>;
    if (password.fucused && password.maxLengthError)
      return <span style={{ color: 'red' }}>Слишком длинный пароль</span>;
  };

  const close = (): void => {
    email.setValue('');
    email.setFocused(false);
    password.setValue('');
    password.setFocused(false);
    onHide();
  };

  const click = async() => {
      await login(email.value, password.value)
      .then(({id, email, role}: User) => {
        user.setUser({id, email, role});
        user.setIsAuth(true);
        history.push(ORDER_ROUTE);
      })
      .catch(e => alert(e.response.data.message))
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Авторизация</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {showErrorEmailMsg()}
          <Form.Control
            name="email"
            className="mb-3"
            value={email.value}
            onBlur={(e: React.FocusEvent<HTMLInputElement>) => email.onBlur(e)}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => email.onChange(e)}
            placeholder="Введите ваш email..."
          />
          {showErrorPasswordMsg()}
          <Form.Control
            name="password"
            className="mb-3"
            value={password.value}
            onBlur={(e: React.FocusEvent<HTMLInputElement>) => password.onBlur(e)}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => password.onChange(e)}
            placeholder="Введите ваш пароль..."
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <div>
          Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
        </div>
        <Button variant="outline-danger" onClick={close}>
          Закрыть
        </Button>
        <Button disabled={!email.inputValid || !password.inputValid} variant="outline-success" onClick={click}>
          Войти
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default AuthModal;
