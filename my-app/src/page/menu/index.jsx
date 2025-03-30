import React, { useState } from 'react'
import './App.css'
import kurslar from '../../json/kurslar.json'
import CodeMirror from '@uiw/react-codemirror'
import { html as htmlLang } from '@codemirror/lang-html'
import { css as cssLang } from '@codemirror/lang-css'
import { javascript } from '@codemirror/lang-javascript'
import { okaidia } from '@uiw/codemirror-theme-okaidia'

const CodeEditor = () => {
	const [htmlCode, setHtmlCode] = useState(`
		<div aria-label="Orange and tan hamster running in a metal wheel" role="img" class="wheel-and-hamster">
	<div class="wheel"></div>
	<div class="hamster">
		<div class="hamster__body">
			<div class="hamster__head">
				<div class="hamster__ear"></div>
				<div class="hamster__eye"></div>
				<div class="hamster__nose"></div>
			</div>
			<div class="hamster__limb hamster__limb--fr"></div>
			<div class="hamster__limb hamster__limb--fl"></div>
			<div class="hamster__limb hamster__limb--br"></div>
			<div class="hamster__limb hamster__limb--bl"></div>
			<div class="hamster__tail"></div>
		</div>
	</div>
	<div class="spoke"></div>
</div>
<h1 class="h1">Sizlar uchun yaratilgan code editor</h1>
	`)

	const [cssCode, setCssCode] = useState(`
    body{background-color:black;
    align-items: center;text-align: center;}
		.wheel-and-hamster {
    margin: 50px auto;
  --dur: 1s;
  position: relative;
  width: 12em;
  height: 12em;
  font-size: 14px;
}

.wheel,
.hamster,
.hamster div,
.spoke {
  position: absolute;
}

.wheel,
.spoke {
  border-radius: 50%;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.wheel {
  background: radial-gradient(100% 100% at center,hsla(0,0%,60%,0) 47.8%,hsl(0,0%,60%) 48%);
  z-index: 2;
}

.hamster {
  animation: hamster var(--dur) ease-in-out infinite;
  top: 50%;
  left: calc(50% - 3.5em);
  width: 7em;
  height: 3.75em;
  transform: rotate(4deg) translate(-0.8em,1.85em);
  transform-origin: 50% 0;
  z-index: 1;
}

.hamster__head {
  animation: hamsterHead var(--dur) ease-in-out infinite;
  background: hsl(30,90%,55%);
  border-radius: 70% 30% 0 100% / 40% 25% 25% 60%;
  box-shadow: 0 -0.25em 0 hsl(30,90%,80%) inset,
		0.75em -1.55em 0 hsl(30,90%,90%) inset;
  top: 0;
  left: -2em;
  width: 2.75em;
  height: 2.5em;
  transform-origin: 100% 50%;
}

.hamster__ear {
  animation: hamsterEar var(--dur) ease-in-out infinite;
  background: hsl(0,90%,85%);
  border-radius: 50%;
  box-shadow: -0.25em 0 hsl(30,90%,55%) inset;
  top: -0.25em;
  right: -0.25em;
  width: 0.75em;
  height: 0.75em;
  transform-origin: 50% 75%;
}

.hamster__eye {
  animation: hamsterEye var(--dur) linear infinite;
  background-color: hsl(0,0%,0%);
  border-radius: 50%;
  top: 0.375em;
  left: 1.25em;
  width: 0.5em;
  height: 0.5em;
}

.hamster__nose {
  background: hsl(0,90%,75%);
  border-radius: 35% 65% 85% 15% / 70% 50% 50% 30%;
  top: 0.75em;
  left: 0;
  width: 0.2em;
  height: 0.25em;
}

.hamster__body {
  animation: hamsterBody var(--dur) ease-in-out infinite;
  background: hsl(30,90%,90%);
  border-radius: 50% 30% 50% 30% / 15% 60% 40% 40%;
  box-shadow: 0.1em 0.75em 0 hsl(30,90%,55%) inset,
		0.15em -0.5em 0 hsl(30,90%,80%) inset;
  top: 0.25em;
  left: 2em;
  width: 4.5em;
  height: 3em;
  transform-origin: 17% 50%;
  transform-style: preserve-3d;
}

.hamster__limb--fr,
.hamster__limb--fl {
  clip-path: polygon(0 0,100% 0,70% 80%,60% 100%,0% 100%,40% 80%);
  top: 2em;
  left: 0.5em;
  width: 1em;
  height: 1.5em;
  transform-origin: 50% 0;
}

.hamster__limb--fr {
  animation: hamsterFRLimb var(--dur) linear infinite;
  background: linear-gradient(hsl(30,90%,80%) 80%,hsl(0,90%,75%) 80%);
  transform: rotate(15deg) translateZ(-1px);
}

.hamster__limb--fl {
  animation: hamsterFLLimb var(--dur) linear infinite;
  background: linear-gradient(hsl(30,90%,90%) 80%,hsl(0,90%,85%) 80%);
  transform: rotate(15deg);
}

.hamster__limb--br,
.hamster__limb--bl {
  border-radius: 0.75em 0.75em 0 0;
  clip-path: polygon(0 0,100% 0,100% 30%,70% 90%,70% 100%,30% 100%,40% 90%,0% 30%);
  top: 1em;
  left: 2.8em;
  width: 1.5em;
  height: 2.5em;
  transform-origin: 50% 30%;
}

.hamster__limb--br {
  animation: hamsterBRLimb var(--dur) linear infinite;
  background: linear-gradient(hsl(30,90%,80%) 90%,hsl(0,90%,75%) 90%);
  transform: rotate(-25deg) translateZ(-1px);
}

.hamster__limb--bl {
  animation: hamsterBLLimb var(--dur) linear infinite;
  background: linear-gradient(hsl(30,90%,90%) 90%,hsl(0,90%,85%) 90%);
  transform: rotate(-25deg);
}

.hamster__tail {
  animation: hamsterTail var(--dur) linear infinite;
  background: hsl(0,90%,85%);
  border-radius: 0.25em 50% 50% 0.25em;
  box-shadow: 0 -0.2em 0 hsl(0,90%,75%) inset;
  top: 1.5em;
  right: -0.5em;
  width: 1em;
  height: 0.5em;
  transform: rotate(30deg) translateZ(-1px);
  transform-origin: 0.25em 0.25em;
}

.spoke {
  animation: spoke var(--dur) linear infinite;
  background: radial-gradient(100% 100% at center,hsl(0,0%,60%) 4.8%,hsla(0,0%,60%,0) 5%),
		linear-gradient(hsla(0,0%,55%,0) 46.9%,hsl(0,0%,65%) 47% 52.9%,hsla(0,0%,65%,0) 53%) 50% 50% / 99% 99% no-repeat;
}

/* Animations */
@keyframes hamster {
  from, to {
    transform: rotate(4deg) translate(-0.8em,1.85em);
  }

  50% {
    transform: rotate(0) translate(-0.8em,1.85em);
  }
}

@keyframes hamsterHead {
  from, 25%, 50%, 75%, to {
    transform: rotate(0);
  }

  12.5%, 37.5%, 62.5%, 87.5% {
    transform: rotate(8deg);
  }
}

@keyframes hamsterEye {
  from, 90%, to {
    transform: scaleY(1);
  }

  95% {
    transform: scaleY(0);
  }
}

@keyframes hamsterEar {
  from, 25%, 50%, 75%, to {
    transform: rotate(0);
  }

  12.5%, 37.5%, 62.5%, 87.5% {
    transform: rotate(12deg);
  }
}

@keyframes hamsterBody {
  from, 25%, 50%, 75%, to {
    transform: rotate(0);
  }

  12.5%, 37.5%, 62.5%, 87.5% {
    transform: rotate(-2deg);
  }
}

@keyframes hamsterFRLimb {
  from, 25%, 50%, 75%, to {
    transform: rotate(50deg) translateZ(-1px);
  }

  12.5%, 37.5%, 62.5%, 87.5% {
    transform: rotate(-30deg) translateZ(-1px);
  }
}

@keyframes hamsterFLLimb {
  from, 25%, 50%, 75%, to {
    transform: rotate(-30deg);
  }

  12.5%, 37.5%, 62.5%, 87.5% {
    transform: rotate(50deg);
  }
}

@keyframes hamsterBRLimb {
  from, 25%, 50%, 75%, to {
    transform: rotate(-60deg) translateZ(-1px);
  }

  12.5%, 37.5%, 62.5%, 87.5% {
    transform: rotate(20deg) translateZ(-1px);
  }
}

@keyframes hamsterBLLimb {
  from, 25%, 50%, 75%, to {
    transform: rotate(20deg);
  }

  12.5%, 37.5%, 62.5%, 87.5% {
    transform: rotate(-60deg);
  }
}

@keyframes hamsterTail {
  from, 25%, 50%, 75%, to {
    transform: rotate(30deg) translateZ(-1px);
  }

  12.5%, 37.5%, 62.5%, 87.5% {
    transform: rotate(10deg) translateZ(-1px);
  }
}

@keyframes spoke {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(-1turn);
  }
}
  .h1 {
  /* Text styling */
  font-family: 'Poppins', 'Arial', sans-serif;
  font-size: 2.8em; /* Slightly larger */
  font-weight: 800; /* Extra bold */
  text-transform: uppercase;
  letter-spacing: 2px;
  text-align: center;
  
  /* Color and decoration */
  color: #ffb703;
  background: linear-gradient(to right, #ffb703, #ffd166);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-decoration: underline;
  text-decoration-color: #fb8500; /* Complementary color */
  text-decoration-thickness: 3px;
  text-underline-offset: 8px; /* More space */
  text-decoration-style: wavy;
  
  /* Shadow effects */
  text-shadow: 
    2px 2px 4px rgba(0, 0, 0, 0.2),
    0 0 10px rgba(255, 183, 3, 0.3); /* Glow effect */
  
  /* Layout */
  margin: 30px 0;
  padding: 10px 0;
  
  /* Animation */
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  
  /* Cursor */
  cursor: pointer;
  
  /* Hover effects */
  &:hover {
    transform: scale(1.03) translateY(-3px);
    text-shadow: 
      3px 3px 6px rgba(0, 0, 0, 0.3),
      0 0 15px rgba(255, 183, 3, 0.5);
    text-decoration-color: #ffd166;
    letter-spacing: 3px;
  }
  
  /* Active/pressed state */
  &:active {
    transform: scale(0.98);
  }
}

/* Add this to your HTML head for Poppins font */
/* <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@800&display=swap" rel="stylesheet"> */
	`)

	const [jsCode, setJsCode] = useState(`
		function typeWriterEffect(element, text, speed = 100) {
			let i = 0;
			function type() {
				if (i < text.length) {
					element.innerHTML += text.charAt(i);
					i++;
					setTimeout(type, speed);
				}
			}
			element.innerHTML = "";
			type();
		}
	
		document.addEventListener("DOMContentLoaded", () => {
			const title = document.querySelector(".animated-title");
			typeWriterEffect(title, "Online_Academy");
		});
	
		console.log("%c 🚀 Xush kelibsiz! Sayt yuklandi.", "color: cyan; font-size: 18px; font-weight: bold; background: black; padding: 5px; border-radius: 5px;");
	`)

	const generateOutput = () => {
		return `
      <html>
      <head>
        <style>${cssCode}</style>
      </head>
      <body>
        ${htmlCode}
        <script>
          try {
            console.log = function(message) {
              var outputDiv = document.getElementById("output");
              if (outputDiv) {
                outputDiv.innerHTML += message + "<br>";
              }
            };
            ${jsCode}
          } catch (error) {
            document.getElementById("output").innerHTML = "Xatolik: " + error.message;
          }
        </script>
      </body>
      </html>
    `
	}

	const runJsInNewWindow = () => {
		const newWindow = window.open('', '_blank', 'width=500,height=400')
		if (newWindow) {
			newWindow.document.write(`
        <html>
        <head>
          <title>JS Console</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 10px; background: #222; color: #0f0; }
            h2 { font-size: 18px; }
            pre { white-space: pre-wrap; word-wrap: break-word; }
          </style>
        </head>
        <body>
          <h2>JavaScript Consol</h2>
          <pre id="output"></pre>
          <script>
            try {
              console.log = function(message) {
                var outputDiv = document.getElementById("output");
                if (outputDiv) {
                  outputDiv.innerHTML += message + "<br>";
                }
              };
              ${jsCode}
            } catch (error) {
              document.getElementById("output").innerHTML = "Xatolik: " + error.message;
            }
          </script>
        </body>
        </html>
      `)
			newWindow.document.close()
		}
	}
	const [expandedSections, setExpandedSections] = useState({
		HTML: true,
		CSS: true,
		JavaScript: true,
	})

	const toggleSection = lang => {
		setExpandedSections(prev => ({
			...prev,
			[lang]: !prev[lang],
		}))
	}
	return (
		<div className='code-editor'>
			<h2 className='h2bu'>Online Code Editor</h2>
			<div className='editor'>
				{['HTML', 'CSS', 'JavaScript'].map(lang => {
					const isOpen = expandedSections[lang]
					return (
						<div className='code-section' key={lang}>
							<div
								className='section-header'
								onClick={() => toggleSection(lang)}
							>
								<h3>{lang}</h3>
								<button className='toggle-btn'>{isOpen ? '↑' : '↓'}</button>
							</div>
							{isOpen && (
								<CodeMirror
									value={
										lang === 'HTML'
											? htmlCode
											: lang === 'CSS'
											? cssCode
											: jsCode
									}
									extensions={
										lang === 'HTML'
											? [htmlLang()]
											: lang === 'CSS'
											? [cssLang()]
											: [javascript()]
									}
									theme={okaidia}
									onChange={
										lang === 'HTML'
											? setHtmlCode
											: lang === 'CSS'
											? setCssCode
											: setJsCode
									}
								/>
							)}
						</div>
					)
				})}
			</div>
			<div className='preview'>
				<h3>Preview</h3>
				<iframe
					title='Output'
					srcDoc={generateOutput()}
					className='output-frame'
				></iframe>
			</div>
			<button className='run-btn' onClick={runJsInNewWindow}>
				JS Consolni ochish
			</button>
		</div>
	)
}

const CourseList = () => {
	const [showAll, setShowAll] = useState(false)
	const visibleCourses = showAll ? kurslar : kurslar.slice(0, 3)

	return (
		<>
			<main className='main'>
				<div className='course-container'>
					<h1 className='title'>O'quv Kurslari</h1>
					<div className={`course-list ${showAll ? 'expanded' : ''}`}>
						{visibleCourses.map((course, index) => (
							<div key={index} className='course-card'>
								<img src={course.rasim} alt={course.nomi} />
								<h2>{course.nomi}</h2>
								<p>
									<strong>Til:</strong> {course.tili}
								</p>
								<p>
									<strong>Muallif:</strong> {course.muallifi.ism}
								</p>
								<p>
									<strong>Tajriba:</strong> {course.muallifi.tajribasi} yil
								</p>
								<p>
									<strong>Ta'lim:</strong> {course.muallifi.talimi}
								</p>
								<p>
									<strong>Ish joyi:</strong> {course.muallifi.ish_joyi}
								</p>
								<p>
									<strong>Yo'nalish:</strong> {course.muallifi.yonalishi}
								</p>
								<p>
									<strong>Daraja:</strong> {course.darajasi}
								</p>
								<p>
									<strong>Davomiylik:</strong> {course.davomiyligi} soat
								</p>
								<p>
									<strong>Reyting:</strong> ⭐ {course.reytingi}
								</p>
								<p className='description'>{course.tavsifi}</p>
							</div>
						))}
					</div>

					{kurslar.length > 4 && (
						<button
							className='show-more-btn'
							onClick={() => setShowAll(!showAll)}
						>
							{showAll ? 'Yopish' : 'Ko‘proq kurslarni ko‘rish'}
						</button>
					)}
				</div>
				<CodeEditor />
			</main>
		</>
	)
}

export default CourseList
