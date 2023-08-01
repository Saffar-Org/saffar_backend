import * as Redis from "redis";
import Err from "../constants/error";
import User from "../models/User";
import Helper from "../utils/helper";

/// Gets user info from Redis server if present else gets user info
/// from MongoDB
const getUserInfo = async (req: any, res: any) => {
  try {
    const id: string = req.body.id;

    // If no id i.e. user id is present then return a 400
    // response
    if (!id) {
      return res.status(400).json({
        error: {
          code: Err.code.EMPTY_PARAM,
          message: Err.message.EMPTY_PARAM,
        },
      });
    }

    // Create a redis client
    const redisClient = Redis.createClient();

    // Get user info from redis server
    const userInfo = await redisClient.get(id);

    // If user info present in redis server then return user info
    if (userInfo) {
      return res.json({
        user: userInfo,
      });
    }

    // Find user info in MongoDB by using user id
    const user = await User.findById(id);

    // If user not found in MongoDB then return a 400 response
    if (!user) {
      return res.status(400).json({
        error: {
          code: Err.code.NO_USER_WITH_ID,
          message: Err.message.NO_USER_WITH_ID,
        },
      });
    }

    // Get user object without `_id` and `_v`
    const userWithout_idAnd_v = Helper.getObjectWithIdInsteadOf_idAnd__v(user);

    // Set the user info value to the key id for 3600 seconds
    await redisClient.setEx(id, 3600, JSON.stringify(userWithout_idAnd_v));

    // Return the user info
    res.json({
      user: userWithout_idAnd_v,
    });
  } catch (error) {
    console.log(`Error in getUserInfo: ${error}`);

    // Server error
    res.status(500).json({
      error: {
        code: Err.code.SERVER_ERROR,
        message: Err.message.SERVER_ERROR,
      },
    });
  }
};

export = getUserInfo;
