/*
======================================================
Budget API router
======================================================
*/

// Module dependencies
const express = require('express');
const asyncHandler = require('express-async-handler');

// Controller dependencies
const authController = require('../controllers/auth');
const permController = require('../controllers/permission');
const controller = require('../controllers/budget');

const router = express.Router();

router.get('/',
  asyncHandler(authController.requireAuth),
  asyncHandler(permController.getPerms),
  asyncHandler(controller.getBudgets)
);

router.post('/',
  asyncHandler(authController.requireAuth),
  asyncHandler(controller.createBudget)
);

module.exports = router;