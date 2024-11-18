import React from "react";
import { createRoot } from "react-dom/client";

import App from "../react/App";

// In ideal better to organize the system routes and context data in a separate file

class IndexPage {
  private context: object;

  constructor() {
    const contextElement = document.getElementById(
      "context-data"
    ) as HTMLDivElement | null;
    if (contextElement) {
      const jsonData = contextElement.getAttribute("json") || "{}"; // we can use some context data from the server useing this approach
      this.context = JSON.parse(jsonData);
    } else {
      console.warn("Context element not found. Using default context.");
      this.context = {};
    }
  }

  init() {
    const root = createRoot(
      document.getElementById("react-component") as HTMLDivElement
    );
    root.render(<App {...this.context} />);
  }
}

const indexPage = new IndexPage();
indexPage.init();

export default indexPage;
