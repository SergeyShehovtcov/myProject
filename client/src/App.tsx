import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

import NavBar from 'src/components/NavBar';
import AppRouter from 'src/components/AppRouter';
import { Context } from 'src/index';
import { check } from 'src/http/userApi';
import { User } from 'src/serverTypes';

const App = observer(() => {
  const { user } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      check()
        .then(({ email, role }: User) => {
          user.setUser({ email, role });
          user.setIsAuth(true);
        })
        .finally(() => setLoading(false))
        .catch((e) => console.log(e));
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
