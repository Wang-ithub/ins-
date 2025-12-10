import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Plus, Trash2, Bell, Calendar } from 'lucide-react';
import { TodoItem } from '../types';

// Fix for framer-motion type errors
const MotionDiv = motion.div as any;
const MotionButton = motion.button as any;

const TodoWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [todos, setTodos] = useState<TodoItem[]>(() => {
    const saved = localStorage.getItem('ins-todos');
    return saved ? JSON.parse(saved) : [];
  });
  const [newTodo, setNewTodo] = useState('');
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    localStorage.setItem('ins-todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    
    setTodos([...todos, {
      id: Date.now().toString(),
      text: newTodo,
      completed: false,
      createdAt: Date.now()
    }]);
    setNewTodo('');
    
    // Show notification
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const hour = new Date().getHours();
  const isNight = hour < 6 || hour > 18;
  const buttonColor = isNight ? 'bg-indigo-600' : 'bg-orange-400';

  return (
    <>
      {/* Floating Action Button */}
      <MotionButton
        layout
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`fixed bottom-8 right-8 w-16 h-16 rounded-full ${buttonColor} text-white shadow-xl shadow-indigo-500/30 flex items-center justify-center z-40 transition-colors duration-500`}
      >
        <Calendar size={28} />
      </MotionButton>

      {/* Slide-over Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            <MotionDiv
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            />
            <MotionDiv
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 20 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white/90 backdrop-blur-xl shadow-2xl z-50 p-8 border-l border-white/50"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-800">
                <span className="p-2 bg-purple-100 rounded-lg text-purple-600"><CheckCircle size={20}/></span>
                My Tasks
              </h2>

              <form onSubmit={addTodo} className="mb-8 relative">
                <input
                  type="text"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  placeholder="Add a task for today..."
                  className="w-full bg-gray-100 rounded-xl py-3 pl-4 pr-12 outline-none focus:ring-2 focus:ring-purple-400"
                />
                <button 
                  type="submit"
                  className="absolute right-2 top-2 p-1.5 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                >
                  <Plus size={18} />
                </button>
              </form>

              <div className="space-y-3 overflow-y-auto max-h-[70vh] pr-2">
                {todos.length === 0 && (
                  <p className="text-center text-gray-400 mt-10">No tasks yet. Enjoy your day!</p>
                )}
                {todos.map(todo => (
                  <MotionDiv
                    key={todo.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className={`flex items-center gap-3 p-4 rounded-xl transition-colors ${
                      todo.completed ? 'bg-gray-50' : 'bg-white shadow-sm border border-gray-100'
                    }`}
                  >
                    <button
                      onClick={() => toggleTodo(todo.id)}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                        todo.completed ? 'bg-green-500 border-green-500' : 'border-gray-300 hover:border-purple-400'
                      }`}
                    >
                      {todo.completed && <CheckCircle size={14} className="text-white" />}
                    </button>
                    <span className={`flex-1 ${todo.completed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                      {todo.text}
                    </span>
                    <button 
                      onClick={() => deleteTodo(todo.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </MotionDiv>
                ))}
              </div>
            </MotionDiv>
          </>
        )}
      </AnimatePresence>

      {/* Notification Toast */}
      <AnimatePresence>
        {showNotification && (
          <MotionDiv
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white rounded-full px-6 py-3 shadow-2xl flex items-center gap-3 z-50 border border-purple-100"
          >
            <div className="bg-purple-100 p-1.5 rounded-full">
              <Bell size={16} className="text-purple-600" />
            </div>
            <span className="text-gray-700 font-medium">Reminder set successfully!</span>
          </MotionDiv>
        )}
      </AnimatePresence>
    </>
  );
};

export default TodoWidget;