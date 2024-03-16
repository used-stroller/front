import React, { type ReactElement } from "react";
import styles from "@/styles/page.module.css";
import Image from "next/image";
import Link from "next/link";
import SourceImage from "./SourceImage";
import FormattedPrice from "./FormattedPrice";
import ProductImage from "@/components/ProductImage";
import { type Content } from "@/types";

function formatDate(date: string): string {
  return date?.replaceAll(/^20/g, "").replaceAll("-", ".");
}

export default function Product({
  content,
}: {
  content: Content;
}): ReactElement {
  return (
    <div className={styles.product}>
      <div className={styles.product_img}>
        <Link
          href={content.link}
          className={styles.product_link}
          target={"_self"}
        >
          <ProductImage content={content} />
        </Link>
        <div className={styles.source_wrapper}>
          <div className={styles.source_logo}>
            <SourceImage source={content.sourceType} />
          </div>
        </div>
      </div>
      <div className={styles.title_price_wrapper}>
        <span className={styles.title}>{content.title}</span>
        <FormattedPrice value={content.price} />
      </div>
      <i className={styles.separator} />
      <div className={styles.address_date_wrapper}>
        <div className={styles.address_wrapper}>
          <Image
            src="./images/icon_map.svg"
            alt="icon_map"
            width={7}
            height={10}
          />
          <span className={styles.region}>{content.region}</span>
        </div>
        <span>{formatDate(content.uploadDate)}</span>
      </div>
    </div>
  );
}
