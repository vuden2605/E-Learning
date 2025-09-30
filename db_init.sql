Tạo database
CREATE DATABASE IF NOT EXISTS `E-LearningTest`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `E-LearningTest`;

-- Bảng Users
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    avatar_url VARCHAR(255),
    role VARCHAR(50) DEFAULT 'USER',
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bảng Instructors (1-1 với Users, dùng chung id)
CREATE TABLE instructors (
    id BIGINT PRIMARY KEY,
    education VARCHAR(255),
    experience VARCHAR(255),
    specialization VARCHAR(255),
    cv_url VARCHAR(255),
    school_name VARCHAR(255),
    is_approved BOOLEAN DEFAULT FALSE,
    CONSTRAINT fk_instructor_user FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE
);

-- Bảng Categories
CREATE TABLE categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    thumbnail_url VARCHAR(255)
);

-- Bảng Courses
CREATE TABLE courses (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description VARCHAR(500),
    category_id BIGINT,
    thumbnail_url VARCHAR(255),
    student_count INT DEFAULT 0,
    discount_percent BIGINT,
    price BIGINT,
    average_rating DOUBLE DEFAULT 0.0,
    total_ratings BIGINT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    is_approved BOOLEAN DEFAULT FALSE,
    instructor_id BIGINT,
    CONSTRAINT fk_course_category FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
    CONSTRAINT fk_course_instructor FOREIGN KEY (instructor_id) REFERENCES instructors(id) ON DELETE SET NULL
);

-- Bảng Lessons
CREATE TABLE lessons (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    lesson_number INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT FALSE,
    course_id BIGINT,
    CONSTRAINT fk_lesson_course FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

-- Bảng Materials
CREATE TABLE materials (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description VARCHAR(500),
    type VARCHAR(100),
    url VARCHAR(255),
    order_index INT,
    duration_in_seconds INT,
    lesson_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_material_lesson FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
);

INSERT INTO users (id,full_name, email, password, avatar_url, role, active)
VALUES
(1,'Nguyen Van A', 'a@example.com', '12345678', 'https://i.pravatar.cc/150?img=1', 'INSTRUCTOR', TRUE),
(2,'Tran Thi B', 'b@example.com', '12345678', 'https://i.pravatar.cc/150?img=2', 'INSTRUCTOR', TRUE),
(3,'Le Van C', 'c@example.com', '12345678', 'https://i.pravatar.cc/150?img=3', 'INSTRUCTOR', TRUE);

INSERT INTO instructors (id, education, experience, specialization, cv_url, school_name, is_approved)
VALUES
(1, 'Thạc sĩ CNTT', '5 năm giảng dạy', 'Lập trình Java', 'https://example.com/cv/a.pdf', 'UEH', TRUE),
(2, 'Thạc sĩ QTKD', '3 năm giảng dạy', 'Quản trị dự án', 'https://example.com/cv/b.pdf', 'FTU', TRUE),
(3, 'Cử nhân Thiết kế', '4 năm giảng dạy', 'Thiết kế UX/UI', 'https://example.com/cv/c.pdf', 'Arena Multimedia', TRUE);
INSERT INTO categories (name, description, thumbnail_url) VALUES
('Lập trình Java', 'Khóa học lập trình Java từ cơ bản đến nâng cao','https://resources.iostream.co/content/article/tong-quan-ve-ngon-ngu-lap-trinh-java/thumbnail-hd/blob-1600511467219@960x540.jpg'),
('Phát triển Web BackEnd', 'Xây dựng ứng dụng web với Spring Boot và Hibernate','https://hrchannels.com/uptalent/attachments/images/20210720/1626745342421-lo-trinh-thang-tien-back-end-2.jpg'),
('Lập trình Python', 'Khóa học Python cho người mới bắt đầu và nâng cao','https://viettuts.vn/images/python/python-la-gi.png'),
('Phát triển Web Frontend', 'HTML, CSS, JavaScript, React, Angular','https://toidicodedao.com/wp-content/uploads/2018/07/web-development.jpg?w=1024&h=567&crop=1'),
('Cơ sở dữ liệu SQL', 'Học SQL Server, MySQL, PostgreSQL','https://qtu.edu.vn/wp-content/uploads/2023/08/co-so-du-lieu.png'),
('Khoa học dữ liệu', 'Phân tích dữ liệu, Machine Learning cơ bản','https://www.vlu.edu.vn/_next/image?url=https%3A%2F%2Fvluwebmedia.s3.ap-southeast-1.amazonaws.com%2Fimage_30ae68c317.png&w=1920&q=75'),
('Trí tuệ nhân tạo (AI)', 'Học các thuật toán AI và ứng dụng thực tế','https://funix.edu.vn/wp-content/uploads/2023/09/tri-tue-nhan-tao-AI-4-2.jpg'),
('Lập trình Mobile', 'Xây dựng ứng dụng Android và iOS với Flutter, React Native','https://toidicodedao.com/wp-content/uploads/2015/08/war.png?w=1024&h=567&crop=1'),
('An ninh mạng', 'Các nguyên tắc bảo mật, phòng chống tấn công mạng','https://hrchannels.com/uptalent/attachments/images/20200507/1588825415173-vai-tro-chuyen-vien-an-ninh-mang-1.jpg'),
('Kỹ năng mềm', 'Giao tiếp, làm việc nhóm, quản lý thời gian','https://images.viblo.asia/17c53c9f-52ce-4825-8363-402ecddc5401.jpg');
-- Category 1: Lập trình Java
INSERT INTO courses (title, description, category_id, thumbnail_url, student_count, discount_percent, price, average_rating, total_ratings, is_active, is_approved, instructor_id)
VALUES
('Java Cơ Bản', 'Khóa học Java từ nhập môn đến OOP', 1, 'https://s3-sgn09.fptcloud.com/codelearnstorage/files/thumbnails/lap-trinh-huong-doi-tuong-trong-java_da49c404556247e898bbc0e435476936.png', 200, 10, 1000000, 0.0, 0, 1, 1, 1),
('Java Nâng Cao', 'Java nâng cao', 1, 'https://gpcoder.com/wp-content/uploads/2018/02/java-multithread.png', 150, 15, 1500000, 0.0, 0, 1, 1, 1),
('Spring Boot Cơ Bản', 'Xây dựng ứng dụng web với Spring Boot', 1, 'https://topdev.vn/blog/wp-content/uploads/2021/03/spring-boot.jpg', 300, 20, 2000000, 0.0, 0, 1, 1, 1),
('Hibernate JPA', 'ORM với Hibernate và JPA trong Java', 1, 'https://shareprogramming.net//wp-content/uploads/2020/09/hibernate.png', 120, 10, 1200000, 0.0, 0, 1, 1, 1),
('Java Web Servlet/JSP', 'Xây dựng ứng dụng web với Servlet và JSP', 1, 'https://stackjava.com/wp-content/uploads/2018/01/jsp-servlet-logo.png', 180, 5, 900000, 0.0, 0, 1, 1, 1);

-- Category 2: Spring Boot Web
INSERT INTO courses (title, description, category_id, thumbnail_url, student_count, discount_percent, price, average_rating, total_ratings, is_active, is_approved, instructor_id)
VALUES
('Spring Boot REST API', 'Xây dựng REST API với Spring Boot', 2, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-GXmvS_iqYbxs59NBlCLU8wUva0pDyoJegw&s', 250, 15, 1500000, 0.0, 0, 1, 1, 1),
('Spring Security', 'Bảo mật ứng dụng với Spring Security', 2, 'https://winzone.vn/images/blog/spring_security.jpeg', 180, 20, 1800000, 0.0, 0, 1, 1, 1),
('Spring Boot Microservices', 'Triển khai Microservices với Spring Cloud', 2, 'https://mlz8prml4nnc.i.optimole.com/cb:1kp5.54a9a/w:768/h:402/q:mauto/f:best/https://fullscale.io/wp-content/uploads/2024/02/spring-boot-microservices-architecture.png', 220, 25, 2500000, 0.0, 0, 1, 1, 1),
('Spring Boot + React', 'Xây dựng web fullstack với Spring Boot và React', 2, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMbZX8RioCxdU9fMWNn9MAhoSOA3IfMZjZ3w&s', 140, 10, 2000000, 0.0, 0, 1, 1, 1),
('Spring Boot Testing', 'JUnit và Testcontainers trong Spring Boot', 2, 'https://media.licdn.com/dms/image/v2/D4D12AQFPEhLTTqC11w/article-cover_image-shrink_720_1280/B4DZaJ5Mk_G8AM-/0/1746070195836?e=2147483647&v=beta&t=RA5a68h-3As0Oz0p0W1mMFMJAjhwEnjVsg-cs81rTHc', 100, 5, 1000000, 0.0, 0, 1, 1, 1);
-- Category 3: Lập trình Python
INSERT INTO courses (title, description, category_id, thumbnail_url, student_count, discount_percent, price, average_rating, total_ratings, is_active, is_approved, instructor_id)
VALUES
('Python Cơ Bản', 'Khóa học Python nhập môn cho người mới bắt đầu', 3, 'https://s3-sgn09.fptcloud.com/codelearnstorage/files/thumbnails/python-co-ban_b80bca9b238b4615b94541de28af00ae.png', 220, 10, 800000, 0.0, 0, 1, 1, 1),
('Python Nâng Cao', 'Học Python nâng cao với OOP và mô-đun', 3, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThso5Auf3vKGX9wpIzCja6xxGBnQw1lTxVqg&s', 150, 15, 1200000, 0.0, 0, 1, 1, 1),
('Data Analysis với Python', 'Phân tích dữ liệu bằng Pandas, NumPy', 3, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStEJzyiH-2fOW2RHuMIPsIzZDmzuBX30Vs6w&s', 200, 20, 1500000, 0.0, 0, 1, 1, 1),
('Web Python Flask', 'Xây dựng web app với Flask', 3, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcD0wvvooRTd5P-tIDHmrQQYUMcgYdFWWYUA&s', 180, 10, 1300000, 0.0, 0, 1, 1, 1),
('Web Python Django', 'Xây dựng web app với Django Framework', 3, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaoWKfljgIO4Trlo4Aj36O3kk_-rLAeHQw2w&s', 210, 5, 1600000, 0.0, 0, 1, 1, 1);
INSERT INTO courses (title, description, category_id, thumbnail_url, student_count, discount_percent, price, average_rating, total_ratings, is_active, is_approved, instructor_id)
VALUES
('HTML CSS Cơ Bản', 'Xây dựng giao diện web với HTML, CSS', 4, 'https://picsum.photos/id/1041/600/400', 250, 5, 500000, 0.0, 0, 1, 1, 3),
('JavaScript Nền Tảng', 'Học JavaScript từ cơ bản đến nâng cao', 4, 'https://picsum.photos/id/1042/600/400', 270, 10, 900000, 0.0, 0, 1, 1, 3),
('ReactJS Cơ Bản', 'Xây dựng SPA với ReactJS', 4, 'https://picsum.photos/id/1043/600/400', 220, 15, 1500000, 0.0, 0, 1, 1, 3),
('Angular Framework', 'Xây dựng ứng dụng Frontend với Angular', 4, 'https://picsum.photos/id/1044/600/400', 160, 20, 1800000, 0.0, 0, 1, 1, 3),
('VueJS Framework', 'Phát triển ứng dụng với VueJS', 4, 'https://picsum.photos/id/1045/600/400', 190, 10, 1400000, 0.0, 0, 1, 1, 3);

-- Lessons cho Course 1: Java Cơ Bản
INSERT INTO lessons (title, lesson_number, course_id, is_active, created_at, updated_at)
VALUES
('Giới thiệu Java', 1, 1, 1, NOW(), NOW()),
('Biến và Kiểu dữ liệu', 2, 1, 1, NOW(), NOW()),
('Cấu trúc điều khiển', 3, 1, 1, NOW(), NOW()),
('Mảng và Chuỗi', 4, 1, 1, NOW(), NOW()),
('Lập trình Hướng đối tượng cơ bản', 5, 1, 1, NOW(), NOW());

-- Lessons cho Course 2: Java Nâng Cao
INSERT INTO lessons (title, lesson_number, course_id, is_active, created_at, updated_at)
VALUES
('Generics trong Java', 1, 2, 1, NOW(), NOW()),
('Collections Framework', 2, 2, 1, NOW(), NOW()),
('Multithreading cơ bản', 3, 2, 1, NOW(), NOW()),
('Synchronization', 4, 2, 1, NOW(), NOW()),
('Best Practices trong Java nâng cao', 5, 2, 1, NOW(), NOW());

-- Lessons cho Course 3: Spring Boot Cơ Bản
INSERT INTO lessons (title, lesson_number, course_id, is_active, created_at, updated_at)
VALUES
('Giới thiệu Spring Boot', 1, 3, 1, NOW(), NOW()),
('Cấu hình Project với Spring Initializr', 2, 3, 1, NOW(), NOW()),
('Controller và Rest API', 3, 3, 1, NOW(), NOW()),
('Kết nối CSDL với Spring Data JPA', 4, 3, 1, NOW(), NOW()),
('Xây dựng ứng dụng CRUD hoàn chỉnh', 5, 3, 1, NOW(), NOW());

-- Lessons cho Course 4: Hibernate JPA
INSERT INTO lessons (title, lesson_number, course_id, is_active, created_at, updated_at)
VALUES
('Giới thiệu Hibernate', 1, 4, 1, NOW(), NOW()),
('Entity và Mapping cơ bản', 2, 4, 1, NOW(), NOW()),
('Quan hệ One-to-Many và Many-to-One', 3, 4, 1, NOW(), NOW()),
('Quan hệ Many-to-Many', 4, 4, 1, NOW(), NOW()),
('Caching và Performance', 5, 4, 1, NOW(), NOW());

-- Lessons cho Course 5: Java Web Servlet/JSP
INSERT INTO lessons (title, lesson_number, course_id, is_active, created_at, updated_at)
VALUES
('Giới thiệu Servlet', 1, 5, 1, NOW(), NOW()),
('Life Cycle của Servlet', 2, 5, 1, NOW(), NOW()),
('Xử lý Request và Response', 3, 5, 1, NOW(), NOW()),
('JSP và Expression Language', 4, 5, 1, NOW(), NOW()),
('Ứng dụng MVC với Servlet/JSP', 5, 5, 1, NOW(), NOW());
-- Course 6: Spring Boot REST API
INSERT INTO lessons (title, lesson_number, course_id, is_active, created_at, updated_at) VALUES
('Giới thiệu REST API', 1, 6, 1, NOW(), NOW()),
('Cấu hình Spring Boot REST', 2, 6, 1, NOW(), NOW()),
('Thiết kế Controller và Service', 3, 6, 1, NOW(), NOW()),
('Tích hợp với Database', 4, 6, 1, NOW(), NOW()),
('Test REST API với Postman', 5, 6, 1, NOW(), NOW());

-- Course 7: Spring Security
INSERT INTO lessons (title, lesson_number, course_id, is_active, created_at, updated_at) VALUES
('Giới thiệu Spring Security', 1, 7, 1, NOW(), NOW()),
('Authentication & Authorization', 2, 7, 1, NOW(), NOW()),
('Cấu hình Security Filter Chain', 3, 7, 1, NOW(), NOW()),
('JWT Authentication', 4, 7, 1, NOW(), NOW()),
('OAuth2 trong Spring Boot', 5, 7, 1, NOW(), NOW());

-- Course 8: Spring Boot Microservices
INSERT INTO lessons (title, lesson_number, course_id, is_active, created_at, updated_at) VALUES
('Giới thiệu Microservices', 1, 8, 1, NOW(), NOW()),
('Eureka Service Discovery', 2, 8, 1, NOW(), NOW()),
('API Gateway với Spring Cloud', 3, 8, 1, NOW(), NOW()),
('Circuit Breaker với Resilience4j', 4, 8, 1, NOW(), NOW()),
('Deploy Microservices', 5, 8, 1, NOW(), NOW());

-- Course 9: Spring Boot + React
INSERT INTO lessons (title, lesson_number, course_id, is_active, created_at, updated_at) VALUES
('Giới thiệu Fullstack Spring + React', 1, 9, 1, NOW(), NOW()),
('Tạo REST API với Spring Boot', 2, 9, 1, NOW(), NOW()),
('Cấu trúc dự án React', 3, 9, 1, NOW(), NOW()),
('Tích hợp API từ React', 4, 9, 1, NOW(), NOW()),
('Xây dựng ứng dụng CRUD Fullstack', 5, 9, 1, NOW(), NOW());

-- Course 10: Spring Boot Testing
INSERT INTO lessons (title, lesson_number, course_id, is_active, created_at, updated_at) VALUES
('Giới thiệu Unit Test', 1, 10, 1, NOW(), NOW()),
('JUnit 5 cơ bản', 2, 10, 1, NOW(), NOW()),
('Mockito cho Unit Test', 3, 10, 1, NOW(), NOW()),
('Test tích hợp với Spring Boot', 4, 10, 1, NOW(), NOW()),
('Dùng Testcontainers với DB', 5, 10, 1, NOW(), NOW());
-- Course 11: Python Cơ Bản
INSERT INTO lessons (title, lesson_number, course_id, is_active, created_at, updated_at) VALUES
('Giới thiệu Python', 1, 11, 1, NOW(), NOW()),
('Biến và Kiểu dữ liệu', 2, 11, 1, NOW(), NOW()),
('Cấu trúc điều khiển', 3, 11, 1, NOW(), NOW()),
('Hàm trong Python', 4, 11, 1, NOW(), NOW()),
('Xử lý File cơ bản', 5, 11, 1, NOW(), NOW());

-- Course 12: Python Nâng Cao
INSERT INTO lessons (title, lesson_number, course_id, is_active, created_at, updated_at) VALUES
('OOP trong Python', 1, 12, 1, NOW(), NOW()),
('Iterator & Generator', 2, 12, 1, NOW(), NOW()),
('Decorator & Context Manager', 3, 12, 1, NOW(), NOW()),
('Module & Package', 4, 12, 1, NOW(), NOW()),
('Best Practices Python', 5, 12, 1, NOW(), NOW());

-- Course 13: Data Analysis với Python
INSERT INTO lessons (title, lesson_number, course_id, is_active, created_at, updated_at) VALUES
('Giới thiệu Data Analysis', 1, 13, 1, NOW(), NOW()),
('Pandas cơ bản', 2, 13, 1, NOW(), NOW()),
('NumPy cho xử lý dữ liệu', 3, 13, 1, NOW(), NOW()),
('Data Visualization', 4, 13, 1, NOW(), NOW()),
('Case Study: Phân tích dữ liệu', 5, 13, 1, NOW(), NOW());

-- Course 14: Web Python Flask
INSERT INTO lessons (title, lesson_number, course_id, is_active, created_at, updated_at) VALUES
('Giới thiệu Flask', 1, 14, 1, NOW(), NOW()),
('Routing trong Flask', 2, 14, 1, NOW(), NOW()),
('Template & Jinja2', 3, 14, 1, NOW(), NOW()),
('Flask với Database', 4, 14, 1, NOW(), NOW()),
('Deploy Flask App', 5, 14, 1, NOW(), NOW());

-- Course 15: Web Python Django
INSERT INTO lessons (title, lesson_number, course_id, is_active, created_at, updated_at) VALUES
('Giới thiệu Django', 1, 15, 1, NOW(), NOW()),
('Model & ORM trong Django', 2, 15, 1, NOW(), NOW()),
('View & Template', 3, 15, 1, NOW(), NOW()),
('Authentication trong Django', 4, 15, 1, NOW(), NOW()),
('Deploy Django Project', 5, 15, 1, NOW(), NOW());
select * from courses
-- Course 16: HTML CSS Cơ Bản
INSERT INTO lessons (title, lesson_number, course_id, is_active, created_at, updated_at) VALUES
('Giới thiệu HTML', 1, 16, 1, NOW(), NOW()),
('Thẻ HTML cơ bản', 2, 16, 1, NOW(), NOW()),
('CSS cơ bản', 3, 16, 1, NOW(), NOW()),
('Box Model & Layout', 4, 16, 1, NOW(), NOW()),
('Thực hành Web Page tĩnh', 5, 16, 1, NOW(), NOW());

-- Course 17: JavaScript Nền Tảng
INSERT INTO lessons (title, lesson_number, course_id, is_active, created_at, updated_at) VALUES
('Giới thiệu JavaScript', 1, 17, 1, NOW(), NOW()),
('Biến và Toán tử', 2, 17, 1, NOW(), NOW()),
('Hàm và Scope', 3, 17, 1, NOW(), NOW()),
('Event & DOM', 4, 17, 1, NOW(), NOW()),
('Async JavaScript', 5, 17, 1, NOW(), NOW());

-- Course 18: ReactJS Cơ Bản
INSERT INTO lessons (title, lesson_number, course_id, is_active, created_at, updated_at) VALUES
('Giới thiệu ReactJS', 1, 18, 1, NOW(), NOW()),
('Component & Props', 2, 18, 1, NOW(), NOW()),
('Hook cơ bản (useState, useEffect)', 3, 18, 1, NOW(), NOW()),
('Routing trong React', 4, 18, 1, NOW(), NOW()),
('Tích hợp API trong React', 5, 18, 1, NOW(), NOW());

-- Course 19: Angular Framework
INSERT INTO lessons (title, lesson_number, course_id, is_active, created_at, updated_at) VALUES
('Giới thiệu Angular', 1, 19, 1, NOW() , NOW()),
('Component & Module', 2, 19, 1, NOW(), NOW()),
('Data Binding & Directive', 3, 19, 1, NOW(), NOW()),
('Service & Dependency Injection', 4, 19, 1, NOW(), NOW()),
('Routing trong Angular', 5, 19, 1, NOW(), NOW());

-- Course 20: VueJS Framework
INSERT INTO lessons (title, lesson_number, course_id, is_active, created_at, updated_at) VALUES
('Giới thiệu VueJS', 1, 20, 1, NOW(), NOW()),
('Template & Data Binding', 2, 20, 1, NOW(), NOW()),
('Component trong Vue', 3, 20, 1, NOW(), NOW()),
('Directive & Event Handling', 4, 20, 1, NOW(), NOW()),
('Vue Router & Vuex', 5, 20, 1, NOW(), NOW());
-- Lesson 1: Giới thiệu Java
INSERT INTO materials (title, description, type, url, order_index, duration_in_seconds, lesson_id, created_at, updated_at) VALUES
('Video 1: Giới thiệu Java', N'Tổng quan về Java và ứng dụng', N'video', 'videos/c4a47b03-11b4-4b9c-bae5-fa429081b0d0_Screen Recording 2025-08-26 163843.mp4', 1, 600, 1, NOW(), NOW()),
('Video 2: Cài đặt môi trường', N'Hướng dẫn cài đặt JDK và IDE', N'video', 'videos/c4a47b03-11b4-4b9c-bae5-fa429081b0d0_Screen Recording 2025-08-26 163843.mp4', 2, 720, 1, NOW(), NOW()),
('Video 3: Hello World', N'Chạy chương trình Java đầu tiên', N'video', 'videos/c4a47b03-11b4-4b9c-bae5-fa429081b0d0_Screen Recording 2025-08-26 163843.mp4', 3, 480, 1, NOW(), NOW());

-- Lesson 2: Biến và Kiểu dữ liệu
INSERT INTO materials (title, description, type, url, order_index, duration_in_seconds, lesson_id, created_at, updated_at) VALUES
('Video 1: Biến trong Java', N'Giới thiệu về biến', N'video', 'videos/e3943797-5425-4d33-b7fd-437878c758b2_Screen Recording 2025-08-26 163843.mp4', 1, 500, 2, NOW(), NOW()),
('Video 2: Kiểu dữ liệu cơ bản', N'Int, Double, Boolean, String', N'video', 'videos/e3943797-5425-4d33-b7fd-437878c758b2_Screen Recording 2025-08-26 163843.mp4', 2, 700, 2, NOW(), NOW()),
('Video 3: Ép kiểu dữ liệu', N'Casting giữa các kiểu dữ liệu', N'video', 'videos/e3943797-5425-4d33-b7fd-437878c758b2_Screen Recording 2025-08-26 163843.mp4', 3, 650, 2, NOW(), NOW());

-- Lesson 3: Cấu trúc điều khiển
INSERT INTO materials (title, description, type, url, order_index, duration_in_seconds, lesson_id, created_at, updated_at) VALUES
('Video 1: If-Else trong Java', N'Sử dụng if else trong code', N'video', 'videos/a1712300-c239-4b1b-bfb3-23099e179d8a_6920831259913.mp4', 1, 560, 3, NOW(), NOW()),
('Video 2: Vòng lặp For, While', N'Loop trong Java', N'video', 'videos/a1712300-c239-4b1b-bfb3-23099e179d8a_6920831259913.mp4', 2, 620, 3, NOW(), NOW()),
('Video 3: Switch Case', N'Cấu trúc rẽ nhánh', N'video', 'videos/a1712300-c239-4b1b-bfb3-23099e179d8a_6920831259913.mp4', 3, 480, 3, NOW(), NOW());

-- Lesson 4: Mảng và Chuỗi
INSERT INTO materials (title, description, type, url, order_index, duration_in_seconds, lesson_id, created_at, updated_at) VALUES
('Video 1: Mảng 1 chiều', N'Giới thiệu array', N'video', 'videos/a1712300-c239-4b1b-bfb3-23099e179d8a_6920831259913.mp4', 1, 700, 4, NOW(), NOW()),
('Video 2: Mảng 2 chiều', N'Làm việc với matrix', N'video', 'videos/a1712300-c239-4b1b-bfb3-23099e179d8a_6920831259913.mp4', 2, 800, 4, NOW(), NOW()),
('Video 3: Chuỗi trong Java', N'Các hàm xử lý String', N'video', 'videos/a1712300-c239-4b1b-bfb3-23099e179d8a_6920831259913.mp4', 3, 600, 4, NOW(), NOW());

-- Lesson 5: Lập trình Hướng đối tượng cơ bản
INSERT INTO materials (title, description, type, url, order_index, duration_in_seconds, lesson_id, created_at, updated_at) VALUES
('Video 1: Class và Object', N'Tạo class và object', N'video', 'videos/a1712300-c239-4b1b-bfb3-23099e179d8a_6920831259913.mp4', 1, 720, 5, NOW(), NOW()),
('Video 2: Constructor', N'Hàm khởi tạo trong Java', N'video', 'videos/a1712300-c239-4b1b-bfb3-23099e179d8a_6920831259913.mp4', 2, 650, 5, NOW(), NOW()),
('Video 3: Phương thức', N'Định nghĩa và gọi method', N'video', 'videos/a1712300-c239-4b1b-bfb3-23099e179d8a_6920831259913.mp4', 3, 700, 5, NOW(), NOW());

INSERT INTO materials (title, description, type, url, order_index, duration_in_seconds, lesson_id, created_at, updated_at)
VALUES 
('Giới thiệu về biến', N'Biến và phạm vi trong Java', N'video', 'videos/a1712300-c239-4b1b-bfb3-23099e179d8a_6920831259913.mp4', 1, 600, 5, NOW(), NOW()),
('Các kiểu dữ liệu cơ bản', N'byte, short, int, long, float, double, boolean, char', N'video', 'videos/a1712300-c239-4b1b-bfb3-23099e179d8a_6920831259913.mp4', 2, 800, 5, NOW(), NOW()),
('Hằng số và từ khóa final', N'Cách sử dụng final để định nghĩa hằng số', N'video', 'videos/a1712300-c239-4b1b-bfb3-23099e179d8a_6920831259913.mp4', 3, 500, 5, NOW(), NOW());

INSERT INTO materials (title, description, type, url, order_index, duration_in_seconds, lesson_id, created_at, updated_at)
VALUES 
('Giới thiệu về Generics', N'Tại sao cần Generics', N'video', 'videos/a1712300-c239-4b1b-bfb3-23099e179d8a_6920831259913.mp4', 1, 700, 5, NOW(), NOW()),
('Generic Class và Method', N'Cách tạo class và method generic', N'video', 'videos/a1712300-c239-4b1b-bfb3-23099e179d8a_6920831259913.mp4', 2, 900, 5, NOW(), NOW()),
('Bounded Generics', N'Ứng dụng extends/super trong Generics', N'video', 'videos/a1712300-c239-4b1b-bfb3-23099e179d8a_6920831259913.mp4', 3, 750, 5, NOW(), NOW());