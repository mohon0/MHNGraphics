'use client';
import { useEditorState } from '@tiptap/react';
import { Palette } from 'lucide-react';
import type React from 'react';
import type { CSSProperties } from 'react'; // Removed useRef
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
// Removed useMount import if not used elsewhere
import { useTiptapContext } from '../Provider';

const TextColorButton: React.FC = () => {
  const { editor } = useTiptapContext();

  const state = useEditorState({
    editor,
    selector: (ctx) => ({
      color: ctx.editor.getAttributes('textStyle').color || 'DEFAULT',
      disabled: !ctx.editor.can().setColor(''),
    }),
  });

  const colorBarStyle: CSSProperties = {
    position: 'absolute',
    bottom: '4px', // Slightly up from the very edge
    left: '15%',
    right: '15%',
    height: '3px',
    borderRadius: '2px',
    pointerEvents: 'none',
    zIndex: 10,
    background: state.color === 'DEFAULT' ? 'currentColor' : state.color,
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          {/* div wrapper is kept to prevent Tooltip/Popover trigger conflicts */}
          <div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant='ghost'
                  size='icon'
                  type='button'
                  disabled={state.disabled}
                  aria-label='Text color'
                  className='relative' // Better than inline style for Tailwind setups
                >
                  <Palette size={16} />
                  <div style={colorBarStyle} />
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-2' side='bottom'>
                <ColorPicker
                  color={state.color}
                  onChange={(color) =>
                    editor.chain().focus().setColor(color).run()
                  }
                  onReset={() => editor.chain().focus().unsetColor().run()}
                />
              </PopoverContent>
            </Popover>
          </div>
        </TooltipTrigger>
        <TooltipContent>Color (Ctrl+Shift+C)</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TextColorButton;
