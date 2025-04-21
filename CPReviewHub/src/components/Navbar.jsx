import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Codeforces", path: "/codeforces" },
    { name: "LeetCode", path: "/leetcode" },
    { name: "CodeChef", path: "/codechef" },
    // { name: "AtCoder", path: "/atcoder" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-gray-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-purple-400 hover:text-purple-300">
          KwazyStats
        </Link>
        <div className="flex space-x-6">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `text-sm font-medium transition duration-200 hover:text-purple-400 ${
                  isActive ? "text-purple-500 underline underline-offset-4" : "text-gray-300"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;