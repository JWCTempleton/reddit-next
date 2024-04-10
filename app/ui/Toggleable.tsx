"use client";
import {
  JSXElementConstructor,
  PromiseLikeOfReactNode,
  ReactElement,
  ReactNode,
  ReactPortal,
  forwardRef,
  useImperativeHandle,
  useState,
  useRef,
} from "react";
import { Button } from "./Button";

export const Toggleable = forwardRef(
  (
    props: {
      buttonLabel: string;
      children:
        | string
        | number
        | boolean
        | ReactElement<any, string | JSXElementConstructor<any>>
        | Iterable<ReactNode>
        | ReactPortal
        | PromiseLikeOfReactNode
        | null
        | undefined;
    },
    refs
  ) => {
    const [visible, setVisible] = useState(false);

    const hideWhenVisible = { display: visible ? "none" : "" };
    const showWhenVisible = { display: visible ? "" : "none" };

    useImperativeHandle(refs, () => {
      return {
        toggleVisibility,
      };
    });

    const toggleVisibility = () => {
      setVisible(!visible);
    };

    return (
      <div className="flex">
        <div style={hideWhenVisible}>
          <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
        </div>
        <div style={showWhenVisible}>
          {props.children}
          <div className="flex space-between w-[100%]">
            <Button
              onClick={toggleVisibility}
              className="bg-red-500 hover:bg-red-600 justify-items-end"
            >
              cancel
            </Button>
          </div>
        </div>
      </div>
    );
  }
);

export default Toggleable;
