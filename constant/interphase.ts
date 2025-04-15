
export interface ICustomTableHeader {
    title: string;
}

export interface ICustomTableData {
    [key: string]: string | number | boolean | undefined | IMediaFolders;
}

export interface IMediaFolders extends ICustomTableData {
    id: string;
    name: string;
    content: string;
    createdAt: string;
    shared: string;
}