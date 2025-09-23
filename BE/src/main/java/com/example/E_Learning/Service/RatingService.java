package com.example.E_Learning.Service;

import com.example.E_Learning.DTO.Request.RatingCreationRequest;
import com.example.E_Learning.Entity.Rating;
import com.example.E_Learning.Exception.AppException;
import com.example.E_Learning.Exception.ErrorCode;
import com.example.E_Learning.Repository.CourseRepository;
import com.example.E_Learning.Repository.RatingRepository;
import com.example.E_Learning.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RatingService {
	private final RatingRepository ratingRepository;
	private final UserRepository userRepository;
	private final CourseRepository courseRepository;

	public String rateCourse (Long userId, Long courseId, RatingCreationRequest ratingCreationRequest) {
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
		return "Create rating successfully";
	}
}
