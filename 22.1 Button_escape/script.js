// Function to generate a random index for directions
function randomIndex() {
    return Math.floor(Math.random() * 4);
}

// Get references to DOM elements
const buttonElement = document.querySelector("#button");
const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");

// shouldEscape starts as true because initially, the input fields are empty.
// The button should escape until both fields are filled.
let shouldEscape = true;

// Store the button's initial CSS styles.
// This is crucial for returning the button to its original position.
const initialButtonTop = buttonElement.style.top;
const initialButtonLeft = buttonElement.style.left;
const initialButtonRight = buttonElement.style.right;
const initialButtonBottom = buttonElement.style.bottom;
const initialButtonTransform = buttonElement.style.transform;

// Helper function to reset the button's position to its original state.
function resetButtonPosition() {
    buttonElement.style.top = initialButtonTop;
    buttonElement.style.left = initialButtonLeft;
    buttonElement.style.right = initialButtonRight;
    buttonElement.style.bottom = initialButtonBottom;
    buttonElement.style.transform = initialButtonTransform;
}

// Function to check input fields and update button behavior accordingly.
function checkInputFields() {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (username === "" || password === "") {
        // If either field is empty, the button should continue to escape.
        shouldEscape = true;
        document.querySelector("#aboveH2").innerHTML = "Input Fields have to be filled!";
        document.querySelector("#aboveH2").style.color = "Red";
        // Do NOT reset button position here; it should continue escaping.
    } else {
        // If both fields are filled, the button should stop escaping and return to its original position.
        shouldEscape = false;
        document.querySelector("#aboveH2").innerHTML = "Awesome, now you can proceed";
        document.querySelector("#aboveH2").style.color = "Green";
        resetButtonPosition(); // Immediately move the button back to its original spot.
    }
}

// Add event listeners to input fields to trigger checkInputFields on every change.
// This is key to making the button stop escaping as soon as fields are filled, without a click.
usernameInput.addEventListener('input', checkInputFields);
passwordInput.addEventListener('input', checkInputFields);

// Event listener for the button click.
buttonElement.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default form submission.

    // Re-check input fields when the button is clicked.
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (username === "" || password === "") {
        // If fields are empty on click, focus on the username input.
        // shouldEscape will already be true from the 'input' event listener.
        document.querySelector("#aboveH2").innerHTML = "Input Fields have to be filled!";
        document.querySelector("#aboveH2").style.color = "Red";
        usernameInput.focus();
    } else {
        // If fields are filled on click, shouldEscape will already be false,
        // and the button will be in its original position.
        document.querySelector("#aboveH2").innerHTML = "Login successful!";
        document.querySelector("#aboveH2").style.color = "Green";
        // You can add your actual login logic here (e.g., submit form data).
    }
});

// Variable to store the previously chosen escape direction.
let oldChose = "";

// Event listener for when the mouse hovers over the button.
buttonElement.addEventListener('mouseover', function() {
    // The button will only escape if shouldEscape is true (i.e., input fields are empty).
    if (shouldEscape) {
        const directions = ["top", "right", "bottom", "left"];
        let selectedDirection;

        // Loop to ensure the new direction is different from the previous one.
        do {
            const randomInd = randomIndex();
            selectedDirection = directions[randomInd];
        } while (selectedDirection === oldChose);

        // Clear all previous inline style positions to prevent conflicts.
        this.style.top = '';
        this.style.right = '';
        this.style.bottom = '';
        this.style.left = '';
        this.style.transform = '';

        // Apply new position based on the selected direction.
        switch(selectedDirection) {
            case "top":
                this.style.bottom = `45px`;
                this.style.left = '50%'; // Keep horizontally centered
                this.style.transform = 'translateX(-50%)';
                break;
            case "right":
                this.style.left = `100px`;
                this.style.top = '50%'; // Keep vertically centered
                this.style.transform = 'translateY(-50%)';
                break;
            case "bottom":
                this.style.top = `45px`;
                this.style.left = '50%'; // Keep horizontally centered
                this.style.transform = 'translateX(-50%)';
                break;
            case "left":
                this.style.right = `100px`;
                this.style.top = '50%'; // Keep vertically centered
                this.style.transform = 'translateY(-50%)';
                break;
        }
        // Store the current direction for the next comparison.
        oldChose = selectedDirection;
    }
});