import styles from "./TemplateItem.module.scss";
import cn from "classnames";
import { Link } from "react-router-dom";
import { webAppRoutes } from "src/constants";

interface ITemplatesArray {
  TemplateImg: string;
  status: string;
  category: string;
  name: string;
  slug: string;
  id: string;
}

interface TemplateItemPropsTypes {
  itemData: ITemplatesArray;
}

export function TemplateItem({ itemData }: TemplateItemPropsTypes): JSX.Element {
  return (
    <Link to={`${webAppRoutes.newMeme}/:${itemData.slug}`} className={styles.template}>
      <img className={styles.template__img} src={itemData.TemplateImg} alt="template img" />
      <div
        className={cn(styles.template__status, {
          [styles.red]: itemData.status == "Not approved",
          [styles.green]: itemData.status == "Approved",
        })}>
        {itemData.status}
      </div>
      <p className={styles.template__category}>{itemData.category}</p>
      <p className={styles.template__name}>{itemData.name}</p>
    </Link>
  );
}
