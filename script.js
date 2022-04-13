const canvasBlock = document.querySelector('.canvas-block');
const figures = document.getElementById('figures');
const colors = document.getElementById('colors');
const addBtn = document.querySelector('.add-btn');

class Figure {
  constructor() {
    this.div = document.createElement('div');
  };

  createCarcass = () => {
    canvasBlock.append(this.div);
    this.div.setAttribute('class', 'body-canvas');
  };

  createFigure = (name) => {
    const canvas = document.querySelector('.body-canvas');
    const tag = document.createElement('div');

    canvas.append(tag);
    tag.setAttribute('class', name);
  };

  clearCanvas = () => {
    while (canvasBlock.firstChild) {
      canvasBlock.firstChild.remove();
    };
  };

  sortOutFigures = () => {
    for (let i = 0; i < figures.length; i++) {
      const figure = figures[i];

      if (figure.selected) {
        if (figure.value === 'square') {
          this.createFigure(figure.value);
          return figure.value;
        } else if (figure.value === 'triangle') {
          this.createFigure(figure.value);
          return figure.value;
        }
      };
    };
  };

  sortOutColors = (figure) => {
    for (let i = 0; i < colors.length; i++) {
      const color = colors[i];

      if (color.selected) {
        if (color.value === 'red') {
          figure === 'square'
            ? document.getElementsByClassName(figure)[0].style.backgroundColor = 'red'
            : document.getElementsByClassName(figure)[0].style.borderBottomColor = 'red';
        } else if (color.value === 'blue') {
          figure === 'square'
            ? document.getElementsByClassName(figure)[0].style.backgroundColor = 'blue'
            : document.getElementsByClassName(figure)[0].style.borderBottomColor = 'blue';
        } else if (color.value === 'green') {
          figure === 'square'
            ? document.getElementsByClassName(figure)[0].style.backgroundColor = 'green'
            : document.getElementsByClassName(figure)[0].style.borderBottomColor = 'green';
        }
      };
    };
  };

  selectedMenu = () => {
    this.sortOutColors(this.sortOutFigures());
  };

  moveAt = (pageX, pageY) => {
    elem.style.left = pageX - elem.offsetWidth / 2 + 'px';
    elem.style.top = pageY - elem.offsetHeight / 2 + 'px';
  };

  onMouseMove = (event) => {
    this.moveAt(event.pageX, event.pageY);
  };

  draggable = (elem) => {
    elem = canvasBlock.firstChild.firstChild;

    elem.onmousedown = (event) => {
      this.moveAt(event.pageX, event.pageY);

      document.addEventListener('mousemove', this.onMouseMove);

      elem.onmouseup = () => {
        document.removeEventListener('mousemove', this.onMouseMove);
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
};

class Triangle extends Figure {
  constructor(...args) {
    super(...args);
  };
};

const square = new Square();
const triangle = new Triangle();

addBtn.addEventListener('click', () => {
  square.createCarcass();
  for (let i = 0; i < figures.length; i++) {
    const figure = figures[i];

    square.createFigure(figure);
  }
  square.selectedMenu();
});


// triangle.createCarcass();
// triangle.createFigure('triangle');

/* const sortOutFigures = () => {
  for (let i = 0; i < figures.length; i++) {
    const figure = figures[i];

    if (figure.selected) {
      if (figure.value === 'square') {
        square();
        return figure.value;
      } else if (figure.value === 'triangle') {
        triangle();
        return figure.value;
      }
    }
  }
} */

/* const sortOutColors = (figure) => {
  for (let i = 0; i < colors.length; i++) {
    const color = colors[i];

    if (color.selected) {
      if (color.value === 'red') {
        figure === 'square'
          ? document.getElementsByClassName(figure)[0].style.backgroundColor = 'red'
          : document.getElementsByClassName(figure)[0].style.borderBottomColor = 'red';
      } else if (color.value === 'blue') {
        figure === 'square'
          ? document.getElementsByClassName(figure)[0].style.backgroundColor = 'blue'
          : document.getElementsByClassName(figure)[0].style.borderBottomColor = 'blue';
      } else if (color.value === 'green') {
        figure === 'square'
          ? document.getElementsByClassName(figure)[0].style.backgroundColor = 'green'
          : document.getElementsByClassName(figure)[0].style.borderBottomColor = 'green';
      }
    }
  }
} */

/* const selectedMenu = () => {
  sortOutColors(sortOutFigures());
} */

/* const bodyForCanvas = () => {
  const bodyCanvas = document.createElement('div');

  canvasBlock.append(bodyCanvas);
  bodyCanvas.setAttribute('class', 'body-canvas');
} */

/* const clearCanvas = () => {
  while (canvasBlock.firstChild) {
    canvasBlock.firstChild.remove();
  }
} */

/* const square = () => {
  const canvas = document.querySelector('.body-canvas');
  const square = document.createElement('div');

  canvas.append(square);
  square.setAttribute('class', 'square');
} */

/* const triangle = () => {
  const canvas = document.querySelector('.body-canvas');
  const triangle = document.createElement('div');

  canvas.append(triangle);
  triangle.setAttribute('class', 'triangle');
} */

/* const draggable = (elem) => {
  elem = canvasBlock.firstChild.firstChild;

  elem.onmousedown = (event) => {
    const moveAt = (pageX, pageY) => {
      elem.style.left = pageX - elem.offsetWidth / 2 + 'px';
      elem.style.top = pageY - elem.offsetHeight / 2 + 'px';
    }

    moveAt(event.pageX, event.pageY);

    const onMouseMove = (event) => {
      moveAt(event.pageX, event.pageY);
    }

    document.addEventListener('mousemove', onMouseMove);

    elem.onmouseup = () => {
      document.removeEventListener('mousemove', onMouseMove);
      elem.onmouseup = null;
    };

    elem.ondragstart = () => {
      return false;
    };
  };
} */

/* addBtn.addEventListener('click', () => {
  clearCanvas();
  bodyForCanvas();
  selectedMenu();
  draggable();
}); */
