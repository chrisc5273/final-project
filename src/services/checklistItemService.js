import * as checklistItemRepo from '../repositories/checklistItemRepo.js';

export async function getAllChecklistItems(){
    return checklistItemRepo.getAllChecklistItems();
}
export async function getChecklistItemById(id){
    return checklistItemRepo.getChecklistItemById(id);
}
export async function createChecklistItem(checklistItemData){
    return checklistItemRepo.createChecklistItem(checklistItemData);
}

export async function updateChecklistItem(id, updateData){
    return checklistItemRepo.updateChecklistItem(id, updateData);
}
export async function deleteChecklistItem(id){
    return checklistItemRepo.deleteChecklistItem(id);
}