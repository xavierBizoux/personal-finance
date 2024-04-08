export type VariableInfo = {
    id: string
    label: string
    type: 'id' | 'boolean' | 'string' | 'number'
    readonly: boolean
}

export type FormInfo = {
    variables: VariableInfo[]
    values: { [index: string]: string | number }
    title: string
}
