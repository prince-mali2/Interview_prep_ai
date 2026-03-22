import React, { useContext } from 'react'
import ProfileInfoCard from '../Cards/ProfileInfoCard'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../../context/themeContext'
import { MdDarkMode, MdLightMode } from 'react-icons/md'

const Navbar = () => {
  const { isDark, toggleTheme } = useContext(ThemeContext)

  return (
    <div className="h-16 bg-white dark:bg-gray-900 border border-b border-gray-200/50 dark:border-gray-700/50 backdrop-blur-[2px] py-2.5 px-4 md:px-0 sticky top-0 z-30">
      <div className="container mx-auto flex items-center justify-between gap-5">
        <Link to="/">
        <h2 className="text-lg md:text-xl font-medium text-black dark:text-white leading-5">
          Interview Prep AI
        </h2>
        </Link>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDark ? (
              <MdLightMode className="w-5 h-5" />
            ) : (
              <MdDarkMode className="w-5 h-5" />
            )}
          </button>
          <ProfileInfoCard/>
        </div>
      </div>
    </div>
  )
}

export default Navbar