import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./Categories.module.scss";
import { CategotyItem } from "./components/CategotyItem";
import { Reorder } from "framer-motion/dist/framer-motion";
import { v4 as uuid } from "uuid";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import { useActions } from "src/hooks/useActions";
import { ICategory } from "src/models/ICategory";
import cn from "classnames";
import styleSecond from "./components/CategotyItem.module.scss";
import DeleteIcon from "src/assets/images/delete_category_icon.svg";
import { ReactComponent as DragIcon } from "src/assets/images/drag_category_icon.svg";
import { ITemplate } from "src/models/ITemplate";

interface CategoriesPropsTypes {
  templatesData: ITemplate[];
  setTemplatesData: Dispatch<SetStateAction<ITemplate[]>>;
}

export function Categories({ templatesData, setTemplatesData }: CategoriesPropsTypes): JSX.Element {
  const { setCategories, setOtherCategory, setTemplates } = useActions();
  const { categoriesArray, otherCategory } = useTypedSelector((state) => state.categories);
  const { templatesArray } = useTypedSelector((state) => state.templates);
  const [items, setItems] = useState<ICategory[]>(categoriesArray);

  const createCategoryHandler = () => {
    const unique_id = uuid();
    const newItem = {
      name: "",
      count: 0,
      isShow: true,
      id: unique_id,
    };
    setItems([newItem, ...items]);
  };
  useEffect(() => {
    setCategories(items);
  }, [items]);

  useEffect(() => {
    const updatedTemplates = templatesArray.map((item) => {
      if (item.category === otherCategory?.name && !otherCategory.isShow) {
        return { ...item, isShow: false };
      } else if (item.category === otherCategory?.name && otherCategory.isShow) {
        return { ...item, isShow: true };
      } else {
        return item;
      }
    });
    setTemplates(updatedTemplates);
    setTemplatesData(updatedTemplates);
  }, [otherCategory.isShow]);
  return (
    <div className={styles.categories}>
      <div className={styles.categories__container}>
        <button onClick={createCategoryHandler} className={styles.categories__create}>
          <span className={styles.categories__create_plus}>+</span> Create a Category
        </button>
        <Reorder.Group className={styles.categories__list} axis="y" values={items} onReorder={setItems}>
          {items.map((item: ICategory) => (
            <span key={item.id} className={styles.categories__item}>
              <CategotyItem
                templatesData={templatesData}
                setTemplatesData={setTemplatesData}
                setItems={setItems}
                itemData={item}
                items={items}
              />
            </span>
          ))}
        </Reorder.Group>
        <span key={otherCategory.id} className={styles.categories__item}>
          <div className={styleSecond.category}>
            <div className={styleSecond.category__container}>
              <div className={styleSecond.category__flex}>
                <p
                  className={cn(`${styleSecond.category__name} ${styleSecond.unselectable}`, {
                    [styleSecond.disable]: !otherCategory?.isShow,
                  })}>
                  {otherCategory.name}
                </p>

                <div className={styleSecond.category__buttons}>
                  <p
                    className={cn(`${styleSecond.category__count} ${styleSecond.unselectable}`, {
                      [styleSecond.disable]: !otherCategory?.isShow,
                    })}>
                    {otherCategory.count}
                  </p>
                  <label className="checkbox">
                    <input
                      type="checkbox"
                      checked={otherCategory?.isShow}
                      onChange={() => {
                        setOtherCategory({ ...otherCategory, isShow: !otherCategory.isShow });
                      }}
                    />
                    <div className="checkbox__circle"></div>
                    <div className="checkbox__text"></div>
                  </label>
                  <img className={styles.hidden} src={DeleteIcon} alt="delete icon" />
                  <DragIcon className={styles.hidden} />
                </div>
              </div>
            </div>
          </div>
        </span>
      </div>
    </div>
  );
}
