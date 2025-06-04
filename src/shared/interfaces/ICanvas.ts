import { IDataBanco } from "./IDataBanco";
import { IDeclaracoes } from "./IDeclaracoes";

export interface IUserCanvas {
    uid?: string,
    name?: string,
    email?: string,
    created_at?: string,
    updated_at?: string,
    user_bank_accounts?: [IDataBanco]
    bank_account_transfers?: [IDeclaracoes]
}
