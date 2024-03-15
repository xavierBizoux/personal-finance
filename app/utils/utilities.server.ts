export const redirectTo = (request: Request) => {
    const { searchParams } = new URL(request.url)
    let redirectTo = searchParams.get('redirectTo')
    if (redirectTo === null) {
        redirectTo = '/dashboard'
    }
    return redirectTo
}
