"use server"
import mongoose from 'mongoose';
import schemas, { Schema } from './schemas'


async function connectToDatabase() {

    if (mongoose.connection && mongoose.connection?.readyState === 1) {
        return mongoose.connection;
    };

    if (!process.env.DB_URI) {
        throw new Error(`MongoDB URI not defined.`)
    };

    try {
        mongoose.connect(process.env.DB_URI)

        mongoose.connection.on('error', (error) => {
            console.error(`Failed to connect to MongoDB: ${error.message}`);
        });

        mongoose.connection.on('connected', () => {
            console.log(`\x1b[32mConnected to MongoDB\x1b[0m`); // Green text
        });

        mongoose.connection.on('disconnected', () => {
            console.log(`\x1b[33mDisconnected from MongoDB\x1b[0m`); // Yellow text
        });

        return mongoose.connection;
    } catch (error) {
        console.error(`Failed to connect to MongoDB: ${error}`);
    }
}

export default async function AccessSchemas(Schema: string) {

    await connectToDatabase()

    const SchemaEntry = schemas.find((item: Schema) =>
        item.SchemaName === Schema
    )

    if (!SchemaEntry) {
        console.error(`Schema ${Schema} does not exist in list.`);
        return null;
    }

    const MongooseSchema = new mongoose.Schema(
        SchemaEntry.SchemaDefinition || {},
        {
            timestamps: true,
            strict: false,
            collection: Schema,
            versionKey: false
        }
    );

    if (!mongoose.connection.models[Schema]) {
        mongoose.connection.model(Schema, MongooseSchema)
        console.log(`\x1b[33m[DB]: Model ${Schema} registered for database\x1b[0m`); // Yellow text
    }

    return mongoose.connection.models[Schema]
}