import React from "react";

const CaptainDetails = ({ captainDetails }) => {
  const fullName =
    captainDetails?.fullname?.firstname +
    " " +
    (captainDetails?.fullname?.lastname || "");

  const dailyStats = captainDetails?.dailyStats || {};

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start gap-3">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&s"
            alt=""
          />
          <h4 className="text-lg font-medium capitalize">{fullName}</h4>
        </div>
        <div>
          <h4 className="text-xl font-semibold">
            ₹{dailyStats.totalEarnings || 0}
          </h4>
          <p className="text-sm text-gray-600">Earned</p>
        </div>
      </div>

      <div className="flex p-3 mt-8 bg-gray-100 rounded-xl justify-center gap-5 items-start">
        <div className="text-center">
          <i className="text-3xl mb-2 font-thin ri-timer-2-line"></i>
          <h5 className="text-lg font-medium">
            {Math.floor((dailyStats.totalTime || 0) / 60)} min
          </h5>
          <p className="text-sm text-gray-600">Time Travelled</p>
        </div>
        <div className="text-center">
          <i className="text-3xl mb-2 font-thin ri-speed-up-line"></i>
          <h5 className="text-lg font-medium">
            {(dailyStats.totalDistance || 0) / 1000} km
          </h5>
          <p className="text-sm text-gray-600">Distance Covered</p>
        </div>
        <div className="text-center">
          <i className="text-3xl mb-2 font-thin ri-booklet-line"></i>
          <h5 className="text-lg font-medium">{dailyStats.totalRides || 0}</h5>
          <p className="text-sm text-gray-600">Trips Completed</p>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;



