import styles from '../styles/page.module.css';
import { getProductList } from '@/utils/productUtils';
import Link from 'next/link';
import Image from 'next/image';
import SimpleFilters from './components/SimpleFilters';
import Product from './components/Product';
import Filters from './components/Filters';
import type { Filter } from './types';

export default async function Home(): Promise<JSX.Element> {
  const filter: Filter = {
    page: 0,
    size: 50,
  };
  const productList = await getProductList({ filter });
  const year = new Date().getFullYear();

  return (
    <div className='main'>
      <div className={styles.header_wrapper}>
        <div className={styles.logo}></div>
        <div className={styles.search_bar}>
          <input type='text' placeholder='검색어를 입력하세요' />
          <Image
            src='/images/search_button.svg'
            className={styles.search_button}
            alt='search button'
            width={20}
            height={20}
          />
        </div>
      </div>

      <Filters />
      <SimpleFilters />

      <div className={styles.contents}>
        <div className={styles.search_result_wrapper}>
          <div className={styles.search_result}>
            <span className={styles.keyword}>스토케</span>
            검색결과 <span className={styles.result_qty}>12345</span> 개
          </div>
          <div className={styles.second_filter}>
            <button className={styles.second_filter_active}>최신순</button>
            <button>저가순</button>
            <button>고가순</button>
          </div>
        </div>
        <div className={styles.ad_banner}>
          <Link href={''} className={styles.ad_banner_link}>
            <Image src='/images/ad_example.jpg' alt='ads' fill priority />
          </Link>
        </div>
        <div className={styles.product_list_container}>
          {productList.content.map((product) => (
            <Product content={product} key={product.id} />
          ))}
        </div>
      </div>

      <div className={styles.footer}>
        <i className={styles.separator} />
        <div className={styles.footer_wrapper}>
          <p className={styles.address}>
            제휴 및 기타 문의
            <a href='mailto:hoonyhoeny@gmail.com'>hoonyhoeny@gmail.com</a>
          </p>
          <p>Copyright © {year} 중모차</p>
        </div>
      </div>
    </div>
  );
}
