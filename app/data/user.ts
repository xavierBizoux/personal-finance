import { prisma } from '~/utils/prisma.server'

export const getAllUsers = async () => {
    return prisma.user.findMany({ select: { id: true, email: true, profile: true, active: true, admin: true } })
}
