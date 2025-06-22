import { Task, Prisma } from '@prisma/client';
import prisma from './prismaService';

// We derive the types directly from the Prisma generated models.
// This ensures that our frontend types always match the database schema.
export type TaskPriority = Task['priority'];
export type TaskStatus = Task['status'];
export type { Task };

export async function createTask(data: {
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
}) {
  return prisma.task.create({ data });
}

type TaskFilters = {
  priority: TaskPriority | 'all';
  status: TaskStatus | 'all';
};

export async function getAllTasks(filters: TaskFilters) {
  const { priority, status } = filters;
  console.log(`[taskService] Received filters:`, filters);

  const where: Prisma.TaskWhereInput = {};

  if (priority && priority !== 'all') {
    where.priority = priority;
  }

  if (status && status !== 'all') {
    where.status = status;
  }

  console.log('[taskService] Executing findMany with where clause:', where);
  return prisma.task.findMany({ where });
}

export async function getTaskById(id: number) {
  return prisma.task.findUnique({
    where: { id },
  });
}

export async function updateTask(id: number, data: Partial<Task>) {
  return prisma.task.update({
    where: { id },
    data,
  });
}

export async function deleteTask(id: number) {
  return prisma.task.delete({
    where: { id },
  });
}
