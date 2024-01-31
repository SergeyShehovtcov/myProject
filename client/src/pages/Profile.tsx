import { observer } from "mobx-react-lite";
import React, { FC, ReactElement, useContext, useState } from "react";
import { Container, Row, Form, Dropdown, Button } from "react-bootstrap";

import { Context } from "src/index";

const Profile: FC = observer((): ReactElement => {
    const { user } = useContext(Context).user;
    const roles: string[] = ["USER", "ADMIN"];


    const changeRole = (role: string): void => {
        user.role = role;
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
                    />
                    <Form.Control
                        value={user.password}
                        className="mt-3"
                        placeholder="Введите текущий пароль"
                    />
                    <hr />

                    <Button variant="outline-dark">
                        Обновить профиль
                    </Button>
                </Form>
            </Row>
        </Container>
    );
});

export default Profile;