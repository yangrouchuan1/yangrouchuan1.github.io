let bgImg;
let materials = [];
let burger = [];
let ingredients = [];
let button;
let gameState = "title";
let start0Img;
let start1Img;
let bgRestaurantImg;

let requiredBurgers = [];// 要求汉堡的数组
let currentBurgerIndex = 0;// 当前正在制作的“要求汉堡”的索引
let score = 0;

let xuanguanButtonImg; // 新增选关按钮图片变量
let levelButtons = []; // 用于存储关卡按钮
let currentLevel = 0; // 当前关卡编号


let dialogueIndex = 0; // 当前对话文本的索引
let dialogues = []; // 存储对话文本的数组
let moneyEarned = 0; // 当前关卡赚取的金钱

let monthlyRent = 10; // 每天的租金

let yidianmingtiFont;//添加字体
let dianzhenheiFont;

let choiceButtons = [];//选择按钮
let choiceButtonImg;

let clickSound; // 键盘音效
let moneySound; //钥匙音效
let dingSound; //铃声
let levelEndSoundPlayed = false;
let bgMusic;

function preload() {
    bgImg = loadImage('assets/bgImg.png');
    materials.push(loadImage('assets/00bottom.png'));
    materials.push(loadImage('assets/01top.png'));
    materials.push(loadImage('assets/02meatpie.png'));
    materials.push(loadImage('assets/03egg.png'));
    materials.push(loadImage('assets/04fried.png'));
    materials.push(loadImage('assets/05ham.png'));
    materials.push(loadImage('assets/06tomato.png'));
    materials.push(loadImage('assets/07leaf.png'));
    materials.push(loadImage('assets/08cheese.png'));
    
    xuanguanButtonImg = loadImage('assets/xuanguanButton.png'); // 加载选择关卡按钮图片
    bgRestaurantImg = loadImage('assets/bgRestaurant.png'); // 加载客户对话背景图像
    //guest1Img = loadImage('assets/guest1.png'); // 加载客户图像
    //fgRestaurantImg = loadImage('assets/fgRestaurant.png'); // 加载文本框图像
    choiceButtonImg = loadImage('assets/choice.png'); // 加载选择按钮图片
    start0Img = loadImage('assets/start0.png');
    start1Img = loadImage('assets/start1.png');

    yidianmingtiFont = loadFont('assets/I.Ming-7.00.ttf');
    dianzhenheiFont = loadFont('assets/Unifont点阵黑13.0.01.ttf');
    clickSound = loadSound('assets/click.MP3'); // 加载点击音效
    moneySound = loadSound('assets/money.MP3');// 加载钱音效
    dingSound = loadSound('assets/ding.MP3');
    bgMusic = loadSound('assets/bgmusic.mp3');

}

function setup() {
    createCanvas(1280, 720);
    imageMode(CENTER);
    textFont(dianzhenheiFont);
    //frameRate(30); // 设置帧率
    initializeLevelButtons(); // 初始化关卡按钮
    initializePlayerData(12); // 初始化玩家数据，假设有12个关卡
    bgMusic.setVolume(0.3);
    bgMusic.loop();
}

function draw() {
    background(200, 200, 250); // 设置背景颜色
    //场景判断：标题、关卡选择、汉堡制作、与客户对话、关卡结束、通关结局
    if (gameState === "title") {
        drawTitleScreen();
    } else if (gameState === "levelSelect") {
        drawLevelSelectScreen();
    } else if (gameState === "burgerMaking") {
        drawBurgerMakingScreen();
    } else if (gameState === "customerInteraction") {
        drawCustomerInteractionScreen();
    } else if (gameState === "levelEnd") {
        drawLevelEndScreen();
    } else if (gameState === "gameEnd") {
        drawGameEndScreen();
    } else if (gameState === "ending1") {//结局1
        drawEnding1Screen();
    } else if (gameState === "ending2") {
        drawEnding2Screen();
    } else if (gameState === "ending3") {
        drawEnding3Screen();
    } else if (gameState === "ending4") {
        drawEnding4Screen();
    } else if (gameState === "ending5") {
        drawEnding5Screen();
    }
}

function drawTitleScreen() {// 绘制标题界面
    fill(255);
    imageMode(CENTER);
    image(start0Img, width / 2, height / 2);
    textSize(128);
    textAlign(CENTER, CENTER);
    text("李鬼的汉堡店", width / 2, height / 2 - 100);
    textSize(48);
    text("点击开始", width / 2, height / 2 + 100 );
}

function initializeLevelButtons() {// 初始化关卡按钮
    levelButtons = []; // 清空关卡按钮数组
    let startX = width / 2 - 520; // 第一个按钮的起始X坐标
    let startY = height / 2 - 20; // 第一个按钮的起始Y坐标
    let xOffset = 130; // 按钮之间的X轴间距
    let yOffset = 150; // 按钮之间的Y轴间距

    for (let i = 0; i < 12; i++) {
        let x = startX + (i % 6) * xOffset;
        let y = startY + Math.floor(i / 6) * yOffset;
        levelButtons.push(new LevelButton(xuanguanButtonImg, x, y, i + 1));
    }
}

function drawLevelSelectScreen() {// 绘制关卡选择界面
    
    push();
    fill(255);
    imageMode(CENTER);
    image(start1Img, width / 2, height / 2);
    textSize(64);
    textAlign(CENTER, CENTER);
    fill(251, 193, 23 );
    text("选择关卡", width * 4 / 12 + 30 , height / 2 - 200);
    pop();

    for (let button of levelButtons) {
        button.show();
    }

    
    push();//新添加
    textSize(24);
    textAlign(CENTER, CENTER);
    for (let i = 0; i < playerData.levels.length; i++) {
        let level = playerData.levels[i];
        text(` ${i + 1} 月收入: ${level.highMoney === null ? "未完成" : level.highMoney }`, width * 5 / 6 , height / 4 + i * 34);
    }
    pop();

    let totalMoney = getTotalMoney();//新添加
    push();
    textSize(32);
    textAlign(CENTER, BOTTOM);
    text(`总收入: ${totalMoney}`, width * 5 / 6 , height - 30);
    pop();
}

function drawBurgerMakingScreen() {// 绘制汉堡制作界面
    push();
    imageMode(CORNERS);
    background(bgImg);
    pop();
    // 放置背景
  
    if (!button) {
        button = createButton('制作完毕');
        button.position(20, 20);
        button.mousePressed(finishBurger);
    }
    push();
    fill(251,192,23);
    textSize(32);
    textAlign(CENTER, BOTTOM);
    text(`订单. ${currentBurgerIndex}`, width * 1 / 3 - 100 , 85);
    pop();

    drawRequiredBurger();
    
    drawBurger();
    for (let ingredient of ingredients) {
        ingredient.hovered();
        ingredient.show();
    }
    
    drawScore();
}

function drawRequiredBurger() {// 绘制要求汉堡
    let x = 420;
    let y = 280;
    for (let i = 0; i < requiredBurgers[currentBurgerIndex].length; i++) {
        image(requiredBurgers[currentBurgerIndex][i], x, y, 100, 100);
        y -= 20;
    }
}

function drawScore() {// 绘制分数
    fill(255);
    textSize(32);
    textAlign(RIGHT, BOTTOM);
    text("已完成: " + score, width - 20, height - 20);
}

function drawGameEndScreen() {
    // 在这里绘制通关结局界面的内容

}

function generateRequiredBurger() {// 生成要求汉堡

    requiredBurgers = []; // 清空要求汉堡数组
    let numberOfBurgers = currentLevel + 1; // 当前关卡需要制作的汉堡数量

    for (let j = 0; j < numberOfBurgers; j++) { // 生成5个要求汉堡
        let burger = []; // 创建一个新的汉堡数组
        burger.push(materials[0]); // 添加底座 (dizuo)
        let numberOfIngredients = Math.floor(Math.random() * 8) + 1;//生成一个介于1到8之间的随机整数

        for (let i = 0; i < numberOfIngredients; i++) {
            
            let randomIngredient = materials[Math.floor(Math.random() * materials.length)];// 从材料数组中随机选择一个材料
            burger.push(randomIngredient); // 将随机选择的材料添加到汉堡数组中
        }

        burger.push(materials[1]); // 添加顶部 (gaizi)
        requiredBurgers.push(burger); // 将生成的汉堡添加到要求汉堡数组中
    }
}

function initializeBurgerMakingScreen() {
    // 初始化汉堡制作界面
    for (let ingredient of ingredients) {// 重置所有 ingredients 的悬停状态
        ingredient.isHovered = false;
    }
    burger = [];
    ingredients = [];
    moneyEarned = 0; //初始化金钱
    generateRequiredBurger(); // 生成要求汉堡
    currentBurgerIndex = 0; // 初始化当前正在制作的“要求汉堡”的索引
    
    dialogues = allLevelDialogues[currentLevel - 1];// 使用对应关卡的对话
    dialogueIndex = 0; // 初始化对话索引

    let columnWidth = 210; // 列宽
    let rowHeight = 120; // 行高
    for (let i = 0; i < materials.length; i++) {
        let x = 855 + (i % 2) * columnWidth; // 计算 x 坐标
        let y = 100 + Math.floor(i / 2) * rowHeight; // 计算 y 坐标
        ingredients.push(new Ingredient(materials[i], x, y));
    }
}

function drawBurger() {    // 绘制汉堡
    let y = 600;
    for (let i = 0; i < burger.length; i++) {
        image(burger[i], 420, y, 300, 300); 
        y -= 35; // 每个食材之间的间隔
    }
}

function compareBurgers() {// 比较汉堡
    let requiredBurger = requiredBurgers[currentBurgerIndex];
    if (burger.length !== requiredBurger.length) {
        return false;
    }
    for (let i = 0; i < burger.length; i++) {
        if (burger[i] !== requiredBurger[i]) {
            return false;
        }
    }
    return true;
}

function finishBurger() {// 汉堡制作完毕
    console.log('制作完成！');
    dingSound.play();
    if (compareBurgers()) {
        score++;
        console.log('分数：' + score);
    }else {
        moneyEarned -= 5; // 制作失败扣除 5 元 
        console.log('当前收入：' + moneyEarned);
    }
    currentBurgerIndex++; // 制作完成后，将当前正在制作的“要求汉堡”的索引加1
    if (currentBurgerIndex >= requiredBurgers.length) {
        moneyEarned += score * 10; // 计算赚取的金钱
        updatePlayerData(currentLevel - 1, score);// 更新玩家数据

        //if (currentLevel === 12) {
        //    let totalMoney = getTotalMoney(); // 获取总收入
        //    if (totalMoney <= 0) {
        //        gameState = "ending1";
         //   } else if (totalMoney > 0 && totalMoney <= 100) {
        //        gameState = "ending2";
        //    } else if (totalMoney > 100 && totalMoney <= 500) {
        //        gameState = "ending3";
         //   } else {
        //        gameState = "ending4";
        //    }
        //} else {
            gameState = "customerInteraction"; // 进入客户对话界面
        //}
        score = 0; // 重置分数
        button.remove(); // 移除按钮
        button = null; // 将按钮设置为null
        dialogueIndex = 0; // 初始化对话索引
    } else {
        burger = []; // 清空当前汉堡
    }
    // 在这里添加制作完毕后的逻辑
}

function drawCustomerInteractionScreen() {// 绘制客户对话界面
    imageMode(CORNER); // 确保背景图片填满屏幕
    image(bgRestaurantImg,  0, 0, width, height); // 绘制客户对话背景图像
    imageMode(CENTER); // 切换回 CENTER 模式
    //image(guest1Img, width / 2, height / 2); // 绘制客户图像
    //image(fgRestaurantImg,width / 2, height / 2); // 绘制文本框图像

    fill(0);
    textSize(24);
    textAlign(CENTER, CENTER);
    textAlign(LEFT);
    textLeading(40);
    textFont(yidianmingtiFont);
    text(dialogues[dialogueIndex-1], 100, height - 100); // 显示当前对话文本
    textAlign(CENTER, CENTER);

    // 如果在第四关并且对话结束后进入选择阶段
    if (currentLevel === 4 && dialogueIndex >= dialogues.length && choiceButtons.length === 0) {
        let buttonWidth = 500; // 按钮宽度
        let buttonHeight = 200; // 按钮高度
        choiceButtons.push(new ChoiceButton(choiceButtonImg, width / 2 , height / 2 - 200, "不，我们没有鲨鲨汉堡！", () => {
            gameState = "levelEnd";
            removeChoiceButtons();
        }, buttonWidth, buttonHeight));
        choiceButtons.push(new ChoiceButton(choiceButtonImg, width / 2 , height / 2 + 200, "也许……我可以给你鲨鲨汉堡", () => {
            gameState = "ending5";
            bgMusic.stop();
            removeChoiceButtons();
        }, buttonWidth, buttonHeight));
    }

     // 如果在第十关并且对话结束后进入选择阶段
    if (currentLevel === 10 && dialogueIndex >= dialogues.length && choiceButtons.length === 0) {
        let buttonWidth = 500; // 按钮宽度
        let buttonHeight = 200; // 按钮高度
        choiceButtons.push(new ChoiceButton(choiceButtonImg, width / 2, height / 2 - 200, "这样的食材应该被扔进垃圾桶！", () => {
            gameState = "levelEnd";
            removeChoiceButtons();
        }, buttonWidth, buttonHeight));
        choiceButtons.push(new ChoiceButton(choiceButtonImg, width / 2, height / 2 + 200, "也许……我可以试一试？", () => {
            gameState = "ending5";
            bgMusic.stop();
            removeChoiceButtons();
        }, buttonWidth, buttonHeight));
    }

    if (currentLevel === 12 && dialogueIndex >= dialogues.length && choiceButtons.length === 0) {
        
        let totalMoney = getTotalMoney(); // 获取总收入
        if (totalMoney <= 0) {
            gameState = "ending1";
        } else if (totalMoney > 0 && totalMoney <= 100) {
            gameState = "ending2";
        } else if (totalMoney > 100 && totalMoney <= 500) {
            gameState = "ending3";
        } else {
            gameState = "ending4";
        }
        
    }



    for (let button of choiceButtons) {
        button.show();
    }
}

function removeChoiceButtons() {
    choiceButtons = [];
}


function drawLevelEndScreen() {// 绘制关卡结束界面
    if (!levelEndSoundPlayed) {//在切换到 "levelEnd" 场景时播放音效，并确保只播放一次。
        moneySound.play();
        levelEndSoundPlayed = true; // 标记音效已经播放
    }
    background(200, 200, 250);
    fill(255);
    textSize(64);
    textAlign(CENTER, CENTER);
    textFont(dianzhenheiFont);
    text(`今天赚了 ${moneyEarned} 元 \n `, width / 2, height / 2);
    textSize(32);
    textSize(32);
    text(`店铺租金 ${monthlyRent} 元 \n 剩余 ${moneyEarned - monthlyRent} 元`, width / 2, height / 2 + 100);
    text("点击进入关卡选择界面", width / 2, height / 2 + 300);
}

class Ingredient {
    constructor(img, x, y) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.size = 150; // 食材的大小
        this.width = this.img.width;
        this.height = this.img.height; // 获取图片的宽高
        this.isHovered = false;
    }

    show() {
        if (this.isHovered) {
            // 如果悬停，稍微放大图片
            image(this.img, this.x, this.y, this.size * 1.1, this.size * 1.1);
        } else {
            image(this.img, this.x, this.y, this.size, this.size);
        }
    }

    hovered() {
        let d = dist(mouseX, mouseY, this.x, this.y); // 计算鼠标位置与食材的距离
        this.isHovered = d < this.size / 4; // 根据距离设置悬停状态
    }

    clicked() {
        return this.isHovered;
    }
}


function mousePressed() {
    if (gameState === "title") {
        handleTitleClick();
    } else if (gameState === "levelSelect") {
        handleLevelSelectClick();
    } else if (gameState === "burgerMaking") {
        handleBurgerMakingClick();
    } else if (gameState === "customerInteraction") {
        handleCustomerInteractionClick();
    } else if (gameState === "levelEnd") {
        handleLevelEndClick();
    }
}

function handleTitleClick() {// 点击标题界面
    gameState = "levelSelect"; // 点击开始后进入关卡选择界面
    clickSound.play();
}

function handleLevelSelectClick() {// 点击关卡选择界面
    for (let button of levelButtons) {
        if (button.clicked()) {
            console.log("按钮 " + button.level + " 被点击");
            currentLevel = button.level;// 记录当前关卡编号
            dialogueIndex = 0;
            removeChoiceButtons();
            gameState = "burgerMaking";
            initializeBurgerMakingScreen();
            levelEndSoundPlayed = false;
            break;
        }
    }
}

function handleBurgerMakingClick() {// 点击汉堡制作界面
    if (burger.length < 10) {
        for (let ingredient of ingredients) {
            if (ingredient.clicked()) {
                burger.push(ingredient.img);
                clickSound.play(); // 播放点击音效
            }
        }
    }
}

function handleCustomerInteractionClick() {
    if ((currentLevel == 4 || currentLevel == 10) && dialogueIndex >= dialogues.length) {
        let buttonClicked = false;
        for (let button of choiceButtons) {
            if (button.isClicked(mouseX, mouseY)) {
                button.callback();
                clickSound.play(); // 播放点击音效
                dialogueIndex = 0;
                buttonClicked = true;
                break;
            }
        }
        if (!buttonClicked) {
            // 如果没有按钮被点击，阻止对话索引增加
            return;
        }
    } else {
        dialogueIndex++;
        if (dialogueIndex > dialogues.length) {
            gameState = "levelEnd"; // 进入关卡结束界面
            dialogueIndex = 0;
        }
    }
}

function handleLevelEndClick() {
    gameState = "levelSelect"; // 返回关卡选择界面
}

function drawEnding1Screen() {
    background(200, 0, 0);
    fill(255);
    textSize(64);
    textAlign(CENTER, CENTER);
    text("结局 ：失意", width / 2, height / 2);
    textAlign(CENTER, CENTER);
    textSize(20);
    text("由于长期的亏损，汉堡店再也无法支撑下去。\n 也许，当初的梦想本就是错误……", width / 2, height / 2+100);
}

function drawEnding2Screen() {
    background(200, 200, 0);
    fill(255);
    textSize(64);
    textAlign(CENTER, CENTER);
    text("结局 ：安居", width / 2, height / 2);
    textSize(20);
    text("尽管已经在汉堡店辛苦了一年，开一家属于自己的餐厅的目标依然遥远。\n 想到一年来结交的友人，你决定就这样在小镇生活下去", width / 2, height / 2+100);
}

function drawEnding3Screen() {
    background(0, 200, 0);
    fill(255);
    textSize(64);
    textAlign(CENTER, CENTER);
    text("结局 ：筑梦", width / 2, height / 2);
    textSize(20);
    text("汉堡店的收益不错。攒够了钱，你决定再做一番打拼。\n 谁能想到未来鼎鼎有名的中餐大厨，有过经营快餐店的经历呢？", width / 2, height / 2+100);
}

function drawEnding4Screen() {
    background(252, 197, 37);
    fill(255);
    textSize(64);
    textAlign(CENTER, CENTER);
    text("结局 ：堡皇", width / 2, height / 2);
    textSize(20);
    text("你简直就是汉堡之神！\n 有了这次的经验，你创办的连锁中式快餐店很快就风靡全球，店名就叫李鬼的疯狂星期八！", width / 2, height / 2+100);
}

function drawEnding5Screen() {
    background(0, 0, 0);
    fill(255);
    textSize(64);
    textAlign(CENTER, CENTER);
    text("结局 ：入狱三天", width / 2, height / 2);
    textSize(20);
    text("没想到，你的行为马上就被举报。\n 这里的伙食真心比不上李鬼的黑心汉堡店，你这么想着。", width / 2, height / 2+100);
}