import { Form } from '@remix-run/react'
import { FormInfo, VariableInfo } from '~/utils/global.types'
import { TextField } from '../FormFields'

const CreateForm = ({ variables, values, title }: FormInfo) => {
    return (
        <div className='flex flex-col w-full'>
            <h1 className='text-3xl m-4 ml-20'>
                {title}: Nouvelle
            </h1>
            <Form
                className='w-1/3 flex-col m-4 ml-20'
                method='POST'>
                {variables.map((variable: VariableInfo) => {
                    return (
                        // eslint-disable-next-line react/jsx-key
                        <TextField
                            htmlFor={variable.id}
                            label={variable.label}
                            required={true}
                            readOnly={variable.type !== 'id'? false : true}
                            value={values[variable.id]}
                        />
                    )
                })}
                <button
                    type='submit'
                    className='w-full uppercase text-center rounded-xl mt-2 bg-slate-300 px-3 py-2 text-slate-500 font-semibold transition duration-300 ease-in-out hover:bg-slate-400  hover:text-white hover:-translate-y-1'>
                    Créer
                </button>
            </Form>
        </div>
    )
}

export default CreateForm
