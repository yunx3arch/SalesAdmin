
function Customer(customerCount){
    return(
        <div className="customer-card" >
            <div className="customer-count">Customers</div> <div className="customer-num">{customerCount.customer}</div>
            
        </div>
    )
}
export default Customer;