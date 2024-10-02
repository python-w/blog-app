"use client";

import { useRouter } from "next/navigation";
import SingleBlog from "../single-blog";
import { useEffect } from "react";

export default function BlogList({ lists }) {
  const router = useRouter();
  useEffect(() => {
    router.refresh();
  }, []);
  return (
    <section className="pt-[120px] pb-[120px]">
      <div className="container">
        <div className="mx-4 grid grid-cols-3 gap-2">
          {lists && lists.length
            ? lists.map((listItem) => (
                <div key={listItem.id} className="px-4">
                  <SingleBlog blogItem={listItem}/>
                </div>
              ))
            : null}
        </div>
      </div>
    </section>
  );
}
