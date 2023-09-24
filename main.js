// Variables
let headerList = document.querySelectorAll(".header .left-part ul li");
let cartItemsNo = 0;
let cartIcon = document.querySelector(".cart-icon");
let currentImg = 0;
let sideMenu = document.querySelector(".menu");
let mainImage = document.querySelector(".main-image img");
let leftArrow = document.querySelector(".left-arrow");
let rightArrow = document.querySelector(".right-arrow");
let allImages = Array.from(document.querySelectorAll(".other-images img"));
let plus = document.querySelector(".main-content .counter .plus");
let minus = document.querySelector(".main-content .counter .minus");
let itemsNoDispaly = document.querySelector(".main-content .counter span");
let addToCartBtn = document.querySelector(".add-to-cart");

// Function calls
renderCart();
renderImages(allImages, mainImage);

// Header Menu
headerList.forEach((e) => {
    e.addEventListener("click", () => {
        headerList.forEach((ele) => { ele.classList.remove("active") });
        e.classList.add("active");
    })
})

// Side Menu
sideMenu.addEventListener("click", () => {
    document.querySelector(".side-menu").style.display = "block";
    document.querySelector(".overlay").style.display = "block";
})
let sideMenuCloseBtn = document.querySelector(".close-btn");
sideMenuCloseBtn.addEventListener("click", () => {
    document.querySelector(".side-menu").style.display = "none";
    document.querySelector(".overlay").style.display = "none";
})

// Cart
cartIcon.addEventListener("click", () => {
    let cart = document.querySelector(".cart");
    if (getComputedStyle(cart).getPropertyValue("display") === "none") {
        cart.style.display = "block";
    }
    else {
        cart.style.display = "none";
    };
})

function renderCart() {
    if (cartItemsNo === 0) {
        document.querySelector(".itemsNo").style.display = "none";
        document.querySelector(".cart .empty-cart").style.display = "flex";
        document.querySelector(".cart .cart-product").style.display = "none";
        document.querySelector(".cart .checkout-button").style.display = "none";
    }
    else {
        document.querySelector(".itemsNo").style.display = "block";
        document.querySelector(".itemsNo span").textContent = `${cartItemsNo}`;
        document.querySelector(".cart .empty-cart").style.display = "none";
        document.querySelector(".cart .cart-product").style.display = "flex";
        document.querySelector(".cart .checkout-button").style.display = "block";
        document.querySelector(".cart .items-number").textContent = cartItemsNo;
        document.querySelector(".cart .total-price").textContent =  `$${125.00 * cartItemsNo}`
    }
}

// Cart Delete Button
let cartDeleteBtn = document.querySelector(".cart .cart-product .delete-icon");
cartDeleteBtn.addEventListener("click", () => {
    cartItemsNo = 0;
    renderCart();
})

// Counter Button
let noToAdd = 0;
plus.addEventListener("click", () => {
    noToAdd++; 
    itemsNoDispaly.textContent = noToAdd;
})
minus.addEventListener("click", () => {
    if(noToAdd -1 >= 0) noToAdd--; 
    itemsNoDispaly.textContent = noToAdd; 
})

// Add to cart button
addToCartBtn.addEventListener("click", ()=> {
    cartItemsNo += noToAdd;
    renderCart();
    itemsNoDispaly.textContent = 0;
    noToAdd = 0;
})





// Render images -arrow
leftArrow.addEventListener("click", () => {
    if(checkBoundries("left")){
        mainImage.setAttribute("src", `${allImages[currentImg].getAttribute("src")}`.replace("-thumbnail", "")) ;
    }
})

rightArrow.addEventListener("click", () => {
    if(checkBoundries("right")){
        mainImage.setAttribute("src", `${allImages[currentImg].getAttribute("src")}`.replace("-thumbnail", "")) ;
    }
})

function checkBoundries(direction){
    if(direction === "left" && currentImg - 1 >= 0){
        currentImg--;
        return true;
    }
    else if(direction ==="right" && currentImg + 1 < allImages.length){
        currentImg++;
        return true
    }
    else{
        return false;
    }
}

// Full images
if(window.innerWidth > 375){
    mainImage.addEventListener("click", fullScreenPreview)
}

function fullScreenPreview(){
    let fullScreenDiv = document.querySelector(".images-section").cloneNode(true);
    fullScreenDiv.style.cssText = "width: fit-content; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 200;";
    fullScreenDiv.classList.add("full-screen");

    let closeBtn = document.querySelector(".close-btn").cloneNode(true);
    closeBtn.querySelector("path").setAttribute("fill", "#ffffff");
    closeBtn.style.cssText = "position: absolute; top:-30px; right: 0; cursor: pointer;";
    closeBtn.addEventListener("click", () => {
        document.querySelector(".full-screen").remove();
        document.querySelector(".overlay").style.display = "none";
    })
    document.body.appendChild(fullScreenDiv);

    let leftArrow = document.querySelector(".left-arrow").cloneNode(true);
    let rightArrow = document.querySelector(".right-arrow").cloneNode(true);
    leftArrow.style.cssText = "width: 15px; background-color: white; padding: 15px; border-radius: 50px; position: absolute; top: 40%; transform: translateY(-50%); left: -20px; cursor: pointer;";
    rightArrow.style.cssText = "width: 15px; background-color: white; padding: 15px; border-radius: 50px; position: absolute; top: 40%; transform: translateY(-50%); right: -20px; cursor: pointer;";
    
    let img = document.querySelector(".full-screen .main-image img");
    let imgs = Array.from(document.querySelectorAll(".full-screen .other-images img"));

    imgs.forEach(()=>{renderImages(imgs, img)})
    
    leftArrow.addEventListener("click", () => {
        if(checkBoundries("left")){
            img.setAttribute("src", `${imgs[currentImg].getAttribute("src")}`.replace("-thumbnail", "")) ;
            imgs.forEach((e) => {e.classList.remove("active");});
            imgs[currentImg].classList.add("active");
        }
    })
    
    rightArrow.addEventListener("click", () => {
        if(checkBoundries("right")){
            img.setAttribute("src", `${imgs[currentImg].getAttribute("src")}`.replace("-thumbnail", "")) ;
            imgs.forEach((e) => {e.classList.remove("active");});
            imgs[currentImg].classList.add("active");
        }
    })
    
    leftArrow.addEventListener("mousedown", () => {
        leftArrow.querySelector("path").setAttribute("stroke", "hsl(26, 100%, 55%)");
    })
    leftArrow.addEventListener("mouseup", () => {
        leftArrow.querySelector("path").setAttribute("stroke", "black");
    })
    rightArrow.addEventListener("mousedown", () => {
        rightArrow.querySelector("path").setAttribute("stroke", "hsl(26, 100%, 55%)");
    })
    rightArrow.addEventListener("mouseup", () => {
        rightArrow.querySelector("path").setAttribute("stroke", "black");
    })

    document.querySelector(".overlay").style.display = "block";
    fullScreenDiv.appendChild(closeBtn);
    fullScreenDiv.appendChild(leftArrow);
    fullScreenDiv.appendChild(rightArrow);

}


// Render Selected image -main
function renderImages(images, mainImage){
    images.forEach((e) => {
        e.addEventListener("click", ()=>{
            images.forEach((e) => {e.classList.remove("active");});
            e.classList.add("active");
            mainImage.setAttribute("src" , `${e.getAttribute("src")}`.replace("-thumbnail", ""));
            currentImg = images.indexOf(e);
        })
    })
}

