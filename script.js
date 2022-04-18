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
    const bodyCanvas = 'body-canvas';

    canvasBlock.append(this.div);
    this.div.setAttribute('class', bodyCanvas);
  };

  clearCanvas = () => this.div.firstChild.remove();

  sortColor = (name) => {
    colors.forEach(color => {
      const { selected, value } = color;

      if (selected) {
        const pattern = this.div.firstChild;
        const transparent = 'transparent';

        if (name === 'triangle') pattern.style.backgroundColor = transparent;

        return pattern.classList.add(value);
      };
    });
  };

  createFigure = () => {
    const figure = document.createElement('div');

    this.div.append(figure);
    figure.setAttribute('class', this.name);

    this.sortColor(this.name);
  };

  moveAt = (elem, newLocation) => {
    const { x, y } = newLocation;

    elem.style.left = `${x}px`;
    elem.style.top = `${y}px`;
  };

  draggable = (elem) => {
    let limits = {
      top: this.div.offsetTop,
      right: this.div.offsetWidth + this.div.offsetLeft - elem.offsetWidth,
      bottom: this.div.offsetHeight + this.div.offsetTop - elem.offsetHeight,
      left: this.div.offsetLeft,
    };

    elem.onmousedown = (event) => {
      let coords = elem.getBoundingClientRect();
      let shiftX = event.clientX - coords.left;
      let shiftY = event.clientY - coords.top;

      const onMouseMove = (event) => {
        const newLocation = {
          x: limits.left,
          y: limits.top,
        };

        if (event.pageX > limits.right) newLocation.x = limits.right;
        else if (event.pageX > limits.left) newLocation.x = event.pageX;

        if (event.pageY > limits.bottom) newLocation.y = limits.bottom;
        else if (event.pageY > limits.top) newLocation.y = event.pageY;

        this.moveAt(elem, newLocation);
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

  finall = (canvas) => {
    // if (canvas) this.clearCanvas();

    this.createCanvas();
    this.createFigure();
    this.draggable(canvasBlock.firstChild.firstChild);
  };
};

addBtn.addEventListener('click', () => {
  const canvasBody = document.querySelector('.body-canvas');

  const square = new Figure('square', div);
  const triangle = new Figure('triangle', div);
  const circle = new Figure('circle', div);
  const rectangle = new Figure('rectangle', div);


  figures.forEach(item => {
    const { selected, value } = item;

    if (selected) {
      // FIXME: fix this
      switch (value) {
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
