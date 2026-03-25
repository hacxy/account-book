const cloud = require("wx-server-sdk");
const crypto = require("crypto");

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV });

const db = cloud.database();

/**
 * 将 openid hash 为 2-6 位的短用户名
 * 取 sha256 前 4 字节转 base36，截取前 6 位，最短保证 2 位
 */
function hashOpenid(openid) {
  const hex = crypto.createHash("sha256").update(openid).digest("hex");
  const num = parseInt(hex.slice(0, 8), 16);
  const name = num.toString(36).slice(0, 6);
  return name.length >= 2 ? name : name.padEnd(2, "0");
}

exports.main = async (event, context) => {
  const { OPENID } = cloud.getWXContext();

  if (!OPENID) {
    return { code: 401, message: "无法获取用户身份" };
  }

  const userCollection = db.collection("user");

  // 查询用户是否已存在
  const { data } = await userCollection
    .where({ openid: OPENID })
    .limit(1)
    .get();

  if (data.length > 0) {
    return { code: 0, data: data[0] };
  }

  // 新用户：创建记录
  const username = hashOpenid(OPENID);
  const now = db.serverDate();
  const result = await userCollection.add({
    data: {
      openid: OPENID,
      username,
      createdAt: now,
      updatedAt: now,
    },
  });

  return {
    code: 0,
    data: {
      _id: result._id,
      openid: OPENID,
      username,
    },
  };
};
