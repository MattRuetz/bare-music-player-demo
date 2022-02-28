document.documentElement.style.setProperty('--gradient-color-left', '#ec38bc');

const setRandomGradient = () => {
    document.documentElement.style.setProperty(
        '--gradient-color-left',
        getRandomHexColor()
    );
    document.documentElement.style.setProperty(
        '--gradient-color-right',
        getRandomHexColor()
    );
};

const getRandomHexColor = () => {
    // yoinked from : https://www.tutorialspoint.com/generating-random-hex-color-in-javascript
    let color = '#';
    for (let i = 0; i < 6; i++) {
        const random = Math.random();
        const bit = (random * 16) | 0;
        color += bit.toString(16);
    }
    return color;
};

// On load
setRandomGradient();
