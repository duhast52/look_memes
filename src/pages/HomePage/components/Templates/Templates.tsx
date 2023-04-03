import styles from "./Templates.module.scss";
import { TemplateItem } from "./components/TemplateItem";
import { useEffect, useState, ChangeEvent, Dispatch, SetStateAction } from "react";
import { Pagination } from "@mui/material";
import usePagination from "src/hooks/usePagination";
import "./Pagination.css";
import { ITemplate } from "src/models/ITemplate";
import { useTypedSelector } from "src/hooks/useTypedSelector";

interface TemplatesPropsTypes {
  templatesData: ITemplate[];
  setTemplatesData: Dispatch<SetStateAction<ITemplate[]>>;
  selectedCategory: string;
  selectedStatus: string;
}

export function Templates({
  templatesData,
  setTemplatesData,
  selectedCategory,
  selectedStatus,
}: TemplatesPropsTypes): JSX.Element {
  const { templatesArray } = useTypedSelector((state) => state.templates);
  const [page, setPage] = useState<number>(1);

  const perPage = 16;

  const count = Math.ceil(templatesData.length / perPage);

  let data = usePagination(templatesData, perPage);

  const handleChange = (event: ChangeEvent<unknown>, newPage: number) => {
    data.jump(newPage);
    window.scrollTo(0, 0);
    setPage(newPage);
  };

  useEffect(() => {
    setPage(1);
    if (selectedCategory == "All Categories" && selectedStatus == "All Statuses") {
      setTemplatesData(templatesArray);
    } else if (selectedCategory == "All Categories" && selectedStatus != "All Statuses") {
      setTemplatesData(templatesArray.filter((el) => el.status == selectedStatus));
    } else if (selectedCategory != "All Categories" && selectedStatus == "All Statuses") {
      setTemplatesData(templatesArray.filter((el) => el.category == selectedCategory));
    } else {
      setTemplatesData(templatesArray.filter((el) => el.status == selectedStatus && el.category == selectedCategory));
    }
  }, [selectedCategory, selectedStatus]);

  return (
    <div className={styles.templates}>
      <div className={styles.templates__container}>
        <ul className={styles.templates__flex}>
          {data.currentData().map((el: ITemplate) => {
            if (el.isShow) {
              return (
                <li className={styles.templates__item} key={el.id}>
                  <TemplateItem itemData={el} />
                </li>
              );
            }
          })}
        </ul>
        <div className={styles.templates__pagination}>
          <Pagination page={page} count={count} siblingCount={3} onChange={handleChange} />
        </div>
      </div>
    </div>
  );
}
