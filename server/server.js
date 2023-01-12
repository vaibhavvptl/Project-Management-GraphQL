require("dotenv").config()

const express = require("express")
const { graphqlHTTP } = require("express-graphql")
const connectDB = require("./config/db")
const app = express()
const port = process.env.PORT || 5000
const schema = require("./schema/schema")

app.use(
	"/graphql",
	graphqlHTTP({
		schema,
		graphiql: process.env.NODE_ENV === "development",
		// graphiql: true,
	})
)

connectDB()

app.listen(port, () => console.log(`server listing on ${port} `))
