import { Player } from "./Player";
import { Field } from "./Field";
/**
 * Created by frederik on 1/22/2017.
 */

class Game {

    private _players: Player[];
    private _fields: Field[];
    private _numberOfPlayers: number = 2;
    private _gameOver: boolean = false;
    private _winner: Player;

    constructor(columns: number, rows: number) {
        this._players = [];
        this._fields = [];
        this.addPlayers(this._numberOfPlayers);
        this.setUpGrid(columns, rows);
    }

    addPlayers(amount: number) {
        for (let i = 0; i < amount; i++) {
            let p = new Player(i + 1);
            this._players.push(p);
        }
    }

    createField(position: number) {
        let field = new Field(position);
        field.value = 1;
        this._fields.push(field);
    }

    setUpGrid(columns: number, rows: number) {
        let position = 0;
        for (let c = 0; c < columns; c++) {
            for (let r = 0; r < rows; r++) {
                this.createField(position);
                position++;
            }
        }
    }

    getPlayer(byNumber: number) {
        for (var i = 0; i < this._players.length; i++) {
            var player = this._players[i];
            if (player.position === byNumber) {
                return player;
            }
        }
        console.log("ERROR: Couldn't find player");
        return null;
    }

    getField(fieldNumber: number) {
        for (let i = 0; i < this._fields.length; i++) {
            let field = this._fields[i];
            if (field.position === fieldNumber) {
                console.log("getting field with value: " + field.value);
                return field;
            }
        }
        console.log("ERROR: Couldn't find field");
        return null;
    }

    turn(playerNumber: number, fieldNumber: number) {
        var player = this.getPlayer(playerNumber);
        var field = this.getField(fieldNumber);
        this.takeTurn(player, field);
        this.checkForWin(player);
    }

    private takeTurn(player: Player, field: Field) {
        player.ticField(field);
        this.nextPlayerHasTurn(player);
    }

    private nextPlayerHasTurn(currentPlayer: Player) {
        currentPlayer.hasTurn = false;
        let indexOfCurrentPlayer = this._players.indexOf(currentPlayer);
        let indexOfNextPlayer = indexOfCurrentPlayer + 1;
        if (indexOfNextPlayer + 1 >= this._players.length) {
            indexOfNextPlayer = 0;
        }
        this._players[indexOfNextPlayer].hasTurn = true;
    }
    private checkForWin(player: Player) {
        let value = player.fieldValue;
        if (this.checkHorizontalWin(value) || this.checkVerticalWin(value) || this.checkDiagonalWin(value)) {
            this._winner = player;
            this._gameOver = true;
        }
    }

    private checkHorizontalWin(value: number) {
        let count = 0;
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < this._fields.length; col += 3) {
                let field = row + col;
                if (this._fields[field].value === value) {
                    count++;
                }
            }
            if (count < 3) {
                count = 0;
            }
        }
        return count === 3;
    }

    private checkVerticalWin(value: number) {
        let count = 0;
        for (let col = 0; col < this._fields.length; col += 3) {
            for (let row = 0; row < 3; row += 1) {
                let field = col + row;
                if (this._fields[field].value === value) {
                    count++;
                }
            }
            if (count < 3) {
                count = 0;
            }
        }
        return count === 3;
    }

    private checkDiagonalWin(value: number) {
        let count = 0;
        //from top left to bottom right
        for (let field = 0; field < 9; field += 4) {
            if (this._fields[field].value === value) {
                count++;
            }
        }

        if (count < 3) {
            count = 0;
        }
        //from bottom left to top right
        for (let field = 2; field < 7; field += 2) {
            if (this._fields[field].value === value) {
                count++;
            }
        }
        return count >= 3;
    }

    get players(): Player[] {
        return this._players;
    }
    set players(value: Player[]) {
        this._players = value;
    }

    get fields(): Field[] {
        return this._fields;
    }
    set fields(value: Field[]) {
        this._fields = value;
    }
    get gameOver(): boolean {
        return this._gameOver;
    }
    get winner(): Player {
        return this._winner;
    }

}
export { Game };