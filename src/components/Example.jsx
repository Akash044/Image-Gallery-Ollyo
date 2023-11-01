import { useRef, useState } from "react";
import { BiSolidSelectMultiple } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
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

const Example = () => {
  const dragItem = useRef();
  const dragOverItem = useRef();
  const [list, setList] = useState(imgPath);
  const [selectedList, setSelectedList] = useState([]);

  const dragStart = (e, position) => {
    dragItem.current = position;
    // console.log(e.target.innerHTML, position);
  };
  const dragEnter = (e, position) => {
    dragOverItem.current = position;
    // console.log(e.target.innerHTML, position);
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

  const handleAddToSelectedList = (e, id) => {
    console.log(id, record[id]);
    if (!record[id]) {
      const selectedItem = list[id];
      record[id] = true;
      setSelectedList([...selectedList, selectedItem]);
    } else {
      const restItems = selectedList.filter((item) => item.id !== id);
      // console.log(restItems);
      record[id] = false;
      setSelectedList(restItems);
    }
  };

  return (
    <>
      <div className="flex justify-around items-center m-2 p-2 font-bold border-2 border-purple-500 rounded-lg sticky top-0 bg-white z-50">
        <div className="flex justify-center items-center gap-2">
          <BiSolidSelectMultiple />
          <p className="text-center">
            No. of Selected Item <span>{selectedList.length}</span>
          </p>
        </div>
        <div className="flex justify-center items-center gap-2">
          <AiFillDelete />
          <p>Delete Selected Item</p>
        </div>
      </div>
      <div className="grid md:grid-cols-5 shadow-lg gap-2 m-2">
        {list &&
          list.map((item, index) => (
            <div
              className={`${
                index == 0 ? "row-span-2 col-span-2 " : ""
              }group relative shadow-lg rounded-lg border-2 border-purple-500`}
              key={index}
              draggable
              onDragStart={(e) => dragStart(e, index)}
              onDragEnter={(e) => dragEnter(e, index)}
              onDragEnd={drop}
            >
              <input
                type="checkbox"
                name=""
                id={index}
                className="absolute top-2 left-2 hidden group-hover:block transition-transform duration-500 z-50"
                onClick={(e) => handleAddToSelectedList(e, item.id)}
              />
              <img
                src={item.path}
                alt=""
                className={`w-[100%] h-[100%] group-hover:shadow transition-transform transform group-hover:scale-105 duration-500 rounded-md`}
              />
              <div className="absolute top-0 left-0 w-full h-full shadow-lg opacity-0 group-hover:opacity-40 group-hover:scale-105 transition-opacity duration-300 flex items-center justify-center p-4 rounded-md bg-black"></div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Example;

//className={`${index == 0 ? "w-[100%] h-[100%]" : ""} p-2`}
