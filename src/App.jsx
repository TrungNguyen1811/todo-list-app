import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router.jsx";
import { ConfigProvider } from "antd";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {},
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}

export default App;
