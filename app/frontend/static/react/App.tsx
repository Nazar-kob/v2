import React, { Suspense, useState } from "react";
import { AppSidebar } from "@/components/custom/AppSidebar/AppSidebar";
import { AppPanel, panels } from "./const/panel";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./const/query-client";
import { Toaster } from "./components/ui/toaster";
import ErrorBoundary from "./components/custom/ErrorBounder/ErrorBounder";
import { Loading } from "./components/custom/Loading/Loading";

function App() {
  const [page, setPage] = useState<AppPanel>(AppPanel.VirtualMachines);

  function changePage(panel: AppPanel) {
    setPage(panel);
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <AppSidebar panelName={page} onClickItem={changePage}>
        <ErrorBoundary>
          <Suspense fallback={<Loading />}>{panels[page]}</Suspense>
        </ErrorBoundary>
      </AppSidebar>
    </QueryClientProvider>
  );
}

export default App;
