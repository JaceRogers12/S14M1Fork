const db = require("../../data/db-config.js");

const getAll = async () => {
  // DO YOUR MAGIC
  return await db("accounts");
}

const getById = async id => {
  // DO YOUR MAGIC
  return await db("accounts")
    .where({id: id})
    .first();
}

const create = async account => {
  // DO YOUR MAGIC
  let [id] = await db("accounts")
    .insert(account);
  let newAccount = getById(id);
  return newAccount;
}

const updateById = async (id, account) => {
  // DO YOUR MAGIC
  await db("accounts")
    .where({id: id})
    .update(account);
  let updatedAccount = getById(id);
  return updatedAccount
}

const deleteById = async id => {
  // DO YOUR MAGIC
  let deletedAccount = getById(id);
  await db("accounts")
    .where({id: id})
    .del();
  return deletedAccount;
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
