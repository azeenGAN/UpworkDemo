import Board from './Board.tsx'
import { useState,useEffect,createContext } from 'react'; 


interface GlobalContextType {
  theme: string;
  changeTheme: () => void;
}

export const globalContext = createContext<GlobalContextType | undefined>(undefined);

function App() {
  
  
  const [theme, setTheme]=useState("light")

  const changeTheme=()=>{
    setTheme(theme === "light" ? "dark" : "light")
  }

  useEffect(() => {
    const root = document.documentElement;
  
    if(theme === "dark")
      root.classList.add("dark")
    else root.classList.remove("dark");
  
  }, [theme]);


  return (
    <>
        <globalContext.Provider value={{theme, changeTheme}}>

    <div className=' h-screen w-screen bg-light dark:bg-dark ' >
      <div className='pt-10'>
      <Board/>
      </div>      
      </div>
      </globalContext.Provider>
    </>
  )
}

export default App
