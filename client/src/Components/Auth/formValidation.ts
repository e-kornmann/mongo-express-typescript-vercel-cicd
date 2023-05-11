import { Kid } from "../../types";

export const validateFirstName = (value:  string) =>  !value ? 'Please enter your first name' : undefined; 
export const validateLastName = (value:  string) => !value ? 'Please enter your last name' : undefined;
export const validateParent = (value:  string) => !value ? 'Please indicate your parental status' : undefined;
export const validateStreet = (value: string) => !value ? 'Please enter your street name' : undefined;
export const validateHouseNumber = (value:  string) => !value ? 'Please enter your house number' : undefined;
export const validateZipCode = (value:  string) => !value ? 'Please enter your postal code' : undefined;
export const validateCity = (value:  string) => !value ? 'Please specify your city'  : undefined;
export const validateTelephoneNumber = (value:  string) => !value ? 'Please enter your telephone number' : undefined;

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


 

  