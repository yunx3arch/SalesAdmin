
import { fetchAddSale} from "./services";
import {useState} from "react";



function AddNew({setShowAdd,setErrMsg}){
    const[customer,setCustomer]=useState('');
const[product,setProduct]=useState('');
const[price,setPrice]=useState();

//const[disableAddButton, setDisableAddButton] = useState(true);

//if(customer) setDisableAddButton(false);
    function addSale(customer,product,price){
        fetchAddSale(customer,product,price)
        .then(result=>{

            setCustomer(prev=>({
                ...prev,
                [result.id]:result
            }));
            setPrice(prev=>({
                ...prev,
                [result.id]:result
            }));
            setProduct(prev=>({
                ...prev,
                [result.id]:result
            }));
         
            setProduct('');
            setCustomer('');
            setPrice('');
            setShowAdd(false);
            
        })
        .catch((err)=>{
            setErrMsg(err.error);
        })
    }
    // <th ><select id="status" value={approved} onChange={e=>setApproved(e.target.value)}>
    // <option value="approved">Approved</option>
    // <option value="canceled">Canceled</option></select></th>
return(
     <tr id="add" >
        <th scope="col">#</th>
                        <th ><input value={customer} onChange={e=>{setCustomer(e.target.value)}}/></th>
                        <th ><input value={product} onChange={e=>{setProduct(e.target.value)}}/></th>
                        <th ><input value={price} onChange={e=>{setPrice(e.target.value)}}/></th>
                        <th ></th>        
                        <th><button className="add-button" type="button" onClick={()=>addSale(customer,product,price)} disabled={!customer || !price || !product}>Add</button></th>
    </tr>
)
}
export default AddNew;