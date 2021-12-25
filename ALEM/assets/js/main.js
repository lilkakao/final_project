/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))
/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)
/*=============== CHANGE BACKGROUND HEADER DARK===============*/
function scrollHeader(){
    const header = document.getElementById('header')
    // When the scroll is greater than 80 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 80) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== QUESTIONS ACCORDION ===============*/
const accordionItems = document.querySelectorAll('.questions__item')

accordionItems.forEach((item) =>{
    const accordionHeader = item.querySelector('.questions__header')

    accordionHeader.addEventListener('click', () =>{
        const openItem = document.querySelector('.accordion-open')

        toggleItem(item)

        if(openItem && openItem!== item){
            toggleItem(openItem)
        }
    })
})

const toggleItem = (item) =>{
    const accordionContent = item.querySelector('.questions__content')

    if(item.classList.contains('accordion-open')){
        accordionContent.removeAttribute('style')
        item.classList.remove('accordion-open')
    }else{
        accordionContent.style.height = accordionContent.scrollHeight + 'px'
        item.classList.add('accordion-open')
    }

}

/*=============== DARK LIGHT THEME ===============*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'
// Activate / deactivate the theme manually with the button DARK
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
    // reset: true
})
sr.reveal(`.home__data`)
sr.reveal(`.home__img`, {delay: 500})
sr.reveal(`.home__social`, {delay: 600})
sr.reveal(`.about__img, .contact__box`,{origin: 'left'})
sr.reveal(`.about__data, .contact__form`,{origin: 'right'})
sr.reveal(`.steps__card, .product__card, .questions__group, .footer,.sectio, .new__container`,{interval: 100})

/*===== MOUSEMOVE HOME IMG =====*/
document.addEventListener('mousemove', move);
function move(e){
    this.querySelectorAll('.move').forEach(layer =>{
        const speed = layer.getAttribute('data-speed')

        const x = (window.innerWidth - e.pageX*speed)/140
        const y = (window.innerHeight - e.pageY*speed)/140

        layer.style.transform = `translateX(${x}px) translateY(${y}px)`
    })
}
/*=============== SHOW SCROLL UP ===============*/ 
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 400 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 400) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== BASCKET ===============*/
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
         </div>`
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