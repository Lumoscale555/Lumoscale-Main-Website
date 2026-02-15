import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, ScrollRestoration } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import Editor from "./pages/admin/Editor";
import { ProtectedRoute } from "./components/ProtectedRoute";
import BlogIndex from "./pages/blog/BlogIndex";
import BlogPostPage from "./pages/blog/BlogPost";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AuditModal from "./components/AuditModal"; // Import Modal
import { AuditModalProvider } from "./context/AuditModalContext";

import { HelmetProvider } from 'react-helmet-async';

import PricingPage from "./pages/PricingPage";
import AIReceptionist from "./pages/AIReceptionist";
import AIVoiceSDR from "./pages/AIVoiceSDR";
import AITextAgents from "./pages/AITextAgents";
import Demo from "./pages/Demo";
import ChatWidget from "./components/ChatWidget";
import ScrollToTop from "./components/ScrollToTop";

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuditModalProvider>
          <Toaster />
          <Sonner />
          <ChatWidget />
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <ScrollToTop />
            <AuditModal />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/ai-receptionist" element={<AIReceptionist />} />
              <Route path="/ai-voice-sdr" element={<AIVoiceSDR />} />
              <Route path="/ai-text-agents" element={<AITextAgents />} />
              <Route path="/demo" element={<Demo />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin/login" element={<Navigate to="/login" replace />} />
              <Route path="/admin" element={<ProtectedRoute />}>
                <Route index element={<Dashboard />} />
                <Route path="editor" element={<Editor />} />
                <Route path="editor/:id" element={<Editor />} />
              </Route>
              <Route path="/blog" element={<BlogIndex />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuditModalProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
