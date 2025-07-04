'use client'
import Image from "next/image";
import styles from "./page.module.css";
import { useParams } from 'next/navigation';
import { product, data } from '@/constants/states';
import { useEffect, useState } from "react";

import SaaSLogo from "@/public/imgs/saas-template-v0.png"
import dynamic from "next/dynamic";
import { FaDownload, FaEye } from "react-icons/fa";
const PaystackButton = dynamic(() => import('react-paystack').then(mode => mode.PaystackButton), { ssr: false })

export default function Page() {
    const [data, setData] = useState({
        currency: "USD",
        currencySymbol: "$",
    })

    const [product, setProduct] = useState([
        {
            id: 1,
            name: "Ultra SaaS Template",
            price: 4,
            discount: 1.9,
            currency: data.currency,
            currencySymbol: data.currencySymbol,
            image: SaaSLogo,
            downloads: "500+",
            views: "500+",
            link: "https://saas-templatev0.vercel.app",
            description: `This is a beautiful SaaS template that you can use to build your next project`
        },
    ])
    const [rates, setRates] = useState(0);

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handlePayment = () => {
        if (!validateEmail(email)) {
            setEmailError('Please enter a valid email');
            return;
        }
        setEmailError('');
        // Payment processing logic here
    };
    const [downloaded, setDownloaded] = useState(false);

    useEffect(() => {
        try {
            fetch(`https://api.exchangerate-api.com/v4/latest/${data.currency}`).then(res => res.json())
                .then(res => {
                    const new_rate = res.rates["NGN"]
                    setRates(new_rate);
                }).catch(err => { })
        } catch (err) {

        }

        setDownloaded(localStorage.getItem("saas-template-v0") === "true");


    }, [])
    const params = useParams();
    const productData = product.find(p => p.id === parseInt(params.id));

    if (!productData) return <div>Product not found</div>;

    const config = {
        reference: (new Date()).getTime().toString(),
        email: email,
        amount: productData.discount * 100 * rates,
        publicKey: process.env.NEXT_PUBLIC_PAYSTACK_LIVE_KEY,
    };

    const download = () => {
        const link = document.createElement('a');
        link.href = "/downloads/saas-template-v0.rar";
        link.download = "saas-template-v0.zip";
        link.click();
    }

    return (
        <div className={styles.container}>
            <div className={styles.productCard}>
                <div className={styles.imageContainer}>
                    <Image
                        src={productData.image}
                        alt={productData.name}
                        fill
                        style={{ objectFit: 'cover' }}
                    />
                </div>

                <div className={styles.productInfo}>
                    <h1>{productData.name}</h1>
                    <p>{productData.description}</p>
                    <a target="_blank" href={productData.link}>VIEW DEMO</a>

                    <div className={styles.metricsBar}>
                        <div className={styles.metric}>
                            <FaEye className={styles.metricIcon} />
                            <span>{productData.views || 0} views</span>
                        </div>
                        <div className={styles.metricDivider} />
                        <div className={styles.metric}>
                            <FaDownload className={styles.metricIcon} />
                            <span>{productData.downloads || 0} downloads</span>
                        </div>
                    </div>
                    <div className={styles.priceContainer}>
                        {productData.discount ? (
                            <>
                                <span className={styles.originalPrice}>
                                    {productData.currencySymbol}{productData.price}
                                </span>
                                <span className={styles.discountedPrice}>
                                    {productData.currencySymbol}
                                    {productData.discount}
                                </span>
                            </>
                        ) : (
                            <span className={styles.price}>
                                {productData.currencySymbol}{productData.price}
                            </span>
                        )}
                    </div>
                    {downloaded ?
                        <button onClick={download} className={styles.payButton}>Download</button>
                        :
                        <>
                            <div className={styles.emailSection}>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        handlePayment();
                                     }}
                                    className={styles.emailInput}
                                />
                                {emailError && <span className={styles.errorText}>{emailError}</span>}
                            </div>
                            {email != "" &&  
                                <PaystackButton
                                    {...config}
                                    onSuccess={(response) => {
                                        console.log(response);
                                        localStorage.setItem("saas-template-v0", "true");
                                        setDownloaded(true);
                                        download()
                                    }}
                                    text="Download Now"
                                    className={styles.payButton}
                                />
                            }
                            
                        </>

                    }

                </div>
            </div>
        </div>
    );
}
