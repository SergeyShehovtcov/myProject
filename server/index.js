require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const { Brand } = require("./models/models");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const router = require("./routes/index");
const errorHandler = require("./middleware/ErrorHandlingMiddleware");
const path = require("path");

const PORT = process.env.PORT || 5000;

// REST API
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(fileUpload({}));
app.use("/api", router);

app.use(errorHandler);

const start = (async = () => {
  try {
    sequelize.authenticate();
    sequelize.sync();
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
});

start();

// GRAPHQL
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema");

const root = {
  getAllBrands: () => {
    return Brand.findAll();
  },
  getOneBrand: ({ id }) => {
    return Brand.findOne({ where: { id } });
  },
  createBrand: ({ input }) => {
    return Brand.create(input);
  },
  updateBrand: ({ input }) => {
    const { id, name } = input;
    return Brand.update({ name }, { where: { id } });
  },
  deleteBrand: ({ id }) => {
    return Brand.destroy({ where: { id } });
  },
};

app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: root,
  }),
);
