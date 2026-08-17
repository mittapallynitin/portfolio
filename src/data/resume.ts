export const resume = {
  personalInfo: {
    name: "Nitin Mittapally",
    title: "AI Engineer",
    email: "mittapallynitin@gmail.com",
    location: "New York, NY",
    github: "https://github.com/mittapallynitin",
    linkedin: "https://linkedin.com/in/nitinmittapally",
  },

  summary:
    "specializing in Agentic AI systems, LLM evaluation platforms, and RAG pipelines — building production-grade GenAI applications that scale from prototype to 100K+ requests/hour across finance and tech.",

  kpiHighlights: [
    { value: "8+", label: "Years in AI/ML" },
    { value: "50+", label: "Hours Saved weekly" },
    { value: "100K+", label: "Evals / Hour" },
    { value: "28%", label: "Gen AI Cost Reduced" },
    { value: "1M+", label: "Reviews Analyzed" },
    { value: "150 RPS", label: "Sub-3s AI Response" },
    { value: "500K Users", label: "Served DAU" },
    { value: "98%", label: "Eval Ground Truth Accuracy" },
  ],

  expertiseTags: [
    "Agentic AI",
    "MCP",
    "RAG",
    "LLM Evaluation",
    "Fine-Tuning",
    "Prompt Engineering",
    "LangChain",
    "Vector Search",
    "NLP",
    "LLMs",
    "GenAI",
    "AI/ML",
    "Distributed Systems",
    "FastAPI",
    "Kubernetes",
    "AWS",
    "Google Cloud",
    "PyTorch",
    "Transformers",
    "Vector Databases",
  ],

  experience: [
    {
      company: "Charles Schwab",
      position: "Applied AI Engineer",
      location: "California, USA",
      duration: "Dec 2025 – July 2026",
      description: [
        "Architected multi-tenant organization-wide Evals Platform with OpenTelemetry-based ingestion, configurable sampling strategies, and customizable evaluation metrics on GCP with Vertex AI, processing ~100K evals per hour",
        "Built scalable ETL pipelines to ingest, summarize, and index daily financial news, market performance, and sector trends for all S&P 500 stocks using Python, Airflow, and Google Vertex AI, creating a reusable knowledge repository",
        "Developed a Portfolio Insights Generator service in Python producing personalized, context-aware investment insights for Schwab customers based on portfolio composition, market signals, and daily P&L",
        "Engineered prompt strategies, evaluation frameworks, and safety guardrails to ensure accurate, grounded, safe and compliant AI-generated insights, improving output reliability and consistency",
        "Conducted load and stress testing of FastAPI services to achieve p99 latency under 3 seconds at 150 requests/sec",
        "Designed and built a React UI to experiment with prompts, review model outputs, collect human feedback, and visualize evaluation metrics through dashboards",
        "Optimized prompt structure and token usage to improve generated-content quality while reducing response latency by 15% and per-query cost by 25%",
      ],
      technologies: [
        "Python",
        "GCP",
        "Vertex AI",
        "Airflow",
        "FastAPI",
        "React",
        "OpenTelemetry",
      ],
    },
    {
      company: "Fractal Analytics",
      position: "Machine Learning Engineer (Client: Google)",
      location: "New York, NY",
      duration: "Apr 2023 – Nov 2025",
      description: [
        "Developed and deployed a large-scale LLM app for feature extraction, reducing 20 man-hours per user request and creating a centralized repository for generating latent transcript features across Google hardware devices",
        "Designed and implemented an end-to-end BERT-based topic modeling pipeline, uncovering trending issues and operational anomalies from chat transcripts to drive proactive decision-making using Hugging Face and PyTorch",
        "Engineered an efficient, scalable foundational framework for prompt engineering, equipping a team of 20+ members to optimize workflows and reducing 50+ man-hours per task",
        "Enhanced transcript filtering precision by integrating semantic search with the FAISS vector database, improving data accessibility and reducing manual context-based queries",
        "Fine-tuned a BERT model for generating more accurate embeddings for Google Product customer transcripts using Hugging Face",
        "Built classification algorithms to identify and cluster troubleshooting steps into reusable documentation, increasing self-service resolution rates by 25% using scikit-learn and PyTorch",
        "Conducted gap analysis on Google Help Center content for the Pixel Tablet launch based on Pixel Slate search data, improving customer experience using transformers, scikit-learn, and PyTorch",
        "Extracted actionable insights from 500K+ customer reviews of Google Pixel Buds and Pixel Watch, driving feature enhancements through competitor analysis",
        "Leveraged prompt engineering and few-shot learning to improve Google Help Center resources and documentation across six major product lines",
      ],
      technologies: [
        "Python",
        "PyTorch",
        "Transformers",
        "scikit-learn",
        "FAISS",
        "Hugging Face",
        "LangChain",
        "OpenAI",
        "FastAPI",
      ],
    },
    {
      company: "Fractal Analytics",
      position: "Data Scientist",
      location: "New York, NY",
      duration: "Sep 2021 – Apr 2023",
      description: [
        "Implemented BERTopic to identify topics and subtopics in global support ticket data",
        "Built scalable data processing pipeline with NER and lemmatization for topic modeling",
        "Consolidated knowledge base content, reducing redundancy by 40%",
        "Built dashboard in Power BI for topic trend visualization across user journeys",
        "Engineered feature sets from 38M retail transaction records for delivery time prediction model with 16% accuracy boost",
      ],
      technologies: [
        "Python",
        "BERTopic",
        "NER",
        "Power BI",
        "Random Forest",
        "Data Preprocessing",
      ],
    },
    {
      company: "DBS Bank",
      position: "Application Developer",
      location: "Hyderabad, India",
      duration: "Sep 2019 – Dec 2020",
      description: [
        "Developed distributed data pipelines in Java Spring Boot for fetching, processing, and distributing securities data from Bloomberg and Reuters to downstream banking and trading applications",
        "Designed end-to-end module to migrate from IBOR to SORA, handling 200 requests/sec for on-demand interest rate calculations",
        "Built classification model for anomaly detection in Python, conserving ~30 hours per week for the accounting team and decreasing false positive violations by ~28%",
        "Coded Angular8 business process UI for monitoring, correcting, and approving security rates to downstream systems",
        "Designed targeted advertising model using logistic regression, random forest, and XGBoost to identify potential investors for mutual funds and term deposits, achieving 18% reduction in marketing cost",
        "Created and automated monthly Tableau dashboards and sales reports to monitor KPIs for stakeholders",
      ],
      technologies: [
        "Java",
        "Spring Boot",
        "Python",
        "Angular8",
        "XGBoost",
        "Tableau",
        "Bloomberg API",
      ],
    },
    {
      company: "Oracle",
      position: "Associate Software Developer",
      location: "Hyderabad, India",
      duration: "Jan 2017 – Sep 2019",
      description: [
        "Migrated Oracle's Property Management System to cloud and built ~40 microservices",
        "Improved UI and reduced task time by 30% through UX enhancements",
        'Built NLP-based chatbot "OpBot" for kiosk check-ins',
        "Developed automation testing frameworks saving 40% of testing time",
        "Redesigned CI/CD pipelines reducing deployment time by 50%",
      ],
      technologies: [
        "Python",
        "Django",
        "React",
        "PostgreSQL",
        "Oracle Cloud",
        "Kubernetes",
        "Jenkins",
      ],
    },
  ],

  education: [
    {
      institution: "Trine University",
      degree: "Master of Business Administration (MBA)",
      location: "Reston, VA",
      duration: "Jan, 2025 - Oct, 2026",
      relevantCoursework: [
        "Product Development",
        "Strategic Marketing",
        "Quantitative Methods",
      ],
    },
    {
      institution: "University of Cincinnati",
      degree: "Master of Science in Business Analytics",
      location: "Cincinnati, OH",
      duration: "Jan, 2021 - Dec, 2021",
      relevantCoursework: [
        "Machine Learning",
        "Big Data Analytics",
        "Statistical Analysis",
        "Data Mining",
      ],
    },
    {
      institution: "Osmania University",
      degree: "Bachelor of Engineering in Electronics and Communication",
      location: "Hyderabad, India",
      duration: "2013 - 2017",
      relevantCoursework: [
        "Programming",
        "Speech Processing",
        "Digital Signal Processing",
      ],
    },
  ],

  certifications: [
    {
      name: "Deep Learning Specialization",
      issuer: "Coursera",
      date: "2022",
      credentialId: "DL-789012",
    },
    {
      name: "Generative AI with Large Language Models",
      issuer: "DeepLearning.AI",
      date: "2023",
    },
    {
      name: "End-to-End Machine Learning with TensorFlow on Google Cloud",
      issuer: "Google Cloud",
      date: "2023",
    },
    {
      name: "Getting Started with Large Language Models",
      issuer: "Analytics Vidhya",
      date: "2023",
    },
    {
      name: "Neural Networks and Deep Learning",
      issuer: "DeepLearning.AI",
      date: "2022",
    },
  ],

  skills: {
    technical: [
      {
        category: "Programming Languages",
        items: ["Python", "R", "SQL", "SAS", "Java", "MATLAB", "Scala"],
      },
      {
        category: "Machine Learning & NLP",
        items: [
          "scikit-learn",
          "PyTorch",
          "TensorFlow",
          "Transformers",
          "NLTK",
          "Gensim",
          "LangChain",
          "Langraph",
          "Prompt Engineering",
          "LLM Fine Tuning",
        ],
      },
      {
        category: "Tools & Technologies",
        items: [
          "Git",
          "Docker",
          "AWS",
          "Google Cloud",
          "Vertex AI",
          "Databricks",
          "Streamlit",
          "Flask",
          "Jenkins",
        ],
      },
      {
        category: "Databases",
        items: [
          "PostgreSQL",
          "MongoDB",
          "MySQL",
          "Oracle DB",
          "BigQuery",
          "FAISS",
        ],
      },
    ],
    soft: [
      "Team Leadership",
      "Project Management",
      "Problem Solving",
      "Technical Writing",
    ],
  },

  projects: [
    {
      name: "DocuAnswer",
      description:
        "LangChain & Streamlit-based Retrieval-Augmented Generation (RAG) system for document Q&A",
      technologies: [
        "Python",
        "LangChain",
        "FAISS",
        "OpenAI",
        "Streamlit",
        "Flask",
      ],
      link: "https://github.com/mittapallynitin/DocuAnswer",
    },
    {
      name: "Emotion Detection – Multi-Class Text Classification",
      description:
        "Built a PyTorch-based emotion classifier using TinyBERT on 450K examples, achieving F1 > 98%",
      technologies: ["Python", "Hugging Face", "PyTorch"],
      link: "https://github.com/mittapallynitin/EmotionDetection",
    },
    {
      name: "Causal Language Modeling – Code Generation",
      description:
        "Trained a GPT-2 model on CodeSearchNet (~450K functions) with custom BPE tokenizer for Python code",
      technologies: ["Python", "Transformers", "Hugging Face"],
      link: "https://github.com/mittapallynitin/CodeGenLM",
    },
    {
      name: "Attention Is All You Need – Paper Implementation",
      description:
        "Implemented key components of Transformer architecture including multi-head attention and layer norm",
      technologies: ["Python", "NumPy"],
      link: "https://github.com/mittapallynitin/TransformerPaper",
    },
  ],

  languages: [
    { language: "English", proficiency: "Native" },
    { language: "Spanish", proficiency: "Intermediate" },
  ],

  projectsToExclude: ["blogs", "portfolio", "mittapallynitin"],
} as const;

export type Resume = typeof resume;
export type ExperienceEntry = Resume["experience"][number];
export type EducationEntry = Resume["education"][number];
export type CertificationEntry = Resume["certifications"][number];
