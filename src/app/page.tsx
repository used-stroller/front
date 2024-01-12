import styles from '../styles/page.module.css'
import Link from 'next/link'
import { getProductList } from '@/utils/getProductList';
import SourceImage from './components/SourceImage';
import FormattedPrice from './components/FormattedPrice';

export default async function Home() {

const productList= await getProductList()

  return (
  <>
  <div className='main'>
       <div className={styles.logo_box}>
        <img className={styles.logo_image} src="/images/logo.png"/>
      </div>
      <div className={styles.search_bar}>
        <input placeholder='스토케'/>
        <img src="/images/search_button.png" className={styles.search_button}/>
      </div>
      <div className={styles.filter_container}>
        <ul>
          <li className={styles.filter_title}>
            <select className={styles.filter_detail}>
              <option value="브랜드">브랜드</option>
              <option value="yoyo">RYAN</option>
              <option value="yoyo">오이스터</option>
              <option value="yoyo">부가부</option>
              <option value="yoyo">타보</option>
              <option value="yoyo">스토케</option>
              <option value="yoyo">에그</option>
              <option value="yoyo">와이업</option>
              <option value="yoyo">잉글레시나</option>
              <option value="yoyo">씨투엠뉴</option>
              <option value="yoyo">실버크로스</option>
              <option value="yoyo">오르빗베이비</option>
              <option value="yoyo">SEEC</option>
              <option value="yoyo">다이치</option>
              <option value="yoyo">싸이벡스</option>
              <option value="yoyo">뉴나</option>
              <option value="yoyo">엔픽스</option>
            </select>
          </li>
          <li className={styles.filter_title}>
            <select className={styles.filter_detail}>
              <option value="dd">가격</option>
              <option value="dd">0~10만원</option>
              <option value="dd">10만원~30만원</option>
              <option value="dd">30만원~50만원</option>
              <option value="dd">50만원이상</option>
            </select>
          </li>
          <li className={styles.filter_title}>
            <select>
              <option value="">동네</option>
            </select>
          </li>
          <li className={styles.filter_title}>
            <select>
              <option value="">기간</option>
            </select>
          </li>
          <li className={styles.filter_title}>
            <select>
              <option value="">사이트별</option>
              <option value="">당근</option>
              <option value="">중고나라</option>
              <option value="">번개장터</option>
              <option value="">세컨웨어</option>
            </select>
          </li>
        </ul>
      </div>
      <div>
        <div>
          <span className={styles.keyword}>스토케</span>
          <span>검색결과</span>
          <span className={styles.result_qty}>123</span>
          <span>개</span>
        </div>
        <div className={styles.second_filter}>
          <button>최신순</button>
          <button>저가순</button>
          <button>고가순</button>
        </div>
        <div className={styles.ad_banner}>
          <img src="/images/ad_example.png"></img>
        </div>
        <div className={styles.product_list_container}>
              {productList.content.map(product=>(
              <div className={styles.product}>
                <div className={styles.product_img}>
                  <img src={product.imgSrc} className={styles.image}/>
                  <SourceImage source={product.sourceType}></SourceImage>
                </div>
                <div className={styles.title_price_div}>
                  <span className={styles.title}>{product.title}</span>
                  <FormattedPrice value={product.price}></FormattedPrice>
                </div>
                <div className={styles.separator}></div>
                <div className={styles.address_date_div}>
                  <span className={styles.icon_map}><img src="/images/icon_map.png"/></span>
                  <span className={styles.address}>{product.address}</span>
                  <span className={styles.uploadDate}>3주전</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  </>
  )
}
