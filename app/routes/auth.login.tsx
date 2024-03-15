import { ActionFunction, ActionFunctionArgs, LoaderFunction, json, redirect } from '@remix-run/node'
import { Form, Link, useActionData } from '@remix-run/react'
import { PasswordField, TextField } from '~/components/FormFields'
import { getUser, login } from '~/utils/auth.server'
import { redirectTo } from '~/utils/utilities.server'
import { validateEmail, validatePassword } from '~/utils/validators'

type LoginError = {
    email?: string | undefined
    password?: string | undefined
}

export const action: ActionFunction = async ({ request }: ActionFunctionArgs) => {
    const form = await request.formData()
    const email = form.get('email')
    const password = form.get('password')
    if (typeof email !== 'string' || typeof password !== 'string') {
        return json({ formError: `Les données fournies sont incorrectes` }, { status: 400 })
    }
    const errors: LoginError = {}
    errors.email = validateEmail(email)
    errors.password = validatePassword(password)
    if (Object.values(errors).every((value) => value !== undefined)) {
        return json({ errors }, { status: 400 })
    }
    const user = await login({ email, password }, redirectTo(request))
    if (!user) {
        return json({ error: `L'utilisateur n'a pu être identifié.` }, { status: 400 })
    }
    return user
}

export const loader: LoaderFunction = async ({ request }) => {
    return (await getUser(request)) ? redirect(redirectTo(request)) : null
}

const Login = () => {
    const actionData = useActionData<typeof action>()
    return (
        <div className='h-full justify-center items-center flex flex-col gap-y-4'>
            <h2 className='text-5xl font-extrabold text-slate-300'>Identification</h2>
            {<p className='text-red-400'>{actionData?.formError}</p>}
            <Form
                method='POST'
                className='rounded-2xl bg-gray-200 p-6 w-96'>
                <TextField
                    htmlFor='email'
                    type='email'
                    label='Email'
                    required={true}
                    error={actionData?.errors?.email || null}
                />
                <PasswordField
                    htmlFor='password'
                    type='password'
                    label='Password'
                    required={true}
                    error={actionData?.errors?.password || null}
                />
                <button
                    type='submit'
                    className='w-full text-center rounded-xl mt-2 bg-slate-300 px-3 py-2 text-slate-500 font-semibold transition duration-300 ease-in-out hover:bg-slate-400  hover:text-white hover:-translate-y-1'>
                    Identifier
                </button>
                <p className='text-xs mt-5 text-slate-500'>
                    Pas encore enregistré?{' '}
                    <Link
                        to='/auth/register'
                        className='underline'>
                        M'enregistrer
                    </Link>
                </p>
            </Form>
        </div>
    )
}

export default Login
