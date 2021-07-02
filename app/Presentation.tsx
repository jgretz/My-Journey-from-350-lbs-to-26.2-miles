import React from 'react';
import {Deck} from 'spectacle';

import {theme} from './style';
import {Slide1} from './deck';

const Presentation = () => (
  <Deck theme={theme}>
    <Slide1 />
  </Deck>
);

export default Presentation;
