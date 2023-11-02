import { useRef, useState } from "react";
import { BiSolidSelectMultiple } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { imgPath } from "../assets/data/imagePath";
import "./Example.css";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

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
  const [list, setList] = useState(imgPath);
  const [selectedList, setSelectedList] = useState([]);

  const drop = (results) => {
    const { source, destination, type } = results;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "group") {
      const reorderedList = [...list];

      const sourceIndex = source.index;
      const destinationIndex = destination.index;

      const [removedStore] = reorderedList.splice(sourceIndex, 1);
      reorderedList.splice(destinationIndex, 0, removedStore);

      return setList(reorderedList);
    }
    const itemSourceIndex = source.index;
    const itemDestinationIndex = destination.index;

    const sourceIndex = list.findIndex(
      (store) => store.id === source.droppableId
    );
    const destinationIndex = list.findIndex(
      (store) => store.id === destination.droppableId
    );

    const newSourceItems = [...list[sourceIndex].items];
    const newDestinationItems =
      source.droppableId !== destination.droppableId
        ? [...list[destinationIndex].items]
        : newSourceItems;

    const [deletedItem] = newSourceItems.splice(itemSourceIndex, 1);
    newDestinationItems.splice(itemDestinationIndex, 0, deletedItem);

    const newList = [...list];

    newList[sourceIndex] = {
      ...list[sourceIndex],
      items: newSourceItems,
    };
    newList[destinationIndex] = {
      ...list[destinationIndex],
      items: newDestinationItems,
    };

    setList(newList);
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
      <DragDropContext onDragEnd={drop}>
        <Droppable droppableId="ROOT" type="group">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex justify-center"
            >
              <div className="grid md:grid-cols-5 shadow-lg gap-2 m-2 w-[70%]">
                {list &&
                  list.map((item, index) => (
                    <Draggable
                      draggableId={item.id}
                      index={index}
                      key={item.id}
                    >
                      {(provided) => (
                        <div
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                          className={`${
                            index == 0 ? "row-span-2 col-span-2 " : " "
                          }group relative shadow-lg rounded-lg border-2 border-purple-500 cursor-pointer `}
                          // draggable={!record[item.id]}
                          // onDragStart={(e) => dragStart(e, index)}
                          // onDragEnter={(e) => dragEnter(e, index)}
                          // onDragEnd={drop}
                          // onDragOver={(e) => e.preventDefault()}
                        >
                          <input
                            type="checkbox"
                            name=""
                            checked={record[item.id]}
                            id={index}
                            className={`${
                              !record[item.id]
                                ? "hidden group-hover:block"
                                : "block"
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
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {list.length === 0 && <p className="text-center">Gallery is empty!!!</p>}
    </>
  );
};

export default Gallery;

//className={`${index == 0 ? "w-[100%] h-[100%]" : ""} p-2`}
