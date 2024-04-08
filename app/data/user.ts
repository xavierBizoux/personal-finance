import { Profile } from '@prisma/client'
import { VariableInfo } from '~/utils/global.types'
import { prisma } from '~/utils/prisma.server'

type InputData = {
    profile: Profile
    active: boolean
    admin: boolean
}

export const userVariables: VariableInfo[] = [
    { id: 'id', label: 'id', type: 'id', readonly: true },
    { id: 'email', label: 'Email', type: 'string', readonly: true },
    { id: 'profile.lastName', label: 'Nom', type: 'string', readonly: false },
    { id: 'profile.firstName', label: 'Prénom', type: 'string', readonly: false },
    { id: 'active', label: 'Actif', type: 'boolean', readonly: false },
    { id: 'admin', label: 'Administrateur', type: 'boolean', readonly: false },
]

export const getAllUsers = async () => {
    return prisma.user.findMany({ select: { id: true, email: true, profile: true, active: true, admin: true } })
}

export const getUser = async (userId: string) => {
    return prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, email: true, profile: true, active: true, admin: true },
    })
}

export const getUserById = async (id: string) => {
    return prisma.user.findUnique({
        where: { id: id },
        select: { id: true, email: true, profile: true, active: true, admin: true },
    })
}

export const updateUser = async (id: string, data: InputData) => {
    return prisma.user.update({ where: { id: id }, data: { ...data } })
}

export const deleteUser = async (id: string) => {
    return prisma.user.delete({ where: { id: id } })
}
