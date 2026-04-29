import Prisma from '../config/db.js';

export async function createChecklistItem(checklistItemData){
    return Prisma.checklistitems.create({
        data: checklistItemData
    });
}

export async function getChecklistItemById(id){
    return Prisma.checklistitems.findUnique({
        where: { id: Number(id) }
    });
}

export async function getAllChecklistItems(){
    return Prisma.checklistitems.findMany();
}

export async function updateChecklistItem(id, updateData){
    return Prisma.checklistitems.update({
        where: { id: Number(id) },
        data: updateData
    });
}

export async function deleteChecklistItem(id) {
    return Prisma.checklistitems.delete({
        where: {id: Number(id)}
    }) 
}