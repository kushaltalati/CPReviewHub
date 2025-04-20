import { useState } from "react";

const LeetCode = () => {
  const [username, setUsername] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    setData(null);

    try {
      const userInfoRes = await fetch(`https://alfa-leetcode-api.onrender.com/userContestRankingInfo/${username}`);
      const userQuesInfoRes = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`);
      const img = await fetch(`https://alfa-leetcode-api.onrender.com/${username}`);
  
      if (!userInfoRes.ok || !userQuesInfoRes.ok) {
        throw new Error('Failed to fetch user data');
      }
  
      const userData = await userInfoRes.json();
      const userQueData = await userQuesInfoRes.json();
      const imgg = await img.json();
  
      if (userQueData.status !== 'error') {
        const rating = userData.data.userContestRanking?.rating ?? "Unrated";
  
        const stats = {
          username: username,
          rating: rating !== "Unrated" ? rating.toFixed(0) : "Unrated",
          globalrank: userData.data.userContestRanking?.globalRanking ?? "N/A",
          rank: userQueData.ranking ?? "N/A",
          solved: userQueData.totalSolved ?? 0,
          acceptanceRate: userQueData.acceptanceRate ?? "N/A",
          easySolved: userQueData.easySolved ?? 0,
          mediumSolved: userQueData.mediumSolved ?? 0,
          hardSolved: userQueData.hardSolved ?? 0,
          contestAppeared: userData.data.userContestRanking.attendedContestsCount ?? 0,
          photo: imgg.avatar,
        };
  
        setData(stats);
      } else {
        console.log("Invalid or no data returned for username:", username);
        setData(null);
      }
    } catch (error) {
      console.error("Error fetching LeetCode data:", error);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const getRankColor = (rating) => {
    const numericRating = typeof rating === "number" ? rating : parseFloat(rating);
    if (isNaN(numericRating)) {
      return { border: "border-gray-400", text: "text-gray-400" }; 
    }

    if (rating < 1500) {
      return { border: "border-gray-500", text: "text-gray-500" };
    } else if (rating < 2000) {
      return { border: "border-green-400", text: "text-green-400" };
    } else if (rating < 2500) {
      return { border: "border-yellow-400", text: "text-yellow-400" };
    } else if (rating < 3000) {
      return { border: "border-blue-400", text: "text-blue-400" };
    } else {
      return { border: "border-red-400", text: "text-red-400" };
    }
  };

  return (
    <div className="bg-gray-800 min-h-screen p-6">
      <form
        onSubmit={handleSearch}
        className="sticky top-0 z-10 bg-gray-900 shadow-lg p-4 rounded-xl flex justify-center gap-4 mb-6"
      >
        <img
          src="../image/LeetCode.png"
          alt="LeetCode Logo"
          className="h-12 w-auto mr-4"
        />
        <input
          type="text"
          placeholder="Enter LeetCode Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch(e);
          }}
          className="border border-gray-700 bg-gray-800 text-white px-4 py-2 rounded-md w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="submit"
          className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition"
        >
          Search
        </button>
      </form>

      {loading ? (
        <div className="text-center text-white">
          <div className="spinner-border animate-spin border-4 border-t-4 border-purple-500 rounded-full w-16 h-16 mx-auto"></div>
          <p>Loading...</p>
        </div>
      ) : data ? (
        <div className="max-w-3xl mx-auto bg-gray-900 shadow-lg rounded-xl p-6">
          <div className="flex flex-col items-center mb-4">
            <img
              src={data.photo}
              alt="Profile"
              className={`w-28 h-28 rounded-full ${getRankColor(data.rating).border} border-4 mb-4`}
            />
            <h2 className="text-3xl font-semibold text-white mb-2 text-center">
              {data.username}
            </h2>
            <p className={`text-sm ${getRankColor(data.rating).text} mb-6`}>
              Global Rank: {data.globalrank} | Rating: {typeof data.rating === "number" ? data.rating.toFixed(0) : "Unrated"}
            </p>
          </div>

          <h2 className="text-3xl font-semibold text-white mb-6 text-center">
            LeetCode Stats
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-white text-lg">
            <Stat label="Rating" value={data.rating} />
            <Stat label="Rank" value={data.rank} />
            <Stat label="Contests Appeared" value={data.contestAppeared} />
            <Stat label="Acceptance Rate" value={`${data.acceptanceRate}%`} />
            <Stat label="Total Problems Solved" value={data.solved} />
            <Stat label="Easy Solved" value={data.easySolved} />
            <Stat label="Medium Solved" value={data.mediumSolved} />
            <Stat label="Hard Solved" value={data.hardSolved} />
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">
          No data found. Search a valid LeetCode username.
        </p>
      )}
    </div>
  );
};

const Stat = ({ label, value }) => (
  <div className="flex justify-between bg-gray-700 p-4 rounded-md shadow-sm">
    <span className="font-medium">{label}</span>
    <span className="font-bold text-purple-400">{value}</span>
  </div>
);

export default LeetCode;