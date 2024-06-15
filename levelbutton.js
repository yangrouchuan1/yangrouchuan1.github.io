class LevelButton {
    constructor(img, x, y, level) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.level = level;
        this.width = 100; // 按钮宽度
        this.height = 100; // 按钮高度
    }

    show() {
        image(this.img, this.x, this.y, this.width, this.height);
        fill(255);
        textSize(32);
        textAlign(CENTER, CENTER);
        text(this.level, this.x, this.y);
    }

    clicked() {
        //return mouseX > this.x - this.width / 2 && mouseX < this.x + this.width / 2 &&
              // mouseY > this.y - this.height / 2 && mouseY < this.y + this.height / 2;
        
        let d = dist(mouseX, mouseY, this.x, this.y); // 计算鼠标点击位置与按钮的距离
        
        return d < this.width / 2;
    }
}