/* eslint-disable @next/next/no-img-element */

import type { ImgHTMLAttributes } from "react";

const photoWidths: Record<string, number> = {
  "campus-bougainvillea.jpg": 1650,
  "campus-cat.jpg": 1650,
  "campus-christmas.jpg": 1650,
  "campus-court-at-dusk.jpg": 1650,
  "campus-dessert-moment.jpg": 1650,
  "campus-fireworks.jpg": 1238,
  "campus-green-corridor.jpg": 2200,
  "campus-green-facade.jpg": 1650,
  "campus-lunch-bowl.jpg": 1650,
  "campus-starlight-stairs.jpg": 1650,
  "campus-sunset.jpg": 2200,
  "campus-tree-canopy.jpg": 2200,
  "student-camp-stage.jpg": 2200,
  "student-community.jpg": 2200,
  "student-dance.jpg": 2200,
  "student-forum.jpg": 2200,
  "student-market-fair.jpg": 2200,
  "student-theatre.jpg": 2200,
  "teacher-student-workshop.jpg": 2200,
};

type SmartImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt"> & {
  src: string;
  alt: string;
};

export function SmartImage({ src, alt, sizes, ...props }: SmartImageProps) {
  const fileName = src.split("/").at(-1) ?? "";
  const sourceWidth = photoWidths[fileName];
  const responsiveSource = sourceWidth
    ? `${src.slice(0, src.lastIndexOf("/") + 1)}mobile/${fileName}`
    : undefined;

  return (
    <img
      {...props}
      src={src}
      alt={alt}
      srcSet={
        responsiveSource
          ? `${responsiveSource} 960w, ${src} ${sourceWidth}w`
          : undefined
      }
      sizes={
        responsiveSource
          ? sizes ?? "(max-width: 720px) 100vw, 70vw"
          : sizes
      }
    />
  );
}
