import Prisma from '../config/db.js';

export async function finaAllUsers(completedFilter){
    const whereClause = completedFilter !== undefined
    ? { completed: completedFilter }
    : {};
    
    return Prisma.users.findMany({
        where: whereClause
    });

}

export async function getUserById(id){
    return Prisma.users.findUnique({
        where: {id}
    });

}

export async function getUserByEmail(email){
    return prisma.users.findUnique({
        where: {email}
    });

}

export async function createUser(data){
    return Prisma.users.create({
        data
    });
}

export async function deleteUser(userName){
    return prisma.users.delete({
        where: {name: userName}
    })
}