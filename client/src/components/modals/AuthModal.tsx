import React, { FC, ReactElement, useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import { Modal as TModal } from 'src/components/modals/index';
import { useInput } from 'src/hooks/useInput';
import { REGISTRATION_ROUTE } from 'src/utils/constants';

const AuthModal: FC<TModal> = ({ show, onHide }): ReactElement => {
  const email = useInput('', { isEmpty: true, minLength: 3, isEmail: true });
  const password = useInput('', { isEmpty: true, minLength: 5, maxLength: 8 });

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
        <Button disabled={!email.inputValid || !password.inputValid} variant="outline-success">
          Войти
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AuthModal;
