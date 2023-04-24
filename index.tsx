import { useMount } from "ahooks";
import { useCallback, useMemo, useRef, useState } from "react";
import styles from './index.less';
const insertBefore = ( list:string[], from:any, to:any)=> {
  if(from && to && from != to){
    const _copy = JSON.parse(JSON.stringify(list));
    let _formIndex = _copy.indexOf(from);
    let _newToIndex = _copy.indexOf(to);
    let _way:number = _newToIndex > _formIndex ? 1 : -1;
    _copy.splice(_formIndex, 1);
    _newToIndex = _copy.indexOf(to);
    ( _newToIndex == 0 && _way == -1) && (_way = 0)
    _copy.splice(_newToIndex+_way, 0, from);
    return _copy;
  }
  return null;
};

export default function Sortable(props: any){
  const {parameter} = props;
  const dataList = useMemo(() => parameter, [parameter]);
  const [listData, setListData] = useState<any>([]);
  const dragItemRef = useRef<any>(null);
  const dropAreaRef = useRef<HTMLDivElement>(null);
  useMount(() => {
    setListData(dataList);
  });
  const handleDragStart = (e: React.DragEvent<HTMLLIElement>, data: any) => {
    dragItemRef.current = data;
    let _el = dropAreaRef.current?.querySelector(`[data-id="${data}"]`);
    if(_el){
      _el.classList.add(styles.draggingItem)
    }
  };
  const handleDragEnd = useCallback(() => {
    let _data = dragItemRef.current;
    if(_data){
      let _el = dropAreaRef.current?.querySelector(`[data-id="${_data}"]`);
      if(_el){
        _el.classList.remove(styles.draggingItem)
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
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    let _target:any = e.target;
    updateList(e.clientX, e.clientY, _target.getAttribute("data-id"));
  }, [listData]);

  return(
    <div  ref={dropAreaRef} onDragEnd={handleDragEnd} onDragOver={handleDragOver}>
      <ul className={styles.dataList}>
        {listData.map((item: any) => (
          <li
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