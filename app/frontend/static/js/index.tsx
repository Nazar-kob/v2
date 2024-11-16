import React from "react";
import { createRoot } from "react-dom/client";

import App from "../react/App";

class IndexPage {
  private context: object;

  constructor() {
    const contextElement = document.getElementById(
      "context-data"
    ) as HTMLDivElement | null;
    if (contextElement) {
      const jsonData = contextElement.getAttribute("json") || "{}";
      this.context = JSON.parse(jsonData);
    } else {
      console.warn("Context element not found. Using default context.");
      this.context = {};
    }
  }

  init() {
    console.log("Initializing React app...");
    const root = createRoot(
      document.getElementById("react-component") as HTMLDivElement
    );
    root.render(<App {...this.context} />);
    console.log("React app initialized.");
  }
}

const indexPage = new IndexPage();
indexPage.init();

export default indexPage;
