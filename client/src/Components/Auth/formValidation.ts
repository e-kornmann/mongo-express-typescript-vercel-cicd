import { Kid } from "../../types";

export const validateFirstName = (value:  string) => { 
  if (!value) { return 'Please enter your first name';} 
  };
  
export const validateLastName = (value:  string | undefined) => { 
  if (!value) { return 'Please enter your last name';}
    return undefined;
};

export const validateParent = (value:  string | undefined) => {
  if (!value) { return 'Please indicate your parental status';} 
   return undefined;
};

export const validateStreet = (value: string | undefined) => {
  if (!value) { return 'Please enter your street name';} 
    return undefined;
 };

export const validateHouseNumber = (value:  string | undefined) => { 
  if (!value) { return 'Please enter your house number';} 
    return undefined;
};

export const validateZipCode = (value:  string | undefined) => { 
  if (!value) { return 'Please enter your postal code';} 
    return undefined;
};

export const validateCity = (value:  string | undefined) => { 
  if (!value) { return 'Please specify your city';} 
    return undefined;
};

export const validateTelephoneNumber = (value:  string | undefined) => { 
  if (!value) { return 'Please enter your telephone number';} 
    return undefined;
};

export const validateKids = (kids: Kid[] | undefined): string | undefined => {
    if (!kids) {
      return undefined;
    }
  
    const invalidKid = kids.find((kid) => !kid.name || !kid.gender);
  
    if (invalidKid) {
      return 'Please fill in your kids name and gender';
    }
  
    return undefined;
  };


 
