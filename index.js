import { useMount } from "ahooks";
import { useCallback, useMemo, useRef, useState } from "react";
import styles from './index.css';
const insertBefore = ( list, from, to)=> {
  if(from && to && from != to){
    const _copy = JSON.parse(JSON.stringify(list));
    let _formIndex = _copy.indexOf(from);
    let _newToIndex = _copy.indexOf(to);
    let _way = _newToIndex > _formIndex ? 1 : -1;
    _copy.splice(_formIndex, 1);
    _newToIndex = _copy.indexOf(to);
    ( _newToIndex == 0 && _way == -1) && (_way = 0)
    _copy.splice(_newToIndex+_way, 0, from);
    return _copy;
  }
  return null;
};

export default function Sortable(props){
  const {parameter, config} = props;
  const dataList = useMemo(() => parameter, [parameter]);
  const [listData, setListData] = useState([]);
  const dragItemRef = useRef(null);
  const dropAreaRef = useRef(null);
  useMount(() => {
    setListData(dataList);
  });
  const handleDragStart = (e, data) => {
    dragItemRef.current = data;
    let _el = dropAreaRef.current?.querySelector(`[data-id="${data}"]`);
    if(_el){
      _el.classList.add("draggingItem")
    }
  };
  const handleDragEnd = useCallback(() => {
    let _data = dragItemRef.current;
    if(_data){
      let _el = dropAreaRef.current?.querySelector(`[data-id="${_data}"]`);
      if(_el){
        _el.classList.remove("draggingItem")
      }
      dragItemRef.current = undefined;
    }
  }, []);
  const updateList = useCallback((_x, _y, currentItem) => {
    let _dropRect = dropAreaRef.current?.getBoundingClientRect();
    if(_dropRect){
      let _ordered = insertBefore(listData, dragItemRef.current, currentItem);
      _ordered && setListData(_ordered);
    }
  }, [listData]);
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    let _target = e.target;
    updateList(e.clientX, e.clientY, _target.getAttribute("data-id"));
  }, [listData]);

  return(
    <div class="tuiSortableReact" ref={dropAreaRef} onDragEnd={handleDragEnd} onDragOver={handleDragOver}>
      <ul class="tuiSortableReact-dataList" 
          style={config&&config.style}>
        {listData.map((item) => (
          <li
          class="tuiSortableReact-li"
          style={config&&config.child&&config.child.style}
          draggable
          data-id={item}
          onDragStart={(e)=>handleDragStart(e, item)}
          key={item}
          >
            { item }
          </li>
        ))}
      </ul>
    </div>
  );
}