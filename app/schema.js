let graphql = require ('graphql');

var CompanyType = new graphql.GraphQLObjectType({
  name: 'company',
  fields: function () {
    return {
      _id: {
        type: graphql.GraphQLString
      },
      company_name: {
        type: graphql.GraphQLString
      },
      contact_name: {
        type: graphql.GraphQLString
      },
      date_added: {
        type: graphql.GraphQLString
      },
      address: {
        type: graphql.GraphQLString
      },
      city_state_zip: {
        type: graphql.GraphQLString
      },
      phone: {
        type: graphql.GraphQLString
      },
      fax: {
        type: graphql.GraphQLString
      },
      owner_manager: {
        type: graphql.GraphQLString
      },
      managed_services_status: {
        type: graphql.GraphQLString
      }
    }
  }
});

var queryType = new graphql.GraphQLObjectType({
  name: 'query',
  fields: function () {
    return {
      companies: {
        type: new graphql.GraphQLList(CompanyType),
        resolve: function () {
          return COMPANIES;
        }
      }
    }
  }
});

module.exports = new graphql.GraphQLSchema({
  query: queryType
});
