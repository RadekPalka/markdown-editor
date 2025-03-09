import { signal } from '@preact/signals-react';
import { example } from './constants/markdownExample';

export const markdownText = signal(example);
export const selectedText = signal({ startIndex: 0, endIndex: 0, text: '' });
