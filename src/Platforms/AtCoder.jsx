import { useState } from "react";

const getRankColor = (rating) => {
  if (typeof rating !== "number") return { border: "border-gray-400", text: "text-gray-400" };
  if (rating < 400) return { border: "border-gray-500", text: "text-gray-500" };
  if (rating < 800) return { border: "border-green-400", text: "text-green-400" };
  if (rating < 1200) return { border: "border-blue-400", text: "text-blue-400" };
  if (rating < 1600) return { border: "border-yellow-400", text: "text-yellow-400" };
  if (rating < 2000) return { border: "border-orange-400", text: "text-orange-400" };
  return { border: "border-red-500", text: "text-red-500" };
};

const AtCoder = () => {
  const [username, setUsername] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setData(null);

    try {
      const res = await fetch(`https://kenkoooo.com/atcoder/atcoder-api/v3/user_info?user=${username}`);
      if (!res.ok) throw new Error("User not found");

      const info = await res.json();

      setData({
        username: info.user_id,
        rating: info.algorithm_rating ?? "API does not provide",
        highest: info.highest_rating ?? "N/A",
        contests: info.competitions ?? "API does not provide",
        acceptedCount: info.accepted_count ?? 0,
      });
    } catch (err) {
      console.error(err);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 min-h-screen p-6">
      <form onSubmit={handleSearch} className="flex justify-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter AtCoder Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="bg-white/10 border border-gray-500 text-white px-4 py-2 rounded-md w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>

      {loading ? (
        <div className="text-center text-white">
          <div className="animate-spin border-4 border-t-blue-500 rounded-full w-16 h-16 mx-auto border-white"></div>
          <p>Loading...</p>
        </div>
      ) : data ? (
        <div className="max-w-3xl mx-auto bg-gray-900 shadow-lg rounded-xl p-6 text-white">
          <div className="text-center mb-6">
            <div className={`w-28 h-28 rounded-full ${getRankColor(data.rating).border} border-4 mx-auto mb-4`}></div>
            <h2 className="text-3xl font-semibold mb-1">{data.username}</h2>
            <p className={`text-sm ${getRankColor(data.rating).text}`}>
              Rating: {typeof data.rating === "number" ? data.rating : "Unrated"} | Highest: {data.highest}
            </p>
          </div>

          <h3 className="text-2xl font-semibold mb-4 text-center">AtCoder Stats</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-lg">
            <Stat label="Rating" value={data.rating} colorValue={data.rating} />
            <Stat label="Contests" value={data.contests} />
            <Stat label="Accepted Count" value={data.acceptedCount} />
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-400 mt-10">No data found. Please check the username.</p>
      )}
    </div>
  );
};

const Stat = ({ label, value, colorValue }) => {
  const { text } = getRankColor(colorValue);
  return (
    <div className="flex justify-between bg-gray-700 p-4 rounded-md shadow-sm">
      <span className="font-medium">{label}</span>
      <span className={`font-bold text-purple-400`}>{value}</span>
    </div>
  );
};

export default AtCoder;