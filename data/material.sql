-- Lesson 1: Giới thiệu Java
INSERT INTO materials (title, description, type, url, order_index, duration_in_seconds, lesson_id, created_at, updated_at) VALUES
(N'Video 1: Giới thiệu Java', N'Tổng quan về Java và ứng dụng', N'video', 'videos/c4a47b03-11b4-4b9c-bae5-fa429081b0d0_Screen Recording 2025-08-26 163843.mp4', 1, 600, 1, GETDATE(), GETDATE()),
(N'Video 2: Cài đặt môi trường', N'Hướng dẫn cài đặt JDK và IDE', N'video', 'videos/c4a47b03-11b4-4b9c-bae5-fa429081b0d0_Screen Recording 2025-08-26 163843.mp4', 2, 720, 1, GETDATE(), GETDATE()),
(N'Video 3: Hello World', N'Chạy chương trình Java đầu tiên', N'video', 'videos/c4a47b03-11b4-4b9c-bae5-fa429081b0d0_Screen Recording 2025-08-26 163843.mp4', 3, 480, 1, GETDATE(), GETDATE());

-- Lesson 2: Biến và Kiểu dữ liệu
INSERT INTO materials (title, description, type, url, order_index, duration_in_seconds, lesson_id, created_at, updated_at) VALUES
(N'Video 1: Biến trong Java', N'Giới thiệu về biến', N'video', 'videos/e3943797-5425-4d33-b7fd-437878c758b2_Screen Recording 2025-08-26 163843.mp4', 1, 500, 2, GETDATE(), GETDATE()),
(N'Video 2: Kiểu dữ liệu cơ bản', N'Int, Double, Boolean, String', N'video', 'videos/e3943797-5425-4d33-b7fd-437878c758b2_Screen Recording 2025-08-26 163843.mp4', 2, 700, 2, GETDATE(), GETDATE()),
(N'Video 3: Ép kiểu dữ liệu', N'Casting giữa các kiểu dữ liệu', N'video', 'videos/e3943797-5425-4d33-b7fd-437878c758b2_Screen Recording 2025-08-26 163843.mp4', 3, 650, 2, GETDATE(), GETDATE());

-- Lesson 3: Cấu trúc điều khiển
INSERT INTO materials (title, description, type, url, order_index, duration_in_seconds, lesson_id, created_at, updated_at) VALUES
(N'Video 1: If-Else trong Java', N'Sử dụng if else trong code', N'video', 'videos/a1712300-c239-4b1b-bfb3-23099e179d8a_6920831259913.mp4', 1, 560, 3, GETDATE(), GETDATE()),
(N'Video 2: Vòng lặp For, While', N'Loop trong Java', N'video', 'videos/a1712300-c239-4b1b-bfb3-23099e179d8a_6920831259913.mp4', 2, 620, 3, GETDATE(), GETDATE()),
(N'Video 3: Switch Case', N'Cấu trúc rẽ nhánh', N'video', 'videos/a1712300-c239-4b1b-bfb3-23099e179d8a_6920831259913.mp4', 3, 480, 3, GETDATE(), GETDATE());

-- Lesson 4: Mảng và Chuỗi
INSERT INTO materials (title, description, type, url, order_index, duration_in_seconds, lesson_id, created_at, updated_at) VALUES
(N'Video 1: Mảng 1 chiều', N'Giới thiệu array', N'video', 'videos/a1712300-c239-4b1b-bfb3-23099e179d8a_6920831259913.mp4', 1, 700, 4, GETDATE(), GETDATE()),
(N'Video 2: Mảng 2 chiều', N'Làm việc với matrix', N'video', 'videos/a1712300-c239-4b1b-bfb3-23099e179d8a_6920831259913.mp4', 2, 800, 4, GETDATE(), GETDATE()),
(N'Video 3: Chuỗi trong Java', N'Các hàm xử lý String', N'video', 'videos/a1712300-c239-4b1b-bfb3-23099e179d8a_6920831259913.mp4', 3, 600, 4, GETDATE(), GETDATE());

-- Lesson 5: Lập trình Hướng đối tượng cơ bản
INSERT INTO materials (title, description, type, url, order_index, duration_in_seconds, lesson_id, created_at, updated_at) VALUES
(N'Video 1: Class và Object', N'Tạo class và object', N'video', 'videos/a1712300-c239-4b1b-bfb3-23099e179d8a_6920831259913.mp4', 1, 720, 5, GETDATE(), GETDATE()),
(N'Video 2: Constructor', N'Hàm khởi tạo trong Java', N'video', 'videos/a1712300-c239-4b1b-bfb3-23099e179d8a_6920831259913.mp4', 2, 650, 5, GETDATE(), GETDATE()),
(N'Video 3: Phương thức', N'Định nghĩa và gọi method', N'video', 'videos/a1712300-c239-4b1b-bfb3-23099e179d8a_6920831259913.mp4', 3, 700, 5, GETDATE(), GETDATE());

INSERT INTO materials (title, description, type, url, order_index, duration_in_seconds, lesson_id, created_at, updated_at)
VALUES 
(N'Giới thiệu về biến', N'Biến và phạm vi trong Java', N'video', 'videos/a1712300-c239-4b1b-bfb3-23099e179d8a_6920831259913.mp4', 1, 600, SCOPE_IDENTITY(), GETDATE(), GETDATE()),
(N'Các kiểu dữ liệu cơ bản', N'byte, short, int, long, float, double, boolean, char', N'video', 'videos/a1712300-c239-4b1b-bfb3-23099e179d8a_6920831259913.mp4', 2, 800, SCOPE_IDENTITY(), GETDATE(), GETDATE()),
(N'Hằng số và từ khóa final', N'Cách sử dụng final để định nghĩa hằng số', N'video', 'videos/a1712300-c239-4b1b-bfb3-23099e179d8a_6920831259913.mp4', 3, 500, SCOPE_IDENTITY(), GETDATE(), GETDATE());

INSERT INTO materials (title, description, type, url, order_index, duration_in_seconds, lesson_id, created_at, updated_at)
VALUES 
(N'Giới thiệu về Generics', N'Tại sao cần Generics', N'video', 'videos/a1712300-c239-4b1b-bfb3-23099e179d8a_6920831259913.mp4', 1, 700, SCOPE_IDENTITY(), GETDATE(), GETDATE()),
(N'Generic Class và Method', N'Cách tạo class và method generic', N'video', 'videos/a1712300-c239-4b1b-bfb3-23099e179d8a_6920831259913.mp4', 2, 900, SCOPE_IDENTITY(), GETDATE(), GETDATE()),
(N'Bounded Generics', N'Ứng dụng extends/super trong Generics', N'video', 'videos/a1712300-c239-4b1b-bfb3-23099e179d8a_6920831259913.mp4', 3, 750, SCOPE_IDENTITY(), GETDATE(), GETDATE());