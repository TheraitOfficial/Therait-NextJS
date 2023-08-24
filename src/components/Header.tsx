'use client'
import React from 'react'
import styles from '@/styles/header.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { sortArrays } from '@/scripts/sortArray'
import { motion } from 'framer-motion'

interface Logo {
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
    SideLogo: {
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

interface NavLink {
    id:number,
    attributes: {
        NavElement: string,
        link_dir: string,
        customID: number,
        subDir: {
            data: [{
                id: number,
                attributes: {
                    ServiceName: string,
                    customID: number,
                    dir: string,
                }
            }],
        }
    }
}

interface HeaderProps {
    logo: Logo,
    navLinks: NavLink[],
}

function Header({ logo, navLinks } : HeaderProps) {
    const [openNav, setOpenNav] = React.useState(false)
    const [hovered, setHovered] = React.useState(false);
    const navBarRef:any = React.useRef<HTMLElement>()
    const hamburgerRef:any = React.useRef<HTMLDivElement>()
    sortArrays(navLinks)
    const changeNavState = () => setOpenNav(!openNav)
    const closeNav = () => setOpenNav(false)
  
    React.useEffect(() => {
      const clickOutsideNav = (e:any) => {
        if(!navBarRef.current?.contains(e.target) && !hamburgerRef.current?.contains(e.target)) {
          setOpenNav(false);
        }
      }
  
      document.addEventListener('mousedown', clickOutsideNav)
    })
  return (
    <motion.header className={styles.Header}>
        <Link href={'/'}>
        <Image className={styles.Logo}
            src={`${logo.Logo.data.attributes.url}`}
            alt={logo.Logo.data.attributes.alternativeText}
            width={logo.Logo.data.attributes.width} height={logo.Logo.data.attributes.height}
            priority={true}/>
        {logo.SideLogo.data &&
        <Image className={styles.SideLogo}
            src={`${logo.SideLogo.data.attributes.url}`}
            alt={logo.SideLogo.data.attributes.alternativeText}
            width={logo.SideLogo.data.attributes.width} height={logo.SideLogo.data.attributes.height}
            priority={true}/>}</Link>
        <motion.div className={openNav?`${styles.hamburger} ${styles.change}`:`${styles.hamburger}`} onClick={changeNavState} ref={hamburgerRef}
        initial={{x: 60}}
        animate={{x: 0}}
        transition={{type: 'spring', duration: 0.8}}>
            <div className={styles.bar1}/>
            <div className={styles.bar2}/>
            <div className={styles.bar3}/>
        </motion.div>
        <motion.nav className={openNav?`${styles.Nav} ${styles.change}`:`${styles.Nav}`} ref={navBarRef}
        initial={{y: -60}}
        animate={{y: 0}}
        transition={{type: 'spring', duration: 0.8}}>
            {navLinks.map(link => (
                <div className={styles.navEl} key={link.attributes.customID}>
                {link.attributes.subDir.data.length ?
                <>
                    <p className={`${styles.multilink} ${styles.creamText} ${hovered ? styles.subDirsHovered : ''}`}>
                    <Link href={link.attributes.link_dir} className={styles.Link} onClick={closeNav}>
                        {link.attributes.NavElement}
                    </Link>
                    <svg className={`${styles.svg} ${hovered ? styles.svgHovered : ''}`} width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                    </svg></p>
                    <div className={styles.subDirsContainer} onMouseEnter={() => {setHovered(true)}} onMouseLeave={() => {setHovered(false)}}>
                    {link.attributes.subDir.data.map(subLink => (
                        <Link href={`/services/${subLink.attributes.dir}`} className={`${styles.subLink} ${styles.creamText}`} onClick={closeNav} key={subLink.attributes.customID}>
                            {subLink.attributes.ServiceName}
                        </Link>
                    ))}</div>
                </>
                :
                <>
                    <Link href={link.attributes.link_dir} className={`${styles.Link} ${styles.creamText}`} onClick={closeNav}>
                        {link.attributes.NavElement}
                    </Link>
                </>
                }
                </div>
            ))}
            <div className={styles.navEl}>
                <Link href={'/contact'} className={`${styles.Link} ${styles.specialText}`} onClick={closeNav}>
                    Contact
                </Link>
            </div>
        </motion.nav>
    </motion.header>
  )
}

export default Header