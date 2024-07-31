
class validateData {  
  validatePropertyInput (property: string | undefined , canBeUndefined: boolean = false): boolean {
    const isUndefined = canBeUndefined? property == undefined : false

    const propertyIsInvalid = ( isUndefined || (property != "" && typeof property === "string"));
    const response = propertyIsInvalid? true : false;

    return response
  }
} 

export { validateData }