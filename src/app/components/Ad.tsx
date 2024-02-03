import styles from '@/styles/page.module.css'
import Link from 'next/link'
import Image from 'next/image'

const sponsorAd = {
  isView: false,
  title: '',
  link: '',
  image: '/images/ad_example.jpg'
}

const Ad = (): JSX.Element | boolean => {
  return (
    <div className={sponsorAd.isView ? styles.ad_banner : styles.ad_empty}>
      {sponsorAd.isView
        ? <Link href={sponsorAd.link} className={styles.ad_banner_link}>
        <Image src={sponsorAd.image} alt={sponsorAd.title} fill priority/>
      </Link>
        : <p>제휴 및 기타 문의 <Link href={'mailto://hoonyhoeny@gmail.com'}>hoonyhoeny@gmail.com</Link></p>}
    </div>
  )
}

export default Ad
