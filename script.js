
const cheeseAmountText  = document.getElementById("cheese");
const cheesePerSecText  = document.getElementById("cheese-ps");
const cheeseImg  = document.getElementById("cheese-img");
const storeList = document.getElementById("store-list");
const restartBtn = document.getElementById("restart");

let origionalStoreItems = {
    0: {
        name: "Cheese Cloth",
        cost: 15,
        nrOwned: 0,
        img: './assets/cloth.png',
        cheesePS: 1
    },
    1: {
        name: "Cheese Kettle",
        cost: 100,
        nrOwned: 0,
        img: './assets/kettle.png',
        cheesePS: 10
    },
    2: {
        name: "Cow Farm",
        cost: 1000,
        nrOwned: 0,
        img: './assets/cow.png',
        cheesePS: 80
    },
    3: {
        name: "Cheese Factory",
        cost: 15000,
        nrOwned: 0,
        img: './assets/factory.png',
        cheesePS: 200
    },
    4: {
        name: "Cheese Kingdom",
        cost: 50000,
        nrOwned: 0,
        img: './assets/kingdom.png',
        cheesePS: 500
    },
    5: {
        name: "Cheese Moon",
        cost: 100000,
        nrOwned: 0,
        img: './assets/moon.png',
        cheesePS: 900
    },
    6: {
        name: "Cheese Galaxy",
        cost: 5000000,
        nrOwned: 0,
        img: './assets/galaxy.png',
        cheesePS: 5000
    }
};

// Taking the store and currency from localstorage or default
let storeItems = JSON.parse(localStorage.getItem("storeItems")) || origionalStoreItems;
let cheeseAmount = JSON.parse(localStorage.getItem("cheese")) || 0;

const updateScreen = () => {
    // Reset the store list
    storeList.innerHTML = ``;
    // Updating the numbers
    updateNumbers();
    
    // Load in the store list
    Object.values(storeItems).forEach(element => {
        const li = document.createElement("li");
        const img = document.createElement("img");
        img.src = element.img;
        let price;

        // Calculating if the cost needs a magnitude
        if (element.cost >= 1000000) {
            price = (element.cost/1000000).toFixed(1) + "M";
        } else if (element.cost >= 1000) {
            price = (element.cost/1000).toFixed(1) + "K";
        } else {
            price = element.cost.toFixed(1);
        }
        
        // Creating all the elements in each list item
        const span = document.createElement("span");
        const name = document.createElement("h3");
        const cost = document.createElement("p");
        name.innerText = element.name;
        cost.innerHTML = `Cost: ${price}`;
        span.appendChild(name);
        span.appendChild(cost);
    
        const numberOf = document.createElement("h3");
        numberOf.innerHTML = `#${element.nrOwned}`;
    
        li.appendChild(img);
        li.appendChild(span);
        li.appendChild(numberOf);

        storeList.appendChild(li);

        // Event listener for when you click a list item
        li.addEventListener("click", () => {
            if (cheeseAmount >= element.cost) {
                cheeseAmount -= element.cost;
                element.nrOwned += 1;
                element.cost = element.cost * 1.05;
                updateScreen();
            }
            
        })
    });
    
    saveStorage();
}

// Add the store items cheese per second you your balance
const passiveCheese = () => {
    let cheesePerSec = 0.0;
    Object.values(storeItems).forEach(element => {
        cheesePerSec += element.cheesePS * element.nrOwned;
    });
    cheeseAmount += cheesePerSec;
    cheesePerSecText.innerHTML = `per second: ${cheesePerSec}`;
    updateScreen();
}

// Adds one cheese each time you click the cheese
const cheeseClick = () => {
    cheeseAmount += 1;
    updateScreen();
}

// Adds magnitude to the balance
const updateNumbers = () => {
    if (cheeseAmount >= 1000000) {
        cheeseAmountText.innerHTML = `${(cheeseAmount/1000000).toFixed(3)}M Cheese`;
    } else if (cheeseAmount >= 1000) {
        cheeseAmountText.innerHTML = `${(cheeseAmount/1000).toFixed(1)}K Cheese`;
    } else {
        cheeseAmountText.innerHTML = `${cheeseAmount.toFixed(1)} Cheese`;
    } 
}

// Saves the store and balance to local storage
const saveStorage = () => {
    localStorage.setItem("storeItems", JSON.stringify(storeItems));
    localStorage.setItem("cheese", JSON.stringify(cheeseAmount));
}


cheeseImg.addEventListener("click", () => cheeseClick());

// Resets the balance and store when clicked
restartBtn.addEventListener("click", () => {
    storeItems = origionalStoreItems;
    cheeseAmount = 0;
})


updateScreen();
setInterval(passiveCheese, 1000);