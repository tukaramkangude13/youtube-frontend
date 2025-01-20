import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { SHORT_VIDEO, YOUR_API_KEY } from "./utils/constant";
import { usershort } from "./utils/userProfileSlice";
import Shimmer from "./shimmer";

const Short = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const props = useSelector((state) => state.app.chanelid);
const navigate=useNavigate();
  const list = async () => {
    if (!props) return;

    try {
      const response = await fetch(
        `${SHORT_VIDEO}${props}&maxResults=35&type=video&order=date&key=${YOUR_API_KEY}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const result = await response.json();
      setData(result);
      dispatch(usershort(result));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    list();
  }, [props]);

  if (!data) return <Shimmer />;

  if (!data) return <Shimmer />;

  return (
    <div className="bg-black p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {data.items.map((item, index) => (
        <div
          key={item.id.videoId || index}
          className="bg-gray-800 text-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          <img
            src={item.snippet.thumbnails.high.url}
            alt={item.snippet.title}
            className="w-full h-60 object-cover cursor-pointer"
            onClick={() => navigate(`/watch/${item.id.videoId}`)}
          />
          <div className="p-4">
            <h3 className="text-sm font-semibold text-white hover:text-blue-500 transition-all duration-200 line-clamp-2">
              {item.snippet.title}
            </h3>
            <p className="text-xs text-gray-400 mt-2">{item.snippet.channelTitle}</p>
            <p className="text-xs text-gray-400">{new Date(item.snippet.publishedAt).toLocaleDateString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Short;
