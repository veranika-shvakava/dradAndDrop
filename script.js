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

        if (name === 'square') {
          switch (color.value) {
            case 'red':
              this.div.firstChild.style.backgroundColor = 'firebrick';
              break;
            case 'blue':
              this.div.firstChild.style.backgroundColor = 'cornflowerblue';
              break;
            case 'green':
              this.div.firstChild.style.backgroundColor = 'seagreen';
              break;
          }
        } else if (name === 'triangle') {
          this.div.firstChild.style.backgroundColor = 'transparent';

          switch (color.value) {
            case 'red':
              this.div.firstChild.style.borderBottomColor = 'firebrick';
              break;
            case 'blue':
              this.div.firstChild.style.borderBottomColor = 'cornflowerblue';
              break;
            case 'green':
              this.div.firstChild.style.borderBottomColor = 'seagreen';
              break;
          }
        }
      }
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
    this.elem = elem;

    this.elem.onmousedown = (event) => {
      let shiftX = event.clientX - this.elem.getBoundingClientRect().left;
      let shiftY = event.clientY - this.elem.getBoundingClientRect().top;

      this.moveAt(event.pageX, event.pageY, this.elem, shiftX, shiftY);

      const onMouseMove = (event) => {
        this.moveAt(event.pageX, event.pageY, this.elem, shiftX, shiftY);
      }

      document.addEventListener('mousemove', onMouseMove);

      this.elem.onmouseup = () => {
        document.removeEventListener('mousemove', onMouseMove);
        this.elem.onmouseup = null;
      };

      this.elem.ondragstart = () => {
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
  }
};

class Triangle extends Square {
  constructor(...args) {
    super(...args);
  };
};

addBtn.addEventListener('click', () => {
  const canvasBody = document.querySelector('.body-canvas');

  const square = new Square('square', div);
  const triangle = new Triangle('triangle', div);

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
      };
    };
  });
});
