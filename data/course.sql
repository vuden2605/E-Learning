-- Category 1: Lập trình Java
INSERT INTO courses (title, description, category_id, thumbnail_url, student_count, discount_percent, price, average_rating, total_ratings, is_active, is_approved, instructor_id)
VALUES
(N'Java Cơ Bản', N'Khóa học Java từ nhập môn đến OOP', 1, 'https://s3-sgn09.fptcloud.com/codelearnstorage/files/thumbnails/lap-trinh-huong-doi-tuong-trong-java_da49c404556247e898bbc0e435476936.png', 200, 10, 1000000, 0.0, 0, 1, 1, 1),
(N'Java Nâng Cao', N'Java nâng cao', 1, 'https://gpcoder.com/wp-content/uploads/2018/02/java-multithread.png', 150, 15, 1500000, 0.0, 0, 1, 1, 1),
(N'Spring Boot Cơ Bản', N'Xây dựng ứng dụng web với Spring Boot', 1, 'https://topdev.vn/blog/wp-content/uploads/2021/03/spring-boot.jpg', 300, 20, 2000000, 0.0, 0, 1, 1, 1),
(N'Hibernate JPA', N'ORM với Hibernate và JPA trong Java', 1, 'https://shareprogramming.net//wp-content/uploads/2020/09/hibernate.png', 120, 10, 1200000, 0.0, 0, 1, 1, 1),
(N'Java Web Servlet/JSP', N'Xây dựng ứng dụng web với Servlet và JSP', 1, 'https://stackjava.com/wp-content/uploads/2018/01/jsp-servlet-logo.png', 180, 5, 900000, 0.0, 0, 1, 1, 1);

-- Category 2: Spring Boot Web
INSERT INTO courses (title, description, category_id, thumbnail_url, student_count, discount_percent, price, average_rating, total_ratings, is_active, is_approved, instructor_id)
VALUES
(N'Spring Boot REST API', N'Xây dựng REST API với Spring Boot', 2, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-GXmvS_iqYbxs59NBlCLU8wUva0pDyoJegw&s', 250, 15, 1500000, 0.0, 0, 1, 1, 1),
(N'Spring Security', N'Bảo mật ứng dụng với Spring Security', 2, 'https://winzone.vn/images/blog/spring_security.jpeg', 180, 20, 1800000, 0.0, 0, 1, 1, 1),
(N'Spring Boot Microservices', N'Triển khai Microservices với Spring Cloud', 2, 'https://mlz8prml4nnc.i.optimole.com/cb:1kp5.54a9a/w:768/h:402/q:mauto/f:best/https://fullscale.io/wp-content/uploads/2024/02/spring-boot-microservices-architecture.png', 220, 25, 2500000, 0.0, 0, 1, 1, 1),
(N'Spring Boot + React', N'Xây dựng web fullstack với Spring Boot và React', 2, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMbZX8RioCxdU9fMWNn9MAhoSOA3IfMZjZ3w&s', 140, 10, 2000000, 0.0, 0, 1, 1, 1),
(N'Spring Boot Testing', N'JUnit và Testcontainers trong Spring Boot', 2, 'https://media.licdn.com/dms/image/v2/D4D12AQFPEhLTTqC11w/article-cover_image-shrink_720_1280/B4DZaJ5Mk_G8AM-/0/1746070195836?e=2147483647&v=beta&t=RA5a68h-3As0Oz0p0W1mMFMJAjhwEnjVsg-cs81rTHc', 100, 5, 1000000, 0.0, 0, 1, 1, 1);
-- Category 3: Lập trình Python
INSERT INTO courses (title, description, category_id, thumbnail_url, student_count, discount_percent, price, average_rating, total_ratings, is_active, is_approved, instructor_id)
VALUES
(N'Python Cơ Bản', N'Khóa học Python nhập môn cho người mới bắt đầu', 3, 'https://s3-sgn09.fptcloud.com/codelearnstorage/files/thumbnails/python-co-ban_b80bca9b238b4615b94541de28af00ae.png', 220, 10, 800000, 0.0, 0, 1, 1, 1),
(N'Python Nâng Cao', N'Học Python nâng cao với OOP và mô-đun', 3, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThso5Auf3vKGX9wpIzCja6xxGBnQw1lTxVqg&s', 150, 15, 1200000, 0.0, 0, 1, 1, 1),
(N'Data Analysis với Python', N'Phân tích dữ liệu bằng Pandas, NumPy', 3, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStEJzyiH-2fOW2RHuMIPsIzZDmzuBX30Vs6w&s', 200, 20, 1500000, 0.0, 0, 1, 1, 1),
(N'Web Python Flask', N'Xây dựng web app với Flask', 3, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcD0wvvooRTd5P-tIDHmrQQYUMcgYdFWWYUA&s', 180, 10, 1300000, 0.0, 0, 1, 1, 1),
(N'Web Python Django', N'Xây dựng web app với Django Framework', 3, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaoWKfljgIO4Trlo4Aj36O3kk_-rLAeHQw2w&s', 210, 5, 1600000, 0.0, 0, 1, 1, 1);
INSERT INTO courses (title, description, category_id, thumbnail_url, student_count, discount_percent, price, average_rating, total_ratings, is_active, is_approved, instructor_id)
VALUES
(N'HTML CSS Cơ Bản', N'Xây dựng giao diện web với HTML, CSS', 4, 'https://picsum.photos/id/1041/600/400', 250, 5, 500000, 0.0, 0, 1, 1, 3),
(N'JavaScript Nền Tảng', N'Học JavaScript từ cơ bản đến nâng cao', 4, 'https://picsum.photos/id/1042/600/400', 270, 10, 900000, 0.0, 0, 1, 1, 3),
(N'ReactJS Cơ Bản', N'Xây dựng SPA với ReactJS', 4, 'https://picsum.photos/id/1043/600/400', 220, 15, 1500000, 0.0, 0, 1, 1, 3),
(N'Angular Framework', N'Xây dựng ứng dụng Frontend với Angular', 4, 'https://picsum.photos/id/1044/600/400', 160, 20, 1800000, 0.0, 0, 1, 1, 3),
(N'VueJS Framework', N'Phát triển ứng dụng với VueJS', 4, 'https://picsum.photos/id/1045/600/400', 190, 10, 1400000, 0.0, 0, 1, 1, 3);

