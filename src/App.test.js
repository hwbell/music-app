import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// functions
const add = (a, b) => a + b;

const generateGreeting = (name = 'Anonymous') => {
  return `Hello ${name}!`
}

test('should add two numbers', () => {
  const result = add(3,4);

  expect(result).toBe(7);
});

test('should return a greeting', () => {
  const result = generateGreeting("Mike");
  expect(result).toBe("Hello Mike!")
});

test('should return a greeting for no name', () => {
  const result = generateGreeting();
  expect(result).toBe("Hello Anonymous!")
});





// components
// window.matchMedia = () => ({
//   addListener: () => { },
//   removeListener: () => { }
// });

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });
