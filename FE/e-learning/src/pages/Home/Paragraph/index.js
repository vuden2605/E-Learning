import { use, useEffect, useRef, useState } from 'react';
import './style.scss';
import { FaArrowRightLong } from "react-icons/fa6";
import tailieu from '../../../assets/images/icon-tailieu.png';
import lich from '../../../assets/images/icon-lich.png';
import nhom from '../../../assets/images/icon-nhom.png';
import video from '../../../assets/videos/video.mp4';
import featureicon1 from '../../../assets/images/icon-feature1.png';
import featureicon2 from '../../../assets/images/icon-feature2.png';
import featureicon3 from '../../../assets/images/icon-feature3.png';
import table from '../../../assets/images/table.png';
import faceid from '../../../assets/images/faceid.png';
import faceid1 from '../../../assets/images/faceid1.png';
import faceid2 from '../../../assets/images/faceid2.png';
import faceid3 from '../../../assets/images/faceid3.png';
import faceid4 from '../../../assets/images/faceid4.png';
import btnPresent from '../../../assets/images/btn-present.png';
import btnCall from '../../../assets/images/btn-call.png';
import home1 from '../../../assets/images/home1.png';
import home2 from '../../../assets/images/home2.png';
import home3 from '../../../assets/images/home3.png';
import home4 from '../../../assets/images/home4.png';
import sv from '../../../assets/images/sv.png';
import rate from '../../../assets/images/rate.png';
import blog from '../../../assets/images/blog.png';
import blog1 from '../../../assets/images/blog1.png';
import blog2 from '../../../assets/images/blog2.png';
import blog3 from '../../../assets/images/blog3.png';

import CourseCard from '../../../components/CourseCard';


import { Link } from 'react-router-dom';
import AOS from "aos";
import "aos/dist/aos.css";
import { CourseService } from '../../../services/CourseService';
function Paragraph() {
    const [topCourses, setTopCourses] = useState([]);
    useEffect(() => {
        const fetchTopCourses = async () => {
            try {
                const courses = await CourseService.findTopSellingCourses();
                setTopCourses(courses);
            } catch (error) {
                console.error("Error fetching top courses:", error);
            }
        };
        fetchTopCourses();
    }, []);
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

    // tự chạy video khi chạy tới 
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        video.play();
                    } else {
                        video.pause();
                        // video.currentTime = 0;
                    }
                });
            },
            { threshold: 0.5 } // 50% video nằm trong màn hình mới chạy
        );

        if (video) observer.observe(video);

        return () => {
            if (video) observer.unobserve(video);
        };
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
                        <p>VVV is one powerful online software suite that combines all the tools needed to run
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
                <div className='define-www tab' data-aos="fade-up" data-aos-delay="100" >
                    <div className='define-www-header tab-header'>
                        <h1 className='define-www-header-1 tab-header-1'>What is </h1>
                        <h1 className='define-www-header-2 tab-header-2'>VVV?</h1>
                    </div>
                    <div className='define-www-content tab-sub'>
                        <p>VVV is a platform that allows educators to create online classes whereby they can
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
                                <br /> classroom,<span className='www-can-do-header-2 tab-header-2'> you can do with VVV</span>
                            </h1>
                        </div>
                        <div className='www-can-do-sub'>
                            <p>
                                VVV’s school management software helps traditional
                                <br />and online schools manage scheduling, attendance,
                                <br />payments and virtual classrooms all in one secure
                                <br />cloud-based system.
                            </p>
                        </div>
                        <div className='www-can-do-learn-more'>
                            <Link to='/about'>Learn more</Link>
                        </div>
                    </div>
                    <div className='decoration-1'></div>
                    <div className='decoration-2'></div>
                    <div className='decoration-3'></div>
                    <div className='decoration-4'></div>

                    <div className='www-can-do-video' data-aos="fade-left">
                        <video ref={videoRef} width="640" height="360" controls muted >
                            <source src={video} type="video/mp4" />
                        </video>



                    </div>
                </div>
                <div className='features-www tab'>
                    <div className='features-www-header tab-header' data-aos="fade-up">
                        <h1 className='features-www-header-1 tab-header-1'>Our </h1>
                        <h1 className='features-www-header-2 tab-header-2'>Features</h1>
                    </div>
                    <div className='features-www-content tab-sub' data-aos="fade-right">
                        <p>This very extraordinary feature, can make learning activities more efficient</p>
                    </div>
                    <div className='features-list'>
                        <div className='feature-item' data-aos="zoom-in">
                            <div className='feature-item-img'>
                                <div className='layer1'>
                                    <div className='decoration-1'></div>
                                    <div className='decoration-2'></div>
                                    <div className='decoration-3'></div>
                                    <div className='decoration-4'></div>
                                </div>
                                <div className='layer2'>
                                    <img src={table} alt='table' style={{ marginTop: "50px", marginLeft: "40px", width: "80%", height: "80%" }} />
                                </div>
                                <div className='layer3'>
                                    <div className='item-1'>
                                        <img src={faceid} alt='faceid' className='faceid' />
                                        <div className='btn'>
                                            <img src={btnPresent} alt='btnPresent' className='btnPresent' />
                                            <img src={btnCall} alt='btnCall' className='btnCall' />
                                        </div>


                                    </div>
                                    <div className='circle-1'>

                                    </div>
                                    <div className='circle-2'>

                                    </div>
                                    <div className='item-2'>
                                        <img src={faceid1} alt='faceid1' className='faceid1' />
                                        <img src={faceid2} alt='faceid1' className='faceid2' />


                                    </div>
                                    <div className='item-3'>
                                        <img src={faceid3} alt='faceid3' className='faceid3' />
                                        <img src={faceid4} alt='faceid4' className='faceid4' />

                                    </div>
                                </div>
                            </div>
                            <div className='feature-item-content'>
                                <div className='feature-item-content-header tab-header'>
                                    <h1 className='feature-item-content-header-1 tab-header-1'>A
                                        <span className='feature-item-content-2 tab-header-2'> user interface </span>
                                        designed
                                        <br />for the classroom
                                    </h1>
                                </div>
                                <div className='feature-item-content-sub-list'>
                                    <div className='feature-item-content-sub-item'>
                                        <div className='feature-icon'>
                                            <img src={featureicon1} alt='feature-icon1' />
                                        </div>
                                        <span className='feature-item-content-sub-item-content'>
                                            Teachers don’t get lost in the grid view
                                            <br />and have a dedicated Podium space.

                                        </span>
                                    </div>
                                    <div className='feature-item-content-sub-item'>
                                        <div className='feature-icon'>
                                            <img src={featureicon2} alt='feature-icon1' />
                                        </div>
                                        <span className='feature-item-content-sub-item-content'>
                                            Teachers don’t get lost in the grid view
                                            <br />and have a dedicated Podium space.

                                        </span>
                                    </div>
                                    <div className='feature-item-content-sub-item'>
                                        <div className='feature-icon'>
                                            <img src={featureicon3} alt='feature-icon1' />
                                        </div>
                                        <span className='feature-item-content-sub-item-content'>
                                            Teachers don’t get lost in the grid view
                                            <br />and have a dedicated Podium space.

                                        </span>
                                    </div>


                                </div>

                            </div>

                        </div>
                        <div className='feature-item' data-aos="fade-left">

                            <div className='feature-item-content'>
                                <div className='feature-item-content-header tab-header margin-bottom-20px'>
                                    <h1 className='feature-item-content-header-1 tab-header-1'>
                                        <span className='feature-item-content-2 tab-header-2'> Tools </span>
                                        For Teachers
                                        <br />And Learners
                                    </h1>
                                </div>
                                <div className='feature-item-content-sub-list'>
                                    <div className='feature-item-content-sub-item'>
                                        Class has a dynamic set of teaching tools built to
                                        <br />be deployed and used during class.Teachers can
                                        <br />handout assignments in real-time for students to
                                        <br />complete and submit.
                                    </div>


                                </div>

                            </div>
                            <div className='feature-item-img'>
                                <img src={home1} alt='home1' style={{ width: '500px' }} />
                            </div>
                        </div>
                        <div className='feature-item' data-aos="fade-right">
                            <div className='feature-item-img'>
                                <img src={home2} alt='home2' style={{ width: '550px', marginLeft: '100px' }} />
                            </div>
                            <div className='feature-item-content'>
                                <div className='feature-item-content-header tab-header margin-bottom-20px'>
                                    <h1 className='feature-item-content-header-1 tab-header-1'>
                                        Assessments,
                                        <br /><span className='feature-item-content-2 tab-header-2'> Quizzes </span>
                                        , Tests
                                    </h1>
                                </div>
                                <div className='feature-item-content-sub-list'>
                                    <div className='feature-item-content-sub-item'>
                                        Easily launch live assignments, quizzes, and
                                        <br />tests. Student results are automatically entered in
                                        <br />the online gradebook.
                                    </div>


                                </div>

                            </div>
                        </div>
                        <div className='feature-item' data-aos="fade-up">

                            <div className='feature-item-content'>
                                <div className='feature-item-content-header tab-header margin-bottom-20px'>
                                    <h1 className='feature-item-content-header-1 tab-header-1'>
                                        <span className='feature-item-content-2 tab-header-2'> Class Management </span>
                                        <br />Tools for Educators
                                    </h1>
                                </div>
                                <div className='feature-item-content-sub-list'>
                                    <div className='feature-item-content-sub-item'>
                                        Class provides tools to help run and manage the class
                                        <br />such as Class Roster, Attendance, and more. With the
                                        <br />Gradebook, teachers can review and grade tests and
                                        <br />quizzes in real-time.
                                    </div>
                                </div>

                            </div>
                            <div className='feature-item-img'>
                                <img src={home3} alt='home3' style={{ width: '700px' }} />
                            </div>
                        </div>
                        <div className='feature-item' data-aos="fade-down">
                            <div className='feature-item-img'>
                                <img src={home4} alt='home4' style={{ width: '550px', marginLeft: '100px' }} />
                            </div>
                            <div className='feature-item-content'>
                                <div className='feature-item-content-header tab-header margin-bottom-20px'>
                                    <h1 className='feature-item-content-header-1 tab-header-1'>
                                        One-on-One
                                        <br /><span className='feature-item-content-2 tab-header-2'> Discussions </span>
                                    </h1>
                                </div>
                                <div className='feature-item-content-sub-list'>
                                    <div className='feature-item-content-sub-item'>
                                        Teachers and teacher assistants can talk with
                                        <br />students privately without leaving the Zoom
                                        <br />environment.
                                    </div>


                                </div>

                            </div>
                        </div>
                        <Link to='/about' data-aos="fade-up">
                            <button id="bottone1"><strong className='content'>See more features</strong><span className='icon'> <FaArrowRightLong /></span></button>
                        </Link>
                    </div>
                </div>
                <div className='www-top-course tab' data-aos="fade-up">
                    <div className="top-course">
                        <div className='header-course'>
                            <div
                                style={{
                                    width: "400px",
                                    fontSize: "2rem",
                                    fontWeight: "700",
                                    marginBottom: "20px",
                                    paddingTop: "50px",
                                    background: "linear-gradient(45deg, #1772B5, #f06595)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",

                                }}
                            >
                                KHÓA HỌC BÁN CHẠY
                            </div>
                            <Link to='/course'>
                                <button class="learn-more">
                                    <span class="circle" aria-hidden="true">
                                        <span class="icon arrow"></span>
                                    </span>
                                    <span class="button-text">Xem thêm</span>
                                </button>
                            </Link>

                        </div>

                        <div style={{ display: "flex", width: "1150px", gap: "40px" }} data-aos="fade-right">
                            {topCourses.map((course) =>
                                <CourseCard 
                                    key={course.id}
                                    id={course.id}
                                    title={course.title}
                                    description={course.description}
                                    price={course.price}
                                    discount={course.discount}
                                    thumbnailUrl={course.thumbnailUrl}
                                    
                                />)}
                        </div>
                    </div>
                </div>
                <div className='www-can-do tab' style={{ backgroundColor: "#F6EFEF" }} >
                    <div className='www-can-do-content' data-aos="fade-right">
                        <div style={{ width: "80%", display: "flex", marginBottom: "30px" }} ><hr style={{ border: "none", height: "1.5px", flex: "1", background: "#88889D", width: "70%", marginTop: "15px", marginRight: "10px" }} /><span style={{ flex: "3" }}>TESTIMONIAL</span> </div>

                        <div className='www-can-do-header tab-header'>
                            <h1 className='www-can-do-header-1 tab-header-1'>What They Say?
                                {/* <span className='www-can-do-header-2 tab-header-2'> Say?</span> */}
                            </h1>
                        </div>
                        <div className='www-can-do-sub'>
                            <ul style={{
                                paddingLeft: "0px", display: "flex",
                                flexDirection: "column", gap: "10px",
                                marginBottom: "50px"
                            }}>
                                <li>VVV has got more than 100k positive ratings
                                    <br />from our users around the world. </li>
                                <li>Some of the students and teachers were
                                    <br />greatly helped by the Skilline.</li>
                                <li>Are you too? Please give your assessment!</li>

                            </ul>
                        </div>
                        <div className='www-can-do-learn-more'>
                            <Link to='/about'>
                                <button class="continue-application">
                                    <div>
                                        <div class="pencil"></div>
                                        <div class="folder">
                                            <div class="top">
                                                <svg viewBox="0 0 24 27">
                                                    <path d="M1,0 L23,0 C23.5522847,-1.01453063e-16 24,0.44771525 24,1 L24,8.17157288 C24,8.70200585 23.7892863,9.21071368 23.4142136,9.58578644 L20.5857864,12.4142136 C20.2107137,12.7892863 20,13.2979941 20,13.8284271 L20,26 C20,26.5522847 19.5522847,27 19,27 L1,27 C0.44771525,27 6.76353751e-17,26.5522847 0,26 L0,1 C-6.76353751e-17,0.44771525 0.44771525,1.01453063e-16 1,0 Z"></path>
                                                </svg>
                                            </div>
                                            <div class="paper"></div>
                                        </div>
                                    </div>
                                    Viết đánh giá của bạn
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className='decoration-1'></div>
                    <div className='decoration-2'></div>
                    {/* <div className='decoration-3'></div>
                    <div className='decoration-4'></div> */}

                    <div className='www-can-do-video' data-aos="fade-left">
                        <img src={sv} alt='sv' style={{ height: "500px" }} />

                    </div>
                    <div className='rate' style={{ position: "absolute", right: "60px", bottom: "20px", borderRadius: "20px" }}>
                        <img src={rate} alt='rate' style={{ borderRadius: "20px" }} />
                    </div>
                    <div className='btn-more-arrow' style={{ position: "absolute", right: "60px", bottom: "60%" }}>
                        <Link to='/about' style={{ textDecoration: "none" }}><button class="btn-cmt">
                            Xem thêm
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="15px" width="15px" class="icon">
                                <path stroke-linejoin="round" stroke-linecap="round" stroke-miterlimit="10" stroke-width="1.5" stroke="#292D32" d="M8.91016 19.9201L15.4302 13.4001C16.2002 12.6301 16.2002 11.3701 15.4302 10.6001L8.91016 4.08008"></path>
                            </svg>
                        </button></Link>

                    </div>
                </div>
                <div className='blogs-www tab'>
                    <div className='blogs-www-header tab-header' data-aos="fade-up">
                        <h1 className='blogs-www-header-1 tab-header-1'>Lastest News and Resources</h1>
                    </div>
                    <div className='blogs-www-content tab-sub' data-aos="fade-right">
                        <p>See the developments that have occurred to VVV in the world</p>
                    </div>
                    <div className='blogs-body'>
                        <div className='blogs-body-left' data-aos="fade-up">
                            <Link className='blog-top-1'>
                                <img src={blog} alt='blog' style={{ width: "100%" }} />
                                <span className='blog-type'>NEWS</span>
                                <h2 className='blog-title'>Class adds $30 million to its balance sheet for a Zoom-friendly edtech solution</h2>
                                <p className='blog-content'>Class, launched less than a year ago by Blackboard co-founder Michael Chasen, integrates exclusively...</p>
                            </Link>
                            <Link to='/blog' className='read-more'>Xem thêm</Link>
                        </div>
                        <div className='blogs-body-right'>
                            <div className='blogs-top-list'>
                                <Link className='blog-item' data-aos="fade-right">
                                    <div className='blog-item-img'>
                                        <img src={blog1} alt='blog1' style={{ width: "200px" }} />
                                        <span className='blog-type absolute'>PRESS RELEASE</span>

                                    </div>
                                    <div className='blog-item-content'>
                                    <h3 className='title'>Class Technologies Inc. Closes $30 Million Series A Financing to Meet High Demand</h3>
                                    <p className='body'>Class Technologies Inc., the company that created Class,...</p>
                                    </div>
                                </Link>
                                <Link className='blog-item' data-aos="fade-right">
                                    <div className='blog-item-img'>
                                        <img src={blog2} alt='blog1' style={{ width: "200px" }} />
                                        <span className='blog-type absolute'>NEWS</span>

                                    </div>
                                    <div className='blog-item-content'>
                                    <h3 className='title'>Class Technologies Inc. Closes $30 Million Series A Financing to Meet High Demand</h3>
                                    <p className='body'>Class Technologies Inc., the company that created Class,...</p>
                                    </div>
                                </Link>
                                <Link className='blog-item' data-aos="fade-right">
                                    <div className='blog-item-img'>
                                        <img src={blog3} alt='blog1' style={{ width: "200px" }} />
                                        <span className='blog-type absolute'>PRESS RELEASE</span>

                                    </div>
                                    <div className='blog-item-content'>
                                    <h3 className='title'>Class Technologies Inc. Closes $30 Million Series A Financing to Meet High Demand</h3>
                                    <p className='body'>Class Technologies Inc., the company that created Class,...</p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Paragraph;
