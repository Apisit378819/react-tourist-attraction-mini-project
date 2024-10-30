import { useState, useEffect } from "react";
import axios from "axios";

export function SearchBar() {
  const [searchTerm, setsearchTerm] = useState("");
  const [destinations, setdestinations] = useState([]);

  useEffect(() => {
    // เมื่อ `searchTerm` เปลี่ยน ให้ดึงข้อมูลใหม่
    fetchDestinations();
  }, [searchTerm]);

  const fetchDestinations = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4001/trips?keywords=${searchTerm}`
      );
      setdestinations(response.data.data);
    //   console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching destinations:", error);
    }
  };

  const handleTagClick = (tag) => {
    setsearchTerm(tag); // อัปเดต searchTerm
  };

  return (
    <>
      <div className="container px-4 py-16 mx-auto">
        <h1 className="text-center text-blue-500 text-4xl font-semibold mb-6">
          เที่ยวไหนดี
        </h1>
        <div className="px-40">
          <p>ค้นหาที่เที่ยว</p>
          <input
            type="text"
            placeholder="ค้นหาที่เที่ยว..."
            value={searchTerm}
            onChange={(e) => setsearchTerm(e.target.value)}
            className="w-full p-3 mb-2 border-b border-gray-300 focus:outline-none"
          />
        </div>
        <section className="space-y-4 mt-6">
          {destinations.map((destination) => (
            <DestinationCard
              keyId={destination.eid}
              title={destination.title}
              description={destination.description}
              photo={destination.photos[0]}
              photos={destination.photos}
              url={destination.url}
              tags={destination.tags}
              onTagClick={handleTagClick}
            />
          ))}
        </section>
      </div>
    </>
  );
}
export function DestinationCard({ title, description, photos, url , tags , onTagClick , photo , keyId}) {
    if (!title || !description || !photos || photos.length === 0) return null
  return ( 
    <div className="bg-white rounded-lg shadow p-4 flex gap-4 mb-4" >
      <img
        
        src={photo}
        alt=""
        className="w-80 h-60 rounded-lg object-cover"
      />
      <div>
        <a href={url} target="_blank" className="text-xl font-semibold text-black-600">{title}</a>
        <p className="text-gray-600">
          {description
            ? description.length > 100
              ? description.slice(0, 100) + "..."
              : description
            : ""}
        </p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 mt-2 inline-block"
        >
          อ่านต่อ
        </a>
        <br />
        <span className="font-semibold">หมวดหมู่:</span>
          {tags && tags.map((tag, index) => (
            <button key={index}
            className=" px-2 py-1 rounded-md text-sm"
            onClick={() => onTagClick(tag)}>
                {tag}
            </button>
          ))}
        <div className="pt-6 flex gap-6">
        {/* <img
        src={photos && photos.length > 0 ? photos[1] : null}
        alt=""
        className="w-20 h-20 rounded-lg object-cover"
      />
      <img
        src={photos && photos.length > 0 ? photos[2] : null}
        alt=""
        className="w-20 h-20 rounded-lg object-cover"
      />
      <img
        src={photos && photos.length > 0 ? photos[3] : null}
        alt=""
        className="w-20 h-20 rounded-lg object-cover"
      /> */}
    {photos && photos.slice(1).map((photo, index) => (
            <img
              key={keyId}
              src={photo } // ใช้ Placeholder หากไม่มีรูปภาพ
              alt=""
              className="w-20 h-20 rounded-lg object-cover"
            />
          ))}

        </div>
      </div>
    </div>
  );
}
