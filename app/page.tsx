'use client';

import Header from '@/components/Header';
import { fetchChars } from '@/utils';
import { useState, useEffect } from 'react';

export default function Home() {
  const [chars, setChars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('id');
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      const data = await fetchChars();
      setChars(data.results);
      setLoading(false);
    };

    fetchCharacters();
  }, []);

  const sortedChars = [...chars].sort((a: any, b: any) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    }
    return a.id - b.id;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentChars = sortedChars.slice(indexOfFirstItem, indexOfLastItem);

  const handleNext = () => {
    if (indexOfLastItem < chars.length) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  return (
    <main className="bg-[#D3FFE6] w-full min-h-screen">
      <div className="mx-auto w-[1400px] max-h-[1024px]">
        <Header sortBy={sortBy} onSortChange={handleSortChange} />

        <div className="mx-auto mt-4 min-h-[600px]">
          {loading ? (
            <div className="flex grid-cols-3 gap-4 mx-12 min-h-[600px] justify-center items-center">
              <p className="text-lg font-semibold text-gray-500">Loading...</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4 mx-12">
              {currentChars.map((char: any) => (
                <div
                  key={char.id}
                  className="border-4 border-black rounded-md bg-white text-center w-[425px] h-[183px] flex items-center space-x-10"
                >
                  <img
                    src={char.image}
                    alt={char.name}
                    className="w-[175px] h-[175px] object-cover"
                  />
                  <div className="flex flex-col items-start">
                    <span className="font-[600px] text-[24px] max-w-[175px] overflow-hidden whitespace-nowrap">
                      {char.name}
                    </span>
                    <span className="font-[600px] text-[20px]">{char.species}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-[200px] flex justify-between items-end mx-auto">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="mx-10 px-8 py-2 bg-white text-gray-800 text-[24px] rounded-[28px] hover:bg-gray-400 disabled:opacity-40"
          >
            Previous 9
          </button>
          <button
            onClick={handleNext}
            disabled={indexOfLastItem >= chars.length}
            className="mx-10 px-8 py-2 bg-[#60A85F] text-black text-[24px] rounded-[28px] border-[3px] border-black hover:bg-[#60A85F] disabled:opacity-50"
          >
            Next 9
          </button>
        </div>

      </div>
    </main>
  );
}
