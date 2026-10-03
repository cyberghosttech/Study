import type { AIMessage, AIContext } from '../types';

// ============================================================
// AI Provider Interface
// Can be replaced with real provider (OpenAI, Anthropic, etc.)
// ============================================================

export interface AIProvider {
  sendMessage(context: AIContext, message: string): Promise<string>;
  quickAction(context: AIContext, action: string): Promise<string>;
}

// ============================================================
// Mock AI Provider
// Returns realistic responses for demo purposes
// ============================================================

const mockResponses: Record<string, string> = {
  'explain-simply': 'Let me explain this in simple terms.\n\nThink of a stack like a pile of books on your desk. When you add a new book, you place it on top. When you want to read a book, you take the one from the top. You can\'t easily get to the books in the middle without removing the ones above them first.\n\nThat\'s exactly how a stack works in computer science — you can only add or remove items from the top (called "push" and "pop").',
  'smart-text': '**Smart Text Summary: Stacks**\n\n**What is it?**\nA stack is a fundamental data structure in computer science that organizes data in a specific order.\n\n**How does it work?**\nIt follows the LIFO (Last In, First Out) principle. Imagine stacking plates — you always add to the top and take from the top.\n\n**Key Operations:**\n• push() — Add to top [O(1)]\n• pop() — Remove from top [O(1)]\n• peek() — View top without removing [O(1)]\n• isEmpty() — Check if empty [O(1)]\n\n**Where is it used?**\n1. Browser back button\n2. Undo/Redo in editors\n3. Function calls (call stack)\n4. Expression evaluation\n\n**Common Interview Question:**\n"Implement a stack using two queues" or "Check balanced parentheses using a stack."\n\n**Remember:** The key insight is that you can ONLY access the top element. Everything else is hidden until you remove what\'s above it.',
  'give-example': 'Here\'s a practical example:\n\nImagine you\'re using the "Back" button in your browser:\n\n1. You visit google.com → Stack: [google.com]\n2. You visit youtube.com → Stack: [google.com, youtube.com]\n3. You visit github.com → Stack: [google.com, youtube.com, github.com]\n4. You click "Back" → pops github.com → Stack: [google.com, youtube.com]\n\nThe most recently visited page is always the first one you go back to. That\'s LIFO in action!',
  'quiz-me': 'Great! Let me quiz you on Stacks:\n\n**Question 1:** What does LIFO stand for?\n\n**Question 2:** Which operation adds an element to a stack?\n\n**Question 3:** What happens when you try to pop from an empty stack?\n\n**Question 4:** Name two real-world applications of stacks.\n\nTake your time and answer when ready! I\'ll check your answers.',
  'summarize': '**Stacks — Quick Summary**\n\n• **Type:** Linear data structure\n• **Principle:** LIFO (Last In, First Out)\n• **Key Operations:** push(), pop(), peek(), isEmpty()\n• **Time Complexity:** O(1) for all operations\n• **Applications:** Function calls, undo/redo, expression evaluation, browser history\n• **Implementation:** Can use arrays or linked lists\n\n**Remember:** The last element added is the first to be removed — like a stack of plates!',
  'explain-difficult': '**Key Terms Explained Simply:**\n\n• **LIFO** — Last In, First Out. The newest item is removed first.\n\n• **Push** — Adding something to the top of the stack.\n\n• **Pop** — Removing the top item from the stack.\n\n• **Peek/Top** — Looking at the top item without removing it.\n\n• **Underflow** — Error when trying to pop from an empty stack.\n\n• **Overflow** — Error when trying to push to a full stack (array implementation).\n\n• **Call Stack** — How programs remember which function called which.',
  'board-questions': '**Board Exam Style Questions on Stacks:**\n\n**Q1 (2 marks):** Define stack. State the principle it follows.\n\n**Q2 (3 marks):** Differentiate between stack and queue with suitable examples.\n\n**Q3 (4 marks):** Write an algorithm to check if parentheses are balanced using a stack.\n\n**Q4 (5 marks):** Explain the implementation of stack using arrays. Include push and pop operations with their time complexities.\n\n**Q5 (3 marks):** Convert the infix expression (A + B) * C to postfix notation using a stack.',
};

export class MockAIProvider implements AIProvider {
  async sendMessage(_context: AIContext, message: string): Promise<string> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1200));

    const lowerMessage = message.toLowerCase();

    if (lowerMessage.includes('explain') && lowerMessage.includes('simple')) {
      return mockResponses['explain-simply'];
    }
    if (lowerMessage.includes('example')) {
      return mockResponses['give-example'];
    }
    if (lowerMessage.includes('quiz') || lowerMessage.includes('test')) {
      return mockResponses['quiz-me'];
    }
    if (lowerMessage.includes('summar')) {
      return mockResponses['summarize'];
    }
    if (lowerMessage.includes('difficult') || lowerMessage.includes('term')) {
      return mockResponses['explain-difficult'];
    }
    if (lowerMessage.includes('board') || lowerMessage.includes('exam')) {
      return mockResponses['board-questions'];
    }

    return `That's a great question about ${_context.topic}!\n\nBased on what you're studying in ${_context.subject} — ${_context.chapter}, here's what I can tell you:\n\nThis is an important concept that builds on the fundamentals we've covered. The key thing to understand is how this connects to the broader topic of data structures.\n\nWould you like me to:\n• Explain this more simply?\n• Give you a practical example?\n• Quiz you on this topic?\n• Provide board-style questions?\n\nJust let me know how I can help!`;
  }

  async quickAction(context: AIContext, action: string): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 600 + Math.random() * 800));
    return mockResponses[action] || `Here's information about ${action} for ${context.topic}.`;
  }
}

// Singleton instance
export const aiProvider = new MockAIProvider();
