import { useState, useEffect } from 'react'
import './App.css'
import oquvchiData from '../../json/user.json'

function App() {
	const [showAllCourses, setShowAllCourses] = useState(false)
	const [teacher, setTeacher] = useState({})
	const [courses, setCourses] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		try {
			// JSON ma'lumotlarini tekshirish
			if (!oquvchiData || !oquvchiData.kurslari) {
				throw new Error("Ma'lumotlar strukturasi noto'g'ri")
			}

			// O'qituvchi ma'lumotlarini o'rnatish
			setTeacher({
				ism: oquvchiData.ism,
				familiya: oquvchiData.familiya,
				tajribasi: oquvchiData.tajriba,
				talimi: oquvchiData.talim,
				ish_joyi: oquvchiData.ishJoyi,
				yonalishi: oquvchiData.yonalish,
				rasmi: oquvchiData.rasmi,
				bio: `${oquvchiData.yonalish} bo'yicha ${oquvchiData.tajriba} yillik tajribaga ega mutaxassis`,
			})

			// Kurslarni o'rnatish
			const formattedCourses = oquvchiData.kurslari.map(course => ({
				id: course.nomi.replace(/\s+/g, '-').toLowerCase(),
				nomi: course.nomi,
				tili: course.tili,
				darajasi: course.daraja,
				davomiyligi: course.davomiylik,
				reytingi: course.reyting,
				tavsifi: course.tavsif,
				narxi: course.narx,
				oquvchilar_soni: course.oquvchilarSoni,
				videolar: course.videolar,
				yaratilgan_sana: course.yaratilganSana,
				muallifi: {
					ism: `${oquvchiData.ism} ${oquvchiData.familiya}`,
					tajribasi: oquvchiData.tajriba,
				},
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
						src={`${teacher.rasmi}`}
						alt={`${teacher.ism} ${teacher.familiya}`}
						className='teacher-avatar'
					/>
					<div className='teacher-info'>
						<h1>
							{teacher.ism} {teacher.familiya}
						</h1>
						<p>
							<strong>Tajriba:</strong> {teacher.tajribasi} yil
						</p>
						<p>
							<strong>Ta'lim:</strong> {teacher.talimi}
						</p>
						<p>
							<strong>Ish joyi:</strong> {teacher.ish_joyi}
						</p>
						<p>
							<strong>Yo'nalish:</strong> {teacher.yonalishi}
						</p>
					</div>
				</div>
				<p className='teacher-bio'>{teacher.bio}</p>
			</div>

			{/* Kurslar bo'limi */}
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
										<span className='course-rating'>
											<svg
												width='16'
												height='16'
												viewBox='0 0 24 24'
												fill='#f39c12'
											>
												<path d='M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z' />
											</svg>
											{course.reytingi}
										</span>
									</div>

									<div className='course-details'>
										<p>
											<strong>Til:</strong> {course.tili}
										</p>
										<p>
											<strong>Daraja:</strong> {course.darajasi}
										</p>
										<p>
											<strong>Davomiylik:</strong> {course.davomiyligi} soat
										</p>
										<p>
											<strong>Narx:</strong> {course.narxi.toLocaleString()}{' '}
											so'm
										</p>
										<p>
											<strong>O'quvchilar:</strong> {course.oquvchilar_soni} ta
										</p>
									</div>

									<p className='course-description'>{course.tavsifi}</p>

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
														{video.nomi} ({video.davomiylik} min)
													</a>
													<span>{video.korishlar} ko'rish</span>
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
