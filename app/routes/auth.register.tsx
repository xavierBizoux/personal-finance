import { ActionFunction, ActionFunctionArgs, json, redirect } from '@remix-run/node'
import { Form, Link, useActionData } from '@remix-run/react'
import { PasswordField, TextField } from '~/components/FormFields'
import { register } from '~/utils/auth.server'
import { validateEmail, validatePassword, validatePasswordConfirmation } from '~/utils/validators'

type RegisterError = {
    email?: string | undefined
    password?: string | undefined
    passwordConfirmation?: string | undefined
    firstName?: string | undefined
    lastName?: string | undefined
}

export const action: ActionFunction = async ({ request }: ActionFunctionArgs) => {
    const form = await request.formData()
    const email = form.get('email')
    const password = form.get('password')
    const passwordConfirmation = form.get('passwordConfirmation')
    const firstName = form.get('firstName')
    const lastName = form.get('lastName')
    if (
        typeof email !== 'string' ||
        typeof password !== 'string' ||
        typeof passwordConfirmation !== 'string' ||
        typeof firstName !== 'string' ||
        typeof lastName !== 'string'
    ) {
        return json({ formError: `Les données fournies sont incorrectes` }, { status: 400 })
    }
    const errors: RegisterError = {}
    errors.email = validateEmail(email)
    errors.password = validatePassword(password)
    errors.passwordConfirmation = validatePasswordConfirmation(password, passwordConfirmation)
    if (Object.values(errors).every((value) => value !== undefined)) {
        return json({ errors }, { status: 400 })
    }
    const user = await register({ email, password, firstName, lastName })
    if (!user) {
        return json({ formError: `L'utilisateur n'a pu être créé.` }, { status: 400 })
    }
    return redirect('/auth/login')
}

const Register = () => {
    const actionData = useActionData<typeof action>()
    return (
            <div className='h-full justify-center items-center flex flex-col gap-y-4'>
                <h2 className='text-5xl font-extrabold text-slate-300'>Enregistrement</h2>
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
                        label='Mot de passe'
                        required={true}
                        error={actionData?.errors?.password || null}
                    />
                    <PasswordField
                        htmlFor='passwordConfirmation'
                        type='password'
                        label='Confirmation du mot de passe'
                        required={true}
                        error={actionData?.errors?.passwordConfirmation || null}
                    />
                    <TextField
                        htmlFor='firstName'
                        type='string'
                        label='Prénom'
                        required={true}
                        error={actionData?.errors?.firstName || null}
                    />
                    <TextField
                        htmlFor='lastName'
                        type='string'
                        label='Nom'
                        required={true}
                        error={actionData?.errors?.lastName || null}
                    />
                    <button
                        type='submit'
                        className='text-center rounded-xl mt-2 w-full bg-slate-300 px-3 py-2 text-slate-500 font-semibold transition duration-300 ease-in-out hover:bg-slate-400  hover:text-white hover:-translate-y-1'>
                        Enregistrer
                    </button>
                    <p className='text-xs mt-5 text-slate-500'>
                        Déjà enregistré?{' '}
                        <Link
                            to='/auth/login'
                            className='underline'>
                            M'identifier
                        </Link>
                    </p>
                </Form>
            </div>
    )
}

export default Register