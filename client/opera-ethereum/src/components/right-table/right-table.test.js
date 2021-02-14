import React from 'react';
import ReactDOM from 'react-dom';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from 'react-dom/test-utils';
import RightTable from './right-table';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it('can render RightTable with empty notifications', () => {
  // Test with empty data
  act(() => {
    render(<RightTable transactions={[]}/>, container);
  });

  const span = container.querySelector('span'); 
  expect(span.textContent).toBe('No transactions');

});

it('can render RightTable with notifications', () => {
    act(() => {
        render(<RightTable transactions={[{from:'1', to:'2', hash:'3'}]}/>, container);
      }); 
    
      const from = container.querySelector('#from');
      expect(from.textContent).toBe('from: 1');   
});

it('can render RightTable with notifications', () => {
    act(() => {
        render(<RightTable transactions={[{from:'1', to:'2', hash:'3'}]}/>, container);
      }); 
    
      const from = container.querySelector('#from');
      expect(from.textContent).toBe('from: 1');   
});

// it('can check error boundary with RightTable', () => {
//     act(() => {
//         render(<RightTable transactions={[undefined]} />, container);
//       }); 
//       const error = container.querySelector('h2');
//       expect(error.textContent).toBe('Something went wrong.');   
// });