import {BiSearch, BiCaretDown, BiCheck} from 'react-icons/bi';
import { useState } from 'react';

const DropDown = ({toggle, sortBy, onSortByChange, orderBy, onOrderByChange}) => {

    if(!toggle) {
        return null;
    }
    return (
        <div className='origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5'>
            <div className='py-1' role="menu" aria-orientation='vertical' aria-labelledby='opitons-menu'>
                <div onClick={() => onSortByChange("petName")}
                className='px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer'
                role="menuitem">Pet Name  {(sortBy === "petName") &&<BiCheck />}
                </div>
                <div onClick={() => onSortByChange("ownerName")}
                className='px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer'
                role="menuitem">Owner Name {(sortBy === "ownerName") &&<BiCheck />}
                </div>
                <div onClick={() => onSortByChange("aptDate")}
                className='px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer'
                role="menuitem">Date  {(sortBy === "aptDate") &&<BiCheck />}
                </div>
                <div onClick={() => onOrderByChange("asc")}
                className='px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer border-gray-1 border-t-2'
                role="menuitem">Asc  {(orderBy === "asc") &&<BiCheck />}
                </div>
                <div onClick={() => onOrderByChange("desc")}
                className='px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between cursor-pointer'
                role="menuitem">Desc  {(orderBy === "desc") &&<BiCheck />}
                </div>
            </div>
        </div>
    )
}

const Search = ({query, onQueryChange, sortBy, onSortByChange, orderBy, onOrderByChange}) => {

    const [toggleSort, setToggleSort] = useState(false);

    return (
        <div className='py-5 flex'>
            <div className='inline-block mt-1 relative rounded-md shadow w-full h-fit'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <BiSearch className='text-gray-900' />
                    <label htmlFor='query' className='sr-only'/>
                </div>
                <input type="text" name='query' value={query} onChange={(event) => {onQueryChange(event.target.value)}}
                className='py-2 pl-8 rounded-md focus:ring-indigo-500 focus:border-indigo-500 block sm:text-sm border-gray-300 align-text-bottom w-full' placeholder='Search' />
                
            </div>
            <div className='inline-block relative mt-1 pl-2 right-0 flex items-center'>
                <div>
                    <button type="button" onClick={() => {setToggleSort(!toggleSort)}} className='justify-center px-2 py-2 bg-blue-400 border-blue-400 text-sm text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 flex items-center rounded-md w-max h-fit' id='options-menu' aria-haspopup="true" aria-expanded="true">
                    Sort By <BiCaretDown className='ml-1' />
                    </button>
                    <DropDown toggle={toggleSort} 
                    sortBy={sortBy} 
                    onSortByChange={mySort => onSortByChange(mySort)} 
                    orderBy={orderBy} 
                    onOrderByChange={myOrder => onOrderByChange(myOrder)}
                    />
                </div>
            </div>
        </div>
    )
}

export default Search;