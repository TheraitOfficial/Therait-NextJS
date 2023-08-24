import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Header from '@/components/Header'
import Head from 'next/head'
import Link from 'next/link'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'
import Services from '@/components/Services'
import { GetServerSideProps, GetStaticProps } from 'next'
import Values from '@/components/Values/indes'
//import Technologies from '@/components/technologies'
import Stats from '@/components/Stats'
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
  }[]
  hero: {
    HeroText: string,
    subText: string,
    Image: {
      data: {
        attributes: {
          formats: {
            thumbnail: {
              url: string,
              width: number,
              height: number,
            }
            small: {
              url: string,
              width: number,
              height: number,
            }
          }
          url: string,
          alternativeText: string,
          width: number,
          height: number,
        }
      }
    }
  };
  about: {
    Title: string,
    text: string,
  };
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
  technologies: {
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
  }[]
  sectionTitle: {
    skillsetTitle: string,
    OurClients: string,
    WhyUs: string,
    Services: string,
    ContactUs: string,
    Technologies: string,
    Stats: string,

  };
  enable: {
    applyForJob: boolean,
    stats: boolean,
 }
  subServices: {
    attributes: {
      title: string,
      customID: number,
    }
  }[]
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

export default function Home({ logo, navLinks, hero, about, services, values, stats, technologies, sectionTitle, enable, subServices, contact, socials, copyrights }:Props) {
  return (
    <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Home</title>
    </Head>
    <div className={styles.main}>
      <Header logo={logo} navLinks={navLinks}/>
      <div className={styles.Hero}>
          <motion.div className={styles.HeroText}
          initial={{x: '-50vw', opacity: 0.25}}
          animate={{x: 0, opacity: 1}}
          transition={{type: 'spring', duration: 0.8}}>
            <p className={styles.mainHeroText}><i>{hero.HeroText}</i></p>
            <p className={styles.HeroSubText}>{hero.subText}</p>
            <div className={styles.CTAbox}>
                <div className={styles.CTA}>
                  <Link href={'/services'} style={{ display: 'flex',textDecoration: 'none', justifyContent:'space-around', width:'100%', height: '100%', alignItems: 'center'}}>
                        <p className={`${styles.CTA_text} ${styles.creamText}`}>Our services<span><svg className={styles.CTAarrow} width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <g filter="url(#filter0_d_8_15)">
                                  <path d="M12.5 7L5.9375 13L5 12.2308L10.625 7L5 1.76923L5.9375 1L12.5 7Z" fill="currentcolor"/>
                                  <path d="M12.5 7L5.9375 13L5 12.2308L10.625 7L5 1.76923L5.9375 1L12.5 7Z" stroke="currentcolor" strokeWidth="1.5px"/>
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
                          </svg></span></p>
                    </Link>
                  </div>
                  <div className={styles.CTA}>
                  <Link href={'/contact'}style={{ display: 'flex',textDecoration: 'none', justifyContent:'space-around', width:'100%', height: '100%', alignItems: 'center'}}>
                        <p className={`${styles.CTA_text} ${styles.specialText}`}>Get in touch<span><svg className={styles.CTAarrow} width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <g filter="url(#filter0_d_8_15)">
                                  <path d="M12.5 7L5.9375 13L5 12.2308L10.625 7L5 1.76923L5.9375 1L12.5 7Z" fill="currentcolor"/>
                                  <path d="M12.5 7L5.9375 13L5 12.2308L10.625 7L5 1.76923L5.9375 1L12.5 7Z" stroke="currentcolor" strokeWidth="1.5px"/>
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
                          </svg></span></p>
                    </Link>
                  </div>
            </div>
          </motion.div>
        <motion.div style={{ margin: 'auto'}}
        initial={{x: '50vw', opacity: 0.25}}
        animate={{x: 0, opacity: 1}}
        transition={{type: 'spring', duration: 0.8}}>
        <Image className={styles.HeroIMG}
          src={`${hero.Image.data.attributes.url}`}
          alt={hero.Image.data.attributes.alternativeText}
          width={hero.Image.data.attributes.width}
          height={hero.Image.data.attributes.height}
          priority={true}/></motion.div></div>
      <motion.div className={styles.About}
      initial={{opacity: 0, y: '10vh'}}
      animate={{opacity: 1, y: 0}}
      transition={{type: 'spring', duration: 0.8}}>
        <p className={styles.AboutTitle}>{about.Title}</p>
        <p className={styles.AboutText}>{about.text}</p>
      </motion.div>
      <motion.div className={styles.sec_services}
      initial='offscreen'
      whileInView='onscreen'
      viewport={{once: true, amount: 0.1}}
      variants={variants}>
          <p className={styles.SectionIntro}>{sectionTitle.Services}</p>
          <Services services={services}/>
      </motion.div>
      {enable.stats?
      <motion.div
      initial='offscreen'
      whileInView='onscreen'
      viewport={{once: true, amount: 0.1}}>
      <motion.div className={styles.sec_stats}
      variants={variants}>
        <p className={styles.SectionIntro}>{sectionTitle.Stats}</p>
        <Stats stats={stats}/>
      </motion.div></motion.div>:<></>}
      <motion.div className={styles.sec_values}
      initial='offscreen'
      whileInView='onscreen'
      variants={variants}
      viewport={{once: true, amount: 0.1}}>
        <p className={styles.SectionIntro}>{sectionTitle.WhyUs}</p>
        <Values values={values}/>
      </motion.div>
      {/*
      <div className={styles.sec_technologies}>
        <p className={styles.SectionIntro}>{sectionTitle.Technologies}</p>
        <Technologies technologies={technologies}/>
      </div>
      <div className={styles.sec_contact}>
          <p className={styles.SectionIntro}>{sectionTitle.ContactUs}</p>
          <ContactForm subServices={subServices}/>
      </div> */}
      <motion.div whileTap={{scale: 0.9}} whileHover={{scale: 1.05}}>
        <Link href={`/contact`} className={styles.cta}>
            Contact us
        </Link></motion.div>
      <Footer navLinks={navLinks} contact={contact} socials={socials} copyrights={`ⒸTherait ${new Date().getFullYear()} | All Rights Reserved`}/>
    </div>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const logoRes = await fetch(`${process.env.API_URL}/api/logo?populate=*`)
  const logo = await logoRes.json()

  const navLinksRes = await fetch(`${process.env.API_URL}/api/navigations?populate=*`)
  const navLinks = await navLinksRes.json()

  const heroRes = await fetch(`${process.env.API_URL}/api/hero?populate=*`)
  const hero = await heroRes.json()

  const aboutRes = await fetch(`${process.env.API_URL}/api/about`)
  const about = await aboutRes.json()

  const servicesRes = await fetch(`${process.env.API_URL}/api/services?populate=*`)
  const services = await servicesRes.json()

  const valuesRes = await fetch(`${process.env.API_URL}/api/our-values?populate=*`)
  const values = await valuesRes.json()

  const statsRes = await fetch(`${process.env.API_URL}/api/stats`)
  const stats = await statsRes.json()

  const sectionTitleRes = await fetch(`${process.env.API_URL}/api/section-title`)
  const sectionTitle = await sectionTitleRes.json();

  const enableRes = await fetch(`${process.env.API_URL}/api/enable`)
  const enable = await enableRes.json()

  const contactRes = await fetch(`${process.env.API_URL}/api/contacts?populate=*`)
  const contact = await contactRes.json()

  const socialsRes = await fetch(`${process.env.API_URL}/api/socials?populate=*`)
  const socials = await socialsRes.json()

  return {
    props: {
      logo: logo.data.attributes,
      navLinks: navLinks.data,

      hero: hero.data.attributes,

      about: about.data.attributes,

      services: services.data,

      values: values.data,

      stats: stats.data,

      //technologies: technologies.data,

      sectionTitle: sectionTitle.data.attributes,

      enable: enable.data.attributes,

      // subServices: subSer.data,

      contact: contact.data,
      socials: socials.data,
    },
    revalidate: 3600,
  }
}