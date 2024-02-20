import { BiMessageRounded } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { AiOutlineHeart } from "react-icons/ai";
import { FiShare2 } from "react-icons/fi";
import moment from "moment/moment";
import "moment/locale/tr";
import { auth, db } from "../../firebase/config";
import DropDown from "./DropDown";
import {
  doc,
  deleteDoc,
  updateDoc,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import EditMode from "./EditMode";

const Post = ({ tweet }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isPicDeleting, setIsPicDeleting] = useState(false);
  const [isLiked, setIsLiked] = useState();

  //tarihin suandan ne kadar once hesaplma
  const date = moment(tweet?.data.createdAt?.toDate()).fromNow();

  //kullanıcın tweeti liklayıp like lamadıpını kontrıl eder
  useEffect(() => {
    const found = tweet?.data?.likes?.find(
      (id) => id === auth.currentUser.uid
      );
    setIsLiked(found);

console.log(tweet)  }, [tweet]);

  const handleDelete = async () => {
    if (confirm("Tweet'i silmeyi onaylıyor musun?")) {
      //silinecek tweetin referansını alma
      const tweetRef = doc(db, "twitters", tweet.id);
      //tweeti sil
      await deleteDoc(tweetRef);
    }
  };
  //like yoksa atar varsa kaldırır
  const toggleLike = async () => {
    const tweetRef = doc(db, "twitters", tweet.id);
    
    await updateDoc(tweetRef, {
      likes: isLiked //kullanıcı tweeti likeladımı
        ? arrayRemove(auth.currentUser.uid) //like kaldırır
        : arrayUnion(auth.currentUser.uid), //like ekler
    });
  };
  return (
    <div className="relative flex gap-3 p-3 border-b-[1px] border-gray-700">
      <img className="w-12 h-12 rounded-full" src={tweet.data.user.photo} />

      <div className="w-full">
        {/* üst kısım  : kullanıcı bilgleri */}
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <p className="font-bold">{tweet.data.user.name}</p>
            <p className="text-gray">
              @{tweet.data.user.name?.toLowerCase().replace(" ", "_")}
            </p>
            <p className="text-gray">{date}</p>
          </div>
          {/* //AYARLAR */}
          {tweet.data.user.id === auth.currentUser.uid && (
            <DropDown
              handleEdit={() => setIsEditMode(true)}
              handleDelete={handleDelete}
            />
          )}
            </div>
        {/* orta kısım => tweet içeriği */}

        <div className="my-3">
          {isEditMode ? (
            <EditMode
              id={tweet.id}
              close={() => {
                setIsEditMode(false);
                setIsPicDeleting(false);
              }}
              isPicDeleting={isPicDeleting}
              setIsPicDeleting={setIsPicDeleting}
              isImage={tweet.data.imageContent}
              text={tweet.data.textContent}
            />
          ) : (
            <p>{tweet.data.textContent}</p>
          )}
          {tweet.data.imageContent && (
            <img
              className={`${
                isPicDeleting ? "blur-sm blur" : " "
              } my-2 rounded-lg w-full object-cover mx-auto max-h-[330px]`}
              src={tweet.data.imageContent}
            />
          )}
        </div>

        {/* alt kısım=>etkişelim butonu */}
        <div className="flex justify-between">
          <div className="p-2 px-3 rounded-full transition cursor-pointer hover:bg-[blue]">
            <BiMessageRounded />
          </div>
          <div className="p-2 px-3 rounded-full transition cursor-pointer hover:bg-[green]">
            <FaRetweet />
          </div>

          <div
            onClick={toggleLike}
            className="flex items-center gap-1 p-2 px-3 rounded-full transition cursor-pointer hover:bg-[red]"
          >
            {isLiked ? <FcLike /> : <AiOutlineHeart />}
            
            {tweet?.data?.likes?.length}
          </div>
          <div className="p-2 px-3 rounded-full transition cursor-pointer hover:bg-[#6600ff62]">
            <FiShare2 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
