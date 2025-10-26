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
        return new Point(this._x + value, this._y)
    }

    offsetY(value) {
        return new Point(this._x, this._y + value)
    }

    transpose() {
        return new Point(this._y, this._x)
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

class Box {

    constructor(id, { x, y }) {
        this._center = new Point(x, y)
        this._id = id

        const el = document.getElementById(id)
        const frame = el.getBoundingClientRect()

        this._top = new Point(this._center.x, frame.top)
        this._bottom = new Point(this._center.x, frame.bottom)
        this._left = new Point(frame.left, this._center.y)
        this._right = new Point(frame.right, this._center.y)
        this._topDelta = this._top.offsetY(-5)
        this._bottomDelta = this._bottom.offsetY(5)
        this._leftDelta = this._left.offsetX(-5)
        this._rightDelta = this._right.offsetX(5)

        if (el.hasAttribute('if')) {
            this._topDelta.y -= 30
            this._bottomDelta.y += 30
            this._leftDelta.x -= 40
            this._rightDelta.x += 40
        } else if (el.hasAttribute('db') || el.hasAttribute('api')) {
            this._rightDelta.x += 40
        } else if (el.hasAttribute('kafka')) {
            this._rightDelta.x += 30
        }
    }

    get center() {
        return this._center;
    }

    get top() {
        return this._top;
    }

    get bottom() {
        return this._bottom;
    }


    get left() {
        return this._left;
    }

    get right() {
        return this._right;
    }

    get topDelta() {
        return this._topDelta;
    }

    get bottomDelta() {
        return this._bottomDelta;
    }

    get leftDelta() {
        return this._leftDelta;
    }

    get rightDelta() {
        return this._rightDelta;
    }

    isAbove(box) {
        const diff = this._center.y - box.center.y

        return Math.abs(diff) > 10 && diff < 0
    }
}   