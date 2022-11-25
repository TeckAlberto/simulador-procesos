import { BCP } from "./process.model"

export interface OkResponse{
    ok: boolean
};

export interface GetFirstResponse{
    ok: boolean
    process?: BCP
};

export interface FileRequest{
    filename: string
}

export interface AppendRequest{
    filename: string
    process: BCP
};