const textElement = document.getElementById('dialogue'); // Dialogue box
const optionButtonsElement = document.getElementById('options'); // Buttons
const inventoryElement = document.getElementById('inventory'); // Inventory
const imageElement = document.getElementById('locationImage');
const profession = getProfession();


// This variable stores the current game state

let state = {};

let inventory = {};

// This function is called to start the game. The state is emptied and the first text node is shown.

function startGame(){
    if (profession === 'Mechanic') {
        state = {Mechanic:true}
    }
    else if (profession === 'Medic') {
        state = {Medic:true};
    }
    else if (profession === 'Hunter') {
        state = {Hunter:true};
    }
    else if (profession === 'War Veteran') {
        state = {WarVeteran:true}
    }
    else if (profession === 'Priest') {
        state = {Priest:true}
    }
    else {
        state = {};
    }
    inventory = {};
    showTextNode(1);
}

// This function displays the current text node in the dialogue box. The index of the text node is required as a parameter.

function showTextNode(textNodeIndex){
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex); // Finds the text node by comparing to parameter input.
    textElement.innerHTML = textNode.text; // Changes the dialogue box to text stored in the text node.
    inventoryElement.innerHTML = textNode.inventory;
    imageElement.src = textNode.image;
    while(optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild);
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button'); // Creates a button.
            button.innerText = option.text; // Button text is changed to the option text.
            button.classList.add('buttonChoice'); // Sets the button class for styling.
            button.addEventListener('click', () => selectOption(option)); // Adds event listener
            optionButtonsElement.appendChild(button); 
        }
    })
}

// This function shows the current option selected

function showOption(option) {
    return option.requiredState == null || option.requiredState(state);
}


function selectOption(option) {
    const nextTextNodeId = option.nextText;
    if (nextTextNodeId <= 0) { // If the text node id is < 0, the game is restarted
        return startGame();
    }
    state = Object.assign(state, option.setState);
    inventory = Object.assign(inventory, option.setInventory);
    showTextNode(nextTextNodeId);

}

var getInventory = function(obj) {
    var inventory = [];
    for (var item in obj){
        if (obj.hasOwnProperty(item)) {
            inventory.push(item);
        }
    }
    return inventory;
}

// The text nodes for the game are below

const textNodes = [
    {
        id: 1,
        text: 'You find what appears to be an empty gas station. However, the building is surrounded by fences, which creates suspicion that someone may be inside...',
        inventory: getInventory(inventory),
        image: 'assets/images/Hospital_Inside.jpg',
        options: [
            {
                text: 'Cut the fence',
                setState: {fence:true},
                nextText: 2
            },
            {
                text: 'Hop the fence',
                setState: {fence:true},
                nextText: 2
            }
        ]
    },
    {
        id: 2,
        text: 'You have got past the fence. You hear a loud bang come from inside the gas station. You also notice a car parked in the garage...',
        inventory: getInventory(inventory),
        image: 'assets/images/gasstation.jpg',
        options: [
            {
                text:'Go inside',
                nextText: 4
            },
            {
                text:'Steal the car',
                nextText: 3
            }
        ]
    },
    {
        id: 3,
        text: 'You approach the car, however, it appears to be locked. You need to find a key.',
        inventory: getInventory(inventory),
        options: [
            {
                text:'Look in the drawers',
                setInventory: {Keys:true,
                Handgun: true},
                nextText: 5,
            },
            {
                text: 'Look on the work bench',
                nextText: 6
            },
            {
                text: 'Go inside the gas station',
                setState: {inside: true,
                keys: true},
                nextText: 7
            }
        ]
    },
    {
        id: 4,
        text: 'Entering in the side door has alerted the people camping inside and you were shot and killed.',
        inventory: getInventory(inventory),
        options: [
            {
                text:'Restart the game.',
                nextText: -1
            }
        ]
    },
    {
        id: 5,
        text: 'You have found the keys! You start the car and discover the car wont start...',
        inventory: getInventory(inventory),
        options: [
            {
                text:'Go inside',
                nextText: 8
            },
            {
                text: 'Try fix the car',
                requiredInventory: (currentInventory) => currentInventory.keys,
                nextText: 9
            }
        ]
    }
]

startGame(); // Function call to start the game