import { vnode, VNode, VNodeData } from "./vnode";
import * as is from "./is";

export type VNodes = VNode[];
export type VNodeChildElement =
  | VNode
  | string
  | number
  | String
  | Number
  | undefined
  | null;
export type ArrayOrElement<T> = T | T[];
export type VNodeChildren = ArrayOrElement<VNodeChildElement>;

export function addNS(
  data: any,
  children: Array<VNode | string> | undefined,
  sel: string | undefined
): void {
  data.ns = "http://www.w3.org/2000/svg";
  if (sel !== "foreignObject" && children !== undefined) {
    for (let i = 0; i < children.length; ++i) {
      const child = children[i];
      if (typeof child === "string") continue;
      const childData = child.data;
      if (childData !== undefined) {
        addNS(childData, child.children as VNodes, child.sel);
      }
    }
  }
}
// 定义函数的重载
export function h(sel: string): VNode;
export function h(sel: string, data: VNodeData | null): VNode;
export function h(sel: string, children: VNodeChildren): VNode;
export function h(
  sel: string,
  data: VNodeData | null,
  children: VNodeChildren
): VNode;
// 函数的实现
export function h(sel: any, b?: any, c?: any): VNode {
  let data: VNodeData = {};
  let children: any;
  let text: any;
  let i: number;
  // 处理参数，实现重载的机制
  if (c !== undefined) {
    // 处理三个参数的情况
    // sel、data、children/text
    if (b !== null) {
      data = b;
    }
    if (is.array(c)) {
      children = c;
      // 如果 c 是字符串或者数字
    } else if (is.primitive(c)) {
      text = c.toString();
      // 如果 c 是 VNode
    } else if (c && c.sel) {
      children = [c];
    }
  } else if (b !== undefined && b !== null) {
    // 处理两个参数的情况
    // 如果 b 是数组
    if (is.array(b)) {
      children = b;
      // 如果 b 是字符串或者数字
    } else if (is.primitive(b)) {
      text = b.toString();
      // 如果 b 是 VNode
    } else if (b && b.sel) {
      children = [b];
    } else {
      data = b;
    }
  }
  if (children !== undefined) {
    // 处理 children 中的原始值（string/number）
    for (i = 0; i < children.length; ++i) {
      // 如果 child 是 string/number，创建文本节点
      if (is.primitive(children[i]))
        children[i] = vnode(
          undefined,
          undefined,
          undefined,
          children[i],
          undefined
        );
    }
  }
  if (
    sel[0] === "s" &&
    sel[1] === "v" &&
    sel[2] === "g" &&
    (sel.length === 3 || sel[3] === "." || sel[3] === "#")
  ) {
    // 如果是 svg ，添加命名空间
    addNS(data, children, sel);
  }
  // 返回 VNode
  return vnode(sel, data, children, text, undefined);
}

/**
 * @experimental
 */
export function fragment(children: VNodeChildren): VNode {
  let c: any;
  let text: any;

  if (is.array(children)) {
    c = children;
  } else if (is.primitive(c)) {
    text = children;
  } else if (c && c.sel) {
    c = [children];
  }

  if (c !== undefined) {
    for (let i = 0; i < c.length; ++i) {
      if (is.primitive(c[i]))
        c[i] = vnode(undefined, undefined, undefined, c[i], undefined);
    }
  }

  return vnode(undefined, {}, c, text, undefined);
}
