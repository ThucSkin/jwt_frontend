import Nav from "./components/nav/Nav";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState, useContext } from "react";
import _ from "lodash";
import AppRoutes from "./components/routes/AppRoutes";
import { Rings } from "react-loader-spinner";
import { UserConText } from "./context/UserContext";
import './app.css';

function App() {
  const { user } = useContext(UserConText);

  return (
    <>
      <Router>
        {user && user.isLoading ?
          <div className="loading-container">
            <Rings
              height={100}
              width={100}
              color="red"
              ariaLabel="Loading..."
            />
            <div >Loading...</div>
          </div>

          :

          <>
            <div className="app-header">
              <Nav />
            </div>
            <div className="app-container">
              <AppRoutes />
            </div>
          </>
        }


        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </Router>
    </>
  );
}

export default App;
