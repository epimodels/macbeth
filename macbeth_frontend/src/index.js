import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import Home from './components/home/home';
import Compute from './components/compute/compute';
import ModelSelect from './components/model_select/model_select';
import ParameterEdit from './components/model_params/parameter_edit';
import Results from './components/model_results/results';
import Faq from './components/help/faq';
import ContactUs from './components/help/contact_us';
import SignIn from './components/account/signin';
import Register from './components/account/register';
import AccountView from './components/account/account_view';
import SignOut from './components/account/signout';
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
