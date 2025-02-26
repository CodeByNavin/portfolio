export interface Schema {
    SchemaName: string;
    SchemaDefinition: object | null;
}

const schemas: Schema[] = [
    {
        SchemaName: 'Projects',
        SchemaDefinition: null
    },
    {
        SchemaName: 'Access',
        SchemaDefinition: null
    }
];

export default schemas;
