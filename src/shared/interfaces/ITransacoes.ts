export interface ITransacoes {
    bank_account_transfers : [ITransacoesTranferencia]
    current_page    : number,
    per_page        : number,
    total_pages     : number,
    total_records   : number
}

export interface ITransacoesTranferencia {
    id                  : number,
    was_success         : boolean,
    transfer_type_text  : string,
    amount_to_transfer  : number,
    created_at          : string,
    to_bank_account: {
        bank_name       : string,
        bank_code       : string,
        agency_number   : string,
        agency_digit    : string,
        account_number  : string,
        account_digit   : string,
        account_type    : string,
        document        : string,
        holder_name     : string
    },
    from_user_bank_account: {
        bank_name       : string,
        bank_code       : string,
        agency_number   : string,
        agency_digit    : string,
        account_number  : string,
        account_digit   : string,
        account_type    : string,
        document        : string,
        holder_name     : string
    }
}
export interface ITransacoesFilters{
    start_date	    : string,
    end_date	    : string,
    min_value	    : number,
    max_value	    : number,
    transfer_type	: string,
    per_page	    : string,
    page	        : string,
}