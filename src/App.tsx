import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import ListingDetail from "@/pages/ListingDetail";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/listing/:id" element={<ListingDetail />} />
    </Routes>
  );
}
