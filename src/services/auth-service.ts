
export type AuthResult =
  | { ok: true }
  | { ok: false; message: string };

const SIMULATED_DELAY_MS = 500;

let isLoggedIn = false;

function wait(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function simulateSuccess(): Promise<AuthResult> {
  await wait(SIMULATED_DELAY_MS);
  return { ok: true };
}

export async function signIn(
  _email: string,
  _password: string,
): Promise<AuthResult> {
  const result = await simulateSuccess();

  if (result.ok) {
    isLoggedIn = true;
  }

  return result;
}

export async function signUp(
  _email: string,
  _password: string,
): Promise<AuthResult> {
  const result = await simulateSuccess();

  if (result.ok) {
    isLoggedIn = true;
  }

  return result;
}

export async function signOut(): Promise<void> {
  isLoggedIn = false;
  await wait(200);
}

export function hasActiveSession(): boolean {
  return isLoggedIn;
}

export async function requestPasswordReset(
  _email: string,
): Promise<AuthResult> {
  return simulateSuccess();
}

export async function verifyOtpCode(
  _email: string,
  _code: string,
): Promise<AuthResult> {
  return simulateSuccess();
}

export async function resetPassword(
  _email: string,
  _newPassword: string,
): Promise<AuthResult> {
  return simulateSuccess();
}
