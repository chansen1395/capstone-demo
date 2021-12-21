import React, { useRef } from 'react';
import emailjs from 'emailjs-com';

export const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_fp25jfp', 'contact_template_satg', form.current, 'user_pR7qUbAWiWbrbBKSdeVhS')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
      <label>Name</label>
      <input type="text" name="name" required/>
      <label>Email</label>
      <input type="email" name="email" required/>
      <label>Name of Group</label>
      <input type="text" name="group_name"/>
      <label>How many visitors?</label>
      <input type="number" name="group_size" step/>
      <label>Planned date of visit</label>
      <input type="textarea" name="visit_date"/>
      <label>Describe any planned activities or anything else you'd like to share.</label>
      <textarea name="notes" />
      <input type="submit" value="Send" />
    </form>
  );
};