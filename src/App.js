// commonly required
import './App.css';

// These 3 are parts of Screens/Pages created
import Home from './screens/Home';
import Login from './screens/Login';
import Signup from './screens/Signup';
import MyOrder from './screens/MyOrder.js'
// To implement bootstrap , js , css we require to explicitly import them to use if not working on installing 
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'

// BrowserRouter , Router , Route , Link are react-router-dom part that prevent reload of page
import { BrowserRouter as Router, Routes,Route,} from "react-router-dom";


import { CartProvider } from './components/ContextReducer';


function App() {
  return (
    <CartProvider>
    <Router>
   <div>
      <Routes>

<Route exact path = "/" element = {<Home/>} />
<Route exact path = "/login" element = {<Login/>} />
<Route exact path = "/createuser" element = {<Signup/>}/>
<Route exact path = "/myOrder" element = {<MyOrder/>}/>

      </Routes>
    </div>
   </Router>
   </CartProvider>
  );
}

export default App;
