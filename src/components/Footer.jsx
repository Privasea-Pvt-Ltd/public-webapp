import './styles/Footer.css'
import React from 'react'

const Footer = () => {
  return (
    <footer>
      <div className='footer-wrapper'>
        <div className='section section1'>
            <h4>Company</h4>
            <ul>
                <li><a href='#'>About Enkey</a></li>
                <li><a href='#'>Blogs</a></li>
                <li><a href='#'>Newsroom</a></li>
                <li><a href='#'>Customer Stories</a></li>
                <li><a href='#'>Office Location</a></li>
                <li><a href='#'>Careers</a></li>
            </ul>
        </div>
        <div className='section section2'>
            <h4>Sales</h4>
            <ul>
                <li><a href='#'>Where to Buy</a></li>
                <li><a href='#'>Contact Us</a></li>
            </ul>
        </div>
        <div className='section section3'>
            <h4>Compatibility</h4>
            <ul>
                <li><a href='#'>HDD/SSD</a></li>
                <li><a href='#'>Other Devices</a></li>
            </ul>
        </div>
        <div className='section section4'>
            <h4>Resources</h4>
            <ul>
                <li><a href='#'>Products A-Z</a></li>
                <li><a href='#'>Beta Program</a></li>
                <li><a href='#'>Bounty Program</a></li>
                <li><a href='#'>Community</a></li>
                <li><a href='#'>Subscribe to Newsletter</a></li>
            </ul>
        </div>
      </div>
      <div className="copyright-footer">
        <span>Copyright © 2025 Enkey Inc. All rights reserved.</span>
        <div className="copyright-links">
            <a href="#">Terms & Conditions</a>|
            <a href="#">Privacy</a>|
            <a href="#">Cookie Preference</a>
        </div>
        <div className="social-links">
            <a href="#" title='Meta'><i class="ph ph-meta-logo"></i></a>
            <a href="#" title='X'><i class="ph ph-x-logo"></i></a>
            <a href="#" title='Youtube'><i class="ph ph-youtube-logo"></i></a>
            <a href="#" title='Instagram'><i class="ph ph-instagram-logo"></i></a>
            <i class="ph ph-globe"></i>
            <select name="language" id="language">
                <option value="english">English</option>
                <option value="lang1">Language 1</option>
                <option value="lang2">Language 2</option>
                <option value="lang3">Language 3</option>
            </select>
        </div>
      </div>
    </footer>
  )
}

export default Footer
