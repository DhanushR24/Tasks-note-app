const mongoose = require('mongoose');
const chalk = require('chalk')

const Tasks = require('./models/tasks')

mongoose.connect('mongodb+srv://DbConnect:test12345@cluster.bh7j7.mongodb.net/TasksHandler?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((res) => {
        console.log(chalk.bgGreen('Connected to the DataBase'))
    })
    .then(async ()=> {
    await createDocuments()
    await readDocuments()
    await updateDocuments()
    await deleteDocument()
})
    .catch((err) => {
        console.log(chalk.bgRed(`Oops error : ${err}`))
    })


async function createDocuments() {
    const task1 = new Tasks({
        description: "Study for Exams",
        completed: false
    })
    const task2 = new Tasks({
        description: "Complete stige projects",
        completed: false
    })
    const task3 = new Tasks({
        description: "Clean my room",
        completed: false
    })
    const task4 = new Tasks({
        description: "Learn to play chess",
        completed: false
    })

    await Promise.all([
            task1.save(),
            task2.save(),
            task3.save(),
            task4.save()
        ])
        .then((res) => {
            console.log(chalk.green("saved the documents successfully"))
        })
        .catch((err) => {
            console.log(chalk.bgRed(`Oops error occurred ${err}`))
        })
}

async function readDocuments() {
    console.log(chalk.bgBlue("Incomplete tasks:"));
    await Tasks.find({
            'completed': false
        })
        .then((data) => {
            data.forEach((ele) => {
                console.log(chalk.blue(ele.description))
            })
        })
}

async function updateDocuments() {
    await Tasks.updateMany({
        'completed': false
    }, {
        "$set": {
            'completed': true
        }
    })
    .then((res) => {
            console.log(chalk.green("Tasks updated to completed"));
    })
    .catch((err) => {
        console.log(err);
    })
}

async function deleteDocument() {
    await Tasks.findByIdAndDelete({
            _id: '616056907eea65a1bb129aba'
        })
        .then((err) => {
            if (err) {
                console.log(chalk.bgRed(`error: ${err}`))
            }
            else {
                console.log(chalk.red("Deleted the doc"))
            }
        })
}