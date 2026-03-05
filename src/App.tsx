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
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <AuditModalProvider>
        <TooltipProvider>
          <h1 style={{ color: 'white', position: 'fixed', top: 0, left: 0, zIndex: 9999 }}>RENDER TEST</h1>
          <Toaster />
          <Sonner />
          <AuditModal /> {/* Add Global Modal */}
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />

              {/* Blog Routes */}
              <Route path="/blog" element={<BlogIndex />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />

              {/* Admin Routes */}
              <Route path="/admin/login" element={<Login />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/admin" element={<Dashboard />} />
                <Route path="/admin/new" element={<Editor />} />
                <Route path="/admin/edit/:id" element={<Editor />} />
              </Route>

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuditModalProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
