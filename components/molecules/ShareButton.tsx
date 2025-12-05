"use client";

import React, { useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Share2, Check, Copy, Twitter, Facebook } from "lucide-react";

interface ShareButtonProps {
  title: string;
  text?: string;
  url?: string;
}

export const ShareButton: React.FC<ShareButtonProps> = ({
  title,
  text,
  url,
}) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareUrl = url || window.location.href;
    const shareData = {
      title: title,
      text: text || `Check out ${title} on Media Search Engine!`,
      url: shareUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          console.error("Error sharing:", err);
        }
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    }
  };

  return (
    <Button
      variant="secondary"
      className="flex items-center gap-2"
      onClick={handleShare}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4" />
          <span>¡Enlace copiado!</span>
        </>
      ) : (
        <>
          <Share2 className="w-4 h-4" />
          <span>Compartir</span>
        </>
      )}
    </Button>
  );
};
