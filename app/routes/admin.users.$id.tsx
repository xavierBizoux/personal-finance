import { ActionFunction, ActionFunctionArgs, json, LoaderFunction, redirect } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import DeleteForm from '~/components/forms/DeleteForm'
import EditForm from '~/components/forms/EditForm'
import { deleteUser, getUserById, updateUser, userVariables } from '~/data/user'
import { requireUserId } from '~/utils/auth.server'
import { VariableInfo } from '~/utils/global.types'

export const action: ActionFunction = async ({ request }: ActionFunctionArgs) => {
    const form = await request.formData()
    const id = String(form.get('id'))
    const data = {
        profile: {
            firstName : String(form.get('profile.firstName')),
            lastName : String(form.get('profile.lastName')),
        },
        'active' : Boolean(form.get('active')),
        'admin' : Boolean(form.get('admin')),
    }
    const url = new URL(request.url)
    const pathElements = url.pathname.split('/')
    const redirectTo = `/${pathElements[1]}/${pathElements[2]}`
    const action = url.searchParams.get('action')
    switch (action) {
        case 'edit':
            await updateUser(id, data )
            break
        case 'delete':
            await deleteUser(id)
            break
        default:
            console.log({ message: 'Action inconnue' })
            break
    }
    return redirect(redirectTo)
}

export const loader: LoaderFunction = async ({ request, params }) => {
    await requireUserId(request)
    const url = new URL(request.url)
    const action = url.searchParams.get('action')
    const variables: VariableInfo[] = userVariables
    const { id } = params
    const user = await getUserById(id!)
    if (!user) {
        throw json({ message: `Aucun utilisateur n'existe avec l'id ${id}.` }, { status: 404 })
    }
    const values = {
        id: user.id,
        email: user.email,
        'profile.lastName': user.profile.lastName,
        'profile.firstName': user.profile.firstName,
        active: user.active,
        admin: user.admin,
    }
    return json({ variables, values, action })
}

export default function User() {
    const { variables, values, action } = useLoaderData<typeof loader>()
    let element
    switch (action) {
        case 'edit':
            element = (
                <EditForm
                    variables={variables}
                    values={values}
                    title={'Utilisateur'}
                />
            )
            break
        case 'delete':
            element = (
                <DeleteForm
                    variables={variables}
                    values={values}
                    title={'Utilisateur'}
                />
            )
            break
        default:
            break
    }
    return <>{element}</>
}
