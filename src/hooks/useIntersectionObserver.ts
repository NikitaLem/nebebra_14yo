import { useLayoutEffect, useEffect } from "react";
import { intersectionObserver } from "../helpers";

export const useIntersectionObserver = (
  f: () => void,
  root: Element | null,
  target?: Element | null
) => {
  useEffect(() => {
    console.log(root);
    // console.log("root", root);
    // console.log("target", target);

    // if (!root || !target) {
    //   return;
    // }

    // const observer = new IntersectionObserver(f, {
    //   root,
    //   rootMargin: "0px",
    //   threshold: 1.0,
    // });
    // observer.observe(target);

    // return observer.disconnect();

    if (root && target) {
      intersectionObserver(f, root);
    }
  }, [root, target, f]);
};
