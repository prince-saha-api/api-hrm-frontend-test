export const validateEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

export const validatePhoneNumber = (phoneNumber) => {
  const phonePattern = /^(01[3-9]\d{8})$/;
  return phonePattern.test(phoneNumber);
};

export const validateEmployeeID = (id) => {
  const pattern = /^[A-Z]{3}[0-9]{7}$/;
  return pattern.test(id);
};
