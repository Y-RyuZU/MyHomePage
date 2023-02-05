export class File {
    name: string
    size: number
    unit: string
    type: "file" | "folder"
    lastUpdate: string
    lastEditor: string

    constructor(name: string, size: number, unit: string, type: "file" | "folder", lastUpdate: string, lastEditor: string) {
        this.name = name
        this.size = size
        this.unit = unit
        this.type = type
        this.lastUpdate = lastUpdate
        this.lastEditor = lastEditor
    }
}