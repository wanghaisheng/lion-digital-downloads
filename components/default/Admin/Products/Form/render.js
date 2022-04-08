import { createElement } from 'react';
import { TextWithImage, TextOnly } from './Hero';
import { ImageSingle } from './Gallery'

const keysToComponentMap = {
  heroTextWithImage: TextWithImage,
  heroTextOnly: TextOnly,
  imageSingle: ImageSingle
};

const stylesMap = (styles) => {
  let mappedStyles = {};
  styles.forEach((style) => {
    mappedStyles[style.name] = style.value;
  });
  return mappedStyles;
};

export const renderComponentForm = (config) => {
  if (typeof keysToComponentMap[config.component] !== 'undefined') {
    return createElement(
      keysToComponentMap[config.component],
      {
        id: config.id,
        key: config.id,
        className: config.className ? config.className : null,
        ariaHidden: config.ariaHidden ? config.ariaHidden : null,
        style: config.styles ? stylesMap(config.styles) : null,
        props: config.data,
      },
      config.children &&
        (typeof config.children === 'string'
          ? config.children
          : config.children.map((c) => renderComponentForm(c)))
    );
  }
};