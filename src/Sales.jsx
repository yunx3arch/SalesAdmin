import {fetchSales, fetchDeleteSale} from "./services";
import {useState, useEffect} from "react";
import AddNew from "./AddNew";
import Customer from "./Customer";
import Revenue from "./Revenue";

function Sales({setLogin, setErrMsg}){


    const[sales,setSales] = useState({});
    const [showAdd, setShowAdd] = useState(false);
    const[customerCount,setCustomerCount] = useState();
    const[revenue, setRevenue]=useState();


    useEffect(()=>{
        fetchSales()
        .then(result=>{
            setLogin(true);
            setErrMsg('');
            setSales(result);
           
           setCustomerCount(Object.keys(result).length);
           let sum=0;
           Object.values(sales).map(sale=>{
            sum+=sale.price;
            return sum;
          })
           setRevenue(sum);
   
        })
        .catch(err=>{
            setErrMsg(err.error);
        })
    },[sales, setLogin,setErrMsg])

    function deleteSale(id){
        fetchDeleteSale(id)
        .then(()=>{
            setSales(prev=>{
                const allSale = {...prev};
                delete allSale[id];
                return allSale;
            })
        })
        .catch(err=>{
            setErrMsg(err.error);
        })
    }
 


    return(
      <div className="main-panel">
        <div className="stats-cards">
        <div className="card"><Customer customer={customerCount}/></div>
        <div className="card"><Revenue customer={revenue}/></div>
        </div>
        <div className="revenue-form">
        <div className="card">
        <div className="revenue-title"> Inventory</div>
        <div className="item"> 
            <table>
                  <thead>
                  <col width="10px" />
                  <col width="30px" />
                  <col width="40px" />
                  <col width="30px" />
                  <col width="40px" />
                      <tr>
                        <th >#</th>
                        <th >Customer</th>
                        <th >Product</th>
                        <th >Price</th>
                        <th >Status</th>
                        <th >
  <button className="add-button"
     onClick={()=>{!showAdd?setShowAdd(true):setShowAdd(false)}}
   >
     +
   </button></th>
        </tr></thead>
        <tbody>
       {showAdd && <AddNew setShowAdd={setShowAdd} setErrMsg={setErrMsg}/>}

    
       
        {Object.values(sales).map(sale=> {
            //const isDoneClass = todo.done ? "todo__text--complete" : "todo__text--incomplete";
           //  console.log(todo.done);
       return(
    
          <tr>
        <td key={sale.receipt}>{sale.receipt}</td>
        <td key={sale.customer}>{sale.customer}</td>
        <td key={sale.product}>{sale.product}</td>
        <td key={sale.price}>${sale.price}</td>
        <td key={sale.approved===true?'Approved':'Canceled'}>{sale.approved===true?'Approved':'Canceled'}</td>
        <td> <button
     data-id={sale.id}
     className="todo__delete"
     type="button"
     onClick={()=>deleteSale(sale.id)}
   >
     Delete
   </button></td>
        </tr> 
   

       )
   })}
      </tbody>
 </table>
   </div>
   </div>
   </div>
   </div>
    )
}
export default Sales;