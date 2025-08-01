import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { storyPages } from "@/data/storyData";

export const Book = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'forward' | 'backward'>('forward');

  const totalPages = storyPages.length;

  const handlePageTurn = (direction: 'forward' | 'backward') => {
    if (isFlipping) return;

    setIsFlipping(true);
    setFlipDirection(direction);

    setTimeout(() => {
      if (direction === 'forward' && currentPage < totalPages - 1) {
        setCurrentPage(prev => prev + 1);
      } else if (direction === 'backward' && currentPage > 0) {
        setCurrentPage(prev => prev - 1);
      }
      setIsFlipping(false);
    }, 400);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      handlePageTurn('forward');
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      handlePageTurn('backward');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center p-4">
      <div className="relative max-w-4xl w-full h-[600px] perspective-1000">
        {/* Book Container */}
        <div className="relative w-full h-full flex justify-center items-center">
          {/* Book Spine */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-full bg-book-spine rounded-l-lg shadow-2xl z-10" />
          
          {/* Left Page */}
          <div className="absolute left-0 w-1/2 h-full bg-book-page rounded-l-2xl shadow-xl border border-border/20 p-8 flex flex-col justify-between">
            {currentPage > 0 && (
              <div className="animate-fade-in">
                <div className="text-sm text-text-secondary mb-4">Page {currentPage}</div>
                <div className="text-text-primary leading-relaxed font-serif">
                  {storyPages[currentPage - 1]?.content}
                </div>
              </div>
            )}
          </div>

          {/* Right Page */}
          <div className="absolute right-0 w-1/2 h-full bg-book-page rounded-r-2xl shadow-xl border border-border/20 overflow-hidden">
            <div 
              className={`absolute inset-0 p-8 flex flex-col justify-between transition-all duration-500 ${
                isFlipping && flipDirection === 'forward' 
                  ? 'animate-page-turn' 
                  : isFlipping && flipDirection === 'backward'
                  ? 'animate-page-turn-back'
                  : ''
              }`}
              style={{
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden'
              }}
            >
              <div className="animate-fade-in">
                <div className="text-sm text-text-secondary mb-4">
                  Page {currentPage + 1}
                </div>
                <div className="text-text-primary leading-relaxed font-serif">
                  {storyPages[currentPage]?.content}
                </div>
                {storyPages[currentPage]?.title && (
                  <h2 className="text-2xl font-bold text-primary mb-4 font-serif">
                    {storyPages[currentPage].title}
                  </h2>
                )}
              </div>
              
              {storyPages[currentPage]?.isLastPage && (
                <div className="mt-8 text-center">
                  <p className="text-accent font-medium italic">
                    — The End —
                  </p>
                  <p className="text-sm text-text-secondary mt-4">
                    Written by Riez
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Page Turn Effect Overlay */}
          {isFlipping && (
            <div className="absolute right-0 w-1/2 h-full bg-gradient-to-r from-transparent via-book-shadow/20 to-book-shadow/40 rounded-r-2xl pointer-events-none" />
          )}
        </div>

        {/* Navigation */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
          <Button
            variant="secondary"
            size="sm"
            onClick={handlePrevPage}
            disabled={currentPage === 0 || isFlipping}
            className="shadow-lg"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </Button>
          
          <div className="flex items-center px-4 py-2 bg-book-page rounded-lg shadow-lg border border-border/20">
            <span className="text-sm text-text-secondary">
              {currentPage + 1} of {totalPages}
            </span>
          </div>
          
          <Button
            variant="secondary"
            size="sm"
            onClick={handleNextPage}
            disabled={currentPage === totalPages - 1 || isFlipping}
            className="shadow-lg"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        {/* Click Areas for Page Turning */}
        <div
          className="absolute left-0 w-1/2 h-full cursor-pointer z-20"
          onClick={handlePrevPage}
          style={{ display: currentPage === 0 ? 'none' : 'block' }}
        />
        <div
          className="absolute right-0 w-1/2 h-full cursor-pointer z-20"
          onClick={handleNextPage}
          style={{ display: currentPage === totalPages - 1 ? 'none' : 'block' }}
        />
      </div>
    </div>
  );
};