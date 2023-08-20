'use client'
import React from 'react'
import styles from '@/styles/skillsetIT.module.css'
import Image from 'next/image'
import { sortArrays } from '@/scripts/sortArray'

interface skills {
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
}

interface Props {
  skillset: skills[]
  sectionTitle: {
    skillsetTitle: string
  }
}

function Skillset({ skillset, sectionTitle }:Props) {
  let [i, setI] = React.useState<number>(0)
  const increment = () => {
    if(i+3 < skillset.length){
      setI(i=i+1)
    }
  }
  const decrement = () => {
    if(i != 0) {
      setI(i=i-1)
    }
  }
  return (
    <div className={styles.skillset}>
      <p className={styles.title}>{sectionTitle.skillsetTitle}</p>
      <div className={styles.SkillsetContent}>
        <svg className={(i != 0)?`${styles.svgLeft} ${styles.withColor}`:`${styles.svgLeft} ${styles.withoutColor}`} onClick={decrement} width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_8_15)">
                <path d="M12.5 7L5.9375 13L5 12.2308L10.625 7L5 1.76923L5.9375 1L12.5 7Z" fill="currentcolor"/>
                <path d="M12.5 7L5.9375 13L5 12.2308L10.625 7L5 1.76923L5.9375 1L12.5 7Z" stroke="currentcolor"/>
            </g>
            <defs>
                <filter id="filter0_d_8_15" x="0.240479" y="0.338707" width="17.0005" height="21.3226" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="4"/>
                    <feGaussianBlur stdDeviation="2"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_8_15"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_8_15" result="shape"/>
                </filter>
            </defs>
        </svg>
          <ul className={styles.ul}>
            <li className={styles.li}>
              <Image className={styles.SkillIMG} key={skillset[i].attributes.customID}
                src={process.env.API_URL+skillset[i].attributes.Image.data.attributes.url}
                alt={skillset[i].attributes.Image.data.attributes.alternativeText}
                width={skillset[i].attributes.Image.data.attributes.width}
                height={skillset[i].attributes.Image.data.attributes.height}/></li>
            <li className={styles.li}>
              <Image className={styles.SkillIMG} key={skillset[i+1].attributes.customID}
                src={process.env.API_URL+skillset[i+1].attributes.Image.data.attributes.url}
                alt={skillset[i+1].attributes.Image.data.attributes.alternativeText}
                width={skillset[i+1].attributes.Image.data.attributes.width}
                height={skillset[i+1].attributes.Image.data.attributes.height}/></li>
            <li className={styles.li}>
              <Image className={styles.SkillIMG} key={skillset[i+2].attributes.customID}
                src={process.env.API_URL+skillset[i+2].attributes.Image.data.attributes.url}
                alt={skillset[i+2].attributes.Image.data.attributes.alternativeText}
                width={skillset[i+2].attributes.Image.data.attributes.width}
                height={skillset[i+2].attributes.Image.data.attributes.height}/></li>
            </ul>
        <svg className={(i+3 < skillset.length)?`${styles.svgRight} ${styles.withColor}`:`${styles.svgRight} ${styles.withoutColor}`} onClick={increment} width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_8_15)">
                <path d="M12.5 7L5.9375 13L5 12.2308L10.625 7L5 1.76923L5.9375 1L12.5 7Z" fill="currentcolor"/>
                <path d="M12.5 7L5.9375 13L5 12.2308L10.625 7L5 1.76923L5.9375 1L12.5 7Z" stroke="currentcolor"/>
            </g>
            <defs>
                <filter id="filter0_d_8_15" x="0.240479" y="0.338707" width="17.0005" height="21.3226" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="4"/>
                    <feGaussianBlur stdDeviation="2"/>
                    <feComposite in2="hardAlpha" operator="out"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_8_15"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_8_15" result="shape"/>
                </filter>
            </defs>
        </svg></div>
    </div>
  )
}

export default Skillset