'use client'
import React from 'react'
import styles from '@/styles/contactForm.module.css'
import Link from 'next/link'
import axios from 'axios'
import Image from 'next/image'
import { sortArrays } from '@/scripts/sortArray'
import { motion } from 'framer-motion'

interface Props {
    subServices: {
        attributes: {
          title: string,
          customID: number,
        }
    }[]
}

interface service {
    attributes: {
      title: string,
      customID: number,
    }
}

function ContactForm({ subServices }:Props) {
  const [user_firstName, setFirstName] = React.useState("");
  const [user_lastName, setLastName] = React.useState("");
  const [user_email, setEmail] = React.useState("");
  const [user_budget, setBudget] = React.useState("");
  const [user_companyName, setCompanyName] = React.useState("");
  const [user_companyWebsite, setCompanyWebsite] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [message, setMessage] = React.useState(""); 
  const [checkbox, setCheckbox] = React.useState(false);

  async function sendEmail(e:any) {
    e.preventDefault();
    let services:string[] = []
    for(let  i = 0; i < servicesChoosen.length; i++) {
        if(servicesChoosen[i] && i < subServices.length) {
            services.push(subServices[i].attributes.title)
        } else if(servicesChoosen[i] && i === subServices.length) {
          services.push('Apply for job')
        } else if(servicesChoosen[i] && i === subServices.length+1) {
          services.push('Other')
        }
    }
    console.log(services)
    if(user_firstName && user_lastName && user_email && message && services) {
      axios
        .post(`${process.env.EXPRESS_URL}/send`, {
          user_name: user_firstName,
          user_lastName: user_lastName,
          user_email: user_email,
          user_companyName: user_companyName,
          user_companyWebsite: user_companyWebsite,
          // user_budget: user_budget,
          user_services: services,
          message: message,
        })
          .then(() => alert("Email has been sent succesfuly"))
          .catch(() => alert(`Something went wrong...
You can try contact us via email. Our email: theraitkontakt@gmail.com`))
      return;
  }
}
    const [servicesChoosen, setServicesChoosen] = React.useState<boolean[]>([]);
    React.useEffect(() => {
      let initialServicesChoosen = subServices.map(() => false)
      initialServicesChoosen[subServices.length] = false;
      setServicesChoosen(initialServicesChoosen)
    }, [subServices])
  
    const handleServiceClick = (index: number) => {
      let updatedServicesChoosen = [...servicesChoosen]
      updatedServicesChoosen[index] = !updatedServicesChoosen[index]
      setServicesChoosen(updatedServicesChoosen)
      console.log(servicesChoosen)
    }

    const budgetClick = (value:string) => {
      if(user_budget === '' || user_budget !== value) {
          setBudget(value)
      } else {
          setBudget('');
      }
    }
  return (
    <div className={styles.ContactForm}>
        <motion.form className={styles.form}
        initial={{opacity: 0, y: '10vh'}}
        animate={{opacity: 1, y: 0}}
        transition={{type: 'spring', duration: 0.8}}>
            <div className={styles.form_item}>
                <div className={styles.form_item_content_servicesBox}>
                <p className={styles.form_item_title}>{`I'm interested in...`}</p>
                  <div className={styles.form_item_content_services}>
                      {subServices.map(service => (
                        <motion.div className={`${styles.form_item_content_services_el} ${servicesChoosen[service.attributes.customID-1] ? styles.choosen : ''}`}
                          key={service.attributes.customID} onClick={() => handleServiceClick(service.attributes.customID-1)} 
                          whileTap={{scale: 0.95}} whileHover={{scale: 1.05}}>
                            {service.attributes.title}
                        </motion.div>
                      ))}
                      <motion.div className={`${styles.form_item_content_services_el} ${servicesChoosen[subServices.length] ? styles.choosen : ''}`}
                        onClick={() => handleServiceClick(subServices.length)} whileTap={{scale: 0.95}} whileHover={{scale: 1.05}}>
                            {`Other`}
                      </motion.div>
                  </div>
                </div>
            </div>
            <div className={styles.form_item}>
                <div className={styles.form_item_content_info}>
                <p className={styles.form_item_title}>{`Let us know you better...`}</p>
                      <div className={styles.form_item_content_info_name}>
                          <input className={styles.form_item_content_info_input_fn} onChange={e => setFirstName(e.target.value)} placeholder='First Name*' required/>
                          <input className={styles.form_item_content_info_input_ln} onChange={e => setLastName(e.target.value)} placeholder='Last Name*' required/>
                      </div>
                      <input className={styles.form_item_content_info_input_email} onChange={e => setEmail(e.target.value)} placeholder='Your email address*' required/>
                      <input className={styles.form_item_content_info_input_companyName} onChange={e => setCompanyName(e.target.value)} placeholder='Your company name'/>
                      <input className={styles.form_item_content_info_input_companyName} onChange={e => setCompanyWebsite(e.target.value)} placeholder='Your website'/>
                </div>
            </div>
            <div className={styles.form_item}>
                <div className={styles.form_item_content_message}>
                <p className={styles.form_item_title}>{`What would you like to tell us?`}</p>
                      <textarea className={styles.form_item_content_message_textarea} onChange={(e) => setMessage(e.target.value)} placeholder='Message...' required/>
                </div>
            </div>
            {/* <div className={styles.form_item}>
                <div className={styles.form_item_content_budgetBox}>
                <p className={styles.form_item_title}>{`Project budget(EUR)...`}</p>
                <div className={styles.form_item_content_budget}>
                      <div className={`${styles.form_item_content_budget_opt} ${user_budget === '< 5k'? styles.choosen : ''}`} onClick={e => budgetClick('< 5k')}>
                        {`< 5k`}
                      </div>
                      <div className={`${styles.form_item_content_budget_opt} ${user_budget === '5k-10k'? styles.choosen : ''}`} onClick={e => budgetClick('5k-10k')}>
                        {`5k-10k`}
                      </div>
                      <div className={`${styles.form_item_content_budget_opt} ${user_budget === '10k-25k'? styles.choosen : ''}`} onClick={e => budgetClick('10k-25k')}>
                        {`10k-25k`}
                      </div>
                      <div className={`${styles.form_item_content_budget_opt} ${user_budget === '25k-50k'? styles.choosen : ''}`} onClick={e => budgetClick('25k-50k')}>
                        {`25k-50k`}
                      </div>
                      <div className={`${styles.form_item_content_budget_opt} ${user_budget === '> 50k'? styles.choosen : ''}`} onClick={e => budgetClick('> 50k')}>
                        {`> 50k`}
                      </div>
                    </div>
                </div>
            </div> */}
            <motion.button className={styles.submit} type='submit' onClick={sendEmail}
            whileTap={{scale: 0.95}} whileHover={{scale: 1.05}}>Send</motion.button>
        </motion.form>
    </div>
  )
}

export default ContactForm