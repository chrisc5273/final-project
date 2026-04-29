import * as userService from '../services/userServices.js';

export async function getAllUsers(req, res, next){
    const users = await userService.getAllUsers();
    res.json(users);
}

export async function createUser(req,res,next){
    const { name, email, password, phonenumber, role } = req.body;

    const user = await userService.createUser({ name, email, password, phonenumber, role });

    res.status(201).json(user);
}

export async function getUserById(req,res,next){
    const {id} = req.params;
    const user = await userService.getUserById(id);
    res.json(user);
}

export async function updateUser(req,res,next){
    const {id} = req.params;
    const { name, email, password, phonenumber, role } = req.body;

    const user = await userService.updateUser(id, { name, email, password, phonenumber, role });
    res.status(201).json(user);
}
export async function deleteUser(req,res,next){
    const {id} = req.params;
    const deletedUser = await userService.deleteUser(id);
    res.status(200).json(deletedUser);
}
