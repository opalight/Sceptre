/// <reference path="../hera.d.ts" />

export const emailQuestions: Array<Questions> = [
    {
        type: 'input',
        name: 'recipient',
        message: "Enter recipient email",
        validate: (value) => {
            let pass = value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/i);
            if (pass) { return true; }
            return 'Please enter a valid email address';
        }
    },
    {
        type: 'input',
        name: 'subject',
        message: 'Enter the email subject',
        validate: (value) => {
            let valid: boolean = (value.toString().length >= 3);
            return valid || 'Please enter a valid subject';
        }
    },
    {
        type: 'editor',
        name: 'message',
        message: 'Message',
        validate: (value) => {
            let valid: boolean = (value.toString().length >= 3);
            return valid || 'No message entered';
        }
    },

    {
        type: 'password',
        name: 'password',
        message: 'Password (required for auth)',
        mask: '*',
        validate: (): boolean => { return true; }
    },
    {
        type: 'confirm',
        name: 'send',
        message: 'Proceed Sending?',
        default: true
    },
];

export const tasksQuestions: Array<Questions> = [
    {
        type: 'input',
        name: 'title',
        message: 'Task Title',
        validate: function (value) {
            let valid = (value.toString().length >= 3);
            return valid || 'Please enter a valid title';
        }
    },
    {
        type: 'input',
        name: 'body',
        message: 'Task Body',
        validate: function (value) {
            let valid = (value.toString().length >= 3);
            return valid || 'Please enter a valid body';
        }
    },

];