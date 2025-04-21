import { useState } from "react";

const Codechef = () => {
  const [username, setUsername] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setData(null);

    try {
      const response = await fetch(`https://codechef-api.vercel.app/${username}`);
      const user = await response.json();

      if (user.success === true) {
        // const user = result.result.data.content;
        console.log(user)

        const stats = {
          username: username,
          rating: user.currentRating,
          highestRating: user.highestRating,
          stars: user.stars,
          country: user.countryName,
          globalRank: user.globalRank,
          countryRank: user.countryRank,
          profilePic: user.profile,
        };

        setData(stats);
      } else {
        setData(null);
      }
    } catch (error) {
      console.error("Error fetching Codechef data:", error);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 min-h-screen p-6">
      <form
        onSubmit={handleSearch}
        className="sticky top-0 z-10 bg-gray-900 shadow-lg p-4 rounded-xl flex justify-center gap-4 mb-6"
      >
        <img
          src="../image/codechef.png"
          alt="CodeChef Logo"
          className="h-12 w-auto mr-4"
        />
        <input
          type="text"
          placeholder="Enter CodeChef Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch(e);
          }}
          className="border border-white-700 bg-white-800 text-white px-4 py-2 rounded-md w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
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
          <div className="animate-spin border-4 border-t-red-500 rounded-full w-16 h-16 mx-auto border-white"></div>
          <p>Loading...</p>
        </div>
      ) : data ? (
        <div className="max-w-3xl mx-auto bg-gray-900 shadow-lg rounded-xl p-6 text-white">
          <div className="flex flex-col items-center">
            <img
              src={data.profilePic}
              alt="Profile"
              className="w-28 h-28 rounded-full border-4 border-yellow-500 mb-4"
            />
            <h2 className="text-3xl font-semibold mb-2">{data.username}</h2>
            <p className="text-sm text-yellow-400 mb-6">
              {data.stars}★ | {data.country}
            </p>
          </div>

          <h2 className="text-3xl font-semibold mb-6 text-center">
            CodeChef Stats
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-lg">
            <Stat label="Current Rating" value={data.rating} />
            <Stat label="Highest Rating" value={data.highestRating} />
            <Stat label="Global Rank" value={data.globalRank} />
            <Stat label="Country Rank" value={data.countryRank} />
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">
          No data found. Search a valid CodeChef handle.
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

export default Codechef;