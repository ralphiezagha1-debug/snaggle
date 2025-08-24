import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AnnouncementBar from "./components/AnnouncementBar";
import SiteFooter from "./components/SiteFooter";
import Home from "./pages/Home";
import AuctionCatalog from "./pages/AuctionCatalog";
import AuctionDetail from "./pages/AuctionDetail";
import Credits from "./pages/Credits";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import ResetPassword from "./pages/auth/ResetPassword";
import Account from "./pages/Account";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <AnnouncementBar />
        <div className="sticky top-0 z-40 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b">
          <Navbar />
        </div>
        <main className="flex-grow mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auctions" element={<AuctionCatalog />} />
            <Route path="/auctions/:id" element={<AuctionDetail />} />
            <Route path="/credits" element={<Credits />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/reset" element={<ResetPassword />} />
            <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <SiteFooter />
      </div>
    </Router>
  );
}
