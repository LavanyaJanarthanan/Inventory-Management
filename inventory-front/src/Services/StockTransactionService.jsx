import axios from "axios";

const BASE_URL = 'http://localhost:9898/inventory/transaction';
const ID_URL='http://localhost:9898/inventory/trans';
const ANA_URL='http://localhost:9898/inventory/analysis';

export const generateId = () => {
  return axios.get(ID_URL);
};

export const saveTransactions = (newTransaction) => {
  return axios.post(BASE_URL, newTransaction);
};

export const getAllTransactions = () => {
  return axios.get(BASE_URL);
};

export const getTransactionById = (id) => {
  return axios.get(BASE_URL+'/'+id);
};

export const getTransactionsByType = (type) => {
  return axios.get(BASE_URL+'/type/'+type);

};

export const deleteTransaction = (id) => {
  return axios.delete(BASE_URL+'/'+id);
};

export const getProductWiseTotalSale=()=>{
  return axios.get(ANA_URL);
}

export const getDemandByProduct=(id)=>{
return axios.get(ANA_URL+'/'+id);

}

export const getInTransactionsReport = () => {
  return axios.get(`${BASE_URL}/report/in`);
}

export const getOutTransactionsReport = () => {
  return axios.get(`${BASE_URL}/report/out`);
}

export const getTransactionAnalysisByType = () => {
  return axios.get("http://localhost:9898/inventory/transaction/analysisByType");
};
