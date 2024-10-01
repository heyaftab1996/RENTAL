import './App.css';
import "../node_modules/slick-carousel/slick/slick.css";
import "../node_modules/slick-carousel/slick/slick-theme.css";
// import { CarouselDefault } from './components/Carousel';
import { NavbarWithMegaMenu } from './components/Navbar';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AudiCard } from './components/AudiCard';
import { useAuth } from './context/AuthContext';
import { Navigate } from 'react-router-dom';
import Categories from './components/Categories';
import Featured from './components/Featured';
import Popular from './components/Popular';
import Trending from './components/Trending';
import BottomNav from './components/BottomNav';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

function App({ children }) {
  //console.log(children);
   const { user } = useAuth();
  console.log(user);
  // // if (!user) {
  // //   return <Navigate to="/login" />;
  // // }

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {children}
      </LocalizationProvider>
      {/* <ToastContainer className="z-50" position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover /> */}

      <NavbarWithMegaMenu />
      <Categories />
      <Featured />
      <AudiCard />
      {/* <Popular />
      <Trending /> */}
      {/* <BottomNav /> */}
      {/* <CarouselDefault /> */}
    </>
  );
}

export default App;
