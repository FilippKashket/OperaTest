import React from 'react';
import { render} from "react-dom";
import { act } from 'react-dom/test-utils';
import LeftTable from './left-table';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

//number, hash, setBlockNumber, loading

it('can render LeftTable', () => {
  // Test with empty data
  act(() => {
    render(<LeftTable number={123} hash={567}/>, container);
  });

  const number = container.querySelector('#number'); 
  expect(number.defaultValue).toBe('123');

  const hash = container.querySelector('#hash'); 
  expect(hash.defaultValue).toBe('567');

});