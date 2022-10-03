import Navbar from "components/header/Navbar";
import Home from "pages/Home";
import Footer from "components/footer/Footer";
import { Route, Routes} from 'react-router-dom'
import Profile from "pages/Profile";
import Services from "pages/Services";
import ServiceDetail from "pages/ServiceDetail";
import Faq from "pages/Faq";
import Login from "pages/Login";
import Register from "pages/Register";
import  NotFound  from "pages/NotFound";
import initStore from "store";
import { Provider } from 'react-redux'

const store = initStore()
function App() {

  return (
    <Provider store={store}>
      <Navbar/>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/profile" element={<Profile/>}></Route>
          <Route path="/services/:serviceId" element={<ServiceDetail/>}></Route>
          <Route path="/services" element={<Services/>}></Route>
          <Route path="/faq" element={<Faq/>}></Route>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="*" element={<NotFound/>}></Route>
      </Routes>
      <Footer/>
    </Provider>
  );
}

export default App;
