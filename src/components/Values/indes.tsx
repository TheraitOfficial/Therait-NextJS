import React from 'react'
import styles from '@/styles/values.module.css'
import Image from 'next/image'

interface values {
  attributes: {
    title: string,
    text: string,
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
}

interface Props {
  values: values[],
}

function Values({ values }:Props) {
  return (
    <div className={styles.Values}>
        {values.map(value => (
          <div className={styles.Value} key={value.attributes.customID}>
              <div className={styles.Value_head}> 
                  <Image className={styles.img}
                    src={`${value.attributes.Icon.data.attributes.url}`}
                    alt={value.attributes.Icon.data.attributes.alternativeText}
                    width={value.attributes.Icon.data.attributes.width}
                    height={value.attributes.Icon.data.attributes.height}/>
                  <p className={styles.title}>{value.attributes.title}</p>
              </div>
              <p className={styles.content}>{value.attributes.text}</p>
          </div>
        ))}
    </div>
  )
}

export default Values