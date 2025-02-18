// authMiddleware.js
export const isAuthenticated = (req, res, next) => {
  console.log("Checking is Authenticated");

  if (req.session.user) {
    next(); // User is authenticated, proceed to the next middleware/route
  } else {
    res.status(401).json({ message: "Unauthorized: Please log in" });
  }
};
