import jwt from 'jsonwebtoken';
export const verifyToken = (req, res, next) => {
    const rawHeader = req.headers.authorization;
    const token = req.cookies.accessToken || rawHeader?.split(' ')[1];
  
    console.log("Raw Authorization Header:", rawHeader);
    console.log("Extracted Token:", token);
  
    if (!token) {
      return res.status(401).json({ success: false, message: "You're not authorized" });
    }
  
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
      if (err) {
        console.error("JWT Verification Error:", err.message);
        return res.status(401).json({ success: false, message: "Token is invalid" });
      }
  
      req.user = user;
      next();
    });
  };
  

// Keep all your existing verification middleware
export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if(req.user.id === req.params.id || req.user.role === 'admin'){
            next();
        } else {
           return res.status(401).json({success:false, message:"You're not authenticated"});
        }
    });
};

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if(req.user.role === 'admin'){
            next();
        } else {
            return res.status(401).json({success:false, message:"You're not authenticated"});
        }
    });
};

export const verifyGuide = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if(req.user.role === 'Guide') {
            next();
        } else {
            return res.status(403).json({ success: false, message: "You're not authorized as a guide" });
        }
    });
};
