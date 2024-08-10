import { Fragment } from 'react';
import { ToastContainer } from 'react-toastify';
import { ConfirmProvider } from 'material-ui-confirm';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes';
import DefaultLayout from './components/layout/DefaultLayout/DefaultLayout';
import ScrollToTop from './utils/Functions/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
      <ConfirmProvider>
        <ScrollToTop />
        <div className="App">
          <Routes>
            {publicRoutes.map((route, index) => {
              const Page = route.component;
              if (route.layout === 'default') {
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
              } else if (route.layout === 'none') {
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
          style={{ top: '70px', right: '30px', transition: '.5s' }}
        />
      </ConfirmProvider>
    </BrowserRouter>
  );
}

export default App;
