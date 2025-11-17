import React from "react";
import Slider from "./Slider"; // client component for scrolling

const QUERY = `
query SpaceNewsFeed {
  spaceNewsItems(first: 12) {
    nodes {
      id
      title
      excerpt
      slug
      date
      featuredImage { node { sourceUrl altText } }
    }
  }
}
`;

export default async function Home() {
  const endpoint = process.env.WP_GRAPHQL_ENDPOINT;
  let posts: any[] = [];

  if (!endpoint) {
    console.error("WP_GRAPHQL_ENDPOINT is not defined.");
  } else {
    try {
      const res = await fetch(endpoint as string, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: QUERY, variables: { first: 10 } }),
        next: { revalidate: 60 },
      });
      const json = await res.json();
      if (!json || json.errors) {
        console.error(json?.errors);
      } else {
        posts = json.data.spaceNewsItems.nodes || [];
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <main
      className="bg-[#1B1B1B] min-h-screen text-white pb-32"
      style={{ fontFamily: "KHTekaTRIAL-Regular, sans-serif" }}
    >
      <style>{`
        @font-face {
          font-family: 'KHTekaTRIAL-Regular';
          src: url('/fonts/KHTekaTRIAL-Regular.otf') format('opentype');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }
        body, html, * {
          font-family: 'KHTekaTRIAL-Regular', sans-serif !important;
        }
      `}</style>
      <header className="w-full text-center py-20">
        <h1 className="text-[72px] font-bold leading-none">Latest News</h1>
      </header>

      <div className="max-w-full mx-auto px-10 grid grid-cols-1 md:grid-cols-3 gap-20">
        <section className="flex flex-col justify-between">
          <div>
            <h2 className="text-[28px] font-bold leading-tight">
              Stay up-to-date with the latest developments and exciting announcements from our team.
            </h2>
            <p className="text-[14px] opacity-70 mt-6 leading-relaxed max-w-sm">
              From groundbreaking project launches to new partnerships and industry insights, our Latest News section brings you the most recent updates on everything happening within our company.
            </p>
            <a
              href="/news"
              className="mt-12 inline-flex items-center bg-[#FF4D2E] px-5 min-w-80 py-3 rounded-md font-medium hover:opacity-90 transition"
            >
              View All News →
            </a>
          </div>
        </section>

        {/* Client-side slider */}
        <section className="md:col-span-2 relative">
          <Slider posts={posts} />
        </section>
      </div>
    </main>
  );
}
