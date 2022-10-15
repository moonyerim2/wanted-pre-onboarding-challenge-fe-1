import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { TodoList, Auth, Login, SignUp } from "./page";
import { useLoginState } from "./hook/login";

function App() {
  const isLogin = useLoginState();

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isLogin ? <TodoList /> : <Navigate to="auth/login" />}
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
