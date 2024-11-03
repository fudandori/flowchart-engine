class Point {
    constructor(x, y) {
        this._x = x
        this._y = y
    }

    get x() {
        return this._x;
    }

    setX(value) {
        this._x = value;
        return this;
    }

    set x(value) {
        this.setX(value);
    }

    get y() {
        return this._y;
    }

    setY(value) {
        this._y = value;
        return this;
    }

    set y(value) {
        this.setY(value);
    }

    offsetX(value) {
        this._x += value
        return this
    }

    offsetY(value) {
        this._y += value
        return this
    }
}

class Vector {

    constructor(p1, p2) {
        this._p1 = p1
        this._p2 = p2
    }

    get p1() {
        return this._p1;
    }

    setP1(value) {
        this._p1 = value;
        return this;
    }

    set p1(value) {
        this.setP1(value);
    }

    get p2() {
        return this._p2;
    }

    setP2(value) {
        this._p2 = value;
        return this;
    }

    set p2(value) {
        this.setP2(value);
    }
    
    setOrigin(value) {
        this._p1 = value
        return this
    }

    setEnd(value) {
        this._p2 = value
        return this
    }
}
