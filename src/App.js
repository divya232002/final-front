import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Combine from './components/Combine';
import Restaurantdetails from './components/Restaurantdetails';
import Filterpart_B from './components/Combine_filter/Filterpart_B';
import Filterpart_L from './components/Combine_filter/Filterpart_L';
import Filterpart_Di from './components/Combine_filter/Filterpart_Di';
import Filterpart_Dr from './components/Combine_filter/Filterpart_Dr';
import Filterpart_S from './components/Combine_filter/Filterpart_S';
import Filterpart_N from './components/Combine_filter/Filterpart_N';






function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Combine />} />
        <Route path="/details/:cName" element={<Restaurantdetails />} />
        <Route path="/filter/Breakfast" element={<Filterpart_B />} />
        <Route path="/filter/Lunch" element={<Filterpart_L />} />
        <Route path="/filter/Dinner" element={<Filterpart_Di />} />
        <Route path="/filter/Drinks" element={<Filterpart_Dr />} />
        <Route path="/filter/Snacks" element={<Filterpart_S />} />
        <Route path="/filter/NightLife" element={<Filterpart_N />} />
        
        

      </Routes>
    </Router>
  );
}

export default App;
