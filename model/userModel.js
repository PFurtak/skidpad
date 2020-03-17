const db = require('./conn'),
  bcrypt = require('bcryptjs');

class User {
  constructor(id, username, email, password) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
  }
  checkPassword(hashedPassword) {
    return bcrypt.compareSync(this.password, hashedPassword);
  }
  async addUser() {
    try {
      const response = await db.one(
        `INSERT INTO users(username, email, password) VALUES ($1,$2,$3) RETURNING id`,
        [this.username, this.email, this.password]
      );
      return response;
    } catch (e) {
      return e;
    }
  }
  async loginUser() {
    try {
      const response = await db.one(
        `SELECT id, username, password FROM users WHERE username = $1;`,
        [this.username]
      );

      const isValid = this.checkPassword(response.password);

      if (!!isValid) {
        const { id, username } = response;
        return { isValid, user_id: id, username };
      } else {
        return isValid;
      }
    } catch (e) {
      return e;
    }
  }
}

module.exports = User;
