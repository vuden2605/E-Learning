package com.example.E_Learning.Service;

import com.example.E_Learning.DTO.Request.RatingCreationRequest;
import com.example.E_Learning.DTO.Response.RatingResponse;
import com.example.E_Learning.Entity.Rating;
import com.example.E_Learning.Exception.AppException;
import com.example.E_Learning.Exception.ErrorCode;
import com.example.E_Learning.Repository.CourseRepository;
import com.example.E_Learning.Repository.RatingRepository;
import com.example.E_Learning.Repository.UserRepository;
import com.example.E_Learning.mapper.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class RatingService {
	private final RatingRepository ratingRepository;
	private final UserRepository userRepository;
	private final CourseRepository courseRepository;
	private final UserMapper userMapper;
	@Transactional
	public RatingResponse rateCourse (Long userId, Long courseId, RatingCreationRequest ratingCreationRequest) {
		if (ratingRepository.existsByUserIdAndCourseId(userId, courseId)) {
			throw new AppException(ErrorCode.RATING_ALREADY_EXISTS);
		}
		Rating rating = Rating.builder()
				.user(userRepository.getReferenceById(userId))
				.course(courseRepository.getReferenceById(courseId))
				.rate(ratingCreationRequest.getRate())
				.comment(ratingCreationRequest.getComment())
				.build();
		ratingRepository.save(rating);
		Object result = ratingRepository.findAverageAndTotalRatingByCourseId(courseId);
		Object[] arr = (Object[]) result;

		Double avg = arr[0] != null ? Math.round(((Double) arr[0]) * 10.0) / 10.0 : 0.0;
		Long total = arr[1] != null ? (Long) arr[1] : 0L;

		courseRepository.updateAverageAndTotalRating(courseId, avg, total);
		return RatingResponse.builder()
				.user(userMapper.toUserResponse(rating.getUser()))
				.comment(rating.getComment())
				.rate(rating.getRate())
				.createdAt(rating.getCreatedAt())
				.build();
	}
	public Boolean isExistByUserIdAndCourseId(Long userId, Long courseId) {
		return ratingRepository.existsByUserIdAndCourseId(userId, courseId);
	}
}
