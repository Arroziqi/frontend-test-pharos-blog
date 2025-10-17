import React from "react";
import Image from "next/image";
import Label from "@/components/label/Label";
import Author from "@/components/Author";
import { Typography } from "@/components/Typography";
import { colorTheme } from "@/components/style-guide/colorTheme";
import { truncateText } from "@/components/style-guide/utils";

export interface CardHeroProps extends React.ComponentPropsWithoutRef<"div"> {
  imageUrl?: string;
  category?: string;
  title?: string;
  date?: string;
  description?: string;
  author?: string;
  authorImage?: string;
  authorUrl?: string;
}

function CardHero({
  imageUrl,
  category,
  title,
  date,
  description,
  authorUrl,
  author,
  authorImage,
  ...props
}: CardHeroProps) {
  return (
    <div
      {...props}
      className={`rounded-xl relative w-full xl:mb-10 ${props.className ?? ""}`}
    >
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={"image photo"}
          width={300}
          height={200}
          className={"w-full"}
        />
      )}

      <div
        className="flex flex-col gap-1 absolute bottom-0 left-0 w-10/12 p-4 border-none xl:border-border xl:border xl:max-w-lg xl:bg-background xl:p-4 xl:gap-2 xl:left-8 xl:-bottom-8 xl:rounded-xl"
        style={{ borderColor: colorTheme.dark.border }}
      >
        {category && <Label variant={"primary"}>{category}</Label>}

        {title && (
          <Typography
            variant={"h4"}
            component={"h4"}
            className={
              "line-clamp-2 xl:line-clamp-3 text-white xl:text-foreground"
            }
          >
            {title}
          </Typography>
        )}

        {description && (
          <Typography
            variant={"bodySm"}
            className={"text-white xl:text-foreground"}
          >
            {truncateText(description)}
          </Typography>
        )}

        <div className="flex items-center gap-6">
          {author && (
            <Author src={authorImage} href={authorUrl} alt={author}>
              {author}
            </Author>
          )}

          {date && (
            <Typography
              variant={"bodySm"}
              style={{ color: colorTheme.dark.secondary400 }}
            >
              {date}
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
}

export default CardHero;
