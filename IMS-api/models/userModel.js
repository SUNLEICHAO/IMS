const config = require("../knexfile");
const knex = require("knex")(config);

const BaseModel = require("./base");

class UserModel extends BaseModel {
  constructor(props = "users") {
    super(props);
  }
}

module.exports = UserModel;
