import {
    createTask,
    getAllTasks,
    updateTask,
    deleteTask,
  } from '../services/taskService';
  
  async function testCRUD() {
    const task = await createTask({
      title: 'Test Task',
      description: 'Testing CRUD',
      dueDate: new Date(),
      priority: 'medium',
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log('Created:', task);
  
    const allTasks = await getAllTasks();
    console.log('All Tasks:', allTasks);
  
    const updated = await updateTask(task.id, {
      title: 'Updated Task',
      status: 'completed',
      updatedAt: new Date(),
    });
    console.log('Updated:', updated);
  
    await deleteTask(task.id);
    console.log('Deleted task with id:', task.id);
  
    const afterDelete = await getAllTasks();
    console.log('All Tasks after delete:', afterDelete);
  }
  
  testCRUD()
    .catch(console.error);