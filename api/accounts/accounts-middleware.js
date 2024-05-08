const Account = require("./accounts-model.js");
const db = require("../../data/db-config.js");

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
  if (!req.body.name || req.body.budget === undefined) {
    next({status: 400, message: "name and budget are required"});
  } else {
      let name = req.body.name.trim();
      let budget = req.body.budget;
    if (name.length > 100 || name.length < 3) {
      next({status: 400, message: "name of account must be between 3 and 100"})
    } else if (typeof budget != "number" || isNaN(budget)) {
      next({status: 400, message: "budget of account must be a number"})
    } else if (budget < 0 || budget > 1000000) {
      next({status: 400, message: "budget of account is too large or too small"})
    } else {
      next();
    }
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  let newName = req.body.name.trim();
  let [nameTakenId] = await db("accounts").where({name: newName}).select("id");
  if (!nameTakenId) {
    next();
  } else if (req.method == "POST") {
    next({status: 400, message: "that name is taken"});
  } else {
    let targetId = req.params.id;
    if (targetId == nameTakenId.id) {
      next();
    } else {
      next({status: 400, message: "that name is taken"});
    }
  }
}

exports.checkAccountId = async (req, res, next) => {
  // DO YOUR MAGIC
  let id = req.params.id;
  if (id) {
    let selectedAccount = await Account.getById(id);
    if (!selectedAccount) {
      next({status: 404, message: "account not found"});
    } else {
      next();
    }
  } else {
    next({status: 400, message: "There was no id provided"})
  }
}
