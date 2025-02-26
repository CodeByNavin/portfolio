"use server"
import getSchema from '@/app/server/db'

export default async function DeleteProject(DeleteProject: any) {
    try {
        const Schema = await getSchema('Projects')

        if (!Schema) {
            console.log('Schema not found')
            return null;
        }

        await Schema.findOneAndDelete(
            { _id: DeleteProject._id },
            DeleteProject,
        )
        return true;
    } catch (error) {
        console.log(error)
        return null;
    }
}