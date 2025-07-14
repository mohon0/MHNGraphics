import {
  BubbleMenuPlugin,
  BubbleMenuPluginProps,
} from "@tiptap/extension-bubble-menu";
import clsx from "clsx";
import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type BubbleMenuProps = Omit<
  Optional<BubbleMenuPluginProps, "pluginKey" | "editor">,
  "element"
> & {
  className?: string;
  children: React.ReactNode;
};

export const BubbleMenu = ({
  editor,
  className,
  children,
  ...props
}: BubbleMenuProps) => {
  const menuEl = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!editor || editor.isDestroyed) return;

    // Create menu element if not already created
    if (!menuEl.current) {
      menuEl.current = document.createElement("div");
      document.body.appendChild(menuEl.current);
    }

    const {
      pluginKey = "bubbleMenu",
      tippyOptions = {},
      updateDelay,
      shouldShow = null,
    } = props;

    const plugin = BubbleMenuPlugin({
      updateDelay,
      editor,
      element: menuEl.current,
      pluginKey,
      shouldShow,
      tippyOptions,
    });

    editor.registerPlugin(plugin);

    return () => {
      editor.unregisterPlugin(pluginKey);
      if (menuEl.current?.parentNode) {
        menuEl.current.parentNode.removeChild(menuEl.current);
      }
    };
  }, [editor, props]);

  if (!menuEl.current) return null; // Ensure menuEl exists before rendering

  return createPortal(
    <div className={clsx("rounded bg-background shadow-sm", className)}>
      {children}
    </div>,
    menuEl.current,
  );
};
