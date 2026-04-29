import * as timesheetRepo from '../repositories/timesheetRepo.js';

export async function getAllTimesheets(){
    return timesheetRepo.getAllTimesheets();
}
export async function getTimesheetById(id){
    return timesheetRepo.getTimesheetById(id);
}
export async function createTimesheet(timesheetData){
    return timesheetRepo.createTimesheet(timesheetData);
}

export async function updateTimesheet(id, updateData){
    return timesheetRepo.updateTimesheet(id, updateData);
}
export async function deleteTimesheet(id){
    return timesheetRepo.deleteTimesheet(id);
}