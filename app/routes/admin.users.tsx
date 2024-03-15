import { LoaderFunction, json } from '@remix-run/node'
import { useLoaderData, useMatches } from '@remix-run/react'
import { Item } from '~/components/AdminPanel'
import type { TableProps } from '~/components/Table'
import Table from '~/components/Table'
import { getAllUsers } from '~/data/user'

export const loader: LoaderFunction = async () => {
    const users = await getAllUsers()
    if (!users || users.length === 0) {
        throw json({ message: '' }, { status: 400 })
    }
    const tableData: TableProps = {
        columns: [
            { id: 'id', label: 'id', type: 'id' },
            { id: 'email', label: 'Email', type: 'string' },
            { id: 'profile.lastName', label: 'Nom', type: 'string' },
            { id: 'profile.firstName', label: 'Prénom', type: 'string' },
            { id: 'active', label: 'Actif', type: 'boolean' },
            { id: 'active', label: 'Administrateur', type: 'boolean' },
        ],
        rows: users.map((user) => [user.id, user.email, user.profile.lastName, user.profile.firstName, user.active, user.admin]),
    }
    return json({ tableData })
}

const AdminUsers = () => {
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

export default AdminUsers
