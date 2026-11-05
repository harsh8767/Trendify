// Front-end input checks. Each function returns an error message, or null when the value is fine.
// These improve the user experience; the real security checks must also happen on the backend.

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateEmail(email: string): string | null {
  const trimmedEmail = email.trim();
  if (trimmedEmail.length === 0) return 'Enter your email address.';
  if (!EMAIL_PATTERN.test(trimmedEmail)) return 'Enter a valid email address, like name@example.com.';
  return null;
}

export function validateNewPassword(password: string): string | null {
  if (password.length === 0) return 'Enter a password.';
  if (password.length < 8) return 'Use at least 8 characters.';
  if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) return 'Include at least one letter and one number.';
  return null;
}

export function validatePasswordConfirmation(password: string, confirmation: string): string | null {
  if (confirmation.length === 0) return 'Confirm your password.';
  if (password !== confirmation) return 'The passwords do not match.';
  return null;
}

export function validateOtpCode(code: string): string | null {
  if (!/^\d{4}$/.test(code)) return 'Enter the 4-digit code.';
  return null;
}