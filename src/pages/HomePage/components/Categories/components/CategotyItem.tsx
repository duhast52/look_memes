import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./CategotyItem.module.scss";
import "./Checkbox.css";
import DeleteIcon from "src/assets/images/delete_category_icon.svg";
import { ReactComponent as DragIcon } from "src/assets/images/drag_category_icon.svg";
import { Reorder, useDragControls } from "framer-motion/dist/framer-motion";
import cn from "classnames";
import { ICategory } from "src/models/ICategory";
import { Modal } from "src/dialogs/ModalDialog/Modal";
import { DeleteModal } from "src/components";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import { useActions } from "src/hooks/useActions";
import { ITemplate } from "src/models/ITemplate";

interface CategotyItemPropsTypes {
  itemData: ICategory;
  setItems: Dispatch<SetStateAction<ICategory[]>>;
  items: ICategory[];
  templatesData: ITemplate[];
  setTemplatesData: Dispatch<SetStateAction<ITemplate[]>>;
}

export function CategotyItem({
  itemData,
  setItems,
  items,
  templatesData,
  setTemplatesData,
}: CategotyItemPropsTypes): JSX.Element {
  const dragControls = useDragControls();
  const { setTemplates, setOtherCategory } = useActions();
  const { templatesArray } = useTypedSelector((state) => state.templates);
  const { otherCategory } = useTypedSelector((state) => state.categories);
  const [isChangeName, setIsChangeName] = useState<boolean>(false);
  const [isShowDelete, setIsShowDelete] = useState<boolean>(false);

  const handleNameUpdate = (id, el) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, name: el.target.value };
      }
      return item;
    });
    setItems(newItems);
  };

  const OnChangeVisibilityHandler = () => {
    const newItems = items.map((item) => {
      if (item.id === itemData?.id) {
        return { ...item, isShow: !itemData?.isShow };
      }
      return item;
    });
    setItems(newItems);
  };

  const handleDelete = () => {
    const updatedTemplates = templatesArray.map((item) => {
      if (item.category === itemData?.name) {
        return { ...item, category: "Other" };
      }
      return item;
    });
    setTemplates(updatedTemplates);
    setOtherCategory({ ...otherCategory, count: otherCategory.count + itemData.count });
    const newItems = items.filter((item) => item.id !== itemData?.id);
    setItems(newItems);
  };

  useEffect(() => {
    itemData.name == "" && setIsChangeName(true);
  }, [itemData.name]);

  useEffect(() => {
    const updatedTemplates = templatesArray.map((item) => {
      if (item.category === itemData?.name && !itemData.isShow) {
        return { ...item, isShow: false };
      } else if (item.category === itemData?.name && itemData.isShow) {
        return { ...item, isShow: true };
      } else {
        return item;
      }
    });
    setTemplates(updatedTemplates);
    setTemplatesData(updatedTemplates);
  }, [itemData.isShow]);

  return (
    <>
      <Reorder.Item value={itemData} dragListener={false} dragControls={dragControls}>
        <div className={styles.category}>
          <div className={styles.category__container}>
            <div className={styles.category__flex}>
              {isChangeName ? (
                <input
                  autoFocus
                  placeholder="Enter Category Name"
                  onBlur={(e) => {
                    itemData.name == "" ? setIsChangeName(true) : setIsChangeName(false);
                  }}
                  type="text"
                  value={itemData.name}
                  onChange={(e) => handleNameUpdate(itemData.id, e)}
                  className={styles.category__input}
                />
              ) : (
                <p
                  onClick={() => setIsChangeName(true)}
                  className={cn(`${styles.category__name} ${styles.unselectable}`, {
                    [styles.disable]: !itemData?.isShow,
                  })}>
                  {itemData.name}
                </p>
              )}

              <div className={styles.category__buttons}>
                <p
                  className={cn(`${styles.category__count} ${styles.unselectable}`, {
                    [styles.disable]: !itemData?.isShow,
                  })}>
                  {itemData.count}
                </p>
                <label className="checkbox">
                  <input type="checkbox" checked={itemData?.isShow} onChange={OnChangeVisibilityHandler} />
                  <div className="checkbox__circle"></div>
                  <div className="checkbox__text"></div>
                </label>
                <img
                  onClick={() => setIsShowDelete(true)}
                  className={`${styles.category__delete} ${styles.unselectable}`}
                  src={DeleteIcon}
                  alt="delete icon"
                />
                <DragIcon className={styles.category__drag} onPointerDown={(event) => dragControls.start(event)} />
              </div>
            </div>
          </div>
        </div>
      </Reorder.Item>
      <Modal
        visible={isShowDelete}
        content={
          <DeleteModal
            handleDelete={handleDelete}
            title={"Delete the Category?"}
            text={'All templates in the category will be moved to the category "Other"'}
            setIsShowDelete={setIsShowDelete}
          />
        }
        onClose={() => {
          setIsShowDelete(false);
        }}
      />
    </>
  );
}
