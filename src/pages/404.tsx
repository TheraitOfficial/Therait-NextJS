import React from 'react'
import styles from '@/styles/NotFoundPage.module.css'
import Header from '@/components/Header'
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface Props {
  logo: {
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
  navLinks: {
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
        }];
      }
    }
  }[];
}

function NotFound({ logo, navLinks }:Props) {
  return (
    <div className={styles.main}>
      <Header logo={logo} navLinks={navLinks}/>
      <div className={styles.NotFound}>
          <p className={styles.text}>
            404 <br/>
            Not Found
          </p>
          <motion.div whileTap={{scale: 0.9}} whileHover={{scale: 1.05}}>
          <Link href={`/`} className={styles.return}>
            Return
          </Link></motion.div>
      </div>
    </div>
  )
}

export default NotFound

export const getStaticProps: GetStaticProps = async () => {
  const logoRes = await fetch(`${process.env.API_URL}/api/logo?populate=*`)
  const logo = await logoRes.json();

  const navLinksRes = await fetch(`${process.env.API_URL}/api/navigations?populate=*`)
  const navLinks = await navLinksRes.json();

  return {
    props: {
      logo: logo.data.attributes,

      navLinks: navLinks.data,
    },
    revalidate: 3600,
  }
}