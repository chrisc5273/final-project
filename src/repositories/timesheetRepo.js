import Prisma from '../config/db.js';

export async function createTimesheet(timesheetData){
    return Prisma.timesheets.create({
        data: timesheetData
    });
}

export async function getTimesheetById(id){
    return Prisma.timesheets.findUnique({
        where: { id: Number(id) }
    });
}

export async function getAllTimesheets(){
    return Prisma.timesheets.findMany();
}

export async function updateTimesheet(id, updateData){
    return Prisma.timesheets.update({
        where: { id: Number(id) },
        data: updateData
    });
}

export async function deleteTimesheet(id) {
    return Prisma.timesheets.delete({
        where: {id: Number(id)}
    }) 
}