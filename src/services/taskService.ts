import { Task, Prisma } from '@prisma/client';
import prisma from './prismaService';

// We derive the types directly from the Prisma generated models.
// This ensures that our frontend types always match the database schema.
export type TaskPriority = Task['priority'];
export type TaskStatus = Task['status'];

export async function createTask(data: {
  title: string;
  description?: string;
  dueDate?: Date;
  priority: TaskPriority;
  status: TaskStatus;
}) {
  return prisma.task.create({ data });
}

export async function getAllTasks(priorityFilter?: TaskPriority | 'all') {
  const where: Prisma.TaskWhereInput = {};

  if (priorityFilter && priorityFilter !== 'all') {
    where.priority = priorityFilter;
  }

  return prisma.task.findMany({ where });
}

export async function getTaskById(id: number) {
  return prisma.task.findUnique({
    where: { id },
  });
}

export async function updateTask(id: number, data: {
  title?: string;
  description?: string;
  dueDate?: Date;
  priority?: TaskPriority;
  status?: TaskStatus;
}) {
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
