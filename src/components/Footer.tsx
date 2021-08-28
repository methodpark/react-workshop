import React from 'react'

interface FooterProps {
    companyName: string;
    year: number;
}

function Footer({companyName, year}: FooterProps) {
    return <span>Copyleft (ℓ) {year} {companyName}.</span>
}

export default Footer;
