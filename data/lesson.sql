-- Lessons cho Course 1: Java Cơ Bản
INSERT INTO lessons (title, lesson_number, course_id, is_active, created_at, updated_at)
VALUES
(N'Giới thiệu Java', 1, 1, 1, NOW(), NOW()),
(N'Biến và Kiểu dữ liệu', 2, 1, 1, NOW(), NOW()),
(N'Cấu trúc điều khiển', 3, 1, 1, NOW(), NOW()),
(N'Mảng và Chuỗi', 4, 1, 1, NOW(), NOW()),
(N'Lập trình Hướng đối tượng cơ bản', 5, 1, 1, NOW(), NOW());

-- Lessons cho Course 2: Java Nâng Cao
INSERT INTO lessons (title, lesson_number, course_id, is_active, created_at, updated_at)
VALUES
(N'Generics trong Java', 1, 2, 1, NOW(), NOW()),
(N'Collections Framework', 2, 2, 1, NOW(), NOW()),
(N'Multithreading cơ bản', 3, 2, 1, NOW(), NOW()),
(N'Synchronization', 4, 2, 1, NOW(), NOW()),
(N'Best Practices trong Java nâng cao', 5, 2, 1, NOW(), NOW());

-- Lessons cho Course 3: Spring Boot Cơ Bản
INSERT INTO lessons (title, lesson_number, course_id, is_active, created_at, updated_at)
VALUES
(N'Giới thiệu Spring Boot', 1, 3, 1, NOW(), NOW()),
(N'Cấu hình Project với Spring Initializr', 2, 3, 1, NOW(), NOW()),
(N'Controller và Rest API', 3, 3, 1, NOW(), NOW()),
(N'Kết nối CSDL với Spring Data JPA', 4, 3, 1, NOW(), NOW()),
(N'Xây dựng ứng dụng CRUD hoàn chỉnh', 5, 3, 1, NOW(), NOW());

-- Lessons cho Course 4: Hibernate JPA
INSERT INTO lessons (title, lesson_number, course_id, is_active, created_at, updated_at)
VALUES
(N'Giới thiệu Hibernate', 1, 4, 1, NOW(), NOW()),
(N'Entity và Mapping cơ bản', 2, 4, 1, NOW(), NOW()),
(N'Quan hệ One-to-Many và Many-to-One', 3, 4, 1, NOW(), NOW()),
(N'Quan hệ Many-to-Many', 4, 4, 1, NOW(), NOW()),
(N'Caching và Performance', 5, 4, 1, NOW(), NOW());

-- Lessons cho Course 5: Java Web Servlet/JSP
INSERT INTO lessons (title, lesson_number, course_id, is_active, created_at, updated_at)
VALUES
(N'Giới thiệu Servlet', 1, 5, 1, NOW(), NOW()),
(N'Life Cycle của Servlet', 2, 5, 1, NOW(), NOW()),
(N'Xử lý Request và Response', 3, 5, 1, NOW(), NOW()),
(N'JSP và Expression Language', 4, 5, 1, NOW(), NOW()),
(N'Ứng dụng MVC với Servlet/JSP', 5, 5, 1, NOW(), NOW());
-- Course 6: Spring Boot REST API
INSERT INTO lessons (title, lesson_number, course_id, is_active, created_at, updated_at) VALUES
(N'Giới thiệu REST API', 1, 6, 1, NOW(), NOW()),
(N'Cấu hình Spring Boot REST', 2, 6, 1, NOW(), NOW()),
(N'Thiết kế Controller và Service', 3, 6, 1, NOW(), NOW()),
(N'Tích hợp với Database', 4, 6, 1, NOW(), NOW()),
(N'Test REST API với Postman', 5, 6, 1, NOW(), NOW());

-- Course 7: Spring Security
INSERT INTO lessons (title, lesson_number, course_id, is_active, created_at, updated_at) VALUES
(N'Giới thiệu Spring Security', 1, 7, 1, NOW(), NOW()),
(N'Authentication & Authorization', 2, 7, 1, NOW(), NOW()),
(N'Cấu hình Security Filter Chain', 3, 7, 1, NOW(), NOW()),
(N'JWT Authentication', 4, 7, 1, NOW(), NOW()),
(N'OAuth2 trong Spring Boot', 5, 7, 1, NOW(), NOW());

-- Course 8: Spring Boot Microservices
INSERT INTO lessons (title, lesson_number, course_id, is_active, created_at, updated_at) VALUES
(N'Giới thiệu Microservices', 1, 8, 1, NOW(), NOW()),
(N'Eureka Service Discovery', 2, 8, 1, NOW(), NOW()),
(N'API Gateway với Spring Cloud', 3, 8, 1, NOW(), NOW()),
(N'Circuit Breaker với Resilience4j', 4, 8, 1, NOW(), NOW()),
(N'Deploy Microservices', 5, 8, 1, NOW(), NOW());

-- Course 9: Spring Boot + React
INSERT INTO lessons (title, lesson_number, course_id, is_active, created_at, updated_at) VALUES
(N'Giới thiệu Fullstack Spring + React', 1, 9, 1, NOW(), NOW()),
(N'Tạo REST API với Spring Boot', 2, 9, 1, NOW(), NOW()),
(N'Cấu trúc dự án React', 3, 9, 1, NOW(), NOW()),
(N'Tích hợp API từ React', 4, 9, 1, NOW(), NOW()),
(N'Xây dựng ứng dụng CRUD Fullstack', 5, 9, 1, NOW(), NOW());

-- Course 10: Spring Boot Testing
INSERT INTO lessons (title, lesson_number, course_id, is_active, created_at, updated_at) VALUES
(N'Giới thiệu Unit Test', 1, 10, 1, NOW(), NOW()),
(N'JUnit 5 cơ bản', 2, 10, 1, NOW(), NOW()),
(N'Mockito cho Unit Test', 3, 10, 1, NOW(), NOW()),
(N'Test tích hợp với Spring Boot', 4, 10, 1, NOW(), NOW()),
(N'Dùng Testcontainers với DB', 5, 10, 1, NOW(), NOW());
-- Course 11: Python Cơ Bản
INSERT INTO lessons (title, lesson_number, course_id, is_active, created_at, updated_at) VALUES
(N'Giới thiệu Python', 1, 11, 1, NOW(), NOW()),
(N'Biến và Kiểu dữ liệu', 2, 11, 1, NOW(), NOW()),
(N'Cấu trúc điều khiển', 3, 11, 1, NOW(), NOW()),
(N'Hàm trong Python', 4, 11, 1, NOW(), NOW()),
(N'Xử lý File cơ bản', 5, 11, 1, NOW(), NOW());

-- Course 12: Python Nâng Cao
INSERT INTO lessons (title, lesson_number, course_id, is_active, created_at, updated_at) VALUES
(N'OOP trong Python', 1, 12, 1, NOW(), NOW()),
(N'Iterator & Generator', 2, 12, 1, NOW(), NOW()),
(N'Decorator & Context Manager', 3, 12, 1, NOW(), NOW()),
(N'Module & Package', 4, 12, 1, NOW(), NOW()),
(N'Best Practices Python', 5, 12, 1, NOW(), NOW());

-- Course 13: Data Analysis với Python
INSERT INTO lessons (title, lesson_number, course_id, is_active, created_at, updated_at) VALUES
(N'Giới thiệu Data Analysis', 1, 13, 1, NOW(), NOW()),
(N'Pandas cơ bản', 2, 13, 1, NOW(), NOW()),
(N'NumPy cho xử lý dữ liệu', 3, 13, 1, NOW(), NOW()),
(N'Data Visualization', 4, 13, 1, NOW(), NOW()),
(N'Case Study: Phân tích dữ liệu', 5, 13, 1, NOW(), NOW());

-- Course 14: Web Python Flask
INSERT INTO lessons (title, lesson_number, course_id, is_active, created_at, updated_at) VALUES
(N'Giới thiệu Flask', 1, 14, 1, NOW(), NOW()),
(N'Routing trong Flask', 2, 14, 1, NOW(), NOW()),
(N'Template & Jinja2', 3, 14, 1, NOW(), NOW()),
(N'Flask với Database', 4, 14, 1, NOW(), NOW()),
(N'Deploy Flask App', 5, 14, 1, NOW(), NOW());

-- Course 15: Web Python Django
INSERT INTO lessons (title, lesson_number, course_id, is_active, created_at, updated_at) VALUES
(N'Giới thiệu Django', 1, 15, 1, NOW(), NOW()),
(N'Model & ORM trong Django', 2, 15, 1, NOW(), NOW()),
(N'View & Template', 3, 15, 1, NOW(), NOW()),
(N'Authentication trong Django', 4, 15, 1, NOW(), NOW()),
(N'Deploy Django Project', 5, 15, 1, NOW(), NOW());
select * from courses
-- Course 16: HTML CSS Cơ Bản
INSERT INTO lessons (title, lesson_number, course_id, is_active, created_at, updated_at) VALUES
(N'Giới thiệu HTML', 1, 16, 1, NOW(), NOW()),
(N'Thẻ HTML cơ bản', 2, 16, 1, NOW(), NOW()),
(N'CSS cơ bản', 3, 16, 1, NOW(), NOW()),
(N'Box Model & Layout', 4, 16, 1, NOW(), NOW()),
(N'Thực hành Web Page tĩnh', 5, 16, 1, NOW(), NOW());

-- Course 17: JavaScript Nền Tảng
INSERT INTO lessons (title, lesson_number, course_id, is_active, created_at, updated_at) VALUES
(N'Giới thiệu JavaScript', 1, 17, 1, NOW(), NOW()),
(N'Biến và Toán tử', 2, 17, 1, NOW(), NOW()),
(N'Hàm và Scope', 3, 17, 1, NOW(), NOW()),
(N'Event & DOM', 4, 17, 1, NOW(), NOW()),
(N'Async JavaScript', 5, 17, 1, NOW(), NOW());

-- Course 18: ReactJS Cơ Bản
INSERT INTO lessons (title, lesson_number, course_id, is_active, created_at, updated_at) VALUES
(N'Giới thiệu ReactJS', 1, 18, 1, NOW(), NOW()),
(N'Component & Props', 2, 18, 1, NOW(), NOW()),
(N'Hook cơ bản (useState, useEffect)', 3, 18, 1, NOW(), NOW()),
(N'Routing trong React', 4, 18, 1, NOW(), NOW()),
(N'Tích hợp API trong React', 5, 18, 1, NOW(), NOW());

-- Course 19: Angular Framework
INSERT INTO lessons (title, lesson_number, course_id, is_active, created_at, updated_at) VALUES
(N'Giới thiệu Angular', 1, 19, 1, NOW() , NOW()),
(N'Component & Module', 2, 19, 1, NOW(), NOW()),
(N'Data Binding & Directive', 3, 19, 1, NOW(), NOW()),
(N'Service & Dependency Injection', 4, 19, 1, NOW(), NOW()),
(N'Routing trong Angular', 5, 19, 1, NOW(), NOW());

-- Course 20: VueJS Framework
INSERT INTO lessons (title, lesson_number, course_id, is_active, created_at, updated_at) VALUES
(N'Giới thiệu VueJS', 1, 20, 1, NOW(), NOW()),
(N'Template & Data Binding', 2, 20, 1, NOW(), NOW()),
(N'Component trong Vue', 3, 20, 1, NOW(), NOW()),
(N'Directive & Event Handling', 4, 20, 1, NOW(), NOW()),
(N'Vue Router & Vuex', 5, 20, 1, NOW(), NOW());
