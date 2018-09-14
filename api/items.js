const ItemManager = require('../item_manager');
const ItemManagerGateway = require('../services/gateways/mysql/item_manager_gateway');
const ItemTransformer = require('./transformers/item_transformer');

async function store(req, res) {
  const itemManager = new ItemManager(new ItemManagerGateway());

  console.log(req.body.description);

  const item = await itemManager.addItem(req.body.description);

  res.json(ItemTransformer.transformItem(item), 201);
}

async function finish(req, res) {
  const id = req.params.id;
  const itemManager = new ItemManager(new ItemManagerGateway());

  const item = await itemManager.finishItem(id);

  res.json(ItemTransformer.transformItem(item));
}

async function show(req, res) {
  const id = req.params.id;
  const itemManager = new ItemManager(new ItemManagerGateway());

  const item = await itemManager.getItem(id);

  res.json(ItemTransformer.transformItem(item));
}

async function indexFinished(req, res) {
  const itemManager = new ItemManager(new ItemManagerGateway());

  const items = await itemManager.getFinishedItems();

  let data = [];
  
  for (let i = 0; i < items.length; ++i) {
    data.push(ItemTransformer.transformItem(items[i]));
  }

  res.json(data);
}

async function indexUnfinished(req, res) {
  const itemManager = new ItemManager(new ItemManagerGateway());

  const items = await itemManager.getUnfinishedItems();

  let data = [];
  
  for (let i = 0; i < items.length; ++i) {
    data.push(ItemTransformer.transformItem(items[i]));
  }

  res.json(data);
}

module.exports = {
  store,
  finish,
  show,
  indexFinished,
  indexUnfinished
};