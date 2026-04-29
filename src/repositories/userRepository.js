import Prisma from '../config/db.js';

export async function getAllUsers(){
    return Prisma.users.findMany();
}

export async function getUserById(id){
    return Prisma.users.findUnique({
        where: {id: Number(id)},
    });
}

export async function getUserByEmail(email){
    return Prisma.users.findUnique({
        where: { email: email.toLowerCase() },
    });
}

export async function createUser(data){
    return Prisma.users.create({
        data
    });
}

export async function updateUser(id, updateData){
    return Prisma.users.update({
        where: { id: Number(id) },
        data: updateData,
    });
}

export async function deleteUser(id){
    return Prisma.users.delete({
        where: { id: Number(id) },
    });
}
