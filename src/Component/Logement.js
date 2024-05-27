import React, { useEffect, useState} from 'react'
import '../Styles/index.css'
import { GalleriesList } from '../Data/GalleriesList'
import { useParams,useNavigate } from 'react-router-dom'
import arrowLeft from '../Assets/chevron-left-solid.svg'
import arrowRight from '../Assets/chevron-right-solid.svg'
import arrow from '../Assets/chevron-down-solid.svg'
import { FaStar } from "react-icons/fa"

function Logement() {

    const { galleryId } = useParams()
    const navigate = useNavigate()
    const gallery = GalleriesList.find(item => item.id === galleryId)

    const [bannerImageN, setBannerImageN] = useState(0)
    const [isDescriptionVisible, setIsDescriptionVisible] = useState(false)
    const [isEquipementVisible, setIsEquipementVisible] = useState(false)


    useEffect(()=>{
        if (!gallery) {
            navigate("/ErrorPage")
        }
    },[gallery, navigate])

    if (!gallery) {
        return null
    }

    
    const bannerImage = gallery.pictures[bannerImageN]
    console.log(bannerImageN)

    const increase = () => {
        setBannerImageN(bannerImageN === gallery.pictures.length - 1 ? 0 : bannerImageN + 1)
    }
    const decrease = () => {
        setBannerImageN(bannerImageN === 0 ? gallery.pictures.length - 1 : bannerImageN - 1)
    }

    const host = gallery.host
    const [firstName, lastName] = host.name.split(' ')

    
    const DescriptionVisibility = () => {
        setIsDescriptionVisible(!isDescriptionVisible)
    }
    
    const equipementVisibility = () => {
        setIsEquipementVisible(!isEquipementVisible)
    }

    const ratingByStars = () => {
        const totalStars = 5;
        const stars = [];

        for (let i = 1; i <= totalStars; i++) {
            stars.push(
                <FaStar key={i} className='star'
                    color={i <= gallery.rating ? '#ff6060' : '#f6f6f6'}
                />
            )
        }
        return <div className='stars_container'>{stars}</div>
    }
    return (
        <div className='logement'>
            <div className="logement_banner">
                <img src={bannerImage} alt={`${gallery.title} ${bannerImageN+1}`} className='logement_bannerImage' />
                <img src={arrowLeft} alt="arrow left" onClick={decrease} className='arrow arrow_left' />
                <img src={arrowRight} alt="arrow right" onClick={increase} className='arrow arrow_right' />
            </div>
            <div className='logement_content'>
                <div className='logement_content-arrange'>
                    <div className='logement_title'>
                        <h2>{gallery.title}</h2>
                        <p>{gallery.location}</p>
                    </div>
                    <div className='host'>
                        <p className='host_name'>{firstName}<br />{lastName}</p>
                        <img src={host.picture} alt={host.name} className="host_image" />
                    </div>
                </div>
                <div className='logement_content-arrange'>
                    <div className='tags'>
                        {gallery.tags.map((tag, index) => (
                            <span key={tag.toString()} className='tags_box'>
                                {tag}
                            </span>
                        ))}
                    </div>
                    <div className='rating'>
                        {ratingByStars()}
                    </div>
                </div>
                <div className='logement_content-arrange'>
                    <div className='description' >
                        <div className='title_box'>
                            <h3>Description</h3>
                            <button onClick={DescriptionVisibility}>
                                <img src={arrow} alt="arrow" className={`arrow_toggle ${isDescriptionVisible ? 'rotated' : ''}`} />

                            </button>
                        </div>
                        {isDescriptionVisible && (
                            <div className={`description_box ${isDescriptionVisible ? 'visible' : 'hidden'}`} >
                                <p>{gallery.description}</p>
                            </div>
                        )}
                    </div>
                    <div className='equipement'>
                        <div className='title_box'>
                            <h3>Equipments</h3>
                            <button onClick={equipementVisibility}>
                                <img src={arrow} alt="arrow" className={`arrow_toggle  ${isEquipementVisible ? 'rotated' : ''}`} />
                            </button>
                        </div>
                        {isEquipementVisible && (
                            <ul className={`description_box ${isEquipementVisible ? 'visible' : 'hidden'}`}>
                                {gallery.equipments.map((equipement, index) => (
                                    <li key={equipement.toString()}>{equipement}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

            </div>
        </div >
    )

}
export default Logement
