import { useEffect } from 'react';
import './style.scss';
import tailieu from '../../../images/icon-tailieu.png';
import lich from '../../../images/icon-lich.png';
import nhom from '../../../images/icon-nhom.png';
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
            { threshold: 0.8 }
        );

        if (list) {
            observer.observe(list);
        }

        return () => observer.disconnect();
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
                <div className='strong-points'>
                    <div className='strong-points-header'>
                        <h1 className='strong-points-header-1'>All-In-One</h1>
                        <h1 className='strong-points-header-2'>Cloud Software</h1>
                    </div>
                    <div className='strong-points-content'>
                        <p>WWW is one powerful online software suite that combines all the tools needed to run
                            <br />a successful school or office.
                        </p>

                    </div>
                    <div className='strong-points-list'>
                        <div className='strong-points-item'>
                            <img src={tailieu} alt="Tài liệu" />
                            <h2>Online Billing,<br /> Invoicing, & Contracts</h2>
                            <p>Simple and secure control of your
                                <br />organization’s financial and legal
                                <br />transactions. Send customized
                                <br />invoices and contracts</p>
                        </div>
                        <div className='strong-points-item'>
                            <img src={lich} alt="Lịch học" />
                            <h2>Easy Scheduling &<br /> Attendance Tracking</h2>
                            <p>Schedule and reserve classrooms at
                                <br />one campus or multiple campuses.
                                <br />Keep detailed records of student
                                <br />attendance</p>
                        </div>
                        <div className='strong-points-item'>
                            <img src={nhom} alt="Nhóm học tập" />
                            <h2>Customer Tracking</h2>
                            <p>Automate and track emails to
                                <br />individuals or groups. Skilline’s
                                <br />built-in system helps organize
                                <br />your organization</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Paragraph;
