import { HeroPropsType } from "@/types/types";
import Image from "next/image";

export default function Hero(props: HeroPropsType) {
  const { publicUrl, bannerData, title } = props;

  return (
    <div role="banner" className="banner">
      {bannerData && (
        <Image
          className="hero"
          src={publicUrl}
          alt={bannerData.alternativeText}
          width={0}
          height={0}
          loading={"eager"}
          unoptimized={true}//{process.env.NODE_ENV === "development"}
        />
      )}
      <div className="skeleton">
        <h1>{title}</h1>
      </div>
    </div>
  );
}
