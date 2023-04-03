import { useHistory, useLocation } from "react-router-dom";
import styles from "./NewMeme.module.scss";
import BackIcon from "src/assets/images/create_back_icon.svg";
import DeleteIcon from "src/assets/images/delete_category_icon.svg";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import { useEffect, useRef, useState } from "react";
import FilterArrow from "src/assets/images/filter_arrow_icon.svg";
import cn from "classnames";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import "./Autocomplete.css";
import { MainLoader } from "src/components";
import SubmitIcon from "src/assets/images/create_submit_icon.svg";
import { statusesArray } from "src/constants/statuses";
import { v4 as uuid } from "uuid";
import { useActions } from "src/hooks/useActions";
import { webAppRoutes } from "src/constants";
import { ITemplate } from "src/models/ITemplate";
import { Modal } from "src/dialogs/ModalDialog/Modal";
import { DeleteModal } from "src/components";

const tagsList = [];

export function NewMeme(): JSX.Element {
  const history = useHistory();
  const { setTemplates, setCategories, setOtherCategory } = useActions();
  const { categoriesArray, otherCategory } = useTypedSelector((state) => state.categories);
  const { templatesArray } = useTypedSelector((state) => state.templates);
  const [isActiveCategory, setIsActiveCategory] = useState<boolean>(false);
  const [isActiveStatus, setIsActiveStatus] = useState<boolean>(false);
  const [categoriesList, setCategoriesList] = useState<string[]>([] as string[]);
  const [isUploadIconLoading, setIsUploadIconLoading] = useState<boolean>(false);
  const [uploadIconError, setUploadIconError] = useState<string>("");
  const [startCategory, setStartCategory] = useState<string>("");
  const [startStatus, setStartStatus] = useState<string>("");
  const [isShowComment, setIsShowComment] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [formData, setFormData] = useState<ITemplate>({
    name: "",
    category: "",
    slug: "",
    tags: [],
    TemplateImg: "",
    metadata: "",
    status: "Moderation",
    isShow: true,
    comment: "",
    id: uuid(),
  });
  const ref = useRef(null);

  useEffect(() => {
    const categoriesNamesArray = categoriesArray
      .filter((el) => el.isShow == true && el.name != "")
      .map((item) => {
        return item.name;
      });
    setCategoriesList([...categoriesNamesArray, otherCategory.name]);
    if (history.location.pathname.split(":")[1]) {
      const filterTemplate = templatesArray.filter((el) => el.slug == history.location.pathname.split(":")[1]);
      setFormData(filterTemplate[0]);
      setStartCategory(filterTemplate[0].category);
      setStartStatus(filterTemplate[0].status);
    }
  }, []);

  useEffect(() => {
    if (formData.TemplateImg != "") {
      ref.current.style.display = "block";
    } else {
      ref.current.style.display = "none";
    }
  }, [formData.TemplateImg]);

  useEffect(() => {
    if (formData.status == "Not approved") {
      setIsShowComment(true);
    }
  }, [formData.status]);

  const onChangeIconHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const form = new FormData();
    let pattern = /image-*/;
    if (!pattern.test(e.target.files[0].type)) {
      setUploadIconError("Supported image formats: .jpeg, .jpg, .png, .bmp");
      return;
    }
    if (e.target.files[0].size > 20000000) {
      setUploadIconError("Too large photo");
      return;
    }
    form.append("icon", e.target.files[0]);
    let reader = new FileReader();

    reader.onloadend = function () {
      ref.current.src = reader.result;
      ref.current.style.display = "block";
      setFormData({ ...formData, TemplateImg: reader.result.toString() });
    };

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    } else {
      ref.current.src = "";
    }
    setIsUploadIconLoading(false);
  };

  const submitFromHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.status == "Not approved") {
      setFormData({ ...formData, comment: "" });
    }
    if (history.location.pathname.split(":")[1]) {
      const updatedTemplates = templatesArray.map((obj) => {
        if (obj.slug === history.location.pathname.split(":")[1]) {
          return { ...obj, ...formData };
        }
        return obj;
      });
      if (startStatus != formData.status) {
        const fromIndex = updatedTemplates.indexOf(updatedTemplates.filter((el) => el.slug == formData.slug)[0]); // 👉️ 0
        const toIndex = 0;
        const element = updatedTemplates.splice(fromIndex, 1)[0];
        console.log(fromIndex);
        updatedTemplates.splice(toIndex, 0, element);
      }
      setTemplates(updatedTemplates);
    } else {
      setTemplates([formData, ...templatesArray]);
    }
    const updatedCategory = categoriesArray.map((obj) => {
      if (obj.name === formData.category) {
        return { ...obj, count: obj.count + 1 };
      } else if (startCategory != "" && obj.name === startCategory) {
        return { ...obj, count: obj.count - 1 };
      }
      return obj;
    });
    if (formData.category == "Other") {
      setOtherCategory({ ...otherCategory, count: otherCategory.count + 1 });
    }
    setCategories(updatedCategory);
    history.push(webAppRoutes.base);
  };

  const handleDelete = () => {
    setTemplates(templatesArray.filter((el) => el.slug != formData.slug));
    setIsDelete(false);
    history.push(webAppRoutes.newMeme);
  };

  return (
    <div className={styles.new}>
      {isUploadIconLoading && <MainLoader fullScreen />}
      <div className={styles.new__container}>
        <div className={styles.new__header}>
          <a className={styles.new__back} onClick={() => history.push(webAppRoutes.base)}>
            <img src={BackIcon} alt="back icon" /> Back
          </a>
          <a
            onClick={() => setIsDelete(true)}
            className={cn(styles.new__delete, {
              [styles.active]: history.location.pathname.split(":")[1],
            })}>
            <img src={DeleteIcon} alt="delete icon" /> Delete a Template
          </a>
        </div>
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            submitFromHandler(e);
          }}
          className={`${styles.new__form} ${styles.form}`}>
          <div className={styles.form__item}>
            <label htmlFor="Name" className={styles.form__label}>
              Name
            </label>
            <input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.currentTarget.value })}
              tabIndex={0}
              type="text"
              id="Name"
              placeholder="Name for Meme"
              className={styles.form__input}
            />
          </div>
          <div className={styles.form__item}>
            <label className={styles.form__label}>Category</label>
            <div
              tabIndex={1}
              onBlur={() => {
                setIsActiveStatus(false);
                setIsActiveCategory(false);
              }}
              onClick={() => {
                setIsActiveStatus(false);
                setIsActiveCategory(false);
                setIsActiveCategory(!isActiveCategory);
              }}
              className={styles.form__from}>
              <div
                className={cn(styles.form__subtitle, {
                  [styles.empty]: formData.category == "",
                })}>
                {formData.category == "" ? "Choose one category" : formData.category}{" "}
                <img
                  src={FilterArrow}
                  className={cn(styles.form__arrow, {
                    [styles.active]: isActiveCategory,
                  })}
                  alt="filter arrow"
                />
              </div>
              <div
                className={cn(`${styles.form__sort} ${styles.sort}`, {
                  [styles.active]: isActiveCategory,
                })}>
                {categoriesList.map((el) => {
                  return (
                    <a
                      key={el}
                      onClick={() => {
                        setIsActiveCategory(!isActiveCategory);
                        setFormData({ ...formData, category: el });
                      }}
                      className={styles.sort__item}>
                      {el}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
          <div className={styles.form__item}>
            <label htmlFor="Slug" className={styles.form__label}>
              Slug
            </label>
            <input
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.currentTarget.value })}
              tabIndex={2}
              type="text"
              id="Slug"
              placeholder="Address name for browser"
              className={styles.form__input}
            />
          </div>
          <div className={styles.form__item}>
            <label className={styles.form__label}>Tags</label>
            <Autocomplete
              tabIndex={3}
              value={formData.tags}
              onChange={(event, newValue) => {
                setFormData({ ...formData, tags: newValue });
              }}
              multiple
              id="tags-filled"
              options={tagsList.map((option) => option.tag)}
              freeSolo
              renderTags={(value: string[], getTagProps) =>
                value.map((option: string, index: number) => (
                  <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                ))
              }
              renderInput={(params) => <TextField {...params} variant="filled" placeholder="Tags for search" />}
            />
          </div>
          <div className={styles.form__item}>
            <div className={`${styles.form__upload} ${styles.upload}`}>
              <div className={styles.upload__body}>
                <label htmlFor="file-input_icon">
                  <p className={styles.upload__text}>Upload Original Meme</p>
                </label>
                <img className={styles.upload__preview} ref={ref} src={formData.TemplateImg} height="200" />
                <input
                  id="file-input_icon"
                  type="file"
                  onClick={(e) => {
                    e.currentTarget.value = null;
                  }}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    onChangeIconHandler(e);
                  }}
                  accept="image/*"
                />
              </div>
            </div>
          </div>
          <div className={styles.form__item}>
            <label htmlFor="Metadata" className={styles.form__label}>
              Metadata
            </label>
            <textarea
              value={formData.metadata}
              onChange={(e) => setFormData({ ...formData, metadata: e.currentTarget.value })}
              tabIndex={4}
              id="Metadata"
              placeholder="Code from json"
              className={styles.form__textarea}
            />
          </div>
          <div className={styles.form__item}>
            <label className={styles.form__label}>Status</label>
            <div
              tabIndex={5}
              onBlur={() => {
                setIsActiveStatus(false);
                setIsActiveCategory(false);
              }}
              onClick={() => {
                setIsActiveCategory(false);
                setIsActiveStatus(!isActiveStatus);
              }}
              className={styles.form__from}>
              <div
                className={cn(styles.form__subtitle, {
                  [styles.yellow]: formData.status == "Moderation",
                  [styles.red]: formData.status == "Not approved",
                  [styles.green]: formData.status == "Approved",
                })}>
                {formData.status}{" "}
                <img
                  src={FilterArrow}
                  className={cn(styles.form__arrow, {
                    [styles.active]: isActiveStatus,
                  })}
                  alt="filter arrow"
                />
              </div>
              <div
                className={cn(`${styles.form__sort} ${styles.sort}`, {
                  [styles.active]: isActiveStatus,
                })}>
                {statusesArray.slice(1).map((el) => {
                  return (
                    <a
                      key={el}
                      onClick={() => {
                        setIsActiveStatus(!isActiveStatus);
                        setFormData({ ...formData, status: el });
                      }}
                      className={cn(styles.sort__item, {
                        [styles.yellow]: el == "Moderation",
                        [styles.red]: el == "Not approved",
                        [styles.green]: el == "Approved",
                      })}>
                      {el}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
          {isShowComment && (
            <div className={styles.form__item}>
              <label htmlFor="comment" className={styles.form__label}>
                Admin comment
              </label>
              <textarea
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.currentTarget.value })}
                tabIndex={6}
                id="comment"
                placeholder="Description of the problem"
                className={styles.form__textarea}
              />
            </div>
          )}

          <button
            className={cn(styles.form__submit, {
              [styles.active]:
                formData.name != "" &&
                formData.category != "" &&
                formData.slug != "" &&
                formData.tags.length > 0 &&
                formData.TemplateImg != "" &&
                formData.metadata != "",
            })}
            type="submit">
            <img src={SubmitIcon} alt="submit icon" /> Submit
          </button>
        </form>
      </div>
      <Modal
        visible={isDelete}
        content={
          <DeleteModal
            handleDelete={handleDelete}
            title={"Delete the Template?"}
            text={"The template cannot be restored"}
            setIsShowDelete={setIsDelete}
          />
        }
        onClose={() => {
          setIsDelete(false);
        }}
      />
    </div>
  );
}
