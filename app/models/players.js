module.exports = (sequelize, type) => {
  return sequelize.define('player', {
    player_id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: type.STRING,
      defaultValue: null,
      unique: true,
      set (value) {
        (value.trim()) ? this.setDataValue('username', value.trim()) : this.setDataValue('username', null)
      },
      get () {
        return this.getDataValue('username') ? this.getDataValue('username') : 'Anonymous'
      }
    }
  })
}
