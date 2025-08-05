package Entity;

import jakarta.persistence.*;

@Entity
public class Student {
    @OneToOne
    @MapsId
    @JoinColumn(name = "student_id")
    private User user;
    private String schoolName;
	private String firstName;
	private String lastName;

}
