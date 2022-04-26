import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AddReview from "./components/AddReview";
import RestaurantsList from "./components/RestaurantsList";
import Restaurant from "./components/Restaurant";
import Login from "./components/Login";
import Navbar from "./components/Navbar";

function App() {
  const [user, setUser] = useState(null);

  const login = (user = null) => {
    setUser(user);
  };

  const logout = () => setUser(null);

  return (
    <div>
      <Router>
        <Navbar logout={logout} user={user} />

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<RestaurantsList />} />

            <Route path="/restaurants">
              <Route index element={<RestaurantsList />} />
              <Route path=":id/review" element={<AddReview user={user} />} />
              <Route path=":id" element={<Restaurant user={user} />} />
            </Route>
            <Route path="/login" element={<Login login={login} />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
