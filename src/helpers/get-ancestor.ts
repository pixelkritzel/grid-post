export default function getAncestor(elem: HTMLElement, selector: string): HTMLElement | null {
  if (elem.matches(selector)) {
    return elem;
  } else if (elem.parentElement) {
    return getAncestor(elem.parentElement, selector);
  } else {
    return null;
  }
}
