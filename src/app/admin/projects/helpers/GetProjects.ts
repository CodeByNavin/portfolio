"use server"
import getSchema from '@/app/server/db'

export default async function GetProjects() {
    try {
        const Schema = await getSchema('Projects')

        if (!Schema) return null

        const Projects = await Schema.find()
        return JSON.stringify(Projects);
    } catch (error) {
        console.log(error)
        return null;
    }
}