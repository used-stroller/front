import styles from '@/styles/page.module.css'
import Link from 'next/link'
import Image from 'next/image'

const Ad = (): JSX.Element => {
  return (
    <div className={styles.ad_banner}>
      <Link href={''} className={styles.ad_banner_link}>
        <Image src='/images/ad_example.jpg' alt='ads' fill priority/>
      </Link>
    </div>
  )
}

export default Ad
