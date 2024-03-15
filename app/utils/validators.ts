export const validateEmail = (email: string): string | undefined => {
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if (!email.length || !validRegex.test(email)) {
        return 'Veuillez introduire une adresse email valide.'
    }
}

export const validatePassword = (password: string): string | undefined => {
    if (password.length < 8) {
        return 'Le mot de passe doit être de minimum 8 caractères.'
    }
}

export const validatePasswordConfirmation = (password: string, passwordConfirmation: string): string | undefined => {
    if (password !== passwordConfirmation) {
        return 'Les mots de passe sont différents.'
    }
}