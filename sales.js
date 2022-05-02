const uuid = require('uuid').v4;

// We could make this an ES6 class
// or a constructor function
// But here we'll just make a new object
// without using the `new` operator
// and return it
function makeSalesList() {
  // These are hardcoded initial state when we restart the server
  const id1 = uuid();
  const id2 = uuid();
  const id3 = uuid();
let count=3;
  const salesList = {};
  const sales = {
    // The below syntax lets you use a variable value as the key
    // if the value of id1 is "asdf", the property is "asdf", not "id1"
    [id1]: {
      id: id1,
      receipt: '#1',
      customer: 'Ami Jacob',
      product: 'Short sleeve',
      approved: true,
      price: 29,
    },
    [id2]: {
      id: id2,
      receipt: '#2',
      customer: 'Tom Choi',
      product: 'Down Jacket',
      approved: true,
      price: 98,
    },
    [id3]: {
      id: id3,
      receipt: '#3',
      customer: 'Ellen Wilson',
      product: 'Short sleeve',
      approved: true,
      price: 29,
    },
  };

  salesList.contains = function contains(id) {
    // This !! syntax coerces the value to a boolean
    // First by giving us the reverse of the truthy/falsy value,
    // then by reversing it to true/false
    return !!sales[id];
  };

  salesList.getSales = function getSales() {
    return sales;
  };

  salesList.addSale = function addSale(customer,product,price) {
    count++;
    let receipt= "#"+count;
    
    const id = uuid();
    price=parseInt(price);
    sales[id] = {
      id,
      receipt,
      customer,
      product,
      approved:true,
      price,
    };
    return id;
  };

  salesList.getSale = function getSale(id) {
    return sales[id];
  };

  salesList.updateSale = function updateSale(id, sales) {
    // this uses ?? because we need to accept `false` as a legit value
    // And ?? only falls to the second argument if the first is undefined or null
    sales[id].done = todo.done ?? sales[id].done;
    // the below could use ?? or ||, but I wand the default instead of ''
    sales[id].task = todo.task || sales[id].task;
  };


  salesList.deleteSale = function deleteSale(id) {
    delete sales[id];
  };

  return salesList;
};

module.exports = {
  makeSalesList,
};
