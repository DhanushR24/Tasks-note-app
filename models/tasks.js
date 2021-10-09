const mongoose = require('mongoose')
const schema = mongoose.Schema;

const TasksSchema = new schema({
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    },
})

const Tasks = mongoose.model('Tasks', TasksSchema)

module.exports = Tasks;