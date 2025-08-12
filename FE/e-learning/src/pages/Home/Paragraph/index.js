import { useEffect } from 'react';
import './style.scss';
import tailieu from '../../../assets/images/icon-tailieu.png';
import lich from '../../../assets/images/icon-lich.png';
import nhom from '../../../assets/images/icon-nhom.png';
import video from '../../../assets/videos/video.mp4'
import { Link } from 'react-router-dom';
import AOS from "aos";
import "aos/dist/aos.css";

function Paragraph() {
    useEffect(() => {
        const items = document.querySelectorAll('.success-item');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add('show');
                        }, index * 150); // delay so le từng item
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.5 }
        );

        items.forEach(item => observer.observe(item));
        return () => observer.disconnect();
    }, []);

    // animation strong-list
    useEffect(() => {
        const list = document.querySelector('.strong-points-list');

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        list.classList.add('zoom-in');
                    }
                });
            },
            { threshold: 0.2 }
        );

        if (list) {
            observer.observe(list);
        }

        return () => observer.disconnect();
    }, []);

    // animation define-www
    useEffect(() => {
        AOS.init({
            offset: window.innerHeight * 0.1,
            duration: 1000
        });
    }, []);



    return (
        <div className="paragraph">
            <div className='paragraph-content'>
                <div className='our-success'>
                    <h1>Our Success</h1>
                    <p>
                        Ornare id fames interdum porttitor nulla turpis etiam. Diam vitae sollicitudin
                        at nec nam et pharetra gravida. Adipiscing a quis ultrices eu ornare tristique vel nisl orci.
                    </p>
                    <div className='success-list'>
                        <div className='success-item'>
                            <h2>1000+</h2>
                            <p>Students</p>
                        </div>
                        <div className='success-item'>
                            <h2>80%</h2>
                            <p>Total success</p>
                        </div>
                        <div className='success-item'>
                            <h2>100+</h2>
                            <p>Courses</p>
                        </div>
                        <div className='success-item'>
                            <h2>50+</h2>
                            <p>Teachers</p>
                        </div>
                        <div className='success-item'>
                            <h2>16</h2>
                            <p>Years</p>
                        </div>
                    </div>

                </div>
                <div className='strong-points tab'>
                    <div className='strong-points-header tab-header'>
                        <h1 className='strong-points-header-1 tab-header-1'>All-In-One</h1>
                        <h1 className='strong-points-header-2 tab-header-2'>Cloud Software</h1>
                    </div>
                    <div className='strong-points-content tab-sub'>
                        <p>WWW is one powerful online software suite that combines all the tools needed to run
                            <br />a successful school or office.
                        </p>

                    </div>
                    <div className='strong-points-list tab-list-cards'>
                        <div className='strong-points-item tab-card'>
                            <img src={tailieu} alt="Tài liệu" />
                            <h2>Online Billing,<br /> Invoicing, & Contracts</h2>
                            <p>Simple and secure control of your
                                <br />organization’s financial and legal
                                <br />transactions. Send customized
                                <br />invoices and contracts</p>
                        </div>
                        <div className='strong-points-item tab-card'>
                            <img src={lich} alt="Lịch học" />
                            <h2>Easy Scheduling &<br /> Attendance Tracking</h2>
                            <p>Schedule and reserve classrooms at
                                <br />one campus or multiple campuses.
                                <br />Keep detailed records of student
                                <br />attendance</p>
                        </div>
                        <div className='strong-points-item tab-card'>
                            <img src={nhom} alt="Nhóm học tập" />
                            <h2>Customer Tracking</h2>
                            <p>Automate and track emails to
                                <br />individuals or groups. Skilline’s
                                <br />built-in system helps organize
                                <br />your organization</p>
                        </div>
                    </div>
                </div>
                <div className='define-www tab' data-aos="fade-up" data-aos-delay="200" >
                    <div className='define-www-header tab-header'>
                        <h1 className='define-www-header-1 tab-header-1'>What is </h1>
                        <h1 className='define-www-header-2 tab-header-2'>WWW?</h1>
                    </div>
                    <div className='define-www-content tab-sub'>
                        <p>WWW is a platform that allows educators to create online classes whereby they can
                            <br />store the course materials online; manage assignments, quizzes and exams; monitor
                            <br />due dates; grade results and provide students with feedback all in one place.</p>
                    </div>
                    <div className='define-www-list tab-list-cards'>
                        <div className='define-www-item-1 tab-card'>
                            <h2>FOR INSTRUCTORS</h2>
                            <Link to='/about'>
                                <button className='button-card btn-card-1'>
                                    <span>Start a class today</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 74 74"
                                        height="34"
                                        width="34"
                                    >
                                        <circle stroke-width="3" stroke="white" r="35.5" cy="37" cx="37"></circle>
                                        <path
                                            fill="white"
                                            d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z"
                                        ></path>
                                    </svg>
                                </button>
                            </Link>
                        </div>
                        <div className='define-www-item-2 tab-card'>
                            <h2>FOR STUDENTS</h2>
                            <Link to='/about'>
                                <button className='button-card btn-card-2'>
                                    <span>Enter access code</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 74 74"
                                        height="34"
                                        width="34"
                                    >
                                        <circle stroke-width="3" stroke="white" r="35.5" cy="37" cx="37"></circle>
                                        <path
                                            fill="white"
                                            d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z"
                                        ></path>
                                    </svg>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='www-can-do tab' >
                    <div className='www-can-do-content' data-aos="fade-right">
                        <div className='www-can-do-header tab-header'>
                            <h1 className='www-can-do-header-1 tab-header-1'>Everything you can do in a physical
                                <br /> classroom,<span className='www-can-do-header-2 tab-header-2'> you can do with WWW</span>
                            </h1>
                        </div>
                        <div className='www-can-do-sub'>
                            <p>
                                TOTC’s school management software helps traditional
                                <br />and online schools manage scheduling, attendance,
                                <br />payments and virtual classrooms all in one secure
                                <br />cloud-based system.
                            </p>
                        </div>
                        <div className='www-can-do-learn-more'>
                            <Link to='/about'>Learn more</Link>
                        </div>
                    </div>

                    <div className='www-can-do-video' data-aos="fade-left">
                        <video width="640" height="360" controls>
                            <source src={video} type="video/mp4" />
                        </video>



                    </div>
                </div>
            </div>
        </div>
    );
}

export default Paragraph;
