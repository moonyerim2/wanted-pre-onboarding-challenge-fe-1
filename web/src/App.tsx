import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>투두리스트</div>} />
        <Route path="/auth" element={<div>로그인</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
