"use server"
import { UpdateProject as Update_Project } from '@/server/server'

export default async function UpdateProject(updatedProject: any) {
    try {
        await Update_Project(updatedProject)
        return true;
    } catch (error) {
        console.log(error)
        return null;
    }
}