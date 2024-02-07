import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import NavBar from 'src/components/NavBar';
import AppRouter from 'src/components/AppRouter';
import Spinner from 'src/components/Spinner';
import { Context } from 'src/index';
import { check } from 'src/http/userApi';
import { User } from 'src/serverTypes';

const App = observer(() => {
  const { user } = useContext(Context);
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
    return <Spinner />
  }

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
