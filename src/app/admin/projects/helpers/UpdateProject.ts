"use server"
import getSchema from '@/app/server/db'

export default async function UpdateProject(updatedProject: any) {
    try {
        const Schema = await getSchema('Projects')

        if (!Schema) {
            console.log('Schema not found')
            return null;
        }

        await Schema.findOneAndUpdate(
            { _id: updatedProject._id },
            updatedProject,
            { upsert: true, new: true }
        )
        return true;
    } catch (error) {
        console.log(error)
        return null;
    }
}