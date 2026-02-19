import React, { useEffect } from 'react';
import './App.css';
import photo from './photo_of_me.jpeg';
import FireworksBackground from './FireworksBackground';
import portfolioVideo from './portfolio_preview.mp4';
function App() {
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('main section[id]'));
    const navLinks = Array.from(document.querySelectorAll('.nav a'));

    function updateActive() {
      // Choose section with the largest visible area in the viewport
      let best = null;
      let bestVisible = 0;
      const vh = window.innerHeight || document.documentElement.clientHeight;

      sections.forEach((s) => {
        const rect = s.getBoundingClientRect();
        const visibleTop = Math.max(rect.top, 0);
        const visibleBottom = Math.min(rect.bottom, vh);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        // debug: log visible heights for troubleshooting
        // eslint-disable-next-line no-console
        console.debug('section', s.id, 'rect', rect.top.toFixed(1), rect.bottom.toFixed(1), 'visible', visibleHeight.toFixed(1));
        if (visibleHeight > bestVisible) {
          bestVisible = visibleHeight;
          best = s;
        }
      });

      // If nothing is visible (edge cases), fall back to midpoint nearest
      if (!best) {
        const mid = vh / 2;
        let minDist = Infinity;
        sections.forEach((s) => {
          const rect = s.getBoundingClientRect();
          const dist = Math.abs(rect.top - mid);
          if (dist < minDist) {
            minDist = dist;
            best = s;
          }
        });
      }

      if (best) {
        const id = best.id;
        // debug: log chosen section
        // eslint-disable-next-line no-console
        console.debug('choose section', id, 'visible', bestVisible.toFixed(1));
        navLinks.forEach((l) => l.classList.remove('active'));
        const link = document.querySelector(`.nav a[href="#${id}"]`);
        if (link) link.classList.add('active');
      }
    }

    // initial set
    updateActive();
    const onScroll = () => requestAnimationFrame(updateActive);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
  return (
    <div className="App">
      <header className="site-header">
        <nav className="nav">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#resume">Professional Experience</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <section id="about" className="section about">
          <FireworksBackground />
          <div className="content">
            <img src={photo} alt="Matthew Quaglia" className="profile-photo" />
            <div className="bio">
              <h1>Matthew M. Quaglia</h1>
              <div className="details">
                <div className="line"><span className="icon" aria-hidden="true">📍</span> New York City</div>
                <div className="line"><span className="icon" aria-hidden="true">💼</span> Data Scientist</div>

                <div className="education">
                  <div className="degree">
                    <span className="icon" aria-hidden="true">🎓</span>
                    <div className="degree-info">
                      <div className="degree-title">M.S. Data Science</div>
                      <div className="degree-school">Northeastern University — 2024</div>
                    </div>
                  </div>

                  <div className="degree">
                    <span className="icon" aria-hidden="true">🎓</span>
                    <div className="degree-info">
                      <div className="degree-title">B.S. Natural Resources Conservation</div>
                      <div className="degree-school">University of Massachusetts, Amherst — 2018</div>
                    </div>
                  </div>
                </div>

                <div className="line"><span className="icon" aria-hidden="true">🔗</span> <a href="https://www.linkedin.com/in/matthew-quaglia" target="_blank" rel="noreferrer">linkedin.com/in/matthew-quaglia</a></div>

              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="section projects">
          <h2 className="section-title">Projects</h2>
          <div className="container">
            <div className="project-list">
              <div className="project-card">
                {/* Flex container to hold text content and video side-by-side */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '2rem', flexWrap: 'wrap' }}>
                  {/* Video preview of the portfolio website */}
                  <div style={{ flex: '1', minWidth: '250px', maxWidth: '500px' }}>
                    <video src={portfolioVideo} autoPlay loop muted playsInline
                           style={{ width: '100%', borderRadius: '12px', display: 'block', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  {/* Text content for the project description */}
                  <div style={{ flex: '1', minWidth: '250px', textAlign: 'left' }}>
                    <h3 style={{ marginTop: 0, marginBottom: '1rem' }}>Portfolio Website</h3>
                    <p>
                      A responsive personal portfolio website built to showcase my data science projects and professional experience.
                      Features a custom canvas-based fireworks animation, interactive navigation, and a clean, modern UI.
                    </p>
                    <p><strong>Technologies:</strong> React, JavaScript, CSS</p>
                    <div style={{ marginTop: '1rem' }}>
                      <a href="https://github.com/mquaglia95/portfolio" target="_blank" rel="noreferrer">View Source Code</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="resume" className="section resume">
          <h2 className="section-title">Professional Experience</h2>
          <div className="container resume-content">
            <h2 className="hidden">Professional Experience</h2>
            <div className="resume-text">
              <div className="job-list">
                <div className="job-card">
                  <div className="job-header">
                    <div>
                      <div className="job-company">SmartSense by Digi — <span className="job-location">Remote</span></div>
                      <div className="job-role">Analyst II — Data Scientist</div>
                      <div className="job-role">Analyst I — Data Scientist</div>
                    </div>
                    <div className="dates-column">
                      <div className="job-dates">Nov 2025 — Present</div>
                      <div className="job-dates">Nov 2024 — Nov 2025</div>
                    </div>
                  </div>
                  <ul className="job-bullets">
                    <li>Designed, trained, and deployed AI-powered chatbots, agentic workflows, and anomaly detection ML models for IoT sensor insights and monitoring, utilized in customer facing reports and within backend resources</li>
                    <li>Build efficient automated pipelines and workflows that integrate Snowflake, Domo, AWS, MongoDB Datadog, and IoT data streams to optimize performance and minimize manual intervention</li>
                    <li>Design, develop, and deploy customer-facing dashboards and React applications using JavaScript, delivering actionable insights from IoT sensor data; build internal dashboards to monitor resource usage, conduct ad hoc cost analyses, and support data-driven decision-making</li>
                  </ul>
                </div>

                <div className="job-card">
                  <div className="job-header">
                    <div>
                      <div className="job-company">SmartSense by Digi — <span className="job-location">Boston, MA</span></div>
                      <div className="job-role">Data Analytics Intern</div>
                    </div>
                    <div className="job-dates">Jul 2024 — Aug 2024</div>
                  </div>
                  <ul className="job-bullets">
                    <li>Implemented major enhancements to a DOMO dashboard pertaining to hardware shipment, inventory, and returns data, pulled datasets from various sources, and displayed insightful visuals and tables for tracking and reporting needs</li>
                    <li>Leveraged Magic ETL within DOMO to cleanse data and implement calculated columns for various engineering datasets and combined and aggregated datasets for further inference</li>
                    <li>Created a Time Series Collection within MongoDB to maintain data pertaining to device readings and error messages with a retention policy to automatically archive data after four weeks</li>
                  </ul>
                </div>

                <div className="job-card">
                  <div className="job-header">
                    <div>
                      <div className="job-company">Ahold Delhaize USA — Quincy, MA</div>
                      <div className="job-role">Supply Chain Data Analytics Co-op</div>
                    </div>
                    <div className="job-dates">Jan 2024 — Jun 2024</div>
                  </div>
                  <ul className="job-bullets">
                    <li>Utilized Python, PySpark, and SQL in a Databricks environment to develop and enhance methods of data cleansing, transformation, modeling, and integration for use in multiple projects</li>
                    <li>Designed and implemented Power BI dashboards to dynamically display retail data pertaining to sales, shipments, inventory, and other relevant supply chain data across five high-volume grocery stores, ensuring real-time updates and refreshes to accurately reflect current data, presenting the data in a way that technical and non-technical stakeholders can understand</li>
                    <li>Leveraged Excel for data analysis, utilizing advanced Excel functions for insightful data interpretation and decision-making</li>
                  </ul>
                </div>

                <div className="job-card">
                  <div className="job-header">
                    <div>
                      <div className="job-company">Hexcel — West Valley City, UT</div>
                      <div className="job-role">Continuous Improvement Engineering Co-op</div>
                    </div>
                    <div className="job-dates">Jan 2023 — Jul 2023</div>
                  </div>
                  <ul className="job-bullets">
                    <li>Utilized Power BI to create comprehensive reports and dashboards for data summarization and visualization, writing queries for data flow within Microsoft SQL Server Management Studio</li>
                    <li>Built applications using Power Apps to streamline data entry and storage processes, leading engineers, EHS staff, financial analysts, and other employees through easy-to-follow, systematic process flows</li>
                    <li>Leveraged Power Automate to automate tasks, such as sending reminders and notifications and automatically populating fields based on relevant data, enhancing efficiency within applications</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="section contact">
          <h2 className="section-title">Contact</h2>
          <div className="container">
            <h2 className="hidden">Contact</h2>
            <div className="contact-list">
              <div className="contact-item">
                <span className="contact-label">Phone</span>
                <span className="contact-info">(508) 617-3824</span>
              </div>
              <div className="contact-item">
                <span className="contact-label">Email</span>
                <span className="contact-info"><a href="mailto:mquaglia95@gmail.com">mquaglia95@gmail.com</a></span>
              </div>
              <div className="contact-item">
                <span className="contact-label">LinkedIn</span>
                <span className="contact-info"><a href="https://www.linkedin.com/in/matthew-quaglia" target="_blank" rel="noreferrer">linkedin.com/in/matthew-quaglia</a></span>
              </div>
              <div className="contact-item">
                <span className="contact-label">Location</span>
                <span className="contact-info">New York, NY 10034</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
