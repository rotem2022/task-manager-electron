import { TaskStatus } from '../types/electron';
import prisma from './prismaService';

export async function createTask(data: {
  title: string;
  description?: string;
  dueDate?: Date;
  priority: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
}) {
  return prisma.task.create({ data });
}

export async function getAllTasks() {
  return prisma.task.findMany();
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
  priority?: string;
  status?: TaskStatus;
  updatedAt?: Date;
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
