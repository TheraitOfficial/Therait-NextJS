import React from 'react'
import styles from '@/styles/AboutPage.module.css'
import Header from '@/components/Header'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Footer from '@/components/Footer'
import { GetServerSideProps, GetStaticProps } from 'next'
import { sortArrays } from '@/scripts/sortArray'
import Values from '@/components/Values/indes'
import { motion, Variants } from 'framer-motion'

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

      aboutPage: {
        HeadingText: string,
        titleMain:string,
        textMain: string,
        whyTrustUs: string
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
        content: {
          data: {
            attributes: {
              title: string,
              text: string,
              customID: number,
            }
          }[]
        }
      }
      values: {
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
      }[]
      subServices: {
        attributes: {
          title: string,
          customID: number,
        }
      }[]
      sectionTitle: {
        skillsetTitle: string,
        OurClients: string,
        ContactUs: string,
      }
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

function index({ logo, navLinks, aboutPage, sectionTitle, enable, values, subServices, contact, socials, copyrights }:Props) {
  sortArrays(aboutPage.content.data)
  return (
    <>
        <Head>
            <title>About us</title>
        </Head>
        <main className={styles.main}>
            <Header logo={logo} navLinks={navLinks}/>
            <div className={styles.HeadText}>
                <motion.i className={styles.i}
                initial={{x: '-70vw'}} animate={{x:0}}
                transition={{type: 'spring', duration: 0.8}}>{aboutPage.HeadingText}</motion.i>
            </div>
            <div className={styles.hero}>
              <motion.div className={styles.heroTextBox}
              initial={{x: '-50vw'}}
              animate={{x: 0}}
              transition={{type: 'spring', duration: 0.8}}>
                <p className={styles.heroTitle}>{aboutPage.titleMain}</p>
                <p className={styles.heroText}>{aboutPage.textMain}</p></motion.div>
                <motion.div className={styles.heroIMGbox}
                initial={{x: '50vw'}}
                animate={{x: 0}}
                transition={{type: 'spring', duration: 0.8}}>
                <Image className={styles.heroIMG}
                  src={`${aboutPage.Image.data.attributes.url}`}
                  alt={aboutPage.Image.data.attributes.alternativeText}
                  width={aboutPage.Image.data.attributes.width}
                  height={aboutPage.Image.data.attributes.height} priority={true}/></motion.div>
            </div>
            <div className={styles.content}>
              {aboutPage.content.data.map(el => (
                <motion.div className={styles.contentEl} key={el.attributes.customID}
                initial='offscreen'
                whileInView='onscreen'
                viewport={{once: true, amount: 0.1}}
                variants={variants}>
                  <p className={styles.contentEl_title}>{el.attributes.title}</p>
                  <p className={styles.contentEl_text}>{el.attributes.text}</p>
                </motion.div>
              ))}
            </div>
            <motion.div className={styles.sec_values}
            initial='offscreen'
            whileInView='onscreen'
            viewport={{once: true, amount: 0.1}}
            variants={variants}>
              <p className={styles.SectionIntro}>{aboutPage.whyTrustUs}</p>
              <Values values={values}/>
            </motion.div>
            {/* <div className={styles.sec_contact}>
                <p className={styles.SectionIntro}>{sectionTitle.ContactUs}</p>
                <ContactForm subServices={subServices}/>
            </div> */}
            <motion.div className={styles.cta_box} whileTap={{scale: 0.9}} whileHover={{scale: 1.05}}>
            <Link href={`/contact`} className={styles.cta}>
            Contact us
            </Link></motion.div>
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
  
    const aboutUsRes = await fetch(`${process.env.API_URL}/api/about-us-page?populate=*`)
    const aboutUsPage = await aboutUsRes.json()

    const valuesRes = await fetch(`${process.env.API_URL}/api/our-values?populate=*`)
    const values = await valuesRes.json();

    // const subSerRes = await fetch(`${process.env.API_URL}/api/sub-services`)
    // const subSer = await subSerRes.json();

    const sectionTitleRes = await fetch(`${process.env.API_URL}/api/section-title`)
    const sectionTitle = await sectionTitleRes.json();

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

        aboutPage: aboutUsPage.data.attributes, 

        values: values.data,

        // subServices: subSer.data,

        sectionTitle: sectionTitle.data.attributes,

        enable: enable.data.attributes,

        contact: contact.data,
        socials: socials.data,
      },
      revalidate: 3600,
    }
  }