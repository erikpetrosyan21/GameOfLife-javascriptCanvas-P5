var LiveForm = require("./LiveForm");
var random = require("./random.js");

module.exports = class Pred extends LiveForm {
    constructor(x, y) {
        super(x, y)
        this.energy = 5;
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }

    movePred() {

        var emptyCells = this.chooseCell(0);
        this.energy--;
        if (emptyCells.length != 0) {

            var randomCells = random(emptyCells);
            var x = randomCells[0];
            var y = randomCells[1];



            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
        }
        this.diePred();

    }
    eatPred() {
        var emptyCells = this.chooseCell(2);
        if (emptyCells.length != 0) {

            var randomCells = random(emptyCells);
            var x = randomCells[0];
            var y = randomCells[1];

            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;

            for (var i in grassEaterArr) {
                this.energy++;
                if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                    break;
                }
            }
            this.multPred();
        }
        else this.movePred();

    }
    diePred() {


        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;

            for (var i in predArr) {
                if (this.x == predArr[i].x && this.y == predArr[i].y) {
                    predArr.splice(i, 1);
                    break;
                }
            }


        }
    }
    multPred() {
        if (this.energy >= 8) {
            predhashiv++;
            var emptyCells = this.chooseCell(0);
            if (emptyCells.length != 0) {

                var randomCells = random(emptyCells);
                var x = randomCells[0];
                var y = randomCells[1];

                var newPred = new Pred(x, y);
                predArr.push(newPred);

                matrix[y][x] = 3;
                this.energy = 5;
            }
        }

    }
}