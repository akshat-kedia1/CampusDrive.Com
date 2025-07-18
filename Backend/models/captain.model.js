const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const captainSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "First Name should of atleast 3 characters long"],
    },
    lastname: {
      type: String,
      minlength: [3, "Last Name should of atleast 3 characters long"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, "Email should of atleast 5 characters long"],
  },
  password: {
    type: String,
    required: true,
    select: false, // user find krte time nhi jaaega
  },
  socketId: {
    type: String,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },
  vehicle: {
    color: {
      type: String,
      required: true,
      minlength: [3, "Color should of atleast 3 characters long"],
    },
    plate: {
      type: String,
      required: true,
      minlength: [4, "Color should of atleast 3 characters long"],
    },
    capacity: {
      type: Number,
      required: true,
      min: [1, "Capacity should of atleast 1"],
    },
    vehicleType: {
      type: String,
      required: true,
      enum: ["car", "motercycle", "auto"],
    },
  },
  location: {
    ltd: {
      type: Number,
    },
    lng: {
      type: Number,
    },
  },
  dailyStats: {
    date: {
      type: Date,
      default: new Date().setHours(0, 0, 0, 0),
    },
    totalDistance: {
      type: Number,
      default: 0,
    },
    totalEarnings: {
      type: Number,
      default: 0,
    },
    totalTime: {
      type: Number,
      default: 0,
    },
    totalRides: {
      type: Number,
      default: 0,
    },
  },
});

captainSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};

captainSchema.statics.resetDailyStats = async function () {
  try {
    await this.updateMany(
      {},
      {
        $set: {
          totalEarnings: 0,
          distanceCovered: 0,
          totalRideTime: 0,
          ridesCompleted: 0,
        },
      }
    );
    console.log("Captain daily stats reset successfully.");
  } catch (error) {
    console.error("Error resetting captain daily stats:", error);
  }
};

captainSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

captainSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const captainModel = mongoose.model("captain", captainSchema);

module.exports = captainModel;
