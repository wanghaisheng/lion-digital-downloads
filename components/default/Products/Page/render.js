import { createElement } from 'react';
import { TextWithImage, TextOnly } from './Hero';
import { ImageViewer, ImageSingle } from './Gallery'
import { VideoYoutube } from './Video'

const keysToComponentMap = {
  heroTextWithImage: TextWithImage,
  heroTextOnly: TextOnly,
  imageViewer: ImageViewer,
  imageSingle: ImageSingle,
  videoYoutube: VideoYoutube
};

const stylesMap = (styles) => {
  let mappedStyles = {};
  styles.forEach((style) => {
    mappedStyles[style.name] = style.value;
  });
  return mappedStyles;
};

export const renderComponent = (config) => {
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
          : config.children.map((c) => renderComponent(c)))
    );
  }
};