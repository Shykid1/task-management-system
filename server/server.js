import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors'
import * as dotenv from 'dotenv';
import Todo from './models/Todo.js'

dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL;
const PORT = process.env.PORT;


const app = express();

app.use(express.json());
app.use(cors());

const dbconnect = async () => {
	try {
	  await mongoose.connect(MONGODB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	  });
	  console.log('MongoDB connected');
	} catch (error) {
	  console.error('MongoDB connection error:', error);
	  process.exit(1);
	}
  };

dbconnect();


app.get('/todos', async (req, res) => {
	const todos = await Todo.find();

	res.json(todos);
});

app.post('/todo/new', (req, res) => {
	const todo = new Todo({
		text: req.body.text
	})

	todo.save();

	res.json(todo);
});

app.delete('/todo/delete/:id', async (req, res) => {
	const result = await Todo.findByIdAndDelete(req.params.id);

	res.json({result});
});

app.get('/todo/complete/:id', async (req, res) => {
	const todo = await Todo.findById(req.params.id);

	todo.complete = !todo.complete;

	todo.save();

	res.json(todo);
})

app.put('/todo/update/:id', async (req, res) => {
	const todo = await Todo.findById(req.params.id);

	todo.text = req.body.text;

	todo.save();

	res.json(todo);
});

app.listen(PORT);