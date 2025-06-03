export interface IDataBanco {
    id: number,
    bank_name: string,
    bank_code: string,
    agency_number: string,
    agency_digit: string,
    account_number: string,
    account_digit: string,
    account_type: string,
    document: string,
    holder_name: string,
    created_at: string,
    updated_at: string,
    amount: number
}

export interface IDataBancoAll {
    account_digit: string
    account_number: string
    account_type: string
    agency_digit: string
    agency_number: string
    bank_code: string
    bank_name: string
    document: string
    holder_name: string
    id: number
}
