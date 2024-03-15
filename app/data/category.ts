import { prisma } from '~/utils/prisma.server'

export const getAllCategories = async () => {
    return prisma.category.findMany({ select: { id: true, label: true } })
}
