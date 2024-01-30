const { buildSchema } = require("graphql");

const schema = buildSchema(`
    type Brand {
        id: ID
        name: String
    }

    input CreateBrand {
        id: ID
        name: String!
    }

    input UpdateBrand {
        id: ID!
        name: String!
    }

    type Query {
        getAllBrands: [Brand]
        getOneBrand(id: ID): Brand
    }

    type Mutation {
        createBrand(input: CreateBrand): Brand
        updateBrand(input: UpdateBrand): Brand
        deleteBrand(id: ID): Brand
    }
`);

module.exports = schema;
