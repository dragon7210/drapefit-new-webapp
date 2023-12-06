/**
 * @author Sukhendu Mukherjee
 * @email smukherjee@drapefit.com
 * @developer li.yang@drapefit.com
 * @developer roman.tyshanov@drapefit.com
 * @coauthor suprakash.dev@drapefit.com
 * @company Drape Fit Inc.
 */
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

import User from '../models/admin/user.js';
import { sequelize } from '../config/db.js';
import {
  USER_ROLE_SUPER,
  USER_ROLE_ADMIN,
  USER_ROLE_CLIENT,
  USER_ROLE_STYLIST,
  USER_ROLE_INVENTORY,
  USER_ROLE_QA,
  USER_ROLE_SUPPORT,
  USER_ROLE_SUPPLIER,
  USER_ROLE_BRAND
} from '../utils/constant.js';
import UserDetail from '../models/admin/userDetail.js';

/**
 * @notice error code 401 is ONLY available here
 */

const protect = asyncHandler(async (req, res, next) => {
  console.log('----------- project authmdware.js -----------');
  let token = null;
  const authHeader = req.headers && req.headers['df-auth-token'];
  if (authHeader && authHeader.startsWith(process.env.BEARER_TOKEN_PREFIX)) {
    try {
      token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findOne({
        where: {
          id: decoded.id
        },
        include: UserDetail
      });
      if (!user) {
        console.log('MDWARE_protect_401:', 'User not found, invalid token');
        return res.status(401).json({
          msg: 'User not found, invalid token'
        });
      }
      req.token = token;
      req.user = user;
      return next();
    } catch (err) {
      console.log('MDWARE_protect_401:', err?.message);
      if (err instanceof jwt.TokenExpiredError) {
        return res.status(401).json({
          msg: 'Auth token has been expired'
        });
      } else {
        return res.status(401).json({
          msg: 'Not authorized, invalid token'
        });
      }
    }
  }

  if (!token) {
    console.log('MDWARE_protect_401:', 'Not authorized, no token found');
    res.status(401).json({
      msg: 'Not authorized, no token found'
    });
  }
});

const protectAdmin = asyncHandler(async (req, res, next) => {
  let token = null;
  const authHeader = req.headers && req.headers['df-auth-token'];

  if (authHeader && authHeader.startsWith(process.env.BEARER_TOKEN_PREFIX)) {
    try {
      token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findByPk(decoded.id);
      if (!user) {
        console.log('MDWARE_protectAdmin_401:', 'User not found, invalid token');
        return res.status(401).json({
          msg: 'User not found, invalid token'
        });
      }
      const adminRoles = [USER_ROLE_SUPER, USER_ROLE_ADMIN];
      if (!adminRoles.includes(user.role)) {
        console.log('MDWARE_protectAdmin_401:', 'Forbidden, invalid role access');
        return res.status(401).json({
          msg: 'Forbidden, invalid role access'
        });
      }
      req.token = token;
      req.user = user;
      return next();
    } catch (err) {
      console.log('MDWARE_protectAdmin_401:', err?.message);
      if (err instanceof jwt.TokenExpiredError) {
        return res.status(401).json({
          msg: 'Auth token has been expired'
        });
      } else {
        return res.status(401).json({
          msg: 'Not authorized, invalid token'
        });
      }
    }
  }

  if (!token) {
    console.log('MDWARE_protectAdmin_401:', 'Not authorized, no token found');
    res.status(401).json({
      msg: 'Not authorized, no token found'
    });
  }
});

const protectClinet = asyncHandler(async (req, res, next) => {
  let token = null;
  const authHeader = req.headers && req.headers['df-auth-token'];

  if (authHeader && authHeader.startsWith(process.env.BEARER_TOKEN_PREFIX)) {
    try {
      token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findOne({ where: { id: decoded.id }, includes: UserDetail });
      if (!user) {
        console.log('MDWARE_protectClient_401:', 'User not found, invalid token');
        return res.status(401).json({
          msg: 'User not found, invalid token'
        });
      }
      const clientRoles = [USER_ROLE_SUPER, USER_ROLE_CLIENT];
      if (!clientRoles.includes(user.role)) {
        console.log('MDWARE_protectClient_401:', 'Forbidden, invalid role access');
        return res.status(401).json({
          msg: 'Forbidden, invalid role access'
        });
      }
      req.token = token;
      req.user = user;
      return next();
    } catch (err) {
      console.log('MDWARE_protectClient_401:', err?.message);
      if (err instanceof jwt.TokenExpiredError) {
        return res.status(401).json({
          msg: 'Auth token has been expired'
        });
      } else {
        return res.status(401).json({
          msg: 'Not authorized, invalid token'
        });
      }
    }
  }

  if (!token) {
    console.log('MDWARE_protectClient_401:', 'Not authorized, no token found');
    res.status(401).json({
      msg: 'Not authorized, no token found'
    });
  }
});

const protectInventory = asyncHandler(async (req, res, next) => {
  let token = null;
  const authHeader = req.headers && req.headers['df-auth-token'];

  if (authHeader && authHeader.startsWith(process.env.BEARER_TOKEN_PREFIX)) {
    try {
      token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findOne({
        where: {
          id: decoded.id
        }
      });
      if (!user) {
        console.log('MDWARE_protectInventory_401:', 'User not found, invalid token');
        return res.status(401).json({
          msg: 'User not found, invalid token'
        });
      }
      const inventoryRoles = [USER_ROLE_SUPER, USER_ROLE_INVENTORY];
      if (!inventoryRoles.includes(user.role)) {
        console.log('MDWARE_protectInventory_401:', 'Forbidden, invalid role access');
        return res.status(401).json({
          msg: 'Forbidden, invalid role access'
        });
      }
      req.token = token;
      req.user = user;
      return next();
    } catch (err) {
      console.log('MDWARE_protectInventory_401:', err?.message);
      if (err instanceof jwt.TokenExpiredError) {
        return res.status(401).json({
          msg: 'Auth token has been expired'
        });
      } else {
        return res.status(401).json({
          msg: 'Not authorized, invalid token'
        });
      }
    }
  }

  if (!token) {
    console.log('MDWARE_protectInventory_401:', 'Not authorized, no token found');
    res.status(401).json({
      msg: 'Not authorized, no token found'
    });
  }
});

const protectSupplier = asyncHandler(async (req, res, next) => {
  let token = null;
  const authHeader = req.headers && req.headers['df-auth-token'];

  if (authHeader && authHeader.startsWith(process.env.BEARER_TOKEN_PREFIX)) {
    try {
      token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findByPk(decoded.id);
      if (!user) {
        console.log('MDWARE_protectSupplier_401:', 'User not found, invalid token');
        return res.status(401).json({
          msg: 'User not found, invalid token'
        });
      }
      const supplierRoles = [USER_ROLE_SUPER, USER_ROLE_SUPPLIER];
      if (!supplierRoles.includes(user.role)) {
        console.log('MDWARE_protectSupplier_401:', 'Forbidden, invalid role access');
        return res.status(401).json({
          msg: 'Forbidden, invalid role access'
        });
      }
      req.token = token;
      req.user = user;
      return next();
    } catch (err) {
      console.log('MDWARE_protectSupplier_401:', err?.message);
      if (err instanceof jwt.TokenExpiredError) {
        return res.status(401).json({
          msg: 'Auth token has been expired'
        });
      } else {
        return res.status(401).json({
          msg: 'Not authorized, invalid token'
        });
      }
    }
  }

  if (!token) {
    console.log('MDWARE_protectSupplier_401:', 'Not authorized, no token found');
    res.status(401).json({
      msg: 'Not authorized, no token found'
    });
  }
});

const protectEmployee = asyncHandler(async (req, res, next) => {
  const UserModel = sequelize.model('User', User);
  let token = null;
  const authHeader = req.headers && req.headers['df-auth-token'];

  if (authHeader && authHeader.startsWith(process.env.BEARER_TOKEN_PREFIX)) {
    try {
      token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await UserModel.findOne({
        id: decoded.id,
        'tokens.token': token
      }).select('-password');
      if (!user) {
        console.log('MDWARE_protectEmployee_401:', 'User not found, invalid token');
        return res.status(401).json({
          msg: 'User not found, invalid token'
        });
      }
      const employeeRoles = [USER_ROLE_SUPER, USER_ROLE_STYLIST, USER_ROLE_INVENTORY, USER_ROLE_QA, USER_ROLE_SUPPORT];
      if (!employeeRoles.includes(user.role)) {
        console.log('MDWARE_protectEmployee_401:', 'Forbidden, invalid role access');
        return res.status(401).json({
          msg: 'Forbidden, invalid role access'
        });
      }
      req.token = token;
      req.user = user;
      return next();
    } catch (err) {
      console.log('MDWARE_protectEmployee_401:', err?.message);
      if (err instanceof jwt.TokenExpiredError) {
        return res.status(401).json({
          msg: 'Auth token has been expired'
        });
      } else {
        return res.status(401).json({
          msg: 'Not authorized, invalid token'
        });
      }
    }
  }

  if (!token) {
    console.log('MDWARE_protectEmployee_401:', 'Not authorized, no token found');
    res.status(401).json({
      msg: 'Not authorized, no token found'
    });
  }
});

const protectBrand = asyncHandler(async (req, res, next) => {
  const UserModel = sequelize.model('User', User);
  let token = null;
  const authHeader = req.headers && req.headers['df-auth-token'];

  if (authHeader && authHeader.startsWith(process.env.BEARER_TOKEN_PREFIX)) {
    try {
      token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await UserModel.findOne({
        id: decoded.id,
        'tokens.token': token
      }).select('-password');
      if (!user) {
        console.log('MDWARE_protectBrand_401:', 'User not found, invalid token');
        return res.status(401).json({
          msg: 'User not found, invalid token'
        });
      }
      const brandRoles = [USER_ROLE_SUPER, USER_ROLE_BRAND];
      if (!brandRoles.includes(user.role)) {
        console.log('MDWARE_protectBrand_401:', 'Forbidden, invalid role access');
        return res.status(401).json({
          msg: 'Forbidden, invalid role access'
        });
      }
      req.token = token;
      req.user = user;
      return next();
    } catch (err) {
      console.log('MDWARE_protectBrand_401:', err?.message);
      if (err instanceof jwt.TokenExpiredError) {
        return res.status(401).json({
          msg: 'Auth token has been expired'
        });
      } else {
        return res.status(401).json({
          msg: 'Not authorized, invalid token'
        });
      }
    }
  }

  if (!token) {
    console.log('MDWARE_protectBrand_401:', 'Not authorized, no token found');
    res.status(401).json({
      msg: 'Not authorized, no token found'
    });
  }
});

const protectMerchandise = asyncHandler(async (req, res, next) => {
  const UserModel = sequelize.model('User', User);
  let token = null;
  const authHeader = req.headers && req.headers['df-auth-token'];

  if (authHeader && authHeader.startsWith(process.env.BEARER_TOKEN_PREFIX)) {
    try {
      token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await UserModel.findOne({
        id: decoded.id,
        'tokens.token': token
      }).select('-password');
      if (!user) {
        console.log('MDWARE_protectMerchandise_401:', 'User not found, invalid token');
        return res.status(401).json({
          msg: 'User not found, invalid token'
        });
      }
      const supplierRoles = [USER_ROLE_SUPER, USER_ROLE_SUPPLIER];
      if (!supplierRoles.includes(user.role)) {
        console.log('MDWARE_protectMerchandise_401:', 'Forbidden, invalid role access');
        return res.status(401).json({
          msg: 'Forbidden, invalid role access'
        });
      }
      req.token = token;
      req.user = user;
      return next();
    } catch (err) {
      console.log('MDWARE_protectMerchandise_401:', err?.message);
      if (err instanceof jwt.TokenExpiredError) {
        return res.status(401).json({
          msg: 'Auth token has been expired'
        });
      } else {
        return res.status(401).json({
          msg: 'Not authorized, invalid token'
        });
      }
    }
  }

  if (!token) {
    console.log('MDWARE_protectMerchandise_401:', 'Not authorized, no token found');
    res.status(401).json({
      msg: 'Not authorized, no token found'
    });
  }
});

export {
  protect,
  protectAdmin,
  protectClinet,
  protectInventory,
  protectSupplier,
  protectEmployee,
  protectBrand,
  protectMerchandise
};
