var LiveForm = require("./LiveForm");
var random = require("./random.js");

module.exports = class Boom extends LiveForm {
    constructor(x, y) {
        super(x, y)
        this.energy = 5;
    }

    newDirections() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],

            [this.x - 2, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 2, this.y - 1],
            [this.x - 2, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 2, this.y + 2]
        ];
    }


    kill() {
        this.newDirections()
        for (var i in this.directions) {
            let x = this.directions[i][0]
            let y = this.directions[i][1]
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == 1) {
                    for (var i in grassArr) {
                        if (this.x == grassArr[i].x && this.y == grassArr[i].y) {
                            grassArr.splice(i, 1);
                        }
                    }
                }
                else if (matrix[y][x] == 2) {
                    for (var i in grassEaterArr) {
                        if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                            grassEaterArr.splice(i, 1);
                        }
                    }
                }
                else if (matrix[y][x] == 3) {
                    for (var i in predArr) {
                        if (this.x == predArr[i].x && this.y == predArr[i].y) {
                            predArr.splice(i, 1);
                        }
                    }
                }
                matrix[y][x] = 0;
            }
        }
        this.die()
        this.cnvel()
    }
    die() {
        //Հիմնական մատրիցում իր դիրքում դնում է դատարկություն
        // console.log(this.y, this.x)
        matrix[this.y][this.x] = 0;

        //!!! ԿԱՐԵՎՈՐ !!! ջնջում է ինքն իրեն խոտակերների զանգվածից
        for (var i in boomArr) {
            if (this.x == boomArr[i].x && this.y == boomArr[i].y) {
                boomArr.splice(i, 1);
            }
        }
    }
    cnvel() {
        let newX = Math.floor(random(matrix[0].length - 1))
        let newY = Math.floor(random(matrix.length - 1))
        matrix[newY][newX] = 4
        let boom = new Boom(newX, newY);
        boomArr.push(boom);
    }
}