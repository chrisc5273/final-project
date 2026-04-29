import * as checklistItemService from '../services/checklistItemService.js';

export async function getAllChecklistItems(req,res,next){
    const checklistItems = await checklistItemService.getAllChecklistItems();
    res.json(checklistItems);
}

export async function getChecklistItemById(req,res,next){
    const {id} = req.params;
    const checklistItem = await checklistItemService.getChecklistItemById(id);
    res.json(checklistItem);
}

export async function createChecklistItem(req,res,next){
    const {propertyid, taskdescription, isactive} = req.body;

    const checklistItem = await checklistItemService.createChecklistItem({propertyid, taskdescription, isactive});
    res.status(201).json(checklistItem);
}

export async function updateChecklistItem(req,res,next){
    const {id} = req.params;
    const {propertyid, taskdescription, isactive} = req.body;
    const updatedChecklistItem = await checklistItemService.updateChecklistItem(id, {propertyid, taskdescription, isactive});
    res.status(201).json(updatedChecklistItem);
}
export async function deleteChecklistItem(req,res,next){
    const {id} = req.params;
    const deletedChecklistItem = await checklistItemService.deleteChecklistItem(id);
    res.status(200).json(deletedChecklistItem);
}