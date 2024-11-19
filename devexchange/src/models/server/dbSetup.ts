import { db } from "../name";
import createAnswerCollection from "./answer.collection";
import createCommentCollection from "./comment.collection";
import createQuestionCollection from "./question.collection";
import createVoteCollection from "./vote.collection";

import { databases } from "./config";

export default async function getOrCreateDB(){
    try {
        await databases.get(db)
        console.log(`Database ${db} already exists.`);
    } catch (error) {
        try {
            await databases.create(db,db)
            console.log(`Created database ${db}.`);
            await Promise.all([
                createAnswerCollection(),
                createCommentCollection(),
                createQuestionCollection(),
                createVoteCollection(),
            ])
            console.log("Collections created successfully.");
            console.log("database created successfully")
        } catch (error) {
            console.log("Error creating databases or collection", error)
        }
    }
    return databases
}