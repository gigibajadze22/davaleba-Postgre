import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => { 
  
  const token = req.headers.authorization.split(' ')[1]
  if (!token) { 
    return res.status(401).json({ message: 'Unauthorized - No Token' });
  }
  
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized - Invalid Token' });
    }
    req.user = decoded;
    next();
  });
};


export const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(401).json({ message: 'Only admins can access this route' });
  }
  next();
};

export const isAdminOrManager = (req, res, next) => {
  if (req.user.role === 'admin' || req.user.role === 'manager') {
    return next(); 
  }
  return res.status(401).json({ message: 'Only admins or managers can access this route' });
};
