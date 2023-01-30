export interface File {
    name: string
    size: number
    unit: string
    type: "file" | "folder"
    lastUpdate: string
    lastEditor: string
}