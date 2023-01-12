// const { clients, projects } = require("../sampleData")
const {
	GraphQLObjectType,
	GraphQLID,
	GraphQLString,
	GraphQLSchema,
	GraphQLList,
} = require("graphql")
const Project = require("../models/Project")
const Client = require("../models/Client")
const { clients } = require("../sampleData")

const ClientType = new GraphQLObjectType({
	name: "Client",
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		email: { type: GraphQLString },
		number: { type: GraphQLString },
	}),
})

//project type
const ProjectType = new GraphQLObjectType({
	name: "Projects",
	fields: () => ({
		id: { type: GraphQLID },
		clientId: { type: GraphQLString },
		name: { type: GraphQLString },
		description: { type: GraphQLString },
		client: {
			type: ClientType,
			resolve(parent, args) {
				return clients.findById(parent.clientId)
			},
		},
	}),
})

const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		projects: {
			type: new GraphQLList(ProjectType),
			resolve(parent, args) {
				return Project.find()
			},
		},
		project: {
			type: ProjectType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return Project.findById(args.id)
			},
		},
		clients: {
			type: new GraphQLList(ClientType),
			resolve(parent, args) {
				return Client.find()
			},
		},
		client: {
			type: ClientType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return Client.findById(args.id)
			},
		},
	},
})

module.exports = new GraphQLSchema({
	query: RootQuery,
})
