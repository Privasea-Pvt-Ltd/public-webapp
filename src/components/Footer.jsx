import './styles/Footer.css'
import { copyrightSections } from "../constants";
import { socialLinks } from "../constants";
import React from 'react'
import Accordion from './Accordion';

const Footer = () => {
    return (
        <footer>
            <div className='footer-wrapper'>
                {
                    copyrightSections.map((item) => (
                        <div className={`section section${Number(item.id) + 1}`} key={item.id}>
                            <h4>{item.title}</h4>
                            <ul>
                                {
                                    (item.links).map((subItem) => (
                                        <li key={subItem.id}><a href={subItem.url}>{subItem.name}</a></li>
                                    ))
                                }
                            </ul>
                        </div>
                    ))
                }
                <Accordion items={copyrightSections} />
            </div>
            <div className="copyright-footer">
                <span>Copyright © 2025 Enkey Inc. All rights reserved.</span>
                <div className="copyright-links">
                    <a href="#">Terms & Conditions</a>|
                    <a href="#">Privacy</a>|
                    <a href="#">Cookie Preference</a>
                </div>
                <div className="social-links">
                    {
                        socialLinks.map((item) => (
                            <a href={item.url} title={item.title} key={item.id}><i className={`ph ${item.iconName}`}></i></a>
                        ))
                    }
                </div>
            </div>
        </footer>
    )
}

export default Footer
