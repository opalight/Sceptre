/**
 * Copyright (c) 2018 Collin Grimm
 * 
 * This software is released under the MIT License.
 * https://opensource.org/licenses/MIT
 */

import PouchDB from 'pouchdb';
import { existsSync, mkdirSync } from 'fs';
import Table from 'cli-table2';

const homedir = process.env.HOME;
if (!existsSync(`${homedir}/.local/share/Hera`)) { mkdirSync(`${homedir}/.local/share/Hera`) }
const TaskDB: any = new PouchDB(`${homedir}/.local/share/Hera/TasksDB`);

let table: any = new Table({
    head: ['ID', 'Title', 'Task', 'Last Modified'],
    colWidths: [15, 20, 35, 15]
});

export class Tasks {
    public async newTask(Task: TaskDefinition.Task): Promise<string | void> {
        try {
            Task.title = Task.title.trim() || new Date().toDateString();
            const uuid: string = Math.random().toString(36).substring(2, 10).toString();
            const task: TaskDefinition.New = {
                _id: uuid,
                title: Task.title,
                body: Task.body,
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

    public async updateTask(Task: TaskDefinition.Task): Promise<string | void> {
        if (Task.id) {
            try {
                let UpdatedTask: TaskDefinition.Update = await TaskDB.get(Task.id);
                UpdatedTask.title = Task.title.trim();
                UpdatedTask.body = Task.body;
                UpdatedTask.lastModified = new Date().toDateString();

                return await TaskDB.put(UpdatedTask);
            } catch (err) { console.log(`Error: (${err.status}) ${err.name}: ${err.message}`); }
        }
        else { return console.log(`Invalid or No Task ID provided`); }
    }

    public async showAllTask(): Promise<void> {
        let docs: Array<any> = [];
        try {
            let allDocs: any = await TaskDB.allDocs({ include_docs: true, descending: true });
            allDocs.rows.forEach(async doc => docs.push(doc));
        }
        catch (err) {
            console.log(`Error: (${err.status}) ${err.name}: ${err.message}`);
        }

        docs.forEach(task => {
            table.push([task.id, task.doc.title, task.doc.body, task.doc.lastModified]);
        });
        return console.log(table.toString());
    }

    public async deleteTask(taskId: string): Promise<any> {
        try {
            let task: any = await TaskDB.get(taskId);
            TaskDB.remove(task._id, task._rev);
            return console.log('Task Deleted');
        } catch (err) {
            console.log(`Error: (${err.status}) ${err.name}: ${err.message}`);
        }
    }
    public async deleteAllTask(): Promise<void> {
        try {
            let allDocs: any = await TaskDB.allDocs({ include_docs: true, descending: true });
            allDocs.rows.forEach(async task => {
                task = await task;
                TaskDB.remove(task.doc._id, task.doc._rev);
            });
            return console.log('All Task Deleted');
        } catch (err) {
            console.log(`Error: (${err.status}) ${err.name}: ${err.message}`);
        }
    }
}
