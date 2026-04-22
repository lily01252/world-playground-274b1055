import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppLayout from "./layouts/AppLayout";
import Today from "./pages/Today";
import WorldMap from "./pages/WorldMap";
import InnerTerrain from "./pages/InnerTerrain";
import Chronicle from "./pages/Chronicle";
import QuestDetail from "./pages/QuestDetail";
import QuestRecord from "./pages/QuestRecord";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Today />} />
            <Route path="/map" element={<WorldMap />} />
            <Route path="/inner" element={<InnerTerrain />} />
            <Route path="/chronicle" element={<Chronicle />} />
            <Route path="/quest/:id" element={<QuestDetail />} />
            <Route path="/quest/:id/record" element={<QuestRecord />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
