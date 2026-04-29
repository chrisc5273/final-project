import bcrypt from 'bcrypt';
import * as userRepository from '../repositories/userRepository.js';

export async function getAllUsers(){
    return userRepository.getAllUsers();
}

export async function getUserById(id){
    return userRepository.getUserById(id);
}

export async function getUserByEmail(email){
    return userRepository.getUserByEmail(email);
}

export async function createUser(data){
    if (data.password) {
        data.password = await bcrypt.hash(data.password, 10);
    }
    return userRepository.createUser(data);
}

export async function updateUser(id, updateData){
    if (updateData.password) {
        updateData.password = await bcrypt.hash(updateData.password, 10);
    }
    return userRepository.updateUser(id, updateData);
}

export async function deleteUser(id){
    return userRepository.deleteUser(id);
}