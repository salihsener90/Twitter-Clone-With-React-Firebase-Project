import { BiSolidSave } from "react-icons/bi";
import { ImCancelCircle } from "react-icons/im";
import { BsFillTrashFill } from "react-icons/bs";
import {db} from "../../firebase/config";
import React, { useRef, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";




const EditMode = ({
  isPicDeleting,
  setIsPicDeleting,
  close,
  id,
  text,
  isImage,
}) => {
  const inputRef = useRef();

  const handleSave = async () => {
    const tweetRef = doc(db, "twitters", id);

    try {
      //yazı içeriğini günceller
      await updateDoc(tweetRef, {
        textContent: inputRef.current.value,
      });
      //resim siinecekse onu kaldırır
      if (isPicDeleting) {
        await updateDoc(tweetRef, {
          imageContent: null,
        });
      }
    } catch (err) {
      console.log(err);
    }
    close();
  };

//tweetin fotograf içeriğini sil
const deletePic = async () => {
  setIsPicDeleting(!isPicDeleting)};
  return (
    <>
      <input
        ref={inputRef}
        className="rounded p-1 px-2 text-black"
        defaultValue={text}
        type="text"
      />
      <button
        onClick={handleSave}
        className="mx-5 p-2 text-green-400 rounded-full hover:bg-gray-400"
      >
        <BiSolidSave />
      </button>
      <button
        onClick={close}
        className=" p-2 text-red-400 rounded-full hover:bg-gray-400"
      >
        <ImCancelCircle />
      </button>
      {isImage && (
        <button
          onClick={deletePic}
          className="absolute end-0 top-20 text-xl p-2 bg-white transition text-red-600 rounded-full hover:bg-gray-400"
        >
          <BsFillTrashFill />
        </button>
      )}
    </>
  );
};
export default EditMode;
