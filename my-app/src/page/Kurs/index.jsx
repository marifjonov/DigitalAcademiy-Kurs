import { useEffect, useState } from 'react'
import teacherData from '../../json/user.json'
import './App.css'

function App() {
	const [showAllCourses, setShowAllCourses] = useState(false)
	const [teacher, setTeacher] = useState({})
	const [courses, setCourses] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		try {
			if (
				!teacherData ||
				!teacherData.teacher ||
				!teacherData.teacher.kurslar
			) {
				throw new Error("Ma'lumotlar strukturasi noto'g'ri")
			}

			setTeacher(teacherData.teacher.shaxsiy_malumotlar)

			const formattedCourses = teacherData.teacher.kurslar.map(course => ({
				id: course.kurs_id,
				nomi: course.nomi,
				darajasi: course.darajasi,
				tavsif: course.tavsif,
				narx: course.narx.bepul ? 'Bepul' : `${course.narx.asl_narx} so'm`,
				reytingi: course.reyting.umumiy,
				user_soni: course.statistika.user_soni,
				videolar: course.videolar,
				sertifikat: course.sertifikat,
			}))

			setCourses(formattedCourses)
			setLoading(false)
		} catch (err) {
			console.error("Ma'lumot yuklashda xatolik: ", err)
			setError(err.message)
			setLoading(false)
		}
	}, [])

	const visibleCourses = showAllCourses ? courses : courses.slice(0, 3)

	if (loading) {
		return <div className='loading'>Ma'lumotlar yuklanmoqda...</div>
	}

	if (error) {
		return <div className='error'>Xato: {error}</div>
	}

	return (
		<div className='app-container'>
			<div className='teacher-profile'>
				<div className='teacher-header'>
					<img
						src={teacher.profil_rasmi}
						alt={`${teacher.ism} ${teacher.familiya}`}
						className='teacher-avatar'
					/>
					<div className='teacher-info'>
						<h1>
							{teacher.ism} {teacher.familiya}
						</h1>
						<p>
							<strong>Mutaxassislik:</strong> {teacher.mutaxassislik}
						</p>
						<p>
							<strong>Telefon:</strong> {teacher.telefon}
						</p>
						<p>
							<strong>Manzil:</strong> {teacher.manzil}
						</p>
						<p className='teacher-bio'>{teacher.bio}</p>
					</div>
				</div>
			</div>

			<div className='courses-section'>
				<h2 className='section-title'>O'qituvchi Kurslari</h2>
				{courses.length === 0 ? (
					<p className='no-courses'>Hozircha kurslar mavjud emas</p>
				) : (
					<>
						<div className={`course-list ${showAllCourses ? 'expanded' : ''}`}>
							{visibleCourses.map(course => (
								<div key={course.id} className='course-card'>
									<div className='course-header'>
										<h3>{course.nomi}</h3>
										<span className='course-rating'>{course.reytingi}</span>
									</div>
									<div className='course-details'>
										<p>
											<strong>Daraja:</strong> {course.darajasi}
										</p>
										<p>
											<strong>Narx:</strong> {course.narx}
										</p>
										<p>
											<strong>O'quvchilar:</strong> {course.user_soni} ta
										</p>
									</div>
									<p className='course-description'>{course.tavsif}</p>

									<div className='course-videos'>
										<h4>Dars Videolari ({course.videolar.length})</h4>
										<ul>
											{course.videolar.slice(0, 3).map((video, idx) => (
												<li key={idx}>
													<a
														href={video.url}
														target='_blank'
														rel='noopener noreferrer'
													>
														{video.sarlavha} ({video.vaqti})
													</a>
													<span>{video.views} ko'rish</span>
												</li>
											))}
										</ul>
									</div>
								</div>
							))}
						</div>

						{courses.length > 3 && (
							<button
								onClick={() => setShowAllCourses(!showAllCourses)}
								className='show-more-btn'
							>
								{showAllCourses
									? "Kamroq ko'rsatish"
									: "Barcha kurslarni ko'rish"}
							</button>
						)}
					</>
				)}
			</div>
		</div>
	)
}

export default App
