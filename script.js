
//! Setup function fires automatically
function setup() {

    var socket = io();
    var side = 30;
    var matrix = [];
    
    //! Getting DOM objects (HTML elements)

    let grassCountElement = document.getElementById('grassCount');
    let grassEaterCountElement = document.getElementById('grassEaterCount');
    let predEaterCountElement = document.getElementById('predCount');
    
    //! adding socket listener on "data" <-- name, after that fire 'drawCreatures' function 

    socket.on("data", drawCreatures);
    function drawCreatures(data) {
        //! after getting data pass it to matrix variable
        matrix = data.matrix;
        grassCountElement.innerText = data.grassCounter;
        grassEaterCountElement.innerText = data.eaterCounter;
        predEaterCountElement.innerText = data.predCounter;
        // console.log(data.predCounter);
        //! Every time it creates new Canvas woth new matrix size
        createCanvas(matrix[0].length * side, matrix.length * side)
        //! clearing background by setting it to new grey color
        background('#acacac');
        //! Draw grassCount and grassEaterCount to HTML (use DOM objects to update information, yes, and use .innerText <- function)
        // console.log(matrix)
        //! Drawing and coloring RECTs
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == 1) {
                    fill("green");
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 2) {
                    fill("orange");
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 0) {
                    fill('#acacac');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 3) {
                    fill('red');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 4) {
                    fill('black');
                    rect(j * side, i * side, side, side);
                } else if (matrix[i][j] == 5) {
                    fill('yellow');
                    rect(j * side, i * side, side, side);
                }

                if(data.weather == 1){
                    console.log("garun")
                    document.body.style.backgroundColor = "green";
                    if (matrix[i][j] == 1) {
                        fill("#66ff66");
                        rect(j * side, i * side, side, side);
                    }
                }
                if(data.weather == 2){
                    console.log("amar")
                    document.body.style.backgroundColor = "yellow";
                    if (matrix[i][j] == 1) {
                        fill("#ffbf80");
                        rect(j * side, i * side, side, side);
                    }
                }
                if(data.weather == 3){
                    console.log("ashun")
                    document.body.style.backgroundColor = "cccc00";
                    if (matrix[i][j] == 1) {
                        fill("green");
                        rect(j * side, i * side, side, side);
                    }
                }
                if(data.weather == 4){
                    console.log("dzmer")
                    document.body.style.backgroundColor = "00cccc";
                    if (matrix[i][j] == 1) {
                        fill("#757557");
                        rect(j * side, i * side, side, side);
                    }
                    else if (matrix[i][j] == 3) {
                        fill('#0000cc');
                        rect(j * side, i * side, side, side);
                    }
                }

            }
        }
    }
}