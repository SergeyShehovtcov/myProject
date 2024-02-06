import React, { FC, ReactElement, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink, useHistory } from 'react-router-dom';
import { ADMIN_ROUTE, PROFILE_ROUTE, SHOP_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, ORDER_ROUTE } from 'src/utils/constants';
import { Context } from 'src/index';

const NavBar: FC = observer((): ReactElement => {
  const { user } = useContext(Context);
  const { product } = useContext(Context);
  const { basket } = useContext(Context);
  const history = useHistory();

  const logOut = (): void => {
    user.setUser({});
    user.setIsAuth(false);
    localStorage.removeItem('token');
  };

  const adminBlock = (): ReactElement => {
    return (
      <Button variant={'outline-light'} onClick={() => history.push(ADMIN_ROUTE)}>
        Админ панель
      </Button>
    );
  };

  const authBlock = (): ReactElement => {
    return (
      <>
        {user.user.role === 'ADMIN' ? adminBlock() : ''}
        <Button variant={'outline-light'} className="ml-3" onClick={() => history.push(PROFILE_ROUTE)}>
          Профиль
        </Button>
        <Button variant={'outline-light'} className="ml-3" onClick={() => history.push(ORDER_ROUTE)}>
          Заказы
        </Button>
        <Button variant={'outline-light'} className="ml-3" onClick={() => logOut()}>
          Выйти
        </Button>
      </>
    );
  };

  const publicBlock = (): ReactElement => {
    return (
      <>
        <Button variant={'outline-light'} onClick={() => history.push(LOGIN_ROUTE)}>
          Войти
        </Button>
      </>
    );
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <NavLink style={{ color: 'white' }} to={SHOP_ROUTE}>
          Магазин ({product.totalCount}) ед.
        </NavLink>
        <Nav className="ml-auto" style={{ color: 'white' }}>
          {user.isAuth ? authBlock() : publicBlock()}
        </Nav>
        <Button variant={'outline-light'} className="ml-3" onClick={() => history.push(BASKET_ROUTE)}>
          {basket?.count > 0 ? `В корзине ${basket.count} ед.` : 'Корзина'}
        </Button>
      </Container>
    </Navbar>
  );
});

export default NavBar;
