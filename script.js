// Import Firebase SDK modules for initialization and database operations
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// Firebase configuration settings for your app
const appSettings = {
    databaseURL: "https://my-cart-57079-default-rtdb.europe-west1.firebasedatabase.app/"
}

// Initialize the Firebase app with the provided settings
const app = initializeApp(appSettings);

// Get a reference to the Firebase Realtime Database
const database = getDatabase(app);

// Define a reference to the "shoppingList" location in the database
const shoppingListInDB = ref(database, "shoppingList");

// Get references to HTML elements
const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

// Add a click event listener to the "Add" button
addButtonEl.addEventListener("click", function() {
    // Get the data (item) from the input field
    let data = inputFieldEl.value;

    // Push the data (item) to the "shoppingList" in the database
    push(shoppingListInDB, data);

    // Clear the input field after adding the item
    clearInputField()
});

onValue(shoppingListInDB, function(snapshot) {
    // Challenge: Change the onValue code so that it uses snapshot.exists() to show items when there are items in the database and if there are not displays the text 'No items here... yet'.
    
    if (snapshot.exists()) {
        // Convert the snapshot data to an array of items
        let itemsArray = Object.entries(snapshot.val())
       
        // Clear the contents of the shopping list element
        clearShoppingListEl()

        // Add each item from the array to the shopping list
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]

            // Extract the item's ID and value from the array
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
            // Add the item to the shopping list
            appendItemToShoppingListEl(currentItem)
        }    
    } else {
        shoppingListEl.innerHTML = "No items here... yet"
    }
});

// Function to clear the contents of the shopping list element on the web page
function clearShoppingListEl(){
    shoppingListEl.innerHTML = "";
}

function clearInputField() {
    // Clear the input field value
    inputFieldEl.value = ""; 
}

function appendItemToShoppingListEl(item) {
    // Add the item as an <li> element to the shopping list
    let itemID = item[0]
    let itemValue = item[1]
    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue

    // Function for deleting list
    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        remove(exactLocationOfItemInDB)
    })
    
    shoppingListEl.append(newEl)
}
