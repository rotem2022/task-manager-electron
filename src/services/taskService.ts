import { Task, Prisma } from '@prisma/client';
import prisma from './prismaService';

export type TaskPriority = Task['priority'];
export type TaskStatus = Task['status'];
export type { Task };

/**
 * Creates a new task in the database.
 * @param data - The data for the new task.
 * @param data.title - The title of the task.
 * @param data.description - The description of the task.
 * @param data.priority - The priority of the task.
 * @param data.status - The status of the task.
 * @param data.dueDate - The due date of the task.
 * @returns The newly created task.
 */
export async function createTask(data: {
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: Date;
}) {
  return prisma.task.create({ data });
}

type TaskFilters = {
  priority: TaskPriority | 'all';
  status: TaskStatus | 'all';
  sortOrder: 'asc' | 'desc';
};

/**
 * Retrieves all tasks from the database, with optional filtering and sorting.
 * @param filters - The filters to apply to the query.
 * @param filters.priority - Filter tasks by priority. 'all' fetches all priorities.
 * @param filters.status - Filter tasks by status. 'all' fetches all statuses.
 * @param filters.sortOrder - Sort tasks by due date ('asc' or 'desc').
 * @returns A promise that resolves to an array of tasks.
 */
export async function getAllTasks(filters: TaskFilters) {
  const { priority, status, sortOrder } = filters;
  console.log(`[taskService] Received filters:`, filters);

  const where: Prisma.TaskWhereInput = {};

  if (priority && priority !== 'all') {
    where.priority = priority;
  }

  if (status && status !== 'all') {
    where.status = status;
  }

  const orderBy: Prisma.TaskOrderByWithRelationInput = {
    dueDate: sortOrder,
  };

  console.log('[taskService] Executing findMany with where clause:', where, 'and orderBy:', orderBy);
  return prisma.task.findMany({ 
    where,
    orderBy,
  });
}

/**
 * Retrieves a single task by its ID.
 * @param id - The ID of the task to retrieve.
 * @returns A promise that resolves to the task, or null if not found.
 */
export async function getTaskById(id: number) {
  return prisma.task.findUnique({
    where: { id },
  });
}

/**
 * Updates an existing task by its ID.
 * @param id - The ID of the task to update.
 * @param data - The data to update on the task.
 * @returns A promise that resolves to the updated task.
 */
export async function updateTask(id: number, data: Partial<Task>) {
  return prisma.task.update({
    where: { id },
    data,
  });
}

/**
 * Deletes a task by its ID.
 * @param id - The ID of the task to delete.
 * @returns A promise that resolves to the deleted task.
 */
export async function deleteTask(id: number) {
  return prisma.task.delete({
    where: { id },
  });
}
