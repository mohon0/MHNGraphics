'use client';
import { useEditorState } from '@tiptap/react';
import type React from 'react';
import type { CSSProperties } from 'react';
import { BiSolidColorFill } from 'react-icons/bi';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import ColorPicker from '../color-picker';
import { useTiptapContext } from '../Provider';

const TextHighlightButton: React.FC = () => {
  const { editor } = useTiptapContext();

  const state = useEditorState({
    editor,
    selector: (ctx) => ({
      color: ctx.editor.getAttributes('highlight').color || 'DEFAULT',
      disabled: !ctx.editor.can().setHighlight(),
    }),
  });

  const highlightBarStyle: CSSProperties = {
    position: 'absolute',
    bottom: 2,
    left: 4,
    right: 4,
    height: 4,
    borderRadius: 4,
    pointerEvents: 'none',
    background: state.color === 'DEFAULT' ? 'transparent' : state.color,
    border: state.color === 'DEFAULT' ? '1px solid hsl(var(--border))' : 'none',
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant='ghost'
                  size='icon'
                  type='button'
                  disabled={state.disabled}
                  aria-label='Highlight color'
                  className='relative'
                >
                  <BiSolidColorFill size={20} />
                  {/* Render the indicator directly inside the button */}
                  <div style={highlightBarStyle} />
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-2'>
                <ColorPicker
                  color={state.color}
                  onChange={(color) =>
                    editor.chain().focus().setHighlight({ color }).run()
                  }
                  onReset={() => editor.chain().focus().unsetHighlight().run()}
                />
              </PopoverContent>
            </Popover>
          </div>
        </TooltipTrigger>
        <TooltipContent>Highlight Color (Ctrl+Shift+H)</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TextHighlightButton;
