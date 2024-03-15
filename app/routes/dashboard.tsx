import { LoaderFunction } from '@remix-run/node'
import { requireUserId } from '~/utils/auth.server'

export const loader: LoaderFunction = async ({ request }) => {
    await requireUserId(request)
    return null
}

const Dashboard = () => {
    return (
        <h1>Dashboard Page</h1>
    )
}

export default Dashboard
