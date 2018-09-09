import Tasks from '../src/tasks';

describe('Running tests for Tasks module...', () => {
    const task = new Tasks();
    it('Create a new instance of Tasks', () => {
        expect(task).toBeInstanceOf(Tasks);
    });
    it('Create a new task successfully', () => {
        expect(task.newTask({ title: 'New Test Task', body: 'A new task for testing purposes' }));
    });
});