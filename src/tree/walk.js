/**
 * childrenFn > childrenKey
 *
 * fn: (node, ctx, pNode) => void;
 */
export default function walkTree(
  root,
  fn,
  {
    childrenFn = null,
    childrenKey = 'children',
    childFirst = false,
    rootAsChildren = false,
    skipRoot = false,
    ctx = {},
  } = {}
) {
  if (childrenFn === null) {
    childrenFn = node => node[childrenKey];
  }

  let processNode = (node, pNode) => {
    if (!childFirst) {
      fn(node, ctx, pNode);
    }

    processChildren(node);

    if (childFirst) {
      fn(node, ctx, pNode);
    }
  };
  let processChildren = pNode => {
    let children = childrenFn(pNode);
    if (children && children.length) {
      children.forEach(node => processNode(node, pNode));
    }
  };

  if (rootAsChildren) {
    if (root && root.length) {
      root.forEach(node => processNode(node, null));
    }
  } else {
    if (skipRoot) {
      processChildren(root);
    } else {
      processNode(root, null);
    }
  }
}
