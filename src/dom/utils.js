// src: http://stackoverflow.com/a/384380
export function isNode(o: any) {
  return (
    typeof Node === "function" ? o instanceof Node :
      o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName === "string"
  );
}


export function isElement(o: any) {
  return (
    typeof HTMLElement === "function" ?o instanceof HTMLElement : //DOM2
      o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string"
  );
}


export function isNodeOrElement(o: any) {
  return isNode(o) || isElement(o);
}

