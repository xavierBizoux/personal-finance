import { VariableInfo } from '~/utils/global.types'
import { prisma } from '~/utils/prisma.server'

type InputData = {
    label: string
}

export const categoryVariables: VariableInfo[] = [
    { id: 'id', label: 'ID', type: 'id', readonly: true },
    { id: 'label', label: 'Description', type: 'string', readonly: false },
]

export const getAllCategories = async () => {
    return prisma.category.findMany({ select: { id: true, label: true } })
}

export const getCategoryById = async (id: string) => {
    return prisma.category.findUnique({
        where: { id: id },
        select: { id: true, label: true },
    })
}

export const updateCategory = async (id: string, data: InputData) => {
    return prisma.category.update({ where: { id: id }, data: { ...data } })
}

export const createCategory = async (data: InputData) => {
    return prisma.category.create({ data: { ...data } })
}

export const deleteCategory = async (id: string) => {
    return prisma.category.delete({ where: { id: id } })
}
