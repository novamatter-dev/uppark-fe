export const validatePhoneNumberPersonalData = personalState => {
  // Destructure the required fields from personalState
  const {firstName, lastName, email, address, phoneNumber} = personalState;

  // Check if any of the fields is null or an empty string

  if (
    firstName.value === null ||
    firstName.value === '' ||
    lastName.value === null ||
    lastName.value === '' ||
    email.value === null ||
    email.value === '' ||
    address.value === null ||
    address.value === '' ||
    phoneNumber.value === null ||
    phoneNumber.value === ''
  ) {
    return false;
  }

  return true;
};

export const validateEmailPersonalData = personalState => {
  // Destructure the required fields from personalState
  const {firstName, lastName, email, address, phoneNumber} = personalState;

  // Check if any of the fields is null or an empty string
  if (
    firstName.value === null ||
    firstName.value === '' ||
    lastName.value === null ||
    lastName.value === '' ||
    email.value === null ||
    email.value === '' ||
    address.value === null ||
    address.value === '' ||
    phoneNumber.value === null ||
    phoneNumber.value === ''
  ) {
    return false;
  }

  return true;
};
