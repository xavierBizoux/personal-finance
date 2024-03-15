import { LoaderFunction, json } from '@remix-run/node'
import { useLoaderData, useMatches } from '@remix-run/react'
import { Item } from '~/components/AdminPanel'
import type { TableProps } from '~/components/Table'
import Table from '~/components/Table'
import { getAllCategories } from '~/data/category'

export const loader: LoaderFunction = async () => {
    const categories = await getAllCategories()
    if (!categories || categories.length === 0) {
        throw json({ message: '' }, { status: 400 })
    }
    const tableData: TableProps = {
        columns: [
            { id: 'id', label: 'id', type: 'id' },
            { id: 'label', label: 'Description', type: 'string' },
        ],
        rows: categories.map((category) => [category.id, category.label]),
    }
    return json({ tableData })
}

const AdminCategories = () => {
    const { tableData } = useLoaderData<typeof loader>()
    const matches = useMatches()
    const data = matches.at(-2)?.data
    const pathname = matches.at(-1)?.pathname
    let currentSection: Item = { to: '', label: '' }
    if (typeof data === 'object' && data && 'items' in data) {
        const items = data.items as Item[]
        currentSection = items.find((el) => el.to === pathname)!
    }
    return (
        <div className='flex flex-col w-5/6'>
            <h1 className='text-3xl m-4 ml-20'>{currentSection.label}</h1>
            <Table
                columns={tableData.columns}
                rows={tableData.rows}
            />
        </div>
    )
}

export default AdminCategories
