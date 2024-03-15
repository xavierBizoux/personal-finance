import { LoaderFunction, json, redirect } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import AdminPanel, { Item } from '~/components/AdminPanel'
import { getUser, requireUserId } from '~/utils/auth.server'

export const loader: LoaderFunction = async ({ request }) => {
    await requireUserId(request)
    const user = await getUser(request)
    if (user?.admin === false) {
        return redirect("/dashboard")
    }
    const items: Item[] = [
        { to: '/admin/users', label: 'Utilisateurs' },
        { to: '/admin/accounts', label: 'Comptes' },
        { to: '/admin/categories', label: 'Catégories' },
    ]
    return json({ items})
}

const AdminPage = () => {
    const {items} = useLoaderData<typeof loader>()
    return (
        <div className='flex h-full'>
            <AdminPanel items={items} />
            <Outlet />
        </div>
    )
}

export default AdminPage
