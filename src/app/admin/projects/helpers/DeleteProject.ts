"use server"
import { DeleteProject as Delete_Project } from '@/server/server'

export default async function DeleteProject(DeleteProject: any) {
    try {
        await Delete_Project(DeleteProject)
        return true;
    } catch (error) {
        console.log(error)
        return null;
    }
}