const imgUploadContainer = document.querySelector('.img-upload');
const imgPreview = imgUploadContainer.querySelector('.img-upload__preview img');
const scaleValue = imgUploadContainer.querySelector('.scale__control--value');
const effectSlider = imgUploadContainer.querySelector('.effect-level__slider');
const effectValue = imgUploadContainer.querySelector('.effect-level__value');
const sliderWrapper = imgUploadContainer.querySelector('.img-upload__effect-level');

const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;

const effectSettings = {
  none: {
    hidden: true,
  },
  chrome: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    filter: (value) => `grayscale(${value})`,
  },
  sepia: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    filter: (value) => `sepia(${value})`,
  },
  marvin: {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    filter: (value) => `invert(${value}%)`,
  },
  phobos: {
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1,
    filter: (value) => `blur(${value}px)`,
  },
  heat: {
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1,
    filter: (value) => `brightness(${value})`,
  },
};

noUiSlider.create(effectSlider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

sliderWrapper.classList.add('hidden');

export function changeScale(value) {
  scaleValue.value = `${value}%`;
  imgPreview.style.transform = `scale(${value / 100})`;
}

export function onEffectsListChange(evt) {
  const effect = evt.target.value;
  const filterSettings = effectSettings[effect];

  if (effect === 'none') {
    sliderWrapper.classList.add('hidden');
    imgPreview.style.filter = 'none';
    effectValue.value = 0;
  } else {
    sliderWrapper.classList.remove('hidden');

    effectSlider.noUiSlider.updateOptions({
      range: filterSettings.range,
      start: filterSettings.start,
      step: filterSettings.step,
    });

    effectSlider.noUiSlider.on('update', () => {
      effectValue.value = effectSlider.noUiSlider.get();
      imgPreview.style.filter = filterSettings.filter(effectValue.value);
    });
  }
}

export function onScaleDecreaseClick() {
  const scaleValueNumber = parseFloat(scaleValue.value);
  if (scaleValueNumber === MIN_SCALE) {
    return;
  }
  const scaleSize = scaleValueNumber - SCALE_STEP;
  changeScale(scaleSize);
}

export function onScaleIncreaseClick() {
  const scaleValueNumber = parseFloat(scaleValue.value);
  if (scaleValueNumber === MAX_SCALE) {
    return;
  }
  const scaleSize = scaleValueNumber + SCALE_STEP;
  changeScale(scaleSize);
}
