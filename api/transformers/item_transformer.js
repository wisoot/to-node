function transformItem(item) {
  return {
    'id': item.id,
    'description': item.description,
    'is_finished': item.isFinished,
    'created_at': item.createdAt.format(),
    'finished_at': item.finishedAt === null
      ? null : item.finishedAt.format()
  }
}

module.exports = {
  transformItem
};