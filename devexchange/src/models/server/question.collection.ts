import { IndexType, Permission } from "node-appwrite"
import { db, questionCollection } from "../name"
import { databases } from "./config"


export default async function createQuestionCollection() {
    // create a new question collection
    await databases.createCollection(db, questionCollection, questionCollection, [
        // anyone can read the question but logged in user can edit this or create a new one
        Permission.read("any"),
        Permission.read("users"),
        Permission.create("users"),
        Permission.update("users"),
        Permission.delete("users"),
    ]);
    console.log("question collection is created successfully")
    // creating attributs and indexes
    await Promise.all([
        databases.createStringAttribute(db, questionCollection, "title", 100, true),
        databases.createStringAttribute(db, questionCollection, "content", 10000, true),
        databases.createStringAttribute(db, questionCollection, "authorId", 50, true),
        databases.createStringAttribute(db, questionCollection, "tags", 50, true, undefined, true),
        databases.createStringAttribute(db, questionCollection, "attachmentId", 50, false),
    ])
    console.log("question collection attributes are created successfully")
    // creating indexes manually
    await Promise.all([
        databases.createIndex(
            db,
            questionCollection,
            "title",
            IndexType.Fulltext,
            ["title"],
            ["asc"]
        ),
        databases.createIndex(
            db,
            questionCollection,
            "content",
            IndexType.Fulltext,
            ["content"],
            ["asc"]
        ),
    ])
}