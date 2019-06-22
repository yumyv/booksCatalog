const createDOMElem = (elemType, ...elemClass) => {
  const elem = document.createElement(elemType);
  elem.classList.add(...elemClass);
  return elem;
};

export default createDOMElem;
