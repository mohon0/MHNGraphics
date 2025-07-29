'use client';

import { Check, Copy, Instagram, QrCode, Share2 } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import type React from 'react';
import { useState } from 'react';
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  PinterestIcon,
  PinterestShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TumblrIcon,
  TumblrShareButton,
  TwitterIcon,
  TwitterShareButton,
  ViberIcon,
  ViberShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

interface ShareDialogProps {
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
}

export default function ShareDialog({
  title,
  description,
  url,
  imageUrl = '/og-image.jpg',
  variant = 'outline',
  size = 'default',
  className = '',
}: ShareDialogProps) {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success('Link copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInstagramShare = () => {
    window.open('https://www.instagram.com/', '_blank');
    handleCopy();
    toast.success('Link copied for Instagram sharing');
  };

  const handleQRCodeCopy = () => {
    const svg = document.querySelector('.qr-code svg');
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
          if (blob) {
            navigator.clipboard.write([
              new ClipboardItem({ 'image/png': blob }),
            ]);
            toast.success('QR code copied to clipboard');
          }
        });
      };
      // biome-ignore lint: error
      img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
    }
  };

  const ShareButton = ({ children }: { children: React.ReactNode }) => (
    <div className='bg-muted hover:bg-muted/80 flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 hover:scale-110'>
      {children}
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className={`gap-1.5 transition-all duration-300 hover:scale-105 ${className}`}
        >
          <Share2 className='h-4 w-4' />
          <span>Share</span>
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Share on your favorite platform or copy the link.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue='social' className='w-full'>
          <TabsList className='grid w-full grid-cols-3'>
            <TabsTrigger value='social'>Social</TabsTrigger>
            <TabsTrigger value='link'>Link</TabsTrigger>
            <TabsTrigger value='qr'>QR Code</TabsTrigger>
          </TabsList>
          <TabsContent value='social'>
            <div className='grid grid-cols-5 gap-4 py-4'>
              <ShareButton>
                <FacebookShareButton
                  url={url}
                  title={description}
                  onClick={() => toast.success('Shared on Facebook')}
                >
                  <FacebookIcon size={24} round />
                </FacebookShareButton>
              </ShareButton>
              <ShareButton>
                <TwitterShareButton
                  url={url}
                  title={description}
                  onClick={() => toast.success('Shared on Twitter')}
                >
                  <TwitterIcon size={24} round />
                </TwitterShareButton>
              </ShareButton>
              <ShareButton>
                <LinkedinShareButton
                  url={url}
                  title={description}
                  onClick={() => toast.success('Shared on LinkedIn')}
                >
                  <LinkedinIcon size={24} round />
                </LinkedinShareButton>
              </ShareButton>
              <ShareButton>
                <WhatsappShareButton
                  url={url}
                  title={description}
                  onClick={() => toast.success('Shared on WhatsApp')}
                >
                  <WhatsappIcon size={24} round />
                </WhatsappShareButton>
              </ShareButton>
              <ShareButton>
                <RedditShareButton
                  url={url}
                  title={description}
                  onClick={() => toast.success('Shared on Reddit')}
                >
                  <RedditIcon size={24} round />
                </RedditShareButton>
              </ShareButton>
              <ShareButton>
                <TelegramShareButton
                  url={url}
                  title={description}
                  onClick={() => toast.success('Shared on Telegram')}
                >
                  <TelegramIcon size={24} round />
                </TelegramShareButton>
              </ShareButton>
              <ShareButton>
                <EmailShareButton
                  url={url}
                  subject={title}
                  body={`I thought you might be interested in this: ${description}`}
                  onClick={() => toast.success('Shared via Email')}
                >
                  <EmailIcon size={24} round />
                </EmailShareButton>
              </ShareButton>
              <ShareButton>
                <PinterestShareButton
                  url={url}
                  media={imageUrl}
                  description={description}
                  onClick={() => toast.success('Shared on Pinterest')}
                >
                  <PinterestIcon size={24} round />
                </PinterestShareButton>
              </ShareButton>
              <ShareButton>
                <TumblrShareButton
                  url={url}
                  title={description}
                  onClick={() => toast.success('Shared on Tumblr')}
                >
                  <TumblrIcon size={24} round />
                </TumblrShareButton>
              </ShareButton>
              <ShareButton>
                <ViberShareButton
                  url={url}
                  title={description}
                  onClick={() => toast.success('Shared on Viber')}
                >
                  <ViberIcon size={24} round />
                </ViberShareButton>
              </ShareButton>
              <ShareButton>
                <Button
                  variant='ghost'
                  className='h-full w-full rounded-full p-0'
                  onClick={handleInstagramShare}
                >
                  <Instagram size={24} />
                </Button>
              </ShareButton>
            </div>
          </TabsContent>
          <TabsContent value='link'>
            <div className='flex flex-col space-y-2 py-4'>
              <Textarea
                value={url}
                readOnly
                className='min-h-[80px] resize-none'
              />
              <Button onClick={handleCopy} className='w-full'>
                {copied ? (
                  <>
                    <Check className='mr-2 h-4 w-4' /> Copied
                  </>
                ) : (
                  <>
                    <Copy className='mr-2 h-4 w-4' /> Copy Link
                  </>
                )}
              </Button>
            </div>
          </TabsContent>
          <TabsContent value='qr'>
            <div className='flex flex-col items-center justify-center py-4'>
              <div className='qr-code rounded-lg bg-white p-4 shadow-md'>
                <QRCodeSVG value={url} size={200} />
              </div>
              <Button onClick={handleQRCodeCopy} className='mt-4'>
                <QrCode className='mr-2 h-4 w-4' /> Copy QR Code
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
