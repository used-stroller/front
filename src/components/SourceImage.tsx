import styles from "@/styles/page.module.css";
import Image from "next/image";
import type { ReactElement } from "react";

export default function SourceImage({
  source,
}: {
  source: string;
}): ReactElement {
  switch (source) {
    case "BUNJANG":
      return (
        <Image
          src="./images/bunge_market_logo.svg"
          alt="bunge_market_logo"
          className={styles.sourceImg}
          width={15}
          height={15}
        />
      );
    case "CARROT":
      return (
        <Image
          src="./images/carrot_market_logo.svg"
          alt="carrot_market_logo"
          className={styles.sourceImg}
          width={11.54}
          height={19.73}
        />
      );
    case "JUNGGO":
      return (
        <Image
          src="./images/junggo_market_logo.svg"
          alt="junggo_market_logo"
          className={styles.sourceImg}
          width={16}
          height={16}
        />
      );
    case "SECOND":
      return (
        <Image
          src="./images/hello_market_logo.svg"
          alt="secondwear_logo"
          className={styles.sourceImg}
          width={16}
          height={16}
        />
      );
    case "NAVER":
      return (
        <Image
          src="./images/naver_shopping_logo.svg"
          alt="naver_shopping_logo"
          className={styles.sourceImg}
          width={13}
          height={13}
        />
      );
    default:
      return <i />;
  }
}
