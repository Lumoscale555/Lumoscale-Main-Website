import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import Editor from "./pages/admin/Editor";
import { ProtectedRoute } from "./components/ProtectedRoute";
import BlogIndex from "./pages/blog/BlogIndex";
import BlogPostPage from "./pages/blog/BlogPost";
import AuditModal from "./components/AuditModal"; // Import Modal
import { AuditModalProvider } from "./context/AuditModalContext";

import { HelmetProvider } from 'react-helmet-async';

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuditModalProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AuditModal />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin/login" element={<Navigate to="/login" replace />} />
              <Route path="/admin" element={<ProtectedRoute />}>
                <Route index element={<Dashboard />} />
                <Route path="editor" element={<Editor />} />
                <Route path="editor/:id" element={<Editor />} />
              </Route>
              <Route path="/blog" element={<BlogIndex />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuditModalProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
