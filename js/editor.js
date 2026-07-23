const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;

const preview = document.querySelector('.img-upload__preview img');
const scaleControl = document.querySelector('.scale__control--value');
const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');

let currentScale = 100;

const updateScale = () => {
  const scaleValue = currentScale / 100;
  preview.style.transform = `scale(${scaleValue})`;
  scaleControl.value = `${currentScale}%`;
};

const resetScale = () => {
  currentScale = 100;
  updateScale();
};

const onScaleSmallerClick = () => {
  if (currentScale > MIN_SCALE) {
    currentScale -= SCALE_STEP;
    updateScale();
  }
};

const onScaleBiggerClick = () => {
  if (currentScale < MAX_SCALE) {
    currentScale += SCALE_STEP;
    updateScale();
  }
};

scaleSmaller.addEventListener('click', onScaleSmallerClick);
scaleBigger.addEventListener('click', onScaleBiggerClick);

export { resetScale, updateScale };
