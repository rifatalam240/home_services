import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./routes/Route.jsx";
import { ThemeProvider } from "./themecontrolled/Themecontrolled.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router}></RouterProvider>{" "}
    </ThemeProvider>
  </StrictMode>
);
