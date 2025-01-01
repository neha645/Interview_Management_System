 <!-- Flow of the System -->
## A. Authentication and Authorization -->

<!-- Register: -->
Users sign up by providing basic information. Role selection (Student or teacher) occurs during registration.

<!-- Login:  -->
Users log in with their credentials. The system authenticates and redirects based on role.

<!-- Role-Based Access Control: -->
The system checks the role upon login and grants access only to allowed features (e.g., interview creation for teachers).

## B. Student Dashboard -->

<!-- View & Edit Profile: -->
Students can view and update their profile information (e.g., contact details, skills, resume).

<!-- View Interview History:  -->1
Students have a dashboard to view past and upcoming interviews, along with details like date, time, and feedback from completed interviews.

## C. teacher Dashboard -->

<!-- Create & Manage Student Profiles:  -->
teachers can create, view, update, or delete student profiles.

<!-- Schedule Interviews: -->
teachers can create an interview by selecting a student, setting a date and time, and choosing the interview type.

<!-- Manage Interviews: -->
teachers have a dashboard to view, edit, and cancel upcoming interviews. They can also provide feedback and mark interviews as completed.


## <-- Models Schema -->

1. user = {
   email: { type: String, unique: true, required: true },
   password: { type: String, required: true },
   role: { type: String, enum: ['STUDENT', 'teacher'], required: true },
   }

2. Student = {
   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
   name: String,
   class: String,
   phone: String,
   dob: Date,
   level: { type: String, enum: [1A,1B,...3C] },
   }

3. teacher = {
   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
   name: String,
   phone: String,
   <!-- etc -->

   }

4. Interviews = {
   studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
   teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'teacher' },
   level: { type: String, enum: [1A,1B,...3C] },
   technology: String,
   score: { total: Number, obtained: Number },
   result: { type: String, enum: ['PASS', 'FAIL'] },
   date: Date,
   }
