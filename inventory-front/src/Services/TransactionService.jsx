import axios from "axios";

const TRANSACTION_URL='http://localhost:9898/inventory/transaction';
const URL='http://localhost:9898/inventory/trans';
const ID_URL='http://localhost:9898/inventory/id';
const ANALYSIS_URL='http://localhost:9898/inventory/analysis';
 

export const saveTransaction= (transaction,pid,type) => {
    return axios.post(TRANSACTION_URL+'/'+pid+'/'+type,transaction);
}
export const transactionIdGenerate = () => {
    return axios.get(ID_URL);
}
export const getTransactionById = (id) => {
    return axios.get(TRANSACTION_URL+ '/' + id);
}
export const getAlltransactions = () => {
    return axios.get(TRANSACTION_URL);
}
export const deleteTransactionById = (id) => {
    return axios.delete(TRANSACTION_URL+ '/' + id);
}
export const getTransactionsByType=(type)=>{
    return axios.get(URL+'/'+type);
}

export const getProductWiseTotalSale=()=>{
    return axios.get(ANALYSIS_URL);
}
export const getDemandByProduct=(id)=>{
    return axios.get(ANALYSIS_URL+'/'+id);
}

