import { useState, useContext } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {globalContext} from './App'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

// Mock student data


const burgers = [
    { id: 1, name: 'Classic Burger', type: 'Beef', size: 'Large', price: '$9.99', description: 'A juicy beef patty with lettuce, tomato, and cheese.', ingredients: ['Beef Patty', 'Lettuce', 'Tomato', 'Cheese', 'Pickles', 'Onions'] },
    { id: 2, name: 'Veggie Burger', type: 'Vegetarian', size: 'Medium', price: '$8.99', description: 'A flavorful veggie patty with fresh vegetables.', ingredients: ['Veggie Patty', 'Lettuce', 'Tomato', 'Avocado', 'Onions'] },
    { id: 3, name: 'Chicken Burger', type: 'Chicken', size: 'Large', price: '$10.99', description: 'Grilled chicken with mayo and pickles.', ingredients: ['Chicken Patty', 'Mayo', 'Pickles', 'Lettuce', 'Tomato'] },
    // Add more burgers as needed
  ]

export default function Component() {

    const {theme, changeTheme}= useContext(globalContext)!

  const [view, setView] = useState('grid')
  let [selectedBurger, setSelectedBurger] = useState<any>(null)


  const renderGridView = () => (
    <div className="overflow-x-auto">
    <table className="w-full border-collapse text-xs">
      <thead>
        <tr className="bg-muted">
          <th className="px-1 text-left">Name</th>
          <th className="px-1 text-left">Type</th>
          <th className="px-1 text-left">Size</th>
          <th className="px-1 text-left">Price</th>
          <th className="px-1 text-left">Description</th>
          <th className="px-1 text-left">Ingredients</th>
          <th className="px-1 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {burgers.map((burger) => (
          <tr key={burger.id} className="border-b">
            <td>{burger.name}</td>
            <td>{burger.type}</td>
            <td>{burger.size}</td>
            <td>{burger.price}</td>
            <td className='text-[10px] italic'>{burger.description}</td>
            <td>{burger.ingredients.join(', ')}</td>
            <td>
              <Button variant="ghost" size="sm" onClick={() => setSelectedBurger(burger)}>View</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  )

  const renderTileView = () => (
    <div className="grid grid-cols-1 know:grid-cols-2 md:grid-cols-3 gap-4">
       {burgers.map((burger) => (
        <Card key={burger.id} className="cursor-pointer" onClick={() => setSelectedBurger(burger)}>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold">{burger.name}</h3>
                <p className="text-sm text-muted-foreground">{burger.type}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <i className='bx bx-dots-vertical-rounded'></i>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Flag</DropdownMenuItem>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="mt-2">
              <p>Price: {burger.price}</p>
              <p>Description: {burger.description}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  const renderDetailView = () => (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="p-6">
        <Button variant="ghost" onClick={() => setSelectedBurger(null)} className="mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back to {view} view
        </Button>
        <h2 className="text-2xl font-bold mb-4">{selectedBurger.name}</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p><strong>Type:</strong> {selectedBurger.type}</p>
            <p><strong>Size:</strong> {selectedBurger.size}</p>
            <p><strong>Price:</strong> {selectedBurger.price}</p>
            <p><strong>Description:</strong> {selectedBurger.description}</p>
          </div>
          <div>
            <p><strong>Ingredients:</strong> {selectedBurger.ingredients.join(', ')}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className=' text-light dark:text-dark w-[90vw] '>
      <header className=" z-50 text-light dark:text-dark border-b-2 rounded-r-md dark:bg-slate-900 bg-light ">
        <div className="container  flex h-14 items-center justify-between ">
          <Sheet   >
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
              <i className='bx bx-menu bx-sm'></i>
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
                <SheetDescription>
                  Navigation options
                </SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-4">
                <Button variant="ghost" className="justify-start">Type</Button>
                <Button variant="ghost" className="justify-start">Size</Button>
                <Button variant="ghost" className="justify-start">Price</Button>
                <Button variant="ghost" className="justify-start">Description</Button>
              </nav>
            </SheetContent>
          </Sheet>
          <nav className="flex items-center space-x-4 lg:space-x-6 mx-6  max-md:hidden">
            <Button variant="ghost">Type</Button>
            <Button variant="ghost">Size</Button>
            <Button variant="ghost">Price</Button>
            <Button variant="ghost">Description</Button>
          </nav>
          <div className="ml-auto flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setView(view === 'grid' ? 'tile' : 'grid')}
            >
              {view === 'grid' ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <line x1="8" y1="6" x2="21" y2="6" />
                  <line x1="8" y1="12" x2="21" y2="12" />
                  <line x1="8" y1="18" x2="21" y2="18" />
                  <line x1="3" y1="6" x2="3.01" y2="6" />
                  <line x1="3" y1="12" x2="3.01" y2="12" />
                  <line x1="3" y1="18" x2="3.01" y2="18" />
                </svg>
              )}
            </Button>
          </div>
        </div>
      </header>
  
      <div className="w-full flex items-center justify-end pt-2 pr-2">
  <label className="relative inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      checked={theme === "dark"}
      onChange={changeTheme}
      className="sr-only peer"
    />
<div className="mr-2 w-9 h-5 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-400 dark:peer-focus:ring-gray-600 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[-3px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-800"></div>

{theme} mode
  </label>
</div>

      <main className="container py-6">
        {selectedBurger ? (
          renderDetailView()
        ) : (
          view === 'grid' ? renderGridView() : renderTileView()
        )}
      </main>
    </div>
  )
}