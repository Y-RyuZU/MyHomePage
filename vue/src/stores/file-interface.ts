export class File {
    name: string
    size: number
    unit: string
    type: "file" | "directory"
    lastUpdate: string
    lastEditor: string

    constructor(name: string, size: number, unit: string, type: "file" | "directory", lastUpdate: string, lastEditor: string) {
        this.name = name
        this.size = size
        this.unit = unit
        this.type = type
        this.lastUpdate = lastUpdate
        this.lastEditor = lastEditor
    }
}

export class SelectableFile extends File {
    selected: boolean = false;

    constructor(file: File) {
        super(file.name, file.size, file.unit, file.type, file.lastUpdate, file.lastEditor);
    }
}