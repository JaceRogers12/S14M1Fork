const router = require('express').Router()
const Account = require("./accounts-model");
const {
  checkAccountPayload,
  checkAccountNameUnique,
  checkAccountId
} = require("./accounts-middleware.js");

router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC
  let accounts = await Account.getAll();
  try {
    res.status(200).send(accounts);
  } catch(err) {
    next(err);
  }
})

router.get('/:id', checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  let account = await Account.getById(req.params.id);
  try {
    res.status(200).send(account);
  } catch(err) {
    next(err);
  }
})

router.post('/', checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  // DO YOUR MAGIC
  let name = req.body.name.trim();
  let budget = req.body.budget;
  let payload = {name: name, budget: budget};
  let newAccount = await Account.create(payload);
  try {
    res.status(201).send(newAccount);
  } catch(err) {
    next(err);
  }
})

router.put('/:id', checkAccountId, checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  // DO YOUR MAGIC
  let name = req.body.name.trim();
  let budget = req.body.budget;
  let payload = {name: name, budget: budget};
  let alteredAccount = await Account.updateById(req.params.id, payload);
  try {
    res.status(200).send(alteredAccount);
  } catch(err) {
    next(err);
  }
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  let deletedAccount = await Account.deleteById(req.params.id);
  try {
    res.status(200).send(deletedAccount)
  } catch(err) {
    next(err);
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  if (!err.status || err.status == 500) {
    err.status = 500;
    err.message = "There was an issue with the server";
  }
  res.status(err.status).json({message: err.message});
})

module.exports = router;
