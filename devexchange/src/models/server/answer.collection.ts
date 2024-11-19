import {Permission} from "node-appwrite"
import { databases } from "./config"
import { db,answerCollection } from "../name"
export default async function createAnswerCollection(){
    // create a new answer collection
    await databases.createCollection(db, answerCollection,answerCollection,[
        // anyone can read the answer but logged in user can edit this or create a new one
        Permission.create("users"),
        Permission.read("any"),
        Permission.read("users"),
        Permission.update("users"),
        Permission.delete("users"),
    ])
    console.log("answer collection is created successfully")
    // creating attributes
    await Promise.all([
        databases.createStringAttribute(db, answerCollection, "content", 10000, true),
        databases.createStringAttribute(db, answerCollection, "questionId", 50, true),
        databases.createStringAttribute(db, answerCollection, "authorId", 50, true),
    ])
    console.log("answer collection attributes and indexes are created successfully")
}
