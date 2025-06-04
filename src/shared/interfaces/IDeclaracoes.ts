export interface IDeclaracoes {
    bank_account_transfers : [IDeclaracoesTranferencia]
    current_page    : number,
    per_page        : number,
    total_pages     : number,
    total_records   : number
}

export interface IDeclaracoesTranferencia {
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
export interface IDeclaracoesFilters{
    start_date	    : string,
    end_date	    : string,
    min_value	    : string,
    max_value	    : string,
    transfer_type	: string,
    per_page	    : string,
    page	        : string,
}