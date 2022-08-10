module.exports = (app) => {
    require("./auth-router")(app)
    require("./user-router")(app)
  }