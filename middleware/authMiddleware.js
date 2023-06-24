const requireAuth = (req, res, next) => {
  // Check if user is authenticated
  if (req.session && req.session.user) {
    const { role } = req.session.user;
    if (role === 'admin' && !req.originalUrl.includes('/admin')) {
      return res.redirect('/admin');
    } else if (role === 'customer' && !req.originalUrl.includes('/customer')) {
      return res.redirect('/customer');
    }
    return next();
  }
  // User is not authenticated or session doesn't exist, redirect to the login page
  return res.redirect('/');
};

module.exports = { requireAuth };
