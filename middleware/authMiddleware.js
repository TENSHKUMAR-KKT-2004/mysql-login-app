const requireAuth = (req, res, next) => {
  // Check if user is authenticated
  if (req.session && req.session.user) {
      return next()
    }
  // User is not authenticated or session doesn't exist, redirect to the login page
  return res.redirect('/')
}

module.exports = { requireAuth }
