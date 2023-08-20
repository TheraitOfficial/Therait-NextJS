import React from 'react'
import styles from '@/styles/stats.module.css'
import Image from 'next/image'

interface Props {
    stats: {
        attributes: {
            StatText: string,
            customID: number,
            Icon: {
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

function Stats({ stats }:Props) {
  return (
    <div className={styles.Stats}>
        {stats.map(stat => (
            <div className={styles.stat} key={stat.attributes.customID}>
                <p className={styles.text}>{stat.attributes.StatText}</p>
            </div>
        ))}
    </div>
  )
}

export default Stats