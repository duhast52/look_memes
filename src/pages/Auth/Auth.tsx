import { FC, useState } from "react";
import { useHistory } from "react-router-dom";
import { MainLoader } from "src/components/MainLoader";
import { webAppRoutes } from "src/constants";
import { useTypedSelector } from "src/hooks/useTypedSelector";
import { useActions } from "../../hooks/useActions";
import styles from "./Auth.module.scss";

export const Auth: FC = () => {
  const history = useHistory();
  const { login } = useActions();
  const { error, isLoading } = useTypedSelector((state) => state.auth);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(username, password);
    history.push(webAppRoutes.base);
  };

  return (
    <form className={styles.auth} onSubmit={(e: React.FormEvent<HTMLFormElement>) => submit(e)}>
      {isLoading && <MainLoader fullScreen />}
      {error && <div className={styles.auth__error}>{error}</div>}
      <input
        required
        placeholder="Login"
        className={styles.auth__input}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        required
        placeholder="Password"
        className={styles.auth__input}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type={"password"}
      />
      <button className={styles.auth__button}>Sign in</button>
    </form>
  );
};
