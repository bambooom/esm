/**
 * childrenFn > childrenKey
 *
 * fn: (node, ctx, pNode) => void;
 *   ctx: {
 *     index: 1,
 *     level: 0,
 *   }
 *
 * walkTree([], (node, ctx, pNode) => {
 * });
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
    level = 0,
  } = {}
) {
  if (childrenFn === null) {
    childrenFn = node => node[childrenKey];
  }

  let processNode = (node, pNode, level, index) => {
    if (!childFirst) {
      ctx.level = level;
      ctx.index = index;
      fn(node, ctx, pNode);
    }

    processChildren(node, level);

    if (childFirst) {
      ctx.level = level;
      ctx.index = index;
      fn(node, ctx, pNode);
    }
  };
  let processChildren = (pNode, level) => {
    let children = childrenFn(pNode);
    if (children && children.length) {
      children.forEach((node, index) => processNode(node, pNode, level + 1, index));
    }
  };

  if (rootAsChildren) {
    if (root && root.length) {
      root.forEach((node, index) => processNode(node, null, level, index));
    }
  } else {
    if (skipRoot) {
      processChildren(root, level);
    } else {
      processNode(root, null, level, -1);
    }
  }
}

