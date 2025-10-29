class Point {

    #x
    #y

    constructor(x, y) {
        this.#x = x
        this.#y = y
    }

    get x() {
        return this.#x;
    }

    setX(value) {
        this.#x = value;
        return this;
    }

    set x(value) {
        this.setX(value);
    }

    get y() {
        return this.#y;
    }

    setY(value) {
        this.#y = value;
        return this;
    }

    set y(value) {
        this.setY(value);
    }

    offsetX(value) {
        return new Point(this.#x + value, this.#y)
    }

    offsetY(value) {
        return new Point(this.#x, this.#y + value)
    }

    transpose() {
        return new Point(this.#y, this.#x)
    }
}

class Vector {

    #p1
    #p2

    constructor(p1, p2) {
        this.#p1 = p1
        this.#p2 = p2
    }

    get p1() {
        return this.#p1;
    }

    setP1(value) {
        this.#p1 = value;
        return this;
    }

    set p1(value) {
        this.setP1(value);
    }

    get p2() {
        return this.#p2;
    }

    setP2(value) {
        this.#p2 = value;
        return this;
    }

    set p2(value) {
        this.setP2(value);
    }

    setOrigin(value) {
        this.#p1 = value
        return this
    }

    setEnd(value) {
        this.#p2 = value
        return this
    }
}

class Box {

    #id
    #center
    #top
    #bottom
    #left
    #right
    #topDelta
    #bottomDelta
    #leftDelta
    #rightDelta

    constructor(id) {
        this.#id = id

        const el = document.getElementById(id)
        const frame = el.getBoundingClientRect()

        this.#center = new Point(frame.right - el.offsetWidth / 2, frame.bottom - el.offsetHeight / 2)
        this.#top = new Point(this.#center.x, frame.top).offsetY(-5)
        this.#bottom = new Point(this.#center.x, frame.bottom).offsetY(5)
        this.#left = new Point(frame.left, this.#center.y).offsetX(-5)
        this.#right = new Point(frame.right, this.#center.y).offsetX(5)

        if (el.hasAttribute('if')) {
            this.#top.y -= 30
            this.#bottom.y += 30
            this.#left.x -= 40
            this.#right.x += 40
        } else if (el.hasAttribute('db') || el.hasAttribute('api')) {
            this.#right.x += 40
        } else if (el.hasAttribute('kafka')) {
            this.#right.x += 30
        }
    }

    get center() {
        return this.#center;
    }

    get top() {
        return this.#top;
    }

    get bottom() {
        return this.#bottom;
    }

    get left() {
        return this.#left;
    }

    get right() {
        return this.#right;
    }

    isVertAlignedWith(box) {
        return Math.abs(this.#center.y - box.center.y) < 10
    }

    isHorizAlignedWith(box) {
        return Math.abs(this.#center.x - box.center.x) < 10
    }

    isAbove(box) {
        return this.#center.y - box.center.y < 0
    }

    isBefore(box) {
        return this.#center.x - box.center.x < 0
    }

    getLvectors(target, port) {
        let vertex, targetPort

        switch (port) {
            case 'top':
            case 'bottom':
                targetPort = this.isBefore(target) ? target.left : target.right
                vertex = new Point(this[port].x, targetPort.y)
                break
            case 'left':
            case 'right':
                targetPort = this.isAbove(target) ? target.top : target.bottom
                vertex = new Point(targetPort.x, this[port].y)
                break
        }

        const v1 = new Vector(this[port], vertex)
        const v2 = new Vector(vertex, targetPort)

        return [v1, v2]
    }
}   
