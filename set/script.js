const hues = [0, 120, 240];  // Example hues: Red, Green, Blue
const saturations = [50, 75, 100];  // Different saturation levels
const lightnesses = [25, 50, 75];  // Different lightness levels
const deck = [];

// Create the deck of cards
for (const hue of hues) {
    for (const saturation of saturations) {
        for (const lightness of lightnesses) {
            deck.push({ hue, saturation, lightness });
        }
    }
}

// Shuffle the deck
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
shuffle(deck);

const gameBoard = document.getElementById('game-board');
const foundSetsContainer = document.getElementById('found-sets');
let selectedCards = [];
let cardsOnBoard = deck.slice(0, 12);
deck.splice(0, 12); // Remove the first 12 cards from the deck
let foundSets = [];
let foundIndex = -1;

// Render the cards on the board
function renderBoard() {
    gameBoard.innerHTML = '';
    
    for (let i = 0; i < cardsOnBoard.length; i++) {
        const card = cardsOnBoard[i];
        if (card) {
            const cardElement = document.createElement('div');
            cardElement.className = 'card';
            cardElement.dataset.index = i;
            cardElement.style.backgroundColor = `hsl(${card.hue}, ${card.saturation}%, ${card.lightness}%)`;
            cardElement.innerHTML = `H:${card.hue}<br>S:${card.saturation}<br>L:${card.lightness}`;
            cardElement.addEventListener('click', () => selectCard(cardElement));
            gameBoard.appendChild(cardElement);
        } else {
            const emptyElement = document.createElement('div');
            emptyElement.className = 'card1';
            gameBoard.appendChild(emptyElement);
        }
    }

    // Add event listener to cards in found sets
    foundSetsContainer.querySelectorAll('.found-set').forEach((cardElement, index) => {
        cardElement.addEventListener('click', () => {
            foundIndex = Math.floor(index/3)*3;
            drawThing(Math.floor(index/3)*3);
            console.log(index, Math.floor(index/3), Math.floor(index/3)*3);
            
            
        });
    });
    

}




function scrollToDrawThing() {
    const visualCanvas = document.getElementById('visualCanvas');
    visualCanvas.scrollIntoView({ behavior: 'smooth' });
}
// Function to select a set of squares
const colors = ['#FF5733', '#3498DB', '#F1C40F', '#fff'];

function drawThing(index) {
    console.log(index);
    const selectedSet = foundSets[index];
    const canvas = document.getElementById('visualCanvas');
    const ctx = canvas.getContext('2d');

    function hslToRgb(h, s, l) {
        s /= 100;
        l /= 100;
        const k = n => (n + h / 30) % 12;
        const a = s * Math.min(l, 1 - l);
        const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
        return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
    }

    function getColorString(color) {
        const { hue, saturation, lightness } = color;
        const [r, g, b] = hslToRgb(hue, saturation, lightness);
        return `rgb(${r}, ${g}, ${b})`;
    }

    function drawComposition(x, y, w, h, colors) {
        let count = 0;
        if (w < 20 || h < 20) {
            return;
        }

        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        ctx.fillStyle = randomColor;
        ctx.fillRect(x, y, w, h);

        const splitChance = Math.random();


        if (splitChance < 0.8) {
            count = count + 1;
            if (w > h) {
                const split = Math.random() * (0.6 - 0.4) + 0.4;
                drawComposition(x, y, w * split, h, colors);
                drawComposition(x + w * split, y, w * (1 - split), h, colors);
            } else {
                const split = Math.random() * (0.6 - 0.4) + 0.4;
                drawComposition(x, y, w, h * split, colors);
                drawComposition(x, y + h * split, w, h * (1 - split), colors);
            }
        }
    }

    const colorStrings = selectedSet.map(getColorString);
    colorStrings.push('rgb(255, 255, 255)'); // Adding white color

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // drawVisuals();
    drawComposition(0, 0, canvas.width, canvas.height, colorStrings);
    scrollToDrawThing();
}

function hslToRgb(h, s, l) {
    s /= 100;
    l /= 100;
    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
}

// Select card logic
function selectCard(cardElement) {
    const index = cardElement.dataset.index;
    if (selectedCards.includes(index)) {
        selectedCards = selectedCards.filter(i => i !== index);
        cardElement.classList.remove('selected');
    } else {
        if (selectedCards.length < 3) {
            selectedCards.push(index);
            cardElement.classList.add('selected');
        }
    }
}

// Check if selected cards form a set
function isSet(card1, card2, card3) {
    const sameOrDifferent = (attr1, attr2, attr3) => {

        return (attr1 === attr2 && attr2 === attr3) || (attr1 !== attr2 && attr1 !== attr3 && attr2 !== attr3);
    };

    const hueCheck = sameOrDifferent(card1.hue, card2.hue, card3.hue);
    const saturationCheck = sameOrDifferent(card1.saturation, card2.saturation, card3.saturation);
    const lightnessCheck = sameOrDifferent(card1.lightness, card2.lightness, card3.lightness);

    return hueCheck && saturationCheck && lightnessCheck;
}

// Count sets in the current board
function countSets() {
    let setCount = 0;
    for (let i = 0; i < 10; i++) {
        for (let j = i + 1; j < 11; j++) {
            for (let k = j + 1; k < 12; k++) {
                const card1 = cardsOnBoard[i];
                const card2 = cardsOnBoard[j];
                const card3 = cardsOnBoard[k];
                if (card1 && card2 && card3 && isSet(card1, card2, card3)) {
                    
                    setCount++;
                }
            }
        }
    }
    return setCount;
}

// Update found sets display
function updateFoundSetsDisplay(foundSets) {
    foundSetsContainer.innerHTML = '<h2>Found sets</h2>';
    foundSets.forEach((set, index) => {
        set.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.className = 'found-set';
            cardElement.style.backgroundColor = `hsl(${card.hue}, ${card.saturation}%, ${card.lightness}%)`;
            cardElement.addEventListener('click', () => drawThing(index)); // Add click event to highlight found sets
            foundSetsContainer.appendChild(cardElement);
        });
    });
}

// Animate and replace cards if a set is found
function animateAndReplaceSet() {
    selectedCards.forEach(index => {
        const cardElement = gameBoard.children[index];
        cardElement.classList.add('minimized');
        const set = selectedCards.map(index => cardsOnBoard[index]);
        foundSets.push(set);
        updateFoundSetsDisplay(foundSets);
        if (deck.length > 0) {
            const newCard = deck.shift();
            cardsOnBoard[index] = newCard;
        } else {
            cardsOnBoard[index] = null;
        }
        selectedCards = [];
    });

    setTimeout(() => {
        renderBoard();
    }, 500);
}

document.getElementById('check-set').addEventListener('click', () => {
    if (selectedCards.length === 3) {
        const [card1, card2, card3] = selectedCards.map(index => cardsOnBoard[index]);
        // alert('Set found!');
        //     animateAndReplaceSet();
        //     document.querySelectorAll('.selected').forEach(el => el.classList.remove('selected'));
        //     selectedCards = [];
        if (isSet(card1, card2, card3)) {
            alert('Set found!');
            animateAndReplaceSet();
            document.querySelectorAll('.selected').forEach(el => el.classList.remove('selected'));
            selectedCards = [];
        } else {
            alert('Not a set.');
        }
    } else {
        alert('Select exactly 3 cards.');
    }
});

document.getElementById('hint').addEventListener('click', () => {
    const setCount = countSets();
    document.getElementById('hint-output').textContent = `Number of sets: ${setCount}`;
});

document.getElementById('reload').addEventListener('click', () => {
    if (foundIndex != -1) {
        drawThing(foundIndex);
    }
});


renderBoard();





/////////////////////////////////////////////////////////////////


// // const hues = [0, 120, 240];  // Example hues: Red, Green, Blue
// const saturations = [50, 75, 100];  // Different saturation levels
// const lightnesses = [25, 50, 75];  // Different lightness levels
// const deck = [];

// // Create the deck of cards
// for (const hue of hues) {
//     for (const saturation of saturations) {
//         for (const lightness of lightnesses) {
//             deck.push({ hue, saturation, lightness });
//         }
//     }
// }

// // Shuffle the deck
// function shuffle(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [array[i], array[j]] = [array[j], array[i]];
//     }
// }
// shuffle(deck);

// const gameBoard = document.getElementById('game-board');
// const foundSetsContainer = document.getElementById('found-sets');
// let selectedCards = [];
// let cardsOnBoard = deck.slice(0, 12);
// deck.splice(0, 12); // Remove the first 12 cards from the deck
// let foundSets = [];

// // Render the cards on the board
// function renderBoard() {
//     gameBoard.innerHTML = '';
//     for (let i = 0; i < cardsOnBoard.length; i++) {
//         const card = cardsOnBoard[i];
//         if (card) {
//             const cardElement = document.createElement('div');
//             cardElement.className = 'card';
//             cardElement.dataset.index = i;
//             cardElement.style.backgroundColor = `hsl(${card.hue}, ${card.saturation}%, ${card.lightness}%)`;
//             cardElement.innerHTML = `H:${card.hue}<br>S:${card.saturation}<br>L:${card.lightness}`;
//             cardElement.addEventListener('click', () => selectCard(cardElement));
//             gameBoard.appendChild(cardElement);
//         } else {
//             const emptyElement = document.createElement('div');
//             emptyElement.className = 'card1';
//             gameBoard.appendChild(emptyElement);
//         }
//     }
// }

// // Select card logic
// function selectCard(cardElement) {
//     const index = cardElement.dataset.index;
//     if (selectedCards.includes(index)) {
//         selectedCards = selectedCards.filter(i => i !== index);
//         cardElement.classList.remove('selected');
//     } else {
//         if (selectedCards.length < 3) {
//             selectedCards.push(index);
//             cardElement.classList.add('selected');
//         }
//     }
// }

// // Check if selected cards form a set
// function isSet(card1, card2, card3) {
//     const sameOrDifferent = (attr1, attr2, attr3) => {
//         return (attr1 === attr2 && attr2 === attr3) || (attr1 !== attr2 && attr1 !== attr3 && attr2 !== attr3);
//     };

//     const hueCheck = sameOrDifferent(card1.hue, card2.hue, card3.hue);
//     const saturationCheck = sameOrDifferent(card1.saturation, card2.saturation, card3.saturation);
//     const lightnessCheck = sameOrDifferent(card1.lightness, card2.lightness, card3.lightness);

//     return hueCheck && saturationCheck && lightnessCheck;
// }

// // Count sets in the current board
// function countSets() {
//     let setCount = 0;
//     for (let i = 0; i < 10; i++) {
//         for (let j = i + 1; j < 11; j++) {
//             for (let k = j + 1; k < 12; k++) {
//                 const card1 = cardsOnBoard[i];
//                 const card2 = cardsOnBoard[j];
//                 const card3 = cardsOnBoard[k];
//                 if (card1 && card2 && card3 && isSet(card1, card2, card3)) {
//                     setCount++;
                    
//                     console.log(card1, card2, card3);
//                 }
//             }
//         }
//     }
//     return setCount;
// }

// // Update found sets display
// function updateFoundSetsDisplay(foundSets) {
//     foundSetsContainer.innerHTML = '<h2>Minimized Cards</h2>';
//     foundSets.forEach(set => {
//         set.forEach(card => {
//             const cardElement = document.createElement('div');
//             cardElement.className = 'found-set';
//             cardElement.style.backgroundColor = `hsl(${card.hue}, ${card.saturation}%, ${card.lightness}%)`;
//             foundSetsContainer.appendChild(cardElement);
//         });
//     });
// }

// // Animate and replace cards if a set is found
// function animateAndReplaceSet() {
//     selectedCards.forEach(index => {
//         const cardElement = gameBoard.children[index];
//         cardElement.classList.add('minimized');
//         const set = selectedCards.map(index => cardsOnBoard[index]);
//         foundSets.push(set);
//         // console.log(foundSets);
//         updateFoundSetsDisplay(foundSets);
//         if (deck.length > 0) {
//             const newCard = deck.shift();
//             cardsOnBoard[index] = newCard;
//         } else {
//             cardsOnBoard[index] = null; // If no more cards in the deck, set to null
//         }
//         selectedCards = [];
//     });

//     setTimeout(() => {
        
//         renderBoard(); // Re-render the board to update with new cards
        
//     }, 500);
// }

// document.getElementById('check-set').addEventListener('click', () => {
//     if (selectedCards.length === 3) {
//         const [card1, card2, card3] = selectedCards.map(index => cardsOnBoard[index]);
//         if (isSet(card1, card2, card3)) {
//             alert('Set found!');
//             animateAndReplaceSet();
//         } else {
//             alert('Not a set.');
//         }

//         document.querySelectorAll('.selected').forEach(el => el.classList.remove('selected'));
//         selectedCards = [];
//     } else {
//         alert('Select exactly 3 cards.');
//     }
// });

// document.getElementById('hint').addEventListener('click', () => {
//     const setCount = countSets();
//     document.getElementById('hint-output').textContent = `Number of sets: ${setCount}`;
// });

// renderBoard();