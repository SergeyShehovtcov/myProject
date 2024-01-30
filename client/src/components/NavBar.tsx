import React, { FC, ReactElement, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { NavLink, useHistory } from "react-router-dom";
import { ADMIN_ROUTE, SHOP_ROUTE } from "src/utils/constants";
import { Context } from "src/index";

const NavBar: FC = observer((): ReactElement => {
  const { user } = useContext(Context);
  const history = useHistory();

  const logOut = (): void => {
    user.setUser({});
    user.setIsAuth(false);
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <NavLink style={{ color: "white" }} to={SHOP_ROUTE}>
          Магазин
        </NavLink>
        {user.isAuth ? (
          <Nav className="ml-auto" style={{ color: "white" }}>
            <Button
              variant={"outline-light"}
              onClick={() => history.push(ADMIN_ROUTE)}
            >
              Админ панель
            </Button>
            <Button
              variant={"outline-light"}
              //onClick={() => history.push(PROFILE_ROUTE)}
            >
              Профиль
            </Button>
            <Button
              variant={"outline-light"}
              className="ml-2"
              onClick={() => logOut()}
            >
              Выйти
            </Button>
          </Nav>
        ) : (
          <Nav className="ml-auto" style={{ color: "white" }}>
            {/*                             <Button
                                variant={"outline-light"}
                                onClick={() => history.push(LOGIN_ROUTE)}
                            >
                                Авторизация
                            </Button> */}
          </Nav>
        )}
      </Container>
    </Navbar>
  );
});

export default NavBar;
