export const ONLOGGIN = "ONLOGGIN";
export const ONLOGGINSUCCESS = "ONLOGGINSUCCESS";
export const ONLOGGINFALEID = "ONLOGGINFALEID";

export function onLogin (email, password) {
    return { type: ONLOGGIN, email, password }
}

export function onLoginSuccess(userSession) {
    return { type: ONLOGGINSUCCESS, userSession }
}

export function onLoginFailed(error) {
    return { type: ONLOGGINFALEID, error }
}