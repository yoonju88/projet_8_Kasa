import React from 'react'
import AproposBannerImage from '../Assets/apropos_banner.jpg'
import '../Styles/index.css'
import { contentList } from '../Data/contentList'
import ContentItem from './AproposItem'
import Banner from './Banner'

function APropos(){
    const bannerImage = AproposBannerImage
    const bannerAlt= 'Apropos banner image'
    const bannerTitle =''
    
    return (
        <section className='apropos'>
            <Banner bannerImage={bannerImage} bannerTitle={bannerTitle} alt={bannerAlt}/>
            <div className='apropos_list'>
                {contentList.map(content =>(
                    <ContentItem key={content.id}
                    title={content.title}
                    description={content.content} />
                ))}              
            </div>     
        </section>
    )        
}

export default APropos