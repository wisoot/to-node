const moment = require('moment');
const Item = require('./entities/item');

class ItemManager {
  constructor(gateway) {
    this.gateway = gateway;
  }

  async addItem(description) {
    const item = new Item(
      null,
      description,
      false,
      moment(),
      null
    );

    return await this.gateway.create(item);
  }

  async finishItem(id) {
    let item = await this.getItem(id);

    if (item === null) {
      throw new Error('Item cannot be found!');
    }

    item.finish();

    await this.gateway.update(item);

    return item;
  }

  async getItem(id) {
    return await this.gateway.getById(id);
  }

  async getFinishedItems() {
    return await this.gateway.getAllFinished();
  }

  async getUnfinishedItems() {
    return await this.gateway.getAllUnfinished();
  }
}

module.exports = ItemManager;