import {
    createTask,
    getAllTasks,
    updateTask,
    deleteTask,
  } from '../services/taskService';
import { TaskStatusEnum, TaskPriorityEnum } from '../types/electron';
  
  async function testCRUD() {
    console.log('Starting CRUD test...');
    
    // 1. Create a task
    const task = await createTask({
      title: 'Test Task from script',
      description: 'Testing CRUD operations',
      priority: TaskPriorityEnum.MEDIUM,
      status: TaskStatusEnum.IN_PROGRESS,
      dueDate: new Date(),
    });
    console.log('Created:', task);
  
    // 2. Get all tasks (no filter)
    const allTasks = await getAllTasks({ priority: 'all', status: 'all' });
    console.log('All Tasks:', allTasks);
  
    // 3. Update the task
    const updated = await updateTask(task.id, {
      title: 'Updated Task Title',
      status: TaskStatusEnum.DONE,
      priority: TaskPriorityEnum.HIGH,
      description: 'Updated description',
    });
    console.log('Updated:', updated);
  
    // 4. Delete the task
    await deleteTask(task.id);
    console.log('Deleted task with id:', task.id);
  
    // 5. Get all tasks after deletion
    const afterDelete = await getAllTasks({ priority: 'all', status: 'all' });
    console.log('All Tasks after delete:', afterDelete);
  }
  
  testCRUD()
    .catch(console.error);