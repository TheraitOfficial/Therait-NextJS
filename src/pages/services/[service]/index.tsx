import React from 'react'
import styles from '@/styles/ServicePage.module.css'
import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { sortArrays } from '@/scripts/sortArray';
import Head from 'next/head';
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

    services: {
        attributes: {
            ServiceName: string,
            customID: number,
            dir: string,
            short_description: string,
            subServicesIntro: string,
            bonusesIntro: string,
            faqIntro: string,
            serviceProcessIntro: string,
            methodsAndTechniquesIntro: string,
            Image: {
                data: {
                    attributes: {
                        url: string,
                        alternativeText: string,
                        width: number,
                        height: number,
                    }
                }
            },
            sub_services: {
              data: {
                attributes: {
                    title: string,
                    description: string,
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
            },
            offers: {
              data: {
                attributes: {
                  title: string,
                  price: number,
                  recomendedFor: string,
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
                  },
                  feature: {
                    data: {
                      attributes: {
                        feature: string,
                        customID: number,
                      }
                    }[]
                  }
                }
              }[]
            }
            bonuses: {
                data: {
                    attributes: {
                      title: string,
                      text: string,
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
            },
            service_faqs: {
                data: {
                    attributes: {
                        question: string,
                        answer: string,
                        customID: number,
                    }
                }[]
            },
            service_processes: {
                data: {
                    attributes: {
                      num: string,
                      text: string
                      customID: number,
                    }
                }[]
            },
        }
      }[];
    sectionTitle: {
      CantFindYourService:string,
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

function Service({ logo, navLinks, services, enable, contact, socials, copyrights }: Props) {
    const { asPath } = useRouter()
    const index = services.findIndex((service) => service.attributes.dir === asPath.substring(asPath.lastIndexOf('/')+1))
    const [showAns, setShowAns] = React.useState<boolean[]>([])
    
    React.useEffect(() => {
      let initialServicesChoosen = services[index].attributes.service_faqs.data.map(() => false);
      setShowAns(() => initialServicesChoosen);
    }, [index, services]);

    const changeShowAns = (index: number) => {
      let updatedServicesChoosen = [...showAns]
      updatedServicesChoosen[index] = !updatedServicesChoosen[index]
      setShowAns(updatedServicesChoosen)
    }
    sortArrays(services[index].attributes.service_processes.data)

  return (
    <>
    <Head>
        <title>{services[index].attributes.ServiceName}</title>
    </Head>
    <div className={styles.main}>
        <Header logo={logo} navLinks={navLinks}/>
        <div className={styles.hero}>
            <div className={styles.heroBox}>
            <motion.div className={styles.heroTextBox}
            initial={{x: '-50vw'}}
            animate={{x: 0}}
            transition={{type: 'spring', duration: 0.8}}>
                <p className={styles.heroTitle}>{services[index].attributes.ServiceName}</p>
                <p className={styles.heroText}>{services[index].attributes.short_description}</p>
            </motion.div>
            <motion.div style={{ margin: 'auto'}}
            initial={{x: '50vw'}}
            animate={{x: 0}}
            transition={{type: 'spring', duration: 0.8}}>
            <Image className={styles.heroIMG}
                src={`${services[index].attributes.Image.data.attributes.url}`}
                alt={services[index].attributes.Image.data.attributes.alternativeText}
                width={services[index].attributes.Image.data.attributes.width}
                height={services[index].attributes.Image.data.attributes.height}/></motion.div></div>
            <motion.div whileTap={{scale: 0.9}} whileHover={{scale: 1.05}} style={{marginLeft: 'auto', marginRight: 'auto'}}>
            <Link href={`/contact`} className={styles.cta}>
                Contact us
            </Link></motion.div>
        </div>
        <motion.div className={styles.bonuses}
        initial={{opacity: 0, y: '10vh'}}
        animate={{opacity: 1, y: 0}}
        transition={{type: 'spring', duration: 0.8}}>
          <p className={styles.bonuses_title}>
            {services[index].attributes.bonusesIntro}
          </p>
          <div className={styles.bonuses_content}>
              {services[index].attributes.bonuses.data.map(el => (
                <div className={styles.bonuses_content_el} key={el.attributes.customID}>
                    <Image className={styles.bonuses_content_el_img}
                        src={`${el.attributes.Image.data.attributes.url}`}
                        alt={el.attributes.Image.data.attributes.alternativeText}
                        width={el.attributes.Image.data.attributes.width}
                        height={el.attributes.Image.data.attributes.height}/>

                    <div className={styles.bonuses_content_el_textbox}>
                          <p className={styles.bonuses_content_el_textbox_title}>{el.attributes.title}</p>
                          <p className={styles.bonuses_content_el_textbox_text}>{el.attributes.text}</p>
                    </div>
                </div>
              ))}
          </div>
        </motion.div>
        {services[index].attributes.sub_services.data[0] !== undefined ?
        <motion.div className={styles.subSer}
        initial='offscreen'
        whileInView='onscreen'
        viewport={{once: true, amount: 0.1}}
        variants={variants}>
          <p className={styles.subSer_title}>
            {services[index].attributes.subServicesIntro}
          </p>
          <div className={styles.subSer_content}>
                {services[index].attributes.sub_services.data.map(el => (
                    <div className={styles.subSer_content_el} key={el.attributes.customID}>
                        <Image className={styles.subSer_content_el_img}
                          src={`${el.attributes.Image.data.attributes.url}`}
                          alt={el.attributes.Image.data.attributes.alternativeText}
                          width={el.attributes.Image.data.attributes.width}
                          height={el.attributes.Image.data.attributes.height}/>
                          <div className={styles.subSer_content_el_textbox}>
                              <p className={styles.subSer_content_el_textbox_title}>{el.attributes.title}</p>
                              <p className={styles.subSer_content_el_textbox_text}>{el.attributes.description}</p>
                        </div>
                    </div>
                ))}
          </div>
        </motion.div>: 
        <motion.div className={styles.Offers}
        initial='offscreen'
        whileInView='onscreen'
        viewport={{once: true, amount: 0.1}}
        variants={variants}>
          <p className={styles.Offers_title}>
            {services[index].attributes.subServicesIntro}
          </p>
          <div className={styles.Offers_content}>
                {services[index].attributes.offers.data.map(el => (
                    <div className={styles.Offers_content_el} key={el.attributes.customID}>
                        <Image className={styles.Offers_content_el_img}
                          src={`${el.attributes.Image.data.attributes.url}`}
                          alt={el.attributes.Image.data.attributes.alternativeText}
                          width={200}
                          height={120}/>
                          <p className={styles.Offers_content_el_title}>{el.attributes.title}</p>
                          <p className={styles.Offers_content_el_price}><i>{el.attributes.price}</i></p>
                          <p className={styles.Offers_content_el_recomendation}>*recomended for {el.attributes.recomendedFor}</p>
                          <hr className={styles.Offers_content_el_hr}/>
                          <ul className={styles.Offers_content_el_features}>
                              {el.attributes.feature.data.map(feature => (
                                <li className={styles.Offers_content_el_features_el} key={feature.attributes.customID}>{feature.attributes.feature}</li>
                              ))}
                            
                          </ul>
                          <motion.div whileTap={{scale: 0.9}} whileHover={{scale: 1.05}} className={styles.Offers_content_el_cta}>
                            <Link href={'/contact'}>Get started</Link>
                          </motion.div>
                    </div>
                ))}
          </div>
        </motion.div>}
        <motion.div className={styles.FAQ}
        initial='offscreen'
        whileInView='onscreen'
        viewport={{once: true, amount: 0.1}}
        variants={variants}>
          <p className={styles.FAQ_title}>
            {services[index].attributes.faqIntro}
          </p>
          <div className={styles.FAQ_content}>
                {services[index].attributes.service_faqs.data.map(el => (
                    <div className={styles.FAQ_content_el} key={el.attributes.customID}>
                        <div className={styles.FAQ_content_el_question} onClick={() => changeShowAns(el.attributes.customID-1)}>{el.attributes.question}
                        <div className={`${styles.plus_minus} ${!showAns[el.attributes.customID-1]?styles.change:''}`}>
                          <div className={styles.pmOne}/>
                          <div className={styles.pmTwo}/>
                        </div></div>
                        <p className={`${styles.FAQ_content_el_answer} ${showAns[el.attributes.customID-1]? '':styles.hide}`}>{el.attributes.answer}</p>
                    </div>
                ))}
          </div>
        </motion.div>
        {services[index].attributes.service_processes.data[0] !== undefined&&
        <motion.div className={styles.serPro}
        initial='offscreen'
        whileInView='onscreen'
        viewport={{once: true, amount: 0.1}}
        variants={variants}>
          <p className={styles.serPro_title}>
            {services[index].attributes.serviceProcessIntro}
          </p>
          <div className={styles.serPro_content}>
                {services[index].attributes.service_processes.data.map(el => (
                    <div className={styles.serPro_content_el} key={el.attributes.customID}>
                        <p className={styles.serPro_content_el_num}>#0{el.attributes.num}</p>
                        <p className={styles.serPro_content_el_text}>{el.attributes.text}</p>
                    </div>
                ))}
          </div>
        </motion.div>}
        <motion.div whileTap={{scale: 0.9}} whileHover={{scale: 1.05}}>
        <Link href={`/contact`} className={styles.ctaBottom}>
            Contact us
        </Link></motion.div>
        <Footer navLinks={navLinks} contact={contact} socials={socials} copyrights={`ⒸTherait ${new Date().getFullYear()} | All Rights Reserved`}/>
    </div>
    </>
  )
}

export default Service


export const getStaticProps: GetStaticProps = async () => {
  const logoRes = await fetch(`${process.env.API_URL}/api/logo?populate=*`);
  const logo = await logoRes.json();

  const navLinksRes = await fetch(`${process.env.API_URL}/api/navigations?populate=*`);
  const navLinks = await navLinksRes.json();

  const servicesRes = await fetch(`${process.env.API_URL}/api/services?populate=Image&populate=sub_services.Image&populate=bonuses.Image&populate=service_faqs&populate=service_processes&populate=offers.Image&populate=offers.feature`);
  const services = await servicesRes.json();

  const enableRes = await fetch(`${process.env.API_URL}/api/enable`);
  const enable = await enableRes.json();

  const contactRes = await fetch(`${process.env.API_URL}/api/contacts?populate=*`);
  const contact = await contactRes.json();

  const socialsRes = await fetch(`${process.env.API_URL}/api/socials?populate=*`);
  const socials = await socialsRes.json();

  return {
    props: {
      logo: logo.data.attributes,
      navLinks: navLinks.data,
      services: services.data,
      enable: enable.data.attributes,
      contact: contact.data,
      socials: socials.data,
    },
    revalidate: 3600,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
        const servicesRes = await fetch(`${process.env.API_URL}/api/services?populate=*`)
        const services = await servicesRes.json();

        const paths = services.data.map((service:any) => ({
            params: { service: service.attributes.dir}
        }))

        return { paths, fallback: false }
}