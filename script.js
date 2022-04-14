const canvasBlock = document.querySelector('.canvas-block');
const figures = document.querySelectorAll('#figures > option');
const colors = document.querySelectorAll('#colors > option');
const addBtn = document.querySelector('.add-btn');

const div = document.createElement('div');

class Figure {
  constructor(name, div) {
    this.name = name;
    this.div = div;
  };

  createCanvas = () => {
    canvasBlock.append(this.div);
    this.div.setAttribute('class', 'body-canvas');
  };

  clearCanvas = () => {
    this.div.firstChild.remove();
  };

  sortColor = (name) => {
    colors.forEach(color => {
      if (color.selected) {
        console.log(color.value);

        const pattern = this.div.firstChild;

        if (name === 'triangle') pattern.style.backgroundColor = 'transparent';

        switch (color.value) {
          case 'red':
            pattern.classList.add('firebrick');
            break;
          case 'blue':
            pattern.classList.add('cornflowerblue');
            break;
          case 'green':
            pattern.classList.add('seagreen');
            break;
          case 'sandy':
            pattern.classList.add('sandybrown');
            break;
        };
      };
    });
  };

  createFigure = () => {
    const figure = document.createElement('div');

    this.div.append(figure);
    figure.setAttribute('class', this.name);

    this.sortColor(this.name);
  };

  moveAt = (pageX, pageY, elem, shiftX, shiftY) => {
    elem.style.left = pageX - shiftX + 'px';
    elem.style.top = pageY - shiftY + 'px';
  };

  draggable = (elem) => {
    /* const borderCanvas = {
      top: this.div.offsetTop,
      right: this.div.offsetWidth + this.div.offsetLeft - this.div.firstChild.offsetWidth,
      bottom: this.div.offsetHeight + this.div.offsetTop - this.div.firstChild.offsetHeight,
      left: this.div.offsetLeft,
    };
    console.log(`😈 ~ borderCanvas`, borderCanvas); */

    elem.onmousedown = (event) => {
      let shiftX = event.clientX - elem.getBoundingClientRect().left;
      let shiftY = event.clientY - elem.getBoundingClientRect().top;

      this.moveAt(event.pageX, event.pageY, elem, shiftX, shiftY);

      const onMouseMove = (event) => {
        // const newLocation = {
        //   x: borderCanvas.left,
        //   y: borderCanvas.top
        // };

        // if (event.pageX > borderCanvas.right) {
        //   newLocation.x = borderCanvas.right;
        // } else if (event.pageX > borderCanvas.left) {
        //   newLocation.x = event.pageX;
        // }

        // if (event.pageY > borderCanvas.bottom) {
        //   newLocation.y = borderCanvas.bottom;
        // } else if (event.pageY > borderCanvas.top) {
        //   newLocation.y = event.pageY;
        // }

        this.moveAt(event.pageX, event.pageY, elem, shiftX, shiftY);
        // this.moveAt(newLocation.x, newLocation.y, elem, shiftX, shiftY);
      };

      document.addEventListener('mousemove', onMouseMove);

      elem.onmouseup = () => {
        document.removeEventListener('mousemove', onMouseMove);
        elem.onmouseup = null;
      };

      elem.ondragstart = () => {
        return false;
      };
    };
  };
};

class Square extends Figure {
  constructor(...args) {
    super(...args);
  };

  finall = (canvas) => {
    if (canvas) this.clearCanvas();

    this.createCanvas();
    this.createFigure();
    this.draggable(canvasBlock.firstChild.firstChild);
  };
};

class Triangle extends Square {
  constructor(...args) {
    super(...args);
  };
};

class Сircle extends Triangle {
  constructor(...args) {
    super(...args);
  };
};

class Rectangle extends Сircle {
  constructor(...args) {
    super(...args);
  };
};

addBtn.addEventListener('click', () => {
  const canvasBody = document.querySelector('.body-canvas');

  const square = new Square('square', div);
  const triangle = new Triangle('triangle', div);
  const circle = new Сircle('circle', div);
  const rectangle = new Rectangle('rectangle', div);

  figures.forEach(item => {
    if (item.selected) {
      console.log(item.value);

      switch (item.value) {
        case 'square':
          square.finall(canvasBody);
          break;
        case 'triangle':
          triangle.finall(canvasBody);
          break;
        case 'circle':
          circle.finall(canvasBody);
          break;
        case 'rectangle':
          rectangle.finall(canvasBody);
          break;
      };
    };
  });
});
