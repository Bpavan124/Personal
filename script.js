/**
 * Boddu Pavankalyan - Portfolio & Project Booking Service
 * Interactive Client-side Controller
 */

// Fallback project dataset for offline or static file loading
const LOCAL_PROJECTS = {
  "student-management": {
    id: "student-management",
    title: "Student & Faculty Management System",
    subtitle: "Enterprise CRUD Web Platform with Role-Based Access Control",
    categoryLabel: "Full-Stack Development",
    role: "Lead Full-Stack & Database Architect",
    timeline: "3 Months",
    focus: "ACID Database Design & REST Security",
    techStack: ["Node.js", "Express.js", "MySQL", "JavaScript (ES6+)", "JWT", "Bcrypt", "HTML5/CSS3"],
    metrics: [
      { label: "Query Optimization", value: "99.8% sub-50ms" },
      { label: "Concurrent Roles", value: "3 (Admin, Faculty, Student)" },
      { label: "Data Integrity", value: "ACID Compliant" }
    ],
    overview: "A robust academic management system designed to streamline institutional records, grade tracking, course registrations, and teacher-student interactions with optimized SQL queries and secure JWT authentication.",
    problemStatement: "Academic departments struggled with uncoordinated spreadsheets, duplicate student profiles, insecure grade updates, and slow transcript compilation. An integrated web solution was required to guarantee data integrity, protect sensitive student records, and enable faculty to manage courses efficiently.",
    architectureDescription: "The application follows a clean 3-Tier Client-Server Architecture:\n1. Presentation Layer: Responsive dashboard interface with dynamic client-side state management.\n2. Application Layer: Node.js & Express RESTful API with modular middleware for request validation, error handling, and role-based authorization (RBAC).\n3. Data Layer: Relational MySQL database engine featuring foreign-key constraints, stored procedures for grade rollups, and connection pooling.",
    keyFeatures: [
      "Role-Based Access Control (Admin, Faculty, Student views)",
      "Automated Semester GPA & Cumulative Grade Calculations",
      "Dynamic Course Registration with Capacity Constraints",
      "Secure Password Hashing via Bcrypt & JWT Token Expiration",
      "Audit Logging for Grade Alterations and Attendance Tracking"
    ],
    databaseSchema: [
      { table: "students", primaryKey: "student_id (VARCHAR(20))", columns: "student_id, first_name, last_name, email, department_id, admission_date, status", description: "Stores core student demographic, enrollment status, and enrollment year." },
      { table: "courses", primaryKey: "course_id (VARCHAR(12))", columns: "course_id, course_name, department_id, credits, max_capacity", description: "Catalog of academic courses with credit weights and prerequisites." },
      { table: "enrollments", primaryKey: "enrollment_id (INT AUTO_INCREMENT)", columns: "enrollment_id, student_id, course_id, semester, grade, status", description: "Junction table linking students to courses with grade assignments." },
      { table: "faculty", primaryKey: "faculty_id (VARCHAR(20))", columns: "faculty_id, full_name, email, department_id, designation", description: "Teacher credentials, assigned courses, and office hours." }
    ],
    apiEndpoints: [
      { method: "POST", path: "/api/auth/login", description: "Authenticate user credentials, returning signed JWT token and role." },
      { method: "GET", path: "/api/students", description: "Retrieve paginated student records with department and semester filters." },
      { method: "POST", path: "/api/students", description: "Register a new student with transaction validation." },
      { method: "PUT", path: "/api/grades/:enrollmentId", description: "Secure faculty route to update course grades." },
      { method: "GET", path: "/api/reports/transcripts/:id", description: "Generates student transcript summary and GPA metrics." }
    ],
    challengesAndSolutions: [
      { challenge: "Handling concurrent course enrollment spikes during registration periods without double-booking slots.", solution: "Implemented MySQL pessimistic row-level locking (SELECT ... FOR UPDATE) within ACID transactions to ensure atomic slot reservation." },
      { challenge: "Slow aggregation queries across multi-thousand student grade histories.", solution: "Introduced composite B-Tree indexes on (student_id, semester) and indexed foreign keys, reducing query execution time by 82%." }
    ],
    githubUrl: "https://github.com/Bpavan124"
  },
  "mongodb-shell-setup": {
    id: "mongodb-shell-setup",
    title: "MongoDB Shell Automation & Windows DevOps Setup",
    subtitle: "Automated Environment Configuration & Infrastructure Scripts",
    categoryLabel: "DevOps & Backend Automation",
    role: "DevOps & Database Tools Engineer",
    timeline: "1 Month",
    focus: "Windows Environment & Daemon Automation",
    techStack: ["MongoDB (mongosh)", "PowerShell", "Batch", "Windows Server", "JSON", "Bash"],
    metrics: [
      { label: "Setup Time Reduction", value: "From 45m to 2m" },
      { label: "Configuration Errors", value: "Zero syntax faults" },
      { label: "Automated Tasks", value: "Install, Path, Replica, Backup" }
    ],
    overview: "Production-ready automation toolset and documentation for rapid installation, environment variable configuring, replica set initialization, and backup orchestration of MongoDB on Windows platforms.",
    problemStatement: "Developers and students frequently encountered path-not-found errors, connection timeouts, and authentication headaches when bootstrapping local MongoDB test environments and replica sets on Windows. Manual setup was prone to error and inconsistent between different OS builds.",
    architectureDescription: "The automation architecture uses modular PowerShell scripts wrapped with elevation checks:\n1. Bootstrap Engine: Automated download & verification of official MSI packages & mongosh binaries.\n2. Environment Injector: Programmatic registry updates for system-wide PATH variable without requiring full system reboots.\n3. Configuration Daemon: Auto-generates structured mongod.cfg with optimal memory caches, log rotators, and bind IP security.\n4. Maintenance Cron: Windows Task Scheduler integration for scheduled mongodump snapshots with timestamped compression.",
    keyFeatures: [
      "Idempotent installation script that checks existing dependencies",
      "Automatic Windows PATH configuration with instantaneous shell reload",
      "Local 3-node Replica Set initialization for aggregation and change-stream testing",
      "Secured admin authentication script with custom role creation",
      "Scheduled automated backup tasks with log rotation"
    ],
    databaseSchema: [
      { table: "mongod.cfg (Config File)", primaryKey: "storage.dbPath", columns: "systemLog.destination, net.port (27017), net.bindIp (127.0.0.1), processManagement", description: "Declarative YAML configuration for Windows MongoDB daemon service." },
      { table: "Automated Backup Registry", primaryKey: "backup_timestamp", columns: "archive_name, size_mb, status, verified_checksum", description: "Scheduled dump metadata cataloging daily collections snapshots." }
    ],
    apiEndpoints: [
      { method: "CLI", path: "Invoke-MongoBootstrap.ps1", description: "One-click installer and environment builder." },
      { method: "CLI", path: "Start-ReplicaCluster.ps1", description: "Initializes local 3-node replica set for distributed testing." },
      { method: "CLI", path: "Export-MongoSnapshot.ps1", description: "Performs atomic backup of specified databases." }
    ],
    challengesAndSolutions: [
      { challenge: "Windows environment variable updates traditionally require closing all terminals or system restarts to take effect.", solution: "Broadcasted the WM_SETTINGCHANGE Windows API message via PowerShell/.NET interop to force running environments to refresh registry PATH values immediately." },
      { challenge: "Windows Defender and Firewall silently blocking mongosh connections to localhost instances.", solution: "Embedded automated Netsh firewall rule generation scoped specifically to the loopback interface on port 27017." }
    ],
    githubUrl: "https://github.com/Bpavan124"
  },
  "ai-in-healthcare": {
    id: "ai-in-healthcare",
    title: "AI in Healthcare: Clinical Diagnostic Intelligence",
    subtitle: "Research, Deep Learning Architectures & Clinical Decision Support Systems",
    categoryLabel: "AI & Data Science",
    role: "AI Research & Technical Presenter",
    timeline: "2 Months",
    focus: "Medical Imaging & Explainable AI (XAI)",
    techStack: ["Python", "TensorFlow / PyTorch", "Scikit-Learn", "Pandas", "Matplotlib", "Medical Imaging Principles"],
    metrics: [
      { label: "Diagnostic Accuracy", value: "94.2% ROC-AUC" },
      { label: "Data Modalities", value: "Imaging & Tabular EHR" },
      { label: "Ethics Adherence", value: "HIPAA & Interpretability" }
    ],
    overview: "Comprehensive analytical research and technical presentation framework exploring deep learning applications in diagnostic imaging, electronic health record (EHR) predictive analysis, and ethical HIPAA-compliant AI pipelines.",
    problemStatement: "Clinicians are overwhelmed by diagnostic backlogs, while early-stage disease patterns are prone to human fatigue oversight. Furthermore, integrating AI into healthcare faces critical hurdles in algorithmic explainability, patient data confidentiality, and regulatory validation.",
    architectureDescription: "The diagnostic pipeline comprises:\n1. Medical Data Preprocessing: Normalization, artifact reduction, and DICOM-to-tensor pipelines with strict data de-identification.\n2. Core Feature Extraction: Convolutional Neural Networks (ResNet/DenseNet) paired with attention mechanisms for pathology localization.\n3. Explainability Engine (XAI): Grad-CAM heatmap generation to project visual justification directly onto clinical imagery for doctors.\n4. Clinical Decision Support Interface: Interactive web dashboard presenting probability distributions and confidence boundaries.",
    keyFeatures: [
      "Convolutional Neural Network (CNN) transfer learning models for anomaly detection",
      "Grad-CAM explainable AI visualizations to prevent 'black box' physician mistrust",
      "Comprehensive research slides addressing regulatory benchmarks and FDA clearances",
      "Tabular risk assessment for chronic disease forecasting using ensemble trees",
      "Complete guidelines on HIPAA/GDPR clinical data governance"
    ],
    databaseSchema: [
      { table: "Patient De-Identified Cohort", primaryKey: "anonymous_study_id", columns: "study_id, modality (X-Ray/CT), organ_target, normalized_tensor_path", description: "Secure anonymized clinical registry adhering to Safe Harbor guidelines." },
      { table: "Model Inference Log", primaryKey: "prediction_id", columns: "prediction_id, timestamp, risk_score, confidence_interval, physician_signoff", description: "Audit trail of every inference output for physician oversight." }
    ],
    apiEndpoints: [
      { method: "POST", path: "/api/ai/predict-lesion", description: "Accepts preprocessed medical scan tensor and returns diagnostic risk distribution." },
      { method: "GET", path: "/api/ai/gradcam/:studyId", description: "Returns visual attention heatmaps overlaid on original radiology scans." },
      { method: "POST", path: "/api/ai/ehr-risk-score", description: "Evaluates patient readmission likelihood from structured vitals." }
    ],
    challengesAndSolutions: [
      { challenge: "High class imbalance in rare medical pathologies leading to high false negatives.", solution: "Applied Focal Loss functions alongside synthetic data augmentation techniques (SMOTE and affine tensor transformations) to prioritize rare positive indicators." },
      { challenge: "Clinician skepticism toward opaque deep learning recommendations.", solution: "Integrated visual Grad-CAM overlays that highlight the exact pixel regions triggering high risk classifications." }
    ],
    githubUrl: "https://github.com/Bpavan124"
  },
  "data-visualization": {
    id: "data-visualization",
    title: "Interactive Data Visualization & Analytics Engine",
    subtitle: "Exploratory Data Analysis & Business Intelligence Pipelines",
    categoryLabel: "Data Analytics & Insights",
    role: "Data Analyst & Visualization Specialist",
    timeline: "2 Months",
    focus: "ETL Transformation & Statistical Modeling",
    techStack: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Jupyter", "Plotly"],
    metrics: [
      { label: "Data Processed", value: "500k+ Records" },
      { label: "Charts Automated", value: "25+ Interactive Types" },
      { label: "Insights Generated", value: "Actionable KPI Trends" }
    ],
    overview: "High-performance data transformation and visual exploration suite converting complex relational datasets into actionable, publication-quality dashboards and statistical insights.",
    problemStatement: "Raw operational and business datasets are often plagued by missing values, misaligned timestamps, and noise. Organizations struggle to isolate trends, seasonal shifts, and revenue leaks when limited to static spreadsheet graphs.",
    architectureDescription: "The analytics pipeline workflow:\n1. Ingestion & Validation: Reads heterogeneous data sources (CSV, Parquet, SQL endpoints) with schema verification.\n2. Cleaning & Feature Engineering: Imputes missing values, encodes categoricals, and extracts time-series horizons.\n3. Statistical Modeling: Calculates Pearson/Spearman correlation indices, percentiles, and Z-score distributions.\n4. Visualization Engine: Automatically outputs customized multi-panel dashboards, violin distributions, and heatmaps.",
    keyFeatures: [
      "Automated Outlier Detection using Interquartile Range (IQR) & Z-score models",
      "Interactive Seaborn Heatmaps & Pair-Plot distributions for feature discovery",
      "Time-Series Decomposition highlighting trend, seasonality, and residual noise",
      "Custom publication-grade themes adhering to accessibility and color-contrast norms",
      "Exportable high-resolution vector figures (SVG/PDF) for executive reporting"
    ],
    databaseSchema: [
      { table: "raw_telemetry_records", primaryKey: "event_id", columns: "event_id, timestamp, metric_name, raw_value, device_source", description: "Incoming uncleaned time-series operational data." },
      { table: "aggregated_kpi_snapshots", primaryKey: "snapshot_id", columns: "snapshot_id, date_bucket, rolling_average, anomaly_flag", description: "Rollup table calculated for lightning-fast dashboard rendering." }
    ],
    apiEndpoints: [
      { method: "GET", path: "/api/analytics/kpi-summary", description: "Delivers aggregated performance metrics across configured intervals." },
      { method: "POST", path: "/api/analytics/upload-and-analyze", description: "Processes user-uploaded dataset and returns statistical summary." },
      { method: "GET", path: "/api/analytics/correlation-matrix", description: "Generates correlation coefficients between numerical dimensions." }
    ],
    challengesAndSolutions: [
      { challenge: "Rendering large datasets without memory throttling or sluggish graph rendering.", solution: "Downsampled non-critical time-slices and leveraged categorical dtype optimizations in Pandas, shrinking RAM footprint by 65%." },
      { challenge: "Distorted chart scales caused by extreme outliers in raw transactional metrics.", solution: "Implemented automated log-transformations and robust quantile scaling to preserve readability across variable ranges." }
    ],
    githubUrl: "https://github.com/Bpavan124"
  }
};

// ==========================================================================
// Toast Notification Utility
// ==========================================================================
function showToast(message, type = 'success', duration = 5000) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  const icon = type === 'success' ? '✅' : '⚠️';
  toast.innerHTML = `
    <span>${icon}</span>
    <div style="flex: 1; line-height: 1.4;">${message}</div>
    <button style="background: none; border: none; color: #94a3b8; cursor: pointer; font-size: 1rem;" onclick="this.parentElement.remove()">&times;</button>
  `;

  container.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// ==========================================================================
// Native Modal Dialog Controls ("Book a Project")
// ==========================================================================
function openBookingModal(prefilledCategory = null) {
  const modal = document.getElementById('bookingModal');
  if (!modal) return;

  if (prefilledCategory) {
    const projectSelect = document.getElementById('projectType');
    if (projectSelect) {
      // Find matching option or select custom
      let found = false;
      for (let option of projectSelect.options) {
        if (option.text.toLowerCase().includes(prefilledCategory.toLowerCase()) || 
            prefilledCategory.toLowerCase().includes(option.value.toLowerCase())) {
          option.selected = true;
          found = true;
          break;
        }
      }
      if (!found) {
        projectSelect.value = "Other Custom Project";
      }
    }
  }

  if (typeof modal.showModal === 'function') {
    modal.showModal();
  } else {
    modal.setAttribute('open', 'true');
  }
}

function closeBookingModal() {
  const modal = document.getElementById('bookingModal');
  if (!modal) return;

  if (typeof modal.close === 'function') {
    modal.close();
  } else {
    modal.removeAttribute('open');
  }
}

// =============================================================
// Theme Switcher Controller (Light & Dark Mode)
// =============================================================
function initTheme() {
  const themeBtn = document.getElementById('themeToggleBtn');
  if (!themeBtn) return;

  function getActiveTheme() {
    const currentAttr = document.documentElement.getAttribute('data-theme');
    if (currentAttr) return currentAttr;
    const saved = localStorage.getItem('portfolio-theme');
    if (saved) return saved;
    return (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) ? 'light' : 'dark';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    themeBtn.setAttribute('aria-label', `Switch to ${nextTheme} theme`);
    themeBtn.setAttribute('title', `Switch to ${nextTheme} theme`);
  }

  // Set initial state
  const currentTheme = getActiveTheme();
  applyTheme(currentTheme);

  themeBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  });

  // Listen for OS system theme change if not manually pinned
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
      if (!localStorage.getItem('portfolio-theme')) {
        applyTheme(e.matches ? 'light' : 'dark');
      }
    });
  }
}

// Attach modal events on DOM loaded
document.addEventListener('DOMContentLoaded', () => {
  initTheme();

  const modal = document.getElementById('bookingModal');
  if (modal) {
    // Close modal when clicking outside on backdrop
    modal.addEventListener('click', (e) => {
      const rect = modal.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        closeBookingModal();
      }
    });
  }

  const openBtn = document.getElementById('openBookModalBtn');
  if (openBtn) {
    openBtn.addEventListener('click', () => openBookingModal());
  }

  // Handle Project Filter Tabs (on index.html)
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Handle "Book a Project" Form Submission
  const bookingForm = document.getElementById('bookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = document.getElementById('bookingSubmitBtn');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>⏳ Submitting &amp; Sending Email...</span>`;

      const formData = new FormData(bookingForm);
      const payload = {
        clientName: formData.get('clientName'),
        clientEmail: formData.get('clientEmail'),
        clientPhone: formData.get('clientPhone'),
        company: formData.get('company'),
        projectType: formData.get('projectType'),
        timeline: formData.get('timeline'),
        estimatedBudget: formData.get('estimatedBudget'),
        deadline: formData.get('deadline'),
        techPreferences: formData.get('techPreferences'),
        projectRequirements: formData.get('projectRequirements')
      };

      try {
        const res = await fetch('/api/book-project', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const data = await res.json();

        if (res.ok && data.success) {
          showToast(`Success! Your project brief has been sent to Boddu Pavankalyan. A confirmation email was sent to ${payload.clientEmail}.`, 'success', 8000);
          bookingForm.reset();
          setTimeout(() => {
            closeBookingModal();
          }, 1200);
        } else {
          showToast(data.message || 'Failed to submit requirements. Please try again.', 'error');
        }
      } catch (err) {
        console.error('API Error:', err);
        showToast('Network error while connecting to server. Email directly at bpavanqwe@gmail.com.', 'error');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    });
  }

  // Handle General Contact Form Submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn = document.getElementById('contactSubmitBtn');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>⏳ Sending Message...</span>`;

      const formData = new FormData(contactForm);
      const payload = {
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message')
      };

      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        const data = await res.json();

        if (res.ok && data.success) {
          showToast(data.message || 'Thank you! Your message has been sent to Boddu Pavankalyan.', 'success');
          contactForm.reset();
        } else {
          showToast(data.message || 'Failed to send message. Please try again.', 'error');
        }
      } catch (err) {
        console.error('Contact API Error:', err);
        showToast('Message delivery failed. Please email directly at bpavanqwe@gmail.com.', 'error');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    });
  }

  // Initialize Project Details View if on project-details.html
  initProjectDetailsPage();
});

// ==========================================================================
// Project Documentation Page Renderer (project-details.html)
// ==========================================================================
async function initProjectDetailsPage() {
  const contentEl = document.getElementById('projectContent');
  if (!contentEl) return; // Not on project details page

  const loadingEl = document.getElementById('loadingState');
  const errorEl = document.getElementById('errorState');

  // Parse URL query parameter: ?id=student-management
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get('id') || 'student-management';

  let projectData = null;

  try {
    // Attempt to fetch from API
    const response = await fetch(`/api/projects/${encodeURIComponent(projectId)}`);
    if (response.ok) {
      const json = await response.json();
      if (json.success && json.project) {
        projectData = json.project;
      }
    }
  } catch (err) {
    console.warn('API endpoint unavailable, falling back to local dataset', err);
  }

  // Fallback to local dataset if API call failed
  if (!projectData && LOCAL_PROJECTS[projectId]) {
    projectData = LOCAL_PROJECTS[projectId];
  }

  if (!projectData) {
    if (loadingEl) loadingEl.style.display = 'none';
    if (errorEl) errorEl.style.display = 'block';
    return;
  }

  // Populate Details Page
  document.getElementById('pageTitle').textContent = `${projectData.title} | Documentation | Boddu Pavankalyan`;
  document.getElementById('docTitle').textContent = projectData.title;
  document.getElementById('docSubtitle').textContent = projectData.subtitle || '';
  document.getElementById('docCategory').textContent = projectData.categoryLabel || 'Engineering Showcase';
  document.getElementById('docRole').textContent = projectData.role || 'Full-Stack Engineer';
  document.getElementById('docTimeline').textContent = projectData.timeline || '2-3 Months';
  document.getElementById('docFocus').textContent = projectData.focus || 'Database Architecture & APIs';
  document.getElementById('docOverview').textContent = projectData.overview || projectData.summary || '';
  document.getElementById('docProblemStatement').textContent = projectData.problemStatement || '';
  document.getElementById('docArchitecture').textContent = projectData.architectureDescription || '';

  // Tech Stack Pills
  const techContainer = document.getElementById('docTechStack');
  techContainer.innerHTML = '';
  if (Array.isArray(projectData.techStack)) {
    projectData.techStack.forEach(t => {
      const pill = document.createElement('span');
      pill.className = 'tech-pill';
      pill.textContent = t;
      techContainer.appendChild(pill);
    });
  }

  // Metrics
  const metricsContainer = document.getElementById('docMetrics');
  metricsContainer.innerHTML = '';
  if (Array.isArray(projectData.metrics)) {
    projectData.metrics.forEach(m => {
      const box = document.createElement('div');
      box.className = 'metric-box';
      box.innerHTML = `
        <div class="metric-num">${m.value}</div>
        <div class="metric-lbl">${m.label}</div>
      `;
      metricsContainer.appendChild(box);
    });
  }

  // Key Features
  const featuresList = document.getElementById('docKeyFeatures');
  featuresList.innerHTML = '';
  if (Array.isArray(projectData.keyFeatures)) {
    projectData.keyFeatures.forEach(f => {
      const li = document.createElement('li');
      li.style.display = 'flex';
      li.style.alignItems = 'flex-start';
      li.style.gap = '10px';
      li.innerHTML = `<span style="color: #34d399; font-weight: bold;">✔</span> <span style="color: var(--text-muted);">${f}</span>`;
      featuresList.appendChild(li);
    });
  }

  // Database Schema Table
  const schemaBody = document.getElementById('docSchemaTable');
  schemaBody.innerHTML = '';
  if (Array.isArray(projectData.databaseSchema)) {
    projectData.databaseSchema.forEach(item => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong style="color: var(--text-main);">${item.table}</strong></td>
        <td><code>${item.primaryKey}</code></td>
        <td><span style="font-size: 0.84rem; color: var(--text-muted);">${item.columns}</span></td>
        <td>${item.description}</td>
      `;
      schemaBody.appendChild(tr);
    });
  }

  // API Endpoints Table
  const apiBody = document.getElementById('docApiTable');
  apiBody.innerHTML = '';
  if (Array.isArray(projectData.apiEndpoints)) {
    projectData.apiEndpoints.forEach(endpoint => {
      const methodClass = `badge-${(endpoint.method || 'get').toLowerCase()}`;
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><span class="badge-method ${methodClass}">${endpoint.method}</span></td>
        <td><code>${endpoint.path}</code></td>
        <td>${endpoint.description}</td>
      `;
      apiBody.appendChild(tr);
    });
  }

  // Challenges & Solutions
  const challengesContainer = document.getElementById('docChallenges');
  challengesContainer.innerHTML = '';
  if (Array.isArray(projectData.challengesAndSolutions)) {
    projectData.challengesAndSolutions.forEach((cs, i) => {
      const item = document.createElement('div');
      item.className = 'challenge-item';
      item.innerHTML = `
        <h4><span>⚠️</span> Challenge ${i + 1}: ${cs.challenge}</h4>
        <div class="solution-box">
          <strong style="color: #34d399;">Engineered Solution:</strong> ${cs.solution}
        </div>
      `;
      challengesContainer.appendChild(item);
    });
  }

  // Hook Book Buttons
  const bookBtn = document.getElementById('bookThisProjectBtn');
  if (bookBtn) {
    bookBtn.addEventListener('click', () => openBookingModal(projectData.title));
  }
  const bottomBookBtn = document.getElementById('bottomBookBtn');
  if (bottomBookBtn) {
    bottomBookBtn.addEventListener('click', () => openBookingModal(projectData.title));
  }

  // Reveal Content
  if (loadingEl) loadingEl.style.display = 'none';
  if (contentEl) contentEl.style.display = 'block';
}