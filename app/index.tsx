import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import {render} from 'react-dom';

import Presentation from './Presentation';

const appElement = document.getElementById('app');

render(<Presentation />, appElement);
