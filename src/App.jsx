import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router.jsx";
import { ConfigProvider } from "antd";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          controlOutline: "none", // tắt outline focus
          controlOutlineWidth: 0,
          controlTmpOutline: "none",
          colorBorder: "transparent", // border trong suốt
        },
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
}

export default App;
