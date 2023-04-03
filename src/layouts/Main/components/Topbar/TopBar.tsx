import styles from "./TopBar.module.scss";
import { MainLoader } from "src/components";
import { useActions } from "src/hooks/useActions";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import MainLogo from "src/assets/images/main_header_logo.png";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import "./Search.css";
import { ReactComponent as SearchIcon } from "src/assets/images/search_icon.svg";
import { Link, useHistory } from "react-router-dom";
import { webAppRoutes } from "src/constants";
import { useEffect, useState } from "react";

interface IOprions {
  name: string;
  id: string;
  tags: string[];
}

export function TopBar(): JSX.Element {
  const history = useHistory();
  const { logout } = useActions();
  const { isLoading, isAuth } = useTypedSelector((state) => state.auth);
  const { templatesArray } = useTypedSelector((state) => state.templates);
  const [options, setOptions] = useState<IOprions[]>([] as IOprions[]);
  const [selectedItem, setSelectedItem] = useState<IOprions>();

  useEffect(() => {
    const newOptions = [];
    templatesArray.map((el) => {
      newOptions.push({ name: el.name, id: el.id, tags: el.tags });
    });
    setOptions(newOptions);
  }, []);

  useEffect(() => {
    if (selectedItem) {
      templatesArray.map((el) => {
        if (el.id == selectedItem?.id) {
          history.push(`${webAppRoutes.newMeme}/:${el.slug}`);
        }
      });
    }
  }, [selectedItem]);

  return (
    <div className={styles.topbar}>
      {isLoading && <MainLoader fullScreen />}
      <div className={styles.topbar__container}>
        <div className={styles.topbar__flex}>
          <div className={styles.topbar__item}>
            <div className={styles.topbar__logo}>
              <img src={MainLogo} alt="logo" className={styles.topbar__logo_img} />
              Memes
            </div>
          </div>
          {isAuth && (
            <>
              <div className={styles.topbar__item}>
                <Autocomplete
                  popupIcon={<SearchIcon />}
                  id="country-select-demo"
                  sx={{ width: 300 }}
                  options={options}
                  autoHighlight
                  onChange={(e: any, value: any) => {
                    setSelectedItem(value);
                  }}
                  value={selectedItem}
                  getOptionLabel={(option: IOprions) =>
                    typeof option == "string" ? option : `${option.name} tags: ${JSON.stringify(option.tags)}`
                  }
                  renderOption={(props: any, option: IOprions) => (
                    <Box component="li" sx={{ "& > img": { mr: 2, flexShrink: 0 } }} {...props} key={option.id}>
                      {option.name} <br />
                      tags: {JSON.stringify(option.tags, null, 2)}
                    </Box>
                  )}
                  renderInput={(params: any) => (
                    <TextField
                      className={styles.topbar__input}
                      {...params}
                      placeholder="Search a meme"
                      inputProps={{
                        ...params.inputProps,
                      }}
                    />
                  )}
                />
              </div>
              <div className={styles.topbar__item}>
                <Link to={webAppRoutes.newMeme} className={styles.topbar__newmeme}>
                  <span className={styles.topbar__newmeme_plus}>+</span> Add a New Meme
                </Link>
                <a
                  onClick={() => {
                    history.push(webAppRoutes.base);
                    logout();
                  }}
                  className={styles.topbar__logout}>
                  Log Out
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
