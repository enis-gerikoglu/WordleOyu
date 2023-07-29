
var height = 6; //number of guesses
var width =7; //length of the word

var row = 0; //current guess (attempt #)
var col = 0; //current letter for that attempt

var gameOver = false;
// var word = "SQUID";
var wordList = ["FAİZSİZ",]

var guessList = ["FAİZSİZ"]

guessList = guessList.concat(wordList);

wordList = wordList.map(word => word.toLocaleUpperCase('tr'));

var word = wordList[Math.floor(Math.random()*wordList.length)].toLocaleUpperCase('tr');
console.log(word);

window.onload = function(){
    intialize();
}


function intialize() {

    // Create the game board
    for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
            // <span id="0-0" class="tile">P</span>
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.innerText = "";
            document.getElementById("board").appendChild(tile);
            tile.className="tile";
        }
    }

    // Create the key board
    let keyboard = [
        ["Q", "W", "E", "R", "T", "Y", "U", "I", "O",  "P" , "Ğ", "Ü"],
        ["A", "S", "D", "F", "G", "H", "J", "K", "L", "Ş","İ" , " "],
        ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Ö","Ç" , "⌫" ]
    ]

    for (let i = 0; i < keyboard.length; i++) {
        let currRow = keyboard[i];
        let keyboardRow = document.createElement("div");
        keyboardRow.classList.add("keyboard-row");

        for (let j = 0; j < currRow.length; j++) {
            let keyTile = document.createElement("div");

            let key = currRow[j];
            keyTile.innerText = key;
            if (key == "Enter") {
                keyTile.id = "Enter";
            }
            else if (key == "⌫") {
                keyTile.id = "Backspace";
            }
            else if (key == "İ") {
                keyTile.id = "Keyİ";
            }
            else if (/^[A-ZÇĞİÖŞÜ]$/.test(key)) {
                keyTile.id = "Key" + key; // "Key" + "A";
            }
         keyTile.addEventListener("click", processKey);

            if (key == "Enter") {
                keyTile.classList.add("enter-key-tile");
            } else {
                keyTile.classList.add("key-tile");
            }
            keyboardRow.appendChild(keyTile);
        }
        document.body.appendChild(keyboardRow);
    }
    

    // Listen for Key Press
    document.addEventListener("keyup", (e) => {
        let currTile = document.getElementById(row.toString() + '-' + col.toString());
        processInput(e);
        
    })
}

function processKey() 
{ 
    
    e = { "code" : this.id };   
    
    processInput(e);
}

function processInput(e) {
    
    if (gameOver) return; 
    
    let character = e.key ? e.key.toUpperCase() : e.code;
   


    if (e.key) {
        character = e.key;
        // Convert "i" to "İ" manually
        if (character === "i") {
            character = "İ";
        }
    } else {
        character = e.code;
        // Convert "KeyI" to "Keyİ" manually
        if (character === "KeyI") {
            character = "Keyİ";
        }
    }
    
   

    // Check for Turkish characters and convert to uppercase
    if (character === "Ç" || character === "KeyÇ") {
        character = "Ç";
    } else if (character === "Ğ" || character === "KeyĞ") {
        character = "Ğ";
    } else if (character === "İ" || character === "Keyİ") {
        character = "İ";
    } 
     else if (character === "Ö" || character === "KeyÖ") {
        character = "Ö";
    } else if (character === "Ş" || character === "KeyŞ") {
        character = "Ş";
    } else if (character === "Ü" || character === "KeyÜ") {
        character = "Ü";
    }
    
     

    // Rest of the function remains unchanged
    if (/^[A-ZÇĞİÖŞÜ]$/.test(character)) {
        if (col < width) {
            let currTile = document.getElementById(row.toString() + '-' + col.toString());
            if (currTile.innerText == "") {
                currTile.innerText = character;
                col += 1;
            }
        }
    }
    else if("KeyA" <= e.code && e.code <= "KeyZ"){
        if (col < width) {
            let currTile = document.getElementById(row.toString() + '-' + col.toString());
            if (currTile.innerText == "") {
                currTile.innerText = e.code[3];
                col += 1;
            }
        }

    }
    else if (e.code == "Backspace") {
        if (0 < col && col <= width) {
        col -=1;
        }
        
        let currTile = document.getElementById(row.toString() + '-' + col.toString());
        currTile.innerText = "";
    }

    else if (e.code == "Enter") {
        update();
    }

    if (!gameOver && row == height) {
        gameOver = true;
        document.getElementById("answer").innerText = word;
    }
}

function update() {
    let guess = "";
    document.getElementById("answer").innerText = "";

    //string up the guesses into the word
    for (let c = 0; c < width; c++) {
        let currTile = document.getElementById(row.toString() + '-' + c.toString());
        let letter = currTile.innerText;
        guess += letter;
    }
    
    guess = guess.toUpperCase(); //case sensitive
    console.log(guess);

    if (!guessList.includes(guess)) {
        document.getElementById("answer").innerText = "Not in word list";
        return;
    }
    
    //start processing guess
    let correct = 0;

    let letterCount = {}; //keep track of letter frequency, ex) KENNY -> {K:1, E:1, N:2, Y: 1}
    for (let i = 0; i < word.length; i++) {
        let letter = word[i];

        if (letterCount[letter]) {
           letterCount[letter] += 1;
        } 
        else {
           letterCount[letter] = 1;
        }
    }

    console.log(letterCount);

    //first iteration, check all the correct ones first
    for (let c = 0; c < width; c++) {
        let currTile = document.getElementById(row.toString() + '-' + c.toString());
        let letter = currTile.innerText;

        //Is it in the correct position?
        if (word[c] == letter) {
            

            currTile.classList.add("correct");

            let keyTile = document.getElementById("Key" + letter);
            keyTile.classList.remove("present");
            keyTile.classList.add("correct");

            correct += 1;
            letterCount[letter] -= 1; //deduct the letter count
        }

        if (correct == width) {
            gameOver = true;
        }
    }

    console.log(letterCount);
    //go again and mark which ones are present but in wrong position
    for (let c = 0; c < width; c++) {
        let currTile = document.getElementById(row.toString() + '-' + c.toString());
        let letter = currTile.innerText;

        // skip the letter if it has been marked correct
        if (!currTile.classList.contains("correct")) {
            //Is it in the word?         //make sure we don't double count
            if (word.includes(letter) && letterCount[letter] > 0) {
                currTile.classList.add("present");
                
                let keyTile = document.getElementById("Key" + letter);
                if (!keyTile.classList.contains("correct")) {
                    keyTile.classList.add("present");
                }
                letterCount[letter] -= 1;
            } // Not in the word or (was in word but letters all used up to avoid overcount)
            else {
                currTile.classList.add("absent");
                let keyTile = document.getElementById("Key" + letter);
                keyTile.classList.add("absent")
            }
        }
    }

    row += 1; //start new row
    col = 0; //start at 0 for new row
}