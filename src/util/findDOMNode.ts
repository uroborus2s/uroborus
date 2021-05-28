import React from 'react';
import ReactDOM from 'react-dom';

export default function findDOMNode(
  node: React.ReactInstance | HTMLElement,
): HTMLElement {
  if (node instanceof HTMLElement) {
    return node;
  }

  return ReactDOM.findDOMNode(node) as HTMLElement;
}
