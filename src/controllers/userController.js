import * as userService from '../services/userService.js';

export async function getAllUsers(req, res, next){
    const {completed} = req.query;
    let completedFilter;
    if(completed === 'true') completedFilter = true;
    if(completed === 'false') completedFilter = false;



    
    const users = await userService.getAllUsers();
    res.json(users);
}

export async function createUser(req,res,next){
    const {name, email, password, phoneNumber} = req.body;

    const user = userService.createUser({name, email, password, phoneNumber});

    res.status(201).json(user);
}

export async function getUserById(req,res,next){
    const {id} = req.params;
    const user = await userService.getUserById(id);
}

export async function updateUser(req,res,next){
    const {id} = req.params;
    const {name, email, password, phoneNumber} = req.body;

    const user = await userService.updateUser(id, {name, email, password, phoneNumber});
    res.status(201).json(user);
}
export async function deleteUser(req,res,next){
    const {name} = req.body;
    const {id} = req.params;
    const deletedUser = await userService.deleteUser(id, {name})
}
//start of properties functions4