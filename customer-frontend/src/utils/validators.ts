export const validateEmail = (email: string): boolean => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email.trim());
};

export const validatePhone = (phone: string): boolean => {
  if (!phone.trim()) return true; // Optional field
  // Allow +91 standard or 10-digit Indian numbers
  const re = /^(?:\+91[\-\s]?)?[6-9]\d{9}$/;
  return re.test(phone.trim());
};

export const validatePassword = (password: string): { valid: boolean; error?: string } => {
  if (password.length < 8) {
    return { valid: false, error: 'Password must be at least 8 characters long.' };
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, error: 'Password must contain at least one uppercase letter.' };
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, error: 'Password must contain at least one number.' };
  }
  return { valid: true };
};
