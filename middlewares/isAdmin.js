const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next();
  }
  return res.status(403).json({ message: "Forbidden: Admins only" });
};
module.exports = isAdmin;
