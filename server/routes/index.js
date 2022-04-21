module.exports = (app) => {
  app.use("/api/event", require("./event.routes"));
  app.use("/api", require("./auth.routes.js"));
};
