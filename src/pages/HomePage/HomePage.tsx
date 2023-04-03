import { useContext, useEffect, useState } from "react";
import styles from "./HomePage.module.scss";
import cn from "classnames";
import { Categories } from "./components/Categories/Categories";
import { Templates } from "./components/Templates/Templates";
import FilterArrow from "src/assets/images/filter_arrow_icon.svg";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import { statusesArray } from "src/constants/statuses";
import { ITemplate } from "src/models/ITemplate";
import { AppContext } from "src/context/AppContext";

export function HomePage(): JSX.Element {
  const { isCategoryView, setIsCategoryView } = useContext(AppContext);
  const { categoriesArray, otherCategory } = useTypedSelector((state) => state.categories);
  const { templatesArray } = useTypedSelector((state) => state.templates);
  const [categoriesList, setCategoriesList] = useState<string[]>([] as string[]);
  const [templatesData, setTemplatesData] = useState<ITemplate[]>(templatesArray);
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories");
  const [selectedStatus, setSelectedStatus] = useState<string>("All Statuses");
  const [isActiveCategory, setIsActiveCategory] = useState<boolean>(false);
  const [isActiveStatus, setIsActiveStatus] = useState<boolean>(false);

  useEffect(() => {
    const categoriesNamesArray = categoriesArray
      .filter((el) => el.isShow && el.name != "")
      .map((item) => {
        return item.name;
      });
    if (otherCategory.isShow) {
      setCategoriesList(["All Categories", ...categoriesNamesArray, otherCategory.name]);
    } else {
      setCategoriesList(["All Categories", ...categoriesNamesArray]);
    }
  }, [categoriesArray, otherCategory]);

  return (
    <div className={styles.home}>
      <div className={styles.home__container}>
        <div className={styles.home__flex}>
          <div className={styles.home__tabs}>
            <div
              onClick={() => setIsCategoryView(true)}
              className={cn(styles.home__tab, {
                [styles.active]: isCategoryView,
              })}>
              Categories {categoriesArray.filter((el) => el.name != "").length + 1}
            </div>
            <div
              onClick={() => setIsCategoryView(false)}
              className={cn(styles.home__tab, {
                [styles.active]: !isCategoryView,
              })}>
              Templates {templatesData.filter((el) => el.isShow).length}
            </div>
          </div>
          {!isCategoryView && (
            <div className={`${styles.home__sorts} ${styles.sorts}`}>
              <div className={styles.sorts__category}>
                <div
                  tabIndex={0}
                  onBlur={() => {
                    setIsActiveStatus(false);
                    setIsActiveCategory(false);
                  }}
                  onClick={() => {
                    setIsActiveStatus(false);
                    setIsActiveCategory(!isActiveCategory);
                  }}
                  className={styles.sorts__from}>
                  <div className={styles.sorts__subtitle}>
                    {selectedCategory}{" "}
                    <img
                      src={FilterArrow}
                      className={cn(styles.sorts__arrow, {
                        [styles.active]: isActiveCategory,
                      })}
                      alt="filter arrow"
                    />
                  </div>
                  <div
                    className={cn(`${styles.sorts__sort} ${styles.sort}`, {
                      [styles.active]: isActiveCategory,
                    })}>
                    {categoriesList
                      .filter((el) => el != "")
                      .map((el) => {
                        return (
                          <a
                            key={el}
                            onClick={() => {
                              setIsActiveCategory(!isActiveCategory);
                              setSelectedCategory(el);
                            }}
                            className={styles.sort__item}>
                            {el}
                          </a>
                        );
                      })}
                  </div>
                </div>
              </div>
              <div className={styles.sorts__status}>
                <div
                  tabIndex={1}
                  onBlur={() => {
                    setIsActiveStatus(false);
                    setIsActiveCategory(false);
                  }}
                  onClick={() => {
                    setIsActiveCategory(false);
                    setIsActiveStatus(!isActiveStatus);
                  }}
                  className={styles.sorts__from}>
                  <div className={styles.sorts__subtitle}>
                    {selectedStatus}{" "}
                    <img
                      src={FilterArrow}
                      className={cn(styles.sorts__arrow, {
                        [styles.active]: isActiveStatus,
                      })}
                      alt="filter arrow"
                    />
                  </div>
                  <div
                    className={cn(`${styles.sorts__sort} ${styles.sort}`, {
                      [styles.active]: isActiveStatus,
                    })}>
                    {statusesArray.map((el) => {
                      return (
                        <a
                          key={el}
                          onClick={() => {
                            setIsActiveStatus(!isActiveStatus);
                            setSelectedStatus(el);
                          }}
                          className={cn(styles.sort__item, {
                            [styles.yellow]: el == "Moderation",
                            [styles.red]: el == "Not approved",
                            [styles.green]: el == "Approved",
                          })}>
                          {el}{" "}
                          <span className={styles.sort__count}>
                            {el == "All Statuses"
                              ? templatesData.filter((el) => el.isShow).length
                              : templatesData.filter((item) => item.status == el && item.isShow).length}
                          </span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className={styles.home__content}>
          {isCategoryView ? (
            <Categories templatesData={templatesData} setTemplatesData={setTemplatesData} />
          ) : (
            <Templates
              templatesData={templatesData}
              setTemplatesData={setTemplatesData}
              selectedCategory={selectedCategory}
              selectedStatus={selectedStatus}
            />
          )}
        </div>
      </div>
    </div>
  );
}
