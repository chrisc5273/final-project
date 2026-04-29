import * as propertyService from '../services/propertyServices.js';

export async function getAllProperties(req,res,next){
    const properties = await propertyService.getAllProperties();
    res.json(properties);

}

export async function getPropertyById(req,res,next){
    const {id} = req.params;
    const property = await propertyService.getPropertyById(id);
    res.json(property);
}

export async function createProperty(req,res,next){
    const {name, address, starttime} = req.body;

    const property = await propertyService.createProperty({name, address, starttime});
    res.status(201).json(property);
}

export async function updateProperty(req,res,next){
    const {id} = req.params;
    const {name, address, starttime} = req.body;
    const updatedProperty = await propertyService.updateProperty(id, {name, address, starttime});
    res.status(201).json(updatedProperty);
}
export async function deleteProperty(req,res,next){
    const {id} = req.params;
    const deletedProperty = await propertyService.deleteProperty(id);
    res.status(200).json(deletedProperty);
}