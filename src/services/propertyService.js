import * as propertyRepo from '../repositories/propertyRepo.js';

export async function getAllProperties(){
    return propertyRepo.getAllProperties();
}
export async function getPropertyById(id){
    return propertyRepo.getPropertyById(id);
}
export async function createProperty(propertyData){
    return propertyRepo.createProperty(propertyData);
}

export async function updateProperty(id, updateData){
    return propertyRepo.updateProperty(id, updateData);
}
export async function deleteProperty(id){
    return propertyRepo.deleteProperty(id);
}
