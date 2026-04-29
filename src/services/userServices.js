import * as userRepository from '../repositories/userRepository.js';

export async function getAllUsers(){
    return userRepository.findAllUsers();
}

export async function getUserById(id){
    return userRepository.getUserById(id);
}

export async function createUser(data){
    return userRepository.createUser(data);
}

export async function deleteUser(userName){
    return userRepository.deleteUser(userName);
}