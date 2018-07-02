/**
 * Copyright (c) 2018 Collin Grimm
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

const PouchDB = require('pouchdb');
const homedir = require('os').homedir();
const fs = require('fs');
const Table = require('cli-table');
let table = new Table({
    head: ['ID', 'Title', 'Task', 'Last Modified'],
    colWidths: [15, 20, 35, 15]
});
if (!fs.existsSync(`${homedir}/.local/share/Hera`)) { fs.mkdirSync(`${homedir}/.local/share/Hera`) }
const TaskDB = new PouchDB(`${homedir}/.local/share/Hera/TasksDB`);

class Tasks {
    async newTask(taskTitle, taskBody) {
        taskTitle = taskTitle.trim();
        try {
            if (!taskTitle) taskTitle = new Date().toDateString();
            let id = Number(new Date().toISOString().replace(/\D|2018-\d+-\d+/gmi, ''));
            let uniqueID = (Math.floor(Math.random(id) * id)).toString();

            let task = {
                _id: (uniqueID.length == 9) ? uniqueID : uniqueID.padStart(uniqueID.length, 0),
                title: taskTitle,
                body: taskBody,
                lastModified: new Date().toDateString(),
                completed: false
            };
            await TaskDB.put(task);
            return console.log('Task added');
        }
        catch (err) {
            console.log(`Error: (${err.status}) ${err.name}: ${err.message}`);
        }
    }

    async updateTask(taskId, newTaskTitle, newTaskBody) {
        try {
            if (taskId) {
                let task = await TaskDB.get(taskId);
                let id = Number(new Date().toISOString().replace(/\D|2018-\d+-\d+/gmi, ''));
                let uniqueID = (Math.floor(Math.random(id) * id)).toString();

                task._id = (uniqueID.length == 9) ? uniqueID : uniqueID.padStart(uniqueID.length, 0);
                task._rev = task._rev;
                task.title = newTaskTitle.trim();
                task.body = newTaskBody;
                task.lastModified = new Date().toDateString();

                return await TaskDB.put(task);

            }
        } catch (err) { console.log(`Error: (${err.status}) ${err.name}: ${err.message}`); }
    }

    async showAllTask() {
        let docs = [];
        try {
            let allDocs = await TaskDB.allDocs({ include_docs: true, descending: true });
            allDocs.rows.forEach(async (doc) => {
                docs.push(doc);
            });
        } catch (err) { console.log(`Error: (${err.status}) ${err.name}: ${err.message}`); }
        docs.forEach(task => {
            table.push([task.id, task.doc.title, task.doc.body, task.doc.lastModified]);
        });
        return console.log(table.toString());
    }

    async deleteTask(taskId) {
        try {
            let task = await TaskDB.get(taskId);
            TaskDB.remove(task._id, task._rev);
            return console.log('Task Deleted');
        } catch (err) {
            console.log(`Error: (${err.status}) ${err.name}: ${err.message}`);
        }
    }
    async deleteAllTask() {
        try {
            let allDocs = await TaskDB.allDocs({ include_docs: true, descending: true });
            allDocs.rows.forEach(async (task) => {
                task = await task;
                TaskDB.remove(task.doc._id, task.doc._rev);
            });
            return console.log('All Task Deleted');
        } catch (err) {
            console.log(`Error: (${err.status}) ${err.name}: ${err.message}`);
        }
    }
}

//module.exports = Tasks;

let T = new Tasks();
//T.newTask('Go Biking', 'Remember to go biking tomorrow morning');
T.updateTask('4682263', 'No Biking', 'Biking cancelled');
//T.deleteAllTask();
//T.showAllTask();