import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { FaTrash } from 'react-icons/fa';

function App() {
  // Initialize state from localStorage
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  });
  const [showFinished, setShowFinished] = useState(true)

  // Save to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleEdit = (e, id) => {
    const arr = todos.filter((i) => i.id === id);
    setTodo(arr[0].todo);
    handleDelete(id);
  };

  const handleDelete = (id) => {
    const newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
  };

  const toggleFinished = () => {
    setShowFinished(!showFinished)
    console.log(showFinished);
  }

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleAdd = () => {
    setTodos([
      ...todos,
      {
        id: uuidv4(),
        todo,
        isCompleted: false,
      },
    ]);
    setTodo('');
  };

  const handleCheckBox = (e) => {
    const id = e.target.name; // Assuming name holds the ID of the todo item
    const newTodos = todos.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    setTodos(newTodos);
  };

  return (
    <>
      <Navbar />
      <div className="w-1/2 min-h-[80vh]  mx-auto my-5 rounded-xl p-5 bg-violet-100 ">
      <h1 className='text-xl  font-bold text-center my-2 mb-6' >iTask - Manage your todos at one place</h1>
        <div className="addTodo flex flex-col items-center justify-center">
          <h2 className="text-lg font-bold">Add a Todo</h2>
          <div className='w-[100%] flex items-center justify-center'>
          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="w-[70%] p-3 py-1 my-2 text-black rounded-lg"
            />
          <button
            onClick={handleAdd}
            disabled={todo.length <= 3}
            className="bg-violet-800 disabled:bg-violet-500 hover:bg-violet-950 p-3 py-1 text-white rounded-md mx-6"
            >
            Save
          </button>
          </div>
        </div>
          <input type="checkbox" className=' ml-24 my-3' checked={showFinished} onChange={toggleFinished} name="" id="" /> Show Finished
        <h2 className="text-lg font-bold ml-24">Your Todos</h2>
        <div className="todos flex items-center justify-center flex-col">
          {todos.length === 0 && <div className="m-5">No Todos to display</div>}
          {todos.map((item, index) => ((showFinished || item.isCompleted == false) && <div
              className="todo flex w-[70%] justify-between my-2"
              key={index}
            >
              <div className="flex items-center gap-4">
                <input
                  onChange={handleCheckBox}
                  type="checkbox"
                  checked={item.isCompleted}
                  name={item.id}
                  id=""
                />
                <div
                  className={
                    item.isCompleted ? 'line-through text-red-600' : ''
                  }
                >
                  {item.todo}
                </div>
              </div>
              <div className="buttons">
                <button
                  className="bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded-md mx-1"
                  onClick={(e) => handleEdit(e, item.id)}
                >
                  <FaEdit/>
                </button>
                <button
                  className="bg-violet-800 hover:bg-violet-950 p-3 py-1 text-white rounded-md mx-1"
                  onClick={() => handleDelete(item.id)}
                >
                  <FaTrash/>
                </button>
              </div>
            </div>)
            
          )}
        </div>
      </div>
    </>
  );
}

export default App;
