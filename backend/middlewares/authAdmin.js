import jwt from "jsonwebtoken";

// Admin authentication middleware
const authAdmin = async(req, res, next) => {
  try {
    const {atoken} = req.headers;
    if (!atoken)
      return res.json({ message: "Not authorized! Login again", success: false });
    const token_decoded = jwt.verify(atoken, process.env.JWT_SECRET);
    if (token_decoded !== process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD)
      return res.json({ message: "Not authorized! Login again", success: false , status: 411}); 
    next();
  } catch (error) {
    res.json({ message: error.message, success: false, status: 422 });
  }
};

export default authAdmin;
