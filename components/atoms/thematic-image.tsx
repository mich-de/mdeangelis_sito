"use client";

import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";
import { THEMATIC_PLACEHOLDERS, ThematicPlaceholderType } from "@/utils/placeholders";

interface ThematicImageProps extends Omit<ImageProps, "placeholder" | "blurDataURL"> {
    theme?: ThematicPlaceholderType;
    blurDataURL?: string; // Allow override
}

export function ThematicImage({
    src,
    alt,
    theme = "default",
    className,
    blurDataURL,
    ...props
}: ThematicImageProps) {
    const placeholderSrc = blurDataURL || THEMATIC_PLACEHOLDERS[theme] || THEMATIC_PLACEHOLDERS.default;

    return (
        <div className={cn("relative overflow-hidden", className)}>
            <Image
                src={src}
                alt={alt}
                className={cn("duration-700 ease-in-out transition-all scale-100 blur-0 grayscale-0", "hover:scale-105")}
                placeholder="blur"
                blurDataURL={placeholderSrc}
                {...props}
            />
        </div>
    );
}
