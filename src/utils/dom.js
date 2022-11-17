export const createDomText = (tagName, text) => {
  const tag = document.createElement(tagName)
  // tag.textContent = text
  return tag
}