import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from "./view/Signup";
import './App.css';
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import 'font-awesome/css/font-awesome.min.css'
import Navbar from "./components/navbar";
import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Footer from './components/footer';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DoctorHome from './view/DoctorHome';
import Navbard from './components/navbardoctor';
import Footer1 from './components/footer';
import EditProfile from './view/EditProfile';
import History from './view/History';
import Step1 from './view/Step1';
import UserFooter from './components/UserFooter';
import Home from "./view/Home";
import BuildQuestions from "./view/BuildQuestions";
import Confirmation from "./view/Confirmation";
import Results from "./view/Results";


export default function App() {
  return (
     
    
    <Router>
    
     
      <div style={{backgroundColor:'#C1F0D1'}}>
        <Switch>
          <Route path="/Signup">
            <Signup />
          </Route>

          <Route path="/Home">
          <Navbar />
          <Home />
          <UserFooter />
          </Route>
          
          <Route path="/DoctorHome">           
          <Navbard />
          <DoctorHome />
          <Footer1 />         
          </Route>
          
          <Route path="/Edit">
              <Navbard />
              <EditProfile/>
              <Footer1 />
          </Route>

          <Route path="/History">
            <Navbard />
            <History />
            <Footer1 />
          </Route>

          <Route path="/Step1">
            <Navbard />
            <Step1 />
            <Footer1 />
          </Route>

          <Route path="/Questions">
            <Navbard />
            <BuildQuestions />
            <Footer1 />
          </Route>

          <Route path="/Results">
            <Navbard />
            <Results />
            <Footer1 />
          </Route>


          <Route path="/Confirmation">
            <Navbard />
            <Confirmation />
            <Footer1 />
          </Route>

          <Route path="/footer">
          <UserFooter />
          </Route>

          <Route path="/nav">
          <Navbar />
          </Route>
          
        </Switch>
        
      </div>
      
    </Router>
    
  
  );
}





