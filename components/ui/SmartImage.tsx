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
  "scie-antuoshan-landmark.webp": 2400,
  "scie-basketball-court.webp": 2400,
  "scie-bougainvillea-light.webp": 2400,
  "scie-campus-evening.webp": 2400,
  "scie-campus-hero.webp": 2400,
  "scie-campus-walkway.webp": 2400,
  "scie-community-portrait.webp": 2400,
  "scie-expression-dialogue.webp": 2400,
  "scie-expression-fashion.webp": 2400,
  "scie-expression-stage.webp": 2400,
  "scie-food-festival.webp": 2400,
  "scie-green-corridor.webp": 2400,
  "scie-green-facade.webp": 2400,
  "scie-house-community.webp": 2400,
  "scie-house-quiz.webp": 2400,
  "scie-life-camp.webp": 2400,
  "scie-life-cat.webp": 2400,
  "scie-life-christmas.webp": 2400,
  "scie-life-creativity.webp": 2400,
  "scie-life-fashion.webp": 2400,
  "scie-life-house.webp": 2400,
  "scie-leafy-passage.webp": 2400,
  "scie-metal-house.webp": 2400,
  "scie-four-houses.webp": 2400,
  "scie-student-display-wall.webp": 2400,
  "scie-milk-tea.webp": 1800,
  "scie-mun-context.webp": 2400,
  "scie-sports-sprint.webp": 2400,
  "scie-sports-day.webp": 2400,
  "scie-reeds-sky.webp": 2400,
  "scie-shenzhen-night.webp": 2400,
  "scie-shenzhen-origin.webp": 1440,
  "scie-starlight-avenue.webp": 2400,
  "scie-victoria-harbour.webp": 2400,
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
          ? `${responsiveSource} 1080w, ${src} ${sourceWidth}w`
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
