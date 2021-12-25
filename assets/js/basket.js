


let carts = document.querySelectorAll('.button--flex');

let product = [
   {
    name: 'Optical Frame Boxy' ,
    tag: 'product1' ,
    price: 19.99 ,
    inCart: 0
}, 
{
    name: 'Sunglasses Bage Boxy' ,
    tag: 'product2' ,
    price: 11.99 ,
    inCart: 0
}, 

{
    name: 'Optical Frame Grey' ,
    tag: 'product3' ,
    price: 7.99 ,
    inCart: 0
}, 

{
    name: 'Optical Frame Foxy' ,
    tag: 'product4' ,
    price: 5.99 ,
    inCart: 0
}, 

{
    name: 'Sunglasses Bage' ,
    tag: 'product5' ,
    price: 10.99 ,
    inCart: 0
}, 
{
    name: 'Optical Frame Thin' ,
    tag: 'product6' ,
    price: 8.99 ,
    inCart: 0
}, 



] 
for(let i = 0;i < carts.length; i++){
   carts[i] .addEventListener('click' , () =>{
    cartNum(product[i]);
    totalCost(product[i]);
   })
}


function cartNum(product) {  
    let productNum= localStorage.getItem('cartNum');

    //for change type of productNum from string to int 
    productNum = parseInt(productNum);  

    if(productNum){
         localStorage.setItem('cartNum' , productNum + 1);
         document.querySelector('.nav__btns span').textContent = productNum + 1;
    }else{
        localStorage.setItem('cartNum' , 1);
        document.querySelector('.nav__btns span').textContent = 1;
    }

    setItems(product);
  
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems != null){
        if(cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    }else{
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }
    product.inCart = 1; 
   
    cartItems = {
           [product.tag]: product
       }
        
    localStorage.setItem("productsInCart" , JSON.stringify
    (cartItems));
    
      
}

function onMainCartNo(){
    let productNum= localStorage.getItem('cartNum');
    
    if(productNum){
        document.querySelector('.nav__btns span').textContent = productNum;
    }
}

function totalCost(product){
    let cartCost = localStorage.getItem('totalCost');
    

    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost" , cartCost + product.price)
    }else{
        localStorage.setItem("totalCost" , product.price);
    }
}


function displayCarts(){
 
    let cartItems = localStorage.getItem("productsInCart");
     cartItems = JSON.parse(cartItems);
    let prodContainer = document.querySelector(".prodd");
    let cartCost = localStorage.getItem("totalCost");

    if(cartItems && prodContainer){    
    prodContainer.innerHTML = '';
    Object.values(cartItems).map(item => {  //check values inside
        
        prodContainer.innerHTML += ` 
        <div class = "product">
         <img src = "./assets/img/${item.tag}.png">
         <span class = "pN">${item.name}</span>
         </div>
         <div class = "price">${item.price}</div>
         <div class = "quantity">
         <span>${item.inCart}</span>
       
         </div>
         <div class = "total">
          ${item.inCart * item.price } 
         </div>
         
        `

    });

    prodContainer.innerHTML += `
    <div class = "basketTotal"
    <h4 class = "basketTotalTitle">Basket Total</4>
    <h4 class = "basketTotalT">${ Math.round(cartCost) }</h4>
    `

    }
   
}


displayCarts();
onMainCartNo();