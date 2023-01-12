const mongoose = require("mongoose")
// const Client = require("./Client")

const ProjectSchema = new mongoose.Schema({
	name: {
		type: String,
	},
	description: {
		type: String,
	},
	status: {
		type: String,
		enum: ["Not Started", "Completed", "In Progress"],
	},
	clientId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Client",
	},
})

module.exports = mongoose.model("ProjectSchema", ProjectSchema)
