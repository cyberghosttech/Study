import type {
  User, Subject, Chapter, Topic, Lesson, Question,
  Activity, WeakTopic, StudyPlan, StudySession, ExamConfig
} from '../types';

// ============================================================
// User
// ============================================================
export const mockUser: User = {
  id: 'user-1',
  name: 'Student',
  email: 'student@studyos.app',
  class: '12th Grade',
  board: 'CBSE',
  createdAt: '2025-01-15T00:00:00Z',
};

// ============================================================
// Subjects
// ============================================================
export const mockSubjects: Subject[] = [
  {
    id: 'cs',
    name: 'Computer Science',
    icon: '💻',
    color: '#4f46e5',
    progress: 74,
    currentChapterId: 'cs-ch3',
    totalChapters: 5,
    completedChapters: 3,
  },
  {
    id: 'math',
    name: 'Mathematics',
    icon: '📐',
    color: '#059669',
    progress: 61,
    currentChapterId: 'math-ch3',
    totalChapters: 6,
    completedChapters: 3,
  },
  {
    id: 'physics',
    name: 'Physics',
    icon: '⚛️',
    color: '#d97706',
    progress: 52,
    currentChapterId: 'physics-ch3',
    totalChapters: 5,
    completedChapters: 2,
  },
  {
    id: 'english',
    name: 'English',
    icon: '📖',
    color: '#7c3aed',
    progress: 80,
    currentChapterId: 'eng-ch4',
    totalChapters: 5,
    completedChapters: 3,
  },
];

// ============================================================
// Chapters
// ============================================================
export const mockChapters: Chapter[] = [
  // Computer Science
  { id: 'cs-ch1', subjectId: 'cs', name: 'Introduction to Computing', order: 1, progress: 100, totalTopics: 4, completedTopics: 4 },
  { id: 'cs-ch2', subjectId: 'cs', name: 'Programming Fundamentals', order: 2, progress: 100, totalTopics: 5, completedTopics: 5 },
  { id: 'cs-ch3', subjectId: 'cs', name: 'Data Structures', order: 3, progress: 61, totalTopics: 5, completedTopics: 3 },
  { id: 'cs-ch4', subjectId: 'cs', name: 'Algorithms', order: 4, progress: 20, totalTopics: 5, completedTopics: 1 },
  { id: 'cs-ch5', subjectId: 'cs', name: 'Databases', order: 5, progress: 0, totalTopics: 4, completedTopics: 0 },

  // Mathematics
  { id: 'math-ch1', subjectId: 'math', name: 'Sets and Functions', order: 1, progress: 100, totalTopics: 4, completedTopics: 4 },
  { id: 'math-ch2', subjectId: 'math', name: 'Algebra', order: 2, progress: 100, totalTopics: 5, completedTopics: 5 },
  { id: 'math-ch3', subjectId: 'math', name: 'Calculus', order: 3, progress: 40, totalTopics: 5, completedTopics: 2 },
  { id: 'math-ch4', subjectId: 'math', name: 'Coordinate Geometry', order: 4, progress: 20, totalTopics: 4, completedTopics: 1 },
  { id: 'math-ch5', subjectId: 'math', name: 'Statistics', order: 5, progress: 0, totalTopics: 3, completedTopics: 0 },
  { id: 'math-ch6', subjectId: 'math', name: 'Probability', order: 6, progress: 0, totalTopics: 3, completedTopics: 0 },

  // Physics
  { id: 'physics-ch1', subjectId: 'physics', name: 'Units and Measurements', order: 1, progress: 100, totalTopics: 3, completedTopics: 3 },
  { id: 'physics-ch2', subjectId: 'physics', name: 'Kinematics', order: 2, progress: 100, totalTopics: 4, completedTopics: 4 },
  { id: 'physics-ch3', subjectId: 'physics', name: "Newton's Laws of Motion", order: 3, progress: 33, totalTopics: 3, completedTopics: 1 },
  { id: 'physics-ch4', subjectId: 'physics', name: 'Work, Energy and Power', order: 4, progress: 0, totalTopics: 4, completedTopics: 0 },
  { id: 'physics-ch5', subjectId: 'physics', name: 'Gravitation', order: 5, progress: 0, totalTopics: 3, completedTopics: 0 },

  // English
  { id: 'eng-ch1', subjectId: 'english', name: 'Prose and Poetry', order: 1, progress: 100, totalTopics: 4, completedTopics: 4 },
  { id: 'eng-ch2', subjectId: 'english', name: 'Grammar and Usage', order: 2, progress: 100, totalTopics: 3, completedTopics: 3 },
  { id: 'eng-ch3', subjectId: 'english', name: 'Writing Skills', order: 3, progress: 100, totalTopics: 4, completedTopics: 4 },
  { id: 'eng-ch4', subjectId: 'english', name: 'Literature Analysis', order: 4, progress: 50, totalTopics: 4, completedTopics: 2 },
  { id: 'eng-ch5', subjectId: 'english', name: 'Comprehension', order: 5, progress: 0, totalTopics: 3, completedTopics: 0 },
];

// ============================================================
// Topics
// ============================================================
export const mockTopics: Topic[] = [
  // CS - Data Structures
  { id: 'cs-ch3-t1', chapterId: 'cs-ch3', subjectId: 'cs', name: 'Arrays', order: 1, completed: true, bookmarked: false },
  { id: 'cs-ch3-t2', chapterId: 'cs-ch3', subjectId: 'cs', name: 'Stacks', order: 2, completed: true, bookmarked: true },
  { id: 'cs-ch3-t3', chapterId: 'cs-ch3', subjectId: 'cs', name: 'Queues', order: 3, completed: true, bookmarked: false },
  { id: 'cs-ch3-t4', chapterId: 'cs-ch3', subjectId: 'cs', name: 'Linked Lists', order: 4, completed: false, bookmarked: false },
  { id: 'cs-ch3-t5', chapterId: 'cs-ch3', subjectId: 'cs', name: 'Trees', order: 5, completed: false, bookmarked: false },

  // CS - Algorithms
  { id: 'cs-ch4-t1', chapterId: 'cs-ch4', subjectId: 'cs', name: 'Sorting Algorithms', order: 1, completed: true, bookmarked: false },
  { id: 'cs-ch4-t2', chapterId: 'cs-ch4', subjectId: 'cs', name: 'Searching Algorithms', order: 2, completed: false, bookmarked: false },
  { id: 'cs-ch4-t3', chapterId: 'cs-ch4', subjectId: 'cs', name: 'Recursion', order: 3, completed: false, bookmarked: false },
  { id: 'cs-ch4-t4', chapterId: 'cs-ch4', subjectId: 'cs', name: 'Dynamic Programming', order: 4, completed: false, bookmarked: false },
  { id: 'cs-ch4-t5', chapterId: 'cs-ch4', subjectId: 'cs', name: 'Graph Algorithms', order: 5, completed: false, bookmarked: false },

  // Math - Calculus
  { id: 'math-ch3-t1', chapterId: 'math-ch3', subjectId: 'math', name: 'Limits', order: 1, completed: true, bookmarked: false },
  { id: 'math-ch3-t2', chapterId: 'math-ch3', subjectId: 'math', name: 'Continuity', order: 2, completed: true, bookmarked: false },
  { id: 'math-ch3-t3', chapterId: 'math-ch3', subjectId: 'math', name: 'Differentiation', order: 3, completed: false, bookmarked: true },
  { id: 'math-ch3-t4', chapterId: 'math-ch3', subjectId: 'math', name: 'Integration', order: 4, completed: false, bookmarked: true },
  { id: 'math-ch3-t5', chapterId: 'math-ch3', subjectId: 'math', name: 'Applications of Calculus', order: 5, completed: false, bookmarked: false },

  // Physics - Newton's Laws
  { id: 'physics-ch3-t1', chapterId: 'physics-ch3', subjectId: 'physics', name: "Newton's First Law", order: 1, completed: true, bookmarked: false },
  { id: 'physics-ch3-t2', chapterId: 'physics-ch3', subjectId: 'physics', name: "Newton's Second Law", order: 2, completed: false, bookmarked: false },
  { id: 'physics-ch3-t3', chapterId: 'physics-ch3', subjectId: 'physics', name: "Newton's Third Law", order: 3, completed: false, bookmarked: false },
];

// ============================================================
// Lessons
// ============================================================
export const mockLessons: Record<string, Lesson> = {
  'cs-ch3-t2': {
    id: 'lesson-stacks',
    topicId: 'cs-ch3-t2',
    title: 'Stacks',
    estimatedMinutes: 15,
    content: [
      { type: 'text', content: 'A stack is a linear data structure that follows a particular order in which operations are performed. The order may be LIFO (Last In, First Out) or FILO (First In, Last Out).' },
      { type: 'heading', content: 'Key Concept: LIFO Principle' },
      { type: 'key-concept', content: 'LIFO means Last In, First Out. The last element added to the stack will be the first one to be removed. Think of it like a stack of plates — you always take the top plate first.' },
      { type: 'heading', content: 'Basic Operations' },
      { type: 'text', content: 'A stack supports the following fundamental operations:' },
      { type: 'example', content: 'push(item) — Adds an item to the top of the stack\npop() — Removes and returns the top item\npeek() — Returns the top item without removing it\nisEmpty() — Checks if the stack is empty\nsize() — Returns the number of items in the stack' },
      { type: 'heading', content: 'Real-World Applications' },
      { type: 'text', content: 'Stacks are used in many computing scenarios:' },
      { type: 'note', content: '• Function call management (call stack)\n• Expression evaluation and syntax parsing\n• Undo/Redo operations in text editors\n• Browser history (back/forward navigation)\n• Memory management in programming languages' },
      { type: 'heading', content: 'Implementation' },
      { type: 'text', content: 'A stack can be implemented using arrays or linked lists. In most programming languages, the built-in list or vector type provides stack-like operations.' },
      { type: 'example', content: '// Stack implementation using an array\nclass Stack {\n  private items: number[] = [];\n\n  push(item: number) {\n    this.items.push(item);\n  }\n\n  pop(): number | undefined {\n    return this.items.pop();\n  }\n\n  peek(): number | undefined {\n    return this.items[this.items.length - 1];\n  }\n\n  isEmpty(): boolean {\n    return this.items.length === 0;\n  }\n}' },
    ],
  },
  'math-ch3-t4': {
    id: 'lesson-integration',
    topicId: 'math-ch3-t4',
    title: 'Integration',
    estimatedMinutes: 20,
    content: [
      { type: 'text', content: 'Integration is the reverse process of differentiation. It is used to find areas, volumes, central points, and many other useful things.' },
      { type: 'heading', content: 'Key Concept: Indefinite Integral' },
      { type: 'key-concept', content: 'The indefinite integral of f(x) is written as ∫f(x)dx = F(x) + C, where F\'(x) = f(x) and C is the constant of integration.' },
      { type: 'heading', content: 'Basic Integration Rules' },
      { type: 'example', content: '∫xⁿ dx = xⁿ⁺¹/(n+1) + C  (for n ≠ -1)\n∫1/x dx = ln|x| + C\n∫eˣ dx = eˣ + C\n∫sin(x) dx = -cos(x) + C\n∫cos(x) dx = sin(x) + C' },
      { type: 'heading', content: 'Definite Integrals' },
      { type: 'text', content: 'A definite integral computes the net area between a function and the x-axis over an interval [a, b].' },
      { type: 'key-concept', content: 'The Fundamental Theorem of Calculus: ∫ₐᵇ f(x)dx = F(b) - F(a), where F is any antiderivative of f.' },
      { type: 'note', content: 'Integration is one of the most tested topics in board exams. Practice at least 20 problems from each method: substitution, by parts, and partial fractions.' },
    ],
  },
  'physics-ch3-t2': {
    id: 'lesson-newton2',
    topicId: 'physics-ch3-t2',
    title: "Newton's Second Law",
    estimatedMinutes: 18,
    content: [
      { type: 'text', content: "Newton's Second Law of Motion describes the relationship between an object's mass, its acceleration, and the applied force." },
      { type: 'heading', content: 'Key Concept: F = ma' },
      { type: 'key-concept', content: 'The rate of change of momentum of a body is directly proportional to the applied force and takes place in the direction in which the force acts. Simplified: F = ma (Force = mass × acceleration).' },
      { type: 'heading', content: 'Understanding the Law' },
      { type: 'text', content: 'This law tells us that the acceleration of an object depends on two variables: the net force acting upon the object and the mass of the object.' },
      { type: 'example', content: 'Example: A force of 10 N is applied to a 2 kg object.\n\nF = ma\n10 = 2 × a\na = 5 m/s²\n\nThe object accelerates at 5 m/s² in the direction of the force.' },
      { type: 'heading', content: 'Important Points' },
      { type: 'note', content: '• Force and acceleration are vectors (have direction)\n• The net force is the vector sum of all forces\n• If net force is zero, acceleration is zero (Newton\'s First Law)\n• Unit of force: Newton (N) = kg·m/s²' },
    ],
  },
};

// ============================================================
// Questions
// ============================================================
export const mockQuestions: Question[] = [
  // CS - Data Structures
  { id: 'q1', subjectId: 'cs', chapterId: 'cs-ch3', topicId: 'cs-ch3-t2', type: 'mcq', question: 'Which data structure follows the LIFO principle?', options: ['Queue', 'Stack', 'Array', 'Tree'], correctAnswer: 1, explanation: 'A stack follows Last In, First Out (LIFO) principle where the last element added is the first to be removed.', marks: 1, difficulty: 'easy' },
  { id: 'q2', subjectId: 'cs', chapterId: 'cs-ch3', topicId: 'cs-ch3-t2', type: 'mcq', question: 'What operation adds an element to a stack?', options: ['enqueue', 'push', 'insert', 'append'], correctAnswer: 1, explanation: 'The push operation adds an element to the top of the stack.', marks: 1, difficulty: 'easy' },
  { id: 'q3', subjectId: 'cs', chapterId: 'cs-ch3', topicId: 'cs-ch3-t1', type: 'mcq', question: 'What is the time complexity of accessing an element in an array by index?', options: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'], correctAnswer: 2, explanation: 'Array access by index is O(1) because elements are stored in contiguous memory locations.', marks: 1, difficulty: 'easy' },
  { id: 'q4', subjectId: 'cs', chapterId: 'cs-ch3', topicId: 'cs-ch3-t3', type: 'mcq', question: 'Which data structure follows the FIFO principle?', options: ['Stack', 'Queue', 'Tree', 'Graph'], correctAnswer: 1, explanation: 'A queue follows First In, First Out (FIFO) principle.', marks: 1, difficulty: 'easy' },
  { id: 'q5', subjectId: 'cs', chapterId: 'cs-ch3', topicId: 'cs-ch3-t4', type: 'mcq', question: 'What does each node in a linked list contain?', options: ['Only data', 'Only pointer', 'Data and pointer to next node', 'Data and pointer to previous node'], correctAnswer: 2, explanation: 'Each node in a singly linked list contains data and a pointer to the next node.', marks: 1, difficulty: 'medium' },
  { id: 'q6', subjectId: 'cs', chapterId: 'cs-ch3', topicId: 'cs-ch3-t2', type: 'mcq', question: 'What happens when you try to pop from an empty stack?', options: ['Returns null', 'Returns 0', 'Underflow error', 'Returns -1'], correctAnswer: 2, explanation: 'Popping from an empty stack causes an underflow condition.', marks: 1, difficulty: 'medium' },
  { id: 'q7', subjectId: 'cs', chapterId: 'cs-ch3', topicId: 'cs-ch3-t2', type: 'mcq', question: 'Which of these is NOT a stack application?', options: ['Function call management', 'Undo operations', 'Scheduling processes', 'Expression evaluation'], correctAnswer: 2, explanation: 'Process scheduling typically uses queues, not stacks.', marks: 1, difficulty: 'medium' },
  { id: 'q8', subjectId: 'cs', chapterId: 'cs-ch3', topicId: 'cs-ch3-t5', type: 'mcq', question: 'What is the maximum number of children a node can have in a binary tree?', options: ['1', '2', '3', 'Unlimited'], correctAnswer: 1, explanation: 'In a binary tree, each node can have at most 2 children.', marks: 1, difficulty: 'easy' },
  { id: 'q9', subjectId: 'cs', chapterId: 'cs-ch3', topicId: 'cs-ch3-t1', type: 'mcq', question: 'What is the worst-case time complexity of searching in an unsorted array?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'], correctAnswer: 2, explanation: 'In the worst case, we need to check every element in an unsorted array.', marks: 1, difficulty: 'medium' },
  { id: 'q10', subjectId: 'cs', chapterId: 'cs-ch3', topicId: 'cs-ch3-t2', type: 'short', question: 'Explain the difference between stack and queue with one example each.', options: [], correctAnswer: 'Stack follows LIFO (e.g., undo operation), Queue follows FIFO (e.g., print queue)', marks: 3, difficulty: 'medium' },

  // Math
  { id: 'q11', subjectId: 'math', chapterId: 'math-ch3', topicId: 'math-ch3-t4', type: 'mcq', question: 'What is ∫x² dx?', options: ['x³ + C', 'x³/3 + C', '2x + C', '3x² + C'], correctAnswer: 1, explanation: 'Using the power rule: ∫xⁿ dx = xⁿ⁺¹/(n+1) + C, so ∫x² dx = x³/3 + C.', marks: 1, difficulty: 'easy' },
  { id: 'q12', subjectId: 'math', chapterId: 'math-ch3', topicId: 'math-ch3-t4', type: 'mcq', question: 'What is ∫sin(x) dx?', options: ['cos(x) + C', '-cos(x) + C', 'sin(x) + C', '-sin(x) + C'], correctAnswer: 1, explanation: 'The integral of sin(x) is -cos(x) + C.', marks: 1, difficulty: 'easy' },
  { id: 'q13', subjectId: 'math', chapterId: 'math-ch3', topicId: 'math-ch3-t3', type: 'mcq', question: 'What is the derivative of ln(x)?', options: ['x', '1/x', 'ln(x)/x', 'eˣ'], correctAnswer: 1, explanation: 'The derivative of ln(x) is 1/x.', marks: 1, difficulty: 'easy' },
  { id: 'q14', subjectId: 'math', chapterId: 'math-ch3', topicId: 'math-ch3-t1', type: 'mcq', question: 'What is lim(x→0) sin(x)/x?', options: ['0', '1', '∞', 'Does not exist'], correctAnswer: 1, explanation: 'This is a fundamental limit: lim(x→0) sin(x)/x = 1.', marks: 1, difficulty: 'medium' },
  { id: 'q15', subjectId: 'math', chapterId: 'math-ch3', topicId: 'math-ch3-t4', type: 'mcq', question: 'What is ∫eˣ dx?', options: ['xeˣ + C', 'eˣ + C', 'eˣ/x + C', 'eˣ⁺¹ + C'], correctAnswer: 1, explanation: 'The integral of eˣ is eˣ + C. The exponential function is its own antiderivative.', marks: 1, difficulty: 'easy' },

  // Physics
  { id: 'q16', subjectId: 'physics', chapterId: 'physics-ch3', topicId: 'physics-ch3-t2', type: 'mcq', question: 'A force of 20 N acts on a 4 kg mass. What is the acceleration?', options: ['2 m/s²', '5 m/s²', '80 m/s²', '0.2 m/s²'], correctAnswer: 1, explanation: 'Using F = ma: a = F/m = 20/4 = 5 m/s².', marks: 1, difficulty: 'easy' },
  { id: 'q17', subjectId: 'physics', chapterId: 'physics-ch3', topicId: 'physics-ch3-t1', type: 'mcq', question: "Newton's First Law is also known as the law of:", options: ['Acceleration', 'Inertia', 'Action-Reaction', 'Gravitation'], correctAnswer: 1, explanation: "Newton's First Law is called the Law of Inertia.", marks: 1, difficulty: 'easy' },
  { id: 'q18', subjectId: 'physics', chapterId: 'physics-ch3', topicId: 'physics-ch3-t3', type: 'mcq', question: "According to Newton's Third Law, action and reaction forces:", options: ['Act on the same body', 'Act on different bodies', 'Are unequal', 'Cancel each other'], correctAnswer: 1, explanation: 'Action and reaction forces always act on different bodies, so they never cancel each other.', marks: 1, difficulty: 'medium' },
  { id: 'q19', subjectId: 'physics', chapterId: 'physics-ch3', topicId: 'physics-ch3-t2', type: 'mcq', question: 'What is the SI unit of force?', options: ['Joule', 'Watt', 'Newton', 'Pascal'], correctAnswer: 2, explanation: 'The SI unit of force is Newton (N) = kg⋅m/s².', marks: 1, difficulty: 'easy' },
  { id: 'q20', subjectId: 'physics', chapterId: 'physics-ch3', topicId: 'physics-ch3-t2', type: 'mcq', question: 'If net force on an object is zero, the object:', options: ['Must be at rest', 'Must be accelerating', 'Has zero velocity', 'Has zero acceleration'], correctAnswer: 3, explanation: 'If net force is zero, by F=ma, acceleration is zero. The object could be at rest or moving with constant velocity.', marks: 1, difficulty: 'medium' },
];

// ============================================================
// Activities
// ============================================================
export const mockActivities: Activity[] = [
  { id: 'a1', type: 'lesson_completed', title: 'Completed Stacks lesson', description: 'Computer Science — Data Structures', subjectId: 'cs', timestamp: '2025-06-15T14:30:00Z' },
  { id: 'a2', type: 'quiz_completed', title: 'Scored 8/10 in Physics practice', description: "Newton's Laws — MCQ Set", subjectId: 'physics', timestamp: '2025-06-15T10:00:00Z' },
  { id: 'a3', type: 'bookmark_added', title: 'Bookmarked Integration notes', description: 'Mathematics — Calculus', subjectId: 'math', timestamp: '2025-06-14T18:00:00Z' },
  { id: 'a4', type: 'lesson_completed', title: 'Completed Newton\'s First Law', description: 'Physics — Laws of Motion', subjectId: 'physics', timestamp: '2025-06-14T15:00:00Z' },
  { id: 'a5', type: 'quiz_completed', title: 'Scored 12/15 in Math practice', description: 'Calculus — Integration', subjectId: 'math', timestamp: '2025-06-13T16:00:00Z' },
  { id: 'a6', type: 'study_session', title: 'Study session: 45 minutes', description: 'Computer Science — Data Structures', subjectId: 'cs', timestamp: '2025-06-13T09:00:00Z' },
];

// ============================================================
// Weak Topics
// ============================================================
export const mockWeakTopics: WeakTopic[] = [
  { topicId: 'physics-ch3-t2', subjectId: 'physics', subjectName: 'Physics', topicName: "Newton's Second Law", chapterName: "Newton's Laws of Motion", score: 45, recommendation: 'revision' },
  { topicId: 'math-ch3-t4', subjectId: 'math', subjectName: 'Mathematics', topicName: 'Integration', chapterName: 'Calculus', score: 52, recommendation: 'practice' },
  { topicId: 'cs-ch3-t4', subjectId: 'cs', subjectName: 'Computer Science', topicName: 'Linked Lists', chapterName: 'Data Structures', score: 0, recommendation: 'continue' },
  { topicId: 'cs-ch4-t3', subjectId: 'cs', subjectName: 'Computer Science', topicName: 'Recursion', chapterName: 'Algorithms', score: 30, recommendation: 'revision' },
];

// ============================================================
// Study Plan
// ============================================================
export const mockStudyPlan: StudyPlan = {
  id: 'plan-today',
  userId: 'user-1',
  date: new Date().toISOString().split('T')[0],
  sessions: [
    { id: 's1', subjectId: 'math', chapterId: 'math-ch3', topicId: 'math-ch3-t4', date: new Date().toISOString().split('T')[0], startTime: '09:00', duration: 45, completed: false },
    { id: 's2', subjectId: 'physics', chapterId: 'physics-ch3', topicId: 'physics-ch3-t2', date: new Date().toISOString().split('T')[0], startTime: '10:00', duration: 30, completed: false },
    { id: 's3', subjectId: 'cs', chapterId: 'cs-ch3', topicId: 'cs-ch3-t4', date: new Date().toISOString().split('T')[0], startTime: '18:00', duration: 45, completed: false },
  ],
};

// ============================================================
// Exam Configs
// ============================================================
export const mockExamConfigs: ExamConfig[] = [
  { id: 'exam-cs-1', title: 'Computer Science — Full Mock', subjectId: 'cs', duration: 120, totalQuestions: 20, totalMarks: 40, questions: mockQuestions.filter(q => q.subjectId === 'cs').map(q => q.id) },
  { id: 'exam-math-1', title: 'Mathematics — Full Mock', subjectId: 'math', duration: 180, totalQuestions: 25, totalMarks: 50, questions: mockQuestions.filter(q => q.subjectId === 'math').map(q => q.id) },
  { id: 'exam-physics-1', title: 'Physics — Full Mock', subjectId: 'physics', duration: 120, totalQuestions: 20, totalMarks: 40, questions: mockQuestions.filter(q => q.subjectId === 'physics').map(q => q.id) },
];

// ============================================================
// Helper functions
// ============================================================
export function getSubjectById(id: string): Subject | undefined {
  return mockSubjects.find(s => s.id === id);
}

export function getChaptersBySubject(subjectId: string): Chapter[] {
  return mockChapters.filter(c => c.subjectId === subjectId).sort((a, b) => a.order - b.order);
}

export function getChapterById(id: string): Chapter | undefined {
  return mockChapters.find(c => c.id === id);
}

export function getTopicsByChapter(chapterId: string): Topic[] {
  return mockTopics.filter(t => t.chapterId === chapterId).sort((a, b) => a.order - b.order);
}

export function getTopicById(id: string): Topic | undefined {
  return mockTopics.find(t => t.id === id);
}

export function getLessonByTopic(topicId: string): Lesson | undefined {
  return mockLessons[topicId];
}

export function getQuestionsByTopic(topicId: string): Question[] {
  return mockQuestions.filter(q => q.topicId === topicId);
}

export function getQuestionsBySubject(subjectId: string): Question[] {
  return mockQuestions.filter(q => q.subjectId === subjectId);
}

export function getQuestionsByChapter(chapterId: string): Question[] {
  return mockQuestions.filter(q => q.chapterId === chapterId);
}

export function getSubjectName(subjectId: string): string {
  return mockSubjects.find(s => s.id === subjectId)?.name ?? 'Unknown';
}
