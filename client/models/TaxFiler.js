import axios from "axios";
import url1 from '../../config.js'
const url = `${url1.url}/api/taxfiler`;

export default class TaxFiler {
    constructor(taxfiler = {}) {
        this.firstName = taxfiler.firstName || "";
        this.lastName = taxfiler.lastName || "";
        this.taxType=taxfiler.taxType||0;
        this.filingStatus=taxfiler.filingStatus||0,
        this.dateOfBirth = taxfiler.dateOfBirth || null;
        this.routing=taxfiler.routing||"";
        this.account = taxfiler.account || []; 
        this.l4SSNDigits=taxfiler.l4SSNDigits||"",
        this.taxFilerEmail=taxfiler.taxFilerEmail||"",
        this.mobilePhone=taxfiler.mobilePhone||"",
        this.address=taxfiler.address||"",
        this.dependentFlag=taxfiler.dependentFlag||false,
        this.orderStatus=taxfiler.orderStatus||1,
        this.documentFiles=taxfiler.documentFiles||[],
        this.adminUserEmail=taxfiler.adminUserEmail||"",
        this.adminUser_id=taxfiler.adminUser_id||null,
        this.fileNumber=taxfiler.fileNumber||"",
        this.orderDate=taxfiler.orderDate||null,
        this.paymentStatus=taxfiler.paymentStatus||"false",
        this.spouseDetails=taxfiler.spouseDetails||{}

    }

    //used to get all taxfilers in Orders.vue page
    static get = (token) => {
        return axios.get(url, {headers:{"x-auth-token":token}});
        }

    //get taxfiler of a specific _id for TaxFilerInfo.vue page   
    static getTaxFilerInfoById = (token,  taxFiler_id) => {
        return axios.get(`${url}/_id/${taxFiler_id}`, {headers:{"x-auth-token":token}});
        }

    //used to get taxfilers of a specific adminuser in AdminUserInfo page  
    static getTaxFilerByAdminUserId = (token, adminUser_id, selectParameter) => {
            return axios.get(`${url}/adminuserid/${adminUser_id}/${selectParameter}`, {headers:{"x-auth-token":token}});
        } 
    
    //to download document in TaxFilerInfo page
    static getDocument=(token,_id, index)=>
        {
            return axios.get(`${url}/download/${_id}/${index}`, {headers:{"x-auth-token":token}} , {responseType: 'arraybuffer'});
        }
    //get order numbers on DashBoard.vue page    
    static getDashboardInfo=(token)=>{
            return axios.get(`${url}/dashboard`, {headers:{"x-auth-token":token}});
    }

    //used to change taxfilerstatus(oredr status) in AdminUserInfo page, not used 
    static put(token, taxFiler_id, taxFiler) {
       return axios.put(`${url}/${taxFiler_id}`, taxFiler , {headers:{"x-auth-token":token}} );
    }

    //
    static putAccessedBy=(token, taxFiler_id, adminUser_id, adminUserEmail)=> {
        return axios.put(`${url}/accessedby/${taxFiler_id}`, {adminUser_id:adminUser_id, adminUserEmail:adminUserEmail } ,{headers:{"x-auth-token":token}});
    }

    static putOrderStatus(token, taxFiler_id, orderStatus) {
        return axios.put(`${url}/orderstatus/${taxFiler_id}`, {orderStatus:orderStatus}, {headers:{"x-auth-token":token}});
    }



















    // static get = (userid) => {
    //     console.log('get boxcart client 22', userid)
    //     return axios.get(`${url}/${userid}`);}

    // static post(boxcart) {
    //     console.log(' client post boxcart', boxcart );
    //     return axios.post(url, boxcart);
    // }

    // static put(boxcart) {
    // console.log('put boxcart client',boxcart.userid, boxcart)
    //    return axios.put(`${url}/${boxcart.userid}`, boxcart);
    // }

    // static delete(userid) {
    //     return (
    //         confirm("Are you sure you want to delete this boxcart?") &&
    //         axios.delete(`${url}/${userid}`)
    //     );

    // }
}