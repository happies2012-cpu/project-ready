export interface Project {
  id: string;
  title: string;
  abstract: string;
  category: string;
  subcategory: string;
  technology: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  downloads: number;
  rating: number;
  price: number;
  isFree: boolean;
  thumbnail: string;
  files: {
    sourceCode: boolean;
    ppt: boolean;
    documentation: boolean;
    report: boolean;
    researchPaper: boolean;
    diagrams: boolean;
  };
  createdAt: string;
  featured: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  subcategories: string[];
  projectCount: number;
}

export const categories: Category[] = [
  {
    id: 'engineering',
    name: 'Engineering',
    icon: '⚙️',
    color: 'engineering',
    subcategories: ['B.Tech CSE', 'B.Tech ECE', 'B.Tech EEE', 'B.Tech MECH', 'B.Tech CIVIL', 'B.Tech AI', 'B.Tech DS', 'B.Tech IoT', 'B.Tech Cyber', 'M.Tech'],
    projectCount: 450
  },
  {
    id: 'science',
    name: 'Science & IT',
    icon: '💻',
    color: 'science',
    subcategories: ['BCA', 'MCA', 'B.Sc CS', 'B.Sc IT', 'M.Sc CS', 'M.Sc Data Science', 'Python', 'Java', 'JavaScript', 'Flutter', 'React'],
    projectCount: 380
  },
  {
    id: 'medical',
    name: 'Medical & Health',
    icon: '🏥',
    color: 'medical',
    subcategories: ['Nursing', 'Clinical Research', 'Medical Coding', 'Healthcare AI', 'Pharmacy', 'Public Health'],
    projectCount: 120
  },
  {
    id: 'management',
    name: 'Management',
    icon: '📊',
    color: 'management',
    subcategories: ['MBA HR', 'MBA Finance', 'MBA Marketing', 'MBA Operations', 'ICWA', 'Commerce', 'BBA'],
    projectCount: 200
  },
  {
    id: 'arts',
    name: 'Arts & Education',
    icon: '🎨',
    color: 'arts',
    subcategories: ['BA', 'MA', 'B.Ed', 'M.Ed', 'Education Research', 'Psychology', 'Sociology'],
    projectCount: 150
  },
  {
    id: 'tech',
    name: 'Special Tech',
    icon: '🚀',
    color: 'tech',
    subcategories: ['AI/ML', 'Deep Learning', 'IoT', 'Blockchain', 'Cloud Computing', 'Cyber Security', 'Robotics', 'AR/VR'],
    projectCount: 280
  }
];

export const projects: Project[] = [
  {
    id: '1',
    title: 'AI-Powered Disease Prediction System',
    abstract: 'A machine learning based system that predicts diseases based on symptoms using advanced algorithms and neural networks.',
    category: 'engineering',
    subcategory: 'B.Tech CSE',
    technology: ['Python', 'TensorFlow', 'Flask', 'React'],
    difficulty: 'Advanced',
    downloads: 1250,
    rating: 4.8,
    price: 0,
    isFree: true,
    thumbnail: '/images/landing/project_thumb_ai.png',
    files: { sourceCode: true, ppt: true, documentation: true, report: true, researchPaper: true, diagrams: true },
    createdAt: '2024-01-15',
    featured: true
  },
  {
    id: '2',
    title: 'Smart Agriculture IoT Monitoring System',
    abstract: 'IoT-based agriculture monitoring system for real-time crop health analysis and automated irrigation.',
    category: 'engineering',
    subcategory: 'B.Tech IoT',
    technology: ['Arduino', 'Python', 'Node.js', 'MongoDB'],
    difficulty: 'Intermediate',
    downloads: 890,
    rating: 4.6,
    price: 0,
    isFree: true,
    thumbnail: '/images/landing/project_thumb_data.png',
    files: { sourceCode: true, ppt: true, documentation: true, report: true, researchPaper: false, diagrams: true },
    createdAt: '2024-02-10',
    featured: true
  },
  {
    id: '3',
    title: 'Blockchain-Based Voting System',
    abstract: 'Secure and transparent electronic voting system using blockchain technology with smart contracts.',
    category: 'tech',
    subcategory: 'Blockchain',
    technology: ['Solidity', 'Ethereum', 'React', 'Web3.js'],
    difficulty: 'Advanced',
    downloads: 756,
    rating: 4.9,
    price: 0,
    isFree: true,
    thumbnail: '/images/landing/project_thumb_code.png',
    files: { sourceCode: true, ppt: true, documentation: true, report: true, researchPaper: true, diagrams: true },
    createdAt: '2024-01-28',
    featured: true
  },
  {
    id: '4',
    title: 'E-Commerce Platform with Payment Gateway',
    abstract: 'Full-stack e-commerce solution with integrated payment processing, inventory management, and analytics.',
    category: 'science',
    subcategory: 'MCA',
    technology: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    difficulty: 'Intermediate',
    downloads: 1456,
    rating: 4.7,
    price: 0,
    isFree: true,
    thumbnail: '/images/landing/dashboard_preview.png',
    files: { sourceCode: true, ppt: true, documentation: true, report: true, researchPaper: false, diagrams: true },
    createdAt: '2024-03-05',
    featured: false
  },
  {
    id: '5',
    title: 'Hospital Management System',
    abstract: 'Comprehensive hospital management solution covering patient records, appointments, billing, and pharmacy.',
    category: 'medical',
    subcategory: 'Healthcare AI',
    technology: ['Java', 'Spring Boot', 'MySQL', 'Angular'],
    difficulty: 'Advanced',
    downloads: 678,
    rating: 4.5,
    price: 0,
    isFree: true,
    thumbnail: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
    files: { sourceCode: true, ppt: true, documentation: true, report: true, researchPaper: false, diagrams: true },
    createdAt: '2024-02-20',
    featured: false
  },
  {
    id: '6',
    title: 'HR Analytics Dashboard',
    abstract: 'Data-driven HR analytics platform for employee performance tracking, attrition prediction, and workforce planning.',
    category: 'management',
    subcategory: 'MBA HR',
    technology: ['Python', 'Power BI', 'SQL', 'Tableau'],
    difficulty: 'Intermediate',
    downloads: 534,
    rating: 4.4,
    price: 0,
    isFree: true,
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    files: { sourceCode: true, ppt: true, documentation: true, report: true, researchPaper: true, diagrams: true },
    createdAt: '2024-03-12',
    featured: false
  },
  {
    id: '7',
    title: 'Online Learning Management System',
    abstract: 'Complete LMS with course management, video streaming, assessments, and progress tracking.',
    category: 'arts',
    subcategory: 'B.Ed',
    technology: ['React', 'Node.js', 'MongoDB', 'AWS'],
    difficulty: 'Advanced',
    downloads: 923,
    rating: 4.6,
    price: 0,
    isFree: true,
    thumbnail: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80',
    files: { sourceCode: true, ppt: true, documentation: true, report: true, researchPaper: false, diagrams: true },
    createdAt: '2024-01-08',
    featured: true
  },
  {
    id: '8',
    title: 'Real-Time Object Detection using YOLO',
    abstract: 'Deep learning based real-time object detection system using YOLO algorithm for security surveillance.',
    category: 'tech',
    subcategory: 'Deep Learning',
    technology: ['Python', 'PyTorch', 'OpenCV', 'YOLO'],
    difficulty: 'Advanced',
    downloads: 1087,
    rating: 4.8,
    price: 0,
    isFree: true,
    thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    files: { sourceCode: true, ppt: true, documentation: true, report: true, researchPaper: true, diagrams: true },
    createdAt: '2024-02-28',
    featured: true
  },
  {
    id: '9',
    title: 'Mobile Banking Flutter App',
    abstract: 'Cross-platform mobile banking application with biometric authentication and transaction management.',
    category: 'science',
    subcategory: 'Flutter',
    technology: ['Flutter', 'Dart', 'Firebase', 'Node.js'],
    difficulty: 'Intermediate',
    downloads: 789,
    rating: 4.5,
    price: 0,
    isFree: true,
    thumbnail: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    files: { sourceCode: true, ppt: true, documentation: true, report: true, researchPaper: false, diagrams: true },
    createdAt: '2024-03-18',
    featured: false
  },
  {
    id: '10',
    title: 'Cloud-Based File Storage System',
    abstract: 'Secure cloud storage solution with end-to-end encryption, file sharing, and collaboration features.',
    category: 'tech',
    subcategory: 'Cloud Computing',
    technology: ['AWS', 'React', 'Node.js', 'Docker'],
    difficulty: 'Advanced',
    downloads: 645,
    rating: 4.7,
    price: 0,
    isFree: true,
    thumbnail: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80',
    files: { sourceCode: true, ppt: true, documentation: true, report: true, researchPaper: false, diagrams: true },
    createdAt: '2024-01-22',
    featured: false
  },
  {
    id: '11',
    title: 'Sentiment Analysis of Social Media',
    abstract: 'NLP-based sentiment analysis tool for analyzing public opinion on social media platforms.',
    category: 'engineering',
    subcategory: 'B.Tech AI',
    technology: ['Python', 'NLTK', 'Scikit-learn', 'Flask'],
    difficulty: 'Intermediate',
    downloads: 876,
    rating: 4.4,
    price: 0,
    isFree: true,
    thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80',
    files: { sourceCode: true, ppt: true, documentation: true, report: true, researchPaper: true, diagrams: true },
    createdAt: '2024-02-05',
    featured: false
  },
  {
    id: '12',
    title: 'Autonomous Drone Navigation System',
    abstract: 'Computer vision and GPS-based autonomous drone navigation with obstacle avoidance.',
    category: 'tech',
    subcategory: 'Robotics',
    technology: ['Python', 'ROS', 'OpenCV', 'TensorFlow'],
    difficulty: 'Advanced',
    downloads: 432,
    rating: 4.9,
    price: 0,
    isFree: true,
    thumbnail: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&w=800&q=80',
    files: { sourceCode: true, ppt: true, documentation: true, report: true, researchPaper: true, diagrams: true },
    createdAt: '2024-03-25',
    featured: true
  }
];

export const stats = {
  totalProjects: 1580,
  totalDownloads: 125000,
  activeStudents: 45000,
  categories: 6,
  universities: 500
};
