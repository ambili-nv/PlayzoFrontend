import { nameRegex,emailRegex } from "../constants";

type SignupValidation = Partial<{
    name:string;
    email:string;
    password:string;
    confirmPassword:string;
    phoneNumber:string;
}>;

const validateSignUp = (values:{
    name:string;
    email:string;
    password:string;
    confirmPassword:string;
    phoneNumber:string;
})=>{
    const {name,email,password,confirmPassword,phoneNumber} = values;
    const errors:SignupValidation = {}

      //   Name validate
  if (!name.trim().length) {
    errors.name = "Required*";
  } else if (name.length > 20) {
    errors.name = "Must be 20 characters or less.";
  } else if (!nameRegex.test(name)) {
    errors.name =
      "First letter must be capital and no leading or trailing spaces.";
  }
  
  //   email validate
  if (!email.trim().length) {
    errors.email = "Required*";
  } else if (!emailRegex.test(email)) {
    errors.email = "Invalid email format.";
  }

  // password validate
  if (!password.trim().length) {
    errors.password = "Required*";
  } else if (password.length < 8) {
    errors.password = "Password must be at least 8 characters long.";
  } else if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
    errors.password = "Password must contain uppercase and lowercase letters.";
  } else if (!/\d/.test(password)) {
    errors.password = "Password must contain at least one digit.";
  } else if (!/[@$!%*?&]/.test(password)) {
    errors.password = "Password must contain at least one special character.";
  }

  //   confirmPassword validate
  if (!confirmPassword.trim().length) {
    errors.confirmPassword = "Required*";
  } else if (
    confirmPassword.length !== password.length ||
    confirmPassword !== password
  ) {
    errors.confirmPassword = "Password is not matching";
  }

    // Phone Number Validation
    if (!phoneNumber.trim().length) {
        errors.phoneNumber = "Required*";
      } else if (!/^\d{10}$/.test(phoneNumber)) {
        errors.phoneNumber = "Phone number must be 10 digits long.";
      }

  return errors;
};


function validateLogin({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const errors: { email?: string; password?: string } = {};
  if (!email.trim().length) {
    errors.email = "Required*";
  } else if (!emailRegex.test(email)) {
    errors.email = "Invalid email format.";
  }
  if (!password.trim().length) {
    errors.password = "Password is Required*";
  }
  return errors;
}

const validateResetPassword = ({
  password,
  confirmPassword,
}: {
  password: string;
  confirmPassword: string;
}) => {
  let errors: { password?: string; confirmPassword?: string } = {};

  if (!password.trim().length) {
    errors.password = "Required*";
  } else if (password.length < 8) {
    errors.password = "Password must be at least 8 characters long.";
  } else if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
    errors.password = "Password must contain uppercase and lowercase letters.";
  } else if (!/\d/.test(password)) {
    errors.password = "Password must contain at least one digit.";
  } else if (!/[@$!%*?&]/.test(password)) {
    errors.password = "Password must contain at least one special character.";
  }

  // Confirm Password Validation
  if (!confirmPassword.trim().length) {
    errors.confirmPassword = "Required*";
  } else if (confirmPassword.length !== password.length || confirmPassword !== password) {
    errors.confirmPassword = "Password is not matching";
  }
  return errors;
};


const validateVenueUpload = (values: {
  name: string;
  sportsitem: string;
  place: string;
  // price: string;
  description: string;
  primaryImage: File | null;
  secondaryImage: File[] | null;
}) => {
  const errors: Partial<{
    name: string;
    sportsitem: string;
    place: string;
    // price: string;
    description: string;
    primaryImage: string;
    secondaryImage: string;
  }> = {};

  if (!values.name.trim()) {
    errors.name = "Required*";
  } else if (!isNaN(Number(values.name))) {
    errors.name = "Name cannot be a number.";
  }

  if (!values.sportsitem.trim()) {
    errors.sportsitem = "Required*";
  } else if (!isNaN(Number(values.sportsitem))) {
    errors.sportsitem = "Sports item cannot be a number.";
  }

  if (!values.place.trim()) {
    errors.place = "Required*";
  } else if (!isNaN(Number(values.place))) {
    errors.place = "Place cannot be a number.";
  }

  if (!values.description.trim()) {
    errors.description = "Required*";
  }

  if (!values.primaryImage) {
    errors.primaryImage = "Primary image is required*";
  }

  if (!values.secondaryImage || values.secondaryImage.length === 0) {
    errors.secondaryImage = "At least one secondary image is required*";
  }

  return errors;
};



export {
  validateSignUp,
  validateLogin,
  validateResetPassword,
  validateVenueUpload
};





