import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-50 to-gray-200 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-700 mb-6 text-center leading-tight">
        Competitive Programming <br className="hidden sm:block" />
        <span className="text-purple-600">Profile Review Hub</span>
      </h1>

      <p className="text-lg sm:text-xl text-gray-700 text-center max-w-4xl mb-12">
        Track your performance across platforms like{" "}
        <span className="font-semibold text-blue-600">Codeforces</span>,{" "}
        <span className="font-semibold text-yellow-500">LeetCode</span>,{" "}
        <span className="font-semibold text-red-500">CodeChef</span>.
        {/* <span className="font-semibold text-green-600">AtCoder</span>. */}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
        {platforms.map((platform) => (
          <div
            key={platform.name}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-2 text-center"
          >
            <h2 className={`text-2xl font-bold ${platform.color} mb-4`}>{platform.name}</h2>
            <p className="text-gray-600 mb-6">{platform.description}</p>
            <Link
              to={platform.link}
              className={`${platform.bgColor} text-white px-6 py-3 rounded-lg font-semibold hover:brightness-110 transition duration-200`}
            >
              Visit {platform.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

const platforms = [
  {
    name: "Codeforces",
    description: "View your competitive programming stats and rating progression on Codeforces.",
    link: "/codeforces",
    color: "text-blue-600",
    bgColor: "bg-blue-600",
  },
  {
    name: "LeetCode",
    description: "Analyze your LeetCode profile and track your problem-solving skills.",
    link: "/leetcode",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500",
  },
  {
    name: "CodeChef",
    description: "Track your CodeChef contest performance and ratings.",
    link: "/codechef",
    color: "text-red-500",
    bgColor: "bg-red-500",
  },
  // {
  //   name: "AtCoder",
  //   description: "Review your performance on AtCoder and track your growth.",
  //   link: "/atcoder",
  //   color: "text-green-600",
  //   bgColor: "bg-green-600",
  // },
];

export default HomePage;
