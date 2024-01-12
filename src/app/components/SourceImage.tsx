
import styles from '@/styles/page.module.css'

type Props = { 
    source : string
}

export default function SourceImage({source} : Props){
        if(source==='BUNJANG'){
            return <img src="images/bunge_market.png" className={styles.sourceImg}/>
        }
        if(source==='CARROT'){
            return <img src="images/carrot_market.png" className={styles.sourceImg}/>
        }
        if(source==='JUNGGO'){
            return <img src="images/junggo_market.png" className={styles.sourceImg}/>
        }
        if(source==='HELLO'){
            return <img src="images/hello_market.png" className={styles.sourceImg}/>
        }
        
}