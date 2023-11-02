import { useRef, useState } from "react";
import { BiSolidSelectMultiple } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { imgPath } from "../assets/data/imagePath";
import "./Example.css";

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
    console.log(selectedItemid, record[selectedItemid]);
    if (!record[selectedItemid]) {
      const selectedItem = list.filter(
        (listItem) => listItem.id === selectedItemid
      );
      //console.log(selectedItem);
      record[selectedItemid] = true;
      setSelectedList([...selectedList, ...selectedItem]);
    } else {
      const restItems = selectedList.filter(
        (item) => item.id !== selectedItemid
      );
      //console.log(restItems);
      record[selectedItemid] = false;
      setSelectedList(restItems);
    }
  };

  const handleDeleteBtn = () => {
    let ids = [];
    for (let i = 0; i < selectedList.length; i++) {
      ids.push(selectedList[i].id);
    }
    console.log(ids);
    const filesAfterDelete = list.filter(
      (listItem) => !ids.includes(listItem.id)
    );
    console.log(filesAfterDelete);
    if (confirm("Are you sure you want to delete?")) {
      setList(filesAfterDelete);
      setSelectedList([]);
    }
  };

  // const initSortableList = (e) => {
  //   e.preventDefault();
  //   const draggingItem = e.target.querySelector(".dragging");
  //   const siblings = [...e.target.querySelectorAll(".item:not(.dragging)")];

  //   let nextSibling = siblings.find((sibling) => {
  //     return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
  //   });

  //   e.target.insertBefore(draggingItem, nextSibling);
  // };

  return (
    <>
      {selectedList.length !== 0 && (
        <div className="flex justify-around items-center m-2 p-2 font-bold border-2 border-purple-500 rounded-lg sticky top-0 bg-white z-50">
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

      <div
        className="grid md:grid-cols-5 shadow-lg gap-2 m-2 sortable-list"
        // onDragOver={(e) => initSortableList(e)}
      >
        {list &&
          list.map((item, index) => (
            <div
              className={`${
                index == 0 ? "row-span-2 col-span-2 " : ""
              }group relative shadow-lg rounded-lg border-2 border-purple-500 cursor-pointer item`}
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
                className={`w-[100%] h-[100%] group-hover:shadow transition-transform transform group-hover:scale-105 duration-500 rounded-md`}
              />
              <div
                className={`${
                  record[item.id]
                    ? "opacity-40"
                    : "shadow-lg opacity-0 group-hover:opacity-40 group-hover:scale-105"
                } absolute top-0 left-0 w-full h-full  transition-opacity duration-300 flex items-center justify-center p-4 rounded-md bg-black`}
              ></div>
            </div>
          ))}
      </div>
      {list.length === 0 && <p className="text-center">Gallery is empty!!!</p>}
    </>
  );
};

export default Example;

//className={`${index == 0 ? "w-[100%] h-[100%]" : ""} p-2`}
