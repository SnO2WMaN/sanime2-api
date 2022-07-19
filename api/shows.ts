import { VercelApiHandler } from "@vercel/node";

import { fetchEm, isValidAnilistId, isValidAnnictId } from "../src";

const handler: VercelApiHandler = async (req, res) => {
  let userIds = req.query["users"];
  if (!userIds) {
    res.statusCode = 400;
    res.statusMessage = "must users";
    return;
  } else if (typeof userIds === "string") {
    userIds = userIds.split(",");
  }

  if (userIds.length > 20) {
    res.statusCode = 422;
    res.statusMessage = "Too many users";
    return;
  }

  for (const userId of userIds) {
    if (!isValidAnilistId(userId) && !isValidAnnictId(userId)) {
      res.statusCode = 422;
      res.statusMessage = "Invalid user id";
      return;
    }
  }

  const result = await fetchEm(userIds);
  res.json(result);
};

export default handler;
