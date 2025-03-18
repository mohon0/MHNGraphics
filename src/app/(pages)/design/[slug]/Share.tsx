"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Check, Copy, Instagram, QrCode, Share2 } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";
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
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

interface PageProps {
  params: { slug: string };
}

export default function Share({ params }: PageProps) {
  const [name] = params.slug;
  const siteurl = process.env.NEXT_PUBLIC_SITE_URL;

  const postlink = `${siteurl}/design/${params.slug}`;

  const title = `Check out this design: ${name}`;

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(postlink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInstagramShare = () => {
    window.open("https://www.instagram.com/", "_blank");
    handleCopy();
  };

  const handleQRCodeCopy = () => {
    const svg = document.querySelector(".qr-code svg");
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
          if (blob) {
            navigator.clipboard.write([
              new ClipboardItem({ "image/png": blob }),
            ]);
          }
        });
      };
      img.src = "data:image/svg+xml;base64," + btoa(svgData);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex h-16 items-center justify-center gap-2 border-zinc-300/80 bg-white/50 transition-all hover:border-zinc-400 hover:bg-white dark:border-zinc-700/80 dark:bg-zinc-800/50 dark:hover:border-zinc-600 dark:hover:bg-zinc-800"
        >
          <Share2 className="h-5 w-5 text-zinc-700 dark:text-zinc-300" />
          <span>Share</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-zinc-900 dark:text-white">
            Share This Design
          </DialogTitle>
          <DialogDescription className="text-zinc-500 dark:text-zinc-400">
            Share this design on your favorite platform or copy the link.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="social" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-zinc-100 dark:bg-zinc-800">
            <TabsTrigger
              value="social"
              className="data-[state=active]:bg-white data-[state=active]:text-zinc-900 dark:data-[state=active]:bg-zinc-900 dark:data-[state=active]:text-white"
            >
              Social
            </TabsTrigger>
            <TabsTrigger
              value="link"
              className="data-[state=active]:bg-white data-[state=active]:text-zinc-900 dark:data-[state=active]:bg-zinc-900 dark:data-[state=active]:text-white"
            >
              Link
            </TabsTrigger>
            <TabsTrigger
              value="qr"
              className="data-[state=active]:bg-white data-[state=active]:text-zinc-900 dark:data-[state=active]:bg-zinc-900 dark:data-[state=active]:text-white"
            >
              QR Code
            </TabsTrigger>
          </TabsList>
          <TabsContent value="social">
            <div className="grid grid-cols-5 gap-4 py-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700">
                <FacebookShareButton url={postlink} title={title}>
                  <FacebookIcon size={24} round />
                </FacebookShareButton>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700">
                <TwitterShareButton url={postlink} title={title}>
                  <TwitterIcon size={24} round />
                </TwitterShareButton>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700">
                <LinkedinShareButton url={postlink} title={title}>
                  <LinkedinIcon size={24} round />
                </LinkedinShareButton>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700">
                <WhatsappShareButton url={postlink} title={title}>
                  <WhatsappIcon size={24} round />
                </WhatsappShareButton>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700">
                <RedditShareButton url={postlink} title={title}>
                  <RedditIcon size={24} round />
                </RedditShareButton>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700">
                <TelegramShareButton url={postlink} title={title}>
                  <TelegramIcon size={24} round />
                </TelegramShareButton>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700">
                <EmailShareButton
                  url={postlink}
                  subject={title}
                  body="I thought you might be interested in this design:"
                >
                  <EmailIcon size={24} round />
                </EmailShareButton>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700">
                <PinterestShareButton
                  url={postlink}
                  media={`${siteurl}/og-image.jpg`}
                  description={title}
                >
                  <PinterestIcon size={24} round />
                </PinterestShareButton>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700">
                <Button
                  variant="ghost"
                  className="h-full w-full rounded-full p-0"
                  onClick={handleInstagramShare}
                >
                  <Instagram size={24} />
                </Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="link">
            <div className="flex flex-col space-y-4 py-4">
              <Textarea
                value={postlink}
                readOnly
                className="min-h-[80px] resize-none border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800"
              />
              <Button
                onClick={handleCopy}
                className="w-full bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-700 dark:hover:bg-zinc-600"
              >
                {copied ? (
                  <>
                    <Check className="mr-2 h-4 w-4" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" /> Copy Link
                  </>
                )}
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="qr">
            <div className="flex flex-col items-center justify-center py-6">
              <div className="qr-code rounded-lg bg-white p-4 shadow-md dark:bg-zinc-100">
                <QRCodeSVG value={postlink} size={200} />
              </div>
              <Button
                onClick={handleQRCodeCopy}
                className="mt-6 bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-700 dark:hover:bg-zinc-600"
              >
                <QrCode className="mr-2 h-4 w-4" /> Copy QR Code
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
