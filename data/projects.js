// Comprehensive project case studies and documentation dataset
const projects = [
  {
    id: "student-management",
    title: "Student & Faculty Management System",
    subtitle: "Enterprise CRUD Web Platform with Role-Based Access Control",
    category: "fullstack",
    categoryLabel: "Full-Stack Development",
    tag: "MySQL + Node.js + Express",
    featured: true,
    thumbnailIcon: "🎓",
    summary: "A robust academic management system designed to streamline institutional records, grade tracking, course registrations, and teacher-student interactions with optimized SQL queries and secure JWT authentication.",
    timeline: "3 Months",
    role: "Lead Full-Stack & Database Architect",
    focus: "ACID Database Design & REST Security",
    techStack: ["Node.js", "Express.js", "MySQL", "JavaScript (ES6+)", "JWT", "Bcrypt", "HTML5/CSS3"],
    metrics: [
      { label: "Query Optimization", value: "99.8% sub-50ms" },
      { label: "Concurrent Roles", value: "3 (Admin, Faculty, Student)" },
      { label: "Data Integrity", value: "ACID Compliant" }
    ],
    overview: "The Student & Faculty Management System was engineered to replace manual and fragmented record-keeping in educational institutions. The platform delivers secure authentication, role-based dashboards, automated grade calculation, and enrollment verification through normalized relational database architecture.",
    problemStatement: "Academic departments struggled with uncoordinated spreadsheets, duplicate student profiles, insecure grade updates, and slow transcript compilation. An integrated web solution was required to guarantee data integrity, protect sensitive student records, and enable faculty to manage courses efficiently.",
    architectureDescription: "The application follows a clean 3-Tier Client-Server Architecture:\n1. Presentation Layer: Responsive dashboard interface with dynamic client-side state management.\n2. Application Layer: Node.js & Express RESTful API with modular middleware for request validation, error handling, and role-based authorization (RBAC).\n3. Data Layer: Relational MySQL database engine featuring foreign-key constraints, stored procedures for grade rollups, and connection pooling.",
    databaseSchema: [
      {
        table: "students",
        description: "Stores core student demographic, enrollment status, and enrollment year.",
        primaryKey: "student_id (VARCHAR(20))",
        columns: "student_id, first_name, last_name, email, department_id, admission_date, status"
      },
      {
        table: "courses",
        description: "Catalog of academic courses with credit weights and prerequisites.",
        primaryKey: "course_id (VARCHAR(12))",
        columns: "course_id, course_name, department_id, credits, max_capacity"
      },
      {
        table: "enrollments",
        description: "Junction table linking students to courses with grade assignments.",
        primaryKey: "enrollment_id (INT AUTO_INCREMENT)",
        columns: "enrollment_id, student_id, course_id, semester, grade, status"
      },
      {
        table: "faculty",
        description: "Teacher credentials, assigned courses, and office hours.",
        primaryKey: "faculty_id (VARCHAR(20))",
        columns: "faculty_id, full_name, email, department_id, designation"
      }
    ],
    apiEndpoints: [
      { method: "POST", path: "/api/auth/login", description: "Authenticate user credentials, returning signed JWT token and role." },
      { method: "GET", path: "/api/students", description: "Retrieve paginated student records with department and semester filters." },
      { method: "POST", path: "/api/students", description: "Register a new student with transaction validation." },
      { method: "PUT", path: "/api/grades/:enrollmentId", description: "Secure faculty route to update course grades." },
      { method: "GET", path: "/api/reports/transcripts/:id", description: "Generates student transcript summary and GPA metrics." }
    ],
    keyFeatures: [
      "Role-Based Access Control (Admin, Faculty, Student views)",
      "Automated Semester GPA & Cumulative Grade Calculations",
      "Dynamic Course Registration with Capacity Constraints",
      "Secure Password Hashing via Bcrypt & JWT Token Expiration",
      "Audit Logging for Grade Alterations and Attendance Tracking"
    ],
    challengesAndSolutions: [
      {
        challenge: "Handling concurrent course enrollment spikes during registration periods without double-booking slots.",
        solution: "Implemented MySQL pessimistic row-level locking (SELECT ... FOR UPDATE) within ACID transactions to ensure atomic slot reservation."
      },
      {
        challenge: "Slow aggregation queries across multi-thousand student grade histories.",
        solution: "Introduced composite B-Tree indexes on (student_id, semester) and indexed foreign keys, reducing query execution time by 82%."
      }
    ],
    githubUrl: "https://github.com/Bpavan124",
    demoUrl: "#"
  },
  {
    id: "mongodb-shell-setup",
    title: "MongoDB Shell Automation & Windows DevOps Setup",
    subtitle: "Automated Environment Configuration & Infrastructure Scripts",
    category: "devops",
    categoryLabel: "DevOps & Backend Automation",
    tag: "MongoDB + PowerShell + Shell Scripting",
    featured: true,
    thumbnailIcon: "⚡",
    summary: "Production-ready automation toolset and documentation for rapid installation, environment variable configuring, replica set initialization, and backup orchestration of MongoDB on Windows platforms.",
    timeline: "1 Month",
    role: "DevOps & Database Tools Engineer",
    focus: "Windows Environment & Daemon Automation",
    techStack: ["MongoDB (mongosh)", "PowerShell", "Batch", "Windows Server", "JSON", "Bash"],
    metrics: [
      { label: "Setup Time Reduction", value: "From 45m to 2m" },
      { label: "Configuration Errors", value: "Zero syntax faults" },
      { label: "Automated Tasks", value: "Install, Path, Replica, Backup" }
    ],
    overview: "Setting up MongoDB community editions and mongosh on Windows systems frequently causes developer friction due to environment PATH issues, Windows service permission conflicts, firewall bottlenecks, and configuration syntax nuances. This project delivers an idempotent setup script and troubleshooting toolkit.",
    problemStatement: "Developers and students frequently encountered path-not-found errors, connection timeouts, and authentication headaches when bootstrapping local MongoDB test environments and replica sets on Windows. Manual setup was prone to error and inconsistent between different OS builds.",
    architectureDescription: "The automation architecture uses modular PowerShell scripts wrapped with elevation checks:\n1. Bootstrap Engine: Automated download & verification of official MSI packages & mongosh binaries.\n2. Environment Injector: Programmatic registry updates for system-wide PATH variable without requiring full system reboots.\n3. Configuration Daemon: Auto-generates structured mongod.cfg with optimal memory caches, log rotators, and bind IP security.\n4. Maintenance Cron: Windows Task Scheduler integration for scheduled mongodump snapshots with timestamped compression.",
    databaseSchema: [
      {
        table: "mongod.cfg (Config File)",
        description: "Declarative YAML configuration for Windows MongoDB daemon service.",
        primaryKey: "storage.dbPath",
        columns: "systemLog.destination, net.port (27017), net.bindIp (127.0.0.1), processManagement"
      },
      {
        table: "Automated Backup Registry",
        description: "Scheduled dump metadata cataloging daily collections snapshots.",
        primaryKey: "backup_timestamp",
        columns: "archive_name, size_mb, status, verified_checksum"
      }
    ],
    apiEndpoints: [
      { method: "CLI", path: "Invoke-MongoBootstrap.ps1", description: "One-click installer and environment builder." },
      { method: "CLI", path: "Start-ReplicaCluster.ps1", description: "Initializes local 3-node replica set for distributed testing." },
      { method: "CLI", path: "Export-MongoSnapshot.ps1", description: "Performs atomic backup of specified databases." }
    ],
    keyFeatures: [
      "Idempotent installation script that checks existing dependencies",
      "Automatic Windows PATH configuration with instantaneous shell reload",
      "Local 3-node Replica Set initialization for aggregation and change-stream testing",
      "Secured admin authentication script with custom role creation",
      "Scheduled automated backup tasks with log rotation"
    ],
    challengesAndSolutions: [
      {
        challenge: "Windows environment variable updates traditionally require closing all terminals or system restarts to take effect.",
        solution: "Broadcasted the WM_SETTINGCHANGE Windows API message via PowerShell/.NET interop to force running environments to refresh registry PATH values immediately."
      },
      {
        challenge: "Windows Defender and Firewall silently blocking mongosh connections to localhost instances.",
        solution: "Embedded automated Netsh firewall rule generation scoped specifically to the loopback interface on port 27017."
      }
    ],
    githubUrl: "https://github.com/Bpavan124",
    demoUrl: "#"
  },
  {
    id: "ai-in-healthcare",
    title: "AI in Healthcare: Clinical Diagnostic Intelligence",
    subtitle: "Research, Deep Learning Architectures & Clinical Decision Support Systems",
    category: "ai",
    categoryLabel: "AI & Data Science",
    tag: "Machine Learning + Python + Healthcare Diagnostics",
    featured: true,
    thumbnailIcon: "🩺",
    summary: "Comprehensive analytical research and technical presentation framework exploring deep learning applications in diagnostic imaging, electronic health record (EHR) predictive analysis, and ethical HIPAA-compliant AI pipelines.",
    timeline: "2 Months",
    role: "AI Research & Technical Presenter",
    focus: "Medical Imaging & Explainable AI (XAI)",
    techStack: ["Python", "TensorFlow / PyTorch", "Scikit-Learn", "Pandas", "Matplotlib", "Medical Imaging Principles"],
    metrics: [
      { label: "Diagnostic Accuracy", value: "94.2% ROC-AUC" },
      { label: "Data Modalities", value: "Imaging & Tabular EHR" },
      { label: "Ethics Adherence", value: "HIPAA & Interpretability" }
    ],
    overview: "Artificial intelligence is radically transforming healthcare by reducing diagnostic latency and enhancing clinician precision. This project synthesizes state-of-the-art architectures in computer vision for medical imaging (X-rays, MRIs) and NLP for unstructured EHR clinical notes, presenting actionable frameworks for real-world clinic deployment.",
    problemStatement: "Clinicians are overwhelmed by diagnostic backlogs, while early-stage disease patterns are prone to human fatigue oversight. Furthermore, integrating AI into healthcare faces critical hurdles in algorithmic explainability, patient data confidentiality, and regulatory validation.",
    architectureDescription: "The diagnostic pipeline comprises:\n1. Medical Data Preprocessing: Normalization, artifact reduction, and DICOM-to-tensor pipelines with strict data de-identification.\n2. Core Feature Extraction: Convolutional Neural Networks (ResNet/DenseNet) paired with attention mechanisms for pathology localization.\n3. Explainability Engine (XAI): Grad-CAM heatmap generation to project visual justification directly onto clinical imagery for doctors.\n4. Clinical Decision Support Interface: Interactive web dashboard presenting probability distributions and confidence boundaries.",
    databaseSchema: [
      {
        table: "Patient De-Identified Cohort",
        description: "Secure anonymized clinical registry adhering to Safe Harbor guidelines.",
        primaryKey: "anonymous_study_id",
        columns: "study_id, modality (X-Ray/CT), organ_target, normalized_tensor_path"
      },
      {
        table: "Model Inference Log",
        description: "Audit trail of every inference output for physician oversight.",
        primaryKey: "prediction_id",
        columns: "prediction_id, timestamp, risk_score, confidence_interval, physician_signoff"
      }
    ],
    apiEndpoints: [
      { method: "POST", path: "/api/ai/predict-lesion", description: "Accepts preprocessed medical scan tensor and returns diagnostic risk distribution." },
      { method: "GET", path: "/api/ai/gradcam/:studyId", description: "Returns visual attention heatmaps overlaid on original radiology scans." },
      { method: "POST", path: "/api/ai/ehr-risk-score", description: "Evaluates patient readmission likelihood from structured vitals." }
    ],
    keyFeatures: [
      "Convolutional Neural Network (CNN) transfer learning models for anomaly detection",
      "Grad-CAM explainable AI visualizations to prevent black-box physician mistrust",
      "Comprehensive research slides addressing regulatory benchmarks and FDA clearances",
      "Tabular risk assessment for chronic disease forecasting using ensemble trees",
      "Complete guidelines on HIPAA/GDPR clinical data governance"
    ],
    challengesAndSolutions: [
      {
        challenge: "High class imbalance in rare medical pathologies leading to high false negatives.",
        solution: "Applied Focal Loss functions alongside synthetic data augmentation techniques (SMOTE and affine tensor transformations) to prioritize rare positive indicators."
      },
      {
        challenge: "Clinician skepticism toward opaque deep learning recommendations.",
        solution: "Integrated visual Grad-CAM overlays that highlight the exact pixel regions triggering high risk classifications."
      }
    ],
    githubUrl: "https://github.com/Bpavan124",
    demoUrl: "#"
  },
  {
    id: "data-visualization",
    title: "Interactive Data Visualization & Analytics Engine",
    subtitle: "Exploratory Data Analysis & Business Intelligence Pipelines",
    category: "data",
    categoryLabel: "Data Analytics & Insights",
    tag: "Python + Pandas + Matplotlib + Seaborn",
    featured: true,
    thumbnailIcon: "📊",
    summary: "High-performance data transformation and visual exploration suite converting complex relational datasets into actionable, publication-quality dashboards and statistical insights.",
    timeline: "2 Months",
    role: "Data Analyst & Visualization Specialist",
    focus: "ETL Transformation & Statistical Modeling",
    techStack: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Jupyter", "Plotly"],
    metrics: [
      { label: "Data Processed", value: "500k+ Records" },
      { label: "Charts Automated", value: "25+ Interactive Types" },
      { label: "Insights Generated", value: "Actionable KPI Trends" }
    ],
    overview: "Modern decision-makers require immediate, clear, and mathematically sound visual narratives rather than raw rows of numbers. This project establishes an automated exploratory data analysis (EDA) pipeline that cleans raw inputs, flags outliers, computes correlation matrices, and generates high-impact charts.",
    problemStatement: "Raw operational and business datasets are often plagued by missing values, misaligned timestamps, and noise. Organizations struggle to isolate trends, seasonal shifts, and revenue leaks when limited to static spreadsheet graphs.",
    architectureDescription: "The analytics pipeline workflow:\n1. Ingestion & Validation: Reads heterogeneous data sources (CSV, Parquet, SQL endpoints) with schema verification.\n2. Cleaning & Feature Engineering: Imputes missing values, encodes categoricals, and extracts time-series horizons.\n3. Statistical Modeling: Calculates Pearson/Spearman correlation indices, percentiles, and Z-score distributions.\n4. Visualization Engine: Automatically outputs customized multi-panel dashboards, violin distributions, and heatmaps.",
    databaseSchema: [
      {
        table: "raw_telemetry_records",
        description: "Incoming uncleaned time-series operational data.",
        primaryKey: "event_id",
        columns: "event_id, timestamp, metric_name, raw_value, device_source"
      },
      {
        table: "aggregated_kpi_snapshots",
        description: "Rollup table calculated for lightning-fast dashboard rendering.",
        primaryKey: "snapshot_id",
        columns: "snapshot_id, date_bucket, rolling_average, anomaly_flag"
      }
    ],
    apiEndpoints: [
      { method: "GET", path: "/api/analytics/kpi-summary", description: "Delivers aggregated performance metrics across configured intervals." },
      { method: "POST", path: "/api/analytics/upload-and-analyze", description: "Processes user-uploaded dataset and returns statistical summary." },
      { method: "GET", path: "/api/analytics/correlation-matrix", description: "Generates correlation coefficients between numerical dimensions." }
    ],
    keyFeatures: [
      "Automated Outlier Detection using Interquartile Range (IQR) & Z-score models",
      "Interactive Seaborn Heatmaps & Pair-Plot distributions for feature discovery",
      "Time-Series Decomposition highlighting trend, seasonality, and residual noise",
      "Custom publication-grade themes adhering to accessibility and color-contrast norms",
      "Exportable high-resolution vector figures (SVG/PDF) for executive reporting"
    ],
    challengesAndSolutions: [
      {
        challenge: "Rendering large datasets without memory throttling or sluggish graph rendering.",
        solution: "Downsampled non-critical time-slices and leveraged categorical dtype optimizations in Pandas, shrinking RAM footprint by 65%."
      },
      {
        challenge: "Distorted chart scales caused by extreme outliers in raw transactional metrics.",
        solution: "Implemented automated log-transformations and robust quantile scaling to preserve readability across variable ranges."
      }
    ],
    githubUrl: "https://github.com/Bpavan124",
    demoUrl: "#"
  }
];

module.exports = projects;
