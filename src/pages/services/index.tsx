import React from 'react'
import styles from '@/styles/DefaultSubPage.module.css'
import Header from '@/components/Header'
import Services from '@/components/Services'
import Head from 'next/head'
import Link from 'next/link'
import Footer from '@/components/Footer'
import { GetServerSideProps, GetStaticProps } from 'next'
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

    services: {
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
      }[];
    sectionTitle: {
      CantFindYourService:string,
    }
    contact: {
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
      }[];
      socials: {
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
      }[];
      copyrights: string,
}

function index({ logo, navLinks, sectionTitle, services, contact, socials, copyrights }:Props) {
  return (
    <>
        <Head>
            <title>Services</title>
        </Head>
        <main className={styles.main}>
            <Header logo={logo} navLinks={navLinks}/>
            <motion.div className={styles.content}
            initial={{opacity: 0, y: '10vh'}}
            animate={{opacity: 1, y: 0}}
            transition={{type: 'spring', duration: 0.8}}>
            <Services services={services}/>
            <p className={styles.ContactIntro}>{sectionTitle.CantFindYourService}</p>
            <motion.div whileTap={{scale: 0.9}} whileHover={{scale: 1.05}}>
            <Link href={`/contact`} className={styles.CTA}>
              Ask Us
            </Link></motion.div></motion.div>
            <Footer navLinks={navLinks} contact={contact} socials={socials} copyrights={`ⒸTherait ${new Date().getFullYear()} | All Rights Reserved`}/>
        </main>
    </>
  )
}

export default index

export const getStaticProps: GetStaticProps = async () => {
    const logoRes = await fetch(`${process.env.API_URL}/api/logo?populate=*`)
    const logo = await logoRes.json();
  
    const navLinksRes = await fetch(`${process.env.API_URL}/api/navigations?populate=*`)
    const navLinks = await navLinksRes.json();
  
    const sectionTitleRes = await fetch(`${process.env.API_URL}/api/section-title`)
    const sectionTitle = await sectionTitleRes.json();

    const servicesRes = await fetch(`${process.env.API_URL}/api/services?populate=*`)
    const services = await servicesRes.json();
  
    const contactRes = await fetch(`${process.env.API_URL}/api/contacts?populate=*`)
    const contact = await contactRes.json();
  
    const socialsRes = await fetch(`${process.env.API_URL}/api/socials?populate=*`)
    const socials = await socialsRes.json();
  
    return {
      props: {
        logo: logo.data.attributes,
        navLinks: navLinks.data,
  
        sectionTitle: sectionTitle.data.attributes,

        services: services.data,

        contact: contact.data,
        socials: socials.data,
      },
      revalidate: 3600,
    }
  }