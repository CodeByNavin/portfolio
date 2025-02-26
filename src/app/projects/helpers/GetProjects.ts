"use server"
import { GetProjects as GetAllProjects } from '@/server/server'

export default async function GetProjects() {
    try {
        const result = await GetAllProjects()
        return JSON.parse(result as string);
    } catch (error) {
        console.log(error)
        return null;
    }
}