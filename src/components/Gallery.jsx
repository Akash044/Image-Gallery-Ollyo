import { useRef, useState } from "react";
import { BiSolidSelectMultiple } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { IoMdImages } from "react-icons/io";
import { imgPath } from "../assets/data/imagePath";

const record = [
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
];

const Gallery = () => {
  const dragItem = useRef();
  const dragOverItem = useRef();
  const [list, setList] = useState(imgPath);
  const [selectedList, setSelectedList] = useState([]);

  const dragStart = (e, position) => {
    dragItem.current = position;
  };
  const dragEnter = (e, position) => {
    dragOverItem.current = position;
  };

  const drop = () => {
    const copyListItems = [...list];
    const dragItemContent = copyListItems[dragItem.current]; //take the dragged item
    copyListItems.splice(dragItem.current, 1); //remove the dragged item from the list
    copyListItems.splice(dragOverItem.current, 0, dragItemContent); //added the dragged item over which it was dragged
    dragItem.current = null;
    dragOverItem.current = null;
    setList(copyListItems);
  };

  const handleAddToSelectedList = (e, selectedItemid) => {
    //filtered out the selected item
    if (!record[selectedItemid]) {
      const selectedItem = list.filter(
        (listItem) => listItem.id === selectedItemid
      );
      //set the selected item as the selected item
      record[selectedItemid] = true;
      //add the selected item to the selected list
      setSelectedList([...selectedList, ...selectedItem]);
    } else {
      //remove the selected item from the selected list
      const restItems = selectedList.filter(
        (item) => item.id !== selectedItemid
      );
      //set the selected item as not selected
      record[selectedItemid] = false;
      //update state with rest items
      setSelectedList(restItems);
    }
  };

  const handleDeleteBtn = () => {
    let ids = [];
    for (let i = 0; i < selectedList.length; i++) {
      ids.push(selectedList[i].id);
    }
    const filesAfterDelete = list.filter(
      (listItem) => !ids.includes(listItem.id)
    );
    console.log(filesAfterDelete);
    if (confirm("Are you sure you want to delete?")) {
      setList(filesAfterDelete);
      setSelectedList([]);
    }
  };

  return (
    <div className="w-4/5 mx-auto h-full">
      {selectedList.length !== 0 && (
        <div className="flex justify-around items-center m-2 p-2 font-bold border-2 rounded-lg sticky top-0 bg-white z-50">
          <div className="flex justify-center items-center gap-2">
            <BiSolidSelectMultiple />
            <p className="text-center">
              <span>{selectedList.length}</span> File
              {selectedList.length > 1 && "s"} Selected
            </p>
          </div>
          <div className="flex justify-center items-center gap-2">
            <AiFillDelete />
            <button
              className="hover:text-red-600 p-1 transition duration-300"
              disabled={!selectedList.length}
              onClick={handleDeleteBtn}
            >
              Delete Selected File{selectedList.length > 1 && "s"}
            </button>
          </div>
        </div>
      )}
      {selectedList.length === 0 && (
        <div className="flex justify-start items-center m-2 p-3 px-4 font-bold border-2 border-purple-500 rounded-lg sticky top-0 bg-white z-50">
          <p>Gallery</p>
        </div>
      )}

      <div className="grid md:grid-cols-5 shadow-lg gap-2 m-2">
        {list &&
          list.map((item, index) => (
            <div
              className={`${
                index == 0 ? "row-span-2 col-span-2 " : ""
              }group relative shadow-lg rounded-lg border border-purple-500 cursor-pointer item`}
              key={index}
              draggable={!record[item.id]}
              onDragStart={(e) => dragStart(e, index)}
              onDragEnter={(e) => dragEnter(e, index)}
              onDragEnd={drop}
              onDragOver={(e) => e.preventDefault()}
            >
              <input
                type="checkbox"
                name=""
                checked={record[item.id]}
                id={index}
                className={`${
                  !record[item.id] ? "hidden group-hover:block" : "block"
                } absolute top-2 left-2 transition-transform duration-500 h-6 w-6 cursor-pointer z-40`}
                onClick={(e) => handleAddToSelectedList(e, item.id)}
              />
              <img
                src={item.path}
                alt=""
                className={`w-full h-full group-hover:shadow transition-transform transform duration-500 rounded-md`}
              />
              <div
                className={`${
                  record[item.id]
                    ? "opacity-40"
                    : "shadow-lg opacity-0 group-hover:opacity-40 "
                } absolute top-0 left-0 w-full h-full  transition-opacity duration-300 flex items-center justify-center p-4 rounded-md bg-black`}
              ></div>
            </div>
          ))}
        <div className="relative flex justify-center items-center">
          <input
            type="file"
            accept="image/*"
            className="z-10 opacity-0 w-full h-full cursor-pointer"
          />
          <div className="absolute top-0 left-0 flex flex-col justify-center items-center gap-y-4 border-4 border-dotted shadow-lg w-full h-full">
            <IoMdImages className="w-8 h-8" />
            <p className="font-bold">Add Images</p>
          </div>
        </div>
      </div>
      {list.length === 0 && <p className="text-center">Gallery is empty!!!</p>}
    </div>
  );
};

export default Gallery;
