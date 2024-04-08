import { LoaderFunction, json } from '@remix-run/node'
import { Outlet, useLoaderData, useMatches } from '@remix-run/react'
import { Item } from '~/components/AdminPanel'
import type { TableProps } from '~/components/Table'
import Table from '~/components/Table'
import AddButton from '~/components/buttons/AddButton'
import { categoryVariables, getAllCategories } from '~/data/category'
import { requireUserId } from '~/utils/auth.server'

export const loader: LoaderFunction = async ({ request }) => {
    await requireUserId(request)
    const categories = await getAllCategories()
    if (!categories || categories.length === 0) {
        throw json({ message: `Aucune catégorie n'a pu être trouvée!` }, { status: 404 })
    }
    const tableData: TableProps = {
        columns: categoryVariables,
        rows: categories.map((category) => [category.id, category.label]),
        path: '/admin/categories',
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
        <>
            <Outlet />
            {currentSection.label && (
                <div className='flex flex-col w-5/6'>
                    <h1 className='text-3xl m-4 ml-20'>
                        {currentSection.label}
                        <AddButton to={`${tableData.path}/new`} />
                    </h1>

                    <Table
                        columns={tableData.columns}
                        rows={tableData.rows}
                        path={tableData.path}
                    />
                </div>
            )}
        </>
    )
}

export default AdminCategories
