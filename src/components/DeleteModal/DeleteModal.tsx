import { Dispatch, SetStateAction } from "react";
import styles from "./DeleteModal.module.scss";
import DeleteIcon from "src/assets/images/delete_category_icon_white.svg";

interface DeleteModalPropsTypes {
  setIsShowDelete: Dispatch<SetStateAction<boolean>>;
  handleDelete: () => void;
  title: string;
  text: string;
}

export function DeleteModal({ setIsShowDelete, handleDelete, title, text }: DeleteModalPropsTypes): JSX.Element {
  return (
    <div className={styles.delete}>
      <h1 className={styles.delete__title}>{title}</h1>
      <p className={styles.delete__text}>{text}</p>
      <div className={styles.delete__buttons}>
        <button onClick={handleDelete} className={styles.delete__approve}>
          <img src={DeleteIcon} alt="delete icon" /> Delete
        </button>
        <button onClick={() => setIsShowDelete(false)} className={styles.delete__cancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}
