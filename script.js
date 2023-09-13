// Import Firebase SDK modules for initialization and database operations
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

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
const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");

// Add a click event listener to the "Add" button
addButtonEl.addEventListener("click", function() {
    // Get the data (item) from the input field
    let data = inputFieldEl.value;

    // Push the data (item) to the "shoppingList" in the database
    push(shoppingListInDB, data);

    // Log the data to the console (for debugging or confirmation)
    console.log(data);
});
