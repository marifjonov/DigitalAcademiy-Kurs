import { useState, useEffect } from 'react'
import './App.css'
import kurslar from '../../json/kurslar.json'
import teacher from '../../json/teacher.json'

function App() {
	const [showAllCourses, setShowAllCourses] = useState(false)
	const [showAllTeachers, setShowAllTeachers] = useState(false)
	const [courses, setCourses] = useState(kurslar)
	const [teachers, setTeachers] = useState([])

	useEffect(() => {
		// Simulating API fetch with local JSON import
		try {
			setTeachers(teacher)

			const updatedCourses = kurslar.map(course => {
				const courseTeacher = teacher.find(t => t.ism === course.muallifi?.ism)
				return courseTeacher ? { ...course, muallifi: courseTeacher } : course
			})

			setCourses(updatedCourses)
		} catch (error) {
			console.error("Ma'lumot yuklashda xatolik: ", error)
		}
	}, [])

	const visibleCourses = showAllCourses ? courses : courses.slice(0, 3)
	const visibleTeachers = showAllTeachers ? teachers : teachers.slice(0, 3)

	return (
		<>
			<div className='course-container courses-container'>
				<h1 className='title'>O'quv Kurslari</h1>
				<div className={`course-list ${showAllCourses ? 'expanded' : ''}`}>
					{visibleCourses.map((course, index) => (
						<div key={`course-${index}`} className='course-card'>
							<img
								src={course.rasim || '/default-course.jpg'}
								alt={course.nomi}
							/>
							<div className='course-content'>
								<h2>{course.nomi}</h2>
								<p>
									<strong>Til:</strong> {course.tili}
								</p>
								<p>
									<strong>Muallif:</strong> {course.muallifi?.ism || "Noma'lum"}
								</p>
								<p>
									<strong>Daraja:</strong> {course.darajasi}
								</p>
								<p>
									<strong>Davomiylik:</strong> {course.davomiyligi} soat
								</p>
								<div className='rating'>
									<svg
										width='16'
										height='16'
										viewBox='0 0 24 24'
										fill='#f39c12'
									>
										<path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
									</svg>
									{course.reytingi} (reyting)
								</div>
								<p className='description'>{course.tavsifi}</p>
							</div>
						</div>
					))}
				</div>
				<button
					onClick={() => setShowAllCourses(!showAllCourses)}
					className='show-more-btn'
				>
					{showAllCourses ? "Kamroq ko'rsatish" : "Ko'proq kurslarni ko'rish"}
					<i className='fas fa-chevron-right'></i>
				</button>
			</div>

			{/* Teachers Section */}
			<div className='course-container teachers-container'>
				<h1 className='title'>O'qituvchilar</h1>
				<div className={`course-list ${showAllTeachers ? 'expanded' : ''}`}>
					{visibleTeachers.map((teacher, index) => (
						<div key={`teacher-${index}`} className='course-card'>
							<img
								src={teacher.rasmi || '/default-teacher.png'}
								alt={teacher.ism}
							/>
							<h2>{teacher.ism}</h2>
							<p>
								<strong>Tajriba:</strong> {teacher.tajribasi || 0} yil
							</p>
							<p>
								<strong>Ta'lim:</strong> {teacher.talimi || "Noma'lum"}
							</p>
							<p>
								<strong>Ish joyi:</strong> {teacher.ish_joyi || "Noma'lum"}
							</p>
							<p>
								<strong>Yo'nalish:</strong> {teacher.yonalishi || "Noma'lum"}
							</p>
							<p>
								<strong>Mutaxassislik:</strong>{' '}
								{teacher.mutaxassisligi || "Noma'lum"}
							</p>
							<p className='description'>{teacher.bio || "Ma'lumot yo'q"}</p>
						</div>
					))}
				</div>
				<button
					onClick={() => setShowAllTeachers(!showAllTeachers)}
					className='show-more-btn'
				>
					{showAllTeachers
						? "Kamroq ko'rsatish"
						: "Ko'proq o'qituvchilarni ko'rish"}
					<i className='fas fa-chevron-right'></i>
				</button>
			</div>
		</>
	)
}

export default App
