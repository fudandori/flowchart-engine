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
    get x1() {
        return this._x1;
    }

    setX1(value) {
        this._x1 = value;
        return this;
    }

    set x1(value) {
        this.x1(value);
    }

    get x2() {
        return this._x2;
    }

    setX2(value) {
        this._x2 = value;
        return this;
    }

    set x2(value) {
        this.setX2(value);
    }

    get y1() {
        return this._y1;
    }

    setY1(value) {
        this._y1 = value;
        return this;
    }

    set y1(value) {
        this.setY1(value);
    }

    get y2() {
        return this._y2;
    }

    setY2(value) {
        this._y2 = value;
        return this;
    }

    set y2(value) {
        this.setY2(value);
    }

    setOrigin(value) {
        this._x1 = value.x
        this._y1 = value.y
        return this
    }

    setEnd(value) {
        this._x2 = value.x
        this._y2 = value.y
        return this
    }
}
