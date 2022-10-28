import { describe, expect, test } from '@jest/globals';
import { createDomText } from './dom.js';

describe('createDomText', () => {
  test('test dom text is expected', () => {
    const text = "hello world"
    const tag = createDomText("p", text)
    expect(tag.textContent).toBe(text);
  });
});