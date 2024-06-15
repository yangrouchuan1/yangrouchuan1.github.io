class ChoiceButton {
    constructor(img, x, y, text, callback, width, height) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text = text;
        this.callback = callback;
    }

    show() {
        image(this.img, this.x, this.y, this.width, this.height);
        fill(0);
        textSize(32);
        textAlign(CENTER, CENTER);
        text(this.text, this.x , this.y );
    }

    isClicked(mx, my) {
        return mx >= this.x && mx <= this.x + this.width && my >= this.y && my <= this.y + this.height;
        
    }
}
