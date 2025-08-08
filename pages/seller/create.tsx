import { useState } from "react";
import { db, storage } from "@/firebase";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { logError } from "@/utils/logError";

export default function CreateAuction() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async () => {
    try {
      let imageUrl = "";
      if (image) {
        const storageRef = ref(storage, \`auctions/\${image.name}\`);
        await uploadBytes(storageRef, image);
        imageUrl = await getDownloadURL(storageRef);
      }

      await addDoc(collection(db, "auctions"), {
        title,
        currentBid: 0,
        image: imageUrl,
        startTime: new Date(),
        endTime: new Date(Date.now() + 3600 * 1000),
        sellerId: "demoUser",
      });
    } catch (err) {
      logError("SELLER:CREATE_FAIL_001", err);
    }
  };

  return (
    <div className="p-4 text-white">
      <h2 className="text-2xl mb-4">Create Auction</h2>
      <input onChange={e => setTitle(e.target.value)} placeholder="Title" className="text-black p-2 block mb-2 w-full" />
      <input type="file" onChange={e => setImage(e.target.files?.[0] || null)} className="mb-2" />
      <button onClick={handleSubmit} className="bg-neon-green text-navy px-4 py-2">Submit</button>
    </div>
  );
}