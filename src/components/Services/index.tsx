'use client'
import React from 'react'
import styles from '@/styles/services.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface Services {
    attributes: {
        ServiceName: string,
        customID: number,
        dir: string,
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
}

interface Props {
    services: Services[],
}

function Services({ services } : Props) {
  return (
    <div className={styles.Services}>
        {services.map(service => (
            <Link href={`/services/${service.attributes.dir}`} key={service.attributes.customID}>
            <motion.div className={styles.Service}
            whileTap={{scale: 0.95}} whileHover={{scale: 1.05}}>
                <Image className={styles.img}
                    src={`${service.attributes.Image.data.attributes.url}`}
                    alt={service.attributes.Image.data.attributes.alternativeText}
                    width={service.attributes.Image.data.attributes.width}
                    height={service.attributes.Image.data.attributes.height}/>
                <p className={styles.name}>{service.attributes.ServiceName}</p>
            </motion.div></Link>
        ))}
    </div>
  )
}

export default Services