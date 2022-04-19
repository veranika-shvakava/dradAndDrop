const canvasBlock = document.querySelector('.canvas-block');
const figures = document.querySelectorAll('#figures > option');
const colors = document.querySelectorAll('#colors > option');
const weather = document.querySelector('.weather');
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

  sortColor = (name) => {
    colors.forEach(color => {
      const { selected, value } = color;
      const pattern = this.div.lastChild;
      const transparent = 'transparent';

      if (selected) {
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


  moveAt = (pageX, pageY, elem, shiftX, shiftY) => {
    let rightSide = this.div.offsetWidth + this.div.offsetLeft - elem.offsetWidth;
    let bottomSide = this.div.offsetHeight + this.div.offsetTop - elem.offsetHeight;
    let leftPosition = (pageX - shiftX) < 0 ? 0 : pageX - shiftX;
    let topPosition = (pageY - shiftY) < 0 ? 0 : pageY - shiftY;

    if (leftPosition < this.div.offsetLeft) leftPosition = this.div.offsetLeft;
    else if (leftPosition > rightSide) leftPosition = rightSide;

    if (topPosition < this.div.offsetTop) topPosition = this.div.offsetTop;
    else if (topPosition > bottomSide) topPosition = bottomSide;

    elem.style.left = `${leftPosition}px`;
    elem.style.top = `${topPosition}px`;
  };

  draggable = (elem) => {
    elem.onmousedown = (event) => {
      const coords = elem.getBoundingClientRect();

      let shiftX = event.clientX - coords.left;
      let shiftY = event.clientY - coords.top;

      this.moveAt(event.pageX, event.pageY, elem, shiftX, shiftY);

      const onMouseMove = (event) => this.moveAt(event.pageX, event.pageY, elem, shiftX, shiftY);

      document.addEventListener('mousemove', onMouseMove);

      elem.onmouseup = () => {
        document.removeEventListener('mousemove', onMouseMove);
        elem.onmouseup = null;
      };

      elem.ondragstart = () => false;
    };
  };

  finall = () => {
    this.createCanvas();
    this.createFigure();
    this.draggable(canvasBlock.firstChild.lastChild);
  };
};

const api = async () => {
  const key = 'c063ae12e3968aae8ab0ba97c5913399';
  const lat = 53.9;
  const lon = 27.5667;
  let promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`);

  try {
    let json = await promise.json();

    const {
      name,
      dt,
      coord: { lon, lat },
      weather: [{ main, description }],
      wind: { speed },
    } = json;
    let date = new Date(dt * 1000);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    let formattedTime = `${hours}:${minutes}:${seconds}`;

    weather.innerHTML = `
      <div>Город: ${name}</div>
      <div>Координаты: ${lat}, ${lon}</div>
      <div>Погода действительна на: ${formattedTime}</div>
      <div>Погода: ${main} / ${description}</div>
      <div>Ветер: ${speed}</div>
    `;
  } catch {
    console.log("Ошибка HTTP: " + promise.status);
  }
};

addBtn.addEventListener('click', () => {
  figures.forEach(item => {
    const { selected, value } = item;
    const figure = new Figure(value, div);

    if (selected) figure.finall();
  });

  api();
});
