"use client";
import React, { useRef } from "react";

export default function Slider({ posts }: { posts: any[] }) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (sliderRef.current) sliderRef.current.scrollBy({ left: -400, behavior: "smooth" });
  };
  const scrollRight = () => {
    if (sliderRef.current) sliderRef.current.scrollBy({ left: 400, behavior: "smooth" });
  };

  return (
    <>
      <div className="absolute -top-10 right-0 flex gap-4">
        <button
          onClick={scrollLeft}
          className="cursor-pointer h-10 w-10 rounded-full bg-[#2A2A2A] flex items-center justify-center text-lg text-white hover:bg-white hover:text-black transition-colors"
        >
          {/* Left arrow SVG */}
          <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
            <path d="M0.707529 9.5171L17.2019 9.5171M0.707529 9.5171L9.87109 18.6807M0.707529 9.5171L9.8711 0.353534" stroke="currentColor"/>
          </svg>
        </button>
        <button
          onClick={scrollRight}
          className="cursor-pointer h-10 w-10 rounded-full bg-[#2A2A2A] flex items-center justify-center text-lg text-white hover:bg-white hover:text-black transition-colors"
        >
          {/* Right arrow SVG */}
          <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
            <path d="M16.4936 9.51708H-0.000773969M16.4936 9.51708L7.33008 0.353516M16.4936 9.51708L7.33008 18.6806" stroke="currentColor"/>
          </svg>
        </button>
      </div>

      <div
        ref={sliderRef}
        className="flex overflow-x-auto gap-10 pt-4 pb-6"
        style={{
          scrollbarWidth: "none",    // Firefox
          msOverflowStyle: "none",   // IE and Edge
        }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {posts.length > 0 ? (
          posts.map((p) => (
            <article key={p.id} className="min-w-[360px] max-w-[360px] flex-shrink-0">
              <div className="relative h-[314px] w-full mb-4 bg-black overflow-hidden">
                {/* Featured image can go here */}
              </div>
              <h3 className="text-[22px] font-semibold leading-tight">{p.title}</h3>
              <p className="text-[13px] opacity-70 mt-1">
                {new Date(p.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </p>
              <a
                href={`https://spacenews.com/${p.slug}`}
                className="text-sm underline mt-3 inline-block opacity-70 hover:opacity-100"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read More
              </a>
            </article>
          ))
        ) : (
          <p>No news found.</p>
        )}
      </div>
    </>
  );
}
