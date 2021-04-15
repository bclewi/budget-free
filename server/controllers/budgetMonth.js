/*
======================================================
BudgetMonth controller
======================================================
*/

// Model dependencies
const db = require('../models/db');
/*
Sequelize Operators for queries
https://sequelize.org/master/variable/index.html#static-variable-Op
*/
const Op = db.Sequelize.Op;

/* 
----------------
READ BUDGET MONTHS OF THE GIVEN BUDGET OF THE AUTHENTICATED USER
----------------
*/
exports.getBudgetMonths = async (req, res) => {
  console.log('\n[BudgetMonth Controller] Getting budgetMonths...');

  // Check if authUser perms include given budgetId
  const budgetIdsPermitted = [];
  res.locals.perms.map(perm => {
    budgetIdsPermitted.push(perm.budgetId);
  });
  console.log('[BudgetMonth Controller] budgetIdsPermitted: '+budgetIdsPermitted);
  console.log('[BudgetMonth Controller] req.params.budgetId: '+req.query.budgetId);
  const permGranted = budgetIdsPermitted.includes(req.query.budgetId);
  console.log('[BudgetMonth Controller] permGranted: '+permGranted);
  if (!permGranted) {
    console.log('[BudgetMonth Controller] Permission to the requested resource denied.');
    return res.status(401).send('Permission to the requested resource denied.');
  }
  console.log('[BudgetMonth Controller] Permission to the requested resource granted.');

  // Get all budgetMonths for the given budgetId if permitted
  const budgetMonthsRes = await db.budgetMonths.findAll({
    where: { 
      budget_id: req.query.budgetId
    }
  });
  console.log('[BudgetMonth Controller] Done: '+JSON.stringify(budgetMonthsRes));
  return res.send(budgetMonthsRes);

};

/* 
----------------
CREATE NEW BUDGET MONTH
----------------
*/
exports.createBudgetMonth = async (req, res) => {

  // validate request
  if (!req.body.budgetId || !req.body.year || !req.body.month) {
    return res.status(400).send('budgetId, year and month are required to create a budgetMonth');
  }
  // Check if authUser perms include given budgetId
  const budgetIdsPermitted = [];
  res.locals.perms.map(perm => {
    budgetIdsPermitted.push(perm.budgetId);
  });
  console.log('[BudgetMonth Controller] budgetIdsPermitted: '+budgetIdsPermitted);
  console.log('[BudgetMonth Controller] req.params.budgetId: '+req.body.budgetId);
  const permGranted = budgetIdsPermitted.includes(req.body.budgetId);
  console.log('[BudgetMonth Controller] permGranted: '+permGranted);
  if (!permGranted) {
    console.log('[BudgetMonth Controller] Permission to the requested resource denied.');
    return res.status(401).send('Permission to the requested resource denied.');
  }
  console.log('[BudgetMonth Controller] Permission to the requested resource granted.');

  console.log('\n[BudgetMonth Controller] Creating new budgetMonth...');
  const newBudgetMonth = await db.budgetMonths.create({
    budget_id: req.body.budgetId,
    year: req.body.year,
    month: req.body.month,
  });
  console.log('[BudgetMonth Controller] Done: New budgetMonth created with id: '+newBudgetMonth.id);
  return res.status(200).send(newBudgetMonth);

}

/* 
----------------
DELETE A BUDGET MONTH
----------------
*/
exports.deleteBudgetMonth = async (req, res) => {

  // validate request
  if (!req.params.budgetMonthId) {
    console.log('[BudgetMonth Controller] budgetMonthId required to delete budgetMonth');
    return res.status(400).send('budgetMonthId required to delete budgetMonth');
  }
  //console.log('[BudgetMonth Controller] req.params.budgetMonthId: '+req.params.budgetMonthId);
  const budgetIdsPermitted = [];
  res.locals.perms.map(perm => {
    budgetIdsPermitted.push(perm.budgetId);
  });
  //console.log('[BudgetMonth Controller] budgetIdsPermitted: '+budgetIdsPermitted);

  const budgetMonth = await db.budgetMonths.findOne({
    where: { 
      id: req.params.budgetMonthId
    }
  });
  //console.log('[BudgetMonth Controller] budgetMonth.budget_id: '+budgetMonth.budget_id);
  
  const permGranted = budgetIdsPermitted.includes(budgetMonth.budget_id);
  //console.log('[BudgetMonth Controller] permGranted: '+permGranted);
  if (!permGranted) {
    console.log('[BudgetMonth Controller] Permission to the requested resource denied.');
    return res.status(401).send('Permission to the requested resource denied.');
  }
  //console.log('[BudgetMonth Controller] Permission to the requested resource granted.');

  console.log('\n[BudgetMonth Controller] Deleting budgetMonth...');
  const deleteRes = await db.budgetMonths.destroy({
    where: {
      id: req.params.budgetMonthId
    }
  });
  if (deleteRes !== 1) {
    console.log('[BudgetMonth Controller] Error: The requested resource could not be deleted');
    return res.status(500).send();
  }
  console.log('[BudgetMonth Controller] Done: Deleted the requested resource');
  return res.status(204).send(); // No Content

};