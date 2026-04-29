import * as checklistSubmissionService from '../services/checklistSubmissionService.js';

export async function getAllChecklistSubmissions(req,res,next){
    const checklistSubmissions = await checklistSubmissionService.getAllChecklistSubmissions();
    res.json(checklistSubmissions);
}

export async function getChecklistSubmissionById(req,res,next){
    const {id} = req.params;
    const checklistSubmission = await checklistSubmissionService.getChecklistSubmissionById(id);
    res.json(checklistSubmission);
}

export async function createChecklistSubmission(req,res,next){
    const {timesheetid, checklistitemid, photourl, completedat} = req.body;

    const checklistSubmission = await checklistSubmissionService.createChecklistSubmission({timesheetid, checklistitemid, photourl, completedat});
    res.status(201).json(checklistSubmission);
}

export async function updateChecklistSubmission(req,res,next){
    const {id} = req.params;
    const {timesheetid, checklistitemid, photourl, completedat} = req.body;
    const updatedChecklistSubmission = await checklistSubmissionService.updateChecklistSubmission(id, {timesheetid, checklistitemid, photourl, completedat});
    res.status(201).json(updatedChecklistSubmission);
}
export async function deleteChecklistSubmission(req,res,next){
    const {id} = req.params;
    const deletedChecklistSubmission = await checklistSubmissionService.deleteChecklistSubmission(id);
    res.status(200).json(deletedChecklistSubmission);
}