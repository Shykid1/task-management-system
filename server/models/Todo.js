import mongoose from "mongoose";
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
	text: {
		type: String,
		required: true
	},
	complete: {
		type: Boolean,
		default: false
	}
}, {
    timestamps: true
});

const Todo = mongoose.models.Todo || mongoose.model("Todo", TodoSchema);

export default Todo;