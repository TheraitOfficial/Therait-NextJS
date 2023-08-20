import React from 'react'
import styles from '@/styles/DefaultSubPage.module.css'
import Header from '@/components/Header'
import Head from 'next/head'
import Footer from '@/components/Footer'
import { GetServerSideProps, GetStaticProps } from 'next'
import ContactForm from '@/components/ContactForm'
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
      subServices: {
        attributes: {
          title: string,
          customID: number,
        }
      }[]
      enable: {
        applyForJob: boolean,
        stats: boolean,
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
}

function index({ logo, navLinks, subServices, enable, contact, socials }:Props) {
  return (
    <>
        <Head>
            <title>Contact Us</title>
        </Head>
        <main className={styles.main}>
            <Header logo={logo} navLinks={navLinks}/>
            <ContactForm subServices={subServices}/>
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
  
    const subSerRes = await fetch(`${process.env.API_URL}/api/sub-services`)
    const subSer = await subSerRes.json();

    const enableRes = await fetch(`${process.env.API_URL}/api/enable`)
    const enable = await enableRes.json();

    const contactRes = await fetch(`${process.env.API_URL}/api/contacts?populate=*`)
    const contact = await contactRes.json();
  
    const socialsRes = await fetch(`${process.env.API_URL}/api/socials?populate=*`)
    const socials = await socialsRes.json();
    return {
      props: {
        logo: logo.data.attributes,
        navLinks: navLinks.data,

        subServices: subSer.data,

        enable: enable.data.attributes,

        contact: contact.data,
        socials: socials.data,
      },
      revalidate: 3600,
    }
  }