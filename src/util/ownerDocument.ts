export function ownerDocument(node?: Node): Document {
  return (node && node.ownerDocument) || document;
}

export function ownerWindow(node?: Node): Window {
  const doc = ownerDocument(node);
  return doc.defaultView || window;
}
