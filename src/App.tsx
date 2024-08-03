import React, { Fragment } from "react";
import { ToastContainer } from "react-toastify";
import { ConfirmProvider } from "material-ui-confirm";
import "./App.css";
import AddRoom from "./pages/room/AddRoom";
import "react-toastify/dist/ReactToastify.css";
import ExistingRooms from "./pages/room/ExistingRooms";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./utils/ScrollToTop";
import { publicRoutes } from "./routes";
import DefaultLayout from "./layout/DefaultLayout";

function MyRoutes() {
  return (
    <ConfirmProvider>
      <ScrollToTop />
      <div className="App">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            if (route.layout === "default") {
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <DefaultLayout>
                      <Page />
                    </DefaultLayout>
                  }
                />
              );
            } else if (route.layout === "none") {
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Fragment>
                      <Page />
                    </Fragment>
                  }
                />
              );
            }
          })}
        </Routes>
      </div>
      <ToastContainer
        theme="light"
        position="top-right"
        autoClose={3000}
        pauseOnFocusLoss={false}
        style={{ top: "70px", right: "30px", transition: ".5s" }}
      />
    </ConfirmProvider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <MyRoutes />
    </BrowserRouter>
  );
}

export default App;
