export const validatePhoneNumberPersonalData = personalState => {
  // Destructure the required fields from personalState
  const {firstName, lastName, email, address, phoneNumber} = personalState;

  // Check if any of the fields is null or an empty string

  if (!phoneNumber?.value) {
    return false;
  }

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
  const {firstName, lastName, email, address, phoneNumber} = personalState;

  if (
    firstName.value === null ||
    firstName.value === '' ||
    lastName.value === null ||
    lastName.value === '' ||
    email.value === null ||
    email.value === '' ||
    address.value === null ||
    address.value === '' ||
    phoneNumber?.value === null ||
    phoneNumber?.value === ''
  ) {
    return false;
  }

  return true;
};

export const validatePhoneNumberBusinessData = personalState => {
  const {companyName, email, phoneNumber, address, cui} = personalState;

  // TODO: add business mandatory data
  if (
    companyName.value === null ||
    companyName.value === '' ||
    cui.value === null ||
    cui.value === '' ||
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
