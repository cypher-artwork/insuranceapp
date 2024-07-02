export interface Contract {
    contract_number: number;
    start_date : Date;
    end_date : Date;
    insurance_type : string;
    insurance_holder: string;
    active: boolean;
    created_at: Date;
}

