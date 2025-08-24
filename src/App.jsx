import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AuctionCatalog from "./pages/AuctionCatalog";
import AuctionDetail from "./pages/AuctionDetail";
import Credits from "./pages/Credits";
import SignIn from "./pages/SignIn";
import Account from "./pages/Account";
import ForgotPassword from "./pages/ForgotPassword";
import { ProtectedRoute } from "./routes/ProtectedRoute";

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auctions" element={<AuctionCatalog />} />
            <Route path="/auctions/:id" element={<AuctionDetail />} />
            <Route path="/credits" element={<Credits />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
