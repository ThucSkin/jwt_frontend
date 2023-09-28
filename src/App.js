import Nav from "./components/nav/Nav";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Router>
        <div className="app-container">
          {/* <Nav /> */}
          <Switch>
            <Route path="/news">
              news
            </Route>
            <Route path="/contact">
              contact
            </Route>
            <Route path="/about">
              about
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/" exact>
              home
            </Route>
            <Route path="*" exact>
              404 not found
            </Route>
          </Switch>
        </div>
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
