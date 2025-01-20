import React from 'react';

const Shimmer = () => {
    const shimmerArray = new Array(15).fill(0); // Creates an array of placeholders

    return (
        <div className="bg-black p-6 flex flex-wrap gap-6 justify-between">
            {shimmerArray.map((_, index) => (
                <div
                    key={index}
                    className="bg-gray-800 w-60 rounded-lg shadow-lg overflow-hidden animate-pulse"
                >
                    {/* Shimmer Thumbnail */}
                    <div className="w-full h-36 bg-gray-700"></div>

                    {/* Shimmer Content */}
                    <div className="p-4 flex flex-col gap-3">
                        {/* Title Placeholder */}
                        <div className="w-[90%] h-4 bg-gray-700 rounded"></div>
                        <div className="w-[60%] h-4 bg-gray-700 rounded"></div>

                        {/* Time Placeholder */}
                        <div className="w-[40%] h-3 bg-gray-700 rounded self-end"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Shimmer;
