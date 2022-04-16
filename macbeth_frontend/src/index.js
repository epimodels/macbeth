import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import Home from './components/pages/home';
import Compute from './components/pages/compute';
import ModelSelect from './components/pages/model_select';
import ParameterEdit from './components/pages/parameter_edit';
import Results from './components/pages/results';
import Faq from './components/pages/faq';
import ContactUs from './components/pages/contact_us';
import SignIn from './components/pages/signin';
import Register from './components/pages/register';
import AccountView from './components/pages/account_view';
import SignOut from './components/pages/signout';
import reportWebVitals from './reportWebVitals';

ReactDOM.render( 
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element = {<Home />} />
          <Route path="compute" element={<Compute />}>
            {/* add capability to leave 'compute' to come back to same tab? */}
            <Route path="model-select" element={<ModelSelect />} />
            <Route path="parameter-edit" element={<ParameterEdit />} />
            <Route path="results" element={<Results />} />
              {/* add unique url for each result */}
              {/* <Route path=":resultsID" element={<Result />} /> */}
          </Route>
          <Route path="help">
            <Route path="faq" element={<Faq />} />
            <Route path="contact-us" element={<ContactUs />} />
          </Route>
          {/* add redirection based on whether user is signed in or not */}
          <Route path="account">
            <Route path="sign-in" element={<SignIn />} />
            <Route path="register" element={<Register />} />
            <Route path="account/view" element={<AccountView />} />
            <Route path="account/sign-out" element={<SignOut />} />
          </Route>
        </Route>
     </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
