import * as checklistSubmissionRepo from '../repositories/checklistSubmissionRepo.js';

export async function getAllChecklistSubmissions(){
    return checklistSubmissionRepo.getAllChecklistSubmissions();
}
export async function getChecklistSubmissionById(id){
    return checklistSubmissionRepo.getChecklistSubmissionById(id);
}
export async function createChecklistSubmission(checklistSubmissionData){
    return checklistSubmissionRepo.createChecklistSubmission(checklistSubmissionData);
}

export async function updateChecklistSubmission(id, updateData){
    return checklistSubmissionRepo.updateChecklistSubmission(id, updateData);
}
export async function deleteChecklistSubmission(id){
    return checklistSubmissionRepo.deleteChecklistSubmission(id);
}