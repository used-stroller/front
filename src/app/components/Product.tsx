import React from 'react';
import styles from '@/styles/page.module.css';
import Image from 'next/image';
import Link from 'next/link';
import SourceImage from './SourceImage';
import FormattedPrice from './FormattedPrice';
import { getImageUrl } from '@/utils/productUtils';

export default function Product({ content }): JSX.Element {
  return (
    <div className={styles.product}>
      <div className={styles.product_img}>
        <Link href={content.link} className={styles.product_link} target={'_blank'}>
          <Image
            src={getImageUrl(content.imgSrc)}
            alt={content.title}
            fill
            sizes='200px, 200px'
          />
        </Link>
        <div className={styles.source_wrapper}>
          <div className={styles.source_logo}>
            <SourceImage source={content.sourceType}></SourceImage>
          </div>
        </div>
      </div>
      <div className={styles.title_price_wrapper}>
        <span className={styles.title}>{content.title}</span>
        <FormattedPrice value={content.price}></FormattedPrice>
      </div>
      <i className={styles.separator} />
      <div className={styles.address_date_wrapper}>
        <div className={styles.address_wrapper}>
          <Image
            src='/images/icon_map.svg'
            alt='icon_map'
            width={7}
            height={10}
          />
          <span className={styles.region}>{content.region}</span>
        </div>
        <span className={styles.uploadDate}>3주전</span>
      </div>
    </div>
  );
}
