let registeredEmail: string | undefined;
let profileDisplayName: string | undefined;

export function setRegisteredEmail(email: string): void {
    registeredEmail = email;
}

export function getRegisteredEmail(): string {
    if (!registeredEmail) {
        throw new Error('No registered email stored for this scenario.');
    }

    return registeredEmail;
}

export function setProfileDisplayName(name: string): void {
    profileDisplayName = name;
}

export function getProfileDisplayName(): string {
    if (!profileDisplayName) {
        throw new Error('No profile display name stored for this scenario.');
    }

    return profileDisplayName;
}

export function clearScenarioState(): void {
    registeredEmail = undefined;
    profileDisplayName = undefined;
}
