import { Kid } from "../../types";

export const validateFirstName = (value:  string) => { 
  if (!value) { return 'Please enter your first name';} 
  };
  
export const validateLastName = (value:  string) => { 
  if (!value) { return 'Please enter your last name';}
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
    
    const invalidKidName = kids.find((kid) => !kid.name);
    const invalidKidGender = kids.find((kid) => !kid.gender);
    const invalidKidDateOfBirth = kids.find((kid) => !kid.dateOfBirth);
  
    if (invalidKidName) {
      return 'Please fill in your kids name';
    }
    
    if (invalidKidGender) {
        return 'Please specify your kids gender';
      }
      
    if (invalidKidDateOfBirth) {
        return 'Please fill in your kids date of birth';
      }
    return undefined;
  };


 

  