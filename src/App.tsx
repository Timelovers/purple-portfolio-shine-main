import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import BlogPage from "./pages/BlogPage";
import BlogPostPage from "./pages/BlogPostPage";
import ProjectPromptPage from "./pages/ProjectPromptPage";
import NotFound from "./pages/NotFound";

const CyberpunkBookmarksPage = lazy(() => import("./pages/CyberpunkBookmarksPage"));
const SkillPlazaPage = lazy(() => import("./pages/SkillPlazaPage"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/prompts/:slug" element={<ProjectPromptPage />} />
            <Route
              path="/cyberpunk-bookmarks.html"
              element={
                <Suspense
                  fallback={
                    <div className="min-h-screen bg-[#02020a]" aria-hidden="true" />
                  }
                >
                  <CyberpunkBookmarksPage />
                </Suspense>
              }
            />
            <Route
              path="/skill-plaza"
              element={
                <Suspense fallback={<div className="min-h-screen bg-slate-50" aria-hidden="true" />}>
                  <SkillPlazaPage />
                </Suspense>
              }
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
