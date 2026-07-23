const EFFECTS = {
  none: { filter: 'none', min: 0, max: 1, step: 0.1, unit: '' },
  chrome: { filter: 'grayscale', min: 0, max: 1, step: 0.1, unit: '' },
  sepia: { filter: 'sepia', min: 0, max: 1, step: 0.1, unit: '' },
  marvin: { filter: 'invert', min: 0, max: 100, step: 1, unit: '%' },
  phobos: { filter: 'blur', min: 0, max: 3, step: 0.1, unit: 'px' },
  heat: { filter: 'brightness', min: 1, max: 3, step: 0.1, unit: '' },
};

const preview = document.querySelector('.img-upload__preview img');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectLevelContainer = document.querySelector('.img-upload__effect-level');
const effectInputs = document.querySelectorAll('.effects__radio');

let currentEffect = 'none';
let slider = null;

const applyEffect = (effectName, level) => {
  const effect = EFFECTS[effectName];
  if (!effect || effect.filter === 'none') {
    preview.style.filter = 'none';
    return;
  }

  const filterValue = Math.round(level / effect.step) * effect.step;
  preview.style.filter = `${effect.filter}(${filterValue}${effect.unit})`;
};

const updateSliderOptions = (effectName) => {
  const effect = EFFECTS[effectName];
  if (!effect || effect.filter === 'none') {
    effectLevelContainer.classList.add('hidden');
    preview.style.filter = 'none';
    return;
  }

  effectLevelContainer.classList.remove('hidden');

  if (slider) {
    slider.destroy();
  }

  slider = noUiSlider.create(effectLevelSlider, {
    range: {
      min: effect.min,
      max: effect.max,
    },
    start: effect.max,
    step: effect.step,
    connect: 'lower',
    format: {
      to: (value) => Number(value),
      from: (value) => Number(value),
    },
  });

  slider.on('update', () => {
    const value = slider.get();
    effectLevelValue.value = value;
    applyEffect(currentEffect, value);
  });
};

const resetEffects = () => {
  currentEffect = 'none';
  document.querySelector('#effect-none').checked = true;
  preview.style.filter = 'none';
  effectLevelContainer.classList.add('hidden');
  if (slider) {
    slider.destroy();
    slider = null;
  }
};

const onEffectChange = (evt) => {
  currentEffect = evt.target.value;
  const effect = EFFECTS[currentEffect];
  if (effect && effect.filter !== 'none') {
    updateSliderOptions(currentEffect);
    slider.set(effect.max);
  } else {
    resetEffects();
  }
};

effectInputs.forEach((input) => {
  input.addEventListener('change', onEffectChange);
});

export { applyEffect, updateSliderOptions, resetEffects };
