import { ActionFunction, ActionFunctionArgs, json, LoaderFunction, redirect } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import CreateForm from '~/components/forms/CreateForm'
import DeleteForm from '~/components/forms/DeleteForm'
import EditForm from '~/components/forms/EditForm'
import { categoryVariables, createCategory, deleteCategory, getCategoryById, updateCategory } from '~/data/category'
import { requireUserId } from '~/utils/auth.server'
import { VariableInfo } from '~/utils/global.types'

export const action: ActionFunction = async ({ request }: ActionFunctionArgs) => {
    const form = await request.formData()
    const label = String(form.get('label'))
    const id = String(form.get('id'))
    const url = new URL(request.url)
    const pathElements = url.pathname.split('/')
    const redirectTo = `/${pathElements[1]}/${pathElements[2]}`
    const action = url.searchParams.get('action')
    switch (action) {
        case 'edit':
           await updateCategory(id, { label })
            break
        case 'create':
             await createCategory({ label })
            break
        case 'delete':
            await deleteCategory(id)
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
    const variables: VariableInfo[] = categoryVariables
    const { id } = params
    let values
    if (id === 'new') {
        values = { label: '', id: 'null' }
    } else {
        values = await getCategoryById(id!)
        if (!values) {
            throw json({ message: `Aucune catégorie n'existe avec l'id ${id}.` }, { status: 400 })
        }
    }
    return json({ variables, values, action })
}

export default function Category() {
    const { variables, values, action } = useLoaderData<typeof loader>()
    let element
    switch (action) {
        case 'edit':
            element = (
                <EditForm
                    variables={variables}
                    values={values}
                    title={'Catégorie'}
                />
            )
            break
        case 'create':
            element = (
                <CreateForm
                    variables={variables}
                    values={values}
                    title={'Catégorie'}
                />
            )
            break
        case 'delete':
            element = (
                <DeleteForm
                    variables={variables}
                    values={values}
                    title={'Catégorie'}
                />
            )
            break
        default:
            break
    }
    return <>{element}</>
}
