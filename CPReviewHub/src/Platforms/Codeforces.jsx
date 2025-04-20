import { useState } from "react";

const Codeforces = () => {
  const [username, setUsername] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state

  const handleSearch = async (e) => {
    e.preventDefault();

    // Set loading to true before starting the fetch
    setLoading(true);
    setData(null); // Clear previous data

    try {
      const [userInfoRes, submissionsRes, ratingRes] = await Promise.all([
        fetch(`https://codeforces.com/api/user.info?handles=${username}`),
        fetch(`https://codeforces.com/api/user.status?handle=${username}`),
        fetch(`https://codeforces.com/api/user.rating?handle=${username}`),
      ]);

      const userData = await userInfoRes.json();
      const submissionsData = await submissionsRes.json();
      const ratingData = await ratingRes.json();

      if (
        userData.status === "OK" &&
        submissionsData.status === "OK" &&
        ratingData.status === "OK"
      ) {
        const user = userData.result[0];
        const submissions = submissionsData.result;
        const ratingHistory = ratingData.result;

        const triedSet = new Set();
        const solvedSet = new Set();

        submissions.forEach((sub) => {
          const problemID = `${sub.problem.contestId}-${sub.problem.index}`;
          triedSet.add(problemID);
          if (sub.verdict === "OK") {
            solvedSet.add(problemID);
          }
        });

        const stats = {
          username: user.handle,
          rating: user.rating,
          maxRating: user.maxRating,
          rank: user.rank,
          maxRank: user.maxRank,
          contests: ratingHistory.length,
          submissions: submissions.length,
          tried: triedSet.size,
          solved: solvedSet.size,
          photo: user.titlePhoto,
        };

        setData(stats);
      } else {
        setData(null);
      }
    } catch (error) {
      console.error("Error fetching Codeforces data:", error);
      setData(null);
    } finally {
      setLoading(false); // Set loading to false after the fetch is complete
    }
  };

  const getRankColor = (rating) => {
    if (rating < 1200) {
      return { border: "border-gray-500", text: "text-gray-500" };
    } else if (rating < 1400) {
      return { border: "border-green-400", text: "text-green-400" };
    } else if (rating < 1600) {
      return { border: "border-[3px] border-[#9be3cb]", text: "text-[#9be3cb]" }; // Pastel Teal for Specialist
    } else if (rating < 1900) {
      return { border: "border-[3px] border-[#0000FF]", text: "text-[#0000FF]" };
    } else if (rating < 2100) {
      return { border: "border-[3px] border-[#AA00AA]", text: "text-[#AA00AA]" };
    } else if (rating < 2300) {
      return { border: "border-[3px] border-[#DC143C]", text: "text-[#DC143C]" };
    } else if (rating < 2400) {
      return { border: "border-[3px] border-[#B22222]", text: "text-[#B22222]" };
    } else if (rating < 2600) {
      return { border: "border-[3px] border-[#FF4500]", text: "text-[#FF4500]" };
    } else if (rating < 3000) {
      return { border: "border-[3px] border-[#8B0000]", text: "text-[#8B0000]" };
    } else {
      return { border: "border-[3px] border-[#8B0000]", text: "text-[#8B0000]" };
    }
  };

  return (
    <div className="bg-gray-800 min-h-screen p-6">
      <form
        onSubmit={handleSearch}
        className="sticky top-0 z-10 bg-gray-900 shadow-lg p-4 rounded-xl flex justify-center gap-4 mb-6"
      >
        <img
          src="../image/codeforces.png"
          alt="Codeforces Logo"
          className="h-12 w-auto mr-4"
        />
        <input
          type="text"
          placeholder="Enter Codeforces Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch(e);
          }}
          className="border border-white-700 bg-white-800 text-white px-4 py-2 rounded-md w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
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
          <div className="flex flex-col items-center">
            <img
              src={data.photo}
              alt="Profile"
              className={`w-28 h-28 rounded-full ${getRankColor(data.rating).border} border-4 mb-4`}
            />
            <h2 className="text-3xl font-semibold text-white mb-2 text-center">
              {data.username}
            </h2>
            <p className={`text-sm ${getRankColor(data.rating).text} mb-6`}>
              {data.rank?.replace(/_/g, " ")} | Max Rank: {data.maxRank?.replace(/_/g, " ")}
            </p>
          </div>

          <h2 className="text-3xl font-semibold text-white mb-6 text-center">
            Codeforces Stats
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-white text-lg">
            <Stat label="Current Rating" value={data.rating} />
            <Stat label="Max Rating" value={data.maxRating} />
            <Stat label="Rank" value={data.rank?.replace(/_/g, " ")} />
            <Stat label="Max Rank" value={data.maxRank?.replace(/_/g, " ")} />
            <Stat label="Total Submissions" value={data.submissions} />
            <Stat label="Questions Tried" value={data.tried} />
            <Stat label="Questions Solved" value={data.solved} />
            <Stat label="Contests Participated" value={data.contests} />
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">
          No data found. Search a valid Codeforces handle.
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

export default Codeforces;