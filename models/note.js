const { MongoClient, ObjectId } = require('mongodb');
let client = new MongoClient(process.env.DB_URI);
let db = process.env.DB_NAME;

class Note {
    title;
    description;
    createdAt;
    isActive;

    constructor(title = "default", description = "default") {
        this.title = title;
        this.description = description;
        this.createdAt = Date.now();
        this.isActive = true;
    }

    async GetAllActiveNotes() {
        try {
            await client.connect();
            return await client.db(db).collection('notes').find({ isActive: true }).toArray();
        } catch (error) {
            return error;
        } finally {
            await client.close();
        }
    }

    async GetAllNotes() {
        try {
            await client.connect();
            return await client.db(db).collection('notes').find({}).toArray();
        } catch (error) {
            return error;
        } finally {
            await client.close();
        }
    }

    async GetNoteByID(id) {
        try {
            await client.connect();
            return await client.db(db).collection('notes').findOne({ _id: ObjectId(id) });
        } catch (error) {
            //console.log({ error });
            return error;
        } finally {
            await client.close();
        }
    }

    async InsertNewNote() {
        try {
            await client.connect();
            return await client.db(db).collection('notes').insertOne(this);
        } catch (error) {
            return error;
        } finally {
            await client.close();
        }
    }

    async UpdateNoteById(id, title, description) {
        try {
            await client.connect();
            return await client.db(db).collection('notes').updateOne(
                { _id: ObjectId(id) },
                { $set: { title, description } });
        } catch (error) {
            return error;
        } finally {
            await client.close();
        }
    }

    async DeleteNote(id) {
        try {
            await client.connect();
            return await client.db(db).collection('notes').updateOne(
                { _id: ObjectId(id) },
                { $set: { isActive: false } });
        } catch (error) {
            return error;
        } finally {
            await client.close();
        }
    }
}

module.exports = Note;