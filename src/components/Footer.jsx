import React from 'react';

const Footer = () => {
    return (
        <>
            <div id="upper-footer">
                <div id="social-link">
                    <h5>CONNECT WITH US</h5>
                    <ul>
                        <li><a href="https://www.facebook.com/TwoGoodCo" target="_blank" rel="noreferrer"><p>Facebook</p></a></li>
                        <li><a href="https://www.instagram.com/twogoodco/" target="_blank" rel="noreferrer"><p>Instagram</p></a></li>
                        <li><a href="https://x.com/twogoodco" target="_blank" rel="noreferrer"><p>Twitter</p></a></li>
                        <li><a href="https://www.linkedin.com/company/twogoodco" target="_blank" rel="noreferrer"><p>LinkedIn</p></a></li>
                        <li><a href="https://www.youtube.com/channel/UCCfo4CF8hmDUQdcO5_MWONw" target="_blank" rel="noreferrer"><p>YouTube</p></a></li>
                    </ul>
                </div>
                <div className="mid-footer">
                    <div id="img-footer"><center><img src="/logo.jpg" alt="Two Good Co Logo" height="215px" width="215px" /></center></div><br /><br />
                    <div id="short-term">
                        <ul>
                            <li><p>&copy; Two Good Co. 2024</p></li>
                            <li><p>Terms of Use</p></li>
                            <li><p>Privacy Policy</p></li>
                        </ul>
                    </div>
                </div>
                <div id="other-link">
                    <h5>THE NITTY GRITTIES</h5>
                    <ul>
                        <li><a href="#"><p>Good Things FAQs</p></a></li>
                        <li><a href="#"><p>Good Food FAQs</p></a></li>
                        <li><a href="#"><p>Good Places</p></a></li>
                        <li><a href="#"><p>Pathways</p></a></li>
                        <li><a href="#"><p>Careers</p></a></li>
                        <li><a href="#"><p>Wholesale</p></a></li>
                    </ul>
                </div>
            </div><br /><br /><br />
            <div id="lowwer-footer"><center>
                <p>We are proud and privileged to have our home on this land, and to be able to continue the long tradition of community coming together around food, begun </p>
                <p>thousands of years ago by First Nations peoples. As we stand together on this unceded land, we acknowledge our First Nations people, are the original </p>
                <p>custodians of this land, and we recognise their deep connection to land, water, sky and community which continues today. We pay our deep respects to </p>
                <p>community elders, past, present and emerging, for they hold the memories, the traditions, the culture and hopes of Aboriginal and Torres Strait Islander </p>
                <p>peoples. Always was, always will be Aboriginal land. </p></center>
            </div><br /><br /><br />
        </>
    );
}

export default Footer;
