import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from "./components/auth";
import UserPanel from "./components/userPanel";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Auth />} /> {/* Komponent Auth będzie renderowany na ścieżce głównej */}
          <Route path="/userPanel" element={<UserPanel />} /> {/* Komponent UserPanel będzie renderowany na ścieżce /userPanel */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
