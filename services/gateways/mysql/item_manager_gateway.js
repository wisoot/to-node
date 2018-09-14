const squel = require('squel');
const moment = require('moment');
const mysql = require('../../../lib/mysql');
const Item = require('../../../entities/item');

class ItemManagerGateway {
  constructor() {
    //
  }

  async create(item) {
    const sql = squel.insert().into('items')
      .set('description', item.description)
      .set('is_finished', 0)
      .set('created_at', item.createdAt.format("YYYY-MM-DD HH:mm:ss"))
      .toString();

    try {
      const result = await mysql.query(sql);
      item.id = result.insertId;
      return item;
    } catch(err) {
      throw new Error(err)
    }
  }

  async update(item) {
    const sql = squel.update().table('items')
      .set('description', item.description)
      .set('is_finished', item.isFinished)
      .set('finished_at', item.finishedAt.format("YYYY-MM-DD HH:mm:ss"))
      .toString();

    try {
      await mysql.query(sql);
    } catch(err) {
      throw new Error(err)
    }
  }

  async getById(id) {
    const sql = squel.select().from('items').where('id=?', id).toString();

    try {
      const results = await mysql.query(sql);
      const item = new Item(
        results[0].id,
        results[0].description,
        results[0].is_finished === 1,
        moment(results[0].created_at),
        results[0].finished_at === null
          ? null : moment(results[0].finished_at),
      )

      return item;
    } catch(err) {
        throw new Error(err)
    }
  }

  async getAllFinished() {
    return await this.getAll(true);
  }

  async getAllUnfinished() {
    return await this.getAll(false);
  }

  async getAll(isFinish = false) {
    const sql = squel.select().from('items').where('is_finished=?', isFinish ? 1 : 0).toString();

    try {
      const results = await mysql.query(sql);
      let items = [];

      for (let i = 0; i < results.length; ++i) {
        items.push(new Item(
          results[i].id,
          results[i].description,
          results[i].is_finished === 1,
          moment(results[i].created_at),
          results[i].finished_at === null
            ? null : moment(results[i].finished_at),
        ));
      }

      return items;
    } catch(err) {
        throw new Error(err)
    }
  }
}

module.exports = ItemManagerGateway;