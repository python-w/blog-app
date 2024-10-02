"use client";

import Button from "@/components/button";
import Spinner from "@/components/spinner";
import { GlobalContext } from "@/context";
import { firebaseConfig, formControls } from "@/utils";
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

const app = initializeApp(firebaseConfig);
const storage = getStorage(app, "gs://nextjs-blog-2024-fd273.appspot.com");

function createUniqueFileName(fileName) {
  const timeStamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 12);
  return `${fileName}-${timeStamp}-${randomString}`;
}

async function handleImageSaveToFirebase(file) {
  const extractUniqueFileName = createUniqueFileName(file?.name);
  const storageRef = ref(storage, `blog/${extractUniqueFileName}`);
  const uploadImage = uploadBytesResumable(storageRef, file);
  return new Promise((resolve, reject) => {
    uploadImage.on(
      "state_changed",
      (snapshot) => {},
      (error) => reject(error),
      () => {
        getDownloadURL(uploadImage.snapshot.ref)
          .then((url) => resolve(url))
          .catch((error) => reject(error));
      }
    );
  });
}
export default function Create() {
  const {formData, setFormData} = useContext(GlobalContext)
  const [imageLoading, setImageLoading] = useState(false);
  const {data: session} = useSession();
  const router = useRouter();

  console.log(session);

  async function handleBlogImageChange(event) {
    if (!event.target.files) return;
    setImageLoading(true);
    const saveImageToFirebase = await handleImageSaveToFirebase(event.target.files[0]);

    if (saveImageToFirebase !== "") {
      setImageLoading(false);
      console.log(saveImageToFirebase, "saveImageToFirebase");
      setFormData({
        ...formData,
        image: saveImageToFirebase
      })
    }
  }

  async function handleSaveBlogPost() {
    console.log(formData);
    const response = await fetch('/api/blog-post/add-post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...formData,
        userid: session?.user?.name,
        userimage: session?.user?.image,
        comments: []
      }),
    })
    const data = await response.json();
    console.log(data);

    if (data && data.success) {
      router.push('/blog');
    }
  }
  return (
    <section className="overflow-hidden py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mb-12 rounded-md bg-primary/[3%] py-10 dark:bg-dark sm:p-[55px] lg:mb-5 lg:px-8 xl:p-[55px] px-8">
              <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl">Create Your Own Blog Post</h2>
            </div>
            <div>
              <div className="flex gap-3 flex-col">
                <div className="gap-3">
                  <div className={`${imageLoading ? "w-1/2" : "w-full"}`}>
                    <label className="mb-3 block text-sm font-medium text-dark dark:text-white">Upload blog image</label>
                    <input id="fileInput" accept="image/*" max={100000} type="file" onChange={handleBlogImageChange} className="w-full mb-8 rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp" />
                  </div>
                  {imageLoading ? <div className="w-1/2"><Spinner /></div> : null}
                </div>
                <div className="-mx-4 flex flex-wrap">
                  {formControls.map((control) => (
                    <div className="w-full mx-4" key={control.id}>
                      <label className="mb-3 block text-sm font-medium text-dark dark:text-white">{control.label}</label>
                      {control.component === "input" ? (
                        <input type={control.type} placeholder={control.placeholder} name={control.id} onChange={(event) => setFormData({...formData, [control.id]: event.target.value})} value={formData[control.id]} className="w-full mb-8 rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp" />
                      ) : control.component === "select" ? (
                        <select placeholder={control.placeholder} name={control.id} onChange={(event) => setFormData({...formData, [control.id]: event.target.value})} value={formData[control.id]} className="w-full mb-8 rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp">
                          <option value={""} id="">
                            Select
                          </option>
                          {control.options.map((optionItem) => (
                            <option id={optionItem.value} value={optionItem.value}>
                              {optionItem.label}
                            </option>
                          ))}
                        </select>
                      ) : control.component === "textarea" ? (
                        <textarea placeholder={control.placeholder} rows={5} name={control.id} onChange={(event) => setFormData({...formData, [control.id]: event.target.value})} value={formData[control.id]} className="w-full mb-8 rounded-md border border-transparent py-3 px-6 text-base text-body-color placeholder-body-color shadow-one outline-none focus:border-primary focus-visible:shadow-none dark:bg-[#242B51] dark:shadow-signUp"></textarea>
                      ) : null}
                    </div>
                  ))}
                  <div className="w-full px-4">
                    <Button text="Create New Blog" onClick={handleSaveBlogPost} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
