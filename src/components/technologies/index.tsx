import React from 'react'
import styles from '@/styles/technologies.module.css'
import Image from 'next/image'

interface Props {
    technologies: {
        attributes: {
            customID: number,
            Image: {
                data: {
                    attributes: {
                        url: string,
                        alternativeText: string,
                        width: number,
                        height: number,
                    }
                }
            }
        }
    }[]
}

function Technologies({ technologies }:Props) {
  return (
    <div className={styles.technologies}>
        {technologies.map(el => (
            <Image className={styles.img} key={el.attributes.customID}
                src={`${process.env.API_URL}${el.attributes.Image.data.attributes.url}`}
                alt={el.attributes.Image.data.attributes.alternativeText}
                width={el.attributes.Image.data.attributes.width}
                height={el.attributes.Image.data.attributes.height}/>
        ))}
    </div>
  )
}

export default Technologies