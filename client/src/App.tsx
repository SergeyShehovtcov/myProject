import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import NavBar from "src/components/NavBar";
import AppRouter from "src/components/AppRouter";
import { observer } from "mobx-react-lite";
import { Context } from "src/index";
import { check } from "src/http/userApi";
import { User } from "src/serverTypes";

const App = observer(() => {
  const { user } = useContext(Context);
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
  
    return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
