import { LinksFunction, LoaderFunction, MetaFunction, json } from '@remix-run/node'
import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from '@remix-run/react'
import NavBar from '~/components/NavBar'
import styles from '~/styles/app.css?url'
import { getUser } from './utils/auth.server'

export const links: LinksFunction = () => {
    return [{ rel: 'stylesheet', href: styles }]
}

export const meta: MetaFunction = () => {
    return [
        { title: 'Gestion Budgétaire' },
        { name: 'description', content: 'Application de gestion du budget Bizoux-Vialatoux' },
    ]
}

export const loader: LoaderFunction = async ({ request }) => {
    const user = await getUser(request)
    let isAuthenticated = false
    let isAdmin = false
    if (user) {
        isAuthenticated = true
        isAdmin = user.admin
    }
    return json({ isAuthenticated: isAuthenticated, isAdmin: isAdmin })
}

export const Layout = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated, isAdmin } = useLoaderData<typeof loader>()
    return (
        <html lang='en'>
            <head>
                <meta charSet='utf-8' />
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1'
                />
                <Meta />
                <Links />
            </head>
            <body className='h-screen flex flex-col'>
                <header>
                    <NavBar
                        isAuthenticated={isAuthenticated}
                        isAdmin={isAdmin}
                    />
                </header>
                <main className='h-full bg-slate-50'>{children}</main>
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    )
}

const App = () => {
    return <Outlet />
}

export default App
