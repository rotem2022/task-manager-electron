import prisma from './prismaService';

export async function createTask(data: {
  title: string;
  description?: string;
  dueDate?: Date;
  priority: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}) {
  return prisma.task.create({ data });
}

export async function getAllTasks() {
  return prisma.task.findMany();
}

export async function updateTask(id: number, data: {
  title?: string;
  description?: string;
  dueDate?: Date;
  priority?: string;
  status?: string;
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
