import { init, GameLoop, Text } from 'kontra';

let { canvas } = init();

const messages = [];

function newMessage(message) {
    if (messages.length > 4) {
        messages.shift();
    }
    messages.push(Text({
        text: message,
        font: '20px Arial',
        color: 'black',
        x: 10,
        y: 20,
        opacity: 1,
    }));
    messages.forEach(m => {
        m.y += 20;
    });
}

let i = 0;

let loop = GameLoop({
    update: function() {
        i++;
        if (i % 60 === 0) {
            newMessage('test' + i);
        }
    },
    render: function() {
        messages.forEach(m => m.render());
    }
});

loop.start();
