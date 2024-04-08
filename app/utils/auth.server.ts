import { createCookieSessionStorage, json, redirect } from '@remix-run/node'
import bcrypt from 'bcryptjs'
import { prisma } from '~/utils/prisma.server'

type LoginForm = {
    email: string
    password: string
}

type RegisterForm = {
    email: string
    password: string
    firstName: string
    lastName: string
}

const sessionSecret = process.env.VITE_SESSION_SECRET
if (!sessionSecret) {
    throw new Error('VITE_SESSION_SECRET must be set')
}

const storage = createCookieSessionStorage({
    cookie: {
        name: 'CX_Finance',
        secure: true,
        secrets: [sessionSecret],
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 2,
        httpOnly: true,
    },
})

export const createUserSession = async (userId: string, redirectTo: string) => {
    const session = await storage.getSession()
    session.set('userId', userId)
    return redirect(redirectTo, {
        headers: {
            'Set-Cookie': await storage.commitSession(session),
        },
    })
}

const getUserSession = (request: Request) => {
    return storage.getSession(request.headers.get('Cookie'))
}

export const getUserId = async (request: Request) => {
    const session = await getUserSession(request)
    const userId = session.get('userId')
    if (!userId || typeof userId !== 'string') return null
    return userId
}

export const getUser = async (request: Request) => {
    const userId = await getUserId(request)
    if (typeof userId !== 'string') {
        return null
    }
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, email: true, active: true, admin: true },
        })
        return user
    } catch {
        throw logout(request)
    }
}

export const requireUserId = async (request: Request, redirectTo: string = new URL(request.url).pathname) => {
    const session = await getUserSession(request)
    const userId = session.get('userId')
    if (!userId || typeof userId !== 'string') {
        const searchParams = new URLSearchParams([['redirectTo', redirectTo]])
        throw redirect(`/auth/login?${searchParams}`)
    }
    return userId
}

export const register = async ({ email, password, firstName, lastName }: RegisterForm) => {
    const userExists = await prisma.user.count({ where: { email: email } })
    if (userExists) {
        return json({ formError: `L'utilisateur est déjà enregistré.` }, { status: 400 })
    }
    const passwordHash = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
        data: {
            email,
            password: { hash: passwordHash },
            profile: { firstName: firstName, lastName: lastName },
            active: false,
            admin: false,
        },
    })
    return { id: user.id, email }
}

export const login = async ({ email, password }: LoginForm, redirectTo: string) => {
    const user = await prisma.user.findUnique({
        where: { email },
    })
    if (!user) {
        return json({ formError: `L'utilisateur n'a pu être authentifié.` }, { status: 400 })
    }
    const isCorrectPassword = await bcrypt.compare(password, user.password.hash)
    if (!isCorrectPassword) {
        return json({ formError: `L'utilisateur n'a pu être authentifié.` }, { status: 400 })
    }
    if (!user.active) {
        return json({ formError: `L'utilisateur n'est pas actif.` }, { status: 400 })
    }
    return createUserSession(user.id, redirectTo)
}

export const logout = async (request: Request) => {
    const session = await getUserSession(request)
    return redirect('/', {
        headers: {
            'Set-Cookie': await storage.destroySession(session),
        },
    })
}
