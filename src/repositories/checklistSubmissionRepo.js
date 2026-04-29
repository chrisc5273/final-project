import Prisma from '../config/db.js';

export async function createChecklistSubmission(checklistSubmissionData){
    return Prisma.checklistsubmissions.create({
        data: checklistSubmissionData
    });
}

export async function getChecklistSubmissionById(id){
    return Prisma.checklistsubmissions.findUnique({
        where: { id: Number(id) }
    });
}

export async function getAllChecklistSubmissions(){
    return Prisma.checklistsubmissions.findMany();
}

export async function updateChecklistSubmission(id, updateData){
    return Prisma.checklistsubmissions.update({
        where: { id: Number(id) },
        data: updateData
    });
}

export async function deleteChecklistSubmission(id) {
    return Prisma.checklistsubmissions.delete({
        where: {id: Number(id)}
    }) 
}