const moment = require('moment');

class Item {
  constructor(id, description, isFinished, createdAt, finishedAt) {
    this.id = id;
    this.description = description;
    this.isFinished = isFinished;
    this.createdAt = createdAt;
    this.finishedAt = finishedAt;
  }

  finish() {
    if (this.isFinished) {
      return;
    }

    this.isFinished = true;
    this.finishedAt = moment()
  }
}

module.exports = Item;