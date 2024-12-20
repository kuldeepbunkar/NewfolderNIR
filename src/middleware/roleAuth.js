const roles = {
  ADMIN: 'admin',
  AGENT: 'agent',
  USER: 'user'
};

exports.checkRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const hasRole = allowedRoles.includes(req.user.role);
    if (!hasRole) {
      return res.status(403).json({ message: 'Not authorized for this action' });
    }

    next();
  };
};

exports.roles = roles; 