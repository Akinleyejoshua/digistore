import Image from "next/image";
import { FaGithub, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import styles from "./page.module.css";

export default function Page() {
  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.logo}>DigiStore</div>
        <nav className={styles.nav}>
          <a href="#home">Home</a>
          <a href="#templates">Templates</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        <h1>Premium Website Templates</h1>
        <p>Download high-quality, responsive templates for your next project</p>
        <button className={styles.cta}>Explore Templates</button>
      </section>

      {/* Services Section */}
      <section className={styles.services}>
        <h2>Our Templates</h2>
        <div className={styles.serviceGrid}>
          {['E-commerce', 'Portfolio', 'Blog', 'Landing Page'].map((service) => (
            <div key={service} className={styles.serviceCard}>
              <h3>{service}</h3>
              <p>Professional {service} templates with modern design</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className={styles.about}>
        <h2>About Us</h2>
        <p>We create premium website templates that help businesses and individuals establish a strong online presence.</p>
      </section>

      {/* Contact Section */}
      <section className={styles.contact}>
        <h2>Connect With Us</h2>
        <div className={styles.socialLinks}>
          <a href="#"><FaGithub /></a>
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaLinkedin /></a>
          <a href="#"><FaInstagram /></a>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <p>&copy; 2024 DigiStore. All rights reserved.</p>
      </footer>
    </div>
  );
}