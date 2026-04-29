import * as timesheetService from '../services/timesheetService.js';

export async function getAllTimesheets(req,res,next){
    const timesheets = await timesheetService.getAllTimesheets();
    res.json(timesheets);
}

export async function getTimesheetById(req,res,next){
    const {id} = req.params;
    const timesheet = await timesheetService.getTimesheetById(id);
    res.json(timesheet);
}

export async function createTimesheet(req,res,next){
    const {userid, propertyid, clockedin, clockedout} = req.body;

    const timesheet = await timesheetService.createTimesheet({userid, propertyid, clockedin, clockedout});
    res.status(201).json(timesheet);
}

export async function updateTimesheet(req,res,next){
    const {id} = req.params;
    const {userid, propertyid, clockedin, clockedout} = req.body;
    const updatedTimesheet = await timesheetService.updateTimesheet(id, {userid, propertyid, clockedin, clockedout});
    res.status(201).json(updatedTimesheet);
}
export async function deleteTimesheet(req,res,next){
    const {id} = req.params;
    const deletedTimesheet = await timesheetService.deleteTimesheet(id);
    res.status(200).json(deletedTimesheet);
}