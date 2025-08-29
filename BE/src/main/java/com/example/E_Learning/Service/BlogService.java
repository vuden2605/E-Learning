package com.example.E_Learning.Service;

import com.example.E_Learning.DTO.Request.BlogCreationRequest;
import com.example.E_Learning.DTO.Request.BlogFilterRequest;
import com.example.E_Learning.DTO.Request.PageCustomRequest;
import com.example.E_Learning.DTO.Response.BlogResponse;
import com.example.E_Learning.DTO.Response.PageResponse;
import com.example.E_Learning.Entity.Blog;
import com.example.E_Learning.Entity.Instructor;
import com.example.E_Learning.Exception.AppException;
import com.example.E_Learning.Exception.ErrorCode;
import com.example.E_Learning.Repository.BlogRepository;
import com.example.E_Learning.Repository.CategoryRepository;
import com.example.E_Learning.Repository.InstructorRepository;
import com.example.E_Learning.mapper.BlogMapper;
import com.example.E_Learning.mapper.CategoryMapper;
import com.example.E_Learning.mapper.InstructorMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
@Slf4j
@Service
@RequiredArgsConstructor
public class BlogService {
	private final BlogRepository blogRepository;
	private final BlogMapper blogMapper;
	private final CategoryRepository categoryRepository;
	private final InstructorRepository instructorRepository;
	public BlogResponse createBlog(BlogCreationRequest blogCreationRequest, Long instructorId) {
		Blog blog = blogMapper.toBlog(blogCreationRequest);
		blog.setCategory(categoryRepository.getReferenceById(blogCreationRequest.getCategoryId()));
		blog.setInstructor(instructorRepository.getReferenceById(instructorId));
		Blog blogSave = blogRepository.save(blog);
		return blogMapper.toBlogResponse(blogSave);
	}
	public PageResponse<BlogResponse> getAllBlogs(PageCustomRequest pageRequest, BlogFilterRequest blogFilterRequest) {
		Pageable pageable = PageRequest.of(pageRequest.getPage(),
				pageRequest.getPageSize(),
				Sort.by(Sort.Direction.fromString(pageRequest.getDirection()),pageRequest.getSortBy())
		);
		Page<Blog> blogs = blogRepository.findBlogByFilter(pageable, blogFilterRequest);
		log.info("Blogs content: {}", blogs.getContent());
		return PageResponse.<BlogResponse>builder()
				.content(blogs.stream().map(blogMapper::toBlogResponse).toList())
				.pageNumber(blogs.getNumber())
				.pageSize(blogs.getSize())
				.totalElements(blogs.getTotalElements())
				.totalPages(blogs.getTotalPages())
				.last(blogs.isLast())
				.build();
	}
	public BlogResponse getBlogById(Long blogId) {
		Blog blog = blogRepository.findById(blogId).orElseThrow(() -> new AppException(ErrorCode.BLOG_NOT_FOUND));
		return blogMapper.toBlogResponse(blog);
	}
}
