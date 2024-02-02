import { observer } from "mobx-react-lite";
import React, { FC, ReactElement, useContext, useEffect, useState } from "react";
import { Container, Row, Form, Dropdown, Button, Spinner } from "react-bootstrap";

import { Context } from "src/index";
import { updateProfile } from "src/http/userApi";
import { User } from "src/serverTypes";
import { check } from "src/http/userApi";

const Profile: FC = observer((): ReactElement => {
    const { user } = useContext(Context).user;
    const roles: string[] = ["USER", "ADMIN"];
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        check()
          .then(({ email, role }: User) => {
            user.setUser({ email, role });
            user.setIsAuth(true);
          })
          .finally(() => setLoading(false))
          .catch((e) => console.log(e));
      }, []);

    if (loading) {
        return <Spinner animation={"grow"} />;
    }

    const changeRole = (role: string): void => {
        user.role = role;
    };

    const changeNewPassword = (password: string): void => {
        user.newPassword = password;
    };

    const changeCurrentPassword = (password: string): void => {
        user.password = password;
    };

    const changeProfile = async () => {
        try {
            const data = await updateProfile(user.email, user.role, user.newPassword, user.password)
            user.newPassword = "";
            user.password = "";
        } catch (e) {
            alert(e.response.data.message);
        }
    };

    return(
        <Container className="d-flex justify-content-center align-items-center">
            <Row>
                <Form>
                    <div>Ваш профиль</div>
                      <Form.Control
                        value={user.email}
                        className="mt-3"
                        disabled
                    />

                    <Dropdown className="mt-2 mb-2">
                        <Dropdown.Toggle>
                            {user.role || "Выберите роль"}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {roles.map((role: string, index: number) => (
                                <Dropdown.Item
                                    key={index}
                                    onClick={() => changeRole(role)}
                                    >
                                    {role}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>

                    <Form.Control
                        value={user.newPassword}
                        className="mt-3"
                        placeholder="Введите новый пароль"
                        onChange={e => changeNewPassword(e.target.value)}
                    />
                    <Form.Control
                        value={user.password}
                        className="mt-3"
                        placeholder="Введите текущий пароль"
                        onChange={e => changeCurrentPassword(e.target.value)}
                    />
                    <hr />

                    <Button variant="outline-dark" onClick={() => changeProfile()}>
                        Обновить профиль
                    </Button>
                </Form>
            </Row>
        </Container>
    );
});

export default Profile;