'use client'
import React from 'react'
import styles from '@/styles/clients.module.css'
import Image from 'next/image'

interface Props {
    clients: {
       attributes: {
          name: string,
          customID: number;
          Logo: {
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

function OurClients({ clients }:Props) {
  return (
    <div className={styles.main}>
        <div className={styles.clients}>
            <p className={styles.title}>Trusted By</p>
            <div className={styles.clients_content}>
                  {clients.map(client => (
                      <Image className={styles.logo} key={client.attributes.customID}
                        src={`${process.env.API_URL}${client.attributes.Logo.data.attributes.url}`}
                        alt={client.attributes.Logo.data.attributes.alternativeText}
                        width={client.attributes.Logo.data.attributes.width}
                        height={client.attributes.Logo.data.attributes.height}/>
                  ))}
            </div>
        </div>
    </div>
  )
}

export default OurClients