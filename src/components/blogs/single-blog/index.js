import Link from "next/link";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import { useSession } from "next-auth/react";

export default function SingleBlog({ blogItem }) {
  const { id, image, category, title, description, userimage, userid } = blogItem;
  const { data: session } = useSession();
  return (
    <div>
      <div className="relative overflow-hidden rounded-md bg-white shadow-one dark:bg-dark">
        <Link className="relative block h-[250px] w-full" href={"/"}>
          <span className="absolute top-6 right-6 z-20 inline-flex items-center justify-center rounded-full bg-primary py-2 px-4 text-sm font-semibold capitalize text-white dark:text-dark dark:shadow-signUp">{category}</span>
          <Image src={image} alt="Blog Post" fill className="object-cover object-top"/>
        </Link>
      </div>
      <div className="p-6 sm:p-8 md:py-8 md:px-6 lg:p-8 xl:py-8 xl:px-5 2xl:p-8">
        <h3>
          <Link className="mb-4 text-ellipsis overflow-hidden whitespace-nowrap block text-xl font-bold text-black hover:text-primary dark:text-white dark:hover:text-primary sm:text-2xl" href={`/blogs/${id}`}>
            {title}
          </Link>
        </h3>
        <p className="h-[20px] text-ellipsis overflow-hidden whitespace-nowrap mb-6 pb-6 text-base font-medium text-body-color dark:border-white dark:border-opacity-10">{description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center xl:mr-3 xl:pr-3 2xl:mr-5 2xl:pr-5">
            <div className="mr-4">
              <div className="h-10 relative w-10 overflow-hidden rounded-full">
                <Image alt="Author" fill src={userimage} />
              </div>
            </div>
            <div className="flex flex-col">
              <p className="mb-1 text-sm font-medium text-dark dark:text-white">By</p>
              <p className="mb-1 text-sm font-medium text-dark dark:text-white">{userid.split("_")[0].toUpperCase()}</p>
            </div>
            <div>
              <FaTrash onClick={() => {}} size={30} className="cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
