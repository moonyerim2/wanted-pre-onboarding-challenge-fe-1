import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Todo, Auth, Login, SignUp } from "./page";
import { getLoginToken } from "./util/login";

function App() {
  const isLogin = getLoginToken();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isLogin ? <Todo /> : <Navigate to="auth/login" />}
        />
        <Route path="auth" element={<Auth />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
