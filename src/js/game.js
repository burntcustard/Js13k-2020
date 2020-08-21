import { init, GameLoop, GameObject, Text, keyPressed, initKeys } from 'kontra';

let { canvas } = init();

initKeys();

let messages = [];

function newMessage(message) {
    messages.push(Text({
        text: message,
        font: '20px Arial',
        color: 'black',
        x: 10,
        y: 0,
        opacity: 1,
        ttl: 180,
        update: function() {
            if (this.isAlive()) {
                this.ttl--;
                return;
            }
            this.opacity -= .02;
            if (this.opacity <= 0) {
                this.opacity = 0;
            }
        }
    }));
    messages.forEach(m => {
        m.y += 20;
    });
}

let i = 0;

let player = GameObject({
    x: 1,
    y: 1,
    cooldowns: {
        yPos: 60,
        yNeg: 60,
        xPos: 60,
        xNeg: 60,
    },
    update: function() {
        for (cooldownName in this.cooldowns) {
            if (this.cooldowns[cooldownName] > 0) {
                this.cooldowns[cooldownName]--;
            }
        }
    }
});

let width = 22;

let initial =  ('' +
    '▛▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▜\n' +
    '▌╭──▝▀▘──╮#####╭──╮;▐\n' +
    '▌│       │#####│s░│.▐\n' +
    '▌╰,..,.,,╯#┌─┐#╰──╯,▐\n' +
    '▌;,.,;,,.,..,/ /,..,▐\n' +
    '▌.;.,.,;,,.,/ /,..╻,▐\n' +
    '▌,.,;.(f).,...,.,(w)▐\n' +
    '▌-------------------▐'   +
'').split('');

let map = Text({
    text: initial.join(''),
    font: '20px Monospace',
    color: 'black',
    x: 120,
    y: 0,
    lineHeight: 1,
    update: function() {
        let newText = [...initial];
        newText[player.y * width + player.x] = '@';
        this.text = newText.join('');
    }
});

map.render();

console.log(map.text);

stat = Text({
    text: ('' +
        'Stamina: 4\n' +
        'Somethings: 5'
    ),
    font: '20px Arial',
    y: 20,
    x: 420,
    lineHeight: 1.5
});

let loop = GameLoop({
    update: function() {
        i++;
        if (i % 120 === 0) {
            newMessage('test' + i);
            //console.log(map.text);
        }
        messages.forEach(m => m.update());
        player.update();

        if (keyPressed('up') && player.cooldowns.yNeg === 0) {
          player.y--;
          player.cooldowns.yNeg = 12;
        }

        if (keyPressed('down') && player.cooldowns.yPos === 0) {
          player.y++;
          player.cooldowns.yPos = 12;
        }

        if (keyPressed('left') && player.cooldowns.xNeg === 0) {
          player.x--;
          player.cooldowns.xNeg = 12;
        }

        if (keyPressed('right') && player.cooldowns.xPos === 0) {
          player.x++;
          player.cooldowns.xPos = 12;
        }
        map.update();
    },
    render: function() {
        messages.forEach(m => m.render());
        messages = messages.filter(m => (m.isAlive() || m.opacity));
        map.render();
        //stat.render();
    }
});

loop.start();
