import { db } from "@/lib/db"; 
import { InsertPost, InsertUser, postsTable, usersTable } from "@/lib/schema";

export async function createUser(data: InsertUser){
    await db.insert(usersTable).values(data);
}

export async function createPost(data: InsertPost){
    await db.insert(postsTable).values(data);
}