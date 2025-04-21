import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./Platforms/Home";
import Codeforces from "./Platforms/Codeforces";
import LeetCode from "./Platforms/Leetcode";
import Codechef from "./Platforms/Codechef"
// import Atcoder from "./components/Atcoder";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        {/* hello test */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/codeforces" element={<Codeforces />} />
          <Route path="/leetcode" element={<LeetCode />} />
          <Route path="/codechef" element={<Codechef />} />
          {/* <Route path="/atcoder" element={<Atcoder />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;