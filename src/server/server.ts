import AccessSchemas from './db'

export async function GetAccess(email: string): Promise<string | null> {
    try {
        const Schema = await AccessSchemas('Access')

        if (!Schema) return null;

        const Projects = await Schema?.findOne({
            email: email
        })
        return JSON.stringify(Projects);
    } catch (error) {
        console.log(error)
        return null;
    }
}

/**
 *  Retrieves all projects from the database
 * @returns {string | null} - Returns a stringified JSON object of all projects or null if an error occurs
 */
export async function GetProjects(): Promise<string | null> {
    try {
        const Schema = await AccessSchemas('Projects')

        if (!Schema) return null;

        const Projects = await Schema.find();
        return JSON.stringify(Projects);
    } catch (error) {
        console.log(error)
        return null;
    }
}

/**
 * 
 * @param updatedProject - The updated project object
 * @returns {boolean | null} - Returns true if the project was updated successfully, false if an error occurs
 */
export async function UpdateProject(updatedProject: any): Promise<boolean | null> {
    try {
        const Schema = await AccessSchemas('Projects')

        if (!Schema) return false

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

/**
 * 
 * @param DeleteProject - The project object to delete
 * @returns {boolean | null} - Returns true if the project was deleted successfully, false if an error occurs
 */
export async function DeleteProject(DeleteProject: any): Promise<boolean | null> {
    try {
        const Schema = await AccessSchemas('Projects')

        if (!Schema) return false;

        await Schema.findOneAndDelete(
            { _id: DeleteProject._id },
        )
        return true;
    } catch (error) {
        console.log(error)
        return null;
    }
}