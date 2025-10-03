import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Auctions from "./pages/Auctions";
import AuctionDetail from "./pages/AuctionDetail";
import HowItWorks from "./pages/HowItWorks";
import Credits from "./pages/Credits";
import FAQ from "./pages/FAQ";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Waitlist from "./pages/Waitlist";
import WaitlistLanding from "./pages/WaitlistLanding";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import Wallet from "./pages/Wallet";
import Search from "./pages/Search";
import Categories from "./pages/Categories";
import CategoryDetail from "./pages/CategoryDetail";
import Help from "./pages/Help";
import Error500 from "./pages/Error500";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";
import UI from "./pages/UI";
import Live from "./pages/Live";
import { Feed } from "./pages/Feed";
import { Leaderboards } from "./pages/Leaderboards";
import { AuctionRoomPage } from "./pages/AuctionRoom";
import Store from "./pages/Store";
import StorePage from "./pages/store/StorePage";
import ProductDetailPage from "./pages/store/ProductDetailPage";
import DropsPage from "./pages/drops/DropsPage";
import DropDetailPage from "./pages/drops/DropDetailPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<WaitlistLanding />} />
              <Route path="/home" element={<Home />} />
              <Route path="/live" element={<Live />} />
              <Route path="/live/:id" element={<AuctionRoomPage />} />
              <Route path="/auctions" element={<Auctions />} />
              <Route path="/auctions/:id" element={<AuctionDetail />} />
              <Route path="/search" element={<Search />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/categories/:slug" element={<CategoryDetail />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/credits" element={<Credits />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/help" element={<Help />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/waitlist" element={<Waitlist />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/legal/terms" element={<TermsOfService />} />
              <Route path="/legal/privacy" element={<PrivacyPolicy />} />
              <Route path="/ui" element={<UI />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profiles/:id" element={<Profile />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/leaderboards" element={<Leaderboards />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/store/:username" element={<Store />} />
              <Route path="/store" element={<StorePage />} />
              <Route path="/product/:productId" element={<ProductDetailPage />} />
              <Route path="/drops" element={<DropsPage />} />
              <Route path="/drops/:dropId" element={<DropDetailPage />} />
              <Route path="/500" element={<Error500 />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;