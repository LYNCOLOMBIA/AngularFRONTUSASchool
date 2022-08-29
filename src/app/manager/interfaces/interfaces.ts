export interface Group {
    id?: string,
    user_id?:string,
    group_name?: string,

}
export interface Student {
    id?: string,
    first_name?: string,
    last_name?:string,
    group_id?:string,

}
export interface ExcelStudent {
    group_id?: string ,
    first_name?: string,
}