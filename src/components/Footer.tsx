import React, { useState } from 'react'
import styles from '@/styles/footer.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { motion, Variants } from 'framer-motion'

interface NavLink {
    attributes: {
        NavElement: string,
        link_dir: string,
        customID: number
    }
}

interface Contact {
    attributes: {
        info: string,
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

interface Socials {
    attributes: {
        name: string,
        linkToProfile: string,
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

interface bgInterface {
    data: {
        data: {
            attributes: {
                Footer: {
                    data: {
                        attributes: {
                            url: string
                        }
                    }
                }
            }
        }
    }
}

interface Props {
    navLinks: NavLink[],
    contact: Contact[],
    socials:  Socials[],
    copyrights: string,
}

const variants: Variants = {
    offscreen: {
        y:300,
        opacity: 0,
    },
    onscreen: {
        y: 0,
        opacity: 1,
        transition: {
          type: 'spring',
          duration: 0.8,
        }
    }
  }

function Footer({ navLinks, contact, socials, copyrights} : Props) {
  return (
    <div className={styles.Footer}>
        <div className={styles.mainContent}>
            <div className={styles.HeaderSection}>
            <p className={styles.title}>Navigation</p>
            <ul className={styles.ul}>
                <li className={`${styles.li}`}><Link href={'/'} className={styles.Footer_Nav}>Home</Link></li>
                {navLinks.map(link => (
                    <li className={styles.li} key={link.attributes.customID}>
                        <Link href={link.attributes.link_dir} className={styles.Footer_Nav}>{link.attributes.NavElement}</Link>
                    </li>
                ))}
                <li className={`${styles.li}`}><Link href={'/contact'} className={styles.Footer_Nav_Contact}>Contact</Link></li>
            </ul></div>
            <div className={styles.HeaderSection}>
            <p className={styles.title}>Informations</p>
            <ul className={styles.ul}>
                {contact.map(info => (
                    <li className={styles.li} key={info.attributes.customID}>
                        {info.attributes.Icon.data?
                        <Image className={styles.infoIMG}
                        src={`${process.env.API_URL}${info.attributes.Icon.data.attributes.url}`}
                        alt={info.attributes.Icon.data.attributes.alternativeText}
                        width={info.attributes.Icon.data.attributes.width}
                        height={info.attributes.Icon.data.attributes.height}/>
                        : 
                        <div className={styles.imageBox}></div>}
                        <p className={styles.infoContent}>{info.attributes.info}</p>
                    </li>
                ))}
            </ul></div>
            <div className={styles.HeaderSection}>
            <p className={styles.title}>Social Media</p>
            <ul className={styles.ul}>
                {socials.map(social => (
                    <li className={styles.li} key={social.attributes.customID}>
                        <Link href={social.attributes.linkToProfile} target='_blank' className={styles.socialLink}><Image className={styles.socialIMG}
                        src={`${process.env.API_URL}${social.attributes.Icon.data.attributes.url}`}
                        alt={social.attributes.Icon.data.attributes.alternativeText}
                        width={social.attributes.Icon.data.attributes.width}
                        height={social.attributes.Icon.data.attributes.height}/>
                        <p className={styles.socialName}>{social.attributes.name}</p>
                        </Link>
                    </li>
                ))}
            </ul></div>
        </div>
        <p className={styles.copyrights}>{copyrights}</p>
        <Link href={'https://www.privacypolicies.com/live/7681d7ba-bd36-4c75-8f12-97efe46ae1ea'} target='_blank'><p className={styles.privacyPolicy}>personal data and privacy policy</p></Link>
    </div>
  )
}

export default Footer