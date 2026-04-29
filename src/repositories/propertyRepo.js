import Prisma from '../config/db.js';

export async function createProperty(propertyData){
    return Prisma.properties.create({
        data: propertyData
    });
}

export async function getPropertyById(id){
    return Prisma.properties.findUnique({
        where: { id: Number(id) }
    });
}

export async function getAllProperties(){
    return Prisma.properties.findMany();
}

export async function updateProperty(id, updateData){
    return Prisma.properties.update({
        where: { id: Number(id) },
        data: updateData
    });
}

export async function deleteProperty(id) {
    return Prisma.properties.delete({
        where: {id: Number(id)}
    }) 
}